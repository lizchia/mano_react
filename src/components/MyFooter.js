import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'

function MyFooter(props) {
  useEffect(() => {
    console.log(props.history)
  }, [])
  //document.body.style.background ='#5C6447'
  const cssSocial = props.history.location.pathname.includes('/membercenter')
    ? {
        lineHeight: 'center',
        borderTop: '1px solid #929684',
        borderBottom: '1px solid #929684',
      }
    : {
        // height: '100px',
        lineHeight: 'center',
        borderTop: '1px solid #5C6447',
        borderBottom: '1px solid #5C6447',
      }
  const cssSvg = props.history.location.pathname.includes('/membercenter')
    ? {
        fontSize: '20pt',
        margin: '10px',
        color: '#929684',
      }
    : {
        fontSize: '20pt',
        margin: '10px',
        color: '#5C6447',
      }
  const cssImg = {
    transform: '90',
  }
  const showTextColor = props.history.location.pathname.includes(
    '/membercenter'
  )
    ? {
        color: '#929684',
      }
    : {
        color: '#5C6447',
      }
  const bgchangecolor = props.history.location.pathname.includes(
    '/membercenter'
  )
    ? 'footer-dark'
    : 'footer'
  const footer = (
    <>
      <footer className={` mt-auto py-3 text-center ${bgchangecolor}`}>
        <div className="container mb-2">
          {/* <h3> 最新活動 </h3>
          <div className="d-flex row" style={{ backgroundColor: '#D4AE5C' }}>
            <img
              className="col-8"
              style={cssImg}
              src="/picture/CS001.jpg"
            ></img>
            <div className="col-4 align-self-center">
              <h5 style={{ color: '#FFFFFF' }}>從抹茶製作過程，</h5>
              <h5 style={{ color: '#FFFFFF' }}>投入其中，</h5>
              <h5 style={{ color: '#FFFFFF' }}>精進技藝，反覆練習</h5>
              <h5 style={{ color: '#FFFFFF' }}>屬於大人的手作課程</h5>
              <Button variant="outline-light">給自己的練習課</Button>
            </div>
          </div> */}
          {/* <div style={{ marginTop: '10px' }}></div> */}
          {/* <h5>抹の</h5> */}
          <div className="d-flex row" style={cssSocial}>
            <div className="col-lg align-self-center">
              <a
                style={showTextColor}
                href={
                  props.history.location.pathname.includes('/mall')
                    ? '/mall/about'
                    : '/life/about'
                }
              >
                About us
              </a>
              <br />
              <a
                style={showTextColor}
                href={
                  props.history.location.pathname.includes('/mall')
                    ? '/mall/faq'
                    : '/life/faq'
                }
              >
                FAQ
              </a>
              <br />
              <a
                style={showTextColor}
                href={
                  props.history.location.pathname.includes('/mall')
                    ? '/mall/membercenter'
                    : '/life/membercenter'
                }
              >
                Member Center
              </a>
            </div>
            <div className="col-lg align-self-center justify-content-between">
              <a>
                <i style={cssSvg} className="fab fa-facebook-square"></i>
              </a>
              <a>
                <i style={cssSvg} className="fab fa-instagram"></i>
              </a>
              <a>
                <i style={cssSvg} className="fab fa-line"></i>
              </a>
            </div>
            <div className="col-lg align-self-center">
              <a style={showTextColor} href="/mall">
                Shop
              </a>
              <br />
              <a style={showTextColor} href="/life">
                Life Style
              </a>
              <br />
              <a style={showTextColor} href="http://localhost:3000/#fourthPage">
                Contact Us
              </a>
            </div>
          </div>
          <span
            className=""
            style={Object.assign({ fontSize: '10pt' }, showTextColor)}
          >
            2020 © MANO copyright &nbsp;&nbsp; 歡迎致電 : (02)6618-1818
          </span>
        </div>
      </footer>
    </>
  )

  const path = props.history.location.pathname
  let displayFooter

  if (
    path === '/mall/login' ||
    path === '/mall/welcome' ||
    path === '/mall/register' ||
    path === '/mall/forgetpwd' ||
    path === '/' ||
    path === '/life/welcome' ||
    path === '/life/register' ||
    path === '/life/forgetpwd' ||
    path === '/life/login'
  )
    displayFooter = ''
  else displayFooter = footer

  return <>{displayFooter}</>
}

export default withRouter(MyFooter)