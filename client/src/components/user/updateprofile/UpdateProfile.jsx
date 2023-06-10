import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { clearError, profileUpdate } from '../../../redux/features/authSlice';


const UpdateProfile = () => {
    const {loading,error,singleUser}=useSelector((state)=>state.auth);
    const dispatch= useDispatch();
    const navigate=useNavigate();
    const [updateValue,setUpdateValue]=useState({
        fullName:singleUser?.fullName||"",
        email:singleUser?.email||"",
        mobileNo:singleUser?.mobileNo||"",
    });
    const [avatarPreview,setAvatarpreview]=useState(singleUser?.avatar?.url);
    const [avatar,setAvatar]=useState("");

    const {fullName,mobileNo,email} = updateValue;
    const handleInputChange=(e)=>
    {
        console.log(e.target.value)
     let {name,value}=e.target;
     setUpdateValue({...updateValue,[name]:value});
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
    const  handleSubmit=(e)=>
 {
  e.preventDefault()

  
  const updateForm =new FormData();
  updateForm.append("fullName",fullName);
  updateForm.append("mobileNo",mobileNo);
  updateForm.append("email",email);
  updateForm.append("file",avatar);
  dispatch(profileUpdate({updateForm,navigate,toast}))
  
 }
 useEffect(()=>{
    if(error){
        toast.error(error)
        dispatch(clearError())
    }

 },[dispatch,error])
  return (
    <>
    <form onSubmit={handleSubmit}>
    <label>FullName</label><br></br>
    <input type="text" name="fullName" placeholder='enter your name' value={fullName} onChange={handleInputChange}/><br></br>
    <br></br>
    <label>phone number</label><br></br>
    <input type="number" name="mobileNo" placeholder='+977 ' value={mobileNo} onChange={handleInputChange}/><br></br>
    <br></br>
    <label>Email address</label><br></br>
    <input type="text" name="email" placeholder='enter your email' value={email} onChange={handleInputChange} /><br></br>
    <br></br>
    <input type="file" id="imgFile" name="file" accept="image/*" onChange={handleFileInput}  />
    <div>
      <img src={avatarPreview} alt="profile"/>
    </div>
    <button>{loading&&<Spinner animation='border' size="sm"/>}Update profile</button>
    </form>
    </>
   
  )
}

export default UpdateProfile