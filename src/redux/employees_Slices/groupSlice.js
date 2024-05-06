import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";


export const getAllGroups = createAsyncThunk('getAllGroups', 
  async()=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/groups/allGroupsForAdmin`, {headers});
      console.log(data.data);
      return data.data.groups
    } catch (error) {
      console.log(error);
      return error
    }
  } 
)

export const RequestsThatEvaluatorReview = createAsyncThunk('RequestsThatEvaluatorReview', 
  async()=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/reviewRequest/getRequestsRevBySpEval`, {headers});
      // console.log(data.data);
      return data.data.requests
    } catch (error) {
      console.log(error);
      return error
    }
  } 
)


const initialState = {
  allGroups:null,
  evaluatorRequests:null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers:{
    setEvaluatedRequests : (state, action) => {
      state.evaluatorRequests = action.payload;
    },
    setEvaluatorRequests : (state, action) => {
      state.allRequests = action.payload;
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getAllGroups.fulfilled, (state, action)=>{
      state.allGroups = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAllGroups.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getAllGroups.pending, (state)=>{
      state.isLoading = true;
    })
    /* ------------------------------ RequestsThatEvaluatorReview ------------------------------------------- */
    builder.addCase(RequestsThatEvaluatorReview.fulfilled, (state, action)=>{
      state.evaluatorRequests = action.payload;
      state.isLoading = false;
    })
    builder.addCase(RequestsThatEvaluatorReview.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(RequestsThatEvaluatorReview.pending, (state)=>{
      state.isLoading = true;
    })
  }
});

export let groupSliceReducer = groupSlice.reducer;
export let { setEvaluatedRequests, setEvaluatorRequests } = groupSlice.actions;