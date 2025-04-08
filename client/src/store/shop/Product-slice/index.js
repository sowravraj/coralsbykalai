import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading : false,
    productList : [],
    productDetails : null
}



export const fetchAllFilteredProducts = createAsyncThunk("/products/fetchAllProducts",
    async ({filterParams, sortParams})=>{

        const query = new URLSearchParams({
            ...filterParams,
            sortby : sortParams 
        })
    const result = await axios.get(`http://localhost:3000/api/shop/products/get?${query}`)
    return result?.data;
})


export const fetchProductDetails = createAsyncThunk("/products/fetchProductDetails",
    async (id)=>{


    const result = await axios.get(`http://localhost:3000/api/shop/products/get/${id}`)
    return result?.data;
})



const shoppingProductSlice = createSlice({
    name: 'shoppingProduct',
    initialState,
    reducers: {
        setProductDetails: (state) => {
          state.productDetails = null;
        },
      },
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
        }).addCase(fetchProductDetails.pending,(state)=>{
            state.isLoading = true;     
        }).addCase(fetchProductDetails.fulfilled,(state,action)=>{
            console.log(action.payload);
            
            state.isLoading = false;
            state.productDetails = action.payload.data;
        }).addCase(fetchProductDetails.rejected,(state,action)=>{
            state.isLoading = false;
            state.productDetails = null;
        })
    }
    });

export const {setProductDetails} = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;  //export reducer for store.js