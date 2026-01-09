"use client"
import type { LegalNotice } from "@/lib/types"
import { LegalNoticeForm } from "./legal-notice-form"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LegalNoticeFormModalProps {
  isOpen: boolean
  notice?: LegalNotice
  onClose: () => void
  onSubmit: (data: LegalNotice) => void
}

export function LegalNoticeFormModal({ isOpen, notice, onClose, onSubmit }: LegalNoticeFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-border">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {notice ? "Edit Legal Notice" : "Create New Legal Notice"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <LegalNoticeForm
            initialData={notice}
            onSubmit={(data) => {
              onSubmit(data)
              onClose()
            }}
            onCancel={onClose}
          />
        </div>
      </Card>
    </div>
  )
}
