import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const {createSlice, createAsyncThunk} = require("@reduxjs/toolkit");

const initialState = {
    cartItems : [],
    isLoading : false,
}

export const addToCart = createAsyncThunk("cart/addToCart",async(userId,productId,quantity)=>{
        const response = await axios.post("http://localhost:3000/api/shop/cart/add",{
            userId,productId,quantity
        })

    return response.data
})

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems",async(userId)=>{
    const response = await axios.get(`http://localhost:3000/api/shop/cart/get/${userId}`)

return response.data
})

export const deleteCartItems = createAsyncThunk("cart/deleteCartItems",async(userId,productId)=>{
    const response = await axios.delete(`http://localhost:3000/api/shop/cart/${userId}/${productId}`)

return response.data
})

export const UpdateCartQuantity = createAsyncThunk("cart/UpdateCartQuantity",async(userId,productId,quantity)=>{
    const response = await axios.post("http://localhost:3000/api/shop/cart/update-cart",{
        userId,productId,quantity
    })

return response.data
})

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(addToCart.pending,(state)=>{
            state.isLoading = true
        }).addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.cartItems = action.payload.date
        }).addCase(addToCart.rejected,(state)=>{
            state.isLoading = true
            state.cartItems = []
        }).addCase(fetchCartItems.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchCartItems.fulfilled,(state,action)=>{
            state.isLoading = false
            state.cartItems = action.payload.date
        }).addCase(fetchCartItems.rejected,(state)=>{
            state.isLoading = true
            state.cartItems = []
        }).addCase(deleteCartItems.pending,(state)=>{
            state.isLoading = true
        }).addCase(deleteCartItems.fulfilled,(state,action)=>{
            state.isLoading = false
            state.cartItems = action.payload.date
        }).addCase(deleteCartItems.rejected,(state)=>{
            state.isLoading = true
            state.cartItems = []
        }).addCase(UpdateCartQuantity.pending,(state)=>{
            state.isLoading = true
        }).addCase(UpdateCartQuantity.fulfilled,(state,action)=>{
            state.isLoading = false
            state.cartItems = action.payload.date
        }).addCase(UpdateCartQuantity.rejected,(state)=>{
            state.isLoading = true
            state.cartItems = []
        })
    }
    });

    export default shoppingCartSlice.reducer