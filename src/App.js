import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'

import LifePage from './pages/LifeStyle/LifePage'
//import MapPage from './components/Map/MapPage'

import Home from './pages/Home'
import About from './pages/About'
import ProductList from './pages/ProductList'
import ItemDetail from './pages/ItemDetail/ItemDetail'

import CourseList from './pages/CourseList/CourseList'
import CourseDetail from './pages/CourseDetail/CourseDetail'

import ItemTracking from './pages/ItemTracking/ItemTracking'

import CartComfirm from './pages/Cart/CartComfirm'
import CartComfirmChange from './pages/Cart/CartComfirmChange'
import CartComplete from './pages/Cart/CartComplete'
import CartPayment from './pages/Cart/CartPayment'
import Cart from './pages/Cart/Cart'

import Membercenter from './pages/Membercenter'
import Coupon from './pages/Coupon'
import MemberOrders from './pages/MemberOrders'
import MemberItemtrack from './pages/MemberItemTrack'

import NotFoundPage from './pages/NotFoundPage'

import Marketing from './pages/Marketing'
import Comment from './pages/Comment'

import Login from './pages/login/login'
import MyWelcome from './pages/login/welcome'
import MyRegister from './pages/login/register'
import MyForgetPwd from './pages/login/forgetPwd'
import Faq from './pages/Faq'

import ProtectedRoute from './utils/ProtectedRoute'
var sha1 = require('sha1')

function App(props) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState([])
  const [confirmpassword, setConfirmpassword] = useState('')

  // 錯誤訊息陣列
  const [loginErrors, setLoginErrors] = useState([])

  //更改背景顏色
  function changeBackgroundColorLight() {
    document.body.style.background = '#EFF3EC'
  }

  function changeBackgroundColorDark() {
    document.body.style.background = 'url(/bg-dark-with-pattern.svg) repeat'
  }

  // 處理會員登入
  const loginProcess = (loginSuccessCallback) => {
    const errors = []

    // 檢查錯誤

    if (username === '') {
      errors.push('Account is empty')
    } else {
      if (data.length === 0) {
        errors.push('E-mail not exist')
      } else {
        if (sha1(password) !== data[0].pwd) errors.push('Wrong password')
      }
    }

    if (password === '') errors.push('Password is empty')

    if (errors.length > 0) {
      setLoginErrors(errors)
      return
    }

    // 清空錯誤訊息陣列 + 登入
    // 清空錯誤訊息陣列為必要
    setLoginErrors([])

    // 執行成功的callback(來自MemberLogin)
    loginSuccessCallback()
  }

  const logoutProcess = (logoutSuccessCallback) => {
    setName('')
    setUsername('')
    setPassword('')

    // 認証改為false

    // 執行成功的callback(來自MemberLogin)
    logoutSuccessCallback()
  }

  // 處理會員註冊
  const registerProcess = (registerSuccessCallback) => {
    const errors = []
    var matches = username.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    if (name === '') {
      errors.push('Name is empty')
    }
    if (username === '') {
      errors.push('Account is empty')
    } else {
      if (data.length !== 0) {
        errors.push('E-mail is exist')
      } else if (matches === null)
        errors.push("E-mail doesn't match the pattern")
    }

    // if (password === '') errors.push('Password is empty')

    // 檢查錯誤
    if (errors.length > 0) {
      setLoginErrors(errors)
      return
    }
    // 清空錯誤訊息陣列 + 登入
    // 清空錯誤訊息陣列為必要
    setLoginErrors([])
    registerSuccessCallback()
  }

  return (
    <Router>
      <>
        <MyNavbar />
        <MainContent>
          <Switch>
            <Route path="/life" exact>
              <LifePage />
            </Route>
            {/* <Route path="/life/map" exact>
              <MapPage/>
            </Route> */}

            <Route path="/mall" exact></Route>

            <Route path="/mall/about">
              <About changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route path="/life/about">
              <About changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>

            <Route path="/mall/shop/:second?/:third?/:fourth?/:fifth?/:sixth?/:seventh?/:page?">
              <ProductList
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
            <Route path="/mall/itemDetail/:second?/:third?/:fourth?/:fifth?/:sixth?/:seventh?/:page?">
              <ItemDetail
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>

            <Route path="/life/course/:second?/:third?/:fourth?/:page?">
              <CourseList
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
            <Route path="/life/courseDetail">
              <CourseDetail
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>

            <Route path="/mall/ItemTracking">
              <ItemTracking
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>

            <Route path="/mall/cart" exact>
              <Cart changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route path="/mall/cart/comfirm" exact>
              <CartComfirm
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
            <Route path="/mall/cart/comfirm/change">
              <CartComfirmChange
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
            <Route path="/mall/cart/complete">
              <CartComplete
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
            <Route path="/mall/cart/payment">
              <CartPayment
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>

            <Route path="/life/cart" exact>
              <Cart changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route path="/life/cart/comfirm" exact>
              <CartComfirm
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
            <Route path="/life/cart/comfirm/change">
              <CartComfirmChange
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
            <Route path="/life/cart/complete">
              <CartComplete
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
            <Route path="/life/cart/payment">
              <CartPayment
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>

            <Route exact path="/life/marketing">
              <Marketing
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
            <Route exact path="/life/comment">
              <Comment
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>

            <Route path="/mall/login">
              <Login
                username={username}
                setUsername={setUsername}
                setPassword={setPassword}
                loginProcess={loginProcess}
                logoutProcess={logoutProcess}
                loginErrors={loginErrors}
                data={data}
                setData={setData}
              />
            </Route>

            <Route path="/mall/welcome">
              <MyWelcome logoutProcess={logoutProcess} />
            </Route>

            <Route path="/mall/register">
              <MyRegister
                setName={setName}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loginErrors={loginErrors}
                setConfirmpassword={setConfirmpassword}
                registerProcess={registerProcess}
                data={data}
                setData={setData}
              />
            </Route>

            <Route path="/mall/forgetpwd">
              <MyForgetPwd username={username} setUsername={setUsername} />
            </Route>

            <Route path="/life/login">
              <Login
                username={username}
                setUsername={setUsername}
                setPassword={setPassword}
                loginProcess={loginProcess}
                logoutProcess={logoutProcess}
                loginErrors={loginErrors}
                data={data}
                setData={setData}
              />
            </Route>

            <Route path="/life/welcome">
              <MyWelcome logoutProcess={logoutProcess} />
            </Route>

            <Route path="/life/register">
              <MyRegister
                setName={setName}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loginErrors={loginErrors}
                setConfirmpassword={setConfirmpassword}
                registerProcess={registerProcess}
                data={data}
                setData={setData}
              />
            </Route>

            <Route path="/life/forgetpwd">
              <MyForgetPwd username={username} setUsername={setUsername} />
            </Route>

            {/* <ProtectedRoute path="/todoapp">
              <TodoApp todos={todos} setTodos={setTodos} isAuth={auth} />
            </ProtectedRoute> */}

            <Route exact path="/mall/membercenter">
              <Membercenter
                changeBackgroundColorDark={changeBackgroundColorDark}
              />
            </Route>
            <Route exact path="/mall/membercenter/coupon">
              <Coupon changeBackgroundColorDark={changeBackgroundColorDark} />
            </Route>
            <Route exact path="/mall/membercenter/memberorders">
              <MemberOrders
                changeBackgroundColorDark={changeBackgroundColorDark}
              />
            </Route>
            <Route exact path="/mall/membercenter/memberitemtracking">
              <MemberItemtrack />
            </Route>
            <Route exact path="/life/membercenter">
              <Membercenter
                changeBackgroundColorDark={changeBackgroundColorDark}
              />
            </Route>
            <Route exact path="/life/membercenter/coupon">
              <Coupon changeBackgroundColorDark={changeBackgroundColorDark} />
            </Route>
            <Route exact path="/life/membercenter/memberorders">
              <MemberOrders
                changeBackgroundColorDark={changeBackgroundColorDark}
              />
            </Route>
            <Route exact path="/life/membercenter/memberitemtracking">
              <MemberItemtrack />
            </Route>

            <Route exact path="/mall/faq">
              <Faq changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route exact path="/life/faq">
              <Faq changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>

            <Route exact path="/">
              <Home changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route exact path="*">
              <NotFoundPage
                changeBackgroundColorLight={changeBackgroundColorLight}
              />
            </Route>
          </Switch>
        </MainContent>
        <MyFooter />
      </>
    </Router>
  )
}

export default App
