import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TaskRecord } from "@/shared/type";

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
  }
})

export const { append, remove, modify } = TaskSlice.actions
export default TaskSlice.reducer
