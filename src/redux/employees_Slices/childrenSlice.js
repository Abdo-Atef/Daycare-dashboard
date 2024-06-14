import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";


export const getChildren = createAsyncThunk('getChildren', 
  async()=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/groups/getAllChildrenNotInGroup`, {headers});
      // console.log(data.data);
      return data.data.students
    } catch (error) {
      console.log(error);
      return error
    }
  } 
)

export const getGroupsToSetIn = createAsyncThunk('getGroupsToSetIn', 
  async()=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/groups/allGroupsForAdmin`, {headers});
      const Data = data.data.groups;
      const newArr = []
      if (Data.length > 0) {
        for (let i = 0; i < Data.length; i++) {
          newArr.push(
            {
            label:Data[i].groupName,
            value:Data[i].id
            }
          )
        }
      }
      // console.log(newArr);
      return newArr
    } catch (error) {
      console.log(error);
      return error
    }
  } 
)

export const addChildrenToGroup = createAsyncThunk('addChildrenToGroup', 
  async(values)=>{
    let params= {
      studentsId : values.childrenIds
    }
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.patch(`${BASE_URL}/employees/groups/assignChildrenTOGroup/${values.id}`, params, {headers});
      // console.log(data.data);
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  }
)

const initialState = {
  children:null,
  GroupsToSetIn:null,
};

export const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers:{
    setChildren : (state, action) => {
      state.children = action.payload;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getChildren.fulfilled, (state, action)=>{
      state.children = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getChildren.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getChildren.pending, (state)=>{
      state.isLoading = true;
    })
    /* ------------------------------------------------ */
    builder.addCase(getGroupsToSetIn.fulfilled, (state, action)=>{
      state.GroupsToSetIn = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getGroupsToSetIn.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getGroupsToSetIn.pending, (state)=>{
      state.isLoading = true;
    })
  }
});

export let childrenSliceReducer = childrenSlice.reducer;
export let { setChildren } = childrenSlice.actions;