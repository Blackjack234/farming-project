import React, { useEffect, useState } from 'react'
import { Nav, Navbar, Container, NavDropdown ,Badge} from "react-bootstrap"
import { GoSignIn } from "react-icons/go";
import { ImProfile } from "react-icons/im"
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert2"
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from "react-router-dom"
import "./navcss.css"
// const mytooltip =() => {
//   <Tooltip className="custom-tooltip">
//     Sign up
//   </Tooltip>
//   }
const Navbarhead = () => {
  let token = window.sessionStorage.getItem("token");
  // let cartdata = window.sessionStorage.getItem("cart")
  // let [cartlength,setcartLength]=useState(cartdata.length)
  let [cartLength, setCartLength] = useState(0);
  // console.log("cart data in nav ",cartdata);
  let navi = useNavigate();
  useEffect(()=>{
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCartLength(cart.length);
  },[])
  let handleLogout = () => {
    if(token){
   
       window.sessionStorage.clear();
        navi("/")
           swal.fire({
        icon:"success",
        title:"Success...!",
        text:"Logout successful",
        confirmButtonColor:"#31512a",
        timer:4000
      })
   
    }
   
  }
  return (
    <Navbar className='nav-menu' expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"}>
          <figure className='logofigure'>
            <img src="../../../../assate/logo/farming_logo_3.png" className="logoimg" alt="" />
          </figure>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className='nav-list1'>
          <Nav className="fw-solid  nav-menu-list">
            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
            <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
            <Nav.Link as={Link} to={"/contact"}>Contact</Nav.Link>
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="/product/seed">Seeds</NavDropdown.Item>
              <NavDropdown.Item href="/product/fungicides">
                Fungicides
              </NavDropdown.Item>
              <NavDropdown.Item href="/product/insecticide">Insecticide</NavDropdown.Item>
            </NavDropdown>
           
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className=' nav__bar__collaps'>
              <Navbar.Text>
                {
                  !token ? <>
                  <Link to={'/regform'}>
                  {/* <i class="fa-solid fa-right-to-bracket" style={{color:"#e6eee3",fontSize:"30px"}} title='Sign up'></i> */}
                  <GoSignIn className='sign-svg' title='SignUp/SignIn' aria-label='Signup/SignIn'/>
                </Link>
                </>
                  :

                    <Link to={'/profile'}>
                      {/* <i class="fa-solid fa-right-to-bracket" style={{color:"#e6eee3",fontSize:"30px"}} title='Sign up'></i> */}
                      <ImProfile className='sign-svg' title='My profile' aria-label='my profile' />
                    </Link>

                }


              </Navbar.Text>
              <Navbar.Text>
                {
                  !token ? <>
                      <Nav.Link as={Link} to={"/login"}>LogIn</Nav.Link>
                                       
                  </>:
                  <>
                      <Nav.Link as={Link}  onClick={handleLogout}>Logout</Nav.Link>                  
                       
                     
                      </>
                }


              </Navbar.Text>{"  "}
{
  token&&
  <Navbar.Text>
      <Nav.Link as={Link} to={"/cart"} title=' my cart' className='cartIcon'><i className="fa-solid fa-cart-shopping fa-xl"> </i></Nav.Link> 
        <Badge bg="secondary" className='cartBadge'>{cartLength}</Badge>
              </Navbar.Text>
}
              
            </Navbar.Collapse>
      </Container>
    </Navbar>


  )
}

export default Navbarhead