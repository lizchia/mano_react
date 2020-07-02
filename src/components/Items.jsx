import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from "react-redux";
import { addItem } from "../redux/cart/cartAction";

import Item from './Item'

import SearchBar from '../components/courses/SearchBar'
import MyBreadcrumb from './MyBreadcrumb'

import '../styles/Items-style.css'
import { Modal, Button, Pagination } from 'react-bootstrap'

class Items extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      totalPages: '',
      searchValue: '',
      showPage: true,
      page: 1,
      mycart: [],
      dataLoading: false,
      show: false,
      productName: '',
      catIds: '',
      catData: [],
    }
  }

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

  handleWishClose = () => this.setState({ wishShow: false })
  handleWishShow = () => this.setState({ wishShow: true })


  insertWishListToDb = async (wishList) => {
    const request = new Request(`http://localhost:3002/itemTracking/add`, {
      method: 'POST',
      body: JSON.stringify(wishList),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    console.log('After JSON: ', JSON.stringify(wishList))

    const response = await fetch(request)
    //const data =  await response.json()
    this.handleWishShow()
  }

  getCatData = async (categoryParentId) => {
    const response = await fetch(
      `http://localhost:3002/category/${categoryParentId}`
    )
    const json = await response.json()
    const category = json.rows

    this.setState({
      catData: category,
    })

    return this.state.catData
  }

  getRecursiveCategoryIds = async (categoryId) => {
    const output = await this.getCatData(categoryId)
    // console.log(output)
    if (output.length > 0) {
      for (let i = 0; i < output.length; i++) {
        await this.setState({
          catIds: (this.state.catIds += `,${output[i]['categoryId']}`),
        })
        await this.getRecursiveCategoryIds(output[i]['categoryId'])
      }
    }

    return this.state.catIds
  }

  getItemsData = async () => {
    let currentPage = localStorage.getItem('page') || 1
    const response = await fetch(
      `http://localhost:3002/items/${this.state.catIds}/${currentPage}`
    )
    const json = await response.json()
    const items = json.rows
    const totalPages = json.totalPages
    const totalRows = json.totalRows
    this.setState({
      data: items,
      totalPages: totalPages,
      totalRows: totalRows,
    })

    return this.state.data
  }

  getWishData = async (username) => {
    const response = await fetch(`http://localhost:3002/itemTracking/${username}`);
    const json = await response.json();
    const items = json.rows;

    this.setState({wishData: items})
    
    return this.state.wishData
}


  async componentDidMount() {
    let params = new URLSearchParams(this.props.location.search)
    let catIdParams = params.get('categoryId')
    if (catIdParams) {
      await this.setState({
        catIds: (this.state.catIds += catIdParams),
      })

      await this.getRecursiveCategoryIds(catIdParams)
    }

    await this.getItemsData()

    const username = JSON.parse(localStorage.getItem('member')) || [{memberName: ""}]
    this.setState({username: username[0].memberName})
    this.getWishData(username[0].memberName)

  }

  handleChange = async (value) => {
    let params = new URLSearchParams(this.props.location.search)
    let catIdParams = params.get('categoryId')

    await this.setState({
      page: value,
    })

    localStorage.setItem('page', this.state.page)

    const response = await fetch(
      `http://localhost:3002/items/${this.state.catIds}/${this.state.page}`
    )
    const json = await response.json()
    const items = json.rows
    const page = json.page
    this.setState({
      data: items,
    })

    this.props.history.push(
      `${this.props.match.url}?categoryId=${catIdParams}&page=${this.state.page}`
    )

    window.scrollTo(0, 0)
  }

  onChange = async (event) => {
    this.setState({
      searchValue: event.target.value,
    })

    // console.log(`"search!" + ${event.target.value}`)
    const response = await fetch('http://localhost:3002/items')
    const json = await response.json()
    const allData = json.allData

    this.setState({
      data: allData,
      showPage: false,
    })
  }

  render() {
    const lists1 = []

    for (let i = 1; i <= 9; i++) {
      lists1.push(
        <Pagination.Item
          // size="sm"
          // className="m-1 p-1"
          key={i}
          value={i}
          onClick={() => {
            this.handleChange(i)
            this.setState({ page: i })
          }}
          active={i === this.state.page}
        >
          0{i}
        </Pagination.Item>
      )
    }
    const lists2 = []
    for (let i = 26; i <= this.state.totalPages; i++) {
      lists2.push(
        <Pagination.Item
          // size="sm"
          // className="m-1 p-1"
          key={i}
          value={i}
          onClick={() => {
            this.handleChange(i)
            this.setState({ page: i })
          }}
          active={i === this.state.page}
        >
          {i}
        </Pagination.Item>
      )
    }

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

    const wishListModal = (
      <Modal
        show={this.state.wishShow}
        onHide={this.handleWishClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>加入願望清單訊息</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          產品：{this.state.productName} 已成功加入願望清單
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleWishClose}>
            繼續購物
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              this.props.history.push('/mall/ItemTracking')
            }}
          >
            前往願望清單
          </Button>
        </Modal.Footer>
      </Modal>
    )

    const originResults = (
      <div>
        <p className="results resultsOrigin">
          {this.state.data.length} of {this.state.totalRows} results
        </p>
      </div>
    )

    const count = this.state.data.filter((item) => {
      return (
        item.itemName && item.itemDescription.includes(this.state.searchValue)
      )
    }).length

    const searchResult = (
      <p className="results resultsSearch">搜尋共 {count} 筆符合</p>
    )
    let result
    count !== this.state.data.length
      ? (result = searchResult)
      : (result = originResults)

    return (
      <div className="container">
        {wishListModal}
        {messageModal}

        <div className="tool">
          <MyBreadcrumb className="bread" />
          {result}
          <SearchBar onChange={this.onChange} />
        </div>

        {this.state.data
          .filter((item) => {
            return (
              item.itemName &&
              item.itemDescription.includes(this.state.searchValue)
            )
          })
          .map((item) => (
            <Item
              key={item.itemId}
              linkUrl={item.linkUrl}
              categoryId={item.categoryId}
              itemId={item.itemId}
              itemImg={item.itemImg}
              itemName={item.itemName}
              itemDescription={item.itemDescription}
              itemPrice={item.itemPrice}
              handleClick={() => {
                this.props.addItem({
                  id: item.itemId,
                  img: item.itemImg,
                  name: item.itemName,
                  price: item.itemPrice,
                  shippingId: item.shippingId,
                })
                this.setState({
                  productName: item.itemName,
                })
                this.handleShow()
              }}
              getWishData={async ()=> {
                await this.getWishData(this.state.username)
              }}
              handleWishListClick={async () => {

              if(this.state.username === "") {
                this.props.history.push("/mall/login")
              }else if (this.state.wishData.find(x => x.itemId === item.itemId)){
                alert('already in wishlist')

              }else {
              this.insertWishListToDb({
                username: this.state.username,
                itemId: item.itemId,
                itemPrice: item.itemPrice,
              })
              this.setState({ productName: item.itemName })
              await this.getWishData(this.state.username)

              }
              }}
          />
          ))}
        <div className="page-btn-box">
          <ul
            className="page-btn"
            style={{
              visibility: this.state.showPage ? 'visible' : 'hidden',
              marginLeft: '30px',
            }}
          >
            <Pagination.First
              onClick={() => {
                this.handleChange(1)
              }}
            />
            <Pagination.Prev
              onClick={() => {
                this.handleChange(this.state.page - 1)
              }}
              disabled={this.state.page === 1 ? true : false}
            />

            {lists1}

            <Pagination.Ellipsis />

            {lists2}

            <Pagination.Next
              onClick={() => {
                this.handleChange(this.state.page + 1)
              }}
              disabled={
                this.state.page === this.state.totalPages ? true : false
              }
            />
            <Pagination.Last
              onClick={() => {
                this.handleChange(this.state.totalPages)
              }}
            />
          </ul>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default withRouter(connect(null, mapDispatchToProps)(Items))