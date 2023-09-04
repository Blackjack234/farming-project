import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { single_prod } from '../../ReduxToolkit/AuthSlice'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import "./DetailProduct.css"
import axios from 'axios'
const DetailProduct = () => {
  const { isLoading, totalProduct } = useSelector(state => state.authPost)
let [quantity,setQuentity] = useState(0)
let Uemail = window.sessionStorage.getItem("userEmail")
  // console.log("state data ",totalProduct);
  const { cate, id } = useParams()
  // console.log("category ",cate," product id ",id);
  let dispatch = useDispatch();





let addToCart = (proid,name,price,category,firstimg) =>{
  let userEmail = window.sessionStorage.getItem("userEmail")
  let postData = {
     prod_id:proid,
     name:name,
     price:price,
     category:category,
     amount:1,
     email:userEmail,
     first_img:firstimg
  }
axios.get("http://localhost:2000/cart").then(res=>{
      console.log("Axios res ",res.data);
      let cartItem = res.data
       let alreadyExist = cartItem.filter(item =>item.prod_id===proid && item.email === Uemail)
       if(alreadyExist.length>0){
         alert("Product is Already in Cart")

       }else{
        post_prod(postData)
       }
      
}).catch(err=>{
   console.log("Axios error",err);
})


let post_prod = (data)=>{
  axios.post("http://localhost:2000/cart",data)
  .then(res =>{
    console.log("Axios ",res);
    
  })
  .catch(err=>{
    console.log("Axios errror",err);
  })
}


  


}
  useEffect(() => {
    dispatch(single_prod())

  }, [dispatch])

  let cate_wise = totalProduct.filter(prod => prod.category === cate)
  let id_wise_prod = cate_wise.filter(prodSingle => prodSingle.id === id)



  console.log("singleData ", id_wise_prod);
  if (id_wise_prod.length < 0) {
    <div> loading...</div>
  } else {
    return (
      <div>

        {/* page title start */}

        <div className=' align-items-center theme-bg-primary-h1 titlepadding'>
          <div className='container'>
            <div className='row'>
              <div className='col-xl-12'>
                <div className='page__title-content text-center d-grid'>
                  <div>
                    <h3 className='product-title'>Product Details</h3>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* page title end */}


        <div className='single__prod'>
          <Container>
            <Row>
              {
                id_wise_prod.map(prod => {
                  return (
                    <React.Fragment key={prod.id}>
                      <Col>
                        <div className='parent__img'>
                          <div className='multi__pic'>
                            <figure>
                              <img src={prod.first_img} alt={prod.name} />
                              <img src={prod.second_img} alt={prod.name} />
                              <img src={prod.third_img} alt={prod.name} />
                            </figure>
                          </div>
                          <div className='single__pic'>
                            <Carousel slide={true} >
                              <Carousel.Item>
                                <img src={prod.first_img} alt={prod.name} />

                              </Carousel.Item>
                              <Carousel.Item>
                                <img src={prod.second_img} alt={prod.name} />

                              </Carousel.Item>
                              <Carousel.Item>
                                <img src={prod.third_img} alt={prod.name} />
                              </Carousel.Item>
                            </Carousel>
                          </div>
                        </div>

                      </Col>
                      <Col>
                        <h2>{prod.name}</h2>
                        <h3>price: ₹{" "}{prod.price}</h3>
                        <p>
                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam voluptate odio, nam laudantium accusantium possimus maiores veritatis ex ipsum maxime beatae nemo voluptatibus tempora sint a quidem suscipit repellat cum debitis nulla quos? Voluptatibus consectetur, fugit possimus recusandae necessitatibus expedita, saepe error cum, culpa reiciendis accusantium dignissimos laborum praesentium atque!
                        </p>
                        <div className='btn__parent'>
                          <div className='icon__parent'>
                            {/* <span className='icon__span'>
                              <i className="fa-solid fa-minus icon__minus" onClick={decrement()}></i>
                              <input type='text' className='icon__input' name='quantity' value={quantity} onChange={(e)=>setQuentity(e.target.value)}/>
                              <i className="fa-solid fa-plus icon__plus" onClick={increment()}></i>
                            </span> */}
                          </div>

                          <div className='cart__parent'>
                            <div >
                              <Link to="/cart"
                               onClick={()=>addToCart(prod.id,prod.name,prod.price,prod.category,prod.first_img)}
                              >
                                <button className='button__cart'>
                                  Add to cart{" "}{" "}
                                  <i class="fa-solid fa-cart-shopping"></i>
                                </button>

                              </Link>
                            </div>


                          </div>


                        </div>

                        <div className='quick__info'>
                          <h6>Quick info:</h6>
                          <hr />
                          <ul>
                            <li>unit:{" "} 1</li>
                            <li>category:{" "}{prod.category}</li>
                            <li>Tag:{" "}{prod.category}</li>
                          </ul>
                        </div>
                      </Col>
                    </React.Fragment>
                  )
                })
              }

            </Row>
          </Container>
        </div>

      </div>
    )
  }



}

export default DetailProduct