import React from 'react'
import Button from 'react-bootstrap/Button'

function AddForm(props) {
  //console.log(props)
  // 先解構賦值，直接套用由props得到的變數值
  const {
    username,
    text,
    heart,
    com,
    setCom,
    setText,
    setHeart,
    setUser,
    addNewTodoItemToSever,
  } = props
  // console.log(com)
  // console.log(setCom)
  // 星星组件
  function Star({ marked, starId }) {
    return (
      <span
        star-id={starId}
        style={{ fontSize: '25pt', color: '#D4AE5C' }}
        role="button"
      >
        {marked ? '\u2605' : '\u2606'}
      </span>
    )
  }
  const [selection, setSelection] = React.useState(0)
  const hoverOver = (event) => {
    let val = 0
    if (event && event.target && event.target.getAttribute('star-id'))
      val = event.target.getAttribute('star-id')
    setSelection(val)
  }

  return (
    <div className="form-group">
      <label style={{ fontSize: '13pt' }} htmlFor="todoInput">
        {' '}
        評價商品{' '}
      </label>
      <div
        onMouseOut={() => hoverOver(null)}
        value={heart}
        onClick={(event) => {
          console.log(event.target.getAttribute('star-id'))
          setHeart(event.target.getAttribute('star-id') || 0)
        }}
        onMouseOver={hoverOver}
      >
        {Array.from({ length: 5 }, (v, i) => (
          <Star
            starId={i + 1}
            key={`star_${i + 1} `}
            marked={selection ? selection >= i + 1 : heart >= i + 1}
          />
        ))}
      </div>
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
        required
      />
      <textarea
        id="todoInput"
        className="form-control"
        type="text"
        value={text}
        placeholder="有什麼想法嗎？"
        onChange={(event) => {
          setText(event.target.value)
        }}
        required
      />
      <br />
      <Button
        variant="secondary"
        size="sm"
        onClick={(event) => {
          // 處理按下 Enter鍵
          if (heart !== '' && username !== '' && text !== '') {
            // 建立一個新的todo項目
            const newComItem = {
              id: +new Date(),
              username: username,
              text: text,
              edited: 0,
              completed: 0,
              heart: heart,
              parentReply: null,
              commentImg: '',
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
