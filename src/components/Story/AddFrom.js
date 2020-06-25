import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormFileInput from 'react-bootstrap/FormFileInput'
//import { object } from 'prop-types'

function AddForm(props) {
  console.log(props)
  // 先解構賦值，直接套用由props得到的變數值
  const {
    event,
    username,
    text,
    img,
    com,
    setCom,
    setText,
    setUser,
    setImg,
    addNewTodoItemToSever,
    handleImgToDirectory,
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
        placeholder="有什麼想說的嗎？"
        onChange={(event) => {
          setText(event.target.value)
        }}
        required
      />
      <label for="exampleFormControlFile1">Example file input</label>
      <Form name="form1">
        <input
          id="avatar"
          name="avatar"
          type="file"
          value={img}
          className="form-control-file"
          onChange={(event) => {
            console.log(event.target)
            setImg(event.target.value)
          }}
        />
      </Form>
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
              completed: 0,
              heart: 0,
              parentReply: null,
              commentImg: img,
            }

            // 建立新的todos陣列
            //const newCom = comment.push(newComItem)
            setCom([newComItem, ...com])
            // 設定新的todos，變動呈現的列
            addNewTodoItemToSever(newComItem)
            console.log(event)
            handleImgToDirectory(event)

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
