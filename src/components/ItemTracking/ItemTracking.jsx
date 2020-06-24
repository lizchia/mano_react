import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import TrackingCard from './TrackingCard'
import './item-tracking.css'

class ItemTracking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      show: false,
      mycart: [],
      productName: '',
    }
  }

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  getItemsData = async () => {
    const response = await fetch(`http://localhost:3002/itemTracking`)
    const json = await response.json()
    const items = json.rows

    this.setState({
      data: items,
    })

    return this.state.data
  }

  async componentDidMount() {
    this.props.changeBackgroundColorLight()
    await this.getItemsData()
  }

  updateCartToLocalStorage = (value) => {
    // 開啟載入指示
    //setDataLoading(true)

    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    console.log('currentCart', currentCart)

    const newCart = [...currentCart, value]
    localStorage.setItem('cart', JSON.stringify(newCart))

    console.log('newCart', newCart)
    // 設定資料

    this.setState({
      mycart: newCart,
      productName: value.name,
    })
    this.handleShow()
    //alert('已成功加入購物車')
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
      <div className="d-flex">
        {this.state.data.map((item) => (
          <TrackingCard
            key={item.itemId}
            itemId={item.itemId}
            itemImg={item.itemImg}
            itemName={item.itemName}
            itemPrice={item.itemPrice}
            itemDescription={item.itemDescription}
            //itemPrice={item.itemPrice}
            handleClick={() => {
              this.updateCartToLocalStorage({
                id: item.itemId,
                img: item.itemImg,
                name: item.itemName,
                amount: 1,
                price: item.itemPrice,
                shippingId: item.shippingId,
              })
            }}
          />
        ))}
        {this.state.data.length <= 0 ? (
          <div className="d-flex justify-content-center m-auto">
            <Link
              className="text-center"
              style={{ textDecoration: 'none' }}
              to="/shop"
              onClick={() => localStorage.setItem('page', 1)}
            >
              <i class="fas fa-heart-broken fa-7x" align-item-center></i>
              <h2 className="mt-3 mb-3">尚未將商品加到願望清單中</h2>
            </Link>
          </div>
        ) : (
          ''
        )}
        {messageModal}
      </div>
    )
  }
}

export default withRouter(ItemTracking)
