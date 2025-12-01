import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slides/productSlide'
import userReducer from './slides/userSlide'
import { use } from 'react'

export const store = configureStore({
  reducer: {
    product: productReducer,
    user: userReducer,
  },
  devTools: true,
})