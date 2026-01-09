"use client"

import { useState, useMemo } from "react"
import type { LegalNotice } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Edit2, Trash2, Eye } from "lucide-react"

interface LegalNoticesTableProps {
  notices: LegalNotice[]
  onEdit: (notice: LegalNotice) => void
  onDelete: (id: string) => void
  onView: (notice: LegalNotice) => void
}

export function LegalNoticesTable({ notices, onEdit, onDelete, onView }: LegalNoticesTableProps) {
  const [filterStage, setFilterStage] = useState<string>("All Stages")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchStage = filterStage === "All Stages" || notice.stage === filterStage
      const matchSearch =
        !searchTerm ||
        notice.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.department.toLowerCase().includes(searchTerm.toLowerCase())
      return matchStage && matchSearch
    })
  }, [notices, filterStage, searchTerm])

  return (
    <Card className="p-6 border border-border">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by Subject or Department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={filterStage} onValueChange={setFilterStage}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Stages">All Stages</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Subject</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Department</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Inward #</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Stage</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotices.map((notice) => (
              <tr key={notice.id} className="border-b border-border hover:bg-muted/30 transition">
                <td className="py-3 px-4 text-foreground">{notice.subject}</td>
                <td className="py-3 px-4 text-foreground">{notice.department}</td>
                <td className="py-3 px-4 text-foreground">{notice.inwardNumber}</td>
                <td className="py-3 px-4 text-foreground">₹{notice.amount.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      notice.stage === "Open"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {notice.stage}
                  </span>
                </td>
                <td className="py-3 px-4 text-foreground text-sm">{notice.finalStatus}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(notice)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(notice)}
                      className="text-amber-600 hover:text-amber-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(notice.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Showing {filteredNotices.length} of {notices.length} notices
      </p>
    </Card>
  )
}
