import React, { Fragment, useState, useEffect } from 'react'
import {
  Table,
  Container,
  Alert,
  Button,
  Form,
  Figure,
  Row,
  Col,
} from 'react-bootstrap'

import { connect } from "react-redux";
import { selectCartItems, selectCourseCartItems, selectOrderInfo } from "../../redux/cart/cartSelector";
import { setOrderInfo, clearAll } from "../../redux/cart/cartAction";
import Cards from 'react-credit-cards';

import { withRouter } from 'react-router-dom'
import '../../styles/carPayment.scss'
import "react-credit-cards/lib/styles.scss"

function CartPayment(props) {
  const [order, setOrder] = useState('')
  const [orderList, setOrderList] = useState('')
  const [orderPayment, setOrderPayment] = useState('')

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [focus, setFocus] = useState('')

  const [orderErrors, setOrderErrors] = useState([])

  const [courseDiscountUpdate, setCourseDiscountUpdate] = useState('')
  const [shopDiscountUpdate, setShopDiscountUpdate] = useState('')

  const [paymentMethod, setPaymentMedthod] = useState('')
  const [member, setMember] = useState([])


 
  const handleInputFocus = (e) => {
    setFocus(e.target.name)
  }
  



  useEffect(() => {
    props.changeBackgroundColorLight()


    const member = JSON.parse(localStorage.getItem('member'))
    setMember(member)

    const relCourseCouponId = props.orderInfo.relCourseCouponId
    const relShopCouponId = props.orderInfo.relShopCouponId

    if (relCourseCouponId !== 0)
      setCourseDiscountUpdate({
        relCouponId: Number(relCourseCouponId),
      })

    if (relShopCouponId !== 0)
      setShopDiscountUpdate({
        relCouponId: Number(relShopCouponId),
      })

    setOrder({
      ...order,
      memberId: member[0].memberId,
      ship_name: member[0].memberName,
      orderPhone: member[0].phone,
      shipCity: member[0].paymentCity,
      shipDistrict: member[0].paymentDistrict,
      shipAddress: member[0].shipAddress,
      shiptotalMoney: Number(props.orderInfo.shipTotal),
      shopDiscount: Number(props.orderInfo.discount),
      totalPrice: Number(props.orderInfo.total),
      paymentStatus: '已付款',
      shipStatus: '未出貨',
      note: props.orderInfo.note,
    })

    let newOrderList = []

    for (let i = 0; i < props.cartItems.length; i++) {
      newOrderList.push({
        itemId: props.cartItems[i].id,
        itemName: props.cartItems[i].name,
        checkPrice: props.cartItems[i].price,
        checkQuantity: props.cartItems[i].quantity,
        checkSubtotal: props.cartItems[i].price * props.cartItems[i].quantity,
      })
    }

    for (let i = 0; i < props.courseCartItems.length; i++) {
      newOrderList.push({
        courseId: props.courseCartItems[i].id,
        courseName: props.courseCartItems[i].name,
        checkPrice: props.courseCartItems[i].price,
        checkQuantity: props.courseCartItems[i].quantity,
        checkSubtotal: props.courseCartItems[i].price * props.courseCartItems[i].quantity,
      })
    }

    setOrderList(newOrderList)

  }, [])

  async function orderSuccessCallback() {
    console.log('callback')
    await insertOrderPaymentToSever(order, orderList, orderPayment)
    if (courseDiscountUpdate !== '')
      await updateDiscountToSever(courseDiscountUpdate)
  }

  function validate() {
    let errors = []
    let cardMatch = number.match(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4,9}$/)
    let closingDateMatch = expiry.match(/^[0-9]{2}\/[0-9]{2}$/)
    let cvvMatch = cvc.match(/^[0-9]{3}$/)

    if (
      name === '' ||
      number === '' ||
      expiry === '' ||
      cvc === ''
    ) {
      errors.push('您有尚未填寫的欄位')
    }

    if (
      name !== '' &&
      number !== '' &&
      expiry !== '' &&
      cvc !== ''
    ) {
      if (cardMatch === null) {
        errors.push('卡號格式有誤')
      } else {
        if (closingDateMatch === null) {
          errors.push('到期日格式有誤')
        } else {
          if (cvvMatch === null) {
            errors.push('cvv格式有誤')
          }
        }
      }
    }

    if (errors.length > 0) {
      setOrderErrors(errors)
      return
    }
    setOrderErrors([])
  }

  async function updateDiscountToSever(item) {
    const request = new Request('http://localhost:3002/order/discountUse', {
      method: 'PUT',
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

  async function insertOrderPaymentToSever(item, item2, item3) {
    let email = ""
    if (member.length > 0) email = member[0].email

    const request = new Request(
      'http://localhost:3002/order/insertOrderPaymentAndSendMail',
      {
        method: 'POST',
        body: JSON.stringify({
          item: item,
          item2: item2,
          item3: item3,
          email: email,
        }),
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

  async function insertOrderToSever(item, item2) {
    let email = ""
    if (member.length > 0) email = member[0].email

    const request = new Request(
      'http://localhost:3002/order/insertOrderAndSendMail',
      {
        method: 'POST',
        body: JSON.stringify({
          item: item,
          item2: item2,
          email: email,
        }),
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )

    console.log('After JSON: ', JSON.stringify(item))
    console.log('After JSON: ', JSON.stringify(item2))

    const response = await fetch(request)
    const data = await response.json()

    console.log(data)

    // const id = data.results.insertId
    // await setInsertId(id)
  }

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
      <Container className="w-75 d-flex fd-col">
        <div className="d-flex justify-content-between">
          <Figure>
            <Figure.Image
              width={180}
              height={180}
              alt="貨到付款"
              value="貨到付款"
              src="/payment/貨到付款.png"
            />
            <Figure.Caption>貨到付款</Figure.Caption>
          </Figure>
          <Figure>
            <Figure.Image
              width={180}
              height={180}
              alt="ATM轉帳"
              value="ATM轉帳"
              src="/payment/ATM轉帳.png"
            />
            <Figure.Caption>ATM轉帳</Figure.Caption>
          </Figure>
          <Figure>
            <Figure.Image
              width={180}
              height={180}
              alt="LinePay"
              value="LinePay"
              src="/payment/linePay.png"
            />
            <Figure.Caption>Line Pay</Figure.Caption>
          </Figure>
          <Figure>
            <Figure.Image
              width={180}
              height={180}
              alt="信用卡"
              value="信用卡"
              src="/payment/信用卡.png"
            />
            <Figure.Caption>信用卡</Figure.Caption>
          </Figure>
        </div>
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Form.Group
            style={{transform: "translateX(-27px)"}}
            className="text-center w-50"
            controlId="exampleForm.ControlSelect1"
          >
            <Form.Label className="labelTxt labelSize">
              請選擇付款方式
            </Form.Label>
            <Form.Control
              style={{transform: "translateX(-4px)"}}
              className="paymentOption w-40"
              as="select"
              onChange={(event) => {
                console.log(event.target.value)
                setPaymentMedthod(event.target.value)
                if (event.target.value !== '信用卡') {
                  setOrder({
                    ...order,
                    paymentStatus: '未付款',
                    paymentMethod: event.target.value,
                  })
                } else {
                  setOrder({
                    ...order,
                    paymentStatus: '已付款',
                    paymentMethod: event.target.value,
                  })
                }
              }}
            >
              <option value="">請選擇付款方式</option>
              <option value="ATM轉帳">ATM 轉帳</option>
              <option value="貨到付款">貨到付款</option>
              <option value="信用卡">信用卡</option>
              <option value="LinePay">LINE PAY</option>
            </Form.Control>
          </Form.Group>
        </div>
      </Container>

      <Container className="w-75">
        {paymentMethod === '信用卡' ? (
          <>

          <div id="PaymentForm">
            <Cards
              cvc={cvc}
              expiry={expiry}
              focused={focus}
              name={name}
              number={number}
            />
            <form className="mt-5">
            <Fragment>
              <Row>
                <Container
                  className="w-100 paymentFormBg mt-0 mb-0"
                  style={{ padding: '50px 100px' }}
                >
                  <Col xs="12">
                    <div className="form-group">
                      <label className="labelTxt" htmlFor="example3">
                        持卡人姓名：
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        className="form-control form-control-sm inputBg"
                        placeholder="請輸入姓名"
                        onFocus={handleInputFocus}
                        onChange={(event) => {
                          setName(event.target.value)
                          setOrderPayment({
                            ...orderPayment,
                            orderPaymentName: event.target.value,
                          })
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs="12">
                    <div className="form-group">
                      <label className="labelTxt" htmlFor="example3">
                        卡號：
                      </label>
                      <input
                        type="tel"
                        name="number"
                        id="card"
                        value={number}
                        className="form-control form-control-sm inputBg"
                        placeholder="請輸入格式 xxxx xxxx xxxx xxxx"
                        onFocus={handleInputFocus}
                        minLength="19"
                        maxLength="21"
                        onChange={(event) => {
                          setNumber(event.target.value)
                          setOrderPayment({
                            ...orderPayment,
                            orderPaymentCard: event.target.value,
                          })
                        }}
                      />
                    </div>
                  </Col>
                  <div className="cvv d-flex justify-content-between">
                    <Col xs="12" md="6">
                      <div className="form-group w-40">
                        <label className="labelTxt" htmlFor="example3">
                          到期日：
                        </label>
                        <input
                          type="tel"
                          name="expiry"
                          id="closingDate"
                          value={expiry}
                          className="form-control form-control-sm inputBg"
                          placeholder="請輸入格式 xx/xx"
                          onFocus={handleInputFocus}
                          maxLength="5"
                          onChange={(event) => {
                            setExpiry(event.target.value)
                            setOrderPayment({
                              ...orderPayment,
                              closingDate: event.target.value,
                            })
                          }}
                        />
                      </div>
                    </Col>
                    <Col xs="12" md="6">
                      <div className="form-group w-40">
                        <label className="labelTxt" htmlFor="example3">
                          cvc / cvv：
                        </label>
                        <input
                          type="tel"
                          name="cvc"
                          id="cvv"
                          value={cvc}
                          className="form-control form-control-sm inputBg"
                          placeholder="請輸入格式 xxx"
                          onFocus={handleInputFocus}
                          maxLength="3"
                          onChange={(event) => {
                            setCvc(event.target.value)
                            setOrderPayment({
                              ...orderPayment,
                              cvv: event.target.value,
                            })
                          }}
                        />
                      </div>
                    </Col>
                  </div>
                </Container>
              </Row>
            </Fragment>
            </form>
          </div>

          {orderErrors.length > 0 ? (
              <>
                {orderErrors.map((v, i) => (
                  <Alert
                    className="d-flex justify-content-center mt-3"
                    variant="danger"
                    key={i}
                  >
                    {v}
                  </Alert>
                ))}
              </>
            ) : (
              ''
            )}

            <div className="d-flex justify-content-center pt-3 pb-3 mt-5">
              <Button
                className="mt-2 mb-2 nextBtn"
                variant="outline-primary"
                onMouseDown={async () => {
                  await validate()
                }}
                onMouseUp={async () => {
                  if (orderErrors.length === 0) {
                    await orderSuccessCallback()
                    if (shopDiscountUpdate !== '') {
                      await updateDiscountToSever(shopDiscountUpdate)
                    }
                  }
                }}
                onClick={async () => {
                  if (orderErrors.length === 0) {
                    const path = props.history.location.pathname
                    if (path.includes('/mall'))
                      props.history.push('/mall/cart/complete')
                    else props.history.push('/life/cart/complete')

                    props.clearAll()
                  }
                }}
              >
                前往付款
              </Button>
            </div>
          </>
        ) : (
          ''
        )}

        {paymentMethod !== '' && paymentMethod !== '信用卡' ? (
          <div className="d-flex justify-content-center pt-3 pb-3 mb-5 btn-trans">
            <Button
              className="mt-2 mb-2 nextBtn"
              variant="outline-primary"
              onMouseDown={async () => {
                await insertOrderToSever(order, orderList)
                if (courseDiscountUpdate !== '')
                  await updateDiscountToSever(courseDiscountUpdate)
              }}
              onMouseUp={async () => {
                if (shopDiscountUpdate !== '') {
                  await updateDiscountToSever(shopDiscountUpdate)
                }
              }}
              onClick={async () => {
                const path = props.history.location.pathname
                if (path.includes('/mall'))
                  props.history.push('/mall/cart/complete')
                else props.history.push('/life/cart/complete')

                props.clearAll()

              }}
            >
              前往付款
            </Button>
          </div>
        ) : (
          ''
        )}
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
  setOrderInfo: item => dispatch(setOrderInfo(item)),
  clearAll: () => dispatch(clearAll())
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPayment));
