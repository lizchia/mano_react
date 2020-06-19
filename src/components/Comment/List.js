import React, { useState, useEffect } from 'react'
import ItemC from './ItemC'
import EditForm from './EditForm'
import ReplyForm from './ReplyForm'

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
  } = props
  const [replyCom, setReplyCom] = useState([])
  const [replyText, setReplyText] = useState('')
  const [replyUser, setReplyUser] = useState('')
  //console.log(com.rows)
  console.log(com)
  return (
    <>
      <div>
        <ul className="list-group">
          {com.map((value, index) => {
            if (value.edited) {
              return (
                <>
                  <EditForm
                    key={value.id}
                    value={value}
                    handleEditSave={handleEditedSave}
                  />
                  {/* <ItemC
                    key={value.id}
                    value={value}
                    handleReplyToggle={handleReplyToggle}
                    handleEditedToggle={handleEditedToggle}
                    handleDelete={handleDelete}
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
                    addNewTodoItemToSever={addNewTodoItemToSever}
                  /> */}
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
              />
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default List
