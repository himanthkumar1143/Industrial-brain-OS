/**
 * Specialized HTTP Request Hook – Industrial Brain OS
 * Manages API requests with built-in cancellation, conditional execution,
 * polling, retries, and automatic cleanup.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { REQUEST_STATUS, type RequestStatus } from "../constants/api";
import { normalizeApiError, type ApiError } from "../api/errors";
import { apiGet, apiPost, apiPut, apiPatch, apiDelete, type ApiRequestConfig } from "../api/helpers";
import { createAbortController } from "../utils/request";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface UseRequestOptions<D = unknown> extends ApiRequestConfig<D> {
  /** HTTP method (default: 'GET') */
  method?: HttpMethod;
  /** Whether to automatically execute on mount and dependency changes (default: true) */
  enabled?: boolean;
  /** Dependency array for triggering re-fetches (default: []) */
  deps?: readonly unknown[];
  /** Optional polling interval in milliseconds */
  pollingInterval?: number;
  /** Callback on successful request */
  onSuccess?: (data: unknown) => void;
  /** Callback on error */
  onError?: (error: ApiError) => void;
}

export interface UseRequestReturn<T> {
  data: T | null;
  error: ApiError | null;
  status: RequestStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
  execute: (overrideConfig?: ApiRequestConfig) => Promise<T | null>;
  retry: () => Promise<T | null>;
  cancel: (reason?: string) => void;
  reset: () => void;
}

export function useRequest<T, D = unknown>(
  url: string,
  options: UseRequestOptions<D> = {}
): UseRequestReturn<T> {
  const {
    method = "GET",
    enabled = true,
    deps = [],
    pollingInterval,
    onSuccess,
    onError,
    ...restConfig
  } = options;

  const [status, setStatus] = useState<RequestStatus>(enabled ? REQUEST_STATUS.PENDING : REQUEST_STATUS.IDLE);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const isMountedRef = useRef<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const configRef = useRef(restConfig);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    configRef.current = restConfig;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  });

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort("Component unmounted");
      }
    };
  }, []);

  const cancel = useCallback((reason = "Request cancelled by user") => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(reason);
      abortControllerRef.current = null;
    }
  }, []);

  const execute = useCallback(async (overrideConfig: ApiRequestConfig = {}): Promise<T | null> => {
    // Abort previous pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort("New request initiated");
    }

    const controller = createAbortController();
    abortControllerRef.current = controller;

    if (isMountedRef.current) {
      setStatus(REQUEST_STATUS.PENDING);
      setError(null);
    }

    const mergedConfig: ApiRequestConfig = {
      ...configRef.current,
      ...overrideConfig,
      signal: controller.signal,
    };

    try {
      let responseData: T;
      const upperMethod = method.toUpperCase() as HttpMethod;

      switch (upperMethod) {
        case "POST":
          responseData = await apiPost<T, unknown>(url, mergedConfig.data, mergedConfig);
          break;
        case "PUT":
          responseData = await apiPut<T, unknown>(url, mergedConfig.data, mergedConfig);
          break;
        case "PATCH":
          responseData = await apiPatch<T, unknown>(url, mergedConfig.data, mergedConfig);
          break;
        case "DELETE":
          responseData = await apiDelete<T>(url, mergedConfig);
          break;

        case "GET":
        default:
          responseData = await apiGet<T>(url, mergedConfig);
          break;
      }

      if (isMountedRef.current && abortControllerRef.current === controller) {
        setData(responseData);
        setStatus(REQUEST_STATUS.SUCCESS);
        if (onSuccessRef.current) {
          onSuccessRef.current(responseData);
        }
      }
      return responseData;
    } catch (err) {
      const normalizedErr = normalizeApiError(err);
      // Ignore abort errors caused by intentional cancellation or re-fetching
      if (normalizedErr.isAbort) {
        return null;
      }
      if (isMountedRef.current && abortControllerRef.current === controller) {
        setError(normalizedErr);
        setStatus(REQUEST_STATUS.ERROR);
        if (onErrorRef.current) {
          onErrorRef.current(normalizedErr);
        }
      }
      return null;
    }
  }, [url, method]);

  const reset = useCallback(() => {
    cancel();
    if (isMountedRef.current) {
      setData(null);
      setError(null);
      setStatus(REQUEST_STATUS.IDLE);
    }
  }, [cancel]);

  const retry = useCallback(async (): Promise<T | null> => {
    return execute();
  }, [execute]);

  // Handle automatic fetching when enabled or deps change
  useEffect(() => {
    if (enabled) {
      void execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, url, method, ...deps]);

  // Handle polling interval
  useEffect(() => {
    if (!enabled || !pollingInterval || pollingInterval <= 0) {
      return;
    }
    const timer = setInterval(() => {
      void execute();
    }, pollingInterval);

    return () => {
      clearInterval(timer);
    };
  }, [enabled, pollingInterval, execute]);

  return {
    data,
    error,
    status,
    isLoading: status === REQUEST_STATUS.PENDING,
    isSuccess: status === REQUEST_STATUS.SUCCESS,
    isError: status === REQUEST_STATUS.ERROR,
    isIdle: status === REQUEST_STATUS.IDLE,
    execute,
    retry,
    cancel,
    reset,
  };
}
