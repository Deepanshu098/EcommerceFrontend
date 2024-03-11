import { commonrequest } from "../CommonRequest"
import { BASE_API_URl } from "../api"

// Admin Login API

export const addOrderApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/orders/api/addorders`,data,header,"user");
}

// userordersApi api
export const userordersApi = async(header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/orders/api/getuserorders`,"",header,"user");
}

//Admin order update APi
export const orderUpdateApi = async(data,header)=>{
    return await commonrequest("PUT",`${BASE_API_URl}/orders/api/orders/${data.orderid}`,data,header,"admin")

}