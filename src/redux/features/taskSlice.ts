import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TaskRecord } from "@/shared/type";
import { getTasks, getTaskById, postCreateTask, deleteTask as deleteTaskApi } from "@/shared/lib/mock-api";

// ─── Async Thunks ────────────────────────────────────────────────────────────

export const fetchTasks = createAsyncThunk<TaskRecord[]>(
  "task/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getTasks()
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const fetchTaskById = createAsyncThunk<TaskRecord, number>(
  "task/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await getTaskById(id)
    } catch (error) {
      return rejectWithValue((error as Error).message)
    }
  }
)

export const createTask = createAsyncThunk<void, TaskRecord>(
  "task/create",
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(append(payload))
    try {
      await postCreateTask(payload)
    } catch (error) {
      dispatch(remove({ id: payload.id }))
      return rejectWithValue((error as Error).message)
    }
  }
)

export const deleteTask = createAsyncThunk<void, TaskRecord>(
  "task/delete",
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(remove({ id: payload.id }))
    try {
      await deleteTaskApi(payload.id)
    } catch (error) {
      dispatch(append(payload))
      return rejectWithValue((error as Error).message)
    }
  }
)

// ─── Slice ───────────────────────────────────────────────────────────────────

const initialState: TaskRecord[] = []

export const TaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    append: (taskList, action: PayloadAction<TaskRecord>) => {
      taskList.push(action.payload)
    },
    remove: (taskList, action: PayloadAction<{ id: number }>) => {
      const index = taskList.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        taskList.splice(index, 1)
      }
    },
    modify: (taskList, action: PayloadAction<TaskRecord>) => {
      const index = taskList.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        taskList[index] = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    // fetchTasks — replace entire list with server response
    builder.addCase(fetchTasks.fulfilled, (_, action) => {
      return action.payload
    })

    // fetchTaskById — upsert single task from server
    builder.addCase(fetchTaskById.fulfilled, (taskList, action) => {
      const index = taskList.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        taskList[index] = action.payload
      } else {
        taskList.push(action.payload)
      }
    })

    // createTask.rejected — log error (rollback already handled inside the thunk)
    builder.addCase(createTask.rejected, (_, action) => {
      console.error("Failed to create task via API:", action.payload)
    })

    // deleteTask.rejected — log error (rollback already handled inside the thunk)
    builder.addCase(deleteTask.rejected, (_, action) => {
      console.error("Failed to delete task via API:", action.payload)
    })
  }
})

export const { append, remove, modify } = TaskSlice.actions
export default TaskSlice.reducer
