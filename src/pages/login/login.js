import React, { useState, useEffect } from 'react'
import './login.scss'
import { withRouter } from 'react-router-dom'
import { error } from 'jquery'

var sha1 = require('sha1')

function MyLogin(props) {
  const {
    data,
    setData,
    username,
    setUsername,
    setPassword,
    loginProcess,
    logoutProcess,
    loginErrors,
  } = props

  useEffect(()=>{
    props.changeBackgroundColorBrown()
  },[])

  async function getData(username) {
    const response = await fetch(`http://localhost:3002/member/${username}`)
    const json = await response.json()
    const items = json.rows
    setData(items)

    return data
  }

  // 錯誤訊息陣列的呈現
  const displayErrors = loginErrors.length ? (
    <div className="alert alert-danger" role="alert">
      <ul className="list-unstyled">
        {loginErrors.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  ) : (
    ''
  )

  // login成功時的callback
  const loginSuccessCallback = () => {
    localStorage.setItem('member', JSON.stringify(data))
    //alert('登入成功，跳到Welcome')
    const path = props.history.location.pathname
    if(path.includes("/mall")) props.history.push("/mall/welcome")
    else props.history.push("/life/welcome")
}

  // logout成功時的callback
  const logoutSuccessCallback = () => {
    //alert('登出成功，跳回上一頁')
    props.history.goBack()
  }

  const forgetCallback = () => {
    const path = props.history.location.pathname
    if(path.includes("/mall")) props.history.push("/mall/forgetpwd")
    else props.history.push("/life/forgetpwd")

  }

  const registerCallback = () => {
    const path = props.history.location.pathname
    if(path.includes("/mall")) props.history.push("/mall/register")
    else props.history.push("/life/register")

  }

  const forgetButton = (
    <div className="loginBlock">
      <button
        className="btn btn-primary mb2 loginBlock forgetBtn"
        onClick={() => {
          logoutProcess(forgetCallback)
        }}
      >
        forget password?
      </button>
    </div>
  )

  const registerButton = (
    <div className="loginBlock">
      <button
        className="btn btn-primary mb2 loginBlock registerBtn"
        onClick={() => {
          logoutProcess(registerCallback)
        }}
      >
        register
      </button>
    </div>
  )

  const displayForm =  (
    
    <>
      <form action="" method="">
        <div className="bg position-relative d-flex">
          <div className="bgLeft">
            <div className="loginInput">
              <div className="loginBlock">
                <h5>Account</h5>
                <input
                  className="form-control mb2"
                  type="text"
                  required="required"
                  // value={username}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  placeholder="請輸入帳號"
                  onChange={(event) => {
                    setUsername(event.target.value)
                  }}
                />
              </div>
              <div className="loginBlock">
                <h5>Password</h5>
                <input
                  className="form-control mb2"
                  type="password"
                  required="required"
                  placeholder="請輸入密碼"
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                />
                <div className="loginBlock">
                  <input
                    value="login"
                    type="submit"
                    className="btn btn-primary mb2 loginBlock loginBtn"
                    onMouseDown={() => {
                      console.log(data)
                      getData(username)
                    }}
                    onClick={() => {
                      loginProcess(loginSuccessCallback)
                    }}
                  />
                </div>
                {registerButton}
                {forgetButton}
                {displayErrors}
              </div>
            </div>
          </div>
          <div className="bgRight-login"></div>
        </div>
      </form>
    </>
  )

  return <>{displayForm}</>
}

export default withRouter(MyLogin)
