// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todosSlice'
import chatReducer from './chatSlice'
import userReducer from './userSlice'
export const store = configureStore({
  reducer: {
    chatReducer,
    userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
