import {  createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { processPaymentApi } from "../../../Api/UserApi/UserApi";
import toast from "react-hot-toast";
import { addOrderApi } from "../../../Api/OrderApi/orderApi";


export const processPaymentSlice = createAsyncThunk("processPaymentSlice",async(data)=>{
    try{
        const response = await processPaymentApi(data);
        // console.log("RRRR",response)
        if(response.status === 200){
            return response.data
        }else{
            toast.error(response.response.data.error);
        } }
    catch(err){
        throw err;
    }})

//Add Order Slice
export const OrderSlice = createAsyncThunk("OrderSlice",async(data)=>{
    try{
        const response = await addOrderApi(data);
        // console.log("RRRR",response)
        if(response.status === 200){
            toast.success("Order is completed successfully")
            return response.data
        }else{
            toast.error(response.response.data.error);
        } }
    catch(err){
        throw err;
    }})



//Create reducer and action

export const PaymentSlice = createSlice({
    name:"PaymentSlice",
    initialState:{
        payment:[],
        orders:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        //Payment Process
        builder
        .addCase(processPaymentSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(processPaymentSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.payment=action.payload
        })
        .addCase(processPaymentSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Add Order 
        .addCase(OrderSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(OrderSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload
        })
        .addCase(OrderSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default PaymentSlice.reducer;