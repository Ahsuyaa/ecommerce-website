import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearError, register } from '../../../redux/features/authSlice'
import "./Register.css"
const initialState={
  fullName:"",
  mobileNo:"",
  email:"",
  password:"",
  confirmPassword:""
}
const Register = () => {
  const {loading,error}=useSelector((state)=>state.auth)
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const [registerValue,setRegisterValue]=useState(initialState);
  const [registerError,setRegisterError]=useState({});
  const [avatar,setAvatar]=useState("");
  const [avatarPreview,setAvatarpreview]=useState("");
  let {fullName,mobileNo,email,password,confirmPassword}=registerValue;
  const handleInputChange=(e)=>
  {
  let {name,value}=e.target;
  setRegisterValue({...registerValue,[name]:value});
  }

  const handleFileInput=(e)=>
  {
   const file=  e.target.files[0]
   const reader =new FileReader();
   reader.readAsDataURL(file)
   reader.onloadend=()=>
   {
    setAvatarpreview(reader.result);
    setAvatar(file);
   }
  }
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
    if(!fullName)
    {
      newErrors.fullName="fullName is  required";
    }   
    if(!mobileNo)
    {
      newErrors.mobileNo="mobile number is  required";
    }
    else if(mobileNo<10)
    {
      newErrors.mobileNo="mobile number is  invalid";
    }
    if(password!==confirmPassword)
    {
      newErrors.confirmPassword="password doesnot match";
    }
    setRegisterError(newErrors)

    return Object.keys(newErrors).length===0;

    };
 const  handleSubmit=(e)=>
 {
  e.preventDefault()

  if(validateForm())
  {
  const myForm =new FormData();
  myForm.append("fullName",fullName);
  myForm.append("mobileNo",mobileNo);
  myForm.append("email",email);
  myForm.append("password",password);
  myForm.append("confirmPassword",confirmPassword);
  myForm.append("file",avatar);
  dispatch(register({myForm,navigate,toast}))
  }else{
    toast.error("invalid inputs");
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
<h2 className='title'>Register on our SMARTSHOP</h2>
  <form className='main' onSubmit={handleSubmit}>
    <label>FullName</label><br></br>
    <input type="text" name="fullName" placeholder='enter your name' value={fullName} onChange={handleInputChange}/><br></br>
    {registerError&& <span style={{color:"red"}}>{registerError.fullName}</span>}<br></br>
    <label>phone number</label><br></br>
    <input type="number" name="mobileNo" placeholder='+977 ' value={mobileNo}onChange={handleInputChange} /><br></br>
    {registerError&& <span style={{color:"red"}}>{registerError.mobileNo}</span>}<br></br>
    <label>Email address</label><br></br>
    <input type="text" name="email" placeholder='enter your email' value={email} onChange={handleInputChange}/><br></br>
    {registerError&& <span style={{color:"red"}}>{registerError.email}</span>}<br></br>
    <label>File</label><br></br>
    <input type="file" id="imgFile" name="file" accept="image/*"  onChange={handleFileInput}/>
    <div>
      <img src={avatarPreview} alt="profile"/>
    </div>
    <label>password</label><br></br>
    <input type="password" name="password" onChange={handleInputChange} value={password}/><br></br>
    {registerError&& <span style={{color:"red"}}>{registerError.password}</span>}<br></br>
    <label>Confirm Password</label><br></br>
    <input type="password" name="confirmPassword" onChange={handleInputChange} value={confirmPassword}/><br></br>
    {registerError&& <span style={{color:"red"}}>{registerError.confirmPassword}</span>}<br></br>
    <button type="submit">{loading&&<Spinner animation="border" size="sm" />}Register</button><br></br>
    
    <input type="checkbox"  name="terms" value=""></input>
    <label>iI hereby accept all the Terms & Conditions of SMARTSHOP.</label><br></br>
    <label>Already have an account?</label><Link to="/Login">Login</Link>


 
  </form>
  </>
  )
}

export default Register

