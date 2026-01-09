"use client"

import { useState } from "react"
import { DashboardOverview } from "@/components/dashboard-overview"
import { DocumentsTable } from "@/components/documents-table"
import { LegalNoticesTable } from "@/components/legal-notices-table"
import { mockDocuments, mockLegalNotices } from "@/lib/mock-data"
import type { ImportantDocument, LegalNotice } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
  const [documents, setDocuments] = useState<ImportantDocument[]>(mockDocuments)
  const [legalNotices, setLegalNotices] = useState<LegalNotice[]>(mockLegalNotices)

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id))
  }

  const handleDeleteNotice = (id: string) => {
    setLegalNotices(legalNotices.filter((n) => n.id !== id))
  }

  return (
    <div className="p-4 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Compliance & Legal Document Management</p>
      </header>

      <section className="mb-8">
        <DashboardOverview />
      </section>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Important Documents</h2>
          <Link href="/documents">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <DocumentsTable
          documents={documents.slice(0, 3)}
          onEdit={() => {}}
          onDelete={handleDeleteDocument}
          onView={() => {}}
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Recent Legal Notices</h2>
          <Link href="/legal-notices">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <LegalNoticesTable
          notices={legalNotices.slice(0, 3)}
          onEdit={() => {}}
          onDelete={handleDeleteNotice}
          onView={() => {}}
        />
      </section>
    </div>
  )
}
