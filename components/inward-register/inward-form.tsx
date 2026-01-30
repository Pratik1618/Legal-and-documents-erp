"use client"

import { useState } from "react"
import { InwardRegister, InwardDocumentType, InwardDeptType } from "@/lib/types"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"

const docTypes: InwardDocumentType[] = ["LETTER", "NOTICE", "AGREEMENT", "LICENSE", "INVOICE", "OTHER"]

const deptTypes:InwardDeptType[] = ["ACCOUNTS",'ADMIN','BILLING','HR','OPERATIONS'
]
export function InwardForm({ initialData, onSubmit, onCancel }: any) {
    const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [form, setForm] = useState<InwardRegister>(
    
    initialData || {
      id: "",
      documentType: "LETTER",
      receivedDate: "",
      receivingPerson: "",
      department: "",
      forwardToPerson: "",
      physicalFileNo: "",
      remarks: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  )

  const handleChange = (k: keyof InwardRegister, v: any) => {
    setForm(prev => ({ ...prev, [k]: v }))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit({
      ...form,
      id: form.id || `IN-${Date.now()}`,
      updatedAt: new Date().toISOString()
    })
  }

  return (
    <Card className="p-6 border-border max-w-4xl">
      <form className="space-y-6" onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="documentType" className="text-sm font-medium text-foreground">Document Type</Label>
            <Select value={form.documentType} onValueChange={(v) => handleChange("documentType", v)}>
              <SelectTrigger className="mt-2"><SelectValue placeholder="Select document type" /></SelectTrigger>
              <SelectContent>
                {docTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="periodFrom" className="text-sm font-medium text-foreground">Received Date</Label>
            <Input type="date" className="mt-2" value={form.receivedDate} onChange={e => handleChange("receivedDate", e.target.value)} />
          </div>

          <div>
            <Label htmlFor="receivingPerson" className="text-sm font-medium text-foreground">Receiving Person</Label>
            <Input className="mt-2" value={form.receivingPerson} onChange={e => handleChange("receivingPerson", e.target.value)} />
          </div>

      <div>
          <Label htmlFor="department" className="text-sm font-medium text-foreground">Department</Label>
         <Select value={form.department} onValueChange={(v) => handleChange("department", v)}>
              <SelectTrigger className="mt-2"><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>
                {deptTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
        </div>
  <div>
          <Label htmlFor="fowardToPerson"  className="text-sm font-medium text-foreground">Forward To Person</Label>
          <Input value={form.forwardToPerson} onChange={e => handleChange("forwardToPerson", e.target.value)} className="mt-2"/>
        </div>

 <div>
          <Label htmlFor="physicalFileNo"  className="text-sm font-medium text-foreground">Physical File No</Label>
          <Input value={form.physicalFileNo} onChange={e => handleChange("physicalFileNo", e.target.value)} className="mt-2"/>
        </div>
        </div>





  

      

       

        <div className="border-t border-border pt-6 flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          < Button type="submit" disabled={isSubmitting}>
                     {isSubmitting ? "Saving..." : initialData ? "Update Document" : "Create Document"}
                   </Button>
        </div>

      </form>
    </Card>
  )
}
