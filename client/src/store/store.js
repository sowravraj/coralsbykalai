import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductReducer from "./admin/Product-slice/index"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts : adminProductReducer
    },
});

export default store;
