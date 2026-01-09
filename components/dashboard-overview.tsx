"use client"
import { getDashboardMetrics } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { AlertCircle, FileText, Scale } from "lucide-react"

export function DashboardOverview() {
  const metrics = getDashboardMetrics()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Expiring Documents</p>
            <p className="text-3xl font-bold text-foreground">{metrics.expiringDocumentsCount}</p>
          </div>
          <FileText className="w-10 h-10 text-blue-500 opacity-20" />
        </div>
        <p className="text-xs text-muted-foreground mt-4">Within 30 days</p>
      </Card>

      <Card className="p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Open Legal Notices</p>
            <p className="text-3xl font-bold text-foreground">{metrics.openLegalNoticesCount}</p>
          </div>
          <Scale className="w-10 h-10 text-amber-500 opacity-20" />
        </div>
        <p className="text-xs text-muted-foreground mt-4">Awaiting action</p>
      </Card>

      <Card className="p-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">High Risk Items</p>
            <p className="text-3xl font-bold text-foreground">{metrics.highRiskCount}</p>
          </div>
          <AlertCircle className="w-10 h-10 text-red-500 opacity-20" />
        </div>
        <p className="text-xs text-muted-foreground mt-4">Expired + Open notices</p>
      </Card>
    </div>
  )
}
