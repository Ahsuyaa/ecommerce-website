import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../images/Logo1.png'
import {FaShoppingCart,FaUserAlt,FaCartArrowDown,FaStar, FaChartLine} from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import decode from "jwt-decode"
import { setLogout, setUser } from '../../redux/features/authSlice';
import { toast } from 'react-toastify';
const Header = () => {
  // const {user} = useSelector((state)=>state.auth)
  // const token =user?.token;
  const user = JSON.parse(localStorage.getItem("profile"))
  const items = useSelector((state)=>state.cart)
   const dispatch= useDispatch();
   const navigate= useNavigate()

   if(user?.token)
   {
    const decodedData= decode(user.token)
    if(decodedData.exp * 1000<new Date().getTime())
    {
      dispatch(setLogout())
      navigate("/login");
      toast.warning("session has been expired!login first");
    } else{
      dispatch(setUser(user))
    }
   }
   const handleLogout=()=>
   {
    dispatch(setLogout());
      navigate("/login");
      toast.success("logout successfully");

      localStorage.removeItem("profile")
   }
  return (
   <>
   <Navbar bg="light" expand="lg">
      <Container>
       <div>
        <NavLink to="/">
        <img style ={{width: "200px"}}src={logo} alt="business logo"/>
        </NavLink>
       </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           {user && user ? (
            <>
            <NavLink>
              <img src={user.user?.avatar?.url} style={{width:"30px",height:"30px",borderRadius:"50%",objectFit:"cover"}} alt='profile img'/>
            </NavLink>
            <NavDropdown title={user.user?.fullName} id="basic-nav-dropdown">
              {user&&user.user?.role==="admin"&&(
                <NavDropdown.Item as={NavLink} to="/admin/dashboard">
                <FaChartLine/>
                admin dashboard
                </NavDropdown.Item>
              )}
              <NavDropdown.Item to="/profile" as={NavLink}> <FaUserAlt/>profile</NavDropdown.Item>
              <NavDropdown.Item>
                <FaCartArrowDown/>
                My Orders
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink}> <FaStar/>My reviews</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
              
               logout
              </NavDropdown.Item>
          
            </NavDropdown>
            </>
           ):(
            <>  
            <NavLink to="/login"
              className="btn btn-primary me-2"
              style={{
                borderRadius:"20px"
              }}
              >
                login
              </NavLink> </>
           )}
    <NavLink style={{color:"grey"}} to="/cart" className="d-flex align-items-center">
            <FaShoppingCart size={20}/>
            <span className='ms-auto badge rounded-pill bg-warning text-dark' style={{position:"absolute",top:0}}>
             {items.length}
            </span>
             </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  )
}

export default Header