import React, { useState, useEffect } from 'react'
import ItemC from './ItemC'
import EditForm from './EditForm'
import ReplyForm from './ReplyForm'
import ReplyList from './replylist'

function List(props) {
  //console.log(props)
  const {
    com,
    handleDelete,
    handleReplyToggle,
    handleReplySave,
    handleEditedToggle,
    handleEditedSave,
    addNewTodoItemToSever,
    handleCompleted,
    handleEditedHeartPlus,
    addNewReplyItemToSever,
  } = props
  const [replyCom, setReplyCom] = useState([])
  const [replyText, setReplyText] = useState('')
  const [replyUser, setReplyUser] = useState('')
  //console.log(com.rows)
  console.log(com)
  return (
    <ul className="list-group">
      {com.map((value, index) => {
        if (value.edited) {
          return (
            <>
              {/* <EditForm
                    key={value.id}
                    value={value}
                    handleEditSave={handleEditedSave}
                  /> */}
              <ItemC
                key={value.id}
                value={value}
                handleReplyToggle={handleReplyToggle}
                handleEditedToggle={handleEditedToggle}
                handleDelete={handleDelete}
                handleCompleted={handleCompleted}
                handleEditedHeartPlus={handleEditedHeartPlus}
              />
              <ReplyList
                replyCom={replyCom}
                handleCompleted={handleCompleted}
                handleDelete={handleDelete}
                handleReplyToggle={handleReplyToggle}
                handleEditedToggle={handleEditedToggle}
                handleEditedSave={handleEditedSave}
                handleCompleted={handleCompleted}
                handleEditedHeartPlus={handleEditedHeartPlus}
              />
              <ReplyForm
                key={value.id}
                value={value}
                replyUser={replyUser}
                replyText={replyText}
                replyCom={replyCom}
                setReplyUser={setReplyUser}
                setReplyText={setReplyText}
                setReplyCom={setReplyCom}
                addNewReplyItemToSever={addNewReplyItemToSever}
              />
            </>
          )
        }
        return (
          <ItemC
            key={value.id}
            value={value}
            handleReplyToggle={handleReplyToggle}
            handleEditedToggle={handleEditedToggle}
            handleDelete={handleDelete}
            handleCompleted={handleCompleted}
            handleEditedHeartPlus={handleEditedHeartPlus}
          />
        )
      })}
    </ul>
  )
}

export default List
