import React, { Component } from "react";
import { Modal, Button, Container } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import TrackingCard from "./TrackingCard";
import "./item-tracking.css"
import { BsFillPlayFill } from 'react-icons/bs' 
import { useState, useEffect } from "react";

function ItemTracking (props) {

  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [mycart, setMycart] = useState([])
  const [productName, setProductName] = useState('')
   

    
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const getItemsData = async () => {
        const response = await fetch(`http://localhost:3002/itemTracking`);
        const json = await response.json();
        const items = json.rows;
      
        setData(items)
        return data
    }


    useEffect(()=>{
      props.changeBackgroundColorLight() 
      getItemsData();

    },[])

    const updateCartToLocalStorage = (value) => {
        // 開啟載入指示
        //setDataLoading(true)
    
        const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    
        console.log('currentCart', currentCart)
    
        const newCart = [...currentCart, value]
        localStorage.setItem('cart', JSON.stringify(newCart))
    
        console.log('newCart', newCart)
        // 設定資料
        setMycart(newCart)
        setProductName(value.name)

        handleShow()
        //alert('已成功加入購物車')
    }

    
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
                    if(path.includes("/mall")) props.history.push("/mall/cart")
                    else props.history.push("/life/cart")

                  }}
                >
                  前往購物車結帳
                </Button>
              </Modal.Footer>
            </Modal>
          )
        let displaystyle={width:"100%"}
        let locationPathname = location.pathname
        if (locationPathname.includes("/membercenter")) displaystyle = {width:"100%",color:"#fff"}
    
        return(
            
            <Container className="d-flex  flex-wrap" > 
               <h3 style={displaystyle}><BsFillPlayFill />願望清單</h3>
              {data.map(item =>(
                <TrackingCard xs={12} md={4} 
                key={item.itemId}
                itemId={item.itemId}
                itemImg={item.itemImg}
                itemName={item.itemName}
                itemPrice={item.itemPrice}
                itemDescription={item.itemDescription}
                //itemPrice={item.itemPrice}
                handleClick={() => {    
                    updateCartToLocalStorage({
                    id: item.itemId,
                    img: item.itemImg,
                    name: item.itemName,
                    amount: 1,
                    price: item.itemPrice,
                    shippingId: item.shippingId
                    })
                 }
                }
               />
                ))}
            {data.length <= 0 ? (
                <div className="d-flex justify-content-center m-auto">
                    <Link className='text-center' style={{ textDecoration: 'none' }} to="/mall/shop" onClick={() => localStorage.setItem("page",1)}><i class="fas fa-heart-broken fa-7x" align-item-center></i><h2 className="mt-3 mb-3">尚未將商品加到願望清單中</h2></Link>
                    
                </div>
              ) : "" }
       {messageModal}
            </Container>
            
        )
    }


export default withRouter(ItemTracking);
