import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";


export const getAllemployees = createAsyncThunk('getAllemployees', 
  async(role)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      console.log(headers.token);
      const data = await axios.get(`${BASE_URL}/employees/getAllEmployee?role=${role}`, {headers});
      console.log(data.data);
      return data.data.employees
    } catch (error) {
      console.log(error);
      return error
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
      // console.log(data.data);
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
      // console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  } 
)
export const getEmployeeProfile = createAsyncThunk('getEmployeeProfile', 
  async()=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/employeeProfile`, {headers});
      // console.log(data.data);
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  } 
)

export const searchForEmployees = createAsyncThunk('searchForEmployees', 
  async(name)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/SpEmployeeByPhoneByName?name=${name}`, {headers});
      console.log(data.data);
      return data.data.employees
    } catch (error) {
      console.log(error);
      return error
    }
  } 
)


const initialState = {
  employeeToken: localStorage.getItem("employeeToken"),
  // employeeToken: false,
  employees:null,
  employeeProfileData:null
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeToken: (state, action) => {
      state.employeeToken = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
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
    /* -------------------------- employeeProfileData -------------------------- */
    builder.addCase(getEmployeeProfile.fulfilled, (state, action)=>{
      state.employeeProfileData = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getEmployeeProfile.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getEmployeeProfile.pending, (state)=>{
      state.isLoading = true;
    })
    /* -------------------------- searchForEmployees -------------------------- */
    builder.addCase(searchForEmployees.fulfilled, (state, action)=>{
      state.employees = action.payload;
      state.isLoading = false;
    })
    builder.addCase(searchForEmployees.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(searchForEmployees.pending, (state)=>{
      state.isLoading = true;
    })
  }
});

export let employeeSliceReducer = employeeSlice.reducer;
export let { setEmployeeToken, setEmployees } = employeeSlice.actions;
