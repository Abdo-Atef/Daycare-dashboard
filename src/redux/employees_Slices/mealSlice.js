import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/api";
import { getBusFilter } from "../BusSupervisor_slice/SupervisorSlice";


export const getAllMeals=createAsyncThunk('getAllMeals',async ()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const data=await axios.get(`${BASE_URL}/employees/meals/getAllMealsOrGetByFilter`,{headers});
        return data.data.meals
    } catch (error) {
        console.log(error);
        return error
    }
})
export const spMeal=createAsyncThunk('spMeal',async (id)=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const data =await axios.get(`${BASE_URL}/employees/meals/getSpMeal/${id}`,{headers});
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
        return error;
    }
})
export const FilterMeal=createAsyncThunk('searchMeal',async ()=>{
    try {
        const headers={
            token:localStorage.getItem('employeeToken')
        }
        const data=await axios.get(`${BASE_URL}/employees/meals/getAllMealsOrGetByFilter`,{headers});
        return data.data.meals
    } catch (error) {
        console.log(error);
        return error
    }
})


const initialState={
    meals:null,
    spicificMeal:null,
    mealFilter:null,
    isLoading:false,
};


export const MealSlice=createSlice({
    name:"meals",
    initialState,
    reducers:{
        setMealFilter:(state,action)=>{
            state.meals=action.payload;
        },
        setIngrediantFilter:(state,action)=>{
            state.meals=action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllMeals.fulfilled,(state,action)=>{
            state.meals=action.payload;
            state.isLoading=false;
        });
        builder.addCase(getAllMeals.rejected,(state,action)=>{
            state.isLoading=false;
        });
        builder.addCase(getAllMeals.pending,(state,action)=>{
            state.isLoading=true;
        });
        builder.addCase(spMeal.fulfilled,(state,action)=>{
            state.spicificMeal=action.payload;
            state.isLoading=false;
        });
        builder.addCase(spMeal.pending,(state,action)=>{
            state.isLoading=true;
        })
        builder.addCase(spMeal.rejected,(state,action)=>{
            state.isLoading=false;
        });
        builder.addCase(FilterMeal.fulfilled,(state,action)=>{
            state.mealFilter=action.payload;
            state.isLoading=false;
        })
        builder.addCase(FilterMeal.rejected,(state,action)=>{
            state.isLoading=false;
        })
        builder.addCase(FilterMeal.pending,(state,action)=>{
            state.isLoading=true;
        })
    }
    
})

export let mealSliceReducer=MealSlice.reducer;

export let {setMealFilter,setIngrediantFilter}=MealSlice.actions;