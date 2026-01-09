"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Scale, LayoutDashboard, Menu, X, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Legal Notices", href: "/legal-notices", icon: Scale },
]

interface SidebarProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  isCollapsed: boolean
  onCollapseChange: (collapsed: boolean) => void
}

export function Sidebar({ isOpen, onOpenChange, isCollapsed, onCollapseChange }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => onOpenChange(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40 flex flex-col lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-20" : "w-64"}`}
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold text-sidebar-foreground">Legal and Doc System</h1>}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => onCollapseChange(!isCollapsed)}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>

        <nav className="space-y-2 flex-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                  onClick={() => onOpenChange(false)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4" />
                  {!isCollapsed && <span className="ml-2">{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => onOpenChange(false)} />}
    </>
  )
}
