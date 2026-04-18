"use client"

import { useState } from "react"
import { InwardRegister } from "@/lib/types"
import { InwardTable } from "@/components/inward-register/inward-table"
import { InwardFormModal } from "@/components/inward-register/inward-form-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { mockRegister } from "@/lib/mock-data"

export default function InwardRegisterPage() {
  const [data, setData] = useState<InwardRegister[]>(mockRegister)
  const [openForm, setOpenForm] = useState(false)
  const [editing, setEditing] = useState<InwardRegister | null>(null)

  const save = (row: InwardRegister) => {
    if (editing) {
      setData(prev => prev.map(d => d.id === row.id ? row : d))
    } else {
      setData(prev => [...prev, row])
    }
    setOpenForm(false)
    setEditing(null)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Inward Register</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage inward entries received across departments.
          </p>
        </div>

        <Button onClick={() => setOpenForm(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Inward
        </Button>
      </div>

      <InwardTable
        data={data}
        onView={(row)=>console.log("view",row)}
        onEdit={(row)=>{ setEditing(row); setOpenForm(true) }}
        onDelete={(id)=>setData(prev=>prev.filter(d=>d.id!==id))}
      />

      <InwardFormModal
        isOpen={openForm}
        data={editing}
        onClose={()=>{setOpenForm(false); setEditing(null)}}
        onSubmit={save}
      />
    </div>
  )
}
