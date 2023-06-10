import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { NavLink } from 'react-router-dom'

import './Footer.css'
const Footer = () => {
  return (
<>
<section className='contact-short'>
  <div className='grid grid-two-column'>
    <h3>Ready to get started</h3>
    <h3>Talk to us today</h3>
 
    <NavLink to="Home">
      <Button>Get Back</Button>
    </NavLink>
  </div>
</section>

</>

  )
}

export default Footer