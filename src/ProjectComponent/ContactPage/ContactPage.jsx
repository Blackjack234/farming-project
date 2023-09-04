import React from 'react'
import "./ContactPage.css"
import { useFormik } from 'formik'
import swal from "sweetalert2"
const ContactPage = () => {
  let formik = useFormik({
    initialValues:{
      fullName:"",
      email:"",
      phone:"",
      subject:"",
      yourMessage:""
    },
  validate:values=>{
    let valid_email = /^([a-z0-9.-]{3,10})+@([a-z]{2,10})+\.([a-z]{2,10})+$/
    let valid_phone = /^[0-9]+$/
    let errors = {}
    if(!values.fullName){
     errors.fullName = "*Name is Required"
    }

    if(!values.email){
        errors.email = "*Email is Required"
    }else if(!valid_email.test(values.email)){
      errors.email = "Invalid Pattern"
    }

    if(!values.phone){
           errors.phone = "*Phone no Required"
    } else if(!valid_phone.test(values.phone)){
         errors.phone = "*only numbers are allowed"
    }else if(values.phone.length<10 || values.phone.length>10){
        errors.phone = "*phone no. must be 10 digit long"
    }

    if(!values.subject){
         errors.subject = "*Subject Required"
    }

    if(!values.yourMessage){
      errors.yourMessage ="*Message is Required"
    }


     return errors
    },

    onSubmit: (values,{resetForm})=>{
      const config = {
        Username:"paulanirban390@gmail.com",
        Password:"ADA0226289F314B0B3BEE3BCEADA89760075",
        Host:"smtp.elasticemail.com",
        Port:2525,
        // SecureToken : "407d5805-e763-4be9-9bdb-b5f843958702",
        To : 'paulanirban390@gmail.com',
        From : values.email,
        Subject : values.subject,
        Body : `Hi,My Name is ${values.fullName},${" "} ${values.yourMessage}.${"\n"} My contact no is ${values.phone}.`
      }

      if(window.Email){
           window.Email.send(config).then((message)=>{
            swal.fire({
              icon:"success",
              title:"success!",
              text:message,
              confirmButtonColor:"#31512a",
              timer:4000
            })
            // window.location.reload(false)
            resetForm()
          })
      }
    }
   
  }

  )

  // console.log("form values , ",formik.values);
  console.log("form values , ",formik.errors);
  return (
    <>
      {/* page title start */}


      <div className='page_title align-items-center theme-bg-primary-h1 titlepadding'>
        <div className='container'>
          <div className=' text-center '>
          <br/>
            <div>
              <h3 className='about-title'>Contact Us</h3>
            </div>
          </div>
        </div>
      </div>
      {/* page title end */}

      {/* tp-contact-area start */}
      <div className='tp-contact-area'>
        <div className='container p-5'>
          <div className='row'>
            <div className='col-lg-10'>
              <div className='tp-contact-wrap mb-5'>

                <h3 className='tp-section-title'>
                  If you Have Any Query, Don’t Hesitate Contact with us
                </h3>
              </div>
            </div>
          </div>

          <div className='row mt-40'>

            <div className='col-lg-4'>
              <div className='row'>


                <div className='col-lg-12 col-md-4 col-sm-6'>
                  <div className='tp-contact-info'>
                    <div className='tp-contact-info-icon'>
                      <i className="fa-solid fa-location-dot" style={{ color: "#036d23",fontSize:"50px"}}></i>
                    </div>
                    <div className='tp-contact-info-text'>
                      <h4 className='tp-contact-info-title'>Address</h4>
                      <p>
                        saltlake,AN block
                        <br />
                        kolkata 700102
                      </p>
                    </div>
                  </div>
                </div>


                <div className='col-lg-12 col-md-4 col-sm-6'>
                  <div className='tp-contact-info'>
                    <div className='tp-contact-info-icon'>
                      <i class="fa-solid fa-phone" style={{ color: "#036d23",fontSize:"50px" }}></i>
                    </div>
                    <div className='tp-contact-info-text'>
                      <h4 className='tp-contact-info-title'>Phone</h4>
                      <p>
                        1234567890
                        <br />
                        9090909090
                      </p>
                    </div>
                  </div>
                </div>

                <div className='col-lg-12 col-md-4 col-sm-6'>
                  <div className='tp-contact-info'>
                    <div className='tp-contact-info-icon'>
                      <i class="fa-solid fa-envelope" style={{ color: "#036d23",fontSize:"50px" }}></i>
                    </div>
                    <div className='tp-contact-info-text'>
                      <h4 className='tp-contact-info-title'>Email</h4>
                      <p>
                        info@mail.com
                        <br />
                        info@mail.com
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className='col-lg-8'>
              <div>
                <form onSubmit={formik.handleSubmit}>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='tp-contact-form-field mb-20'>
                        <input 
                        type='text' 
                        name='fullName' 
                        placeholder='Fullname' 
                        value={formik.values.fullName} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        />
                         {formik.touched.fullName && formik.errors.fullName ? <div className='mt-2 text-danger'>{formik.errors.fullName}</div>:null}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='tp-contact-form-field mb-20'>
                        <input 
                        type='email' 
                        name='email' 
                        placeholder='Email Address' 
                        value={formik.values.email} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        />
                         {formik.touched.email && formik.errors.email ? <div className='mt-2 text-danger'>{formik.errors.email}</div>:null}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='tp-contact-form-field mb-20'>
                        <input 
                        type='text' 
                        name='phone' 
                        placeholder='phone' 
                        value={formik.values.phone} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        />
                         {formik.touched.phone && formik.errors.phone ? <div className='mt-2 text-danger'>{formik.errors.phone}</div>:null}
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='tp-contact-form-field mb-20'>
                        <input 
                        type='text' 
                        name='subject' 
                        placeholder='Subject' 
                        value={formik.values.subject} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        />
                        {formik.touched.subject && formik.errors.subject ? <div className='mt-2 text-danger'>{formik.errors.subject}</div>:null}
                      </div>
                    </div>

                    <div className='col-md-12'>
                      <div className='tp-contact-form-field mb-20'>
                        <textarea 
                        name='yourMessage' 
                        placeholder='Your Message' 
                        value={formik.values.yourMessage} 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        />
                         {formik.touched.yourMessage && formik.errors.yourMessage ? <div className='mt-2 text-danger'>{formik.errors.yourMessage}</div>:null}
                      </div>
                    </div>
                    <div className='col-md-12'>
                      <div className='tp-contact-form-field'>
                        <button type='submit' className='tp-contact-btn'>
                          Send Message
                        </button>

                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* tp-contact-area end */}

      {/* tp-map start */}
      <div className='map-pad py-5'>
        <div className='container'>

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.293674794144!2d88.42368325136839!3d22.576357221821524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b020703c0d%3A0xece6f8e0fc2e1613!2sSector%20V%2C%20Bidhannagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1691343276151!5m2!1sen!2sin" width="800" height="600" style={{ border: 0, alignContent: "center" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='map' className='w-100'></iframe>
        </div>

      </div>
      {/* tp-map end */}
    </>
  )
}

export default ContactPage