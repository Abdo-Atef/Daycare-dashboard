import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";


export const getAllRequestsToEvaluator = createAsyncThunk('getAllRequestsToEvaluator', 
  async()=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/reviewRequest/getRequestsToEvaluator`, {headers});
      // console.log(data.data);
      return data.data.requests
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
      console.log(data.data);
      return data.data.requests
    } catch (error) {
      console.log(error);
      return error
    }
  } 
)


const initialState = {
  allRequests:null,
  evaluatorRequests:null,
};

export const evaluatorSlice = createSlice({
  name: "evaluator",
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
    builder.addCase(getAllRequestsToEvaluator.fulfilled, (state, action)=>{
      state.allRequests = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAllRequestsToEvaluator.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getAllRequestsToEvaluator.pending, (state)=>{
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

export let evaluatorSliceReducer = evaluatorSlice.reducer;
export let { setEvaluatedRequests, setEvaluatorRequests } = evaluatorSlice.actions;