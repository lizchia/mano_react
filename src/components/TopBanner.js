import React, { useState, useEffect } from 'react'
import AOS from 'aos'
import '../styles/aos-master/dist/aos.css'

function TopBanner(props) {
    AOS.init()

    const{imageUrl,h1Title,pageDesciption}=props
    return(
        <>
        <div className="d-flex flex-column flex-wrap justify-content-center align-items-center" >
        <img className="w-100" src={`${imageUrl}`}></img>
        <h1 style={{fontSize:'42px',margin:'20px auto'}} data-aos="fade-up"
                  data-aos-duration="800">{h1Title}</h1>
        <p style={{fontSize:'18px',height:'96px'}} className="text-muted text-center" data-aos="fade-up"
                  data-aos-duration="800">{pageDesciption}</p>
      </div>
        </>
    )
}
export default TopBanner