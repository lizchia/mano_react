import React, { useEffect } from 'react'
import './login.scss'
// import MyBanner from '../../components/MyBanner'
import { withRouter } from 'react-router-dom'

function MyWelcome(props) {
  const {
    logoutProcess
  } = props


  async function insertCouponToServer(item) {
    const request = new Request(
      `http://localhost:3002/membercenter/coupon/${member[0].memberId}`,
      {
        method: 'POST',
        body: JSON.stringify(item),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    console.log('After JSON: ', JSON.stringify(item))

    const response = await fetch(request)
    const data = await response.json()
  }


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
                data-toggle="modal"
                data-target="#modalDiscount"
              >
                Continue shop
              </button>
            {/* <!--Modal: modalDiscount--> */}
            <div
                class="modal fade right text-center "
                id="modalDiscount"
                tabindex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
                data-backdrop="true"
              >
                <div
                  class="modal-dialog modal-side modal-notify"
                  role="document"
                  style={{ fontFamily: 'monospace', fontSize: '10pt' }}
                >
                  {/* <!--Content--> */}
                  <div class="modal-content">
                    {/* <!--Header--> */}
                    <div class="modal-header">
                      <p
                        style={{ fontSize: '20pt', color: '#8c867d' }}
                        class="heading"
                      >
                        親愛的 {member[0].memberName}
                      </p>

                      <button
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        style={{
                          width: '30pt',
                          height: '30pt',
                          background: 'transparent',
                          color: '#8c867d',
                        }}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    {/* <!--Body--> */}
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-3">
                          <p></p>
                          <p class="text-center">
                            <i
                              style={{ fontSize: '30pt', color: '#8c867d' }}
                              class="fas fa-gift fa-4x"
                            ></i>
                          </p>
                        </div>

                        <div class="col-9">
                          <p>
                            <strong>
                              謝謝您再次來到 Mano:
                              <br />
                              <strong>我們準備了 10% OFF 購物禮送給您</strong>
                            </strong>
                          </p>
                          <br />
                          <p class="mb-0" style={{ color: '#a9a9a9' }}>
                            <cite title="Source Title">
                              Mano以抹茶為品牌形象，獻上珍選商品。每一個與產品對上眼的瞬間，都是屬於您與生活的一期一會。Mano
                            </cite>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* <!--Footer--> */}
                    <div class="d-flex modal-footer flex-center">
                      <button
                        className="btn mb-1"
                        data-dismiss="modal"
                        onClick={() => {
                          insertCouponToServer()
                          alert('折價卷已贈送，可在會員中心查看')
                          continueShopCallback()
                        }}
                      >
                        收下小心意
                      </button>
                      <button
                        className="btn mb-1"
                        data-dismiss="modal"
                        onClick={() => {
                          continueShopCallback()
                        }}
                      >
                        心領了，我先逛逛
                      </button>
                    </div>
                  </div>
                  {/* <!--/.Content--> */}
                </div>
              </div>
              {/* <!--Modal: modalDiscount--> */}
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
