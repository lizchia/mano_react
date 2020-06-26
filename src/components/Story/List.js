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
  } = props
  const [replyCom, setReplyCom] = useState([])
  const [replyText, setReplyText] = useState('')
  const [replyUser, setReplyUser] = useState('')
  //console.log(com.rows)
  console.log(com)
  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3">
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
                  handleEditSave={handleEditedSave}
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
      </div>
    </div>
  )
}

export default List
