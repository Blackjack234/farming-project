import React from 'react'
import { Link } from 'react-router-dom'
import "./AuthError.css"
const AuthError = () => {
  return (
    <div className='errdiv__parent'>
        <div className='errdiv__child'>
        <center>
        <h1>You need to login first</h1>
       </center><br/>
         
         <center>
            <Link to="/login">
            <button className='btn btn-outline-warning'>
              Go to signin
            </button>
            </Link>
         </center>

        </div>

    </div>
  )
}

export default AuthError