"use client"

import type React from "react"

import { useEffect, useState } from "react"
import type { ImportantDocument, DocumentType, DocumentStatus, InwardDeptType } from "@/lib/types"
import { validateDocument } from "@/lib/validation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { getEscalationMatrixByDepartment } from "@/lib/escalation-matrix-storage"

const documentTypeOptions: { value: DocumentType; label: string }[] = [
  { value: "CLRA", label: "Contract Labour License" },
  { value: "SHOP_ACT", label: "Shop Act License" },
  { value: "ISO_CERT", label: "ISO Certification" },
  { value: "PSARA", label: "PSARA" },
  { value: "ELECTRICAL", label: "Electrical License" },
]

const statusOptions: { value: DocumentStatus; label: string }[] = [
  { value: "Active", label: "Active" },
  { value: "Expired", label: "Expired" },
  { value: "Renewed", label: "Renewed" },
]

const departmentOptions: InwardDeptType[] = [
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

interface DocumentFormProps {
  initialData?: ImportantDocument
  onSubmit: (data: ImportantDocument) => void
  onCancel: () => void
}

export function DocumentForm({ initialData, onSubmit, onCancel }: DocumentFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      id: "",
      department: "HR" as InwardDeptType,
      documentType: "" as DocumentType,
      periodFrom: "",
      periodTo: "",
      expiryDate: "",
      inwardNumber: "",
      inwardDate: "",
      autoRenewalAlert: false,
      responsiblePerson: "",
      escalationL1: "",
      escalationL2: "",
      escalationL3: "",
      status: "Active" as DocumentStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [matrixNotice, setMatrixNotice] = useState("")

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  useEffect(() => {
    const matrix = getEscalationMatrixByDepartment(formData.department)

    if (!matrix) {
      setMatrixNotice(`No common escalation matrix found for ${formData.department}.`)
      setFormData((prev) => ({
        ...prev,
        escalationL1: "",
        escalationL2: "",
        escalationL3: "",
      }))
      return
    }

    setMatrixNotice(`Escalation levels are auto-filled from the common matrix for ${formData.department}.`)
    setFormData((prev) => ({
      ...prev,
      escalationL1: matrix.l1.name,
      escalationL2: matrix.l2.name,
      escalationL3: matrix.l3.name,
    }))
  }, [formData.department])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const validationErrors = validateDocument(formData)
    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce(
        (acc, err) => {
          acc[err.field] = err.message
          return acc
        },
        {} as Record<string, string>,
      )
      setErrors(errorMap)
      setIsSubmitting(false)
      return
    }

    setTimeout(() => {
      onSubmit({
        ...formData,
        id: formData.id || `DOC-${Date.now()}`,
        updatedAt: new Date().toISOString(),
      })
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <Card className="p-6 border border-border max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please correct the errors below before submitting.</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="department" className="text-sm font-medium text-foreground">
              Department
            </Label>
            <Select value={formData.department} onValueChange={(val: InwardDeptType) => handleChange("department", val)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map((department) => (
                  <SelectItem key={department} value={department}>
                    {department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && <p className="text-xs text-destructive mt-1">{errors.department}</p>}
          </div>

          {/* Document Type */}
          <div>
            <Label htmlFor="documentType" className="text-sm font-medium text-foreground">
              Document Type
            </Label>
            <Select value={formData.documentType} onValueChange={(val) => handleChange("documentType", val)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.documentType && <p className="text-xs text-destructive mt-1">{errors.documentType}</p>}
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className="text-sm font-medium text-foreground">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(val) => handleChange("status", val)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Period From */}
          <div>
            <Label htmlFor="periodFrom" className="text-sm font-medium text-foreground">
              Period From
            </Label>
            <Input
              type="date"
              value={formData.periodFrom}
              onChange={(e) => handleChange("periodFrom", e.target.value)}
              className="mt-2"
            />
            {errors.periodFrom && <p className="text-xs text-destructive mt-1">{errors.periodFrom}</p>}
          </div>

          {/* Period To */}
          <div>
            <Label htmlFor="periodTo" className="text-sm font-medium text-foreground">
              Period To
            </Label>
            <Input
              type="date"
              value={formData.periodTo}
              onChange={(e) => handleChange("periodTo", e.target.value)}
              className="mt-2"
            />
            {errors.periodTo && <p className="text-xs text-destructive mt-1">{errors.periodTo}</p>}
          </div>

          {/* Expiry Date */}
          <div>
            <Label htmlFor="expiryDate" className="text-sm font-medium text-foreground">
              Expiry Date
            </Label>
            <Input
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
              className="mt-2"
            />
            {errors.expiryDate && <p className="text-xs text-destructive mt-1">{errors.expiryDate}</p>}
          </div>

          {/* Inward Number */}
          <div>
            <Label htmlFor="inwardNumber" className="text-sm font-medium text-foreground">
              Inward Number
            </Label>
            <Input
              type="text"
              value={formData.inwardNumber}
              onChange={(e) => handleChange("inwardNumber", e.target.value)}
              placeholder="IN-2024-001"
              className="mt-2"
            />
            {errors.inwardNumber && <p className="text-xs text-destructive mt-1">{errors.inwardNumber}</p>}
          </div>

          {/* Inward Date */}
          <div>
            <Label htmlFor="inwardDate" className="text-sm font-medium text-foreground">
              Inward Date
            </Label>
            <Input
              type="date"
              value={formData.inwardDate}
              onChange={(e) => handleChange("inwardDate", e.target.value)}
              className="mt-2"
            />
            {errors.inwardDate && <p className="text-xs text-destructive mt-1">{errors.inwardDate}</p>}
          </div>

          {/* Responsible Person */}
          <div>
            <Label htmlFor="responsiblePerson" className="text-sm font-medium text-foreground">
              Responsible Person
            </Label>
            <Input
              type="text"
              value={formData.responsiblePerson}
              onChange={(e) => handleChange("responsiblePerson", e.target.value)}
              placeholder="John Smith"
              className="mt-2"
            />
            {errors.responsiblePerson && <p className="text-xs text-destructive mt-1">{errors.responsiblePerson}</p>}
          </div>

          <div className="md:col-span-2 rounded-lg border border-border bg-muted/20 p-4">
            <p className="text-sm text-muted-foreground">{matrixNotice}</p>
          </div>

          {/* Escalation L1 */}
          <div>
            <Label htmlFor="escalationL1" className="text-sm font-medium text-foreground">
              Escalation Level 1
            </Label>
            <Input
              type="text"
              value={formData.escalationL1}
              readOnly
              placeholder="Auto-filled from matrix"
              className="mt-2"
            />
            {errors.escalationL1 && <p className="text-xs text-destructive mt-1">{errors.escalationL1}</p>}
          </div>

          {/* Escalation L2 */}
          <div>
            <Label htmlFor="escalationL2" className="text-sm font-medium text-foreground">
              Escalation Level 2
            </Label>
            <Input
              type="text"
              value={formData.escalationL2}
              readOnly
              placeholder="Auto-filled from matrix"
              className="mt-2"
            />
            {errors.escalationL2 && <p className="text-xs text-destructive mt-1">{errors.escalationL2}</p>}
          </div>

          {/* Escalation L3 */}
          <div>
            <Label htmlFor="escalationL3" className="text-sm font-medium text-foreground">
              Escalation Level 3
            </Label>
            <Input
              type="text"
              value={formData.escalationL3}
              readOnly
              placeholder="Auto-filled from matrix"
              className="mt-2"
            />
            {errors.escalationL3 && <p className="text-xs text-destructive mt-1">{errors.escalationL3}</p>}
          </div>

          {/* Auto-Renewal Alert */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="autoRenewalAlert"
              checked={formData.autoRenewalAlert}
              onChange={(e) => handleChange("autoRenewalAlert", e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="autoRenewalAlert" className="ml-2 text-sm font-medium text-foreground">
              Enable Auto-Renewal Alert
            </Label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="border-t border-border pt-6 flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
         < Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Document" : "Create Document"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
