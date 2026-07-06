/**
 * Generic Async State Hook – Industrial Brain OS
 * Manages loading, error, success, and retry states for any asynchronous operation.
 * Utilizes centralized REQUEST_STATUS and prevents state updates on unmounted components.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { REQUEST_STATUS, type RequestStatus } from "../constants/api";
import { normalizeApiError, type ApiError } from "../api/errors";

export interface UseAsyncState<T, E = ApiError> {
  data: T | null;
  error: E | null;
  status: RequestStatus;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isIdle: boolean;
}

export interface UseAsyncReturn<T, E = ApiError, Args extends unknown[] = unknown[]> extends UseAsyncState<T, E> {
  execute: (...args: Args) => Promise<T | null>;
  reset: () => void;
  retry: () => Promise<T | null>;
}

export function useAsync<T, E = ApiError, Args extends unknown[] = unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
  immediate = false,
  initialArgs?: Args
): UseAsyncReturn<T, E, Args> {
  const [status, setStatus] = useState<RequestStatus>(immediate ? REQUEST_STATUS.PENDING : REQUEST_STATUS.IDLE);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const isMountedRef = useRef<boolean>(true);
  const lastArgsRef = useRef<Args | undefined>(initialArgs);
  const asyncFuncRef = useRef(asyncFunction);

  useEffect(() => {
    asyncFuncRef.current = asyncFunction;
  }, [asyncFunction]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async (...args: Args): Promise<T | null> => {
    lastArgsRef.current = args;
    if (isMountedRef.current) {
      setStatus(REQUEST_STATUS.PENDING);
      setError(null);
    }

    try {
      const response = await asyncFuncRef.current(...args);
      if (isMountedRef.current) {
        setData(response);
        setStatus(REQUEST_STATUS.SUCCESS);
      }
      return response;
    } catch (err) {
      const normalizedErr = normalizeApiError(err) as unknown as E;
      if (isMountedRef.current) {
        setError(normalizedErr);
        setStatus(REQUEST_STATUS.ERROR);
      }
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setData(null);
      setError(null);
      setStatus(REQUEST_STATUS.IDLE);
    }
  }, []);

  const retry = useCallback(async (): Promise<T | null> => {
    const argsToUse = lastArgsRef.current ?? ([] as unknown as Args);
    return execute(...argsToUse);
  }, [execute]);

  useEffect(() => {
    if (immediate) {
      const argsToUse = initialArgs ?? ([] as unknown as Args);
      void execute(...argsToUse);
    }
  }, [immediate, execute, initialArgs]);

  return {
    data,
    error,
    status,
    isLoading: status === REQUEST_STATUS.PENDING,
    isSuccess: status === REQUEST_STATUS.SUCCESS,
    isError: status === REQUEST_STATUS.ERROR,
    isIdle: status === REQUEST_STATUS.IDLE,
    execute,
    reset,
    retry,
  };
}
