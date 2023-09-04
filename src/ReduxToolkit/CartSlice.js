import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"

let cart_api = "http://localhost:2000/cart";

let initial_value = {
    cartProd:[],
    isLoading:false,
    msg:"",
    coupon:[],
    coupon_msg:""
}

export const fetch_cart = createAsyncThunk("cart_fetch/fetch",
     async () =>{
      let res = await axios.get(cart_api)
          console.log("cart axios slice",res);
      return res?.data
     }
)

export const fetch_coupon = createAsyncThunk("fetch_coupon/fetch",
async() =>{
  let res = await axios.get("http://localhost:5000/coupon")
  console.log("coupon data",res);
  return res?.data
}
)
export const CartSlice = createSlice({
    name: "cartSlice",
  initialState:initial_value,
  extraReducers:(builder)=>{
    // builder.addCase(fetch_cart.pending,(state,action)=>{
    //     console.log("pending action ",action);
    //     state.isLoading = true;
    //     state.msg = "Loading..."
    // })

    builder.addCase(fetch_cart.fulfilled,(state,action)=>{
      console.log("fulfilled action ",action);
      state.isLoading =false;
      state.cartProd = action.payload

    })

    builder.addCase(fetch_cart.rejected,(state,action)=>{
      // console.log("rejected action ",action);
       state.isLoading = true;
       state.msg = "Sorry no data is found"
    })

    builder.addCase(fetch_coupon.pending,(state,action)=>{
      state.isLoading = true;
      state.coupon_msg = "Loading" 
    })

    builder.addCase(fetch_coupon.fulfilled,(state,action)=>{
      state.isLoading=false;
      console.log(action);
      state.coupon = action.payload
    })
    builder.addCase(fetch_coupon.rejected,(state,action)=>{
        state.isLoading = true;
        state.coupon_msg = "something went wrong"
    })
  }
})

export default CartSlice.reducer