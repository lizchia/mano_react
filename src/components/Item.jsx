import React from 'react'
import { withRouter } from 'react-router-dom'

import './Item/item-style.css'

function Item(props) {
  const {
    itemId,
    itemImg,
    itemName,
    itemDescription,
    itemPrice,
    handleClick,
    getDetail,
    linkUrl,
    categoryId,
  } = props
  // console.log(props)

  return (
    <>
      <div className="container mb-2 outside">
        <div className="img">
          <a
            href={`/mall/itemDetail${props.linkUrl}/categoryId=${props.categoryId}?itemId=${props.itemId}`}
          >
            <img
              src={`/items/${props.itemImg}`}
              alt={props.itemImg}
              style={{ height: '250px', width: '250px' }}
              className="item-pic"
            />
          </a>
        </div>

        <div className="item-desc">
          <div className="title-desc">
            <h2 className="name">{props.itemName}</h2>
            商品介紹 : {props.itemDescription}
          </div>
          <div className="item-price">${props.itemPrice}</div>
          <div className="add-btn">
            <button
              className="item-add-cart cardLink btn-left"
              onClick={props.handleClick}
            >
              add to cart
              <i class="fas fa-shopping-cart" style={{ marginLeft: '8px' }}></i>
            </button>
            <button
              className="add-fav cardLink"
              onClick={props.handleWishListClick}
            >
              add to favtorite
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Item)
