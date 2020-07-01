import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, Image, Button } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'

import { connect } from "react-redux";
import { selectCartItems, selectCourseCartItems, selectCartShipTotal } from "../../redux/cart/cartSelector";
import { clearItem, clearCourseItem, addItem, addCourseItem, removeItem, removeCourseItem, setOrderInfo } from "../../redux/cart/cartAction";

import { GrFormSubtract, GrFormAdd } from 'react-icons/gr'
import { FaUndo } from 'react-icons/fa'
import { BsFillPlayFill, BsX } from 'react-icons/bs'
import '../../styles/cart.scss'

function Cart(props) {
  const [member, setMember] = useState([])

  useEffect(() => {
    props.setIsLoading(true)
    props.changeBackgroundColorLight()

    const member = JSON.parse(localStorage.getItem('member')) || [
      { memberName: '' },
    ]

    setMember(member)
    props.setIsLoading(false)
  }, [])


  

  // 計算總價用的函式
  function sum(items) {
   return items.reduce((currentCount, item) => currentCount + item.quantity * item.price ,0)
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
      <div className="w-75 d-flex justify-content-end">
        {props.history.location.pathname.includes('/mall') ? (
          <Link to="/mall/shop" onClick={() => localStorage.setItem('page', 1)}>
            繼續購物 <FaUndo />
          </Link>
        ) : (
          <Link
            to="/life/course"
            onClick={() => localStorage.setItem('page', 1)}
          >
            繼續購物 <FaUndo />
          </Link>
        )}
      </div>
      {props.cartItems.length > 0 ? (
        <Container>
          <h5>
            <BsFillPlayFill />
            購買的商品
          </h5>
          <Row>
            <Col xs={12} md={9} className="d-flex fd-col">
              <Table responsive>
                <thead
                  style={{
                    borderTop: '2px solid #596336',
                    borderBottom: '2px solid #596336',
                  }}
                >
                  <tr>
                    <th className="w-50">商品</th>
                    {/*  */}
                    <th className="thPrice">價格</th>
                    <th className="thNumber">數量</th>
                    <th className="thTotal">小計</th>
                  </tr>
                </thead>
              </Table>
              {props.cartItems.map((value) => (
                <Container className="mt-0 m-3">
                  <Row>
                    <Col xs={4} md={3}>
                      <Image
                        width={100}
                        height={100}
                        src={`/items/${value.img}`}
                        alt={value.img}
                        className="cart-img-hover"
                        onClick={()=>props.history.push(`/mall/itemDetail/shop/categoryId=1?itemId=${value.id}`)}
                      />
                    </Col>
                    <Col xs={8} md={9}>
                      <Row className="d-flex justify-content-between productCard">
                        <p className="w-25 productName">{value.name}</p>
                        <p className="w-20 text-center cardPrice">
                          ${value.price}
                        </p>
                        <p className="w-20 text-center cardNumber">
                          <GrFormSubtract
                            type="button"
                            className="countBtn"
                            onClick={() =>{
                              if(value.quantity > 1){
                              props.removeItem({
                                id: value.id,
                              })}
                            }}
                          />{' '}
                          {value.quantity}{' '}
                          <GrFormAdd
                            type="button"
                            className="countBtn"
                            onClick={() =>
                              props.addItem({
                                id: value.id,
                              })
                            }
                          />
                        </p>
                        <p className="w-20 text-right cardTotal">
                          ${value.price * value.quantity}
                        </p>
                        <p
                          className="text-right cross"
                          onClick={() =>
                            props.clearItem({
                              id: value.id,
                            })
                          }
                        >
                          <BsX type="button"></BsX>
                        </p>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              ))}
            </Col>

            <Col xs={12} md={3} className="d-flex fd-col pl-5">
              <Table>
                <thead
                  style={{
                    borderTop: '2px solid #596336',
                    borderBottom: '2px solid #596336',
                  }}
                >
                  <tr>
                    <th style={{ textAlign: 'center' }}>總計</th>
                  </tr>
                </thead>
              </Table>
              <div className="totalCard">
                <h6 style={{ marginBottom: '60px' }}>商品總金額</h6>
                <h5>小計 ${sum(props.cartItems)}</h5>
                <h5 style={{ color: '#BF8C60' }}>
                  運費 ${props.shipTotal}
                </h5>
                <hr style={{ backgroundColor: '#596336' }} className="mt-5" />
                <h5>
                  總金額 ${sum(props.cartItems) + props.shipTotal}
                </h5>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        ''
      )}

      {props.courseCartItems.length > 0 ? (
        <Container>
          <h5>
            <BsFillPlayFill />
            購買的課程
          </h5>
          <Row>
            <Col xs={12} md={9} className="d-flex fd-col">
              <Table responsive>
                <thead
                  style={{
                    borderTop: '2px solid #596336',
                    borderBottom: '2px solid #596336',
                  }}
                >
                  <tr>
                    <th className="w-50">課程</th>
                    <th className="thPrice">價格</th>
                    <th className="thNumber">數量</th>
                    <th className="thTotal">小計</th>
                  </tr>
                </thead>
              </Table>
              {props.courseCartItems.map((value) => (
                <Container className="mt-0 m-3">
                  <Row>
                    <Col xs={4} md={3}>
                      <Image
                        width={100}
                        height={100}
                        src={`/items/${value.img}`}
                        alt={value.img}
                        onClick={()=>props.history.push(`/life/courseDetail/course/new?courseId=${value.id}`)}
                        className="cart-img-hover"
                      />
                    </Col>
                    <Col xs={8} md={9}>
                      <Row className="d-flex justify-content-between productCard">
                        <p className="w-25 productName">{value.name}</p>
                        <p className="w-20 text-center cardPrice">
                          ${value.price}
                        </p>
                        <p className="w-20 text-right cardNumber">
                          <GrFormSubtract
                            type="button"
                            className="countBtn"
                            onClick={() =>{
                              if(value.quantity > 1){
                                props.removeCourseItem({
                                  id: value.id,
                                })}                           
                            }}
                          />{' '}
                          {value.quantity}{' '}
                          <GrFormAdd
                            type="button"
                            className="countBtn"
                            onClick={() =>
                              props.addCourseItem({
                                id: value.id,
                              })
                            }
                          />
                        </p>
                        <p className="text-right cardTotal">
                          ${value.price * value.quantity}
                        </p>
                        <p
                          className="text-right cross"
                          onClick={() =>
                            props.clearCourseItem({
                              id: value.id,
                            })
                          }
                        >
                          <BsX type="button"></BsX>
                        </p>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              ))}
            </Col>

            <Col xs={12} md={3} className="d-flex fd-col pl-5">
              <Table>
                <thead
                  style={{
                    borderTop: '2px solid #596336',
                    borderBottom: '2px solid #596336',
                  }}
                >
                  <tr>
                    <th style={{ textAlign: 'center' }}>總計</th>
                  </tr>
                </thead>
              </Table>
              <div className="totalCard">
                <h6 style={{ marginBottom: '60px' }}>課程總金額</h6>
                <h5>小計 ${sum(props.courseCartItems)}</h5>
                <h5 style={{ color: '#BF8C60' }}>&nbsp;</h5>
                <hr style={{ backgroundColor: '#596336' }} className="mt-5" />
                <h5>總金額 ${sum(props.courseCartItems)}</h5>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        ''
      )}

      {props.cartItems.length <= 0 && props.courseCartItems.length <= 0 ? (
        <div className="d-flex justify-content-center cartPageSize">
          <h2 className="cartMargin">購物車沒有東西</h2>
        </div>
      ) : (
        ''
      )}

      {props.cartItems.length > 0 || props.courseCartItems.length > 0 ? (
        <Container>
          <Row className="d-flex justify-content-center pt-3 pb-3">
            <Button
              className="mt-2 mb-2 nextBtn"
              variant="outline-primary"
              onClick={() => {
                console.log(member)
                if (member[0].memberName === '') {
                  const path = props.history.location.pathname
                  if (path.includes('/mall')) props.history.push('/mall/login')
                  else props.history.push('/life/login')
                } else {

                  props.setOrderInfo({
                    shipTotal: props.shipTotal,
                    shopTotal: sum(props.cartItems) + props.shipTotal,
                    courseTotal: sum(props.courseCartItems)
                  })

                  const path = props.history.location.pathname
                  if (path.includes('/mall'))
                    props.history.push('/mall/cart/comfirm')
                  else props.history.push('/life/cart/comfirm')
                }
              }}
            >
              去買單
            </Button>
          </Row>
        </Container>
      ) : (
        ''
      )}
    </>
  )
}

const mapStateToProps = state => ({
  cartItems: selectCartItems(state),
  courseCartItems: selectCourseCartItems(state),
  shipTotal: selectCartShipTotal(state),
});

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItem(item)),
  clearCourseItem: item => dispatch(clearCourseItem(item)),
  addCourseItem: item => dispatch(addCourseItem(item)),
  addItem: item => dispatch(addItem(item)),
  removeCourseItem: item => dispatch(removeCourseItem(item)),
  removeItem: item => dispatch(removeItem(item)),
  setOrderInfo: item => dispatch(setOrderInfo(item))

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
