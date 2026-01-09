"use client"

import { useState } from "react"
import { mockLegalNotices } from "@/lib/mock-data"
import type { LegalNotice } from "@/lib/types"
import { LegalNoticesTable } from "@/components/legal-notices-table"
import { LegalNoticeDetailModal } from "@/components/legal-notice-detail-modal"
import { LegalNoticeFormModal } from "@/components/legal-notice-form-modal"
import { ConfirmationDialog } from "@/components/confirmation-dialog"
import { AlertBanner, type AlertType } from "@/components/alert-banner"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Alert {
  id: string
  type: AlertType
  title: string
  message: string
}

export default function LegalNoticesPage() {
  const [notices, setNotices] = useState<LegalNotice[]>(mockLegalNotices)
  const [selectedNotice, setSelectedNotice] = useState<LegalNotice | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingNotice, setEditingNotice] = useState<LegalNotice | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])

  const addAlert = (type: AlertType, title: string, message: string) => {
    const id = Date.now().toString()
    setAlerts((prev) => [...prev, { id, type, title, message }])
    setTimeout(() => removeAlert(id), 5000)
  }

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  const handleViewNotice = (notice: LegalNotice) => {
    setSelectedNotice(notice)
    setIsDetailModalOpen(true)
  }

  const handleEditNotice = (notice: LegalNotice) => {
    setEditingNotice(notice)
    setIsFormModalOpen(true)
  }

  const handleFormSubmit = (notice: LegalNotice) => {
    if (editingNotice) {
      setNotices(notices.map((n) => (n.id === notice.id ? notice : n)))
      addAlert("success", "Success", "Legal notice updated successfully!")
    } else {
      setNotices([...notices, { ...notice, id: `LN-${notices.length + 1}` }])
      addAlert("success", "Success", "Legal notice created successfully!")
    }
    setIsFormModalOpen(false)
    setEditingNotice(null)
  }

  const handleDeleteNotice = (id: string) => {
    setDeleteConfirmId(id)
  }

  const confirmDelete = () => {
    if (deleteConfirmId) {
      setNotices(notices.filter((n) => n.id !== deleteConfirmId))
      addAlert("success", "Success", "Legal notice deleted successfully!")
      setDeleteConfirmId(null)
    }
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Alerts */}
      <div className="mb-6 space-y-3">
        {alerts.map((alert) => (
          <AlertBanner
            key={alert.id}
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>

      <header className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground">Legal Notices</h1>
          <Button className="gap-2" onClick={() => setIsFormModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Notice
          </Button>
        </div>
        <p className="text-muted-foreground">Manage legal notices, replies, and escalation tracking</p>
      </header>

      <LegalNoticesTable
        notices={notices}
        onEdit={handleEditNotice}
        onDelete={handleDeleteNotice}
        onView={handleViewNotice}
      />

      {/* Modals */}
      <LegalNoticeDetailModal
        notice={selectedNotice}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <LegalNoticeFormModal
        isOpen={isFormModalOpen}
        notice={editingNotice || undefined}
        onClose={() => {
          setIsFormModalOpen(false)
          setEditingNotice(null)
        }}
        onSubmit={handleFormSubmit}
      />

      <ConfirmationDialog
        isOpen={!!deleteConfirmId}
        title="Delete Legal Notice?"
        message="This action cannot be undone. The legal notice and all related data will be permanently deleted."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isDangerous
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  )
}
