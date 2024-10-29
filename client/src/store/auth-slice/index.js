import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isAuthenticated : false,
    isLoading : false,
    user : null
}


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        SetUser:(state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
        }
    }
})

export const {SetUser} = authSlice.actions
export default authSlice.reducer