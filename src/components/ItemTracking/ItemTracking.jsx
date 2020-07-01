import React, { Component } from "react";
import { Modal, Button, Container } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cartAction";

import TrackingCard from "./TrackingCard";
import "./item-tracking.css"
import { BsFillPlayFill } from 'react-icons/bs'
import { useState, useEffect } from "react";

function ItemTracking(props) {

  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [productName, setProductName] = useState('')
  const [username, setUsername] = useState('')


  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const getItemsData = async (username) => {
    const response = await fetch(`http://localhost:3002/itemTracking/${username}`);
    const json = await response.json();
    const items = json.rows;

    setData(items)
    return data
  }


  useEffect(() => {
    const username = JSON.parse(localStorage.getItem('member'))

    props.changeBackgroundColorLight()
    //getItemsData();
    getItemsData(username[0].memberName)
    setUsername(username[0].memberName)
  }, [])



  const { match, location, history } = props
  const messageModal = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>加入購物車訊息</Modal.Title>
      </Modal.Header>
      <Modal.Body>產品：{productName} 已成功加入購物車</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          繼續購物
                </Button>
        <Button
          variant="primary"
          onClick={() => {
            const path = props.history.location.pathname
            if (path.includes("/mall")) props.history.push("/mall/cart")
            else props.history.push("/life/cart")

          }}
        >
          前往購物車結帳
                </Button>
      </Modal.Footer>
    </Modal>
  )

  return (

    <Container className="d-flex  flex-wrap" >
      <h3 className="track-title" ><BsFillPlayFill className="icon-display-none"/>願望清單</h3>
      <div className="track-border"></div>
      {data.map(item => (
        <TrackingCard xs={12} md={4}
          key={item.itemId}
          itemId={item.itemId}
          itemImg={item.itemImg}
          itemName={item.itemName}
          itemPrice={item.itemPrice}
          itemDescription={item.itemDescription}
          username={username}
          //itemPrice={item.itemPrice}
          handleClick={() => {
            props.addItem({
              id: item.itemId,
              img: item.itemImg,
              name: item.itemName,
              price: item.itemPrice,
              shippingId: item.shippingId
            })
            setProductName(item.itemName)
            handleShow()

          }}
        />
      ))}
      {data.length <= 0 ? (
        <div className="d-flex justify-content-center m-auto">
          <Link className='text-center' style={{ textDecoration: 'none' }} to="/mall/shop" onClick={() => localStorage.setItem("page", 1)}><i class="fas fa-heart-broken fa-7x" align-item-center></i><h2 className="mt-3 mb-3">尚未將商品加到願望清單中</h2></Link>

        </div>
      ) : ""}
      {messageModal}
    </Container>

  )
}


const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
})

export default withRouter(connect(null, mapDispatchToProps)(ItemTracking));