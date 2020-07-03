import React, { useState, useEffect } from 'react'
import {
  Table,
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Pagination,
} from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

import MyBreadcrumb from '../components/MyBreadcrumbForMember'

import MemberSideLink from './MemberSideLink'

function MemberOrders(props) {
  const { changeBackgroundColorDark } = props

  const [order, setOrder] = useState([])
  const [pageArr, setPagearr] = useState([])
  const [pageNow, setPagenow] = useState(1)
  const [detail, setDetail] = useState([])
  const [coursedetail, setCoursedetail] = useState([])
  const [detailshow, setDetailshow] = useState(false)
  const [orderindex, setOrderindex] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [tempOrder, setTempOrder] = useState([])
  const [activeNumber, setActiveNumber] = useState(0)


  const handleChangeSearch = (event) => {
    setSearchTerm(event.target.value)
  }
  const handleClickSearch = (searchTerm) => {
    const results = searchResults.filter((oneorder) =>
      JSON.stringify(oneorder).includes(searchTerm)
    )
    results.length === 0 ? console.log('沒有資料', searchResults) : setOrder(results)
    const finalpage = Math.ceil(results.length / 5)
    const arr = []
    for (let i = 1; i <= finalpage; i++) {
      arr.push(i)
    }
    setPagearr([1])
  }
  const handleClickSearchOrder = (searchTerm) => {
    const results = tempOrder.filter((oneorder) =>
      JSON.stringify(oneorder).includes(searchTerm)
    )
    results.length === 0 ? console.log('沒有資料', results) : setOrder(results)
    const finalpage = Math.ceil(results.length / 5)
    const arr = []
    for (let i = 1; i <= finalpage; i++) {
      arr.push(i)
    }
    setPagearr([1])
  }

  const active = { borderBottom: '2px solid #C5895A' }
  const localMember = JSON.parse(localStorage.getItem('member')) || [
    { memberName: '', memberId: '' },
  ]

  async function getData(memberId, pageNow) {
    const request = new Request(
      `http://localhost:3002/membercenter/memberorder/${memberId}/${pageNow}`,
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
    console.log('主要的資料', data)
    // 設定資料
    setOrder(data)
    setTempOrder(data)
  }
  async function getPageData(memberId) {
    const request = new Request(
      `http://localhost:3002/membercenter/memberorderpage/${memberId}`,
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
    console.log('總共幾筆訂單的arr', data)
    // 設定總共幾筆訂單
    setPagearr(data)
  }
  async function getSearchData(memberId) {
    const request = new Request(
      `http://localhost:3002/membercenter/memberorderSearch/${memberId}`,
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
    console.log('主要的資料', data)
    // 設定資料
    setSearchResults(data)
  }
  useEffect(() => {
    getData(localMember[0].memberId, 1)
    getPageData(localMember[0].memberId)
    getSearchData(localMember[0].memberId)
    changeBackgroundColorDark()
  }, [])

  async function getDetailData(orderId) {
    const request = new Request(
      `http://localhost:3002/membercenter/memberorderdetail/${orderId}`,
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
    console.log('詳細的商品資料', data)
    // 設定資料
    setDetail(data)
  }
  async function getCourseDetailData(orderId) {
    const request = new Request(
      `http://localhost:3002/membercenter/memberordercoursedetail/${orderId}`,
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
    console.log('詳細的課程資料', data)
    // 設定資料
    setCoursedetail(data)
  }
  function handleDetailShow(orderId) {
    getDetailData(orderId)
    getCourseDetailData(orderId)
    setDetailshow(true)
  }
  const activeStyle = {
    width: '120px',
    height: '44px',
    color: '#5C6447',
    borderBottom: '2px solid #C5895A',
  }
  const topButtonStyle = {
    width: '120px',
    height: '44px',
    color: '#5C6447'
  }

  const displayDetail = (
    <>
      <Table responsive bordered style={{ fontSize: '10pt' }}>
        <thead>
          <Link
            to="#"
            onClick={() => {
              setDetailshow(false)
            }}
          >
            關閉明細
          </Link>

          {/* <tr>
          <td>商品/課程名稱</td>
          <td>單價</td>
          <td>數量</td> 
          <td>小計</td>   
      </tr> */}
        </thead>
        <tbody>
          {detail.map((value, index) => {
            return (
              <tr key={index}>
                <td>
                  {value.itemName}
                  {value.courseId}
                </td>
                <td>${value.checkPrice}</td>
                <td>{value.checkQuantity}件</td>
                <td>${value.checkSubtotal}</td>
              </tr>
            )
          })}
          {coursedetail.map((value, index) => {
            return (
              <tr key={index}>
                <td title={value.courseName}>
                  課程：{value.courseName.substr(0, 4)}...
                </td>
                <td>${value.checkPrice}</td>
                <td>{value.checkQuantity}人</td>
                <td>${value.checkSubtotal}</td>
              </tr>
            )
          })}

          <tr className="text-danger">
            <td>運費</td>
            <td>{detailshow ? '$' + order[orderindex].shiptotalMoney : ''}</td>
            <td>活動折扣</td>
            <td>
              {detailshow && order[orderindex].shopDiscount > 1
                ? '-$' + order[orderindex].shopDiscount
                : '無'}
            </td>
          </tr>
          <tr className="text-primary">
            <td>收件資料</td>
            <td colSpan={2}>
              {detailshow ? order[orderindex].ship_name : ''}
              <br />
              {detailshow
                ? order[orderindex].shipCity +
                  order[orderindex].shipDistrict +
                  order[orderindex].shipAddress
                : ''}
            </td>
            <td colSpan={1}>備註：
            {detailshow ? order[orderindex].note : ''}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )

  return (
    <>
      <MyBreadcrumb
        searchTerm={searchTerm}
        handleChangeSearch={handleChangeSearch}
        handleClickSearch={handleClickSearch}
      />

      <MemberSideLink>
        {/* <Table id="maintable" className="d-none"></Table> */}
        <Col
          md={10}
          xs={12}
          className="mb-5"
          style={{
            background: 'white',
            padding: '0',
            borderRadius: '5px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '44px',
              background: '#D1DBCE',
              marginBottom: '32px',
            }}
          >
            <button
              className="btn"
              style={activeNumber === 0 ? activeStyle : topButtonStyle}
              onMouseDown={() => {
                setSearchTerm('')
                setActiveNumber(0)
              }}
              onClick={() => {
                getData(localMember[0].memberId, 1)
                getPageData(localMember[0].memberId)
              }}
            >
              全部訂單
            </button>
            <button
              className="btn"
              style={activeNumber === 1 ? activeStyle : topButtonStyle}
              onMouseDown={() => {
                setSearchTerm('未出貨')
                setActiveNumber(1)
              }}
              onClick={() => {
                handleClickSearchOrder(searchTerm)
              }}
            >
              未出貨
            </button>
            <button
              className="btn"
              style={activeNumber === 2 ? activeStyle : topButtonStyle}
              onMouseDown={() => {
                setSearchTerm('已出貨')
                setActiveNumber(2)
              }}
              onClick={() => {
                handleClickSearchOrder(searchTerm)
              }}
            >
              已出貨
            </button>
            <button
              className="btn"
              style={activeNumber === 3 ? activeStyle : topButtonStyle}
              onMouseDown={() => {
                setSearchTerm('未付款')
                setActiveNumber(3)
              }}
              onClick={() => {
                handleClickSearchOrder(searchTerm)
              }}
            >
              未付款
            </button>
          </div>
          <Col md={{ span: 10, offset: 1 }}>
            {order.map((value, index) => {
              return [
                <Link to="#">{value.orderNumber}</Link>,
                <Table
                  key={index}
                  responsive
                  hover
                  id="maintable"
                  style={{ fontSize: '10pt' }}
                  className="coupontable"
                >
                  <thead
                    style={{
                      border: '2px solid #C5895A',
                      borderBottom: '#C5895A',
                    }}
                  >
                    <tr className="bg-primary ">
                      <th>訂單日期</th>
                      <th>訂單狀態</th>
                      <th>訂單金額</th>
                      <th>付款方式</th>
                      <th>付款狀態</th>
                      <th>出貨狀態</th>
                      <th>明細</th>
                    </tr>
                  </thead>
                  <tbody id="orderRow">
                    <tr>
                      <td>
                        {value.created_at.substr(0, 10)}
                        <br />
                        {value.created_at.substr(-13, 5)}
                      </td>
                      <td>訂單成立</td>
                      <td>${value.totalPrice}</td>
                      <td>{value.paymentMethod}</td>
                      <td>{value.paymentStatus}</td>
                      <td>{value.shipStatus}</td>
                      <td
                        onMouseDown={() => {
                          setOrderindex(index)
                        }}
                      >
                        {' '}
                        <Link
                          to="#"
                          onClick={() => {
                            handleDetailShow(value.orderId)
                          }}
                        >
                          查看
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </Table>,
                detailshow && orderindex === index ? displayDetail : '',
              ]
            })}

            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  onClick={() => {
                    if (pageNow < 2) {
                      setPagenow(1)
                    } else {
                      setPagenow(pageNow - 1)
                    }
                    getData(localMember[0].memberId, pageNow - 1)
                    setDetailshow(false)
                  }}
                />
                {pageArr.map((value) => {
                  return (
                    <>
                      <Pagination.Item
                        key={value}
                        value={value}
                        active={value === pageNow}
                        onClick={() => {
                          getData(localMember[0].memberId, value)
                          setPagenow(value)
                          setDetailshow(false)
                        }}
                      >
                        {value}
                      </Pagination.Item>
                    </>
                  )
                })}
                <Pagination.Next
                  onClick={() => {
                    let nextnum = 1
                    if (pageNow + 1 > pageArr.length) {
                      nextnum = 1
                      setPagenow(1)
                    } else {
                      nextnum = pageNow + 1
                      setPagenow(pageNow + 1)
                    }
                    getData(localMember[0].memberId, nextnum)
                    setDetailshow(false)
                  }}
                />
              </Pagination>
            </div>
          </Col>
        </Col>
      </MemberSideLink>
    </>
  )
}

export default withRouter(MemberOrders)