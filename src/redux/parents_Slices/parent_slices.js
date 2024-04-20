import { createSlice } from "@reduxjs/toolkit";

const initialState={
    parentToken:localStorage.getItem("parentToken"),
}
const parentSlice=createSlice({
    name:"parent",
    initialState,
    reducers:{
        setParentToken:(state,action)=>{
            state.parentToken=action.payload;
        }
    }
});

export const parentSliceReducer=parentSlice.reducer;
export const {setParentToken}=parentSlice.actions;