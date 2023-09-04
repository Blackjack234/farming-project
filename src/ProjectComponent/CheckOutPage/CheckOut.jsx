import React,{useState,useEffect} from 'react'
import "./CheckOut.css"
import { Accordion } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import swal from "sweetalert2"
const CheckOut = () => {
  let navi = useNavigate();
  let [TotalPrice,setTotalPrice] = useState(0)
  const uEmail = window.sessionStorage.getItem("userEmail")
  let authToken = window.sessionStorage.getItem("token")
 let {cartData}= useParams();
 const allCarprod = JSON.parse(decodeURIComponent(cartData));
 console.log("Cart data for check out page",allCarprod);

 let handlePrice =()=>{
  let ans = 0;
 allCarprod.map((item)=>(
   ans +=item.amount*item.price
  ))  

  setTotalPrice(ans)
}

useEffect(()=>{
  handlePrice()
},[allCarprod])


let handleOrder = ()=>{
  

  console.log("user email ",uEmail);
  // const encodedEmail = encodeURIComponent(uEmail);
      window.sessionStorage.removeItem("cart")
  // fetch(`http://localhost:2000/cart?email=${uEmail}`, {
  //   method: 'DELETE',
  // })
  //   .then(response => {
  //     if (response.ok) {
  //       console.log(`User with email ${uEmail} deleted successfully.`);
  //     } else {
  //       console.error(`Error deleting user with email ${uEmail}`);
  //     }
  //   })
  //   .catch(error => {
  //     console.error(`Error: ${error}`);
  //   });
}
const deleteCartItem = async (itemId) => {
  try {
    // Send a DELETE request to delete the item with the given ID
    await axios.delete(`http://localhost:2000/cart/${itemId}`);
    // Remove the deleted item from the cart state
    // setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  } catch (error) {
    console.error(`Error deleting item with ID ${itemId}:`, error);
  }
};

let handleDelete = async()=>{
  const itemIdsToDelete = allCarprod.map((item) => item.id);


  itemIdsToDelete.forEach(async (itemId) => {
    await deleteCartItem(itemId);
  });
  swal.fire({
    icon:"success",
    title:"success!",
    text:"Order placed successfully",
    confirmButtonColor:"#31512a",
    timer:4000
  })
navi("/")

}


  return (
   <>
        {/* page title start */}
        
        <div className=' align-items-center theme-bg-primary-h1 titlepadding'>
          <div className='container'>
            <div className='row'>
             <div className='col-xl-12'>
              <div className='page__title-content text-center d-grid'>
                <div>
                     <h3 className='about-title'>Checkout</h3>
                </div>
                  
              </div>
             </div>
            </div>
          </div>
          </div>


          <section>
            <div className='container'>
              <div className="row">
                <div className='col-lg-6'>
                  <div className='p-4 m-4'>
                  <h3>Billing Address</h3>
                  <hr className='pb-3'/>
                  <form>
                   <div className="row">
                   <div className='col-md-12'>
                      <div className='tp-contact-form-field mb-20'>
                        <input 
                        type='text' 
                        name='Address' 
                        placeholder='Address*' 
                        />
                       
                      </div>

                      <div className='col-md-12'>
                      <div className='tp-contact-form-field mb-20'>
                        <input 
                        type='text' 
                        name='city' 
                        placeholder='Town/city*' 
                        />
                       
                      </div>

                    </div>

                    <div className='col-md-12'>
                      <div className='tp-contact-form-field mb-20'>
                        <input 
                        type='text' 
                        name='state' 
                        placeholder='state*' 
                        />
                       
                      </div>

                    </div>

                    <div className='col-md-12'>
                      <div className='tp-contact-form-field mb-20'>
                        <input 
                        type='text' 
                        name='pin' 
                        placeholder='postcode/Zipcode*' 
                        />
                       
                      </div>

                    </div>

                    <div className='col-md-12'>
                      <div className='tp-contact-form-field mb-20'>
                        <input 
                        type='text' 
                        name='phone' 
                        placeholder='Phone No' 
                        />
                       
                      </div>

                    </div>
                  </div>
                   </div>
                   </form>

                </div>
              </div>

              <div className="col-lg-6 table__col">
                <div className='your__order p-5 '>
                  <h3>Your Order</h3>
                  <hr className='pt-2 pb-2'/>
                  <div className='table-responsive'>
                    <table className='table table-hover'>
                       <thead>
                         <tr>
                            <td>
                                Product
                            </td>
                            <td>
                                Price
                            </td>
                         </tr>
                       </thead>
                       <tbody>
                        {
                          allCarprod?.map(data=>(
                            <tr key={data.id}>
                            <td>
                            {data.name} × {data.amount}
                            </td>
                            <td>
                            {"₹ "} {data.amount*data.price}
                            </td>
                        </tr>
                          ))
                        }

                        <tr>
                          <td>
                           <b> Total Price</b>
                          </td>

                          <td>
                          {"₹ "} {TotalPrice}
                          </td>
                        </tr>
                      
                       </tbody>
                    </table>
                  </div>
                  <div className='payment__method pt-3'>
                  <Accordion flush>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Direct Bank Tranfer</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Cheque Payment</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
       <Accordion.Header>
        Online Payment
       </Accordion.Header>
       <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

                  </div>
                  <div className='p-4 w-100'>
                        <button type="button" className='tp-contact-btn' onClick={handleDelete}>
                          Place Order
                        </button>

                      </div>
                </div>
              </div>
            </div>
            </div>
          </section>
       
        {/* page title end */}
   </>
  )
}

export default CheckOut