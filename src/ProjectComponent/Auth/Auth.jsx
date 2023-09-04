import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
const Auth = () => {
    let authError = window.sessionStorage.getItem("token")
  return (
    authError ? <Outlet/>:<Navigate to={"/autherror"}/>
  )
}

export default Auth