"use client"

import type { LegalNotice } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface LegalNoticeDetailModalProps {
  notice: LegalNotice | null
  isOpen: boolean
  onClose: () => void
}

export function LegalNoticeDetailModal({ notice, isOpen, onClose }: LegalNoticeDetailModalProps) {
  if (!isOpen || !notice) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{notice.subject}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Stage</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                  notice.stage === "Open"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                }`}
              >
                {notice.stage}
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Final Status</p>
              <p className="text-sm font-medium text-foreground">{notice.finalStatus}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Alert Days</p>
              <p className="text-sm font-medium text-foreground">{notice.alertDays}d</p>
            </div>
          </div>

          {/* Notice Details */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Notice Details</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Department</p>
                  <p className="text-sm font-medium text-foreground">{notice.department}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Inward Number</p>
                  <p className="text-sm font-medium text-foreground">{notice.inwardNumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Inward Date</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(notice.inwardDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Period</p>
                  <p className="text-sm font-medium text-foreground">{notice.period}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="text-sm font-medium text-foreground">₹{notice.amount.toLocaleString()}</p>
                </div>
                {notice.relatedDocumentId && (
                  <div>
                    <p className="text-xs text-muted-foreground">Related Document</p>
                    <p className="text-sm font-medium text-foreground">{notice.relatedDocumentId}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Remarks */}
          {notice.remarks && (
            <div className="border-t border-border pt-6">
              <h3 className="font-semibold text-foreground mb-2">Remarks</h3>
              <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg">{notice.remarks}</p>
            </div>
          )}

          {/* Replies Timeline */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Replies</h3>
            <div className="space-y-4">
              {notice.replies.map((reply, index) => (
                <div key={index} className="border-l-2 border-blue-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs rounded font-medium">
                      {reply.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(reply.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">By: {reply.responsiblePerson}</p>
                  <p className="text-sm text-foreground">{reply.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Escalation Matrix */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold text-foreground mb-4">Escalation Matrix</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Level 1</p>
                <p className="text-sm font-medium text-foreground">{notice.escalationL1}</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <p className="text-xs text-muted-foreground">Level 2</p>
                <p className="text-sm font-medium text-foreground">{notice.escalationL2}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
