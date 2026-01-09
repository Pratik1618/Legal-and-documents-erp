export interface ValidationError {
  field: string
  message: string
}

export function validateDocument(data: Record<string, any>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.documentType?.trim()) {
    errors.push({ field: "documentType", message: "Document type is required" })
  }

  if (!data.periodFrom?.trim()) {
    errors.push({ field: "periodFrom", message: "Period from date is required" })
  }

  if (!data.periodTo?.trim()) {
    errors.push({ field: "periodTo", message: "Period to date is required" })
  }

  if (!data.expiryDate?.trim()) {
    errors.push({ field: "expiryDate", message: "Expiry date is required" })
  }

  if (!data.inwardNumber?.trim()) {
    errors.push({ field: "inwardNumber", message: "Inward number is required" })
  }

  if (!data.inwardDate?.trim()) {
    errors.push({ field: "inwardDate", message: "Inward date is required" })
  }

  if (!data.responsiblePerson?.trim()) {
    errors.push({ field: "responsiblePerson", message: "Responsible person is required" })
  }

  if (!data.escalationL1?.trim()) {
    errors.push({ field: "escalationL1", message: "Escalation Level 1 is required" })
  }

  if (!data.escalationL2?.trim()) {
    errors.push({ field: "escalationL2", message: "Escalation Level 2 is required" })
  }

  if (!data.escalationL3?.trim()) {
    errors.push({ field: "escalationL3", message: "Escalation Level 3 is required" })
  }

  // Validate dates
  const periodFrom = new Date(data.periodFrom)
  const periodTo = new Date(data.periodTo)
  const expiryDate = new Date(data.expiryDate)

  if (periodFrom >= periodTo) {
    errors.push({ field: "periodTo", message: "Period To must be after Period From" })
  }

  if (expiryDate < periodTo) {
    errors.push({ field: "expiryDate", message: "Expiry date must be after Period To" })
  }

  return errors
}

export function validateLegalNotice(data: Record<string, any>): ValidationError[] {
  const errors: ValidationError[] = []

  if (!data.department?.trim()) {
    errors.push({ field: "department", message: "Department is required" })
  }

  if (!data.subject?.trim()) {
    errors.push({ field: "subject", message: "Subject is required" })
  }

  if (!data.inwardNumber?.trim()) {
    errors.push({ field: "inwardNumber", message: "Inward number is required" })
  }

  if (!data.inwardDate?.trim()) {
    errors.push({ field: "inwardDate", message: "Inward date is required" })
  }

  if (typeof data.amount !== "number" || data.amount < 0) {
    errors.push({ field: "amount", message: "Amount must be a positive number" })
  }

  if (!data.period?.trim()) {
    errors.push({ field: "period", message: "Period is required" })
  }

  if (!data.escalationL1?.trim()) {
    errors.push({ field: "escalationL1", message: "Escalation Level 1 is required" })
  }

  if (!data.escalationL2?.trim()) {
    errors.push({ field: "escalationL2", message: "Escalation Level 2 is required" })
  }

  return errors
}
