import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { MdShoppingCart, MdKeyboardArrowRight } from 'react-icons/md'

function MyNavbar(props) {
  const loginButton = (
    <>
      <Button
        variant="outline-light"
        onClick={() => {
          const path = props.history.location.pathname
          if (path.includes('/mall')) props.history.push('/mall/login')
          else props.history.push('/life/login')
        }}
      >
        登入
      </Button>
    </>
  )
  const member = JSON.parse(localStorage.getItem('member')) || [
    { memberName: '' },
  ]

  const logoutButton = (
    <>
      <span style={{ color: '#ffffff' }} className="mr-3">
        {member[0].memberName} , 您好
      </span>
      <Button
        variant="outline-light"
        onClick={() => {
          const path = props.history.location.pathname
          if (path.includes('/mall')) props.history.push('/mall/welcome')
          else props.history.push('/life/welcome')
        }}
      >
        登出
      </Button>
    </>
  )

  const displayButton = member[0].memberName !== '' ? logoutButton : loginButton
  const pathlist = ['/membercenter', '*', '/life', '/mall']
  const themenames = ['dark', 'dark', 'light', 'light', 'light']

  // 先找出對應的主題
  let locationPathname = props.location.pathname
  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes('/membercenter'))
    locationPathname = '/membercenter'
  if (locationPathname.includes('/coupon')) locationPathname = '/membercenter'

  if (locationPathname.includes('/mall')) locationPathname = '/mall'
  if (locationPathname.includes('/life')) locationPathname = '/life'

  const index = pathlist.findIndex((v) => v === locationPathname)

  const nav = (
    <>
      <Navbar variant={themenames[index]}>
        <Navbar.Brand href="/">抹の</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/mall" exact>
            商城首頁
          </Nav.Link>
          <Nav.Link as={NavLink} to="/mall/about">
            關於我們
          </Nav.Link>

          {member[0].memberName !== '' ? (
            <Nav.Link as={NavLink} to="/mall/membercenter">
              Member center
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} to="/mall/login">
              會員登入
            </Nav.Link>
          )}

          <Nav.Link
            as={NavLink}
            to="/mall/shop"
            onClick={() => localStorage.setItem('page', 1)}
          >
            產品列表
          </Nav.Link>
          <Nav.Link as={NavLink} to="/mall/ItemTracking">
            願望清單
          </Nav.Link>
          <Nav.Link as={NavLink} to="/mall/cart">
            購物車
          </Nav.Link>
          <Nav.Link as={NavLink} to="/mall/faq">
            FAQ
          </Nav.Link>
        </Nav>
        <Form inline>{displayButton}</Form>
      </Navbar>
    </>
  )

  const lifeNav = (
    <>
      <Navbar variant={themenames[index]}>
        <Navbar.Brand href="/">抹の</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/life" exact>
            社群首頁
          </Nav.Link>
          <Nav.Link as={NavLink} to="/life/about">
            關於我們
          </Nav.Link>

          {member[0].memberName !== '' ? (
            <Nav.Link as={NavLink} to="/life/membercenter">
              Member center
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} to="/life/login">
              會員登入
            </Nav.Link>
          )}

          <Nav.Link
            as={NavLink}
            to="/life/course"
            onClick={() => localStorage.setItem('page', 1)}
          >
            課程列表
          </Nav.Link>
          <Nav.Link as={NavLink} to="/life/cart">
            購物車
          </Nav.Link>
          <Nav.Link as={NavLink} to="/life/marketing">
            Marketing
          </Nav.Link>
          <Nav.Link as={NavLink} to="/life/comment">
            Comment
          </Nav.Link>
          <Nav.Link as={NavLink} to="/life/map">
            抹茶地圖
          </Nav.Link>
          <Nav.Link as={NavLink} to="/life/faq">
            FAQ
          </Nav.Link>
        </Nav>
        <Form inline>{displayButton}</Form>
      </Navbar>
    </>
  )

  const cartNav = (
    <>
      <Navbar variant={themenames[index]}>
        <Navbar.Brand href="/">抹の</Navbar.Brand>
        <Nav className="mr-auto justify-content-end w-75 align-items-center">
          <Nav.Link
            as={NavLink}
            to={
              props.history.location.pathname.includes('/mall')
                ? '/mall/cart'
                : '/life/cart'
            }
            className="d-flex align-items-center"
            disabled
            exact
          >
            購物車 <MdShoppingCart className="ml-1" />
          </Nav.Link>
          <MdKeyboardArrowRight className="ml-1" />
          <MdKeyboardArrowRight className="mr-1" />
          <Nav.Link
            as={NavLink}
            to={
              props.history.location.pathname.includes('/mall')
                ? '/mall/cart/comfirm'
                : '/life/cart/comfirm'
            }
            disabled
          >
            確認訂單
          </Nav.Link>
          <MdKeyboardArrowRight className="ml-1" />
          <MdKeyboardArrowRight className="mr-1" />
          <Nav.Link
            as={NavLink}
            to={
              props.history.location.pathname.includes('/mall')
                ? '/mall/cart/payment'
                : '/life/cart/payment'
            }
            disabled
          >
            付款
          </Nav.Link>
          <MdKeyboardArrowRight className="ml-1" />
          <MdKeyboardArrowRight className="mr-1" />
          <Nav.Link
            as={NavLink}
            to={
              props.history.location.pathname.includes('/mall')
                ? '/mall/cart/complete'
                : '/life/cart/complete'
            }
            disabled
          >
            完成訂單
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  )

  let displayNav
  let path = props.history.location.pathname

  if (path.includes('/change')) path = '/change'
  if (path.includes('/cart')) path = '/cart'
  if (path.includes('/mall')) path = '/mall'
  if (path.includes('/life')) path = '/life'

  if (path === '/cart') displayNav = cartNav
  else if (path === '/change' || path === '/') displayNav = ''
  else if (path === '/life') displayNav = lifeNav
  else displayNav = nav

  return <>{displayNav}</>
}

export default withRouter(MyNavbar)
