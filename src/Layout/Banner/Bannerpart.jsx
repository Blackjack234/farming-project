import React from 'react'
// import { Carousel } from 'react-bootstrap'
import "./banner.css"
const Bannerpart = () => {
  return (
    <>
    <div className='parent-banner'>
      <figure>
        <img src='../../../../assate/banner/farming_banner_4.jpg' className='w-100 banner-img' alt='banner'/>
      </figure>

      <div className='banner-content'>
        <h1>Feeding the future.</h1>
        <p>The agricultural way is our past, present, and future.</p>
      </div>
    </div>
    </>
  )
}

export default Bannerpart