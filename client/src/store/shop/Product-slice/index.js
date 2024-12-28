import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading : false,
    productList : []
}

export const fetchAllFilteredProducts = createAsyncThunk("/products/fetchAllProducts",
    async (formData)=>{
    const result = await axios.get("http://localhost:3000/api/shop/products/get")
    return result?.data;
})


const shoppingProductSlice = createSlice({
    name: 'shoppingProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending,(state)=>{
            state.isLoading = true;     
        }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            console.log(action.payload);
            
            state.isLoading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
            state.isLoading = false;
            state.productList = [];
        })
    }
    });


export default shoppingProductSlice.reducer;  //export reducer for store.js