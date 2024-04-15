import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // employeeToken: localStorage.getItem("employeeToken"),
  employeeToken: false,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeToken: (state, action) => {
      state.employeeToken = action.payload;
    },
  },
});

export let employeeSliceReducer = employeeSlice.reducer;
export let { setEmployeeToken } = employeeSlice.actions;
