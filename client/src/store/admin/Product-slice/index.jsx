import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isLoading: false,
    ProductList : []
}

export const addNewProduct = createAsyncThunk("/products/addnewproduct",
    async (formData)=>{
    const result = await axios.post("http://localhost:3000/api/admin/products/add",(formData),{
        headers: {
            "Content-Type" : "application/json"
    }})
    return result?.data;
})

export const fetchAllProducts = createAsyncThunk("/products/fetchAllProducts",
    async (formData)=>{
    const result = await axios.get("http://localhost:3000/api/admin/products/get")
    return result?.data;
})

export const editProduct = createAsyncThunk("/products/editProduct",
    async ({id,formData})=>{
    const result = await axios.put(`http://localhost:3000/api/admin/products/edit/${id}`,(formData),{
        headers: {
            "Content-Type" : "application/json"
    }})
    return result?.data;
})

export const deleteProduct = createAsyncThunk("/products/deleteProduct",
    async ({id,formData})=>{
    const result = await axios.delete(`http://localhost:3000/api/admin/products/delete/${id}`,(formData),{
        headers: {
            "Content-Type" : "application/json"
    }})
    return result?.data;
})



const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.ProductList = action.payload.data

            console.log(action.payload);          
        }).addCase(fetchAllProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.ProductList = []

            console.log(action.payload);          
        })

    }

})


export default AdminProductsSlice.reducer;