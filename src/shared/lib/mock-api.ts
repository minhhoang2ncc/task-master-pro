const MOCK_API_URL_TASKS = "https://6a476118abfcbaade11850fd.mockapi.io/api/tmp/tasks"
// const MOCK_API_URL_TASKLIST = "https://6a476118abfcbaade11850fd.mockapi.io/api/tmp/tasklist"
const MOCK_API_URL_SETTINGS = "https://6a476118abfcbaade11850fd.mockapi.io/api/tmp/settings"

export async function postSaveTask(payload: unknown) {
  const response = await fetch(MOCK_API_URL_TASKS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`POST ${MOCK_API_URL_TASKS} failed with status ${response.status}`)
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

export async function postCreateTask(payload: unknown) {
  const response = await fetch(MOCK_API_URL_TASKS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`POST ${MOCK_API_URL_TASKS} failed with status ${response.status}`)
  }

  return response.json()
}