import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";


export const getAllemployees = createAsyncThunk('getAllemployees', 
  async()=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/getAllEmployee`, {headers});
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  } 
)

export const getSpEmployee = createAsyncThunk('getSpEmployee', 
  async(id)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/getSpEmployee/${id}`, {headers});
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  } 
)

export const addNewEmployee = createAsyncThunk('addNewEmployee', 
  async(params)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.post(`${BASE_URL}/employees/addEmployee`, params, {headers});
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  } 
)


const initialState = {
  employeeToken: localStorage.getItem("employeeToken"),
  // employeeToken: false,
  employees:null
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeToken: (state, action) => {
      state.employeeToken = action.payload;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getAllemployees.fulfilled, (state, action)=>{
      state.employees = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAllemployees.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getAllemployees.pending, (state)=>{
      state.isLoading = true;
    })
  }
});

export let employeeSliceReducer = employeeSlice.reducer;
export let { setEmployeeToken } = employeeSlice.actions;
