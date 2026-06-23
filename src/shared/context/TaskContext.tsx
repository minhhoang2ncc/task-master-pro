import { createContext, useContext } from "react"
import type { ReactNode } from "react"

interface Task {
  id: number
  Title: string
  Description: string
  Priority: string
  DueDate: Date
}

interface TaskContextType {
  tasks: Task[]
  getTaskById: (id: number) => Task | undefined
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children, tasks }: { children: ReactNode; tasks: Task[] }) {
  const getTaskById = (id: number) => tasks.find(task => task.id === id)

  return (
    <TaskContext.Provider value={{ tasks, getTaskById }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within TaskProvider")
  }
  return context
}