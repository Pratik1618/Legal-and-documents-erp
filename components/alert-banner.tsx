"use client"

import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export type AlertType = "success" | "error" | "warning" | "info"

interface AlertBannerProps {
  type: AlertType
  title: string
  message: string
  onClose: () => void
  autoClose?: boolean
  autoCloseDuration?: number
}

export function AlertBanner({
  type,
  title,
  message,
  onClose,
  autoClose = true,
  autoCloseDuration = 5000,
}: AlertBannerProps) {
  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
      case "error":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
      case "info":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
      default:
        return ""
    }
  }

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-600 dark:text-green-400"
      case "error":
        return "text-red-600 dark:text-red-400"
      case "warning":
        return "text-yellow-600 dark:text-yellow-400"
      case "info":
        return "text-blue-600 dark:text-blue-400"
      default:
        return ""
    }
  }

  const getTextColor = () => {
    switch (type) {
      case "success":
        return "text-green-900 dark:text-green-100"
      case "error":
        return "text-red-900 dark:text-red-100"
      case "warning":
        return "text-yellow-900 dark:text-yellow-100"
      case "info":
        return "text-blue-900 dark:text-blue-100"
      default:
        return ""
    }
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />
      case "error":
        return <AlertCircle className="w-5 h-5" />
      case "warning":
        return <AlertTriangle className="w-5 h-5" />
      case "info":
        return <Info className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <div className={`border rounded-lg p-4 flex items-start gap-4 ${getStyles()}`}>
      <div className={`shrink-0 ${getIconColor()}`}>{getIcon()}</div>
      <div className="flex-1">
        <h3 className={`font-semibold mb-1 ${getTextColor()}`}>{title}</h3>
        <p className={`text-sm ${getTextColor()} opacity-90`}>{message}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}
