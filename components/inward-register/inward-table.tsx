"use client"

import { InwardRegister } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Edit2, Trash2 } from "lucide-react"
import { Input } from "../ui/input"
import { useMemo, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface Props {
    data: InwardRegister[]
    onView: (row: InwardRegister) => void
    onEdit: (row: InwardRegister) => void
    onDelete: (id: string) => void
}

export function InwardTable({ data, onView, onEdit, onDelete }: Props) {

    const [filterDept, setFilterDept] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState("")

    const filteredDocuments = useMemo(() => {
        return data.filter((doc) => {

            // Department filter
            const matchDept =
                filterDept === "all" || doc.department === filterDept

            // Search filter (multiple fields)
            const matchSearch =
                !searchTerm ||
                doc.receivingPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.forwardToPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.documentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.physicalFileNo.toLowerCase().includes(searchTerm.toLowerCase())

            return matchDept && matchSearch
        })
    }, [data, filterDept, searchTerm])

    return (
        <Card className="p-6 border border-border">
            <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <Input
                        placeholder="Search by person, doc type, file no..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <Select value={filterDept} onValueChange={setFilterDept}>
                        <SelectTrigger className="w-full md:w-40">
                            <SelectValue placeholder="Filter by Dept" />
                        </SelectTrigger>
                        <SelectContent>

                            <SelectItem value="all">ALL Dept</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="ACCOUNTS">Accounts</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                    {/* Example Department Filter */}

                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-3 px-4">Document Type</th>
                            <th className="text-left py-3 px-4">Received Date</th>
                            <th className="text-left py-3 px-4">Receiving Person</th>
                            <th className="text-left py-3 px-4">Department</th>
                            <th className="text-left py-3 px-4">Forward To</th>
                            <th className="text-left py-3 px-4">Physical File No</th>
                            <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredDocuments.map((row) => (
                            <tr key={row.id} className="border-b hover:bg-muted/30">
                                <td className="py-3 px-4">{row.documentType}</td>
                                <td className="py-3 px-4">
                                    {new Date(row.receivedDate).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4">{row.receivingPerson}</td>
                                <td className="py-3 px-4">{row.department}</td>
                                <td className="py-3 px-4">{row.forwardToPerson}</td>
                                <td className="py-3 px-4">{row.physicalFileNo}</td>
                                <td className="py-3 px-4">
                                    <div className="flex gap-2">
                                        
                                        <Button size="sm" variant="ghost" onClick={() => onEdit(row)}>
                                            <Edit2 className="w-4 h-4 text-amber-600" />
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={() => onDelete(row.id)}>
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
               <p className="text-xs text-muted-foreground mt-4">
        Showing {filteredDocuments.length} of {data.length} documents
      </p>
        </Card>
    )
}
