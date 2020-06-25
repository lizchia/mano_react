import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'

function ItemC(props) {
  // 先解構賦值，直接套用由props得到的變數值
  //const [heart, setHeart] = useState(0)
  const {
    value,
    handleDelete,
    handleEditedToggle,
    handleCompleted,
    handleEditedHeartPlus,
    handleEditedHeartMinus,
  } = props
  //console.log(value)

  const date = new Date(value.id)

  const cssClasses =
    'list-group-item justify-content-between align-items-center list-group-item-light'
  const cssCard = {
    width: '400',
  }

  return (
    <li className={cssClasses}>
      {value.username}
      <br />
      {value.text}
      <div>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            handleEditedToggle(value.cid)
          }}
        >
          reply
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            handleEditedToggle(value.cid)
          }}
        >
          edit
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            handleDelete(value.cid)
          }}
        >
          drop
        </button>
        {value.completed ? (
          <button
            style={{ width: '100px' }}
            type="button"
            className="btn btn-light"
            onClick={() => {
              handleCompleted(value.cid)
              handleEditedHeartPlus(value.cid, 1)
            }}
          >
            <i class="fas fa-heart"></i>
            <span>({value.heart})</span>
          </button>
        ) : (
          <button
            style={{ width: '100px' }}
            type="button"
            className="btn btn-light"
            onClick={() => {
              handleCompleted(value.cid)
              handleEditedHeartPlus(value.cid, -1)
            }}
          >
            <i class="far fa-heart"></i>
            <span>({value.heart})</span>
          </button>
        )}
        <div className="badge badge-secondary">{date.toLocaleString()}</div>

        <Card className="bg-dark text-white" style={cssCard}>
          <Card.Img
            src={`http://localhost:3002/img-uploads/${value.commentImg}`}
            alt="Card image"
          />
          <Card.ImgOverlay>
            <Card.Title>{value.username}</Card.Title>
            <Card.Text>{value.text}</Card.Text>
            <Card.Text>{date.toLocaleString()}</Card.Text>
          </Card.ImgOverlay>
        </Card>
      </div>
    </li>
  )
}

export default ItemC
