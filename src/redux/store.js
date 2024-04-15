import { configureStore } from '@reduxjs/toolkit'
import { employeeSliceReducer } from './employees_Slices/employeeSlice'

export const store = configureStore({
  reducer: {
    employee:employeeSliceReducer,
  },
})