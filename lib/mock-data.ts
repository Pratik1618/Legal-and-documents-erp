import type { ImportantDocument, InwardRegister, LegalNotice } from "./types"

export const mockDocuments: ImportantDocument[] = [
  {
    id: "DOC-001",
    documentType: "CLRA",
    periodFrom: "2023-01-15",
    periodTo: "2025-01-14",
    expiryDate: "2025-01-14",
    inwardNumber: "IN-2023-001",
    inwardDate: "2023-01-15",
    autoRenewalAlert: true,
    responsiblePerson: "John Smith",
    escalationL1: "Manager",
    escalationL2: "Director",
    escalationL3: "Executive",
    status: "Active",
    createdAt: "2023-01-15",
    updatedAt: "2024-12-20",
  },
  {
    id: "DOC-002",
    documentType: "ISO_CERT",
    periodFrom: "2022-06-10",
    periodTo: "2025-06-09",
    expiryDate: "2025-06-09",
    inwardNumber: "IN-2022-045",
    inwardDate: "2022-06-10",
    autoRenewalAlert: false,
    responsiblePerson: "Sarah Johnson",
    escalationL1: "QA Lead",
    escalationL2: "Operations Head",
    escalationL3: "CEO",
    status: "Active",
    createdAt: "2022-06-10",
    updatedAt: "2024-11-15",
  },
  {
    id: "DOC-003",
    documentType: "SHOP_ACT",
    periodFrom: "2020-03-20",
    periodTo: "2025-03-19",
    expiryDate: "2025-03-19",
    inwardNumber: "IN-2020-012",
    inwardDate: "2020-03-20",
    autoRenewalAlert: true,
    responsiblePerson: "Michael Brown",
    escalationL1: "Compliance Officer",
    escalationL2: "Legal Head",
    escalationL3: "COO",
    status: "Expired",
    createdAt: "2020-03-20",
    updatedAt: "2025-01-05",
  },
  {
    id: "DOC-004",
    documentType: "ELECTRICAL",
    periodFrom: "2024-02-01",
    periodTo: "2025-01-31",
    expiryDate: "2025-01-31",
    inwardNumber: "IN-2024-078",
    inwardDate: "2024-02-01",
    autoRenewalAlert: true,
    responsiblePerson: "Emily Davis",
    escalationL1: "Facility Manager",
    escalationL2: "Operations Head",
    escalationL3: "CFO",
    status: "Active",
    createdAt: "2024-02-01",
    updatedAt: "2024-12-15",
  },
]

export const mockRegister :InwardRegister[]=[
  {
    department:"HR",
    receivedDate:"2026-01-10",
    receivingPerson:"pratik",
    forwardToPerson:"ops",
    documentType:"LETTER",
    physicalFileNo:"21",
    id:"INR-001",
    createdAt:"2024-11-25",
    updatedAt:"2024-10-26"
    
  }
]

export const mockLegalNotices: LegalNotice[] = [
  {
    id: "LN-001",
    relatedDocumentId: "DOC-001",
    department: "HR",
    subject: "Contract Labour Compliance Review",
    inwardNumber: "IN-LN-2024-001",
    inwardDate: "2024-11-20",
    replies: [
      {
        text: "Initial assessment completed. All documentation in order.",
        type: "Own",
        responsiblePerson: "John Smith",
        createdAt: "2024-11-25",
      },
    ],
    period: "30 days",
    amount: 5000,
    remarks: "Routine compliance check",
    stage: "Open",
    finalStatus: "Pending",
    alertDays: 5,
    escalationL1: "Manager",
    escalationL2: "Director",
    createdAt: "2024-11-20",
    updatedAt: "2024-12-20",
  },
  {
    id: "LN-002",
    department: "Legal",
    subject: "Tax Notice - FY 2023-24",
    inwardNumber: "IN-LN-2024-002",
    inwardDate: "2024-10-15",
    replies: [
      {
        text: "Engaged external advocate for review.",
        type: "Advocate",
        responsiblePerson: "Advocate ABC",
        createdAt: "2024-10-20",
      },
      {
        text: "Initial response filed.",
        type: "Own",
        responsiblePerson: "Legal Team",
        createdAt: "2024-11-10",
      },
    ],
    period: "60 days",
    amount: 25000,
    remarks: "Tax demand notice - under review",
    stage: "Open",
    finalStatus: "In Progress",
    alertDays: 15,
    escalationL1: "Legal Head",
    escalationL2: "CFO",
    createdAt: "2024-10-15",
    updatedAt: "2024-12-15",
  },
  {
    id: "LN-003",
    relatedDocumentId: "DOC-003",
    department: "Operations",
    subject: "Shop Act Violation Notice",
    inwardNumber: "IN-LN-2024-003",
    inwardDate: "2024-09-01",
    replies: [
      {
        text: "Corrective measures implemented.",
        type: "Own",
        responsiblePerson: "Michael Brown",
        createdAt: "2024-09-10",
      },
      {
        text: "Consultant reviewed and approved.",
        type: "Consultant",
        responsiblePerson: "Safety Consultant",
        createdAt: "2024-09-20",
      },
    ],
    period: "45 days",
    amount: 3000,
    remarks: "Minor violations - resolved",
    stage: "Closed",
    finalStatus: "Resolved",
    alertDays: 0,
    escalationL1: "Operations Head",
    escalationL2: "COO",
    createdAt: "2024-09-01",
    updatedAt: "2024-10-15",
  },
  {
    id: "LN-004",
    department: "Finance",
    subject: "Labor Law Compliance - Minimum Wage Adjustment",
    inwardNumber: "IN-LN-2024-004",
    inwardDate: "2024-12-01",
    replies: [
      {
        text: "Reviewing updated wage structure for compliance.",
        type: "Own",
        responsiblePerson: "HR Manager",
        createdAt: "2024-12-05",
      },
    ],
    period: "30 days",
    amount: 8500,
    remarks: "Annual wage adjustment notification",
    stage: "Open",
    finalStatus: "Pending",
    alertDays: 20,
    escalationL1: "Finance Head",
    escalationL2: "COO",
    createdAt: "2024-12-01",
    updatedAt: "2025-01-08",
  },
  {
    id: "LN-005",
    relatedDocumentId: "DOC-002",
    department: "Quality",
    subject: "ISO Certification - Audit Finding Review",
    inwardNumber: "IN-LN-2024-005",
    inwardDate: "2024-11-10",
    replies: [
      {
        text: "Non-conformity identified during audit.",
        type: "Audit Body",
        responsiblePerson: "Audit Team XYZ",
        createdAt: "2024-11-12",
      },
      {
        text: "Corrective action plan submitted.",
        type: "Own",
        responsiblePerson: "Sarah Johnson",
        createdAt: "2024-11-28",
      },
      {
        text: "Follow-up audit scheduled for February 2025.",
        type: "Audit Body",
        responsiblePerson: "Audit Team XYZ",
        createdAt: "2025-01-05",
      },
    ],
    period: "90 days",
    amount: 12000,
    remarks: "Non-conformity CAP under monitoring",
    stage: "Open",
    finalStatus: "In Progress",
    alertDays: 45,
    escalationL1: "QA Lead",
    escalationL2: "Operations Head",
    createdAt: "2024-11-10",
    updatedAt: "2025-01-05",
  },
  {
    id: "LN-006",
    department: "Environmental",
    subject: "Environmental Compliance - Waste Management",
    inwardNumber: "IN-LN-2024-006",
    inwardDate: "2024-08-15",
    replies: [
      {
        text: "Waste audit completed successfully.",
        type: "Own",
        responsiblePerson: "Sustainability Officer",
        createdAt: "2024-09-01",
      },
      {
        text: "All requirements met. Approved by authority.",
        type: "Authority",
        responsiblePerson: "Environmental Department",
        createdAt: "2024-10-30",
      },
    ],
    period: "60 days",
    amount: 4200,
    remarks: "Quarterly waste management certification",
    stage: "Closed",
    finalStatus: "Resolved",
    alertDays: 0,
    escalationL1: "Operations Head",
    escalationL2: "CEO",
    createdAt: "2024-08-15",
    updatedAt: "2024-11-05",
  },
]

export function getDashboardMetrics() {
  const now = new Date()
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const expiringDocumentsCount = mockDocuments.filter((doc) => {
    const expiry = new Date(doc.expiryDate)
    return expiry <= thirtyDaysFromNow && expiry > now && doc.status !== "Expired"
  }).length

  const openLegalNoticesCount = mockLegalNotices.filter((n) => n.stage === "Open").length

  const highRiskCount =
    mockDocuments.filter((d) => d.status === "Expired").length +
    mockLegalNotices.filter((n) => n.stage === "Open" && n.period === "60 days").length

  return {
    expiringDocumentsCount,
    openLegalNoticesCount,
    highRiskCount,
  }
}
