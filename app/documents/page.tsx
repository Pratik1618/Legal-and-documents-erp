"use client"

import { useState } from "react"
import { mockDocuments } from "@/lib/mock-data"
import type { ImportantDocument } from "@/lib/types"
import { DocumentsTable } from "@/components/documents-table"
import { DocumentDetailModal } from "@/components/document-detail-modal"
import { DocumentFormModal } from "@/components/document-form-modal"
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

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<ImportantDocument[]>(mockDocuments)
  const [selectedDocument, setSelectedDocument] = useState<ImportantDocument | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<ImportantDocument | null>(null)
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

  const handleViewDocument = (doc: ImportantDocument) => {
    setSelectedDocument(doc)
    setIsDetailModalOpen(true)
  }

  const handleEditDocument = (doc: ImportantDocument) => {
    setEditingDocument(doc)
    setIsFormModalOpen(true)
  }

  const handleFormSubmit = (doc: ImportantDocument) => {
    if (editingDocument) {
      setDocuments(documents.map((d) => (d.id === doc.id ? doc : d)))
      addAlert("success", "Success", "Document updated successfully!")
    } else {
      setDocuments([...documents, { ...doc, id: `DOC-${documents.length + 1}` }])
      addAlert("success", "Success", "Document created successfully!")
    }
    setIsFormModalOpen(false)
    setEditingDocument(null)
  }

  const handleDeleteDocument = (id: string) => {
    setDeleteConfirmId(id)
  }

  const confirmDelete = () => {
    if (deleteConfirmId) {
      setDocuments(documents.filter((d) => d.id !== deleteConfirmId))
      addAlert("success", "Success", "Document deleted successfully!")
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
          <h1 className="text-3xl font-bold text-foreground">Important Documents</h1>
          <Button className="gap-2" onClick={() => setIsFormModalOpen(true)}>
            <Plus className="w-4 h-4" />
            Add Document
          </Button>
        </div>
        <p className="text-muted-foreground">Manage statutory and compliance documents with expiry tracking</p>
      </header>

      <DocumentsTable
        documents={documents}
        onEdit={handleEditDocument}
        onDelete={handleDeleteDocument}
        onView={handleViewDocument}
      />

      {/* Modals */}
      <DocumentDetailModal
        document={selectedDocument}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <DocumentFormModal
        isOpen={isFormModalOpen}
        document={editingDocument || undefined}
        onClose={() => {
          setIsFormModalOpen(false)
          setEditingDocument(null)
        }}
        onSubmit={handleFormSubmit}
      />

      <ConfirmationDialog
        isOpen={!!deleteConfirmId}
        title="Delete Document?"
        message="This action cannot be undone. The document and all related data will be permanently deleted."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isDangerous
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  )
}
