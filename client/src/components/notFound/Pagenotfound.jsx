import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import NotFound from "../../images/notfound.png";
import Button from 'react-bootstrap/esm/Button';
const Pagenotfound = () => {
    const myStyle={
        display:"flex",
        justifyContent:"center"
    }
  return (
    <>

    <Link>
    <img  src={NotFound} alt="notfound"/>
  </Link>
  <Link to ="/">
  <Button  variant="primary">Back</Button>
  </Link>
  </>
  )
}

export default Pagenotfound