import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";


export const getAllRequest=createAsyncThunk("getAllReuest",async()=>{
    try {
        const headers={
            token:localStorage.getItem("employeeToken")
        }
        const result=await axios.get(`${BASE_URL}/employees/getRequests`,{headers});
        return result?.data?.requests
    } catch (error) {
        console.log(error);
        return error;
    }
})


const initialState={
    requests:null,
}
const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        setRequestAdmin:(state,action)=>{
            state.requests=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllRequest.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(getAllRequest.fulfilled,(state,action)=>{
            state.requests=action.payload;
            state.isLoading=false;
        })
        builder.addCase(getAllRequest.rejected,(state,action)=>{
            state.isLoading=false;
        })
    }
})

export let adminSliceReduce=adminSlice.reducer;
export let {setRequestAdmin}=adminSlice.actions