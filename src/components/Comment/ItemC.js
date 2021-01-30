import React, { useState } from 'react'
import '/picture/thumbs.svg'

function ItemC(props) {
  //console.log(props)
  // 先解構賦值，直接套用由props得到的變數值
  //const [heart, setHeart] = useState(0)
  const {
    value,
    handleDelete,
    handleEditedToggle,
    handleCompleted,
    handleEditedHeartPlus,
  } = props

  const date = new Date(value.id)

  const cssClasses =
    'list-group-item justify-content-between align-items-center list-group-item-light'

  return (
    <li className={cssClasses}>
      {value.username}
      <br />
      <ul class="list-unstyled list-inline rating mb-0">
        <li class="list-inline-item mr-0">
          <i
            class={
              value.heart >= 1
                ? 'fas fa-star amber-text'
                : 'far fa-star amber-text'
            }
          >
            {' '}
          </i>
        </li>
        <li class="list-inline-item mr-0">
          <i
            class={
              value.heart >= 2
                ? 'fas fa-star amber-text'
                : 'far fa-star amber-text'
            }
          ></i>
        </li>
        <li class="list-inline-item mr-0">
          <i
            class={
              value.heart >= 3
                ? 'fas fa-star amber-text'
                : 'far fa-star amber-text'
            }
          ></i>
        </li>
        <li class="list-inline-item mr-0">
          <i
            class={
              value.heart >= 4
                ? 'fas fa-star amber-text'
                : 'far fa-star amber-text'
            }
          ></i>
        </li>
        <li class="list-inline-item">
          <i
            class={
              value.heart >= 5
                ? 'fas fa-star amber-text'
                : 'far fa-star amber-text'
            }
          ></i>
        </li>
        <li class="list-inline-item">
          <p class="text-muted">{value.heart} </p>
        </li>
      </ul>
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
        {/* <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            handleEditedToggle(value.cid)
          }}
        >
          edit
        </button> */}
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
            {/* <span>({value.heart})</span> */}
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
            {/* <span>({value.heart})</span> */}
          </button>
        )}
        <div className="badge badge-secondary">{date.toLocaleString()}</div>
      </div>
    </li>
  )
}

export default ItemC
