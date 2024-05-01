import { configureStore } from '@reduxjs/toolkit'
import { employeeSliceReducer } from './employees_Slices/employeeSlice'
import { parentSliceReducer } from './parents_Slices/parent_slices'
import { InterviewerSliceReducer} from './interviewer_Slices/interviewerSlice'
import { evaluatorSliceReducer } from './employees_Slices/evaluatorSlice'

export const store = configureStore({
  reducer: {
    employee:employeeSliceReducer,
    parent:parentSliceReducer,
    interviewer:InterviewerSliceReducer,
    evaluator:evaluatorSliceReducer
  },
})