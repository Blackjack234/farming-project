import React from 'react'
import "./AboutPage.css"
import {Link} from "react-router-dom"
// import {Button} from "react-bootstrap"
const AboutPage = () => {
  return (
   <>
        {/* page title start */}
        
        <div className=' align-items-center theme-bg-primary-h1 titlepadding'>
          <div className='container'>
            <div className='row'>
             <div className='col-xl-12'>
              <div className='page__title-content text-center d-grid'>
              <br/>
                <div>
                     <h3 className='about-title'>About Us</h3>
                </div>
                  
              </div>
             </div>
            </div>
          </div>
          </div>
       
        {/* page title end */}



        {/*about us section  */}
        <section className='my-5'>
              <div className='parent-about'>
                <div className='child-1-about'>
                <p>- About Our Farm</p>
                <h3> About Our Farm</h3>
                </div>
                <div className='child-2-about'>
                <p className='mb-5'>
                           At seeds organic we are passionate about supporting the financial cooperative movement that currently improves the lives of hundreds of millions of people worldwide. Cooperatives are voluntary organisations, open to all persons able to use their services and willing to accept the responsibilities of membership, without discrimination. You can join, and leave, at any time.
                           </p>

                           <Link to="/contact">
                               <button className='tb-btn'>
                                 get in touch{" "}{" "}
                                 <i class="fa-solid fa-arrow-right"></i>
                               </button>

                             </Link>     
                </div>
              </div>
            </section>
            {/* about us section end */}



             {/* suppoter start */}
             <div className='client-logo'>
                <div className='container'>
                 <span className='tb-support-client tb-support-client-ab mb-2'>Client logo</span>
                 <div className='row g-0'>
                   <div className='col-xl-12'>
                     <div className='logo'>
                        <div className='logo-slid'>
                          <img src="../../../../assate/clientLogos/3m.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/barstool-store.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/budweiser.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/buzzfeed.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/forbes.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/macys.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/menshealth.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/mrbeast.svg" alt='client-logo'/>
                        </div>

                        <div className='logo-slid'>
                          <img src="../../../../assate/clientLogos/3m.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/barstool-store.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/budweiser.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/buzzfeed.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/forbes.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/macys.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/menshealth.svg" alt='client-logo'/>
                          <img src="../../../../assate/clientLogos/mrbeast.svg" alt='client-logo'/>
                        </div>

                     </div>
                   </div>
                 </div>
                </div>

               </div>
            {/* suppoter end */}

     

          
       
            </>
  )
}

export default AboutPage