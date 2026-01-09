"use client"

import { useState, useMemo } from "react"
import type { ImportantDocument, DocumentStatus, DocumentType } from "@/lib/types"
import { getStatusColor, getDaysUntilExpiry } from "@/lib/status-utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Edit2, Trash2, Eye } from "lucide-react"

interface DocumentsTableProps {
  documents: ImportantDocument[]
  onEdit: (doc: ImportantDocument) => void
  onDelete: (id: string) => void
  onView: (doc: ImportantDocument) => void
}

const documentTypeLabels: Record<DocumentType, string> = {
  CLRA: "Contract Labour License",
  SHOP_ACT: "Shop Act License",
  ISO_CERT: "ISO Certification",
  PSARA: "PSARA",
  ELECTRICAL: "Electrical License",
}

export function DocumentsTable({ documents, onEdit, onDelete, onView }: DocumentsTableProps) {
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | "all">("all")
  const [filterType, setFilterType] = useState<DocumentType | "all">("all")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchStatus = filterStatus === "all" || doc.status === filterStatus
      const matchType = filterType === "all" || doc.documentType === filterType
      const matchSearch =
        !searchTerm ||
        doc.inwardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase())
      return matchStatus && matchType && matchSearch
    })
  }, [documents, filterStatus, filterType, searchTerm])

  return (
    <Card className="p-6 border border-border">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by Inward Number or Person..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
              <SelectItem value="Renewed">Renewed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(documentTypeLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Document Type</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Inward #</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Responsible</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Expiry Date</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Days Left</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => {
              const daysLeft = getDaysUntilExpiry(doc.expiryDate)
              return (
                <tr key={doc.id} className="border-b border-border hover:bg-muted/30 transition">
                  <td className="py-3 px-4 text-foreground">{documentTypeLabels[doc.documentType]}</td>
                  <td className="py-3 px-4 text-foreground">{doc.inwardNumber}</td>
                  <td className="py-3 px-4 text-foreground">{doc.responsiblePerson}</td>
                  <td className="py-3 px-4 text-foreground">{new Date(doc.expiryDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-foreground">
                    <span
                      className={`font-semibold ${
                        daysLeft < 0 ? "text-red-600" : daysLeft <= 30 ? "text-yellow-600" : "text-green-600"
                      }`}
                    >
                      {daysLeft < 0 ? `${Math.abs(daysLeft)}d ago` : `${daysLeft}d`}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(doc)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(doc)}
                        className="text-amber-600 hover:text-amber-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(doc.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Showing {filteredDocuments.length} of {documents.length} documents
      </p>
    </Card>
  )
}
