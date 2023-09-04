import React, { useEffect, useState } from 'react'
import "./GotoTop.css"
const GotoTop = () => {
    let [isVisble,setVisible] = useState(false)
    let gotoTop =()=>{
        window.scrollTo({top:0,left:0,behavior:"smooth"})
    }

    const listentoScroll = () => {
        let scrollHeight = 250;
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop

        console.log("scroll data",winScroll);

        if(winScroll>scrollHeight){
         setVisible(true)
        }else{
          setVisible(false)
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll",listentoScroll)

        return ()=> window.removeEventListener("scroll",listentoScroll)
    },[])
  return (
    <div className='top_btn'>
        {
            isVisble&&(
                 <button className='button__top' title='GO TO TOP' onClick={gotoTop}>
                   <i className="fa-solid fa-arrow-up-long fa-bounce"></i>
                    </button>
            )
        }
                  
    </div>
  )
}

export default GotoTop