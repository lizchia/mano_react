import React, { useState, useEffect } from 'react'
import ItemC from './ItemC'
//import EditForm from './EditForm'
//import ReplyForm from './ReplyForm'

function List(props) {
  //console.log(props)
  const {
    replyCom,
    value,
    handleDelete,
    handleReplyToggle,
    handleReplySave,
    handleEditedToggle,
    handleEditedSave,
    addNewTodoItemToSever,
    handleCompleted,
    handleEditedHeartPlus,
  } = props
  //   const [replyCom, setReplyCom] = useState([])
  //   const [replyText, setReplyText] = useState('')
  //   const [replyUser, setReplyUser] = useState('')
  //console.log(com.rows)
  const cssClasses =
    'list-group-item justify-content-between align-items-center list-group-item-light'
  const cssCard = {
    width: '300',
  }
  return (
    <div className="col mb-4">
      {/* Card */}
      <div class="card" style={cssCard}>
        {replyCom.map((value, index) => {
          {
            /* if (value.edited) { */
          }
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
              {/* <ReplyForm
                key={value.id}
                value={value}
                replyUser={replyUser}
                replyText={replyText}
                replyCom={replyCom}
                setReplyUser={setReplyUser}
                setReplyText={setReplyText}
                setReplyCom={setReplyCom}
                handleEditSave={handleEditedSave}
              /> */}
            </>
          )

          {
            /* return (
          <ItemC
            key={value.id}
            value={value}
            handleReplyToggle={handleReplyToggle}
            handleEditedToggle={handleEditedToggle}
            handleDelete={handleDelete}
            handleCompleted={handleCompleted}
          />
        ) */
          }
        })}
      </div>
    </div>
  )
}

export default List