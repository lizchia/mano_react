import React, { useState } from 'react'

function EditForm(props) {
  const [editText, setEditText] = useState(props.value.text)
  const [editUser, setEditUser] = useState(props.value.username)

  //console.log('EditForm',props)
  // 先解構賦值，直接套用由props得到的變數值
  const { value, handleEditSave } = props
  console.log(props)
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="form-inline">
        <input
          className="form-control mb2"
          type="text"
          value={editUser}
          onChange={(event) => {
            setEditUser(event.target.value)
          }}
        />
        <input
          id="todoEdit"
          className="form-control mb2"
          type="text"
          value={editText}
          placeholder={value}
          onChange={(event) => {
            setEditText(event.target.value)
          }}
        />
        <button
          type="button"
          className="btn btn-info mb2"
          onClick={() => {
            console.log(handleEditSave)
            handleEditSave(value.cid, editUser, editText)
          }}
        >
          儲存
        </button>
      </div>
    </li>
  )
}

export default EditForm
