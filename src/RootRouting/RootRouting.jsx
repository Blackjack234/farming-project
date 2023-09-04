import React from 'react'
import {Route,Routes,BrowserRouter as Router} from "react-router-dom"
import LandingPage from '../ProjectComponent/LandingPage/LandingPage'

import Footer from '../Layout/Footer/Footer'
import Navbarhead from '../Layout/Nav/Navbar'
import AboutPage from '../ProjectComponent/AboutPage/AboutPage'
import ContactPage from '../ProjectComponent/ContactPage/ContactPage'
import RegForm from '../ProjectComponent/RegForm/RegForm'
import LoginForm from '../ProjectComponent/Login/LoginForm'
import Product from '../ProjectComponent/productPage/Product'
import DetailProduct from '../ProjectComponent/DetailProduct/DetailProduct'
import Profile from '../ProjectComponent/Profile/Profile'
import AuthError from '../Layout/AuthError/AuthError'
import Auth from '../ProjectComponent/Auth/Auth'
import CartPage from '../ProjectComponent/CartPage/CartPage'
import GotoTop from '../Layout/GotoTop/GotoTop'
import Pnf from '../Layout/Pnf/Pnf'
import CheckOut from '../ProjectComponent/CheckOutPage/CheckOut'
const RootRouting = () => {
  return (
    <Router>
      <Navbarhead/>
        <Routes>
            <Route path='' element={<LandingPage/>}/>
            <Route path='about' element={<AboutPage/>}/>
            <Route path='contact' element={<ContactPage/>}/>
            <Route path='regform' element={<RegForm/>}/>
            <Route path='login' element={<LoginForm/>}/>
            <Route path='autherror' element={<AuthError/>}/>
            <Route path='product/:cate' element={<Product/>}/>
            <Route path='product/:cate/singleproduct/:id' element={<DetailProduct/>}/>

            <Route element={<Auth/>}>
            <Route path="profile" element={<Profile/>}/>
            <Route path='cart' element={<CartPage/>}/>
            <Route path="checkout/:cartData" element={<CheckOut/>}/>
            </Route>
 
            <Route path='*' element={<Pnf/>}/>
          
        </Routes>
        <GotoTop/>
        <Footer/>
    </Router>
  )
}

export default RootRouting