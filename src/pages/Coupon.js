import React, { useState, useEffect } from "react"
import { Table, Container, Row, Col, ListGroup, Image } from "react-bootstrap"
import { Link, withRouter } from 'react-router-dom'

import MemberSideLink from "./MemberSideLink"
import MyBreadcrumb from "../components/MyBreadcrumbForMember"

function Coupon(props) {
  const {changeBackgroundColorDark}=props

  const [coupon, setCoupon] = useState([])
  const [couponusedlist, setCouponusedlist] = useState([])

  const [couponshow,setCouponshow] =useState(true)
  const localMember = JSON.parse(localStorage.getItem('member')) || [{ memberName: '',memberId:'' }]

  function changeBackgroundColor(){
    document.body.style.background ='#5C6447'
  }
  
  

  async function getData(memberId) {
    const request = new Request(`http://localhost:3002/membercenter/coupon/${memberId}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log("顯示的資料", data)
    // 設定資料
    setCoupon(data)
  }
  async function getCouponUsedData(memberId) {
    const request = new Request(`http://localhost:3002/membercenter/couponused/${memberId}`, {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    console.log("顯示的資料", data)
    // 設定資料
    setCouponusedlist(data)
  }
  useEffect(() => {
    getData(localMember[0].memberId)
    changeBackgroundColorDark()
    document.getElementById("maintable").classList.add('coupontable')
  }, [])

  const couponnotused=(
    coupon.map((value, index) => {
      return (
        <tr style={{border:"2px solid #C5895A"}}>
          <td>{value.discountName}</td>
          <td style={{color:" #C5895A"}}>
            {(Number(value.discountMethod) < 1&&Number(value.discountMethod) >0)? `${value.discountMethod.substr(2, 3)}折`
              : `折扣${value.discountMethod.substr(1, 4)}元`}
          </td>
          <td>{value.discountPeriod}</td>
          {/* <td>{value.created_at.substr(0,10)}</td> */}
          <td>{value.updated.substr(0, 10)}</td>
          <td>未使用</td>

        </tr>
      )
    })
  )
  const couponused =(
    couponusedlist.map((value, index) => {
      return (
        <tr style={{border:"2px solid #C5895A"}}>
          <td>{value.discountName}</td>
          <td style={{color:" #C5895A"}}>
            {(Number(value.discountMethod) < 1&&Number(value.discountMethod) >0)? `${value.discountMethod.substr(2, 3)}折`
              : `折扣${value.discountMethod.substr(1, 4)}元`}
          </td>
          <td>{value.discountPeriod}</td>
          {/* <td>{value.created_at.substr(0,10)}</td> */}
          <td>{value.updated.substr(0, 10)}</td>
          <td>已使用</td>
        </tr>
      )
    })
  )
  const activebutton={width:"120px",height:"44px",color:"#5C6447",borderBottom:"2px solid #C5895A"}
  const normalbutton={width:"120px",height:"44px",color:"#5C6447"}

  return (
    <>
      <MyBreadcrumb />
      <MemberSideLink>
        <Col md={10} xs={12} className="mb-5"  style={{background:"white",padding:"0",borderRadius:'5px',overflow:'hidden'}}>
        <div style={{width:"100%",height:"44px",background:"#D1DBCE",marginBottom:"32px"}} >
          <button className="btn" style={couponshow?activebutton:normalbutton} 
          onClick={()=>{setCouponshow(true) }}
          >可用折價券</button> 
          <button className="btn" style={couponshow?normalbutton:activebutton} 
          onClick={()=>{getCouponUsedData(localMember[0].memberId);setCouponshow(false) }}
          >使用記錄</button> 
         
         </div>
      <Col md={{ span: 10, offset: 1 }} >

          <Table id="maintable">
            <thead style={{border:"2px solid #C5895A", borderBottom:"#C5895A"}}>
              <tr className="bg-primary " >
                <th>折價券名稱</th>
                <th>折扣內容</th>
                <th>有效期限</th>
                <th>獲得日期</th>
                <th>狀態</th>
              </tr>
            </thead>
            <tbody style={{border:"2px solid #C5895A", borderTop:"#C5895A"}}>
              {couponshow ? couponnotused : couponused}
            </tbody>
          </Table>
          </Col>
          <div style={{textAlign:"center", marginBottom:"2rem"}}>升級會員，享有更多優惠，會員等級說明
          
          <Link to="../../life/marketing"
          >看這邊>></Link>
            
         
          </div>
        </Col>
      </MemberSideLink>
    </>
  )
}
export default Coupon
