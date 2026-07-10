import { Route, Routes } from "react-router-dom"
import { AppSidebar } from "@/shared/layouts/app-sidebar"
import { NavBar } from "@/shared/layouts/navbar"
import { SidebarProvider, SidebarTrigger } from "@/shared/components/sidebar"
import { DashboardPage } from "@/pages/DashboardPage"
import { AnalyticsPage } from "@/pages/AnalyticsPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { TaskDetailPage } from "@/pages/TaskDetailPage"
import { TaskForm } from "@/shared/layouts/task-form"
import { UserForm } from "@/shared/layouts/user-form"
import type { TaskRecord } from "@/shared/type"

export default function App() {

  const draftTask: TaskRecord = {
    id: 0,
    title: "",
    description: "",
    priority: "Low",
    dueDate: new Date().toISOString().split("T")[0],
    status: "pending",
    subtasks: [],
    tags: [],
  }


  return (
    //    <TaskProvider tasks={allTasks}>
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex items-center h-16 bg-background
           px-4 gap-2">
          <SidebarTrigger />
          <NavBar />
        </div>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage name="John Doe" numTask={5} />} />
          <Route path="/task/:id" element={<TaskDetailPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <TaskForm task={draftTask} />
      <UserForm />
    </SidebarProvider>
    //    </TaskProvider>
  )
}
