import { configureStore } from "@reduxjs/toolkit";
import  AdminSlice  from "../slice/AdminAuthSlice/AdminAuthSlice";
import ProductSlice from "../slice/ProductSlice/ProductSlice";
import UserSlice  from "../slice/UserAuthSlice/UserAuthSlice";
import PaymentSlice from "../slice/PaymentSlice/PaymentSlice";

export const store = configureStore({
    reducer:{
        Admin:AdminSlice,
        Product:ProductSlice,
        User:UserSlice,
        Payment:PaymentSlice
    }
})