const MOCK_API_URL_TASKS = "https://e92545f9-8411-45b4-8f9f-e1e849eec2b0.mock.pstmn.io"
// const MOCK_API_URL_TASKLIST = "https://6a476118abfcbaade11850fd.mockapi.io/api/tmp/tasklist"
const MOCK_API_URL_SETTINGS = "https://6a476118abfcbaade11850fd.mockapi.io/api/tmp/settings"

// GET /tasks
export async function getTasks() {
  const response = await fetch(`${MOCK_API_URL_TASKS}/tasks`)

  if (!response.ok) {
    throw new Error(`GET ${MOCK_API_URL_TASKS}/tasks failed with status ${response.status}`)
  }

  return response.json()
}

// GET /tasks/:id
export async function getTaskById(id: number) {
  const response = await fetch(`${MOCK_API_URL_TASKS}/tasks/${id}`)

  if (!response.ok) {
    throw new Error(`GET ${MOCK_API_URL_TASKS}/tasks/${id} failed with status ${response.status}`)
  }

  return response.json()
}

// POST /tasks (create new task)
export async function postCreateTask(payload: unknown) {
  const response = await fetch(`${MOCK_API_URL_TASKS}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`POST ${MOCK_API_URL_TASKS}/tasks failed with status ${response.status}`)
  }

  return response.json()
}

export async function postSaveTask(payload: unknown) {
  const response = await fetch(`${MOCK_API_URL_TASKS}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`POST ${MOCK_API_URL_TASKS}/tasks failed with status ${response.status}`)
  }

  return response.json()
}

export async function deleteTask(id: number) {
  const response = await fetch(`${MOCK_API_URL_TASKS}/tasks/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`DELETE ${MOCK_API_URL_TASKS}/tasks/${id} failed with status ${response.status}`)
  }

  return response.json()
}

export async function postSaveSettings(payload: unknown) {
  const response = await fetch(MOCK_API_URL_SETTINGS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`POST ${MOCK_API_URL_SETTINGS} failed with status ${response.status}`)
  }

  return response.json()
}
