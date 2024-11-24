const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

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

const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}

})