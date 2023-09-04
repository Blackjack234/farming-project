import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import "./product.css"
const Product = () => {
  let url = "http://localhost:1000/product"
  let { cate } = useParams()
  let [product, setProduct] = useState([])
  let [pagetitle,setPageTitle] = useState(cate.charAt(0).toUpperCase() + cate.slice(1))
  let [searchItem, setSearchItem] = useState("")
  let [Sorting_value,setSortingValue] = useState("")
  // let itemperPage = 8;
  // console.log("category is",cate);
  let [page, setPage] = useState(0)

  let sorting = () =>{
    let userSorting_value = document.getElementById("sort");
    let sort_value = userSorting_value.options[userSorting_value.selectedIndex].value;
    setSortingValue(sort_value);
 }


  

  const fetch_data = (value_sorting = Sorting_value) => {
    axios.get("http://localhost:1000/product")
      .then(res => {
        // console.log("Axios res",res);
        let category_product = res.data.filter(data => data.category === cate)
        //  console.log("Category wise product", category_product);

        // if (res.data && category_product) {
        //   setProduct(category_product)
        // }
       let sorted_value
        let new_value = [...category_product]
        if(value_sorting === "a-z"){
             sorted_value = new_value.sort((a,b)=>
               a.name.localeCompare(b.name)
             )          
        }else if(value_sorting === "z-a"){
           sorted_value = new_value.sort((a,b)=>
           b.name.localeCompare(a.name)
           )
        }else if(value_sorting === "lowest"){
          const comparePriceAccending = (a,b) =>{
            return a.price-b.price
          }
            sorted_value = new_value.sort(comparePriceAccending)
        }else if(value_sorting === "highest"){
          const comparePriceDescnding = (a,b) =>{
            return b.price - a.price
          }
          sorted_value = new_value.sort(comparePriceDescnding)
        }
        else if(value_sorting === "" && res.data && category_product){
            sorted_value = category_product
        }
        setProduct(sorted_value)
      })
      .catch(err => {
        console.log("Axios error", err);
      })
  }
  console.log(product);


 



  useEffect(() => {
    fetch_data()
  }, [Sorting_value])



  

  if(Sorting_value){
console.log(Sorting_value);
  }
   
  return (
    <div>

      {/* page title start */}

      <div className=' align-items-center theme-bg-primary-h1 titlepadding'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-12'>
              <div className='page__title-content text-center d-grid'>
                <br/>
                <div>
                  <h3 className='product-title'>{pagetitle}</h3>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* page title end */}

      {
        product.length > 0 &&
        <div className='products'>
          <div className='p-5'>
            <div className='container'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                <div className="input-group justify-content-end align-items-center">
                  <div className="form-outline" style={{width:"94%"}}>
                    <input type="search" id="form1" className="form-control w-100 search__bar" placeholder='Search' onChange={(e) => setSearchItem(e.target.value)} />
                    
                  </div>
                  {/* <span className='input-group-text search__span'><i className="fa-solid fa-magnifying-glass fa-beat"></i></span> */}
                </div>
                </div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6'>
                <div className='input-group justify-content-end align-items-center'>
                  <div className='form-outline'>
                    <select name='sort' id="sort" className='form-select' aria-label="sorting select section" onClick={sorting}>
                      <option value="lowest">Price(lowest)</option>
                      <option value="#" disabled></option>
                      <option value="highest">Price(highest)</option>
                      <option value="#" disabled></option>
                      <option value="a-z">Name(a-z)</option>
                      <option value="#" disabled></option>
                      <option value="z-a">Name(z-a)</option>
                    </select>
                  </div>
                </div>
                </div>
              </div>
              <div className='row p-3'>


                {
                  product.filter(val => {
                    if (searchItem === "") {
                      return val
                    } else if (val.name.toLowerCase().includes(searchItem.toLowerCase())) {
                      return val
                    }
                  }).map(data => (

                    <div className='col-xl-3 col-lg-4 col-md-6 col-sm-12' key={data.id}>

                      <div className="card m-4" style={{ width: "18rem" }} >
                        <img src={data.first_img} className="card-img-top" alt={data.name} />
                        <div className="card-body">
                          <h5 className="card-title">{data.name}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">Price : {data.price}</h6>
                          <Link to={`singleproduct/${data.id}`} className='card-link'>
                            
                            <div className='tp-contact-form-field'>
                        <button type='submit' className='tp_product_btn'>
                          Read More
                        </button>

                      </div></Link>
                        </div>
                      </div>


                      {/* <div className='Trek'>
                                    <figure className='trekimg1' key={data.id}>
                                        <img src={data.first_img} className="card-img-top img-fluid" alt={data.name}  style={{width:"18rem",height:"18rem"}}/>
                                    </figure>
                                    <div className='trek-content'>
                                        <div className='detail'>
                                        <h4>{data.name}</h4>
                                        <Link to={`singleproduct/${data.id}`}>
                                        <button>Details Page</button>
                                        </Link>
                                        
                                        </div>
                                    </div>
                                </div> */}
                    </div>

                  ))
                }
              </div>


            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Product