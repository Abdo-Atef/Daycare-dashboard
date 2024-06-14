import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";

export const getAllFreeSupervisor=createAsyncThunk('getAllFreeSupervisor',async ()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/bus/getFreeBusSeueprvisorsOrGetFilterByName?busSuperviosrName`,{headers})
        return result.data;
        
    } catch (error) {
        console.log(error);
        return error
    }
})
export const getAllBus=createAsyncThunk('getAllBus',async()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/bus/getAllBusesForAdmin`,{headers})
        console.log(result.data);
        return result.data
    } catch (error) {
        console.log(error);
    }
})
export const getBusFilter=createAsyncThunk('getBusFilter',async()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/bus/getAllBusesForAdmin`,{headers})
        console.log(result.data.allbuses);
        return result.data.allbuses
    } catch (error) {
        console.log(error);
    }
})
export const getAllChildWithoutBus=createAsyncThunk('getAllChildWithoutBus',async ()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/bus/getAllFreeChildrenWithoutBus?groupName=&childName=`,{headers})
        console.log(result.data);
        return result.data
    } catch (error) {
        console.log(error);
        return error
    }
})
export const groupBusSupervisor=createAsyncThunk(`groupBusSupervisor`,async ()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/employees/getSpBusForBusSupervisor`,{headers})
        return result.data;
    } catch (error) {
        console.log(error);
        return error
    }
})
export const ChildBusSupervisor=createAsyncThunk(`ChildBusSupervisor`,async ()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const result=await axios.get(`${BASE_URL}/employees/getSpBusForBusSupervisor`,{headers})
        return result.data.bus.children;
    } catch (error) {
        console.log(error);
        return error
    }
})
const initialState={
    freeSupervisor:null,
    Busses:null,
    filterBus:null,
    childsWithoutBus:null,
    groupBus:null,
    childBus:null,
}

const supervisorSlice=createSlice({
    name:'supervisor',
    initialState,
    reducers:{
        setBusSupervisor:(state,action)=>{
            state.childBus=action.payload
        },
        setFilterBusSupervisor:(state,action)=>{
            state.filterBus=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllFreeSupervisor.pending,(state,action)=>{
            state.isLoading=true
        });
        builder.addCase(getAllFreeSupervisor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.freeSupervisor=action.payload
        })
        builder.addCase(getAllFreeSupervisor.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(getAllBus.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(getAllBus.fulfilled,(state,action)=>{
            state.isLoading=false
            state.Busses=action.payload
        })
        builder.addCase(getAllBus.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(getAllChildWithoutBus.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(getAllChildWithoutBus.fulfilled,(state,action)=>{
            state.isLoading=false
            state.childsWithoutBus=action.payload
        })
        builder.addCase(getAllChildWithoutBus.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(groupBusSupervisor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.groupBus=action.payload
        })
        builder.addCase(groupBusSupervisor.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(groupBusSupervisor.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(ChildBusSupervisor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.childBus=action.payload
        })
        builder.addCase(ChildBusSupervisor.rejected,(state,action)=>{
            state.isLoading=false
        })
        builder.addCase(ChildBusSupervisor.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(getBusFilter.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(getBusFilter.fulfilled,(state,action)=>{
            state.isLoading=false
            state.filterBus=action.payload
        })
        builder.addCase(getBusFilter.rejected,(state,action)=>{
            state.isLoading=false
        })
    }
})

export let supervisorSliceReducer=supervisorSlice.reducer
export let {setBusSupervisor,setFilterBusSupervisor}=supervisorSlice.actions