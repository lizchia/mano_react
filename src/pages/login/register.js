import React, { useEffect, useState } from 'react'
import './login.scss'
import { withRouter } from 'react-router-dom'

var sha1 = require('sha1')

function MyRegister(props) {
  const [insertData, setInsertData] = useState('')

  const {
    setName,
    username,
    setUsername,
    password,
    setPassword,
    loginErrors,
    registerProcess,
    setConfirmpassword,
    data,
    setData,
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

  async function insertMemberToServer(item) {
    const request = new Request('http://localhost:3002/member/insertMember', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    console.log('After JSON: ', JSON.stringify(item))

    const response = await fetch(request)
    const data = await response.json()
  }

  const registerSuccessCallback = () => {
    insertMemberToServer(insertData)
    //alert('註冊成功，跳到login')
    const path = props.history.location.pathname
    if(path.includes("/mall")) props.history.push("/mall/login")
    else props.history.push("/life/login")
  }

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

  const displayForm = (
    <>
      <form action="" method="">
        <div className="bg position-relative d-flex">
          <div className="bgLeft">
            <div className="loginInput">
              <div className="loginBlock">
                <h5>Name</h5>
                <input
                  className="form-control mb2"
                  type="text"
                  required="required"
                  placeholder="請輸入姓名暱稱"
                  onChange={(event) => {
                    setName(event.target.value)
                    setInsertData({
                      ...insertData,
                      memberName: event.target.value,
                    })
                  }}
                />
                <h5>Account</h5>
                <input
                  className="form-control mb2"
                  type="text"
                  required="required"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  placeholder="請輸入信箱帳號"
                  onChange={(event) => {
                    setUsername(event.target.value)
                    setInsertData({
                      ...insertData,
                      email: event.target.value,
                    })
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
                    setInsertData({
                      ...insertData,
                      pwd: sha1(event.target.value),
                    })
                  }}
                />
                <h5>Confirm</h5>
                <input
                  className="form-control mb2"
                  type="password"
                  pattern={password}
                  title="與上列密碼不符"
                  required="required"
                  placeholder="再次確認密碼"
                  onChange={(event) => {
                    setConfirmpassword(event.target.value)
                  }}
                />
                <div className="loginBlock">
                  <input
                    className="btn btn-primary mb2 loginBlock loginBtn"
                    type="submit"
                    value="Register"
                    onMouseEnter={() => {
                      console.log(data)
                      getData(username)
                    }}
                    onClick={() => {
                      registerProcess(registerSuccessCallback)
                    }}
                  />
                </div>
                {displayErrors}
              </div>
            </div>
          </div>
          <div className="bgRight-register"></div>
        </div>
      </form>
    </>
  )

  return <>{displayForm}</>
}

export default withRouter(MyRegister)
