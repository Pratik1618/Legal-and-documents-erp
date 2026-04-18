"use client"

import type { FormEvent } from "react"
import { useState } from "react"
import type { EscalationMatrix, InwardDeptType } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit2, Trash2 } from "lucide-react"

const deptTypes: InwardDeptType[] = [
  "ACCOUNTS",
  "ADMIN",
  "BILLING",
  "HR",
  "OPERATIONS",
  "LEGAL",
  "FINANCE",
  "QUALITY",
  "ENVIRONMENTAL",
]

const emptyMatrix = (): EscalationMatrix => ({
  id: "",
  department: "HR",
  l1: { name: "", email: "" },
  l2: { name: "", email: "" },
  l3: { name: "", email: "" },
  l4: { name: "", email: "" },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

interface Props {
  data: EscalationMatrix[]
  onSave: (row: EscalationMatrix) => void
  onDelete: (id: string) => void
}

export function EscalationMatrixManager({ data, onSave, onDelete }: Props) {
  const [form, setForm] = useState<EscalationMatrix>(emptyMatrix())
  const [isEditing, setIsEditing] = useState(false)

  const handleLevelChange = (
    level: "l1" | "l2" | "l3" | "l4",
    field: "name" | "email",
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [level]: {
        ...prev[level],
        [field]: value,
      },
    }))
  }

  const resetForm = () => {
    setForm(emptyMatrix())
    setIsEditing(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const timestamp = new Date().toISOString()
    onSave({
      ...form,
      id: form.id || `ESC-${Date.now()}`,
      createdAt: form.createdAt || timestamp,
      updatedAt: timestamp,
    })

    resetForm()
  }

  const handleEdit = (row: EscalationMatrix) => {
    setForm(row)
    setIsEditing(true)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 border border-border">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Escalation Matrix</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure L1 to L4 contacts with name and email for each department.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={form.department} onValueChange={(value: InwardDeptType) => setForm((prev) => ({ ...prev, department: value }))}>
              <SelectTrigger className="mt-2 max-w-sm">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {deptTypes.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {(["l1", "l2", "l3", "l4"] as const).map((level) => (
            <div key={level} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`${level}-name`} className="uppercase">
                  {level} Name
                </Label>
                <Input
                  id={`${level}-name`}
                  className="mt-2"
                  value={form[level].name}
                  onChange={(e) => handleLevelChange(level, "name", e.target.value)}
                  placeholder={`Enter ${level.toUpperCase()} name`}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`${level}-email`} className="uppercase">
                  {level} Email
                </Label>
                <Input
                  id={`${level}-email`}
                  type="email"
                  className="mt-2"
                  value={form[level].email}
                  onChange={(e) => handleLevelChange(level, "email", e.target.value)}
                  placeholder={`Enter ${level.toUpperCase()} email`}
                  required
                />
              </div>
            </div>
          ))}

          <div className="border-t border-border pt-6 flex gap-3 justify-end">
            {isEditing && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
            <Button type="submit">{isEditing ? "Update Matrix" : "Save Matrix"}</Button>
          </div>
        </form>
      </Card>

      <Card className="p-6 border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Department</th>
                <th className="text-left py-3 px-4">L1</th>
                <th className="text-left py-3 px-4">L2</th>
                <th className="text-left py-3 px-4">L3</th>
                <th className="text-left py-3 px-4">L4</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="border-b border-border hover:bg-muted/30 align-top">
                  <td className="py-3 px-4 font-medium">{row.department}</td>
                  <td className="py-3 px-4">
                    <div>{row.l1.name}</div>
                    <div className="text-muted-foreground">{row.l1.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{row.l2.name}</div>
                    <div className="text-muted-foreground">{row.l2.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{row.l3.name}</div>
                    <div className="text-muted-foreground">{row.l3.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div>{row.l4.name}</div>
                    <div className="text-muted-foreground">{row.l4.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(row)}>
                        <Edit2 className="w-4 h-4 text-amber-600" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => onDelete(row.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 px-4 text-center text-muted-foreground">
                    No escalation matrix entries added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
