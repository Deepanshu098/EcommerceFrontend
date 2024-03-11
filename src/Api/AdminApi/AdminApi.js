import { commonrequest } from "../CommonRequest"
import { BASE_API_URl } from "../api"

// Admin Login API

export const AdminLoginAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/admin/auth/login`,data,header,"admin");
}


//Admin LoggedIN Api

export const AdminLoggedInApi = async(header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/admin/auth/adminverify`,"",header,"admin")
}

//Admin Logout API

export const AdminLogoutApi = async(header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/admin/auth/logout`,"",header,"admin")

}

//Admin Orders API
export const getAdminOrdersApi = async(header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/orders/api/orders`,"",header,"admin")

}


