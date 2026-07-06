/**
 * Request Utilities & Networking Helpers – Industrial Brain OS
 * Provides reusable utilities for request cancellation, deduplication, timeout enforcement,
 * safe JSON parsing, response validation, and exponential backoff retry logic.
 */

import { RETRY_CONFIG, HTTP_STATUS } from "../constants/api";

// 1. AbortController & Request Cancellation Helpers
export function createAbortController(): AbortController {
  return new AbortController();
}

export function isAbortError(error: unknown): boolean {
  if (!error) return false;
  if (typeof error === "object") {
    const err = error as Record<string, unknown>;
    if (err.name === "AbortError" || err.name === "CanceledError" || err.code === "ERR_CANCELED") {
      return true;
    }
    if (err.isAbort) {
      return true;
    }

  }
  return false;
}

// 2. Request Deduplication Map
const activeRequests = new Map<string, Promise<unknown>>();

export function getDeduplicationKey(method: string = "get", url: string = "", params?: unknown, data?: unknown): string {
  const normalizedMethod = method.toLowerCase();
  const serializedParams = params ? JSON.stringify(params) : "";
  const serializedData = data ? JSON.stringify(data) : "";
  return `${normalizedMethod}:${url}?${serializedParams}#${serializedData}`;
}

export async function executeWithDeduplication<T>(
  key: string,
  requestFn: () => Promise<T>,
  enabled: boolean = true
): Promise<T> {
  if (!enabled) {
    return requestFn();
  }
  if (activeRequests.has(key)) {
    return activeRequests.get(key) as Promise<T>;
  }
  const promise = requestFn().finally(() => {
    activeRequests.delete(key);
  });
  activeRequests.set(key, promise as Promise<unknown>);
  return promise;
}

export function clearDeduplicationCache(): void {
  activeRequests.clear();
}

// 3. Timeout Wrapper
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  abortController?: AbortController
): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      if (abortController) {
        abortController.abort("Request timed out");
      }
      const timeoutError = new Error(`Request exceeded timeout of ${timeoutMs}ms`);
      timeoutError.name = "TimeoutError";
      reject(timeoutError);
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer!);
  }
}

// 4. Safe JSON Parsing
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

export function safeJsonStringify(obj: unknown, fallback: string = ""): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return fallback;
  }
}

// 5. Response Validation
export function validateResponse<T>(
  data: unknown,
  validator?: (payload: unknown) => boolean,
  errorMessage: string = "Invalid response payload structure"
): T {
  if (validator && !validator(data)) {
    throw new Error(errorMessage);
  }
  return data as T;
}

// 6. Explicit Exponential Backoff Retry Strategy
export interface RetryOptions {
  maxRetries?: number;
  delays?: readonly number[];
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  onRetry?: (error: unknown, attempt: number, delayMs: number) => void;
}

export async function executeWithRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? RETRY_CONFIG.MAX_RETRIES;
  const delays = options.delays ?? RETRY_CONFIG.DELAYS;

  const defaultShouldRetry = (err: unknown, attempt: number): boolean => {
    if (attempt >= maxRetries) return false;
    if (isAbortError(err)) return false;

    // Check offline status
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      return false;
    }

    // Check HTTP status code if present on error
    if (err && typeof err === "object") {
      const errObj = err as Record<string, unknown>;
      let status: number | undefined;

      if (typeof errObj.status === "number") {
        status = errObj.status;
      } else if (errObj.response && typeof errObj.response === "object") {
        const respObj = errObj.response as Record<string, unknown>;
        if (typeof respObj.status === "number") {
          status = respObj.status;
        }
      }

      if (status !== undefined) {
        if (RETRY_CONFIG.NON_RETRYABLE_STATUSES.includes(status)) {
          return false;
        }
        // Explicitly retry on 429 and 500+
        if (status === HTTP_STATUS.TOO_MANY_REQUESTS || status >= 500) {
          return true;
        }
      }

      // Check if ApiError has retryable flag
      if (typeof errObj.retryable === "boolean") {
        return errObj.retryable;
      }
    }

    // Retry on network errors or timeouts by default
    return true;
  };

  const shouldRetry = options.shouldRetry ?? defaultShouldRetry;

  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (!shouldRetry(error, attempt)) {
        throw error;
      }
      const delayMs = delays[attempt] ?? delays[delays.length - 1] ?? 1000;
      if (options.onRetry) {
        options.onRetry(error, attempt + 1, delayMs);
      }
      attempt++;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}
