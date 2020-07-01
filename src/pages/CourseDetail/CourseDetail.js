import React, { Component } from 'react'
import { connect } from "react-redux";
import { addCourseItem } from "../../redux/cart/cartAction";

import {
  Modal,
  Button,
  ListGroupItem,
  Card,
  ListGroup,
  Input,
  InputGroup,
  FormControl,
  Col,
  Row
} from 'react-bootstrap'
import {
  Magnifier,
  GlassMagnifier,
  MagnifierContainer,
  SideBySideMagnifier,
  MagnifierPreview,
  MagnifierZoom,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

import { withRouter } from 'react-router-dom'
import './courseDetail-style.css'
import CsMyBreadcrumb from '../../components/CsMyBreadcrumb'
import CsCategoryBar from '../../components/CsCategoryBar'
import { BsFillPlayFill } from 'react-icons/bs'
// import Detail from '../../components/Course/Detail'


class CourseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      totalPages: '',
      search: '',
      page: 1,
      mycart: [],
      dataLoading: false,
      show: false,
      productName: '',
      showPage: true,
      single: [],
      amount: 1,
      related1: [],
      related2: [],
      related3: [],
      width:(window.innerWidth),
    }
  }

  //加入購物車
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })


  //單一商品
  getItemsDetail = async () => {
    console.log('detail!!')
    let params = new URLSearchParams(this.props.location.search)
    let courseId = Number(params.get('courseId'))

    const response = await fetch(
      `http://localhost:3002/courses`
      //${this.state.catIds}/${currentPage}
    )

    const json = await response.json()
    const allData = json.allData
    const single = allData[courseId - 1]
    const related1 = allData[courseId]
    const related2 = allData[courseId + 1]
    const related3 = allData[courseId + 2]

    console.log(allData)


    this.setState({
      single: single,
      related1: related1,
      related2: related2,
      related3: related3,
    })

    // console.log(totalPages)
    console.log(this.state.single)
    return this.state.data
  }

  async componentDidMount() {
    this.props.changeBackgroundColorLight()
    await this.getItemsDetail()
    window.addEventListener("resize", ()=>{
      let width = window.innerWidth;
      this.setState({width : width})
    })
  }

  render() {
    const messageModal = (
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>加入購物車訊息</Modal.Title>
        </Modal.Header>
        <Modal.Body>產品：{this.state.productName} 已成功加入購物車</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            繼續購物
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const path = this.props.history.location.pathname
              if (path.includes("/mall")) this.props.history.push("/mall/cart")
              else this.props.history.push("/life/cart")

            }}
          >
            前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <>
        <div className="container">
          {messageModal}
          <div className="course-tools" style={{ paddingTop: '12px', justifyContent:"center" }}>
            <CsMyBreadcrumb />
          </div>
          <Row>
          <Col xs={12} md={12}>
              <Row>
              <Col xs={0} md={2} style={{ marginTop:"-8%", marginRight:"5%" }}>
              {this.state.width <= 900 ? (
                  ''
                ) : (
                  <CsCategoryBar />
                )}
                </Col>
                <Col xs={12} md={6}>
                <div className="img-wrap">
                  <img
                    className="detail-top-img"
                    src={`/courses/${this.state.single.courseImg}`}
                    alt={this.state.single.courseImg}
                  />
                  </div>
                   <p className="course-desc-detail">{this.state.single.courseDesc}</p>
                 
                </Col>
                <Col xs={12} md={3}>
                  <Card style={{ width: '350px', height: '100%' }}>
                    <Card.Body>
                      <Card.Title>
                        <h3 className="name">{this.state.single.courseName}</h3>
                      </Card.Title>
                      <Card.Text className="course-card-content">
                        <div className="people">
                          <p>人數上限：{this.state.single.courseQty}</p>
                          <p>日期 : {this.state.single.coursePeriod}</p>
                        </div>
                        <div className="course-score" style={{ display:"flex" }}><p>抹の度 :&nbsp;</p><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
                        <div className="course-score" style={{ display:"flex" }}><p>職人推薦 :&nbsp;</p><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>

                      </Card.Text>
                    </Card.Body>

                    <ListGroup>
                      <ListGroupItem>
                        <h1 className="course-price-detail">$ {this.state.single.coursePrice}</h1>
                      </ListGroupItem>

                      <ListGroupItem>
                        <InputGroup className="mb-3">
                          <InputGroup.Append>
                            <Button
                              className="course-btn"
                              onClick={() =>
                                this.setState({
                                  amount: this.state.amount - 1
                                })
                              }
                            >
                              -
                            </Button>
                          </InputGroup.Append>
                          <FormControl
                            style={{
                              textAlign: 'center',
                            }}
                            onChange={(event) => {
                              this.setState({ amount: event.target.value })
                            }}
                            value={this.state.amount < 1 ? 1 : this.state.amount}
                          />
                          <InputGroup.Append>
                            <Button
                              className="course-btn"
                              onClick={() =>
                                this.setState({ amount: this.state.amount + 1 })
                              }
                            >
                              +
                    </Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </ListGroupItem>
                    </ListGroup>

                    <Card.Body className="cart">
                      <Card.Link>
                        <Button
                          className="course-add-cart course-btn"
                          id="btns1"
                          onClick={() => {
                            for(let i=0; i < this.state.amount; i++){
                              this.props.addCourseItem({
                                id: this.state.single.courseId,
                                img: this.state.single.courseImg,
                                name: this.state.single.courseName,
                                price: this.state.single.coursePrice,
                              })}
                              this.setState({
                                productName: this.state.single.courseName,
                              })
                              this.handleShow()

                          }}
                        >
                          add to cart
                          <i class="fas fa-shopping-cart" style={{ marginLeft: '8px' }}></i>
                </Button>
                      </Card.Link>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={12} md={12} style={{ margin: '2.5% 0' }}>
                  <h4 style={{ width: '100%' }}><BsFillPlayFill />課程內容</h4><h6>&nbsp;&nbsp;&nbsp;&nbsp;MANO Course</h6>
                  <Card body>
                  從抹茶的淵源歷史到抹茶的品種栽種、製作，到抹茶的沖刷、品嘗方法，三日月茶空間(抹茶體驗課程)，將帶領您體驗抹茶的美妙世界。<br/>
                  課程內容：<br/>
                    1，品嘗三種來自於京都知名的宇治抹茶產區，不同等級的抹茶。<br/>
                    2，練習使用茶道具刷出茶泡綿密的抹茶(三碗)。<br/>
                    3，搭配當季上生菓子一份(口味、造型由茶師決定)。<br/>
                    </Card>
                </Col>
                <Col xs={12} md={12} style={{ margin: '2.5% 0' }}>
                  <h4 style={{ width: '100%' }}><BsFillPlayFill />報名方法</h4><h6>&nbsp;&nbsp;&nbsp;&nbsp;How To Register</h6>
                  <Card body>
                  可電話02-28760995報名，或是粉絲頁私訊報名，或是三日月茶空間現場報名。報名後必須繳清1200元費用，即可完成報名。
                  </Card>
                </Col>
                <Col xs={12} md={12} style={{ margin: '2.5% 0' }}>
                  <h4 style={{ width: '100%' }}><BsFillPlayFill />報名須知</h4><h6>&nbsp;&nbsp;&nbsp;&nbsp;You Must Know</h6>
                  <Card body>每班課程以6～8人為限，滿6人即確定開課，若報名人數未滿6人，則課程取消，費用無息退還；若您報名後臨時有事，上課當日不克前來上課，恕無法退還費用或更改日期，但可以轉讓于別人來上課。當日上課的同學在店內消費或外帶均有九折優惠。</Card>
                </Col>
                <Col xs={12} md={12} style={{ margin: '2.5% 0' }}>
                  <div>
                    <div ><h4><BsFillPlayFill />為您推薦</h4><h6>&nbsp;&nbsp;&nbsp;&nbsp;MANO Recommended</h6></div>
                    <div style={{ display: "flex" }}>
                      <Card
                        style={{ height: '12rem', width: '10rem', margin: '10px' }}
                      >
                        <Card.Body className="course-recom-cardBody">
                          <Card.Link
                            href={`/life/courseDetail${this.state.related1.linkUrl}/categoryId=${this.state.related1.categoryId}?courseId=${this.state.related1.courseId}`}>
                            <img
                              className="course-img-detail"  
                              src={`/courses/${this.state.related1.courseImg}`}
                              alt={this.state.related1.courseImg}
                            />
                            <Card.Title>
                              <h6 className="recom-name">{this.state.related1.courseName}</h6>
                            </Card.Title>
                            <Card.Title>
                              <h6 className="more">learn more</h6>
                            </Card.Title>
                          </Card.Link>
                        </Card.Body>
                      </Card>
                      <Card style={{ height: '12rem', width: '10rem', margin: '10px' }}>
                        <Card.Body className="course-recom-cardBody">
                          <Card.Link
                            href={`/life/courseDetail${this.state.related2.linkUrl}/categoryId=${this.state.related2.categoryId}?courseId=${this.state.related2.courseId}`}>
                            <img
                              className="course-img-detail"
                              src={`/courses/${this.state.related2.courseImg}`}
                              alt={this.state.related2.courseImg}
                            />


                            <Card.Title>
                              <h6 className="recom-name">{this.state.related2.courseName}</h6>
                            </Card.Title>
                            <Card.Title>
                              <h6 className="more">learn more</h6>
                            </Card.Title>
                          </Card.Link>
                        </Card.Body>
                      </Card>
                      <Card style={{ height: '12rem', width: '10rem', margin: '10px' }}>
                        <Card.Body className="course-recom-cardBody">
                          <Card.Link
                            href={`/life/courseDetail${this.state.related3.linkUrl}/categoryId=${this.state.related3.categoryId}?courseId=${this.state.related3.courseId}`}>
                            <img
                              className="course-img-detail"
                              src={`/courses/${this.state.related3.courseImg}`}
                              alt={this.state.related3.courseImg}
                            />

                            <Card.Title>
                              <h6 className="recom-name">{this.state.related3.courseName}</h6>
                            </Card.Title>
                            <Card.Title>
                              <h6 className="more">learn more</h6>
                            </Card.Title>
                          </Card.Link>
                        </Card.Body>
                      </Card>

                    </div>
                  </div>
                </Col>
              </Row>
            </Col>


          </Row>
        </div>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addCourseItem: item => dispatch(addCourseItem(item))
})

export default withRouter(connect(null, mapDispatchToProps)(CourseDetail));