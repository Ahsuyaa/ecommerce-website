import React from 'react';
import CommonPage from '../commonPages/CommonPage';
import AboutImg from "../../images/About.png"
import ServiceCard from '../service/ServiceCard';
import { newData } from '../service/ServiceData';
import MetaData from '../layout/MetaData';
const About = () => {
  return (
    <>
    <MetaData title="about"/>
    <CommonPage title="We are"
     description="that we believe that shopping online should be a hassle-free experience. That's why we have made it our mission to provide you with the best possible shopping experience by offering a wide range of high-quality products at competitive prices. From fashion and accessories to electronics and home appliances, we have something for everyone" 
     btnHome="contact us" homeImg={AboutImg} visit="/contact"/>
     <div className="my-5">
        <h1 className="text-center" style={{ color: "#3498DB" }}>
          Services
        </h1>
      </div>
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="row gy-4">
              {newData.map((curValue, index) => {
                return (
                  <>
                    <ServiceCard
                      key={curValue.id}
                      title={curValue.title}
                      description={curValue.description}
                      cardImg={curValue.cardImg}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>








     
    </>
  )
}

export default About