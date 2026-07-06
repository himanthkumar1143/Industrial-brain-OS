/**
 * Centralized API Constants & Configuration – Industrial Brain OS
 * Establishes standardized HTTP status codes, timeout thresholds, request statuses,
 * error codes/messages, and retry parameters to eliminate magic numbers across all modules.
 */

export const REQUEST_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type RequestStatus = typeof REQUEST_STATUS[keyof typeof REQUEST_STATUS];

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];

export const TIMEOUT_VALUES = {
  DEFAULT: 10000, // 10 seconds
  LONG: 30000,    // 30 seconds
  UPLOAD: 60000,  // 60 seconds
  QUICK: 5000,    // 5 seconds
} as const;

export const API_ERROR_CODES = {
  BAD_REQUEST: "BAD_REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  RATE_LIMITED: "RATE_LIMITED",
  SERVER_ERROR: "SERVER_ERROR",
  TIMEOUT: "TIMEOUT",
  OFFLINE: "OFFLINE",
  NETWORK_ERROR: "NETWORK_ERROR",
  ABORTED: "ABORTED",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type ApiErrorCode = typeof API_ERROR_CODES[keyof typeof API_ERROR_CODES];

export const API_ERROR_MESSAGES: Record<string, string> = {
  [API_ERROR_CODES.BAD_REQUEST]: "The request was invalid or malformed. Please check your input and try again.",
  [API_ERROR_CODES.UNAUTHORIZED]: "Your session has expired or you are not logged in. Please log in again.",
  [API_ERROR_CODES.FORBIDDEN]: "You do not have sufficient permissions to perform this action or access this resource.",
  [API_ERROR_CODES.NOT_FOUND]: "The requested resource could not be found on the server.",
  [API_ERROR_CODES.CONFLICT]: "A conflict occurred while processing your request (e.g., duplicate record).",
  [API_ERROR_CODES.RATE_LIMITED]: "Too many requests. Please wait a moment before trying again.",
  [API_ERROR_CODES.SERVER_ERROR]: "An internal server error occurred. Our team has been notified. Please try again later.",
  [API_ERROR_CODES.TIMEOUT]: "The request timed out while waiting for a response from the enterprise server.",
  [API_ERROR_CODES.OFFLINE]: "You appear to be offline. Please check your internet connection and try again.",
  [API_ERROR_CODES.NETWORK_ERROR]: "A network error occurred while attempting to reach enterprise services.",
  [API_ERROR_CODES.ABORTED]: "The request was cancelled or aborted.",
  [API_ERROR_CODES.VALIDATION_ERROR]: "One or more fields failed validation. Please review your data.",
  [API_ERROR_CODES.UNKNOWN_ERROR]: "An unexpected error occurred. Please try again or contact support.",
};

export const DEFAULT_API_CONFIG = {
  timeout: TIMEOUT_VALUES.DEFAULT,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  retries: 3,
  retryDelay: 1000,
} as const;

export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  DELAYS: [1000, 2000, 4000], // Attempt 1 -> 1s, Attempt 2 -> 2s, Attempt 3 -> 4s
  NON_RETRYABLE_STATUSES: [
    HTTP_STATUS.BAD_REQUEST,
    HTTP_STATUS.UNAUTHORIZED,
    HTTP_STATUS.FORBIDDEN,
    HTTP_STATUS.NOT_FOUND,
  ] as readonly number[],
} as const;
