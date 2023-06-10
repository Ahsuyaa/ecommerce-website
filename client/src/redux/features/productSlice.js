
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../Api";
//get all peoduct
export const getAllProducts= createAsyncThunk("/product/getProducts",async(keyword,{rejectWithValue})=>{
    try {
     const response= await api.allProducts(keyword) ;
     return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}
)
//get single product
export const singleProduct = createAsyncThunk("/product/getSingleProduct",async(id,{rejectWithValue})=>{
    try {
     const response= await api.singleProduct(id) ;
     return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
}
)
const productSlice = createSlice({
    name:"product",
    initialState:{
        resultPerPage:null,
        product:{},
        products:[],
        loading:false,
        message:"",
        error:"",
    },
    reducers:{
        clearError:(state,action)=>{
      state.error=null
        },
    },
    extraReducers:{
   [getAllProducts.pending]:(state,action)=>
   {
    state.loading=true;

   },
   [getAllProducts.fulfilled]:(state,action)=>
   {
    state.loading=false;
    state.products=action.payload.data;
    state.resultPerPage = action.payload.resultPerPage;
   },
   [getAllProducts.rejected]:(state,action)=>{
    state.loading=false;
    state.error=action.payload.message;
   },
   [singleProduct.pending]:(state,action)=>
   {
    state.loading=true;
   },
   [singleProduct.fulfilled]:(state,action)=>
   {
    state.loading=false;
    state.product=action.payload.data;

   },
   [singleProduct.rejected]:(state,action)=>
   {
    state.loading=false;
    state.product=action.payload.message;

   },
    },
});
export const {clearError}=productSlice.actions;
export default productSlice.reducer;