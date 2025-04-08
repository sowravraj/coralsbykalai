import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cartItems: [],
    isLoading: false,
};

// ✅ Corrected `addToCart`
export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, productId, quantity }) => {
    const response = await axios.post("http://localhost:3000/api/shop/cart/add", {
        userId, productId, quantity
    });
    return response.data;
});

// ✅ Corrected `fetchCartItems`
export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async (userId) => {
    const response = await axios.get(`http://localhost:3000/api/shop/cart/get/${userId}`);
    return response.data;
});

// ✅ Corrected `deleteCartItems`
export const deleteCartItems = createAsyncThunk("cart/deleteCartItems", async ({ userId, productId }) => {
    const response = await axios.delete(`http://localhost:3000/api/shop/cart/delete/${userId}/${productId}`);
    return response.data;
});

// ✅ Corrected `UpdateCartQuantity`
export const UpdateCartQuantity = createAsyncThunk("cart/UpdateCartQuantity", async ({ userId, productId, quantity }) => {
    const response = await axios.put("http://localhost:3000/api/shop/cart/update-cart", {
        userId, productId, quantity
    });
    return response.data;
});

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Corrected `addToCart`
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data.items;  // Fixed
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false; // Fixed
                state.cartItems = [];
            })

            // ✅ Corrected `fetchCartItems`
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                console.log("FETCHED CART PAYLOAD:", action.payload);
                state.isLoading = false;
                state.cartItems = action.payload.data.items;  // Fixed
            })
            .addCase(fetchCartItems.rejected, (state) => {
                state.isLoading = false; // Fixed
                state.cartItems = [];
            })

            // ✅ Corrected `deleteCartItems`
            .addCase(deleteCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data.items;  // Fixed
            })
            .addCase(deleteCartItems.rejected, (state) => {
                state.isLoading = false; // Fixed
                state.cartItems = [];
            })

            // ✅ Corrected `UpdateCartQuantity`
            .addCase(UpdateCartQuantity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(UpdateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data.items;  // Fixed
            })
            .addCase(UpdateCartQuantity.rejected, (state) => {
                state.isLoading = false; // Fixed
                state.cartItems = [];
            });
    }
});

export default shoppingCartSlice.reducer;
