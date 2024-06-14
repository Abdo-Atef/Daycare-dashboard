import { configureStore } from '@reduxjs/toolkit'
import { employeeSliceReducer } from './employees_Slices/employeeSlice'
import { parentSliceReducer } from './parents_Slices/parent_slices'
import { InterviewerSliceReducer} from './interviewer_Slices/interviewerSlice'
import { evaluatorSliceReducer } from './employees_Slices/evaluatorSlice'
import { adminSliceReduce } from './admin_slice/adminSlice'
import { supervisorSliceReducer } from './BusSupervisor_slice/SupervisorSlice'

export const store = configureStore({
  reducer: {
    employee:employeeSliceReducer,
    parent:parentSliceReducer,
    interviewer:InterviewerSliceReducer,
    evaluator:evaluatorSliceReducer,
    admin:adminSliceReduce,
    supervisor:supervisorSliceReducer
  },
})