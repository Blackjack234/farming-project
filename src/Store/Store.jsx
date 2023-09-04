import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../ReduxToolkit/AuthSlice";
import CartSlice from "../ReduxToolkit/CartSlice";

const store = configureStore({
    reducer:{
        authPost:AuthSlice,
        cartpost:CartSlice,
    }
})

export default store;