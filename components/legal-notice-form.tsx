"use client"

import type React from "react"

import { useState } from "react"
import type { LegalNotice, LegalNoticeReply } from "@/lib/types"
import { validateLegalNotice } from "@/lib/validation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Plus, Trash2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface LegalNoticeFormProps {
  initialData?: LegalNotice
  onSubmit: (data: LegalNotice) => void
  onCancel: () => void
}

export function LegalNoticeForm({ initialData, onSubmit, onCancel }: LegalNoticeFormProps) {
  const [formData, setFormData] = useState(
    initialData || {
      id: "",
      department: "",
      subject: "",
      inwardNumber: "",
      inwardDate: "",
      replies: [],
      period: "",
      amount: 0,
      remarks: "",
      stage: "Open" as const,
      finalStatus: "Pending",
      alertDays: 5,
      escalationL1: "",
      escalationL2: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const addReply = () => {
    const newReply: LegalNoticeReply = {
      text: "",
      type: "Own",
      responsiblePerson: "",
      createdAt: new Date().toISOString(),
    }
    setFormData((prev) => ({
      ...prev,
      replies: [...prev.replies, newReply],
    }))
  }

  const updateReply = (index: number, field: keyof LegalNoticeReply, value: any) => {
    setFormData((prev) => {
      const updatedReplies = [...prev.replies]
      updatedReplies[index] = { ...updatedReplies[index], [field]: value }
      return { ...prev, replies: updatedReplies }
    })
  }

  const removeReply = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      replies: prev.replies.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const validationErrors = validateLegalNotice(formData)
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
        id: formData.id || `LN-${Date.now()}`,
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
          {/* Department */}
          <div>
            <Label htmlFor="department" className="text-sm font-medium text-foreground">
              Department
            </Label>
            <Input
              type="text"
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
              placeholder="HR"
              className="mt-2"
            />
            {errors.department && <p className="text-xs text-destructive mt-1">{errors.department}</p>}
          </div>

          {/* Stage */}
          <div>
            <Label htmlFor="stage" className="text-sm font-medium text-foreground">
              Stage
            </Label>
            <Select value={formData.stage} onValueChange={(val) => handleChange("stage", val)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="md:col-span-2">
            <Label htmlFor="subject" className="text-sm font-medium text-foreground">
              Subject
            </Label>
            <Input
              type="text"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              placeholder="Legal notice subject"
              className="mt-2"
            />
            {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
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
              placeholder="IN-LN-2024-001"
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

          {/* Period */}
          <div>
            <Label htmlFor="period" className="text-sm font-medium text-foreground">
              Period
            </Label>
            <Input
              type="text"
              value={formData.period}
              onChange={(e) => handleChange("period", e.target.value)}
              placeholder="30 days"
              className="mt-2"
            />
            {errors.period && <p className="text-xs text-destructive mt-1">{errors.period}</p>}
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount" className="text-sm font-medium text-foreground">
              Amount
            </Label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) => handleChange("amount", Number.parseFloat(e.target.value) || 0)}
              placeholder="0"
              className="mt-2"
            />
            {errors.amount && <p className="text-xs text-destructive mt-1">{errors.amount}</p>}
          </div>

          {/* Final Status */}
          <div>
            <Label htmlFor="finalStatus" className="text-sm font-medium text-foreground">
              Final Status
            </Label>
            <Input
              type="text"
              value={formData.finalStatus}
              onChange={(e) => handleChange("finalStatus", e.target.value)}
              placeholder="Pending"
              className="mt-2"
            />
          </div>

          {/* Escalation L1 */}
          <div>
            <Label htmlFor="escalationL1" className="text-sm font-medium text-foreground">
              Escalation Level 1
            </Label>
            <Input
              type="text"
              value={formData.escalationL1}
              onChange={(e) => handleChange("escalationL1", e.target.value)}
              placeholder="Manager"
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
              onChange={(e) => handleChange("escalationL2", e.target.value)}
              placeholder="Director"
              className="mt-2"
            />
            {errors.escalationL2 && <p className="text-xs text-destructive mt-1">{errors.escalationL2}</p>}
          </div>

          {/* Alert Days */}
          <div>
            <Label htmlFor="alertDays" className="text-sm font-medium text-foreground">
              Alert Days
            </Label>
            <Input
              type="number"
              value={formData.alertDays}
              onChange={(e) => handleChange("alertDays", Number.parseInt(e.target.value) || 0)}
              placeholder="5"
              className="mt-2"
            />
          </div>

          {/* Remarks */}
          <div className="md:col-span-2">
            <Label htmlFor="remarks" className="text-sm font-medium text-foreground">
              Remarks
            </Label>
            <Textarea
              value={formData.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              placeholder="Add any remarks..."
              className="mt-2"
            />
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-foreground">Replies</h3>
            <Button type="button" variant="outline" size="sm" onClick={addReply}>
              <Plus className="w-4 h-4 mr-1" />
              Add Reply
            </Button>
          </div>

          {formData.replies.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No replies added yet. Click "Add Reply" to add one.</p>
          ) : (
            <div className="space-y-4">
              {formData.replies.map((reply, index) => (
                <Card key={index} className="p-4 border border-border bg-muted/20">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium text-foreground">Reply {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeReply(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Send By */}
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Send By</Label>
                      <Select value={reply.type} onValueChange={(val) => updateReply(index, "type", val)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Own">Own</SelectItem>
                          <SelectItem value="Advocate">Advocate</SelectItem>
                          <SelectItem value="Consultant">Consultant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Responsible Person */}
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2 block">Responsible Person</Label>
                      <Input
                        type="text"
                        value={reply.responsiblePerson}
                        onChange={(e) => updateReply(index, "responsiblePerson", e.target.value)}
                        placeholder="Person name"
                      />
                    </div>

                    {/* Reply Text */}
                    <div className="md:col-span-2">
                      <Label className="text-xs text-muted-foreground mb-2 block">Reply</Label>
                      <Textarea
                        value={reply.text}
                        onChange={(e) => updateReply(index, "text", e.target.value)}
                        placeholder="Enter reply text..."
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="border-t border-border pt-6 flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : initialData ? "Update Notice" : "Create Notice"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
