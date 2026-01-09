"use client"

import type React from "react"
import { useState } from "react"
import { Analytics } from "@vercel/analytics/next"
import { Sidebar } from "@/components/sidebar"

function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <>
      <div className="flex h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onOpenChange={setSidebarOpen}
          isCollapsed={sidebarCollapsed}
          onCollapseChange={setSidebarCollapsed}
        />
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}`}
        >
          {children}
        </main>
      </div>
      <Analytics />
    </>
  )
}

export default ClientLayout
