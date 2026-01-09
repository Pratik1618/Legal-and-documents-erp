"use client"

import type { ImportantDocument } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { getDaysUntilExpiry, getStatusColor } from "@/lib/status-utils"

interface DocumentDetailModalProps {
  document: ImportantDocument | null
  isOpen: boolean
  onClose: () => void
}

const documentTypeLabels: Record<string, string> = {
  CLRA: "Contract Labour License",
  SHOP_ACT: "Shop Act License",
  ISO_CERT: "ISO Certification",
  PSARA: "PSARA",
  ELECTRICAL: "Electrical License",
}

export function DocumentDetailModal({ document, isOpen, onClose }: DocumentDetailModalProps) {
  if (!isOpen || !document) return null

  const daysLeft = getDaysUntilExpiry(document.expiryDate)

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{documentTypeLabels[document.documentType]}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Status</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${getStatusColor(document.status)}`}
              >
                {document.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Days Until Expiry</p>
              <p
                className={`text-lg font-bold ${daysLeft < 0 ? "text-red-600" : daysLeft <= 30 ? "text-yellow-600" : "text-green-600"}`}
              >
                {daysLeft < 0 ? `${Math.abs(daysLeft)}d ago` : `${daysLeft}d`}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Auto-Renewal Alert</p>
              <p className="text-sm font-medium text-foreground">
                {document.autoRenewalAlert ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>

          {/* Document Details */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Document Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Period From</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(document.periodFrom).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Period To</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(document.periodTo).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expiry Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(document.expiryDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Inward Number</p>
                <p className="text-sm font-medium text-foreground">{document.inwardNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Inward Date</p>
                <p className="text-sm font-medium text-foreground">
                  {new Date(document.inwardDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Responsible People */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Escalation Matrix</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Responsible Person</p>
                  <p className="text-sm font-medium text-foreground">{document.responsiblePerson}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Escalation Level 1</p>
                  <p className="text-sm font-medium text-foreground">{document.escalationL1}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Escalation Level 2</p>
                  <p className="text-sm font-medium text-foreground">{document.escalationL2}</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground">Escalation Level 3</p>
                  <p className="text-sm font-medium text-foreground">{document.escalationL3}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Legal Notices CTA */}
          <div className="border-t border-border pt-6">
            <Button className="w-full" variant="default">
              View Related Legal Notices
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
