import type { DocumentStatus } from "./types"

export function getStatusColor(status: DocumentStatus): string {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Expired":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    case "Renewed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function getDaysUntilExpiry(expiryDate: string): number {
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diffTime = expiry.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function getExpiryStatusCategory(daysLeft: number): "expired" | "expiring_soon" | "active" {
  if (daysLeft < 0) return "expired"
  if (daysLeft <= 30) return "expiring_soon"
  return "active"
}
