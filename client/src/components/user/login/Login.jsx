import "./Login.css"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from "react-redux"
import { clearError, login } from "../../../redux/features/authSlice"
import {toast} from "react-toastify"
const initialState=
{
    email:"",
    passsword:""
}

const Login = () => {
    const {loading,error}=useSelector((state)=>state.auth)
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const [loginValue,setLoginValue]=useState(initialState)
    const [loginErrors,setLoginErrors]= useState({})
    let {email,password}=loginValue;
    const handleChange=(e)=>
    {
       let {name,value}=e.target;
       setLoginValue({...loginValue,[name]:value})
    };
    const validateForm=()=>
    {
    let newErrors={}
    if(!email)
    {
      newErrors.email="email is required";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
    {
      newErrors.email="invalid email";
    }
    if(!password)
    {
      newErrors.password="password is  required";
    }
    else if(password.length<8)
    {
      newErrors.password="password must be 8 characters long"; 
    }
    setLoginErrors(newErrors)
    return Object.keys(newErrors).length===0;

    };
    const handleSubmit=(e)=>
    {
        e.preventDefault()
        if(validateForm()){
          if(email&&password)
        {
        dispatch(login({loginValue,navigate,toast}))
        }

        }else{
          return toast.warning("Invalid input")
        }
    }

    useEffect(()=>{
      if(error){
        toast.error(error)
        dispatch(clearError())
      }

    },[dispatch,error])
  return (
    <>
    
    <h2 className="labelname">Login</h2>
    <form className="main" onSubmit={handleSubmit}>
    
    <label>Email</label><br></br>

    <input type="text" placeholder="enter your email" name="email" value={email} onChange={handleChange}/><br></br>
    {loginErrors.email && <span style={{color:'red'}}>{loginErrors.email}</span>}
    <label>password</label><br></br>
    <input type="password" placeholder="enter your password" name="password" value={password} onChange={handleChange}/><br></br>
    {loginErrors.password && <span style={{color:'red'}}>{loginErrors.password}</span>}

    <Link>forgot password</Link><br></br>
    <button type="submit">
      {loading && <Spinner animation="border" size="sm" />}submit
      </button><br></br>
    <label>Don't have an account?</label><Link to="/register">Register</Link>
    </form>
    </>
  )
}

export default Login