"use client"

import type { InwardRegister } from "@/lib/types"
import { InwardForm } from "./inward-form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface InwardFormModalProps {
  isOpen: boolean
  data?: InwardRegister | null
  onClose: () => void
  onSubmit: (data: InwardRegister) => void
}

export function InwardFormModal({
  isOpen,
  data,
  onClose,
  onSubmit,
}: InwardFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-border">
        
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {data ? "Edit Inward Entry" : "Create Inward Entry"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6">
          <InwardForm
            initialData={data || undefined}
            onSubmit={(formData:InwardRegister) => {
              onSubmit(formData)
              onClose()
            }}
            onCancel={onClose}
          />
        </div>

      </Card>
    </div>
  )
}
