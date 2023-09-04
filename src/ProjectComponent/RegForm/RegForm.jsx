import React, { useState } from 'react'
import {useFormik} from "formik"
import "./regForm.css"
import { useSelector,useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { sign_up } from '../../ReduxToolkit/AuthSlice'
import {Spinner} from "react-bootstrap"
import swal from "sweetalert2"
const RegForm = () => {
  let {status,isLoading,msg} = useSelector(state =>state.authPost)
    let [pass,setPass] = useState("password");
    let seePass = () =>{
        if(pass === "password"){
          setPass("text")
          setTimeout(()=>{
            setPass("password")
          },3000)
        }else{
            setPass("password")
        }
    }


    let dispatch = useDispatch()
     let navi = useNavigate()
  let formik = useFormik({
    initialValues:{
        fname:"",
        lname:"",
        email:"",
        pwd:"",
        pro_pic:""

    },
    validate: values =>{
        let valid_email = /^([a-z0-9.-]{3,10})+@([a-z]{2,10})+\.([a-z]{2,10})+$/
        let errors={}
          
        if(!values.fname){
           errors.fname = "*Required"
        }

        if(!values.lname){
        errors.lname = "*Required"
        }

        if(!values.email){
           errors.email = "*Required" 
        }else if(!valid_email.test(values.email)){
          errors.email = "Invalid Email Pattern"
        }

        if(!values.pwd){
         errors.pwd = "*Required"
        }

        if(!values.pro_pic){
           errors.pro_pic = "*Required"
        }

        return errors
    },
    onSubmit: (values,{resetForm}) =>{
    let formdata = new FormData()

    formdata.append("first_name",values.fname);
    formdata.append("last_name",values.lname);
    formdata.append("email",values.email);
    formdata.append("password",values.pwd);
    formdata.append("profile_pic",values.pro_pic) 
    
    dispatch(sign_up(formdata))

    if(status === 200){
      swal.fire({
        icon:"success",
        title:"success!",
        text:"Registration successfull",
        confirmButtonColor:"#31512a",
        timer:4000
      })
      resetForm()
        navi("/login")
    }
    

    }

   
  })

//   console.log("formik form value",formik.values);
// console.log("formik error",formik.errors);
 if(isLoading === true){
  <div style={{padding:"150px"}}>
  <center>
   <Spinner animation='grow' variant='success'/>
  </center>
     </div>
 }else{
  return (
    <>
      {/* page title start */}


      <div className='page_title align-items-center theme-bg-primary-h1 titlepadding'>
        <div className='container'>
          <div className=' text-center '>
            <div>
              <h3 className='about-title'>Registration Form</h3>
            </div>
          </div>
        </div>
      </div>
      {/* page title end */}


      {/* registration form start */}
        <section className='p-5'>
        <form onSubmit={formik.handleSubmit} className=''>
        <div className='container'>
        <div className='row'>
                    <div className='col-md-6'>
                      <div className='tp-reg-form-field mb-20'>
                        <input type='text' name='fname' placeholder='First Name' onChange={formik.handleChange} value={formik.values.fname} onBlur={formik.handleBlur}/>

                        {formik.touched.fname && formik.errors.fname? <div className='mt-2 text-danger'>{formik.errors.fname}</div>:null}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='tp-reg-form-field mb-20'>
                        <input type='text' name='lname' placeholder='Last Name' onChange={formik.handleChange} value={formik.values.lname} onBlur={formik.handleBlur}/>
                        {formik.touched.lname && formik.errors.lname? <div className='mt-2 text-danger'>{formik.errors.lname}</div>:null}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='tp-reg-form-field mb-20'>
                        <input type='email' name='email' placeholder='Email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur}/>
                        { formik.touched.email && formik.errors.email? <div className='mt-2 text-danger'>{formik.errors.email}</div>:null}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='tp-reg-form-field mb-20 input-group'>
                        <input type={pass} name='pwd' placeholder='Password'  onChange={formik.handleChange} value={formik.values.pwd} onBlur={formik.handleBlur}/>
                        <span className='input-group-text'>{pass==="password"?<i className="fa-solid fa-eye" style={{color:"#676a6f"}} onClick={seePass}></i>:<i className="fa-solid fa-eye-slash" style={{color:"#676a6f"}} onClick={seePass}></i>}</span>
                        {formik.touched.ped && formik.errors.pwd? <div className='mt-2 text-danger'>{formik.errors.pwd}</div>:null}
                      </div>
                    </div>
                     
                     <div className='col-md-12'>
                        <div className='tp-reg-form-field mb-20'>
                          <input type='file' name='pro_pic'  onChange={(e)=>{formik.setFieldValue('pro_pic', e.currentTarget.files[0])}} onBlur={formik.handleBlur}/>
                          {formik.touched.pro_pic && formik.errors.pro_pic? <div className='mt-2 text-danger'>{formik.errors.pro_pic}</div>:null}
                        </div>
                     </div>
                    
                    <div className='col-md-12'>
                      <div className='tp-reg-form-field'>
                        <button type='submit' className='tp-contact-btn'>
                          Submit
                        </button>

                      </div>
                    </div>
                  </div> 
        </div>    
        </form>
          <div className='p-5  reg-msg'>
             Already have an Account? click <Link to={"/login"}>Sign In</Link>
            </div>    
        </section>  
      {/* registration form end */}

    </>
  )
 }

}

export default RegForm