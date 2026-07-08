import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/shared/type'
import { setUser, updateUser } from '@/redux/features/userSlice'

// ─── Mock API URL ─────────────────────────────────────────────────────────────

const MOCK_API_URL_USERS = 'https://e92545f9-8411-45b4-8f9f-e1e849eec2b0.mock.pstmn.io'

// ─── API Functions ────────────────────────────────────────────────────────────

async function fetchUserApi(id: number): Promise<User> {
  const response = await fetch(`${MOCK_API_URL_USERS}/users/${id}`)

  if (!response.ok) {
    throw new Error(`GET users/${id} failed with status ${response.status}`)
  }

  return response.json()
}

async function updateUserApi(payload: Partial<User>): Promise<User> {
  const response = await fetch(`${MOCK_API_URL_USERS}/users`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`PUT users failed with status ${response.status}`)
  }

  return response.json()
}

// ─── Action Types ─────────────────────────────────────────────────────────────

export const USER_FETCH_REQUESTED = 'user/fetchRequested'
export const USER_UPDATE_REQUESTED = 'user/updateRequested'
export const USER_REQUEST_FAILED = 'user/requestFailed'

// ─── Worker Sagas ─────────────────────────────────────────────────────────────

function* fetchUserSaga(action: PayloadAction<number>) {
  try {
    const user: User = yield call(fetchUserApi, action.payload)
    yield put(setUser(user))
  } catch (error) {
    yield put({ type: USER_REQUEST_FAILED, payload: (error as Error).message })
  }
}

function* updateUserSaga(action: PayloadAction<Partial<User>>) {
  try {
    const updatedUser: User = yield call(updateUserApi, action.payload)
    console.log(updatedUser)
    yield put(updateUser(action.payload))
  } catch (error) {
    yield put({ type: USER_REQUEST_FAILED, payload: (error as Error).message })
  }
}

// ─── Watcher Sagas ────────────────────────────────────────────────────────────

function* watchFetchUser() {
  yield takeLatest(USER_FETCH_REQUESTED, fetchUserSaga)
}

function* watchUpdateUser() {
  yield takeLatest(USER_UPDATE_REQUESTED, updateUserSaga)
}

// ─── Root Saga ────────────────────────────────────────────────────────────────

export default function* rootSaga() {
  yield all([
    fork(watchFetchUser),
    fork(watchUpdateUser),
  ])
}
