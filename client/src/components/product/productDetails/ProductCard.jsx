import React from 'react'
import  Card from 'react-bootstrap/Card'
import "./ProductCard.css"
import ReactStars from "react-rating-stars-component"
import { Link } from 'react-router-dom'
const ProductCard = ({product}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "#FFD707",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
      };
  return (
  <>
  <div className="col-md-3 col-10 mx-auto">
        <Card >
       <Link to={`/product/details/${product._id}`} style={{textDecoration:"none",color:"black"}}>
       <Card.Img style={{height:"200px",objectFit:"cover" ,transition:"transform 0.2s ease-in-out"}} variant="top" src={product.productImg?.url} alt="productImg" className='card-img-top' />
          <Card.Body>
            <Card.Title className='text-center'>{product.productName}</Card.Title>
            <Card.Text className='text-center'>Rs.{product.price}</Card.Text>
            <div className="d-flex justify-content-center">
                <ReactStars {...options} />
              </div>
          </Card.Body>
       </Link>
        </Card>
</div>
  </>
  )
}

export default ProductCard