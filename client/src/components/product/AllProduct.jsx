import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearError, getAllProducts } from '../../redux/features/productSlice'
import ProductCard from './productDetails/ProductCard'
import Search from './productDetails/Search'

const AllProduct = () => {
    const {keyword} = useParams()
    const {loading,error,products}=useSelector((state)=>state.product)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getAllProducts(keyword))

    },[dispatch,keyword])
    useEffect(()=>
 {
 if(error)
 {
  dispatch(clearError())
 }
 dispatch(getAllProducts())
 },[dispatch,error])
  return (
   <>
   <Search/>
  <div className='container-fluid mb-4' >
      <div className='row'> 
        <div className='col-10 mx-auto'>
          <div className="row gy-4">
          
          {loading?(
           <div  className='d-flex justify-content-center'>
             <Spinner animation="border" role="status" >
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

export default AllProduct