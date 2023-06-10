
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Header from './components/header/Header';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import DashBoard from './components/admin/DashBoard';
import Pagenotfound from './components/notFound/Pagenotfound';

import ProductDetail from './components/product/productDetails/ProductDetail';
import Login from './components/user/login/Login';
import Register from './components/user/register/Register'
import { ToastContainer } from 'react-toastify';
import Profile from "./components/user/profile/Profile"
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import PrivateRoute from './components/layout/protectedRoute/PrivateRoute';
import ChangePassword from './components/user/changepassword/ChangePassword';
import UpdateProfile from './components/user/updateprofile/UpdateProfile';
import AllProduct from './components/product/AllProduct';
function App() {
 const dispatch = useDispatch();

 const user =JSON.parse(localStorage.getItem("profile"))
 useEffect(()=>
 {
  dispatch(setUser(user))

 },[dispatch,user]);
 
  return (
  <>
     <BrowserRouter>
     <Header/>
     <ToastContainer position='bottom-right'/>
     <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route  path="/about" element={<About/>}/>
      <Route  path="/contact" element={<Contact/>}/>
      <Route path='/product/details/:id' element={<ProductDetail/>}/>
      <Route  path="/login" element={<Login/>}/>
      <Route  path="/register" element={<Register/>}/>
      <Route  path="/profile" element={<PrivateRoute>
        <Profile/>
      </PrivateRoute>}/>
      <Route exact path="*" element={<Pagenotfound/>}/>
      <Route  path="/admin/dashboard" element={<DashBoard/>}/>
      <Route  path="/changepassword" element={<ChangePassword/>}/>
      <Route  path="/updateprofile" element={<PrivateRoute>
        <UpdateProfile/>
        </PrivateRoute>}/>
        <Route  path="/all/products" element={<AllProduct/>}/>
        <Route  path="/all/products/:keyword" element={<AllProduct/>}/>
     </Routes>
     
     </BrowserRouter>
     
      </>
  );
}

export default App;
