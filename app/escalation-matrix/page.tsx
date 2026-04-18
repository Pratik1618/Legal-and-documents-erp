"use client"

import { useEffect, useState } from "react"
import type { EscalationMatrix } from "@/lib/types"
import { EscalationMatrixManager } from "@/components/inward-register/escalation-matrix-manager"
import { mockEscalationMatrix } from "@/lib/mock-data"
import { getStoredEscalationMatrix, saveEscalationMatrix } from "@/lib/escalation-matrix-storage"

export default function EscalationMatrixPage() {
  const [matrixData, setMatrixData] = useState<EscalationMatrix[]>(mockEscalationMatrix)
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setMatrixData(getStoredEscalationMatrix())
    setHasLoaded(true)
  }, [])

  useEffect(() => {
    if (!hasLoaded) {
      return
    }

    saveEscalationMatrix(matrixData)
  }, [hasLoaded, matrixData])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Escalation Matrix</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Common escalation contacts for all departments.
        </p>
      </div>

      <EscalationMatrixManager
        data={matrixData}
        onSave={(row) =>
          setMatrixData((prev) => {
            const exists = prev.some((item) => item.id === row.id)
            return exists ? prev.map((item) => (item.id === row.id ? row : item)) : [...prev, row]
          })
        }
        onDelete={(id) => setMatrixData((prev) => prev.filter((item) => item.id !== id))}
      />
    </div>
  )
}
