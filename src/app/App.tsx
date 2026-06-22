import { Route, Routes } from "react-router-dom"
import { AppSidebar } from "@/shared/layouts/app-sidebar"
import { NavBar } from "@/shared/layouts/navbar"
import { SidebarProvider, SidebarTrigger } from "@/shared/components/sidebar"
import { DashboardPage } from "@/pages/DashboardPage"
import { AnalyticsPage } from "@/pages/AnalyticsPage"
import { SettingsPage } from "@/pages/SettingsPage"

export default function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center h-16 bg-card border-b border-border shadow-sm px-4 gap-2">
          <SidebarTrigger />
          <NavBar />
        </div>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage name="John Doe" numTask={5} />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* <Route path="/" element={<DashboardPage name="John Doe" numTask={5} />} /> */}
        </Routes>
      </main>
    </SidebarProvider>
  )
}
