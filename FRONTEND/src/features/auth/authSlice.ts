import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  isLoggedIn: boolean
  userInfo: { username: string } | null
}

const initialState: AuthState = {
  isLoggedIn: false,
  userInfo: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.isLoggedIn = true
      state.userInfo = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.userInfo = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
