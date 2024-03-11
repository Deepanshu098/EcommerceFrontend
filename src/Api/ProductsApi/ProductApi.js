import { commonrequest } from "../CommonRequest"
import { BASE_API_URl } from "../api"

//Admin Add Category
export const AddCategoryApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/category/api/addcategory`,data,header,"admin");
}

//Get CATEGORYAPI
export const getCategoryApi = async(header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/category/api/getcategory`,"",header,"admin");
}

//Add Products API
export const addProductApi = async(data,categoryId,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/product/api/addproduct?categoryid=${categoryId}`,data,header,"admin")
}


//Get Products API
export const getProductsApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/product/api/getproducts?categoryid=${data.selectedcategory}&page=${data.page}`,"",header,"admin")
}


//GetLatestProducts API
export const getlatestProductsApi = async(header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/product/api/getlatestproducts`,"",header,"user")
}

//Delete Products API
export const deleteProductApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_API_URl}/product/api/product/${data.productid}`,{},header,"admin")
}

//Single Product Details API
export const singleProductApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/product/api/singleproduct/${data.productid}`,"",header,"user")
}

// Product Review API
export const productReviewApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_API_URl}/product/api/productreview/${data.productid}`,data.data,header,"user")
}

//get products review API
export const getproductReviewApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_API_URl}/product/api/getproductreview/${data.productid}`,"",header,"user")
}

//Delete Review API
export const deleteReviewApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_API_URl}/product/api/deleteproductreview/${data.reviewid}`,{},header,"user")
}