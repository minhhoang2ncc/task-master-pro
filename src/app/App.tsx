import { Route, Routes } from "react-router-dom"
import { AppSidebar } from "@/shared/layouts/app-sidebar"
import { NavBar } from "@/shared/layouts/navbar"
import { SidebarProvider, SidebarTrigger } from "@/shared/components/sidebar"
import { DashboardPage } from "@/pages/DashboardPage"
import { AnalyticsPage } from "@/pages/AnalyticsPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { TaskProvider } from "@/shared/context/TaskContext"
import { TaskDetailPage } from "@/pages/TaskDetailPage"

export default function App() {
  const allTasks = [
  { id: 1, Title: "Design new landing page", Description: "Create a new landing page for the product", Priority: "High", DueDate: new Date("2024-06-15") },
  { id: 2, Title: "Fix login bug", Description: "Resolve the issue with user login", Priority: "Medium", DueDate: new Date("2024-06-10") },
  { id: 3, Title: "Update user profile UI", Description: "Improve the user profile page design", Priority: "Low", DueDate: new Date("2024-06-20") },
  { id: 4, Title: "Implement search functionality", Description: "Add search capabilities to the application", Priority: "High", DueDate: new Date("2024-06-18") },
]
  return (
    <TaskProvider tasks={allTasks}>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <div className="flex items-center h-16 bg-card border-b border-border shadow-sm px-4 gap-2">
          <SidebarTrigger />
          <NavBar />
        </div>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage name="John Doe" numTask={5} />} />
            <Route path="/task/:id" element={<TaskDetailPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* <Route path="/" element={<DashboardPage name="John Doe" numTask={5} />} /> */}
          </Routes>
        </main>
      </SidebarProvider>
    </TaskProvider>
  )
}
