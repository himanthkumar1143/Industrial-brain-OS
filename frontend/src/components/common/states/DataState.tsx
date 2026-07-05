import React from "react";
import { LoadingState, type LoadingStateProps } from "./LoadingState";
import { ErrorState, type ErrorStateProps } from "./ErrorState";
import { EmptyState, type EmptyStateProps } from "./EmptyState";

export interface DataStateProps {
  /** If true, renders the LoadingState component. Takes precedence over error and empty states. */
  loading?: boolean;
  /** If truthy (string, Error object, or boolean true), renders the ErrorState component. */
  error?: string | Error | boolean | null;
  /** If true (and not loading or error), renders the EmptyState component. */
  isEmpty?: boolean;
  /** Convenience retry callback passed down to ErrorState. */
  onRetry?: () => void;
  /** Optional custom props to configure the underlying LoadingState. */
  loadingProps?: LoadingStateProps;
  /** Optional custom props to configure the underlying ErrorState. */
  errorProps?: ErrorStateProps;
  /** Optional custom props to configure the underlying EmptyState. */
  emptyProps?: EmptyStateProps;
  /** Primary data view or components to render when loading=false, error=null, isEmpty=false. */
  children: React.ReactNode;
}

/**
 * DataState – Reusable enterprise data wrapper and state manager.
 * Standardizes conditional rendering across all future modules (Knowledge Graph, Documents, AI Chat, etc.),
 * eliminating repetitive boilerplate while preserving memoized rendering and zero CLS.
 */
export const DataState: React.FC<DataStateProps> = React.memo(({
  loading = false,
  error = null,
  isEmpty = false,
  onRetry,
  loadingProps,
  errorProps,
  emptyProps,
  children,
}) => {
  // 1. Loading State
  if (loading) {
    return <LoadingState {...loadingProps} />;
  }

  // 2. Error State
  if (error) {
    const errorMessage =
      typeof error === "string"
        ? error
        : error instanceof Error
        ? error.message
        : undefined;

    return (
      <ErrorState
        description={errorMessage}
        onRetry={onRetry}
        {...errorProps}
      />
    );
  }

  // 3. Empty State
  if (isEmpty) {
    return <EmptyState {...emptyProps} />;
  }

  // 4. Success / Data State
  return <>{children}</>;
});

DataState.displayName = "DataState";
