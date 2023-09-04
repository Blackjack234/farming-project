import React from 'react'
import "./Pnf.css"
import { Link } from 'react-router-dom'
const Pnf = () => {
  return (
    <div className='error_main'>
        <figure>
            <img src='../../../../assate/error/error_404_5.png' alt='error' height={600} width={600}/>
        </figure>
        <Link to={"/"}>
        <button  className='tp-contact-btn'>
              Go Back            
              
        </button>
        </Link>
    </div>
  )
}

export default Pnf