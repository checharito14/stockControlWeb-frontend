import type React from "react"
import { Sidebar } from "@/components/Sidebar"
import { getUserProfile } from "@/lib/api"
import { Header } from "@/components/Header"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {

  const user = await getUserProfile()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user}/>
        <main className="flex-1 overflow-auto p-10">{children}</main>
      </div>
    </div>
  )
}
