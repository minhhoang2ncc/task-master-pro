import type { Dayjs } from "dayjs"

export type Status = 'completed' | 'pending' | 'cancelled'


export interface Subtask {
  id: number
  title: string
  completed: boolean
}

export interface TaskRecord {
  id: number
  title: string
  description?: string
  priority: string
  dueDate: Dayjs
  status: Status
  tags?: { name: string; color: string }[]
  subtasks?: Subtask[]
}

export interface User {
  displayName: string
  email: string
  role: string
}

export interface NotificationSettings {
  browserNotifications: boolean
  emailNotifications: boolean
}

export type AppLanguage = "English" | "Spanish" | "Vietnamese"

export interface LanguageSettings {
  language: AppLanguage
}
