// Data types and interfaces for the ERP application

export type DocumentType = "CLRA" | "SHOP_ACT" | "ISO_CERT" | "PSARA" | "ELECTRICAL"

export type DocumentStatus = "Active" | "Expired" | "Renewed"
export type LegalNoticeStage = "Open" | "Closed"
export type ReplyType = "Own" | "Advocate" | "Consultant"

export interface ImportantDocument {
  id: string
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
  department: string
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
