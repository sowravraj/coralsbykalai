import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductReducer from "./admin/Product-slice/index"
import shopProductReducer from "./shop/Product-slice/index"
import shopCartReducer from "./shop/Cart-slice/index"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : adminProductReducer,
        shopProducts : shopProductReducer,
        shopCart : shopCartReducer,
    },
});

export default store;
