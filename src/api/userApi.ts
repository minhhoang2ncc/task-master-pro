import type { User } from "@/shared/type"
import axiosInstance from "@/api/axiosInstance"

// Settings endpoint lives on a different mock server
import axios from "axios"

const SETTINGS_BASE_URL = "https://6a476118abfcbaade11850fd.mockapi.io/api/tmp"

const settingsAxios = axios.create({
  baseURL: SETTINGS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// ─── User API ─────────────────────────────────────────────────────────────────

// GET /users/:id
export async function fetchUser(id: number): Promise<User> {
  const { data } = await axiosInstance.get<User>(`/users/${id}`)
  return data
}

// PUT /users
export async function updateUser(payload: Partial<User>): Promise<User> {
  const { data } = await axiosInstance.put<User>("/users", payload)
  return data
}

// ─── Settings API ─────────────────────────────────────────────────────────────

// POST /settings
export async function postSaveSettings(payload: unknown): Promise<unknown> {
  const { data } = await settingsAxios.post("/settings", payload)
  console.log(data)
  return data
}
