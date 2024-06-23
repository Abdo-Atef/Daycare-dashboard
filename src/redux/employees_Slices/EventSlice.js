import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

export const getAllEvents=createAsyncThunk('getAllEvent',async()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/employees/events/getEventWithAllInf?eventName=`,{headers})
        return result.data.events
    } catch (error) {
        
    }
})


const initialState={
    events:null,
}
const EventSlice=createSlice({
    name:'events',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getAllEvents.fulfilled,(state,action)=>{
            state.events=action.payload;
            state.isLoading=false
        });
        builder.addCase(getAllEvents.pending,(state,action)=>{
            state.isLoading=true
        });
        builder.addCase(getAllEvents.rejected,(state,action)=>{
            state.isLoading=false
        });
    }
})

export const EventSliceReducer=EventSlice.reducer;