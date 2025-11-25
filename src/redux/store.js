import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlide'
import userReducer from './slides/userSlide'
import { use } from 'react'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
  devTools: true,
})