import { commonrequest } from "../CommonRequest"
import { BASE_API_URl } from "../api"

//Admin Add Category
export const addCartApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/user/cart/addtocart/${data}`,{},header,"user");
}

//Get User Cart API
export const getUserCartApi = async(header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/user/cart/getcarts/`,"",header,"user");
}

//Remove Single Cart API
export const removeSingleCartItemApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_API_URl}/user/cart/removesingleitem/${data}`,{},header,"user");
}

//Remove Cart Items APi
export const removeAllCartItemsApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_API_URl}/user/cart/removeitems/${data}`,{},header,"user");
}

//Delete Cart Data API
export const DeletecartDataApi = async(header)=>{
    return await commonrequest("DELETE",`${BASE_API_URl}/user/cart/removecartdata`,{},header,"user");
}