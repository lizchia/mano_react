import React, { useState, useEffect } from "react";
import BurderBar from "./burgerBar";
import { Navbar, Nav, Form, FormControl, Button, Image } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'

import { MdShoppingCart } from 'react-icons/md'
import { GoHeart } from "react-icons/go"

import "../styles/nav.scss";


function SmallNav (props) {

    const member = JSON.parse(localStorage.getItem('member')) || [{ memberName: '' }]
    let locationPathname = props.location.pathname
    if (locationPathname.includes("/membercenter")) locationPathname = "/membercenter"

    const smallNav = (
        <>
        <BurderBar />
        <Navbar className="d-flex" style={{fontSize: "14px", paddingRight:"0"}}>

            <Navbar.Brand className="ml-3 w-50 d-flex justify-content-end" style={{marginRight: "0"}}>
            <img src={locationPathname === "/membercenter" ? "/mano_logo_light-01.svg" :
                    "/mano_logo_dark-01.svg"} alt="mano" style={{height: "30px", cursor: "pointer"}} onClick={()=> props.history.push("/")}/>
            </Navbar.Brand>

         <Nav className="d-flex justify-content-end w-50">
          <Form inline>

          {member[0].memberName !== '' ? (
            <>
            <Nav.Link as={NavLink} to={locationPathname.includes("/mall") ? "/mall/membercenter" : "/life/membercenter"} 
              style={{width: "32px", position: "relative"}} >
              <Image
                    style={{ width: "20px", height: "20px", borderRadius: "50%" }}
                    src={`http://localhost:3002/img-uploads/${member[0].memberImg}`}
                    alt={member[0].memberImg}
                  />
            </Nav.Link>
            </> ) : (
              <Nav.Link as={NavLink} to={locationPathname.includes("/mall") ? "/mall/login" : "/life/login"} 
                                    style={{width: "44px"}}>
                    登入
              </Nav.Link>

            )}


            <Nav.Link as={NavLink} to={locationPathname.includes("/mall") ? "/mall/cart" : "/life/cart"} style={{width: "32px" }}>
                    {locationPathname === "/membercenter" ? (
                      <MdShoppingCart className="cWhite hover-op" style={{fontSize: "24px" }} />
                    ) : (
                      <MdShoppingCart className="cGreen hover-op" style={{fontSize: "24px" }} />
                    )}
            </Nav.Link>
            <Nav.Link className="mr-2" as={NavLink} to="/mall/ItemTracking" style={{paddingRight: "0" }}>
            {locationPathname === "/membercenter" ? (
              <GoHeart className="cWhite hover-op" style={{fontSize: "24px" }} />
            ):(
              <GoHeart className="cGreen hover-op" style={{fontSize: "24px" }} />
            )}
            </Nav.Link>  
            {member[0].memberName !== '' ? (
                <>
                {locationPathname === "/membercenter" ? (
                    <Nav.Link className="hover-op" as={NavLink} to={locationPathname.includes("/mall") ? "/mall/welcome" : "/life/welcome"} style={{width: "42px", paddingLeft: "0", paddingRight: "0", fontWeight: "400", opacity: "0.7", color: "#FFFFFF" }}>
                        登出
                    </Nav.Link>
                ) : (
                    <>
                <Nav.Link className="hover-op" as={NavLink} to={locationPathname.includes("/mall") ? "/mall/welcome" : "/life/welcome"} style={{width: "42px", paddingLeft: "0", paddingRight: "0", fontWeight: "600", opacity: "0.7"}}>
                        登出
                </Nav.Link>
                </>
                )}
                </>
            ) : "" }
        </Form>
        </Nav>       
      </Navbar>
        </>
    )

    let displayNav
    let path = props.history.location.pathname
  
    if (path.includes("/change")) path = "/change"
    if (path.includes("/cart")) path = "/cart"
  
    // if (
    //   path === '/cart'
    // )
    //   displayNav = cartNav
    if (
      path === '/change' ||
      path === '/' ||
      path === '/404'
    )
      displayNav = ''
    else displayNav = smallNav
  

    return(
        <>
         {displayNav}
        </>
    )
}

export default withRouter(SmallNav)