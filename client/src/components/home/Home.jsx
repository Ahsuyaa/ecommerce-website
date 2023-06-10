import React,{useEffect} from 'react';
import CommonPage from '../commonPages/CommonPage';
import HomeImg from "../../images/home.png"
import MetaData from '../layout/MetaData';
import "./Home.css";
import Spinner from 'react-bootstrap/Spinner';
import ProductCard from '../product/productDetails/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getAllProducts } from '../../redux/features/productSlice';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// import ProductCard from '../product/ProductCard';

const Home=()=>
{
 const {loading,error,products}=useSelector((state)=>state.product)
 const dispatch = useDispatch()
 useEffect(()=>
 {
 if(error)
 {
  dispatch(clearError())
 }
 dispatch(getAllProducts())
 },[dispatch,error])
  return(
    <>
   <MetaData title="smart shop"/>
   <CommonPage title="welcome to our " description="SMART Shop is the the fastest,easiest and most convenient
                    way to enjoy the best food of your favourite restaurants at
                    home, at the office or wherever you want to. We know that
                    your time is valuable and sometimes every minute in the day
                    counts. That's why we deliver! So you can spend more time
                    doing the things you love." btnHome="Get more info" homeImg={HomeImg}
                    visit="/about"/>
  
    <div className='container-fluid mb-4' >
      <div className='row'>
        <div className='col-10 mx-auto'>
          <div className="row gy-4">
          <div className='d-flex justify-content-between align-items-center w-100'>
            <h2 className='productHeader'>Top picks</h2>
            <Link to="/all/products">
            <button style={{background:"#103755",color:"white"}}>show more</button>
            </Link>
            </div>
          {loading?(
           <div  className='d-flex justify-content-center'>
             <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
           </div>
          ):(
              <>
              {products && products.map((product)=>{
                return(
                  <>
                  <ProductCard  key={product._id} product={product}/>
                  </>
                )
                })}
              </>
          )}
          </div>
        </div>
      </div>
    </div>
    </>
   
  )
}

export default Home

