/**
 * Component-Scoped API Accessor Hook – Industrial Brain OS
 * Provides direct access to API methods (get, post, put, patch, delete) and automatically
 * tracks and cancels all pending requests initiated by the component when it unmounts.
 */

import { useCallback, useRef, useEffect } from "react";
import { apiGet, apiPost, apiPut, apiPatch, apiDelete, type ApiRequestConfig } from "../api/helpers";
import { createAbortController } from "../utils/request";

export interface UseApiReturn {
  get: <T>(url: string, config?: ApiRequestConfig) => Promise<T>;
  post: <T, D = unknown>(url: string, data?: D, config?: ApiRequestConfig<D>) => Promise<T>;
  put: <T, D = unknown>(url: string, data?: D, config?: ApiRequestConfig<D>) => Promise<T>;
  patch: <T, D = unknown>(url: string, data?: D, config?: ApiRequestConfig<D>) => Promise<T>;
  delete: <T>(url: string, config?: ApiRequestConfig) => Promise<T>;
  cancelAll: (reason?: string) => void;
}

export function useApi(): UseApiReturn {
  const controllersRef = useRef<Set<AbortController>>(new Set());

  useEffect(() => {
    const controllers = controllersRef.current;
    return () => {
      controllers.forEach((controller) => {
        controller.abort("Component unmounted");
      });
      controllers.clear();
    };
  }, []);

  const createTrackedSignal = useCallback(<D = unknown>(config: ApiRequestConfig<D> = {}): ApiRequestConfig<D> => {

    if (config.signal) {
      return config;
    }
    const controller = createAbortController();
    controllersRef.current.add(controller);

    // Clean up controller from set when request settles
    controller.signal.addEventListener("abort", () => {
      controllersRef.current.delete(controller);
    });

    return {
      ...config,
      signal: controller.signal,
    };
  }, []);

  const get = useCallback(<T>(url: string, config: ApiRequestConfig = {}): Promise<T> => {
    const trackedConfig = createTrackedSignal(config);
    return apiGet<T>(url, trackedConfig).finally(() => {
      if (trackedConfig.signal) {
        controllersRef.current.forEach((c) => {
          if (c.signal === trackedConfig.signal) controllersRef.current.delete(c);
        });
      }
    });
  }, [createTrackedSignal]);

  const post = useCallback(<T, D = unknown>(url: string, data?: D, config: ApiRequestConfig<D> = {}): Promise<T> => {
    const trackedConfig = createTrackedSignal(config);
    return apiPost<T, D>(url, data, trackedConfig).finally(() => {
      if (trackedConfig.signal) {
        controllersRef.current.forEach((c) => {
          if (c.signal === trackedConfig.signal) controllersRef.current.delete(c);
        });
      }
    });
  }, [createTrackedSignal]);

  const put = useCallback(<T, D = unknown>(url: string, data?: D, config: ApiRequestConfig<D> = {}): Promise<T> => {
    const trackedConfig = createTrackedSignal(config);
    return apiPut<T, D>(url, data, trackedConfig).finally(() => {
      if (trackedConfig.signal) {
        controllersRef.current.forEach((c) => {
          if (c.signal === trackedConfig.signal) controllersRef.current.delete(c);
        });
      }
    });
  }, [createTrackedSignal]);

  const patch = useCallback(<T, D = unknown>(url: string, data?: D, config: ApiRequestConfig<D> = {}): Promise<T> => {
    const trackedConfig = createTrackedSignal(config);
    return apiPatch<T, D>(url, data, trackedConfig).finally(() => {
      if (trackedConfig.signal) {
        controllersRef.current.forEach((c) => {
          if (c.signal === trackedConfig.signal) controllersRef.current.delete(c);
        });
      }
    });
  }, [createTrackedSignal]);

  const del = useCallback(<T>(url: string, config: ApiRequestConfig = {}): Promise<T> => {
    const trackedConfig = createTrackedSignal(config);
    return apiDelete<T>(url, trackedConfig).finally(() => {
      if (trackedConfig.signal) {
        controllersRef.current.forEach((c) => {
          if (c.signal === trackedConfig.signal) controllersRef.current.delete(c);
        });
      }
    });
  }, [createTrackedSignal]);

  const cancelAll = useCallback((reason = "All requests cancelled by user") => {
    controllersRef.current.forEach((controller) => {
      controller.abort(reason);
    });
    controllersRef.current.clear();
  }, []);

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    cancelAll,
  };
}
