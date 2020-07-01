import React, { useState, useEffect } from 'react'
import Courses from '../../components/courses/Courses'
import CsCategoryBar from '../../components/CsCategoryBar'

import './courseList-style.scss'

import bgSvg from '../../components/bg-pattern.svg'
import LeftBg from '../../components/courses/LeftBg'

function CourseList(props) {

  const [width, setWidth] = useState(window.innerWidth)
  useEffect(()=> {
    props.changeBackgroundColorLight()
    window.addEventListener('resize', () => {
      let width = window.innerWidth
      setWidth(width)
    })
  },[])
  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )
 

  



  const display = (
    <>
      {/* <img className="bgSvg" src={bgSvg} alt="bgLogo"></img> */}
      <div style={{ backgroundImage: `url(${bgSvg})`}} className="bgSvg">
        <LeftBg />
      </div>
      
      <div className="d-flex align-items-start product-list">

       {width <= 900 ? '' : <CsCategoryBar />}
        <Courses />
      </div> 
    </>
  )

  return (
    <>
      <div className="container">{display}</div>
    </>
  )
}

export default CourseList