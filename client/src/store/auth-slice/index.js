import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'; 


const initialState = {
    isAuthenticated : false,
    isLoading : true,
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

    export const logoutUser = createAsyncThunk("/auth/logout",
      async(_, { rejectWithValue }) => { // Note the use of `_` for unused argument
          try {
              const response = await axios.post(
                  "http://localhost:3000/api/auth/logout",
                  {}, // Body is empty if not needed
                  { withCredentials: true } // Move this to the right place
              );
              return response.data;
          } catch (error) {
              return rejectWithValue(error.response?.data || "An error occurred");
          }
      }
    );
    

    export const checkAuth = createAsyncThunk(
        "/auth/checkauth",
      
        async () => {
          const response = await axios.get(
            "http://localhost:3000/api/auth/check-auth",
            {
              withCredentials: true,
              headers: {
                "Cache-Control":
                  "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            }
          );
          console.log("Checking authentication...");
          return response.data;
        }
      );
      


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
            state.user = action.payload.success? action.payload.user: null ;
            state.isAuthenticated = action.payload.success? true: false;
        }).addCase(logoutUser.fulfilled,(state,action)=>{
          state.isLoading = false;
          state.user =  null ;
          state.isAuthenticated =false;
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
        }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success;
          })
          .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false;
          })
        //   .addCase(logoutUser.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.user = null;
        //     state.isAuthenticated = false;
        //   });
        
    }
})

export const {SetUser} = authSlice.actions
export default authSlice.reducer