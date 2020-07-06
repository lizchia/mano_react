import React, { useState, useEffect } from 'react'
import {
  Table,
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { connect } from "react-redux";
import { selectCartItems, selectCourseCartItems, selectOrderInfo } from "../../redux/cart/cartSelector";
import { setOrderInfo } from "../../redux/cart/cartAction";

import { MdLocalShipping } from 'react-icons/md'
import '../../styles/cartConfirm.scss'

function CartComfirm(props) {

  const [shopDiscount, setShopDiscount] = useState(0)
  const [courseDiscount, setCourseDiscount] = useState(0)

  const [shopCoupon, setShopCoupon] = useState([])
  const [courseCoupon, setCourseCoupon] = useState([])
  const [member, setMember] = useState([])

  const [relCourseCouponId, setRelCourseCouponId] = useState(0)
  const [relShopCouponId, setRelShopCouponId] = useState(0)

  async function getShopCouponData(memberId) {
    const request = new Request(
      `http://localhost:3002/order/shopCoupon/${memberId}`,
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
    setShopCoupon(data)
  }

  async function getCourseCouponData(memberId) {
    const request = new Request(
      `http://localhost:3002/order/courseCoupon/${memberId}`,
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
    setCourseCoupon(data)
  }

  useEffect(() => {
    props.changeBackgroundColorLight()

    const member = JSON.parse(localStorage.getItem('member'))

    setMember(member)
    const userId = member[0].memberId

    getCourseCouponData(userId)
    getShopCouponData(userId)
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
      <Container>
        {props.cartItems.length > 0 ? (
          <>
            <Table responsive>
              <thead
                style={{
                  borderTop: '2px solid #596336',
                  borderBottom: '2px solid #596336',
                }}
              >
                <tr>
                  <th className="w-50 cfthDetail">訂單明細</th>
                  <th className="cfthPrice">價格</th>
                  <th className="cfthNumber">數量</th>
                  <th className="cfthTotal">小計</th>
                </tr>
              </thead>
            </Table>
            {props.cartItems.map((value) => (
              <Container className="mb-3">
                <Row>
                  <Col xs={4} md={2}>
                    <Image
                      width={64}
                      height={64}
                      className="mr-3"
                      src={`/items/${value.img}`}
                      alt={value.img}
                    />
                  </Col>
                  <Col
                    xs={8}
                    md={10}
                    className="d-flex align-items-center cfproductCard"
                  >
                    <p className="w-25 cfproductName">{value.name}</p>
                    <p className="w-25 cfcardPrice">${value.price}</p>
                    <p className="w-25 cfcardNumber">{value.quantity}</p>
                    <p className="w-25 cfcardTotal">
                      ${value.price * value.quantity}
                    </p>
                  </Col>
                </Row>
              </Container>
            ))}

            <Row>
              <Col
                xs={11}
                className="d-flex align-items-center justify-content-between m-4 shipping"
              >
                <p>
                  <MdLocalShipping className="font-48 mr-1 carLogo" />
                  寄送資訊：宅配
                </p>
                {member.length > 0 ? (
                  <>
                  <p>{member[0].memberName}</p>
                  <p>{member[0].phone}</p>
                  <p>{member[0].paymentCity}</p>
                  <p>{member[0].paymentDistrict}</p>
                  <p>{member[0].shipAddress}</p>
                  </>
                ) : ""}
                <Button
                  className="mt-2 mb-2 changeBtn"
                  size="sm"
                  variant="outline-primary"
                  onClick={() => {
                    const path = props.history.location.pathname
                    if (path.includes('/mall'))
                      props.history.push('/mall/cart/comfirm/change')
                    else props.history.push('/life/cart/comfirm/change')
                  }}
                >
                  變更
                </Button>
                <p>運費：${props.orderInfo.shipTotal}</p>
              </Col>
            </Row>

            <Row className="d-flex discount">
              <Col xs={7} className="item-content-left m-4 pt-4 discountLeft">
                {shopCoupon.length > 0 ? (
                  <Form.Group>
                    <Form.Control as="select" onChange={(event) => {
                          let index = event.target.selectedIndex
                          setRelShopCouponId(event.target.value)
                          setShopDiscount(parseInt(event.target.childNodes[index].getAttribute('data_discount')))
                        }}>
                      <option value="0" data_discount="0">本次消費不使用優惠卷</option>
                    
                      {shopCoupon.map((value, index) => {
                        return (
                          <option　value={value.rel_coupon_member_id} data_discount={
                            props.orderInfo.shopTotal -
                                  parseInt(
                                    props.orderInfo.shopTotal * Number(value.discountMethod)
                                  )}>{value.discountName} 打{value.discountMethod.slice(2,4)}折</option>
                        )
                      })}
                      </Form.Control>
                  </Form.Group>
                ) : (
                  <p>目前沒有可使用的優惠</p>
                )}
              </Col>
              <Col
                xs={12}
                md={4}
                className="d-flex fd-col text-right p-5 discountRight"
              >
                <p className="">商品總金額：${props.orderInfo.shopTotal}</p>
                {shopDiscount !== 0 ? (
                  <p>折扣金額：${shopDiscount} </p>
                ) : (
                  <p>折扣金額：$0 </p>
                )}
                <p className="discountTotal">
                  折扣後總金額：${props.orderInfo.shopTotal - shopDiscount}
                </p>
              </Col>
            </Row>
          </>
        ) : (
          ''
        )}

        {props.courseCartItems.length > 0 ? (
          <>
            <Table responsive>
              <thead
                style={{
                  borderTop: '2px solid #596336',
                  borderBottom: '2px solid #596336',
                }}
              >
                <tr>
                  <th className="w-50 cfthDetail">訂單明細</th>
                  <th className="cfthPrice">價格</th>
                  <th className="cfthNumber">數量</th>
                  <th className="cfthTotal">小計</th>
                </tr>
              </thead>
            </Table>
            {props.courseCartItems.map((value) => (
              <Container className="mb-3">
                <Row>
                  <Col xs={4} md={2}>
                    <Image
                      width={64}
                      height={64}
                      className="mr-3"
                      src={`/items/${value.img}`}
                      alt={value.img}
                    />
                  </Col>
                  <Col
                    xs={8}
                    md={10}
                    className="d-flex align-items-center cfproductCard"
                  >
                    <p className="w-25 cfproductName">{value.name}</p>
                    <p className="w-25 cfcardPrice">${value.price}</p>
                    <p className="w-25 cfcardNumber">{value.quantity}</p>
                    <p className="w-25 cfcardTotal">
                      ${value.price * value.quantity}
                    </p>
                  </Col>
                </Row>
              </Container>
            ))}

            <Row className="d-flex discount1">
              <Col xs={7} className="item-content-left m-4 pt-4 discountLeft">
                {courseCoupon.length > 0 ? (

                  <Form.Group>
                    <Form.Control as="select" onChange={(event) => {
                          let index = event.target.selectedIndex
                          setRelCourseCouponId(event.target.value)
                          setCourseDiscount(parseInt(event.target.childNodes[index].getAttribute('data_discount')))
                        }}>
                      <option value="0" data_discount="0">本次消費不使用優惠卷</option>
                    
                      {courseCoupon.map((value, index) => {
                        return (
                          <option　value={value.rel_coupon_member_id} data_discount={
                            props.orderInfo.courseTotal -
                                  parseInt(
                                    props.orderInfo.courseTotal * Number(value.discountMethod)
                                  )}>{value.discountName} 打{value.discountMethod.slice(2,4)}折</option>
                        )
                      })}
                      </Form.Control>
                  </Form.Group>
                ) : (
                  <p>目前沒有可使用的優惠</p>
                )}
              </Col>
              <Col
                xs={12}
                md={4}
                className="d-flex fd-col text-right p-5 discountRight"
              >
                <p className="">課程總金額：${props.orderInfo.courseTotal}</p>
                {courseDiscount !== 0 ? (
                  <p>折扣金額：${courseDiscount} </p>
                ) : (
                  <p>折扣金額：$0 </p>
                )}
                <p className="discountTotal">
                  折扣後總金額：${props.orderInfo.courseTotal - courseDiscount}
                </p>
              </Col>
            </Row>
          </>
        ) : (
          ''
        )}

        <Row className="mr-5">
          <Col className="w-25"></Col>
          <Col className="text-right">
            <p className="orderTotal">
              訂單總金額：$
              {props.orderInfo.courseTotal + props.orderInfo.shopTotal - courseDiscount - shopDiscount}
            </p>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center pt-3 pb-3 mt-5">
          <Button
            className="mt-2 mb-2 nextBtn"
            variant="outline-primary"
            onClick={() => {
              if (courseDiscount !== 0) {
                props.setOrderInfo({relCourseCouponId: relCourseCouponId})
              }
              if (shopDiscount !== 0) {
                props.setOrderInfo({relShopCouponId: relShopCouponId})
              }
              props.setOrderInfo({
                discount: courseDiscount + shopDiscount,
                total: props.orderInfo.courseTotal + props.orderInfo.shopTotal - courseDiscount - shopDiscount
              })
              const path = props.history.location.pathname
              if (path.includes('/mall'))
                props.history.push('/mall/cart/payment')
              else props.history.push('/life/cart/payment')
            }}
          >
            前往付款
          </Button>
        </Row>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  cartItems: selectCartItems(state),
  courseCartItems: selectCourseCartItems(state),
  orderInfo: selectOrderInfo(state),
});

const mapDispatchToProps = dispatch => ({
  setOrderInfo: item => dispatch(setOrderInfo(item))

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartComfirm));
