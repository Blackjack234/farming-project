import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"

let api_url = "https://wtsacademy.dedicateddevelopers.us/api/user/signup";
let log_api = "https://wtsacademy.dedicateddevelopers.us/api/user/signin";
let product_api = "http://localhost:1000/product"
const profile_api = "https://wtsacademy.dedicateddevelopers.us/api/user/profile-details"
let base_url = "https://wtsacademy.dedicateddevelopers.us/";
let folder_path = "uploads/user/profile_pic/";

const initial_value = {
    isLoading:false,
    status:0,
   //  api data
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    profile_pic:"",
   //  api data
    error:null,
    msg:"",
    authtoken:"",
    totalProduct:[],
    role:"",
    role_desc:"",
    isActive:false,
    userEmail:"",

}

export const sign_up = createAsyncThunk("post/sign_up",
 async (formdata) =>{
    const res = await axios.post(api_url,formdata,{
        headers:{
            "Content-Type": "application/form-data",
            "Access-Control-Allow-Origin":"*"
        }
    })
    return res?.data;
 }
)

export  const sign_in = createAsyncThunk("post/sign_in",
async (formdata) =>{
    const res = await axios.post(log_api,formdata,{
        headers:{
            "Content-Type":"application/form-data",
            "Access-Control-Allow-Origin":"*"
        }
    })

    return res?.data;
}
)

export const single_prod = createAsyncThunk("get/single_prod",
async ()=>{
    const res = await axios.get(product_api)

    return res?.data
}
)

export const profile_fetch = createAsyncThunk("fetch/profile_fetch",
async (token)=>{
   const res = await axios.get(profile_api,{
      headers:{
         "x-access-token":token,
            "Content-Type":"application/x-www-formdata-urlencoded",
            "Access-Control-Allow-Origin":"*"
      }
   })

   return res?.data
}
)








export const AuthSlice = createSlice({
    name:"authSlice",
    initialState:initial_value,

    extraReducers:(builder)=>{
     builder.addCase(sign_up.pending,(state,action)=>{
        state.isLoading = true;
        state.msg = "Work is in progress";
     })
   

     builder.addCase(sign_up.fulfilled,(state,action)=>{
        state.isLoading = false;
        console.log("Sign up fulfilled:",action)
        state.msg = action.payload.message;
        state.status = action.payload.status;
       

     })

     builder.addCase(sign_up.rejected,(state,action)=>{
        state.isLoading = false ;
            console.log("Sign up rejected:",action);
            state.msg = action.payload.message;
            state.status = action.payload.status
     })


     builder.addCase(sign_in.pending,(state,action)=>{
      console.log("Sign in pending:",action);
        state.isLoading= true;
        state.msg = "Loading..."
     })

     builder.addCase(sign_in.fulfilled,(state,action)=>{
        console.log("Sign in fulfilled:",action);
        state.isLoading = false;
        state.authtoken = action.payload.token;
        state.status = action.payload.status;
        state.msg = action.payload.message;
        state.isActive = action.payload.data.isActive;
        state.userEmail = action.payload.data.email

     })

     builder.addCase(sign_in.rejected,(state,action)=>{
        console.log("Sign in rejected:",action);
     })

     builder.addCase(single_prod.pending,(state,action)=>{
        state.isLoading = true;

     })

     builder.addCase(single_prod.fulfilled,(state,action)=>{
        state.isLoading = false;
        console.log("this is for fulfilled ",action);
        state.totalProduct = action.payload
     })  

     builder.addCase(single_prod.rejected,(state,action)=>{
        state.isLoading = false;
        console.log("this is for reject ",action);
     })
     builder.addCase(profile_fetch.pending,(state,action)=>{
      state.isLoading = true;

     })
     builder.addCase(profile_fetch.fulfilled,(state,action)=>{
      console.log(action);
      state.isLoading = false;
      state.email = action.payload.data.email;
      state.first_name = action.payload.data.first_name;
      state.profile_pic = base_url+folder_path+action.payload.data.profile_pic;
      state.last_name = action.payload.data.last_name;
      state.role = action.payload.data.role_data.role;
      state.role_desc = action.payload.data.role_data.desc;
      state.authtoken = action.payload.token;
      state.status = action.payload.status;
      state.msg = action.payload.message;

     }) 

     builder.addCase(profile_fetch.rejected,(state,action)=>{
      state.isLoading=false;
      state.error = action.payload.message;
      state.status = action.payload.status;
     })

    

    }
})

export default AuthSlice.reducer