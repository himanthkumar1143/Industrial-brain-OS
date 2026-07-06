/**
 * Centralized API Error Normalization – Industrial Brain OS
 * Converts raw backend and network responses into standardized, reusable ApiError objects
 * with user-friendly messages for UI display and technical details for debugging.
 */

import { API_ERROR_CODES, API_ERROR_MESSAGES, HTTP_STATUS, RETRY_CONFIG } from "../constants/api";
import { isAbortError } from "../utils/request";

export interface ApiErrorOptions {
  status?: number;
  code?: string;
  userFriendlyMessage?: string;
  technicalMessage?: string;
  retryable?: boolean;
  details?: unknown;
  isOffline?: boolean;
  isTimeout?: boolean;
  isAbort?: boolean;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly userFriendlyMessage: string;
  public readonly technicalMessage: string;
  public readonly retryable: boolean;
  public readonly details?: unknown;
  public readonly isOffline: boolean;
  public readonly isTimeout: boolean;
  public readonly isAbort: boolean;
  public readonly timestamp: number;

  constructor(options: ApiErrorOptions = {}) {
    const code = options.code ?? API_ERROR_CODES.UNKNOWN_ERROR;
    const userFriendlyMessage =
      options.userFriendlyMessage ??
      API_ERROR_MESSAGES[code] ??
      API_ERROR_MESSAGES[API_ERROR_CODES.UNKNOWN_ERROR]!;
    const technicalMessage = options.technicalMessage ?? userFriendlyMessage;

    super(technicalMessage);
    this.name = "ApiError";
    this.status = options.status ?? 0;
    this.code = code;
    this.userFriendlyMessage = userFriendlyMessage;
    this.technicalMessage = technicalMessage;
    this.details = options.details;
    this.isOffline = options.isOffline ?? false;
    this.isTimeout = options.isTimeout ?? false;
    this.isAbort = options.isAbort ?? false;
    this.timestamp = Date.now();

    // Determine if retryable if not explicitly set
    if (options.retryable !== undefined) {
      this.retryable = options.retryable;
    } else if (this.isAbort) {
      this.retryable = false;
    } else if (this.isOffline || this.isTimeout) {
      this.retryable = true;
    } else if (this.status > 0) {
      this.retryable =
        !RETRY_CONFIG.NON_RETRYABLE_STATUSES.includes(this.status) &&
        (this.status === HTTP_STATUS.TOO_MANY_REQUESTS || this.status >= 500);
    } else {
      this.retryable = true;
    }

    // Capture stack trace if available
    if ("captureStackTrace" in Error) {
      (Error as unknown as { captureStackTrace: (target: object, constructor?: unknown) => void }).captureStackTrace(this, ApiError);
    }

  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  // 1. Check for request cancellation/abort
  if (isAbortError(error)) {
    return new ApiError({
      status: 0,
      code: API_ERROR_CODES.ABORTED,
      userFriendlyMessage: API_ERROR_MESSAGES[API_ERROR_CODES.ABORTED],
      technicalMessage: error instanceof Error ? error.message : "Request aborted",
      isAbort: true,
      retryable: false,
    });
  }

  // 2. Check for offline browser state
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return new ApiError({
      status: 0,
      code: API_ERROR_CODES.OFFLINE,
      userFriendlyMessage: API_ERROR_MESSAGES[API_ERROR_CODES.OFFLINE],
      technicalMessage: error instanceof Error ? error.message : "Browser offline",
      isOffline: true,
      retryable: true,
    });
  }

  // 3. Inspect object properties (e.g. Axios error or standard Error)
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;

    // Check timeout
    if (
      err.code === "ECONNABORTED" ||
      (typeof err.message === "string" && err.message.toLowerCase().includes("timeout"))
    ) {
      return new ApiError({
        status: 0,
        code: API_ERROR_CODES.TIMEOUT,
        userFriendlyMessage: API_ERROR_MESSAGES[API_ERROR_CODES.TIMEOUT],
        technicalMessage: typeof err.message === "string" ? err.message : "Request timed out",
        isTimeout: true,
        retryable: true,
      });
    }

    // Check Axios response object
    if (err.response && typeof err.response === "object") {
      const response = err.response as Record<string, unknown>;
      const status = typeof response.status === "number" ? response.status : 500;
      const data = response.data as Record<string, unknown> | undefined;

      // Extract backend error message or validation details
      let backendMsg: string | undefined;
      if (data && typeof data === "object") {
        if (typeof data.message === "string") {
          backendMsg = data.message;
        } else if (typeof data.error === "string") {
          backendMsg = data.error;
        }
      }

      let code: string = API_ERROR_CODES.SERVER_ERROR;
      let userFriendlyMessage: string = API_ERROR_MESSAGES[API_ERROR_CODES.SERVER_ERROR]!;

      switch (status) {
        case HTTP_STATUS.BAD_REQUEST:
          code = API_ERROR_CODES.BAD_REQUEST;
          userFriendlyMessage = backendMsg ?? API_ERROR_MESSAGES[code]!;
          break;
        case HTTP_STATUS.UNAUTHORIZED:
          code = API_ERROR_CODES.UNAUTHORIZED;
          userFriendlyMessage = backendMsg ?? API_ERROR_MESSAGES[code]!;
          break;
        case HTTP_STATUS.FORBIDDEN:
          code = API_ERROR_CODES.FORBIDDEN;
          userFriendlyMessage = backendMsg ?? API_ERROR_MESSAGES[code]!;
          break;
        case HTTP_STATUS.NOT_FOUND:
          code = API_ERROR_CODES.NOT_FOUND;
          userFriendlyMessage = backendMsg ?? API_ERROR_MESSAGES[code]!;
          break;
        case HTTP_STATUS.CONFLICT:
          code = API_ERROR_CODES.CONFLICT;
          userFriendlyMessage = backendMsg ?? API_ERROR_MESSAGES[code]!;
          break;
        case HTTP_STATUS.TOO_MANY_REQUESTS:
          code = API_ERROR_CODES.RATE_LIMITED;
          userFriendlyMessage = backendMsg ?? API_ERROR_MESSAGES[code]!;
          break;
        default:
          if (status >= 500) {
            code = API_ERROR_CODES.SERVER_ERROR;
            userFriendlyMessage = API_ERROR_MESSAGES[code]!;
          } else {
            code = API_ERROR_CODES.UNKNOWN_ERROR;
            userFriendlyMessage = backendMsg ?? API_ERROR_MESSAGES[code]!;
          }
          break;
      }

      const technicalMessage = backendMsg
        ? `HTTP ${status}: ${backendMsg}`
        : typeof err.message === "string"
        ? `HTTP ${status}: ${err.message}`
        : `HTTP ${status} error`;

      return new ApiError({
        status,
        code,
        userFriendlyMessage,
        technicalMessage,
        details: data,
      });
    }

    // Network error without response
    if (err.message && typeof err.message === "string" && err.message.toLowerCase().includes("network")) {
      return new ApiError({
        status: 0,
        code: API_ERROR_CODES.NETWORK_ERROR,
        userFriendlyMessage: API_ERROR_MESSAGES[API_ERROR_CODES.NETWORK_ERROR],
        technicalMessage: err.message,
        retryable: true,
      });
    }

    // Standard Error object
    if (error instanceof Error) {
      return new ApiError({
        status: 0,
        code: API_ERROR_CODES.UNKNOWN_ERROR,
        userFriendlyMessage: error.message || API_ERROR_MESSAGES[API_ERROR_CODES.UNKNOWN_ERROR],
        technicalMessage: error.message,
        details: error.stack,
      });
    }
  }

  // Fallback unknown error
  return new ApiError({
    status: 0,
    code: API_ERROR_CODES.UNKNOWN_ERROR,
    userFriendlyMessage: API_ERROR_MESSAGES[API_ERROR_CODES.UNKNOWN_ERROR],
    technicalMessage: typeof error === "string" ? error : "Unknown error occurred",
    details: error,
  });
}
