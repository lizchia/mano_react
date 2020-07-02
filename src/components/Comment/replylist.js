import React, { useState, useEffect } from 'react'
import ItemC from './ItemC'
//import EditForm from './EditForm'
//import ReplyForm from './ReplyForm'

function ReplyList(props) {
  //console.log(props)
  const {
    replyCom,
    value,
    handleDelete,
    handleReplyToggle,
    handleReplySave,
    handleEditedToggle,
    handleEditedSave,
    addNewReplyItemToSever,
    handleCompleted,
  } = props
  //   const [replyCom, setReplyCom] = useState([])
  //   const [replyText, setReplyText] = useState('')
  //   const [replyUser, setReplyUser] = useState('')
  //console.log(com.rows)
  const cssClasses =
    'list-group-item justify-content-between align-items-center list-group-item-light'
  return (
    <li className={cssClasses}>
      {replyCom.map((value, index) => {
        return (
          <>
            <ItemC
              key={value.id}
              value={value}
              handleReplyToggle={handleReplyToggle}
              handleEditedToggle={handleEditedToggle}
              handleDelete={handleDelete}
              handleCompleted={handleCompleted}
              addNewReplyItemToSever={addNewReplyItemToSever}
            />
          </>
        )
      })}
    </li>
  )
}

export default ReplyList
