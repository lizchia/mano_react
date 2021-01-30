import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import '../../styles/cartComplete.scss'
import { useEffect, useState } from 'react'

const CartComplete = (props) => {
  const [lastOrderNumber, setLastOrderNumber] = useState('')

  async function getLastOrderNumber(memberId) {
    const request = new Request(
      `http://localhost:3002/order/lastOrderNumber/${memberId}`,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'appliaction/json',
        }),
      }
    )

    const response = await fetch(request)
    const data = await response.json()
    setLastOrderNumber(data[0])
  }

  useEffect(() => {
    props.changeBackgroundColorLight()

    const member = JSON.parse(localStorage.getItem('member'))
    const memberId = member[0].memberId

    getLastOrderNumber(memberId)
  }, [])

  return (
    <>
      <div
        style={{
          background: 'url(/bg-pattern.svg) repeat',
          position: ' fixed',
          left: '0',
          top: '0',
          width: '25vw',
          height: '100vh',
          opacity: '0.1',
          zIndex: -1,
        }}
      ></div>
      <div className="d-flex fd-col justify-content-center align-items-center">
        <i className="far fa-check-circle check"></i>
        <h2 className="mt-3 mb-3">訂單已完成</h2>
        <h6 className="orderId">您的訂單編號: {lastOrderNumber.orderNumber}</h6>
        <Button
          className="mt-2 mb-2 nextBtn"
          variant="outline-primary"
          onClick={() => {
            const path = props.history.location.pathname
            if (path.includes('/mall')) props.history.push('/mall/shop')
            else props.history.push('/life/course')
            localStorage.setItem('page', 1)
          }}
        >
          繼續購物
        </Button>
        <Button
          className="mt-2 mb-2 nextBtn"
          variant="outline-primary"
          onClick={() => {
            const path = props.history.location.pathname
            if (path.includes('/mall'))
              props.history.push('/mall/membercenter/memberorders')
            else props.history.push('/life/membercenter/memberorders')
          }}
        >
          訂單查詢
        </Button>
      </div>
    </>
  )
}

export default withRouter(CartComplete)
