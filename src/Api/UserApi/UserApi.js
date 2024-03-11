import { commonrequest } from "../CommonRequest"
import { BASE_API_URl } from "../api"

// Admin Login API

export const userRegisterApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/user/auth/register`,data,header,"user");
}


//User Login API
export const userLoginApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/user/auth/login`,data,header,"user");
}

//All USers API
export const allUsersApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/user/auth/getallusers?page=${data.page}`,"",header,"admin");
}

//delete users Api
export const deleteUserApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_API_URl}/user/auth/userdelete/${data.userid}`,{},header,"admin");
}

//User Verify API
export const userVerifyApi = async(header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/user/auth/uservalid`,"",header,"user")
}

//Userlogout API
export const userLogoutApi = async(header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/user/auth/logout`,"",header,"user")
}

//ForgotPass API
export const forgotPasswordApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/user/auth/forgotpassword`,data,header,"user")
}

//ForgotPass Valid API
export const forgotPasswordverifyApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/user/auth/forgotpassword/${data.id}/${data.token}`,"",header,"user")
}

//Reset Pass API
export const resetPasswordApi = async(data,header)=>{
    return await commonrequest("PUT",`${BASE_API_URl}/user/auth/resetpassword/${data.id}/${data.token}`,data.passworddata,header,"user")
}

//Process Payment API
export const processPaymentApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/checkout/api/payment`,data,header,"user")
}

//User Contact API
export const userContactApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/user/auth/usercontact`,data,header,"user")
}