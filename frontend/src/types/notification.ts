/**
 * NotificationType – Severity category of the enterprise notification.
 */
export type NotificationType = "info" | "warning" | "error" | "success";

/**
 * NotificationPriority – Urgency classification for routing and UI presentation.
 */
export type NotificationPriority = "low" | "medium" | "high" | "urgent";

/**
 * Notification – Internal model for enterprise platform notifications.
 */
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  timestamp: number;
  read: boolean;
  link?: string;
}
