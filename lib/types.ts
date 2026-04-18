// Data types and interfaces for the ERP application

export type DocumentType = "CLRA" | "SHOP_ACT" | "ISO_CERT" | "PSARA" | "ELECTRICAL"

export type DocumentStatus = "Active" | "Expired" | "Renewed"
export type LegalNoticeStage = "Open" | "Closed"
export type ReplyType = "Own" | "Advocate" | "Consultant" | "Audit Body" | "Authority"

export interface ImportantDocument {
  id: string
  department: InwardDeptType
  documentType: DocumentType
  periodFrom: string
  periodTo: string
  expiryDate: string
  inwardNumber: string
  inwardDate: string
  autoRenewalAlert: boolean
  responsiblePerson: string
  escalationL1: string
  escalationL2: string
  escalationL3: string
  status: DocumentStatus
  createdAt: string
  updatedAt: string
}

export interface LegalNoticeReply {
  text: string
  type: ReplyType
  responsiblePerson: string
  createdAt: string
}

export interface LegalNotice {
  id: string
  relatedDocumentId?: string
  department: InwardDeptType
  subject: string
  inwardNumber: string
  inwardDate: string
  replies: LegalNoticeReply[]
  period: string
  amount: number
  remarks: string
  stage: LegalNoticeStage
  finalStatus: string
  alertDays: number
  escalationL1: string
  escalationL2: string
  createdAt: string
  updatedAt: string
}

export interface DashboardMetrics {
  expiringDocumentsCount: number
  openLegalNoticesCount: number
  highRiskCount: number
}

export type InwardDocumentType =
  | "LETTER"
  | "NOTICE"
  | "AGREEMENT"
  | "LICENSE"
  | "INVOICE"
  | "OTHER"

export type InwardDeptType =
  | "HR"
  | "ACCOUNTS"
  | "BILLING"
  | "OPERATIONS"
  | "ADMIN"
  | "LEGAL"
  | "FINANCE"
  | "QUALITY"
  | "ENVIRONMENTAL"
export interface InwardRegister {
  id: string
  documentType: InwardDocumentType
  receivedDate: string
  receivingPerson: string
  department: string
  forwardToPerson: string
  physicalFileNo: string
  remarks?: string
  createdAt: string
  updatedAt: string
}

export interface EscalationLevelContact {
  name: string
  email: string
}

export interface EscalationMatrix {
  id: string
  department: InwardDeptType
  l1: EscalationLevelContact
  l2: EscalationLevelContact
  l3: EscalationLevelContact
  l4: EscalationLevelContact
  createdAt: string
  updatedAt: string
}
