import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { clearError, passwordUpdate } from '../../../redux/features/authSlice';
import "./ChangePassword.css"

const initialState ={
  olPassword:"",
  newPassword:"",
  confirmPassword:""
}
const ChangePassword = () => {
  const {loading,error}=useSelector((state)=>state.auth);
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const [updateValue,setUpdateValue]=useState(initialState);
  const [changeErrors,setChangeErrors]= useState({})
const {oldPassword,newPassword,confirmPassword} = updateValue;

const handleInputChange=(e)=>
{
    console.log(e.target.value)
 let {name,value}=e.target;
 setUpdateValue({...updateValue,[name]:value});
}
const validateForm=()=>
    {
    let newErrors={}
    if(!oldPassword)
    {
      newErrors.oldPassword="oldpassword is required";
    }
    else if(oldPassword<8)
    {
      newErrors.oldPassword="length of passsword is weak";
    }
    if(!newPassword)
    {
      newErrors.newPassword=" new password is  required";
    }
    else if(newPassword.length<8)
    {
      newErrors.newPassword="password must be 8 characters long"; 
    }
    if(!confirmPassword)
    {
      newErrors.confirmPassword=" confirm your password";
    }
    else if(confirmPassword.length<8)
    {
      newErrors.ConfirmPassword="password must be 8 characters long"; 
    }
    setChangeErrors(newErrors)
    return Object.keys(newErrors).length===0;

    };
const  handleSubmit=(e)=>
{
 e.preventDefault()
 if(validateForm()){
  if(oldPassword&&newPassword&&confirmPassword)
{
  dispatch(passwordUpdate({updateValue,navigate,toast}))
}

}else{
  return toast.error ("Invalid input")
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
    <form className='pwdForm' onSubmit={handleSubmit}>
        <label>Old Password</label><br></br>
        <input type="password" placeholder='enter your old password' name="oldPassword" value={oldPassword} onChange={handleInputChange}/><br></br>
        {changeErrors && <span style={{color:'red'}}>{changeErrors.oldPassword}</span>}
        <label>New Password</label><br></br>
        <input type="password" placeholder='enter your new password'name="newPassword" value={newPassword} onChange={handleInputChange}/><br></br>
        {changeErrors && <span style={{color:'red'}}>{changeErrors.newPassword}</span>}
        <label>Confirm Password</label><br></br>
        <input type="password" placeholder='confirm new password' name="confirmPassword" value={confirmPassword} onChange={handleInputChange}/><br></br>
        {changeErrors && <span style={{color:'red'}}>{changeErrors.confirmPassword}</span>}
        <button type='submit' >{loading && <Spinner animation="border" size='sm' />}submit</button>
    </form> 
    </>
  )
}

export default ChangePassword