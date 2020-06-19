import React from 'react'
import Button from 'react-bootstrap/Button'

function AddForm(props) {
  console.log(props)
  // 先解構賦值，直接套用由props得到的變數值
  const {
    username,
    text,
    com,
    setCom,
    setText,
    setUser,
    addNewTodoItemToSever,
  } = props
  console.log(com)
  console.log(setCom)

  return (
    <div className="form-group">
      <label htmlFor="todoInput">留言</label>
      <input
        id="memberID"
        className="form-control"
        type="text"
        value={username}
        placeholder="姓名"
        onChange={(event) => {
          console.log(event.target.value)
          setUser(event.target.value)
        }}
      />
      <textarea
        id="todoInput"
        className="form-control"
        type="text"
        value={text}
        placeholder="輸入完請按enter"
        onChange={(event) => {
          setText(event.target.value)
        }}
        required
      />
      <Button
        variant="secondary"
        size="sm"
        onClick={(event) => {
          // 處理按下 Enter鍵
          if (text !== '') {
            // 建立一個新的todo項目
            const newComItem = {
              id: +new Date(),
              username: username,
              text: text,
              edited: 0,
            }

            // 建立新的todos陣列
            //const newCom = comment.push(newComItem)
            setCom([newComItem, ...com])
            // 設定新的todos，變動呈現的列
            addNewTodoItemToSever(newComItem)

            //console.log(newComItem)

            // 清空文字輸入框
            setUser('')
            setText('')
          }
        }}
      >
        Post
      </Button>
    </div>
  )
}
export default AddForm
