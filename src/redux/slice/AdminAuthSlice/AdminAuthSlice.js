import {  createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { AdminLoggedInApi, AdminLoginAPI, AdminLogoutApi, getAdminOrdersApi } from "../../../Api/AdminApi/AdminApi";
import toast from "react-hot-toast";
import { orderUpdateApi } from "../../../Api/OrderApi/orderApi";

//Admin Login Slice
export const AdminAuthLogin = createAsyncThunk("AdminLogin",async(data)=>{
    try{
        const response = await AdminLoginAPI(data);
        // console.log(response)
        if(response.status === 200){
            toast.success("Admin Login Successfully!!")
            localStorage.setItem("admintoken",response.data.data.token)
            return response.data
        }else{
            toast.error(response.response.data.error);
        } }
    catch(err){
        throw err;
    }
})

//Admin Verify Slice
export const AdminLoggedIn = createAsyncThunk("AdminLoggedIn",async(thunkApi)=>{
    try{
        const response = await AdminLoggedInApi();
        if(response.status === 200){
            return response.data
        }else{
            return thunkApi.rejectWithValue("error")
        }}
    catch(err){
        throw err;
    }
})

//Admin Logout Slice
export const AdminLogOut = createAsyncThunk("AdminLogout",async(thunkApi)=>{
    try{
        const response = await AdminLogoutApi();
        if(response.status === 200){
            toast.success("Admin Logout Successfully!!")
            localStorage.removeItem("admintoken")
            return response.data
        }else{
            toast.success("Admin Logout successfully!!")
            localStorage.removeItem("admintoken")
            return thunkApi.rejectWithValue("error")

        }}
    catch(err){
        throw err;
    }
})

// OrdersAdmin  Slice
export const OrdersAdmin = createAsyncThunk("OrdersAdmin",async(thunkApi)=>{
    try {
        const response = await getAdminOrdersApi();
        if(response.status == 200){
            return response.data
        }else{
            return thunkApi.rejecWithValue("error")
        }
    } catch (error) {
        throw error;
    }
});

//Order Update SLice
export const OrderUpdateSlice = createAsyncThunk("OrderUpdateSlice",async(data)=>{
    try {
        const response = await orderUpdateApi(data);
        if(response.status == 200){
            toast.success("Order Status Updated")
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
});


//Create reducer and action

export const AdminSlice = createSlice({
    name:"AdminSlice",
    initialState:{
        adminlogin:[],
        AdminLoggedInData:[],
        AdminLogoutData:[],
        adminOrdersData:[],
        OrdersStatusChange:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        //Admin Login
        builder.addCase(AdminAuthLogin.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AdminAuthLogin.fulfilled,(state,action)=>{
            state.loading=false;
            state.adminlogin=action.payload
        })
        .addCase(AdminAuthLogin.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Admin Logged IN
        .addCase(AdminLoggedIn.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AdminLoggedIn.fulfilled,(state,action)=>{
            state.loading=false;
            state.AdminLoggedInData=[action.payload]
        })
        .addCase(AdminLoggedIn.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Admin Logout
        .addCase(AdminLogOut.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AdminLogOut.fulfilled,(state,action)=>{
            state.loading=false;
            state.AdminLogoutData=[action.payload]
        })
        .addCase(AdminLogOut.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Orders Admin
        .addCase(OrdersAdmin.pending,(state)=>{
            state.loading=true;
        })
        .addCase(OrdersAdmin.fulfilled,(state,action)=>{
            state.loading=false;
            state.adminOrdersData=action.payload
        })
        .addCase(OrdersAdmin.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Order Update
        .addCase(OrderUpdateSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(OrderUpdateSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.OrdersStatusChange=action.payload
        })
        .addCase(OrderUpdateSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default AdminSlice.reducer;