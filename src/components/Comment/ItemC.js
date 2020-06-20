import React from 'react'

function ItemC(props) {
  //console.log(props)
  // 先解構賦值，直接套用由props得到的變數值
  const { value, handleDelete, handleEditedToggle, handleCompleted } = props

  const date = new Date(value.id)

  const cssClasses =
    'list-group-item justify-content-between align-items-center list-group-item-light'
  const cssBtn = ''

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
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            handleCompleted(value.id)
          }}
        >
          {value.completed ? (
            <img src="/picture/thumbs.svg"></img>
          ) : (
            <img src="/picture/line.svg"></img>
          )}
        </button>
        <div className="badge badge-secondary">{date.toLocaleString()}</div>
      </div>
    </li>
  )
}

export default ItemC
