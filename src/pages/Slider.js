import React, { useState, useEffect } from 'react'
import ImageSlider from 'react-image-comparison-slider'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import ReactCompareImage from 'react-compare-image'
import '../styles/Slider.css'

import img1 from '../homeImages/social2.svg'
import img2 from '../homeImages/shop.svg'

export default function Slider() {
  const [posx, setPosx] = useState(`${window.innerWidth * 0.5}`)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)


  useEffect(() => {
    window.addEventListener('resize', () => {
      const width = window.innerWidth
      const height = window.innerHeight
      console.log(`width=${width},height=${height}`)
      setWidth(width)
      setHeight(height)
    })
  
    console.log(window.innerHeight)
  }, [])

  function getCursorPosition(e) {
    var posx = 0
    if (!e) var e = window.event
    if (e.pageX) {
      posx =
        e.pageX - document.documentElement.scrollLeft - document.body.scrollLeft
    } else if (e.clientX || e.clientY) {
      posx = e.clientX
    }
    return setPosx(posx)
  }

  const life = (
    <div className="shop">
      <a href="/mall" onClick={() => localStorage.setItem('page', 1)}>
        <Button className="button-shop">SHOP →</Button>
      </a>
    </div>
  )

  const shop = (
    <div className="life">
      <a href="/life" onClick={() => localStorage.setItem('page', 1)}>
        <Button className="button-life">LIFE STYLE →</Button>
      </a>
    </div>
  )

  let display
  if (posx >= width * 0.5) {
    display = life
  } else if (posx <= width * 0.5) {
    display = shop
  }

  return (
    <>
      <div className="Slider">
        <div
          style={{
            width: width
          }}
        >
          <ReactCompareImage
            leftImage={img2}
            rightImage={img1}
            // rightImageLabel="Life Style"
            // leftImageLabel="Shop"
            sliderLineColor="white"
            handle={
              <button
                type="button"
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '48px',
                  color: 'white',
                  display: 'flex',
                  textAlign: 'center',
                }}
              >
                <i
                  class="fas fa-angle-left"
                  style={{
                    margin: '5px',
                    textShadow: '0 0 5px black',
                  }}
                ></i>
                <i
                  class="fas fa-angle-right"
                  style={{
                    margin: '5px',
                    textShadow: '0 0 5px black',
                  }}
                ></i>
              </button>
            }
            onSliderPositionChange={() => {
              getCursorPosition()
            }}
          />
        </div>
        {display}
      </div>
    </>
  )
}
