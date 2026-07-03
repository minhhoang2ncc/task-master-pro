import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "@/shared/type"

const initialState: User = {
  displayName: "Nguyễn Văn A",
  email: "vana.intern@taskmaster.pro",
  role: "Frontend Engineering Intern",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<User>) => action.payload,
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      Object.assign(state, action.payload)
    },
    resetUser: () => initialState,
  },
})

export const { setUser, updateUser, resetUser } = userSlice.actions
export default userSlice.reducer
