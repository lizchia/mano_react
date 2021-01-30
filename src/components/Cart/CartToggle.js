import React from "react";
import { Table, Container, Row, Col, Image, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { toggleCartHidden } from "../../redux/cart/cartAction";

import { connect } from "react-redux";
import { selectCartItems, selectCourseCartItems } from "../../redux/cart/cartSelector";
import { clearItem, clearCourseItem } from "../../redux/cart/cartAction";

import { GrFormSubtract, GrFormAdd } from 'react-icons/gr'
import { FaUndo } from 'react-icons/fa'
import { BsFillPlayFill, BsX } from 'react-icons/bs'
import "../../styles/cartToggle.scss"
import "../../styles/cart.scss"


function CartToggle(props) {
  
    
    return(
        <>
        <div className="trans-5s" style={{position: "relative",zIndex: "1001"}}>
            <div className="cartToggle-box">
            {props.cartItems.length > 0 ? (
        <Container>
          <p>
            <BsFillPlayFill />
            購買的商品
          </p>
          <Row>
            <Col className="d-flex fd-col">
              <Table responsive>
                <thead
                  style={{
                    borderTop: '2px solid #596336',
                    borderBottom: '2px solid #596336',
                  }}
                >
                  <tr>
                    <th className="w-25">商品</th>
                    {/*  */}
                    <th className="w-25">價格</th>
                    <th className="w-25">數量</th>
                    <th className="w-25">小計</th>
                  </tr>
                </thead>
              </Table>
              {props.cartItems.map((value) => (
                  <Row className="mb-2 d-flex align-items-center">
                    <div className="ml-3">
                      <Image
                        width={50}
                        height={50}
                        src={`/items/${value.img}`}
                        alt={value.img}
                      />
                      </div>
                      <div className="d-flex align-items-center" style={{width: "72%", position: "relative"}}>
                        <p className="ml-3">
                          ${value.price}
                        </p>
                        <p className="ml-4 mr-2">
                          {value.quantity}
                        </p>
                        <p className="w-25 ml-4">
                          ${value.price * value.quantity}
                        </p>
                        <p
                          style={{position: "absolute", right: "-17px", top: "-3px", color: "red", fontSize: "20px"}}
                          onClick={() =>
                            props.clearItem({
                              id: value.id,
                            })
                          }
                        >
                          <BsX type="button"></BsX>
                        </p>                    
                    </div>
                  </Row>
              ))}
            </Col>
          </Row>
          </Container>
            ) : "" }

            {props.courseCartItems.length > 0 ? (
        <Container className="mt-3">
          <p>
            <BsFillPlayFill />
            購買的課程
          </p>
          <Row>
            <Col className="d-flex fd-col">
              <Table responsive>
                <thead
                  style={{
                    borderTop: '2px solid #596336',
                    borderBottom: '2px solid #596336',
                  }}
                >
                  <tr>
                    <th className="w-25">課程</th>
                    <th className="w-25">價格</th>
                    <th className="w-25">數量</th>
                    <th className="w-25">小計</th>
                  </tr>
                </thead>
              </Table>
              {props.courseCartItems.map((value) => (
                  <Row className="mb-2 d-flex align-items-center">
                    <div className="ml-3">
                      <Image
                        width={50}
                        height={50}
                        src={`/items/${value.img}`}
                        alt={value.img}
                      />
                    </div>
                    <div className="d-flex align-items-center" style={{width: "72%", position: "relative"}}>
                        <p className="ml-3">
                          ${value.price}
                        </p>
                        <p className="ml-4 mr-2">
                          {value.quantity}
                        </p>
                        <p className="ml-4 w-25">
                          ${value.price * value.quantity}
                        </p>
                        <p
                          style={{position: "absolute", right: "-20px", top: "-3px", color: "red", fontSize: "20px"}}
                          onClick={() =>
                            props.clearCourseItem({
                              id: value.id
                            })
                          }
                        >
                          <BsX type="button"></BsX>
                        </p>
                        </div>
                      </Row>
              ))}
            </Col>
            </Row>
          </Container>
            ) : "" }

            {props.cartItems.length <= 0 && props.courseCartItems.length <= 0 ? (
        <div className="d-flex justify-content-center">
          <h4 className="cartMargin">購物車沒有東西</h4>
        </div>
      ) : (
        ''
      )}

      {props.cartItems.length > 0 || props.courseCartItems.length > 0 ? (
        <Container>
          <Row className="d-flex justify-content-center pt-3 pb-3">
            <Button
              className="mt-2 cartToggle-btn"
              variant="outline-primary"
              onClick={() => {
                  props.toggleCartHidden()
                  const path = props.history.location.pathname
                  if (path.includes('/mall'))
                    props.history.push('/mall/cart')
                  else props.history.push('/life/cart')
                
              }}
            >
              前往購物車
            </Button>
          </Row>
        </Container>
      ) : (
        ''
      )}

            </div>
        </div>
        </>
    )
}


const mapStateToProps = state => ({
  cartItems: selectCartItems(state),
  courseCartItems: selectCourseCartItems(state)

});

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItem(item)),
  clearCourseItem: item => dispatch(clearCourseItem(item)),
  toggleCartHidden: () => dispatch(toggleCartHidden())

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartToggle));
