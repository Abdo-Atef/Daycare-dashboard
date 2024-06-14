import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";
export const getAllInterview=createAsyncThunk('getAllInterviewing',async(endPoint="allIntervieweingStageForInterviewer")=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/employees/reviewRequest/${endPoint}`,{headers});
        return result?.data.requests;
    } catch (error) {
        console.log(error);
        return error
    }
})

export const resultgetInterview=createAsyncThunk('resutlInterview',async()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/employees/reviewRequest/getAllIntreviewedRequestsForThisInterviewer`,{headers})
        console.log(result.data.requests);
        return result?.data.requests
    } catch (error) {
        console.log(error);
        return error
    }
})

export const SearchInterviwByEmail=createAsyncThunk('searchByEmail',async (email)=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/employees/reviewRequest/SpRequetsForInterviwer?email=${email}`,{headers})
        console.log(result);
        return result.data?.requests
    } catch (error) {
        console.log(error);
    }
})
const initialState={
    interviews:null,
    resultInterviews:null,
}
export const interviewerSlice=createSlice({
    name:"interviwer",
    initialState,
    reducers:{
        setInterviewerRequests : (state, action) => {
            state.resultInterviews = action.payload;
        },
        setAllIntervews:(state,action)=>{
            state.interviews=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllInterview.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(getAllInterview.fulfilled,(state,action)=>{
            state.interviews=action.payload
            state.isLoading=false
        })
        builder.addCase(getAllInterview.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(SearchInterviwByEmail.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(SearchInterviwByEmail.fulfilled,(state,action)=>{
            state.interviews=action.payload
            state.isLoading=false
        })
        builder.addCase(SearchInterviwByEmail.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(resultgetInterview.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(resultgetInterview.fulfilled,(state,action)=>{
            state.resultInterviews=action.payload
            state.isLoading=false        
        })
        builder.addCase(resultgetInterview.rejected,(state,action)=>{
            state.isLoading=false
        })
    }
})

export let InterviewerSliceReducer = interviewerSlice.reducer;
export let { setAllIntervews,setInterviewerRequests } = interviewerSlice.actions;