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
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  } 
)
export const getSpecificGroupData = createAsyncThunk('getSpecificGroupData', 
  async(id)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/groups/getSpGroupWithAllDataAndStudents/${id}`, {headers});
      console.log(data.data.group);
      return data.data.group
    } catch (error) {
      console.log(error);
      return error
    }
  } 
)

export const getAllFreeSupervisors = createAsyncThunk('getAllFreeSupervisors', 
  async()=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/groups/allFreeSupervisor`, {headers});
      const Data = data.data.supervisors;
      const newArr = []
      if (Data.length > 0) {
        for (let i = 0; i < Data.length; i++) {
          newArr.push(
            {
            label:Data[i].name,
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

export const SearchForGroups = createAsyncThunk('allGroupsFIlterByName', 
  async(value)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.get(`${BASE_URL}/employees/groups/allGroupsFIlterByName?groupName=${value}`, {headers});
      console.log(data.data);
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  }
)
export const addNewGroup = createAsyncThunk('addNewGroup', 
  async(values)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.post(`${BASE_URL}/employees/groups/makeGroup`, values, {headers});
      console.log(data.data);
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  }
)

export const updateGroup = createAsyncThunk('updateGroup', 
  async(values)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.patch(`${BASE_URL}/employees/groups/updateGroup/${values.id}`, 
      { 
        groupName:values.groupName,
        capacity:values.capacity
      }, 
      {headers});
      // console.log(data.data);
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  }
)
export const updateGroupSupervisor = createAsyncThunk('updateGroupSupervisor', 
  async(values)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.patch(`${BASE_URL}/employees/groups/upadateGroupSupervisor/${values.id}`, {
        groupSupervisor:values.supervisorId
        }, 
        {headers}
      );
      // console.log(data.data);
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  }
)

export const removeChildrenFromGroup = createAsyncThunk('removeChildrenFromGroup', 
  async(values)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.patch(`${BASE_URL}/employees/groups/removeChildrenFromSpGroup/${values.id}`, 
      {children:values.childrenIds}, 
      {headers});
      // console.log(data.data);
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  }
)

export const removeSupervisorOfGroup = createAsyncThunk('removeSupervisorOfGroup', 
  async(id)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.patch(`${BASE_URL}/employees/groups/makeGroupWithoutSuperviosr/${id}`,{}, {headers});
      // console.log(data.data);
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  }
)

export const deleteGroup = createAsyncThunk('deleteGroup', 
  async(id)=>{
    try {
      const headers = {
        token : localStorage.getItem('employeeToken')
      }
      const data = await axios.delete(`${BASE_URL}/employees/groups/deleteGroup/${id}`, {headers});
      // console.log(data.data);
      return data.data
    } catch (error) {
      console.log(error);
      return error
    }
  }
)

const initialState = {
  allGroups:null,
  allFreeSupervisors:null,
  spGroupData:null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers:{
    setAllGroups : (state, action) => {
      state.allGroups = action.payload;
    },
    setSpecificGroupData : (state, action) => {
      state.spGroupData = action.payload;
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
    /* ------------------------------ get Specific Group Data ------------------------------------------- */
    builder.addCase(getSpecificGroupData.fulfilled, (state, action)=>{
      state.spGroupData = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getSpecificGroupData.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getSpecificGroupData.pending, (state)=>{
      state.isLoading = true;
    })
    /* ------------------------------ get All Free Supervisors ------------------------------------------- */
    builder.addCase(getAllFreeSupervisors.fulfilled, (state, action)=>{
      state.allFreeSupervisors = action.payload;
      state.isLoading = false;
    })
    builder.addCase(getAllFreeSupervisors.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(getAllFreeSupervisors.pending, (state)=>{
      state.isLoading = true;
    })
    /* ------------------------------ Search For Groups ------------------------------------------- */
    builder.addCase(SearchForGroups.fulfilled, (state, action)=>{
      state.allGroups = action.payload;
      state.isLoading = false;
    })
    builder.addCase(SearchForGroups.rejected, (state)=>{
      state.isLoading = false;
    })
    builder.addCase(SearchForGroups.pending, (state)=>{
      state.isLoading = true;
    })
  }
});

export let groupSliceReducer = groupSlice.reducer;
export let { setAllGroups, setSpecificGroupData } = groupSlice.actions;