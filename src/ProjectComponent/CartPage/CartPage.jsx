import React, { useEffect,useState } from 'react'
import "./CartPage.css"
import { fetch_cart } from '../../ReduxToolkit/CartSlice'
import {fetch_coupon} from "../../ReduxToolkit/CartSlice"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import swal from "sweetalert2"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import CheckOut from '../CheckOutPage/CheckOut'
const CartPage = () => {
  let {isLoading,msg,cartProd,coupon} = useSelector((state)=>state.cartpost)
  console.log("Loading status ",isLoading," message ",msg," data in cart ",cartProd,"coupons",coupon);
  const userEmail = window.sessionStorage.getItem("userEmail");
  // let navi= useNavigate()
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  let [couponError,setCouponError] = useState("");
  let dispatch = useDispatch();
  let navi = useNavigate()
  let [TotalPrice,setTotalPrice] = useState(0)
 let cart_see = window.sessionStorage.getItem("cart");
 // setAll(sort_cart)
 let [allCarprod,setAll] = useState([])
//  let sort_cart = cartProd.filter(prod=>prod.user_email === userEmail)
//  console.log("sorted cart prod ",sort_cart);



console.log("allcart ",allCarprod);


useEffect(() => {
  const storedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
  setAll(storedCart);
  handlePrice();
}, []);


  
useEffect(()=>{
  if(userEmail){
dispatch(fetch_cart())
dispatch(fetch_coupon())
  }else{
    navi("/login")
  }
  
  // setAll(sort_cart)
  // updateTotalPrice(storedCart);
  
},[dispatch,userEmail])


useEffect(() => {
  // Filter cart items based on the user's email
  const sort_Cart = cartProd.filter(prod => prod.email === userEmail);

//  console.log("sorted cart prod ",sort_cart);

  setAll(sort_Cart); // Update the allCarprod state with the filtered items
  // handlePrice(sortedCart); // Update the total price based on the filtered items
}, [cartProd, userEmail]);


  useEffect(() => {
    if (allCarprod.length === 0) {
      window.sessionStorage.removeItem("cart");
    }
    else {
      sessionStorage.setItem("cart", JSON.stringify(allCarprod));
    }
    handlePrice();
  }, [allCarprod]);


  useEffect(()=>{
    sessionStorage.setItem("cart", JSON.stringify(allCarprod));
    handlePrice();
  },[allCarprod])



  
 


  // console.log("all cart prod ",allCarprod);

   let handlePrice =()=>{
     let ans = 0;
    allCarprod.map((item)=>(
      ans +=item.amount*item.price
     ))  

     setTotalPrice(ans)
  }
  useEffect(()=>{
    handlePrice()
  },[])

  let incrementamount=(id)=>{
    let updatecart = [...allCarprod]

     let newcart = updatecart.map((cruElem,index)=>{
      if(cruElem.id === id){
         console.log(cruElem);
        console.log("after cruElm",cruElem);
         return {...cruElem,amount:cruElem.amount+1} 
         
      }else{
         return cruElem
      }
       
     
    })
    console.log("newcart",newcart);
    setAll(newcart);
    handlePrice();
    // console.log("new sort_cart ",sort_cart); 
    // return sort_cart
     

    
 }

 let decrementamount =(id) =>{
  let updatecart = [...allCarprod]

  let newcart = updatecart.map((cruElem,index)=>{
   if(cruElem.id === id){
      console.log(cruElem);
     console.log("after cruElm",cruElem);
      return {...cruElem, amount: Math.max(1, cruElem.amount - 1)} 
      
   }else{
      return cruElem
   }
    
  
 })
 console.log("newcart",newcart);
 setAll(newcart);
 handlePrice();
 // console.log("new sort_cart ",sort_cart); 
 // return sort_cart
 }


 let removeItem =(id)=>{
  const updatedCart = allCarprod.filter((item) => item.id !== id);
  setAll(updatedCart);
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  handlePrice();
  axios.delete(`http://localhost:2000/cart/${id}`)
  .then(res=>{
    console.log("deleted ariginal array cart ",res.data);
  })
  .catch(err=>{
    console.log("deleted err ",err);

  })

 }

let handleCoupon =()=>{
  const matchedCoupon=coupon.find(cou=>cou.code === couponCode.toUpperCase())

  if(matchedCoupon){
  setDiscount(matchedCoupon.discount)

  setCouponError("Coupon code applied")

  setTimeout(()=>{
    setCouponError("")
  },3000)

  }else{
 setCouponError("No Such Coupon  Is Found")

setTimeout(()=>{
  setCouponError("")
},3000)

 setDiscount(0)
  }


}

let handleCheckout = (data)=>{

  // swal.fire({
  //   icon:"success",
  //   title:"Your order has been placed!",
  //   text:msg,
  //   confirmButtonColor:"#31512a",
  //   timer:4000
  // })

  const cartDataParam = JSON.stringify(data);
  navi(`/checkout/${encodeURIComponent(cartDataParam)}`);

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
                    <h3 className='product-title'>Cart Page</h3>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
{/* page title end */}
<section className='p-5'>
    <div className='container'>
    <div className="row">

<div className="col-12">
        <div className='cart__table table-responsive'>
         <table class="table table-bordered">
  <thead>
    <tr>
      
      <th scope="col">Images</th>
      <th scope="col">Product</th>
      <th scope="col">Unit Price</th>
      <th scope='col'>Quantity</th>
      <th scope="col">Sub Total</th>
      <th scope='col'>Remove</th>
    </tr>
  </thead>
  <tbody>
    {
      allCarprod.map((data)=>(
        <tr>
        <td className='p-3'>
          <figure>
              <img src={data.first_img} alt={data.name} height={100} width={200}/>
          </figure>
        
        </td>
        <td className='p-3'>
          {data.name}
        </td>
        <td className='p-3'>
          {data.price}
        </td>
        <td className='p-3'>
          <div className='p-4'>
          <button className="button_quent" title='decrement'onClick={()=>decrementamount(data.id)}>
          <i className="fa-solid fa-minus"></i>
          </button>
         <button className="button_quent fw-bolder">
          {
             data.amount 
          }
         </button>
            
          
          <button className='button_quent' title='increment' onClick={()=>incrementamount(data.id)}>
          <i className="fa-solid fa-plus"></i>
          </button>
          </div>
        </td>
        <td className='p-3'>
          {data.price *data.amount}
        </td>
        <td className='p-3'>
        
          <i className="fa-solid fa-trash" style={{color:"#eaed07"}} onClick={()=>removeItem(data.id)} title='Delete Item'></i>
         
        </td>
      </tr>
      ))
    }
   
  </tbody>
</table>

</div>
</div>
</div>

<div className="row">
  <div className="col-12">
    <div className="coupon__main">
      <div className="coupon">
        
      <input
          type='text'
          placeholder="coupon(super20)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className='coupon__input'
        />
        {couponError?<div className='mt-2 text-danger'>{couponError}</div>:null}
         <div className='tp-contact-form-field'>
                        <button type='submit' className='tp-contact-btn' onClick={()=>handleCoupon()}>
                         Apply
                        </button>

                      </div>
      </div>
    </div>
  </div>
</div>
<div className="row justify-content-end">
   <div className="col-md-5 col-sm-5">
    <h4 className='Cart__total'>Cart Total</h4>
    <div className='table-responsive'>
    <table className='table table-bordered'>
      <tbody>
        <tr>
          <td>Subtotal:</td>
          <td>{"₹ "}{TotalPrice}</td>
        </tr>
        <tr>
          <td>Discount:</td>
          <td>{"₹ "}{discount}</td>
        </tr>
        <tr>
          <td>Final Amount: </td>
          <td>{"₹ "}{TotalPrice-discount}</td>
        </tr>
      </tbody>
    </table>
    </div>
   <div className="col-md-5 col-sm-5">
   <div className='tp-contact-form-field'>
                        <button className='tp-contact-btn' onClick={()=>handleCheckout(allCarprod)}>
                          Checkout
                        </button>

                      </div>
   </div>
   </div>

   
</div>
    </div>
    </section>
    {/* <CheckOut data={allCarprod}/> */}
    </>
  )
}

export default CartPage
