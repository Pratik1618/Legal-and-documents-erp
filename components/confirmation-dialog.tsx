"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ConfirmationDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  isDangerous?: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDangerous = false,
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-border">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div
              className={`p-2 rounded-lg ${isDangerous ? "bg-red-100 dark:bg-red-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`}
            >
              <AlertCircle
                className={`w-5 h-5 ${isDangerous ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{message}</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button variant="outline" onClick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className={isDangerous ? "bg-red-600 hover:bg-red-700 text-white" : ""}
            >
              {isLoading ? "Processing..." : confirmLabel}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
