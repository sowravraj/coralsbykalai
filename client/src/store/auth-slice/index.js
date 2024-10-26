const { createSlice } = require("@reduxjs/toolkit");


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

        }
    }
})

export const {SetUser} = authSlice.actions
export default authSlice.reducer