import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'

import LifePage from './pages/LifeStyle/LifePage'
import MallPage from './pages/MallPage'
import MapPage from './components/Map/MapPage'

import Home from './pages/Home'
import About from './pages/About'
import ProductList from './pages/ProductList'
import ItemDetail from './pages/ItemDetail/ItemDetail'

import CourseList from './pages/CourseList/CourseList'
import CourseDetail from './pages/CourseDetail/CourseDetail'

import ItemTracking from './pages/ItemTracking/ItemTracking'

import CartComfirm from "./pages/Cart/CartComfirm"
import CartComfirmChange from "./pages/Cart/CartComfirmChange"
import CartComplete from "./pages/Cart/CartComplete"
import CartPayment from "./pages/Cart/CartPayment"
import Cart from './pages/Cart/Cart'

import Membercenter from './pages/Membercenter'
import Coupon from './pages/Coupon'
import MemberOrders from "./pages/MemberOrders"
import MemberItemtrack from "./pages/MemberItemTrack"

import NotFoundPage from './pages/NotFoundPage'

import Marketing from './pages/Marketing'
import Comment from './pages/Comment'
import Story from "./pages/Story"

import Login from './pages/login/login'
import MyWelcome from './pages/login/welcome'
import MyRegister from './pages/login/register'
import MyForgetPwd from './pages/login/forgetPwd'
import MyChangePassword from './pages/login/changePassword'

import Faq from './pages/Faq'

import SmallNav from "./components/SmallNav"
import CartToggle from "./components/Cart/CartToggle"

import WithSpinner from "./utils/WithSpinner/WithSpinner"
import ProtectedRoute from './utils/ProtectedRoute'
var sha1 = require('sha1');

const CartWhithSpinner = WithSpinner(Cart);
const ShopWithSpinner = WithSpinner(ProductList);
const CourseWithSpinner = WithSpinner(CourseList);


function App(props) {

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [data, setData] = useState([])
  const [confirmpassword, setConfirmpassword] = useState('')

  // 錯誤訊息陣列
  const [loginErrors, setLoginErrors] = useState([])

  const [width, setWidth] = useState(window.innerWidth)


  useEffect(()=>{

    window.addEventListener("resize", ()=>{
      let width = window.innerWidth;
      setWidth(width)
    })

  },[])

  //更改背景顏色
  function changeBackgroundColorLight(){
    document.body.style.background ='#EFF3EC'
  }

  function changeBackgroundColorDark(){
    document.body.style.background ='url(/bg-dark-with-pattern.svg) repeat'
  }

  function changeBackgroundColorBrown(){
    document.body.style.background ='#CDBAA9'
  }

  function changeBackgroundColorWhite(){
    document.body.style.background ='#FFFFFF'
  }

  function changeBackgroundColorGreen(){
    document.body.style.background ='#A8B38B'
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
        alert('帳號已被註冊')
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
        {width <= 900 ? (
          <SmallNav style={{zIndex: "10"}} />
        ) : (
          <MyNavbar style={{zIndex: "10"}} />
        )}
        {/* <CartToggle /> */}
        <MainContent>
          <Switch>
            <Route path="/life" exact>
              <LifePage/>
            </Route>
            <Route path="/life/map" exact>
              <MapPage/>
            </Route>

            <Route path="/mall" exact>
                <MallPage changeBackgroundColorWhite={changeBackgroundColorWhite}/>
            </Route>


            <Route path="/mall/about">
              <About 
              changeBackgroundColorGreen={changeBackgroundColorGreen}/>
            </Route>
            <Route path="/life/about">
              <About 
              changeBackgroundColorGreen={changeBackgroundColorGreen}/>
            </Route>

            <Route path="/mall/shop/:second?/:third?/:fourth?/:fifth?/:sixth?/:seventh?/:page?">
              <ShopWithSpinner 
              changeBackgroundColorLight={changeBackgroundColorLight}
              isLoading={isLoading}
              setIsLoading={setIsLoading} />
            </Route>
            <Route path="/mall/itemDetail/:second?/:third?/:fourth?/:fifth?/:sixth?/:seventh?/:page?">
              <ItemDetail 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>

            <Route path="/life/course/:second?/:third?/:fourth?/:page?">
              <CourseList 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>
            <Route path="/life/courseDetail/:second?/:third?/:fourth?">
              <CourseDetail 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>

            <Route path="/mall/ItemTracking">
              <ItemTracking 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>

            <Route path="/mall/cart" exact>
              <CartWhithSpinner 
              changeBackgroundColorLight={changeBackgroundColorLight}
              isLoading={isLoading}
              setIsLoading={setIsLoading} />
            </Route>
            <Route path="/mall/cart/comfirm" exact>
              <CartComfirm 
              changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route path="/mall/cart/comfirm/change">
              <CartComfirmChange
              changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route path="/mall/cart/complete">
              <CartComplete 
              changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route path="/mall/cart/payment">
              <CartPayment 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>

            <Route path="/life/cart" exact>
              <CartWhithSpinner 
                changeBackgroundColorLight={changeBackgroundColorLight}
                isLoading={isLoading}
                setIsLoading={setIsLoading} />
            </Route>
            <Route path="/life/cart/comfirm" exact>
              <CartComfirm 
              changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route path="/life/cart/comfirm/change">
              <CartComfirmChange
              changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route path="/life/cart/complete">
              <CartComplete 
              changeBackgroundColorLight={changeBackgroundColorLight} />
            </Route>
            <Route path="/life/cart/payment">
              <CartPayment 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>


            <Route exact path="/life/marketing">
              <Marketing 
              changeBackgroundColorWhite={changeBackgroundColorWhite}/>
            </Route>
            <Route exact path="/life/comment">
              <Comment 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>
            <Route exact path="/life/story">
              <Story 
              changeBackgroundColorWhite={changeBackgroundColorWhite}/>
            </Route>



            <Route path="/mall/login">
              <Login
                changeBackgroundColorBrown={changeBackgroundColorBrown}
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
              <MyWelcome
                changeBackgroundColorBrown={changeBackgroundColorBrown}
                logoutProcess={logoutProcess}
              />
            </Route>

            <Route path="/mall/register">
              <MyRegister
                changeBackgroundColorBrown={changeBackgroundColorBrown}
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
              <MyForgetPwd
                changeBackgroundColorBrown={changeBackgroundColorBrown}
                username={username}
                setUsername={setUsername}
                data={data}
                setData={setData}
              />
            </Route>

            <Route path="/life/login">
              <Login
                changeBackgroundColorBrown={changeBackgroundColorBrown}
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
              <MyWelcome
                changeBackgroundColorBrown={changeBackgroundColorBrown}
                logoutProcess={logoutProcess}
              />
            </Route>

            <Route path="/life/register">
              <MyRegister
                changeBackgroundColorBrown={changeBackgroundColorBrown}
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
              <MyForgetPwd
                changeBackgroundColorBrown={changeBackgroundColorBrown}
                username={username}
                setUsername={setUsername}
                data={data}
                setData={setData}
              />
            </Route>

            {/* <ProtectedRoute path="/todoapp">
              <TodoApp todos={todos} setTodos={setTodos} isAuth={auth} />
            </ProtectedRoute> */}

            <Route exact path="/mall/membercenter">
              <Membercenter changeBackgroundColorDark={changeBackgroundColorDark}/>
            </Route>
            <Route exact path="/mall/membercenter/coupon">
              <Coupon changeBackgroundColorDark={changeBackgroundColorDark}/>
            </Route>
            <Route exact path="/mall/membercenter/memberorders">
              <MemberOrders changeBackgroundColorDark={changeBackgroundColorDark}/>
            </Route>
            <Route exact path="/mall/membercenter/memberitemtracking">
              <MemberItemtrack/>
            </Route>
            <Route exact path="/life/membercenter">
              <Membercenter changeBackgroundColorDark={changeBackgroundColorDark}/>
            </Route>
            <Route exact path="/life/membercenter/coupon">
              <Coupon changeBackgroundColorDark={changeBackgroundColorDark}/>
            </Route>
            <Route exact path="/life/membercenter/memberorders">
              <MemberOrders changeBackgroundColorDark={changeBackgroundColorDark}/>
            </Route>
            <Route exact path="/life/membercenter/memberitemtracking">
              <MemberItemtrack />
            </Route>


            <Route exact path="/mall/faq">
              <Faq 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>
            <Route exact path="/life/faq">
              <Faq 
              changeBackgroundColorLight={changeBackgroundColorLight}/>
            </Route>
            <Route exact path="/">
              <Home 
              changeBackgroundColorWhite={changeBackgroundColorWhite}/>
            </Route>

            <Route exact path="/mychangepassword/:furl?">
              <MyChangePassword
                changeBackgroundColorBrown={changeBackgroundColorBrown}
                data={data}
                setData={setData}
                username={username}
                setUsername={setUsername}
              />
            </Route>

            <Route exact path="/404">
              <NotFoundPage changeBackgroundColorWhite={changeBackgroundColorWhite}/>
            </Route>
            <Redirect to="/404" />
          </Switch>
        </MainContent>
        <MyFooter />
      </>
    </Router>
  )
}

export default App
