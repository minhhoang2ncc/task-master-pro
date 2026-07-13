import type { TaskRecord } from "@/shared/type"
import axiosInstance from "@/api/axiosInstance"

// ─── Task API ─────────────────────────────────────────────────────────────────

// GET /tasks
export async function getTasks(): Promise<TaskRecord[]> {
  const { data } = await axiosInstance.get<TaskRecord[]>("/tasks")
  return data
}

// GET /tasks/:id
export async function getTaskById(id: number): Promise<TaskRecord> {
  const { data } = await axiosInstance.get<TaskRecord>(`/tasks/${id}`)
  return data
}

// POST /tasks  (create a new task)
export async function postCreateTask(payload: TaskRecord): Promise<TaskRecord> {
  const { data } = await axiosInstance.post<TaskRecord>("/tasks", payload)
  return data
}

// POST /tasks  (persist an edited task)
export async function postSaveTask(payload: TaskRecord): Promise<TaskRecord> {
  const { data } = await axiosInstance.put<TaskRecord>("/tasks", payload)
  return data
}

// DELETE /tasks/:id
export async function deleteTask(id: number): Promise<void> {
  await axiosInstance.delete(`/tasks/${id}`)
}
