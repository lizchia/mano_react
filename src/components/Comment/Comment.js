import React from 'react'
import '../Item/item-style.css'

const Comment = (props) => {
  return (
    <>
      <div className="comment-card">
        <div className="comment-user-id">
          <img src={`/comment/${props.id}`} alt={props.id} />
        </div>
      </div>
      <div className="content">
        <div className="content-left">
          <h3 className="comment-text">{props.text}</h3>
          <p className="comment-date">{props.date}</p>
        </div>
        <div className="content-right">
          <button className="add" onClick={props.handleClick}>
            add
          </button>
          <button className="edit">edit</button>
          <button className="delete">delete</button>
        </div>
      </div>
    </>
  )
}
export default Comment
