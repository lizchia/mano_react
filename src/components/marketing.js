import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { ToastsContainer, ToastsStore } from 'react-toasts'

function MarketCoupon(props) {
  const member = JSON.parse(localStorage.getItem('member')) || [
    { memberName: '' },
  ]
  console.log(member)
  const cssCard = {
    border: '1px solid transparent',
  }
  const cssCoupon = {
    height: '150pt',
  }

  async function insertCouponToServer(item) {
    const request = new Request(
      `http://localhost:3002/membercenter/marketcoupon/${member[0].memberId}`,
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

  return (
    <>
      <h3 className="text-center">振興有禮</h3>
      <div class="card-group text-center">
        <div class="card" style={cssCard}>
          <Link
            onClick={() =>
              ToastsStore.success(
                <Link to="/mall/login">快點我成為會員！</Link>
              )
            }
          >
            <img
              style={cssCoupon}
              src="/picture/manoCoupon04.svg"
              className="card-img-top"
            ></img>
          </Link>
          <div class="card-body">
            <a
              class="card-title"
              onClick={() => {
                insertCouponToServer()
                alert('折價卷已贈送，可在會員中心查看')
              }}
              style={{cursor: 'pointer'}}
            >
              {' '}
              <img
                style={{ height: '40pt' }}
                src="/picture/manoCoupon03.svg"
              ></img>
            </a>
            <p class="card-text">
              <h6>全美妝品九折</h6>
            </p>
          </div>
        </div>
        <div class="card" style={cssCard}>
          <Link
            onClick={() =>
              ToastsStore.success(
                <Link to="/mall/login">快點我成為會員！</Link>
              )
            }
          >
            <img
              style={cssCoupon}
              src="/picture/manoCoupon05.svg"
              className="card-img-top"
            ></img>
          </Link>
          <div class="card-body">
          <a
              class="card-title"
              onClick={() => {
                insertCouponToServer()
                alert('折價卷已贈送，可在會員中心查看')
              }}
              style={{cursor: 'pointer'}}
            >
              {' '}
              <img
                style={{ height: '40pt' }}
                src="/picture/manoCoupon03.svg"
              ></img>
            </a>
            <p class="card-text">
              <h6>全家居品九折</h6>
            </p>
          </div>
        </div>
        <div class="card" style={cssCard}>
          <Link
            onClick={() =>
              ToastsStore.success(
                <Link to="/mall/login">快點我成為會員！</Link>
              )
            }
          >
            <img
              style={cssCoupon}
              src="/picture/manoCoupon06.svg"
              className="card-img-top"
            ></img>
          </Link>
          <div class="card-body">
          <a
              class="card-title"
              onClick={() => {
                insertCouponToServer()
                alert('折價卷已贈送，可在會員中心查看')
              }}
              style={{cursor: 'pointer'}}
            >
              <img
                style={{ height: '40pt' }}
                src="/picture/manoCoupon03.svg"
              ></img>
            </a>
            <p class="card-text">
              <h6>全服飾品九折</h6>
            </p>
          </div>
        </div>
      </div>
      <br />
      <div class="card-group text-center">
        <div class="card" style={cssCard}>
          <Link
            onClick={() =>
              ToastsStore.success(
                <Link to="/mall/login">快點我成為會員！</Link>
              )
            }
          >
            <img
              style={cssCoupon}
              src="/picture/manoCoupon07.svg"
              className="card-img-top"
            ></img>
          </Link>
          <div class="card-body">
          <a
              class="card-title"
              onClick={() => {
                insertCouponToServer()
                alert('折價卷已贈送，可在會員中心查看')
              }}
              style={{cursor: 'pointer'}}
            >
              {' '}
              <img
                style={{ height: '40pt' }}
                src="/picture/manoCoupon02.svg"
              ></img>
            </a>
            <p class="card-text">
              <h6>課程滿十送一卷</h6>
            </p>
          </div>
        </div>
        <div class="card" style={cssCard}>
          <Link
            onClick={() =>
              ToastsStore.success(
                <Link to="/mall/login">快點我成為會員！</Link>
              )
            }
          >
            <img
              style={cssCoupon}
              src="/picture/manoCoupon08.svg"
              className="card-img-top"
            ></img>
          </Link>
          <div class="card-body">
          <a
              class="card-title"
              onClick={() => {
                insertCouponToServer()
                alert('折價卷已贈送，可在會員中心查看')
              }}
              style={{cursor: 'pointer'}}
            >
              {' '}
              <img
                style={{ height: '40pt' }}
                src="/picture/manoCoupon02.svg"
              ></img>
            </a>
            <p class="card-text">
              <h6>全課程九折</h6>
            </p>
          </div>
        </div>
        <ToastsContainer store={ToastsStore} lightBackground />
      </div>
    </>
  )
}

export default withRouter(MarketCoupon)