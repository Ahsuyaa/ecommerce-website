import React from 'react'
import img from "../../images/contact.png"
import MetaData from '../layout/MetaData';
import "./Contact.css";

const Contact = () => {
  return (
    <>
        <MetaData title="contacts"/>
   <div className="my-3">
        <h1 className="text-center" style={{ color: "#3498DB" }}>
          Find Us
        </h1>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="form-container">
            <input type="text" placeholder="Name" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
            <textarea
              placeholder="Message"
              className="form-textarea"
            ></textarea>
            <button type="submit" className="form-submit">
              Send Message
            </button>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <img src={img} alt="contactUs Img" className="contact-img" />
        </div>
        <div className="map-container">
        <iframe 
        title='myframe'
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14133.189959106468!2d85.33556682267596!3d27.677198877424555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f2804a02bf%3A0x85468199859b2d8d!2sKoteshwor%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1678009145200!5m2!1sen!2snp"
         width="600" height="450" style={{border:0}} allowFullScreen=""
         loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </>
  )
}

export default Contact

