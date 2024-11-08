import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'; 


const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user : null
}

export const registerUser = createAsyncThunk("/auth/register",

async(formData, { rejectWithValue })=>{
    try{
    const response = await axios.post("http://localhost:3000/api/auth/register",formData,{
     withCredentials: true      }
    )
    return response.data}catch (error) {
        // Use rejectWithValue to handle errors gracefully
        return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
)

export const loginUser = createAsyncThunk("/auth/login",

    async(formData, { rejectWithValue })=>{
        try{
        const response = await axios.post("http://localhost:3000/api/auth/login",formData,{
         withCredentials: true      }
        )
        return response.data}catch (error) {
            // Use rejectWithValue to handle errors gracefully
            return rejectWithValue(error.response?.data || "An error occurred");
        }
      }
    )


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        SetUser:(state,action)=>{
            // state.user = action.payload;
            // state.isAuthenticated = true;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
    }
})

export const {SetUser} = authSlice.actions
export default authSlice.reducer