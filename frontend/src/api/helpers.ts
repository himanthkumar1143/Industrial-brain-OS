/**
 * Reusable API Request Helpers – Industrial Brain OS
 * Provides standardized GET, POST, PUT, PATCH, and DELETE helpers with built-in
 * request deduplication, timeout enforcement, retries, and Sprint 2 cache placeholders.
 */

import type { AxiosRequestConfig } from "axios";
import client from "./client";
import { normalizeApiError } from "./errors";
import {
  executeWithDeduplication,
  getDeduplicationKey,
  executeWithRetry,
  type RetryOptions,
} from "../utils/request";
import { DEFAULT_API_CONFIG } from "../constants/api";

export interface ApiRequestConfig<D = unknown> extends AxiosRequestConfig<D> {
  /** If true, deduplicates identical simultaneous requests (default: true for GET, false for mutations) */
  deduplicate?: boolean;
  /** Retry options or boolean flag to enable/disable retries */
  retry?: boolean | RetryOptions;
  /**
   * Future Cache Placeholders (Sprint 2 Extension Points)
   * These properties do not implement caching in Sprint 1, but provide explicit
   * architectural extension points for Sprint 2 enterprise caching.
   */
  cache?: boolean;
  cacheKey?: string;
  staleTime?: number;
}

async function executeRequest<T, D = unknown>(config: ApiRequestConfig<D>): Promise<T> {
  const method = config.method || "get";
  const url = config.url || "";
  const isGet = method.toLowerCase() === "get";
  const deduplicate = config.deduplicate ?? isGet;

  const performFetch = async (): Promise<T> => {
    try {
      const mergedConfig: AxiosRequestConfig<D> = {
        timeout: DEFAULT_API_CONFIG.timeout,
        ...config,
      };
      const response = await client.request<T>(mergedConfig);
      return response.data;
    } catch (error) {
      throw normalizeApiError(error);
    }
  };

  const fetchWithRetry = async (): Promise<T> => {
    if (config.retry === false) {
      return performFetch();
    }
    const retryOptions: RetryOptions = typeof config.retry === "object" ? config.retry : {};
    return executeWithRetry(performFetch, retryOptions);
  };

  if (deduplicate) {
    const key = config.cacheKey || getDeduplicationKey(method, url, config.params, config.data);
    return executeWithDeduplication(key, fetchWithRetry, true);
  }

  return fetchWithRetry();
}

export async function apiGet<T>(url: string, config: ApiRequestConfig = {}): Promise<T> {
  return executeRequest<T>({ ...config, method: "get", url });
}

export async function apiPost<T, D = unknown>(url: string, data?: D, config: ApiRequestConfig<D> = {}): Promise<T> {
  return executeRequest<T, D>({ ...config, method: "post", url, data, deduplicate: config.deduplicate ?? false });
}

export async function apiPut<T, D = unknown>(url: string, data?: D, config: ApiRequestConfig<D> = {}): Promise<T> {
  return executeRequest<T, D>({ ...config, method: "put", url, data, deduplicate: config.deduplicate ?? false });
}

export async function apiPatch<T, D = unknown>(url: string, data?: D, config: ApiRequestConfig<D> = {}): Promise<T> {
  return executeRequest<T, D>({ ...config, method: "patch", url, data, deduplicate: config.deduplicate ?? false });
}

export async function apiDelete<T>(url: string, config: ApiRequestConfig = {}): Promise<T> {
  return executeRequest<T>({ ...config, method: "delete", url, deduplicate: config.deduplicate ?? false });
}
