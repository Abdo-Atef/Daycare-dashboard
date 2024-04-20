import { configureStore } from '@reduxjs/toolkit'
import { employeeSliceReducer } from './employees_Slices/employeeSlice'
import { parentSliceReducer } from './parents_Slices/parent_slices'

export const store = configureStore({
  reducer: {
    employee:employeeSliceReducer,
    parent:parentSliceReducer,
  },
})