import type { EscalationMatrix, InwardDeptType } from "./types"
import { mockEscalationMatrix } from "./mock-data"

export const ESCALATION_MATRIX_STORAGE_KEY = "erp-escalation-matrix"

export function getStoredEscalationMatrix(): EscalationMatrix[] {
  if (typeof window === "undefined") {
    return mockEscalationMatrix
  }

  try {
    const stored = window.localStorage.getItem(ESCALATION_MATRIX_STORAGE_KEY)
    if (!stored) {
      return mockEscalationMatrix
    }

    const parsed = JSON.parse(stored) as EscalationMatrix[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : mockEscalationMatrix
  } catch {
    return mockEscalationMatrix
  }
}

export function saveEscalationMatrix(data: EscalationMatrix[]) {
  if (typeof window === "undefined") {
    return
  }

  window.localStorage.setItem(ESCALATION_MATRIX_STORAGE_KEY, JSON.stringify(data))
}

export function getEscalationMatrixByDepartment(department: InwardDeptType) {
  return getStoredEscalationMatrix().find((item) => item.department === department)
}
