import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux'
import { profile_fetch } from '../../ReduxToolkit/AuthSlice';
import "./Profile.css"
import { Link } from 'react-router-dom';
const Profile = () => {
    const {first_name,last_name,email,profile_pic,role,role_desc,status,error} = useSelector(state=>state.authPost)
    // console.log("first_name ",first_name);
    // console.log("last_name ",last_name);
    // console.log("email ",email);
    // console.log("profile_pic ",profile_pic);
    // console.log("role ",role);
    // console.log("role_desc ",role_desc);
    // console.log("status ",status);
    // console.log("authtoken ",authtoken);
    let [image,setImage] = useState({url:""})
     let dispatch = useDispatch();
    let token = window.sessionStorage.getItem("token")
    // console.log(" token ",token);

    

       useEffect(() => {
        dispatch(profile_fetch(token)) 
       },[])



  return (
    <div>

            {/* page title start */}
        
            <div className=' align-items-center theme-bg-primary-h1 titlepadding'>
          <div className='container'>
            <div className='row'>
             <div className='col-xl-12'>
              <div className='page__title-content text-center d-grid'>
                <div>
                     <h3 className='product-title'>Profile page</h3>
                </div>
                  
              </div>
             </div>
            </div>
          </div>
          </div>
       
        {/* page title end */}

    <section className='main__profile__section'>

    
    <Container>

        <div className='container'>
            <div className='row'>
              <div className='col-xl-6 col-lg-6 col-md-6 col-6'>
                 <figure className='img__figure'>
                    <img src={profile_pic} alt={first_name}/>
                 </figure>
              </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-6 profile__detail'>
                    
                    <h2>
                       Name: {first_name}{" "}{last_name}
                    </h2>
                    <p>
                       Role: {role}
                    </p>
                    <p>
                       Role Desc: {role_desc}
                    </p>
                    <p>email: {email}</p>
                       <div className='icon__button'>
                         <div className='d-flex justify-content-start'>
                         <button className='button__1' title='Delete'>
                      <Link ><i class="fa-solid fa-trash"></i></Link>
                    </button>

                    <button className='button__1' title='edit'>
                      <Link ><i class="fa-solid fa-pen-to-square"></i></Link>
                    </button>
                         </div>
                       </div>
                      
                </div>
            </div>

        </div>
    </Container>
    </section>
    </div>
  )
}

export default Profile