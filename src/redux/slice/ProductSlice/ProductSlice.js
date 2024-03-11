import {  createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { AddCategoryApi, addProductApi, deleteProductApi, deleteReviewApi, getCategoryApi, getProductsApi, getlatestProductsApi, getproductReviewApi, productReviewApi, singleProductApi } from "../../../Api/ProductsApi/ProductApi";


//Add Category Slice
export const AdminAddCategory = createAsyncThunk("AdminAddCategory",async(data)=>{
    try{
        const response = await AddCategoryApi(data);
        // console.log(response)
        if(response.status === 200){
            toast.success("Category Added Successfully!!")
            return response.data
        }
        else{
            toast.error(response.response.data.error);
        }
     }
    catch(err){
        throw err;
    }
})

//Get Category Slice
export const GetCategory = createAsyncThunk("GetCategory",async(thunkApi)=>{
    try{
        const response = await getCategoryApi();
        if(response.status === 200){
            return response.data
        }
        else{
            return thunkApi.rejectWithValue("error")
        }
    }
    catch(err){
        throw err;
    }
})

//Add Products Slice
export const AddProductsSlice = createAsyncThunk("AddProductsSlice",async(data)=>{
    try{
        const response = await addProductApi(data.data,data.categoryid,data.config);
        // console.log("RRRR",response)
        if(response.status === 200){
            toast.success("Product Added")
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    }
    catch(err){
        throw err;
    }
})

//Get Products slice
export const GetProductsSlice = createAsyncThunk("GetProductsSlice",async(data)=>{
    try{
        const response = await getProductsApi(data);
        if(response.status === 200){
            return response.data
        }
        else{
            toast.error(response.response.data.error)
        }
    }
    catch(err){
        throw err;
    }
})

//Delete Product Slice
export const DeleteProductSlice = createAsyncThunk("DeleteProductSlice",async(data)=>{
    try{
        const response = await deleteProductApi(data)
        // console.log("rrr",response)
        if(response.status === 200){
            toast.success("Product Deleted!!")
            return response.data
        }
        else{
            toast.error("Error")
        }
    }
    catch(err){
        throw err;
    }
})

//Get latestproducts slice
export const GetLatestProductsSlice = createAsyncThunk("GetLatestProductsSlice",async(thunkApi)=>{
    try{
        const response = await getlatestProductsApi();
        if(response.status === 200){
            return response.data
        }
        else{
            return thunkApi.rejectWithValue("error")
        }
    }
    catch(err){
        throw err;
    }
})

//Single Product details Slice
export const GetSingleProductSlice = createAsyncThunk("GetSingleProductSlice",async(data)=>{
    try{
        const response = await singleProductApi(data);
        if(response.status === 200){
            return response.data
        }
        else{
            toast.error("Error");
        }
    }
    catch(err){
        throw err;
    }
})

// Add Product Review Slice
export const AddProductReviewSlice = createAsyncThunk("AddProductReviewSlice",async(data)=>{
    try{
        const response = await productReviewApi(data);
        if(response.status === 200){
            toast.success("Review added successfully!!")
            return response.data
        }
        else{
            toast.error("Error");
        }
    }
    catch(err){
        throw err;
    }
})

//Get Product Reviews
export const GetProductReviewSlice = createAsyncThunk("GetProductReviewSlice",async(data)=>{
    try{
        const response = await getproductReviewApi(data);
        if(response.status === 200){
            return response.data
        }
        else{
            console.log("err")
        }
    }
    catch(err){
        throw err;
    }
})

//Delete Review Slice
export const DeleteReviewSlice = createAsyncThunk("DeleteReviewSlice",async(data)=>{
    try{
        const response = await deleteReviewApi(data);
        if(response.status === 200){
            toast.success("Review Deleted Successfully!")
            return response.data
        }
        else{
            console.log("err")
        }
    }
    catch(err){
        throw err;
    }
})


//Create reducer and action

export const ProductSlice = createSlice({
    name:"ProductSlice",
    initialState:{
        adminAddCategoryData:[],
        categoryData:[],
        addProductsData:[],
        getProducts:[],
        deletedProduct:[],
        latestProducts:[],
        singleProduct:[],
        productReview:[],
        getReviews:[],
        DeleteReview:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        //Admin Add Category
        builder.addCase(AdminAddCategory.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AdminAddCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.adminAddCategoryData=action.payload
        })
        .addCase(AdminAddCategory.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Get Category
        .addCase(GetCategory.pending,(state)=>{
            state.loading=true;
        })
        .addCase(GetCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.categoryData=action.payload
        })
        .addCase(GetCategory.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Add Products
        .addCase(AddProductsSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AddProductsSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.addProductsData=action.payload
        })
        .addCase(AddProductsSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Get Products
        .addCase(GetProductsSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(GetProductsSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.getProducts=action.payload
        })
        .addCase(GetProductsSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Delete Product
        .addCase(DeleteProductSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(DeleteProductSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.deletedProduct=[action.payload]
        })
        .addCase(DeleteProductSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Get latestProducts
        .addCase(GetLatestProductsSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(GetLatestProductsSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.latestProducts=action.payload
        })
        .addCase(GetLatestProductsSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //get Single Product
        .addCase(GetSingleProductSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(GetSingleProductSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.singleProduct=[action.payload]
        })
        .addCase(GetSingleProductSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Product review
        .addCase(AddProductReviewSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(AddProductReviewSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.productReview=[action.payload]
        })
        .addCase(AddProductReviewSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Get reviews
        .addCase(GetProductReviewSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(GetProductReviewSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.getReviews=action.payload
        })
        .addCase(GetProductReviewSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        //Delete Reviews
        .addCase(DeleteReviewSlice.pending,(state)=>{
            state.loading=true;
        })
        .addCase(DeleteReviewSlice.fulfilled,(state,action)=>{
            state.loading=false;
            state.DeleteReview=[action.payload]
        })
        .addCase(DeleteReviewSlice.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default ProductSlice.reducer;