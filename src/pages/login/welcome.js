import React, { useEffect } from 'react'
import './login.scss'
// import MyBanner from '../../components/MyBanner'
import { withRouter } from 'react-router-dom'

function MyWelcome(props) {
  const {
    logoutProcess
  } = props

  useEffect(()=>{
    props.changeBackgroundColorBrown()
  },[])


  //continue shop的callback
  const continueShopCallback = () => {
    //alert('開始購物囉!!!')
    const path = props.history.location.pathname
    if(path.includes("/mall")) props.history.push("/mall")
    else props.history.push("/life")

  }

  // logout成功時的callback
  const logoutSuccessCallback = () => {
    //alert('登出成功，跳回上一頁')
    localStorage.removeItem('member')
    const path = props.history.location.pathname
    if (path.includes('/mall'))
      props.history.push('/mall/login')
    else props.history.push('/life/login')

  }

  const displayButton = (
    <div className="loginBlock">
      <button
        className="btn btn-primary mb2 loginBlock logoutBtn"
        onClick={() => {
          logoutProcess(logoutSuccessCallback)
        }}
      >
        Logout
      </button>
    </div>
  )

  const member = JSON.parse(localStorage.getItem('member')) || [{memberName: ""}]

  const displayForm = (
    <>
      <div className="bg position-relative d-flex">
        <div className="bgLeft">
          <div className="loginInput">
            <div className="loginBlock">
              <h4>{member[0].memberName}</h4>
            </div>
            <div className="loginBlock">
              <h1>Welcome</h1>
              <button
                className="btn btn-primary mb2 loginBlock continueShopBtn"
                onClick={() => {
                  continueShopCallback()
                }}
              >
                Continue shop
              </button>
              {displayButton}
            </div>
          </div>
        </div>
        <div className="bgRight-welcome"></div>
      </div>
    </>
  )

  return <>{displayForm}</>
}

export default withRouter(MyWelcome)
