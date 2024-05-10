import { configureStore } from '@reduxjs/toolkit'
import { employeeSliceReducer } from './employees_Slices/employeeSlice'
import { parentSliceReducer } from './parents_Slices/parent_slices'
import { InterviewerSliceReducer} from './interviewer_Slices/interviewerSlice'
import { evaluatorSliceReducer } from './employees_Slices/evaluatorSlice'
import { groupSliceReducer } from './employees_Slices/groupSlice'
import { childrenSliceReducer } from './employees_Slices/childrenSlice'

export const store = configureStore({
  reducer: {
    employee:employeeSliceReducer,
    parent:parentSliceReducer,
    interviewer:InterviewerSliceReducer,
    evaluator:evaluatorSliceReducer,
    group:groupSliceReducer,
    children:childrenSliceReducer,
  },
})