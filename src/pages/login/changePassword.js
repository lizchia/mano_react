import React, { useState, useEffect } from 'react'
import './login.scss'
import { withRouter } from 'react-router-dom'
import { error } from 'jquery'
import { AiOutlineQuestion } from 'react-icons/ai'
import NotFoundPage from '../NotFoundPage'

var sha1 = require('sha1')

function MyChangePassword(props) {
  const [newPassword, setNewpassword] = useState('')
  const [confirmNewpassword, setConfirmNewpassword] = useState('')
  const { data, setData, username, setUsername } = props

  async function getUrl(furl) {
    const response = await fetch(`http://localhost:3002/member/url/${furl}`)
    const json = await response.json()
    const items = json.rows
    setData(items)

    return data
  }

  async function updatepassword(item, username) {
    const request = new Request(
      `http://localhost:3002/member/changepassword/${username}`,
      {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )

    const response = await fetch(request)
    const data = await response.json()
  }

  async function deleteUrl(item) {
    const request = new Request(`http://localhost:3002/member/deleteUrl`, {
      method: 'DELETE',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
  }

  useEffect(() => {
    props.changeBackgroundColorBrown()

    let fUrl = props.location.pathname.substr(18)
    console.log(fUrl)

    getUrl(fUrl)
    console.log(data)
  }, [])

  useEffect(() => {
    console.log(data)
    if (data.length > 0) setUsername(data[0].email)
  }, [data])

  useEffect(() => {
    console.log(username)
  }, [username])

  const displayForm = (
    <>
      <form action="" method="">
        <div className="cgloginInput">
          <AiOutlineQuestion
            className="question"
            style={{ transform: 'rotate(-45deg)' }}
          />
          <AiOutlineQuestion
            className="question"
            style={{ transform: 'translateY(-30px)' }}
          />
          <AiOutlineQuestion
            className="question"
            style={{ transform: 'rotate(45deg)' }}
          />
          <div className="cgloginBlock">
            <h5>New Password</h5>
            <input
              className="form-control mb2"
              type="password"
              required="required"
              minLength="8"
              maxLength="20"
              value={newPassword}
              placeholder="請輸入新密碼"
              onChange={(event) => {
                setNewpassword(event.target.value)
              }}
            />
          </div>
          <div className="cgloginBlock">
            <h5>Confirm Password</h5>
            <input
              className="form-control mb2"
              type="password"
              required="required"
              minLength="8"
              maxLength="20"
              pattern={newPassword}
              title="密碼不相同"
              placeholder="請再次確認密碼"
              onChange={(event) => {
                setConfirmNewpassword(event.target.value)
              }}
            />
            <div className="cgloginBlock">
              <input
                value="send"
                type="submit"
                className="btn btn-primary mb2 cgloginBlock cgloginBtn cgBtn"
                onMouseDown={() => {
                  console.log(data)
                }}
                onMouseUp={async () => {
                  if (
                    confirmNewpassword === newPassword &&
                    confirmNewpassword.length >= 8
                  ) {
                    await updatepassword(
                      {
                        pwd: sha1(newPassword),
                      },
                      username
                    )
                    await deleteUrl({
                      fUrl: data[0].fUrl,
                    })
                  }
                }}
                onClick={async () => {
                  if (
                    confirmNewpassword === newPassword &&
                    confirmNewpassword.length >= 8
                  ) {
                    await alert('更改密碼成功！')
                    props.history.push("/mall/login")
                  } else {
                    alert('二次密碼輸入不符或密碼少於八個字！')
                  }
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  )

  return (
    <>
      {data.length > 0 ? (
        displayForm
      ) : (
        <h1
          style={{
            lineHeight: '75vh',
            textAlign: 'center',
            fontWeight: '800',
            letterSpacing: '2px',
          }}
        >
          Url is not exist!
        </h1>
      )}
    </>
  )
}

export default withRouter(MyChangePassword)
