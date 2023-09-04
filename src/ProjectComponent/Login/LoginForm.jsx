import React, { useState } from 'react'
import "./LoginForm.css"
import { Link } from "react-router-dom"
import {useFormik} from "formik"
import { useDispatch,useSelector} from 'react-redux'
import { sign_in } from '../../ReduxToolkit/AuthSlice'
import { useNavigate } from 'react-router-dom'
import swal from "sweetalert2"
const LoginForm = () => {
  const {status,msg,authtoken,isActive,userEmail,isLoading} = useSelector(state=>state.authPost)
  console.log("In login status and msg and token ",status," ",msg," ",authtoken ,"IsActive: ", isActive,userEmail);
  let navi = useNavigate();
  let [pass,setPass] = useState("password")
  let dispatch = useDispatch()
  const seePass = ()=>{
    if(pass === "password"){
          setPass("text")

          setTimeout(() => {
            setPass("password")
          }, 3000);
    }else{
      setPass("password")
    }
  }


  let formik = useFormik({
    initialValues:{
      email:"",
      pwd:""
    },
    validate: values =>{
      let valid_email = /^([a-z0-9.-]{3,10})+@([a-z]{2,10})+\.([a-z]{2,10})+$/
        let errors={}

        if(!values.email){
          errors.email = "*Required" 
       }else if(!valid_email.test(values.email)){
         errors.email = "*Invalid Email Pattern"
       }

       if(!values.pwd){
        errors.pwd = "*Required"
       }
 // console.log("formik errors",errors);

        return errors
    },

    onSubmit: async (values) => {
      let formdata = new FormData()
      formdata.append("email",values.email);
      formdata.append("password",values.pwd);
          dispatch(sign_in(formdata))

          formik.setFieldValue("isLoading",true)
          
          console.log("isLogin: ",isActive,'isLoading: ',isLoading);
       const intervalId = setInterval(() => {
    if (isActive && !isLoading) {
      clearInterval(intervalId); // Stop checking once the conditions are met

      swal.fire({
        icon: "success",
        title: "Success!",
        text: msg,
        confirmButtonColor: "#31512a",
        timer: 4000
      });

      window.sessionStorage.setItem("token", authtoken);
      window.sessionStorage.setItem("userEmail", userEmail);
      navi("/");
    }
  }, 100);
             
         
         
            // else{
            //   swal.fire({
            //     icon:"error",
            //     title:"oops...!",
            //     text:msg,
            //     confirmButtonColor:"#31512a",
            //     timer:4000
            //   })
            // }
          

    }  
    

  })

  // console.log("formik values",formik.values);
 


  return (
    <div className='parent__login__div'>
      <div className='p-5 m-5'>
        <div className='container msg__div '>
          <div className='row align-items-center text-center '>
            <div className='col-xxl-6 col-xl-6 col-lg-6 '>
              <h3 className='login-title'>
                Please login
              </h3>
            </div>
            <div className='col-xxl-6 col-xl-6 col-lg-6 justify-content-center'>
              <form className='login__form' onSubmit={formik.handleSubmit}>
                <h2 className='text-center form-head'>Sign In</h2>
                <div className='container p-5'>
                  <div className='row'>
                    <div className='col-md-12'>

                      <div className='tp-login-form-field mb-3 input-group'>
                        <input
                          type='email'
                          name='email'
                          placeholder='Enter Email'
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                          autoComplete='off'
                        />
                        <span className='input-group-text'><i className="fa-solid fa-envelope" style={{ color: "#676a6f" }}></i></span>

                        { formik.touched.email && formik.errors.email?<div className='mt-2 text-danger'>{formik.errors.email}</div>:null}
                      </div>

                    </div>

                    <div className='col-md-12'>
                      <div className='tp-login-form-field mb-3 input-group'>
                        <input
                          type={pass}
                          name='pwd'
                          placeholder='Enter Password'
                          onChange={formik.handleChange}
                          value={formik.values.pwd}
                          onBlur={formik.handleBlur}
                          autoComplete='off'
                        />
                        <span className='input-group-text'>
                          {
                            pass === "password"?
                            <i className="fa-solid fa-eye fa-beat" style={{ color: "#676a6f",cursor:"pointer" }} onClick={seePass}></i>
                            :
                            <i className="fa-solid fa-eye-slash" style={{color:"#676a6f",cursor:"pointer"}} onClick={seePass}></i>
                          }
                          
                        </span>
                        {formik.touched.pwd && formik.errors.pwd?<div className='mt-2 text-danger'>{formik.errors.pwd}</div>:null}


                      </div>
                    </div>

                    <div className='col-md-12'>
                      <div className='tp-login-form-field '>
                        <button type='submit' className='tp-login-btn'>
                          Log In
                        </button>
                      </div>
                    </div>


                  </div>
                </div>
                <div className=' login__msg'>
                  Don't have an Account? click <Link to={"/regform"}>Sign Up</Link>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default LoginForm