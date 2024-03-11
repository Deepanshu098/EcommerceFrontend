import {  createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { allUsersApi, deleteUserApi, forgotPasswordApi, forgotPasswordverifyApi, resetPasswordApi, userContactApi, userLoginApi, userLogoutApi, userRegisterApi, userVerifyApi } from "../../../Api/UserApi/UserApi";
import { DeletecartDataApi, addCartApi, getUserCartApi, removeAllCartItemsApi, removeSingleCartItemApi } from "../../../Api/CartsApi/CartApi";
import { userordersApi } from "../../../Api/OrderApi/orderApi";

//User register Slice
export const UserRegister = createAsyncThunk("userRegister",async(data)=>{
    try{
        const response = await userRegisterApi(data.data,data.config);
        if(response.status === 200){
            toast.success("User registered Successfully!!")
            return response.data
        }else{
            toast.error(response.response.data.error);
        } }
    catch(err){
        throw err;
    }})

//User Login Slice
export const UserLogin = createAsyncThunk("userLogin",async(data)=>{
    try{
        const response = await userLoginApi(data);
        // console.log("RRRR",response.data.data.token)
        if(response.status === 200){
            localStorage.setItem("usertoken",response.data.data.token)
            toast.success("User Login Successfully!!")
            return response.data
        }else{
            toast.error(response.response.data.error);
        } }
    catch(err){
        throw err;
    }})

// User LoggedIN Slice
export const UserVerify = createAsyncThunk("UserVerify",async(thunkApi)=>{
    try{
        const response = await userVerifyApi();
        if(response.status === 200){
            return response.data
        }else{
            return thunkApi.rejectWithValue("error");
        } }
    catch(err){
        throw err;
    }})

//Userlogout Slice
export const userlogoutSlice = createAsyncThunk("userlogoutSlice",async(thunkApi)=>{
    try {
        const response = await userLogoutApi();
        if(response.status === 200){
            toast.success("User Logout Done")
            localStorage.removeItem("usertoken")
            return response.data
        }else{
            toast.success("User Logout Done")
            localStorage.removeItem("usertoken")
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});

//ForgotPassword Slice
export const forgotPasswordSlice = createAsyncThunk("forgotPasswordSlice",async(data)=>{
    try{
        const response = await forgotPasswordApi(data);
        if(response.status === 200){
            toast.success("Password Reset Link Send In Your Email Please Check")
           
            return response.data
        }else{
            toast.error("Invalid details")
        }
    }
    catch(error){
        throw error;
    }
})


//ForgotPassword verify slice
export const forgotPasswordVerifySlice = createAsyncThunk("forgotPasswordVerifySlice",async(data)=>{
    try{
        const response = await forgotPasswordverifyApi(data);
        if(response.status === 200){
            return response.data
        }else{
            toast.error("Your Link Expired, Please Generate New Link")
        }
    }
    catch(error){
        throw error;
    }
})


//Reset Password Slice
export const resetPasswordSlice = createAsyncThunk("resetPasswordSlice",async(data)=>{
    try{
        const response = await resetPasswordApi(data);
        if(response.status === 200){
            toast.success(response.data.message)
            return response.data
        }else{
            toast.error("Your Link Expired, Please Generate New Link")
        }
    }
    catch(error){
        throw error;
    }
})

//Add to Cart Slice
export const AddToCartSlice = createAsyncThunk("AddToCartSlice",async(data)=>{
    try{
        const response = await addCartApi(data);
        if(response.status === 200){
            toast.success(response.data.message)
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    }
    catch(error){
        throw error;
    }
})

//User Cart Slice
export const userCartSlice = createAsyncThunk("userCartSlice",async(thunkApi)=>{
    try{
        const response = await getUserCartApi();
        if(response.status === 200){
            return response.data
        }else{
            return thunkApi.rejectWithValue("error")
        }
    }
    catch(error){
        throw error;
    }
})


//Decrement Cart Slice
export const removeSingleSlice = createAsyncThunk("removeSingleSlice",async(data)=>{
    try{
        const response = await removeSingleCartItemApi(data);
        if(response.status === 200){
            toast.success(response.data.message)
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    }
    catch(error){
        throw error;
    }
})

//Remove Items Slice
export const removeItemsSlice = createAsyncThunk("removeItemsSlice",async(data)=>{
    try{
        const response = await removeAllCartItemsApi(data);
        if(response.status === 200){
            toast.success(response.data.message)
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    }
    catch(error){
        throw error;
    }
})

//Get All Users Slice
export const getAllUsersSlice = createAsyncThunk("getAllUsersSlice",async(data)=>{
    try{
        const response = await allUsersApi(data);
        if(response.status === 200){
            return response.data
        }else{
            console.log("error")
        }
    }
    catch(error){
        throw error;
    }
})

//Delete USer SLice
export const deleteUserSlice = createAsyncThunk("deleteUserSlice",async(data)=>{
    try{
        const response = await deleteUserApi(data);
        if(response.status === 200){
            toast.success("User Deleted Successfully")
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    }
    catch(error){
        throw error;
    }
})

// Deletecartdata  Slice
export const Deletecartdata = createAsyncThunk("Deletecartdata",async(thunkApi)=>{
    try {
        const response = await DeletecartDataApi();
        console.log(response)
        if(response.status == 200){
            return response.data
        }else{
            return thunkApi.rejecWithValue("error")
        }
    } catch (error) {
        throw error;
    }
});

// userorders  Slice
export const userorders = createAsyncThunk("userorders",async(thunkApi)=>{
    try {
        const response = await userordersApi();
        if(response.status == 200){
            return response.data
        }else{
            return thunkApi.rejecWithValue("error")
        }
    } catch (error) {
        throw error;
    }
});

//User Contat SLice
export const UserContact = createAsyncThunk("UserContact",async(data)=>{
    try {
        const response = await userContactApi(data);
        if(response.status == 200){
            toast.success("Contact form saved")
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
});

//Create reducer and action

export const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        allusers:[],
        registeruser:[],
        loginuser:[],
        deleteuser:[],
        userverify:[],
        logoutuser:[],
        forgotpass:[],
        forgotpassverifyData:[],
        resetpasswordData:[],
        cartData:[],
        usercartData:[],
        removesinglecartData:[],
        removeCart:[],
        deleteCartData:[],
        usercontactData:[],
        userOrdersData:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        //Admin Login
        builder
        .addCase(UserRegister.pending,(state)=>{
            state.loading=true;
        })
        .addCase(UserRegister.fulfilled,(state,action)=>{
            state.loading=false;
            state.registeruser=action.payload
        })
        .addCase(UserRegister.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //User Login
        .addCase(UserLogin.pending,(state)=>{
            state.loading=true;
        })
        .addCase(UserLogin.fulfilled,(state,action)=>{
            state.loading=false;
            state.loginuser=action.payload
        })
        .addCase(UserLogin.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //All Users
        .addCase(getAllUsersSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(getAllUsersSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.allusers=action.payload
        })
        .addCase(getAllUsersSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Delete user
        .addCase(deleteUserSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(deleteUserSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.deleteuser=[action.payload]
        })
        .addCase(deleteUserSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //User verify
        .addCase(UserVerify.pending,(state)=>{
            state.loading=true;
        })
        .addCase(UserVerify.fulfilled,(state,action)=>{
            state.loading=false;
            state.userverify=[action.payload]
        })
        .addCase(UserVerify.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //User Logout
        .addCase(userlogoutSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(userlogoutSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.userverify=[];
            state.logoutuser=[action.payload]
            state.usercartData=[]
        })
        .addCase(userlogoutSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Forgot Password
        .addCase(forgotPasswordSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(forgotPasswordSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.forgotpass=action.payload
        })
        .addCase(forgotPasswordSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Forgotpassword valid
        .addCase(forgotPasswordVerifySlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(forgotPasswordVerifySlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.forgotpassverifyData=action.payload
        })
        .addCase(forgotPasswordVerifySlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Reset password
        .addCase(resetPasswordSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(resetPasswordSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.resetpasswordData=action.payload
        })
        .addCase(resetPasswordSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Add to cart
        .addCase(AddToCartSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AddToCartSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.cartData=action.payload
        })
        .addCase(AddToCartSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Get Cart Details
        .addCase(userCartSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(userCartSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.usercartData=action.payload
        })
        .addCase(userCartSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Remove Single Slice
        .addCase(removeSingleSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(removeSingleSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.removesinglecartData=action.payload
        })
        .addCase(removeSingleSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Remove Items Slice
        .addCase(removeItemsSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(removeItemsSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.removeCart=action.payload
        })
        .addCase(removeItemsSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Delete Cart Slice
        .addCase(Deletecartdata.pending,(state)=>{
            state.loading=true;
        })
        .addCase(Deletecartdata.fulfilled,(state,action)=>{
            state.loading=false;
            state.deleteCartData=action.payload
        })
        .addCase(Deletecartdata.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //User  Orders Slice
        .addCase(userorders.pending,(state)=>{
            state.loading=true;
        })
        .addCase(userorders.fulfilled,(state,action)=>{
            state.loading=false;
            state.userOrdersData=action.payload
        })
        .addCase(userorders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Contact
        .addCase(UserContact.pending,(state)=>{
            state.loading=true;
        })
        .addCase(UserContact.fulfilled,(state,action)=>{
            state.loading=false;
            state.usercontactData=action.payload
        })
        .addCase(UserContact.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default UserSlice.reducer;