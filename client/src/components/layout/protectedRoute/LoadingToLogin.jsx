import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const LoadingToLogin = () => {
    const [count,setCount]=useState(5);
    const navigate= useNavigate()
    useEffect(()=>
    {
        const interval =setInterval(()=>
      
        {
        setCount((prevCount)=>--prevCount)
        },1000)
        count===0 && navigate("/login")
        return()=>
        {
            clearInterval(interval);
        };
    },[count,navigate]);

    
  return (
   <>
   <div className='d-flex justify-content-center'></div>
   <h2 style={{color:"red"}}>you are not authenticated</h2>
   <p>REdirect you in {count} seconds</p>
   </>
  )
}

export default LoadingToLogin