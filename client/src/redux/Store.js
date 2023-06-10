import {configureStore} from  "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import authSlice from "./features/authSlice";
import cartSlice from "./features/cartSlice";
export default configureStore({

    reducer:{
        
        auth:authSlice,
        product:productSlice,
        cart:cartSlice
    },

})
