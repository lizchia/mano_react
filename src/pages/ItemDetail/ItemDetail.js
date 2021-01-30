import React, { Component } from 'react'
import {
  Modal,
  Button,
  Image,
  InputGroup,
  Col,
  Card,
  Container,
  Row,
  ListGroup,
  ListGroupItem,
  FormControl,
} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import './ItemDetail-style.css'
import DetailBreadcrumb from '../../components/DetailBreadcrumb'
import { FaFacebookSquare, FaLine } from 'react-icons/fa'
import CategoryBar from '../../components/CategoryBar'
import { BsFillPlayFill } from 'react-icons/bs'

class ItemDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      totalPages: '',
      searchValue: '',
      page: 1,
      mycart: [],
      dataLoading: false,
      show: false,
      productName: '',
      catIds: '',
      catData: [],
      showPage: true,
      single: [],
      related1: [],
      related2: [],
      related3: [],
      amount: 1,
    }
  }

  //加入購物車
  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  updateCartToLocalStorage = (value) => {
    // 開啟載入指示
    //setDataLoading(true)

    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    // console.log('currentCart', currentCart)

    const newCart = [...currentCart, value]
    localStorage.setItem('cart', JSON.stringify(newCart))

    // console.log('newCart', newCart)
    // 設定資料

    this.setState({
      mycart: newCart,
      productName: value.name,
    })
    this.handleShow()
    //alert('已成功加入購物車')
  }
  //加入購物車 end

  //fetch 商品
  getItemsData = async () => {
    let currentPage = localStorage.getItem('page') || 1
    const response = await fetch(
      `http://localhost:3002/items/${this.state.catIds}/${currentPage}`
      //${this.state.catIds}/${currentPage}
    )
    console.log(this.state.catIds)

    const json = await response.json()
    const items = json.rows
    const allData = json.allData
    const totalPages = json.totalPages
    const totalRows = json.totalRows

    // const single = allData[3]
    // console.log(allData[0])

    this.setState({
      data: items,
      totalPages: totalPages,
      totalRows: totalRows,
    })
    // console.log(totalPages)
    console.log(this.state.data)
    return this.state.data
  }

  //單一商品
  getItemsDetail = async () => {
    console.log('detail!!')
    let params = new URLSearchParams(this.props.location.search)
    let itemId = Number(params.get('itemId'))

    const response = await fetch(
      `http://localhost:3002/items`
      //${this.state.catIds}/${currentPage}
    )

    const json = await response.json()
    const allData = json.allData
    const single = allData[itemId - 3]
    const related1 = allData[itemId]
    const related2 = allData[itemId + 1]
    const related3 = allData[itemId + 2]

    console.log(allData)

    this.setState({
      single: single,
      related1: related1,
      related2: related2,
      related3: related3,
    })

    // console.log(totalPages)
    console.log(this.state.data)
    return this.state.data
  }

  async componentDidMount() {
    this.props.changeBackgroundColorLight()
    let params = new URLSearchParams(this.props.location.search)
    let catIdParams = params.get('categoryId')
    if (catIdParams) {
      await this.setState({
        catIds: (this.state.catIds += catIdParams),
      })

      // await this.getRecursiveCategoryIds(catIdParams)
    }

    await this.getItemsData()
    await this.getItemsDetail()
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
              if (path.includes('/mall')) this.props.history.push('/mall/cart')
              else this.props.history.push('/life/cart')
            }}
          >
            前往購物車結帳
          </Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <>
        <div
          style={{
            background: 'url(/bg-pattern.svg) repeat',
            position: ' fixed',
            left: '0',
            top: '0',
            width: '30vw',
            height: '100vh',
            opacity: '0.2',
            zIndex: '-1',
          }}
        ></div>
        <div className="container">
          {messageModal}
          <div className="tools" style={{ marginLeft: '70px' }}>
            <DetailBreadcrumb />
          </div>

          <Container class="d-flex justify-content-between">
            <Row>
              <Col xs={2} md={2}>
                <CategoryBar />
              </Col>
              <Col xs={12} md={1}></Col>
              <Col xs={12} md={9}>
                <Row>
                  <Col xs={12} md={6}>
                    <Image
                      src={`/items/${this.state.single.itemImg}`}
                      alt={this.state.single.itemImg}
                      thumbnail
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <Card class="d-flex">
                      <Card.Body className="card-detail">
                        <Card.Title
                          style={{
                            fontSize: '36px',
                            textAlign: 'center',
                          }}
                        >
                          {this.state.single.itemName}
                        </Card.Title>
                        {/* <Card.Text
                          style={{
                            fontSize: '15px',
                            color: '#999',
                            marginLeft: '25px',
                          }}
                        >
                          {this.state.single.itemDescription}
                        </Card.Text> */}

                        {/* <div className="link1">
                          <a href="http://www.facebook.com">
                            <FaFacebookSquare
                              style={{
                                fontSize: '40px',
                              }}
                            />
                          </a>
                        </div>
                        <div className="link2">
                          <a href="https://line.me/zh-hant/">
                            <FaLine
                              style={{
                                fontSize: '40px',
                              }}
                            />
                          </a>
                        </div> */}

                        <h3 className="itemDetail-price">
                          ${this.state.single.itemPrice}
                        </h3>
                        <center>
                          <select
                            style={{
                              margin: '30px auto',
                              width: '60%',
                              // marginLeft: '55px',
                              // textAlign:
                            }}
                          >
                            <option>請選擇商品尺寸</option>
                            <option>F</option>
                          </select>
                        </center>

                        <ListGroup>
                          <InputGroup className="mb-3">
                            <InputGroup.Append>
                              <Button
                                className="course-btn"
                                style={{ background: '#bf8c60' }}
                                onClick={() =>
                                  this.setState({
                                    amount: this.state.amount - 1,
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
                              value={
                                this.state.amount < 1 ? 1 : this.state.amount
                              }
                            />
                            <InputGroup.Append>
                              <Button
                                className="course-btn"
                                style={{ background: '#bf8c60' }}
                                onClick={() =>
                                  this.setState({
                                    amount: this.state.amount + 1,
                                  })
                                }
                              >
                                +
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                        </ListGroup>

                        {/* <div className="main-btn">
                          <Button
                            onClick={() =>
                              this.setState({ amount: this.state.amount - 1 })
                            }
                            style={{ margin: '5px' }}
                          >
                            -
                          </Button>

                          <input
                            style={{
                              width: '20%',
                              textAlign: 'center',
                            }}
                            onChange={(event) => {
                              this.setState({ amount: event.target.value })
                            }}
                            value={
                              this.state.amount < 1 ? 1 : this.state.amount
                            }
                          />

                          <Button
                            onClick={() =>
                              this.setState({ amount: this.state.amount + 1 })
                            }
                            style={{ margin: '5px' }}
                          >
                            +
                          </Button>
                        </div> */}

                        <div className="cart-btn">
                          <Button
                            className="cart"
                            onClick={() => {
                              for (let i = 0; i < this.state.amount; i++) {
                                this.updateCartToLocalStorage({
                                  id: this.state.single.itemId,
                                  img: this.state.single.itemImg,
                                  name: this.state.single.itemName,
                                  amount: 1,
                                  price: this.state.single.itemPrice,
                                  shippingId: this.state.single.shippingId,
                                })
                              }
                            }}
                          >
                            add to cart
                            <i
                              class="fas fa-shopping-cart"
                              style={{ marginLeft: '8px' }}
                            ></i>
                          </Button>

                          <Button className="fav" style={{ color: '#5E6248' }}>
                            add to favtorite
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={12} md={12} style={{ margin: '15px 0' }}>
                    <h4 style={{ width: '100%' }}>
                      <BsFillPlayFill />
                      商品詳情
                    </h4>
                    <Card body>
                      這款立領排扣外套採用輕質棉製成，是秋冬季的理想選擇。
                      率性尖領款式，正面以鈕扣式開合，胸部和腰部設有口袋以便放置各樣細小物件。
                    </Card>
                  </Col>
                  <Col xs={12} md={12} style={{ margin: '15px 0' }}>
                    <h4 style={{ width: '100%' }}>
                      <BsFillPlayFill />
                      商品規格
                    </h4>
                    <Card body>
                      材質:100%棉
                      <br />
                      清洗方式:手洗(切勿機洗)
                      <br />
                      產地:日本
                      <br />
                      模特:身高171.9厘米
                      <br />
                      胸圍：58.4厘米
                      <br />
                      長度：73.7厘米
                      <br />
                    </Card>
                  </Col>
                  <Col xs={12} md={12} style={{ margin: '15px 0' }}>
                    <h4 style={{ width: '100%' }}>
                      <BsFillPlayFill />
                      運送及其他規則
                    </h4>
                    <Card body>
                      對於您在網路上購買的商品，在商品未穿、未洗、無損壞、寄送錯誤或有瑕疵的情形下，我們原則上同意在30個日曆天（自產品從我們倉儲出貨時起算）內接受退貨。退貨時應附上原始包裝，可辦理全部或部分退費。
                    </Card>
                  </Col>

                  <Col xs={12} md={12} style={{ margin: '2.5% 0' }}>
                    <div>
                      <div>
                        <h4>
                          <BsFillPlayFill />
                          為您推薦
                        </h4>
                        <h6>&nbsp;&nbsp;&nbsp;&nbsp;MANO Recommended</h6>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                        }}
                      >
                        <Card
                          style={{
                            height: '12rem',
                            width: '10rem',
                            margin: '10px',
                          }}
                        >
                          <Card.Body className="item-recom-cardBody">
                            <Card.Link
                              href={`/mall/itemDetail${this.state.related1.linkUrl}/categoryId=${this.state.related1.categoryId}?itemId=${this.state.related1.itemId}`}
                            >
                              <img
                                className="item-img-detail"
                                style={{ height: '50%', objectFit: 'cover' }}
                                src={`/items/${this.state.related1.itemImg}`}
                                alt={this.state.related1.itemImg}
                              />
                              <Card.Title className="item-recom-name">
                                <p>{this.state.related1.itemName}</p>
                              </Card.Title>
                              <Card.Title>
                                <h6 className="item-more">learn more</h6>
                              </Card.Title>
                            </Card.Link>
                          </Card.Body>
                        </Card>

                        <Card
                          style={{
                            height: '12rem',
                            width: '10rem',
                            margin: '10px',
                          }}
                        >
                          <Card.Body className="item-recom-cardBody">
                            <Card.Link
                              href={`/mall/itemDetail${this.state.related2.linkUrl}/categoryId=${this.state.related2.categoryId}?itemId=${this.state.related2.itemId}`}
                            >
                              <img
                                className="item-img-detail"
                                style={{ height: '50%', objectFit: 'cover' }}
                                src={`/items/${this.state.related2.itemImg}`}
                                alt={this.state.related2.itemImg}
                              />
                              <Card.Title className="item-recom-name">
                                <h6>{this.state.related2.itemName}</h6>
                              </Card.Title>
                              <Card.Title>
                                <h6 className="item-more">learn more</h6>
                              </Card.Title>
                            </Card.Link>
                          </Card.Body>
                        </Card>

                        <Card
                          style={{
                            height: '12rem',
                            width: '10rem',
                            margin: '10px',
                          }}
                        >
                          <Card.Body className="item-recom-cardBody">
                            <Card.Link
                              href={`/mall/itemDetail${this.state.related3.linkUrl}/categoryId=${this.state.related3.categoryId}?itemId=${this.state.related3.itemId}`}
                            >
                              <img
                                className="item-img-detail"
                                style={{ height: '50%', objectFit: 'cover' }}
                                src={`/items/${this.state.related3.itemImg}`}
                                alt={this.state.related3.itemImg}
                              />
                              <Card.Title className="item-recom-name">
                                <h6>{this.state.related3.itemName}</h6>
                              </Card.Title>
                              <Card.Title>
                                <h6 className="item-more">learn more</h6>
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
          </Container>
        </div>
      </>
    )
  }
}

export default withRouter(ItemDetail)
