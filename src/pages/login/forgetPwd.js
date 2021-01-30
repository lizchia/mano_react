import React, { useEffect } from 'react'
import './login.scss'
import { withRouter } from 'react-router-dom'

function MyForgetPwd(props) {
  const { username, setUsername, data, setData } = props

  useEffect(() => {
    props.changeBackgroundColorBrown()
  }, [])

  async function getData(username) {
    const response = await fetch(`http://localhost:3002/member/${username}`)
    const json = await response.json()
    const items = json.rows
    setData(items)

    return data
  }

  async function insertUrlParams(item) {
    const request = new Request(
      'http://localhost:3002/member/insertUrlParams',
      {
        method: 'POST',
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

  const displayForm = (
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
                  value={username}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  placeholder="請輸入您的帳號"
                  title="不符合信箱格式"
                  onChange={(event) => {
                    setUsername(event.target.value)
                  }}
                />
              </div>
              <div className="loginBlock">
                <h5>Confirm mail sent</h5>
                <div className="loginBlock">
                  <button
                    className="btn btn-primary mb2 loginBlock loginBtn"
                    type="submit"
                    onMouseEnter={() => {
                      console.log(data)
                      getData(username)
                    }}
                    onClick={() => {
                      if (data.length > 0) {
                        alert('驗證信已寄出！')
                        insertUrlParams({
                          fUrl: +new Date(),
                          email: username,
                        })
                      } else {
                        alert(`user doesn't exist！`)
                      }
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bgRight-forgetPwd"></div>
        </div>
      </form>
    </>
  )

  return <>{displayForm}</>
}

export default withRouter(MyForgetPwd)
