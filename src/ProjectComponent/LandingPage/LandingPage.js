import React from 'react'
import Bannerpart from '../../Layout/Banner/Bannerpart'
import "./landing.css"
import { Link } from "react-router-dom"
import { Container } from 'react-bootstrap'

const LandingPage = () => {
  return (

    <div>
      <Bannerpart />

      {/* farm ecology start */}
      <div className='p-5 m-5'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-xxl-4 col-xl-4 col-lg-4'>
              <h3 className='tp-secland-title'>
                Farm Ecology Products
              </h3>
            </div>

            <div className='col-xxl-1 col-xl-1 col-lg-1 d-none d-lg-block'>
              <span className='line-bar'></span>
            </div>

            <div className='col-xxl-7 col-xl-7 col-lg-7 align-items-end'>
              <p>
                Smells racy free announcing than durable zesty smart exotic far feel. Screamin' affordable secret way absolutely. Evulates vast a real proven works discount secure care. Market invigorate a awesome handcrafted bigger comes newer recommended lifetime.
              </p>
              <div className='mt-2'>
                <div className='founder'>
                  <h5>Anirban Paul</h5>
                  <span>Founder</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* farm ecology end */}

      {/* tp-ft-list start */}
      <section className='mb-5'>
        <div className='container'>
          <div className='row justify-content-end'>
            <div className='col-xl-7 col-lg-8'>
              <div className='tp-ft-list'>
                <div className='tp-ft-list-item mb-2'>
                  <i className="fa-solid fa-wheat-awn"></i><br /><br />
                  <h5>Agriculture Products</h5>
                </div>
                <div className='tp-ft-list-item mb-2'>
                  <i className="fa-sharp fa-solid fa-seedling"></i><br /><br />
                  <h5>seeds Products</h5>
                </div>
                <div className='tp-ft-list-item mb-2'>
                  <i className="fa-solid fa-tractor"></i><br /><br />
                  <h5>Farming Tools</h5>
                </div>
                <div className='tp-ft-list-item mb-2'>
                  <i className="fa-solid fa-warehouse"></i><br /><br />
                  <h5>Warehouse Stock</h5>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>
      {/* tp-ft-list end */}

      {/* tp-video start */}
      <section className='video__section'>
        <div className='video__main'>
          <div className='container'>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12  ">
                <div className='paly__div '>
                  {/* <button className='play__btn'>
                      <Link to={"https://www.youtube.com/embed/uZjCNtOeZG4"} data-lity target="__blanck"><i className="fa-solid fa-play"></i></Link>
                    </button> */}
                         

                  
                    <iframe src="https://www.youtube.com/embed/uZjCNtOeZG4" title="Epic Farming With John Deere | 4K"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className='iframe__div'></iframe>
                    
                  
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-12 video__col_2 ">
                  <div className='video__content'>
                    <h3 className='video__title'>
                      High Quality Growing Organic Foods
                    </h3><br />
                    <p className='video__p'>
                      Agriculture was a family business not too long ago. Now a days, automation, scientific advances and better transportation have allowed for industrialization.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

      </section>
      {/* tp-video end */}

      {/* common-info start */}
      <section className='common__info__parent'>
        <div className='container'>
          <div className="row">
            <div className="col-lg-6 col-12 ">
              <div className='ph__text'>
                <p className=''>Get Quick Support</p>
                <h2 className='text-center'>
                  (+91)9090909090
                </h2>

              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className=''>
                <p className=''>
                  Make Online Order
                </p>
                <h2 className='text-center'>
                  info@mail.com
                </h2>

              </div>
            </div>
          </div>

        </div>
      </section>
      {/* common-info end */}

      {/* company-logo start */}
      <Container>
        <section>

        </section>
      </Container>
      {/* company-logo end */}
    </div>
  )
}

export default LandingPage