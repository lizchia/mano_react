import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Form, FormControl, Button, Image } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'

import { connect } from "react-redux";
import { selectCartHidden } from "../redux/cart/cartSelector";
import { toggleCartHidden } from "../redux/cart/cartAction";
import CartToggle from "./Cart/CartToggle"


import { MdShoppingCart } from 'react-icons/md'
import { GoHeart } from "react-icons/go"
import "../styles/nav.scss"
 
function MyNavbar(props) {
  const [centerShow, setCenterShow] = useState(false)
  const [lifeShow, setLifeShow] = useState(false)



  const member = JSON.parse(localStorage.getItem('member')) || [{ memberName: '' }]

  const pathlist = [
    "/login",
    "/about",
    "/membercenter",
    "/404",
    "/life",
    "/mall"
  ]
  const themenames = [
    "dark",
    "dark",
    "dark",
    "dark",
    "light",
    "light",
    "light",
  ]


  // 先找出對應的主題
  let locationPathname = props.location.pathname
  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes("/login")) locationPathname = "/login"
  if (locationPathname.includes("/register")) locationPathname = "/login"
  if (locationPathname.includes("/welcome")) locationPathname = "/login"
  if (locationPathname.includes("/forgetpwd")) locationPathname = "/login"
  if (locationPathname.includes("/about")) locationPathname = "/about"
  if (locationPathname.includes("/membercenter")) locationPathname = "/membercenter"
  if (locationPathname.includes("/coupon")) locationPathname = "/membercenter"

  if (locationPathname.includes("/mall")) locationPathname = "/mall"
  if (locationPathname.includes("/life")) locationPathname = "/life"

  
  const index = pathlist.findIndex((v) => v === locationPathname)

  const newNav = (
    <>
    <Navbar variant={themenames[index]} className="d-flex justify-content-between" style={{fontSize: "12px"}}>

        <Navbar.Brand href="/" className="w-25">
          <img src={locationPathname === "/membercenter" ? "/mano_logo_light-01.svg" :
                  "/mano_logo_dark-01.svg"} alt="mano" style={{height: "30px"}}/>
        </Navbar.Brand>
        
        <div>
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/mall" exact>
              商城首頁
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/mall/shop"
              onClick={() => localStorage.setItem('page', 1)}
            >
              產品列表
            </Nav.Link>
            <Nav.Link as={NavLink} to="/life" style={{position:"relative"}}
            onMouseEnter={()=> setLifeShow(true)} onMouseLeave={()=> setLifeShow(false)} onClick={()=> setLifeShow(false)}>
              抹茶新生活
              {lifeShow ? (             
                 <div className="d-flex justify-content-center nav-show-box" style={{position:"absolute",
                    width: "185px", left: "0", top: "0", border: "1px solid #cccccc",
                    background: "#ffffff", borderRadius: "1px", lineHeight: "12px", zIndex: "100", transform: "translate(-55px, 30px)"}}>
                  <Nav.Link as={NavLink} to="/life/course" onClick={()=> {
                    setLifeShow(false)
                    localStorage.setItem('page', 1)}}>
                    <img src="/hover_list/hover_list-01.svg" alt="課程報名"/>
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/life/map" onClick={()=> setLifeShow(false)}>
                    <img src="/hover_list/hover_list-02.svg" alt="抹茶地圖" />
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/life/story" onClick={()=> setLifeShow(false)}>
                    <img src="/hover_list/hover_list-03.svg" alt="故事牆"/>
                  </Nav.Link>
                </div>
                ) : ""}

            </Nav.Link>
            <Nav.Link as={NavLink} to="/mall/faq">
              常見問題
            </Nav.Link>
            <Nav.Link as={NavLink} to="/mall/about">
              關於我們
            </Nav.Link>
          </Nav>
        </div>

        <Nav className="w-25 d-flex justify-content-end">
          <Form inline>

          {member[0].memberName !== '' ? (
            <>
          {locationPathname === "/membercenter" ? (
            <span style={{color: "#ffffff",opacity: "0.7"}} className="mr-2">{member[0].memberName} , 您好</span>
          ):(
            <span style={{color: "#5C6447",opacity: "0.7"}} className="mr-2">{member[0].memberName} , 您好</span>
          )}
            <Nav.Link as={NavLink} to="/mall/membercenter" 
              style={{width: "32px", position: "relative"}} 
              onMouseEnter={()=> setCenterShow(true)} onMouseLeave={()=> setCenterShow(false)} onClick={()=> setCenterShow(false)}>
              <Image
                    style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                    src={`http://localhost:3002/img-uploads/${member[0].memberImg}`}
                    alt={member[0].memberImg}
                  />
                  {centerShow ? ( 
                  <div className="d-flex justify-content-center nav-show-box" style={{position:"absolute",
                      width: "100px", left: "-40px", top: "35px", border: "1px solid #cccccc",
                      background: "#ffffff", borderRadius: "1px", lineHeight: "11px", zIndex: "100"}}>
                  <Nav.Link as={NavLink} to="/mall/membercenter" style={{width: "44px"}} onClick={()=> setCenterShow(false)}>
                    <img src="/hover_list/hover_list-04.svg" alt="會員中心"/>
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/mall/welcome" style={{width: "44px"}} onClick={()=> setCenterShow(false)}>
                    <img src="/hover_list/hover_list-05.svg" alt="登出"/>
                  </Nav.Link>
                  </div>
                    ) : ""}
            </Nav.Link>
            </> ) : (
              <Nav.Link as={NavLink} to="/mall/login" style={{width: "44px"}}>
                    登入
              </Nav.Link>

            )}


            <Nav.Link style={{width: "32px" }} onClick={()=> props.toggleCartHidden()}>
                    {locationPathname === "/membercenter" ? (
                      <MdShoppingCart className="cWhite hover-op" style={{fontSize: "24px" }} /> 
                    ) : (
                      <MdShoppingCart className="cGreen hover-op" style={{fontSize: "24px" }} />
                    )}
            </Nav.Link>
            {props.hidden ? "" : (<CartToggle />)}
            <Nav.Link className="mr-2" as={NavLink} to={member[0].memberName !== '' ? "/mall/ItemTracking" : "/mall/login"}>
            {locationPathname === "/membercenter" ? (
              <GoHeart className="cWhite hover-op" style={{fontSize: "24px" }} />
            ):(
              <GoHeart className="cGreen hover-op" style={{fontSize: "24px" }} />
            )}
            </Nav.Link>  
        </Form>
        </Nav>
        
      </Navbar>
      
    </>
  )


  const lifeNav = (
    <>
    <Navbar variant={themenames[index]} className="d-flex justify-content-between" style={{fontSize: "12px"}}>
        <Navbar.Brand href="/" className="w-25">
          <img src={locationPathname === "/membercenter" ? "/mano_logo_light-01.svg" :
                  "/mano_logo_dark-01.svg"} alt="mano" style={{height: "30px"}}/>
        </Navbar.Brand>

        <div>
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/life" style={{position:"relative"}}
            onMouseEnter={()=> setLifeShow(true)} onMouseLeave={()=> setLifeShow(false)} onClick={()=> setLifeShow(false)}>
              抹茶新生活
              {lifeShow ? (             
                 <div className="d-flex justify-content-center nav-show-box" style={{position:"absolute",
                    width: "185px", left: "-55px", top: "32px", border: "1px solid #cccccc",
                    background: "#ffffff", borderRadius: "1px", lineHeight: "12px", zIndex: "100"}}>
                  <Nav.Link as={NavLink} to="/life/course" onClick={()=> {
                    setLifeShow(false)
                    localStorage.setItem('page', 1)}}>
                    <img src="/hover_list/hover_list-01.svg" alt="課程報名"/>
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/life/map" onClick={()=> setLifeShow(false)}>
                    <img src="/hover_list/hover_list-02.svg" alt="抹茶地圖" />
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/life/story" onClick={()=> setLifeShow(false)}>
                    <img src="/hover_list/hover_list-03.svg" alt="故事牆"/>
                  </Nav.Link>
                </div>
                ) : ""}

            </Nav.Link>
            <Nav.Link as={NavLink} to="/mall" exact onClick={() => localStorage.setItem('page', 1)}>
              抹茶商城
            </Nav.Link>
            <Nav.Link as={NavLink} to="/life/faq">
              常見問題
            </Nav.Link>
            <Nav.Link as={NavLink} to="/life/about">
              關於我們
            </Nav.Link>
          </Nav>
        </div>

        <Nav className="w-25 d-flex justify-content-end">
          <Form inline>

          {member[0].memberName !== '' ? (
            <>
          {locationPathname === "/membercenter" ? (
            <span style={{color: "#ffffff",opacity: "0.7"}} className="mr-2">{member[0].memberName} , 您好</span>
          ):(
            <span style={{color: "#5C6447",opacity: "0.7"}} className="mr-2">{member[0].memberName} , 您好</span>
          )}
            <Nav.Link as={NavLink} to="/life/membercenter" 
              style={{width: "32px", position: "relative"}} 
              onMouseEnter={()=> setCenterShow(true)} onMouseLeave={()=> setCenterShow(false)} onClick={()=> setCenterShow(false)}>
              <Image
                    style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                    src={`http://localhost:3002/img-uploads/${member[0].memberImg}`}
                    alt={member[0].memberImg}
                  />
                  {centerShow ? ( 
                  <div className="d-flex justify-content-center nav-show-box" style={{position:"absolute",
                      width: "100px", left: "-40px", top: "35px", border: "1px solid #cccccc",
                      background: "#ffffff", borderRadius: "1px", lineHeight: "11px", zIndex: "100"}}>
                  <Nav.Link as={NavLink} to="/life/membercenter" style={{width: "44px"}} onClick={()=> setCenterShow(false)}>
                    <img src="/hover_list/hover_list-04.svg" alt="會員中心"/>
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/life/welcome" style={{width: "44px"}} onClick={()=> setCenterShow(false)}>
                    <img src="/hover_list/hover_list-05.svg" alt="登出"/>
                  </Nav.Link>
                  </div>
                    ) : ""}
            </Nav.Link>
            </> ) : (
              <Nav.Link as={NavLink} to="/life/login" style={{width: "44px"}}>
                    登入
              </Nav.Link>

            )}


            <Nav.Link style={{width: "32px" }} onClick={()=> props.toggleCartHidden()}>
                    {locationPathname === "/membercenter" ? (
                      <MdShoppingCart className="cWhite hover-op" style={{fontSize: "24px" }} />
                    ) : (
                      <MdShoppingCart className="cGreen hover-op" style={{fontSize: "24px" }} />
                    )}
            </Nav.Link>
            {props.hidden ? "" : (<CartToggle />)}
            <Nav.Link as={NavLink} to={member[0].memberName !== '' ? "/mall/ItemTracking" : "/mall/login"}>
            {locationPathname === "/membercenter" ? (
              <GoHeart className="cWhite hover-op" style={{fontSize: "24px" }} />
            ):(
              <GoHeart className="cGreen hover-op" style={{fontSize: "24px" }} />
            )}
            </Nav.Link>  
        </Form>
        </Nav>
      </Navbar>

    </>
  )

  const cartNav = (
    <>
      {props.history.location.pathname.includes("/mall") ? (
        <>
        {newNav}
        </>
      ) : (
        <>
        {lifeNav}
        </>
      )}
      <Navbar variant={themenames[index]} className="mt-5">
        <Nav className="cartNav text-center justify-content-center align-items-center">
          <Nav.Link
            as={NavLink}
            to={props.history.location.pathname.includes("/mall") ? "/mall/cart" : "/life/cart"}
            className={ props.history.location.pathname === "/mall/cart" || props.history.location.pathname === "/life/cart" ? "w-25 cartNav-list cartNav-active" : "w-25 cartNav-list"}
            disabled
            exact
          >
            購物車
          </Nav.Link>
          <Nav.Link as={NavLink} 
          className={ props.history.location.pathname === "/mall/cart/comfirm" || props.history.location.pathname === "/life/cart/comfirm" ? "w-25 cartNav-list cartNav-active" : "w-25 cartNav-list"}
          to={props.history.location.pathname.includes("/mall") ? "/mall/cart/comfirm" : "/life/cart/comfirm"} disabled>
            確認訂單
          </Nav.Link>
          <Nav.Link as={NavLink} 
          className={ props.history.location.pathname === "/mall/cart/payment" || props.history.location.pathname === "/life/cart/payment" ? "w-25 cartNav-list cartNav-active" : "w-25 cartNav-list"}
          to={props.history.location.pathname.includes("/mall") ? "/mall/cart/payment" : "/life/cart/payment"} disabled>
            付款
          </Nav.Link>
          <Nav.Link as={NavLink} 
          className={ props.history.location.pathname === "/mall/cart/complete" || props.history.location.pathname === "/life/cart/complete" ? "w-25 cartNav-active" : "w-25"}
          to={props.history.location.pathname.includes("/mall") ? "/mall/cart/complete" : "/life/cart/complete"} disabled>
            完成訂單
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  )

  let displayNav
  let path = props.history.location.pathname

  if (path.includes("/change")) path = "/change"
  if (path.includes("/cart")) path = "/cart"
  if (path.includes("/mall")) path = "/mall"
  if (path.includes("/life")) path = "/life" 

  if (
    path === '/cart'
  )
    displayNav = cartNav
  else if (
    path === '/change' ||
    path === '/' 
  )
    displayNav = ''
  else if (
    path === '/life'
  )

   displayNav = lifeNav
  else displayNav = newNav

  return <>{displayNav}</>
}

const mapStateToProps = state => ({
  hidden: selectCartHidden(state)

});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyNavbar));
