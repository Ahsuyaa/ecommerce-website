
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import { clearError, singleProduct } from '../../../redux/features/productSlice'
import ReactStars from "react-rating-stars-component"
import "./ProductDetail.css"
import { BsFillCartFill,BsFillCreditCardFill } from "react-icons/bs";
import { addItem } from '../../../redux/features/cartSlice';
import { toast } from 'react-toastify';
import "./ProductDetail.css"
const ProductDetail = () => {

    const {loading,error,product}=useSelector((state)=>state.product)
   
    const dispatch= useDispatch()
    const {id}=useParams()
    const Options1={
      edit:false,
      color:"rgba(20,20,20,0.1",
      activeColor:"#FFD700",
      size:window.innerWidth<600?20:25,
      value:product.ratings,
      isHalf:true
    }

    useEffect(()=>{
    if(error)
    {
      dispatch(clearError())
    }
    if(id)
    {
      dispatch(singleProduct(id))
    }
    },[dispatch,error,id])
  const handleAddToCart=(product)=>
  {
   dispatch(addItem({product}))
   toast.success("product added to cart")
  }
  return (
  <>
 {loading ? (
  <div className='d-flex justify-content-center'>
   <Spinner animation="border" role="status">
   <span className="visually-hidden">Loading...</span>
 </Spinner>
 </div>
 ):(
  <>
  <div className='container'>
        <div className='row'>
          <div className='col-4 mx-auto'>
            <img style={{height:"350px",maxWidth:"300px",marginTop:"20px",transform:"0.2s ease-in-out"}} className='imgtop' src={product.productImg?.url} alt="img"/>
          </div>
          <div className='col-8 mx-auto'>
          <h1>{product.productname}</h1>
        <ReactStars {...Options1}/>
      <hr style={{border:"2px dotted black"}}/>
      <h5 style={{color:"grey"}}>Now: Rs.{product.price}</h5>
      <hr style={{border:"2px dotted black"}}/>
      <h3>Description:</h3>
      <p>{product.description}</p>
      <p style={{color:"#00FA9A", fontSize:"20px", fontWeight:"bold"}}>In Stock</p>
      <p>Quantity:<button  style={{borderRadius:"5px", border:"0.2px solid grey", paddingInline:"5pxx", marginRight:"5px", marginLeft:"5px"}}>-</button>0<button  style={{borderRadius:"5px",marginLeft:"5px", border:"0.2px solid grey", paddingInline:"5pxx"}}>+</button></p>
      <button onClick={()=>handleAddToCart(product)} style={{backgroundColor:"#392A3A", color:"white",marginLeft:"5px",
      paddingLeft:"35px",paddingRight:"35px", marginBottom:"5px",border:"0",
       borderRadius:"10px", padding:"6px",marginRight:"20px"}}><BsFillCartFill
       style={{marginBottom:"5px"}}/> Add to Cart</button>
      <button style={{backgroundColor:"#FFCC00",paddingLeft:"35px",paddingRight:"35px", color:"black", borderRadius:"10px",padding:"6px", border:"0"}}><BsFillCreditCardFill style={{marginBottom:"3px"}}/> Buy Now</button>
          </div>
        </div>
      </div>
  </>
 )}
  </>
  )
}


export default ProductDetail 