import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Comment from './Comment'
import '../Items/items-style.css'

class Comments extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      totalPages: '',
      page: 1,
      dataLoading: false,
      show: false,
      text: '',
      id: '',
    }
  }

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })

//   updateCartToLocalStorage = (value) => {
//     // 開啟載入指示
//     //setDataLoading(true)

//     const currentCart = JSON.parse(localStorage.getItem('cart')) || []

//     console.log('currentCart', currentCart)

//     const newCart = [...currentCart, value]
//     localStorage.setItem('cart', JSON.stringify(newCart))

//     console.log('newCart', newCart)
//     // 設定資料

//     this.setState({
//       mycart: newCart,
//       productName: value.name,
//     })
//     this.handleShow()
//     //alert('已成功加入購物車')
//   }

//   getCatData = async (categoryParentId) => {
//     const response = await fetch(
//       `http://localhost:3002/category/${categoryParentId}`
//     )
//     const json = await response.json()
//     const category = json.rows

//     this.setState({
//       catData: category,
//     })

//     return this.state.catData
//   }

//   getRecursiveCategoryIds = async (categoryId) => {
//     const output = await this.getCatData(categoryId)
//     //console.log(output)
//     if (output.length > 0) {
//       for (let i = 0; i < output.length; i++) {
//         await this.setState({
//           catIds: (this.state.catIds += `,${output[i]['categoryId']}`),
//         })
//         await this.getRecursiveCategoryIds(output[i]['categoryId'])
//       }
//     }

//     return this.state.catIds
//   }

  getItemsData = async () => {
    let currentPage = localStorage.getItem('page') || 1
    const response = await fetch(`http://localhost:3002/comment/${currentPage}`)
    const json = await response.json()
    const comments = json.rows
    const totalPages = json.totalPages
    this.setState({
      data: comments,
      totalPages: totalPages,
    })

    return this.state.data
  }
  //   async componentDidMount() {
  //     let params = new URLSearchParams(this.props.location.search)
  //     let catIdParams = params.get('categoryId')
  //     if (catIdParams) {
  //       await this.setState({
  //         catIds: (this.state.catIds += catIdParams),
  //       })

  //       await this.getRecursiveCategoryIds(catIdParams)
  //     }

  //     await this.getItemsData()
  //   }

  //   handleChange = async (event) => {
  //     let params = new URLSearchParams(this.props.location.search)
  //     let catIdParams = params.get('categoryId')

  //     await this.setState({
  //       page: event.target.value,
  //     })

  //     localStorage.setItem('page', this.state.page)

  //     const response = await fetch(
  //       `http://localhost:3002/items/${this.state.catIds}/${this.state.page}`
  //     )
  //     const json = await response.json()
  //     const items = json.rows
  //     const page = json.page
  //     this.setState({
  //       data: items,
  //     })

  //     this.props.history.push(
  //       `${this.props.match.url}?categoryId=${catIdParams}&page=${this.state.page}`
  //     )
  //   }

  render() {
    const lists = []

    for (let i = 1; i <= this.state.totalPages; i++) {
      if (i < 10) {
        lists.push(
          <li
            className="page-list"
            key={i}
            value={i}
            onClick={this.handleChange}
          >
            0{i}
          </li>
        )
      } else {
        lists.push(
          <li
            className="page-list"
            key={i}
            value={i}
            onClick={this.handleChange}
          >
            {i}
          </li>
        )
      }
    }

    // const messageModal = (
    //   <Modal
    //     show={this.state.show}
    //     onHide={this.handleClose}
    //     backdrop="static"
    //     keyboard={false}
    //   >
    //     <Modal.Header closeButton>
    //       <Modal.Title>加入購物車訊息</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>產品：{this.state.productName} 已成功加入購物車</Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={this.handleClose}>
    //         繼續購物
    //       </Button>
    //       <Button
    //         variant="primary"
    //         onClick={() => {
    //           this.props.history.push('/cart')
    //         }}
    //       >
    //         前往購物車結帳
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // )

    const spinner = (
      <>
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </>
    )

    return (
      <div>
        {/* {messageModal} */}
        {this.state.data.map((item) => (
          <Comment
            key={item.id}
            id={item.id}
            text={item.text}
            date={item.date}
            // handleClick={() => {
            //   this.updateCartToLocalStorage({
            //     id: comment.id,
            //     text: comment.text,
            //   })
            // }}
          />
        ))}

        <ul className="page-lists">{lists}</ul>
      </div>
    )
  }
}

export default withRouter(Comments)
