import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import MyBanner from '../components/MyBanner'
import AddFrom from '../components/Comment/AddFrom'
import List from '../components/Comment/List'
import ItemC from '../components/Comment/ItemC'
import ItemR from '../components/Comment/ItemR'
//import ReplyForm from '../components/Comment/ReplyForm'
import { Button } from 'react-bootstrap'
import requestToServer from '../utils/requestToServer'
import ReplyForm from '../components/Comment/ReplyForm'

function Comment(props) {
  const [heart, setHeart] = React.useState(
    typeof props.heart == 'number' ? props.heart : 0
  )
  const [com, setCom] = useState([])
  const [text, setText] = useState('')
  const [username, setUser] = useState('')
  //const [heart, setHeart] = useState(0)
  // const [page, setPage] = useState('')
  const {
    replyCom,
    setReplyCom,
    replyText,
    setReplyText,
    replyUser,
    setReplyUser,
  } = props
  async function getComFromServer() {
    const request = new Request('http://localhost:3002/comment/', {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'appliaction/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    const comments = data.rows
    // const totalpages = data.totalPage
    setCom(comments)
    // setPage(totalpages)
    //console.log(data.rows)
  }

  async function addNewTodoItemToSever(item) {
    // 開啟載入指示

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:3002/comment', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    //console.log("項目",JSON.stringify(item))
    const response = await fetch(request)
    const data = await response.json()
    //const comments = data.rows
    console.log('伺服器回傳的json資料', data)
    // 要等驗証過，再設定資料(簡單的直接設定)
    // setCom(comments)
  }

  // function handleInsertSave (comment) {
  //   const newComment = comment
  //   addNewTodoItemToSever(newComment)
  //   setCom(newComment)
  //}
  async function updateComToServer(item) {
    const request = new Request('http://localhost:3002/comment/' + item.cid, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    //const comments = data.rows
    //setCom(comments)
  }
  // 一開始就會開始載入資料
  useEffect(() => {
    getComFromServer()
  }, [])

  // 每次total資料有變動就會3秒後關掉載入指示
  useEffect(() => {
    // setTimeout(() => {
    //   setDataLoading(false)
    // }, 500)
  }, [com])
  const handleCompleted = (cid) => {
    const newCom = [...com]
    const comIndex = com.findIndex((v, i) => v.cid === cid)
    if (comIndex !== -1) {
      newCom[comIndex].completed = !newCom[comIndex].completed
      updateComToServer(newCom[comIndex])
      setCom(newCom)
    }
  }
  const handleReplyToggle = (cid) => {
    const newCom = [...com]
    const comIndex = com.findIndex((v, i) => v.cid === cid)
    if (comIndex !== -1) {
      // console.log(newCom)
      // console.log(newCom[comIndex])
      // console.log(comIndex)
      // console.log(newCom[comIndex].edited)
      // for(let i in newCom[comIndex]){
      //   let o = newCom[comIndex][i]
      //   console.log(i, o)
      // }
      // console.log(newCom[comIndex].constructor.name)
      newCom[comIndex].reply = !newCom[comIndex].reply
      // console.log(newCom)
      // console.log(newCom[comIndex])
      // console.log(newCom[comIndex].edited)
      updateComToServer(newCom[comIndex])
      setCom(newCom)
    }
  }
  const handleReplySave = (id) => {
    const newCom = [...replyCom]
    const comIndex = replyCom.findIndex((v, i) => v.id === id)
    if (comIndex !== -1) {
      newCom[comIndex].reply = !newCom[comIndex].reply
      addNewTodoItemToSever(newCom[comIndex])
      setReplyCom(newCom)
    }
  }
  const handleEditedToggle = (cid) => {
    const newCom = [...com]
    const comIndex = com.findIndex((v, i) => v.cid === cid)
    if (comIndex !== -1) {
      // console.log(newCom)
      // console.log(newCom[comIndex])
      // console.log(comIndex)
      // console.log(newCom[comIndex].edited)
      // for(let i in newCom[comIndex]){
      //   let o = newCom[comIndex][i]
      //   console.log(i, o)
      // }
      // console.log(newCom[comIndex].constructor.name)
      newCom[comIndex].edited = !newCom[comIndex].edited
      // console.log(newCom)
      // console.log(newCom[comIndex])
      // console.log(newCom[comIndex].edited)
      updateComToServer(newCom[comIndex])
      setCom(newCom)
    }
  }
  const handleEditedSave = (cid, replyUser, replyText) => {
    const newCom = [...replyCom]
    const comIndex = replyCom.findIndex((v, i) => v.replyUser === replyUser)
    if (comIndex !== -1) {
      newCom[comIndex].replyUser = replyUser
      newCom[comIndex].replyText = replyText
      updateComToServer(newCom[comIndex])
      // newCom[comIndex].edited = !newCom[comIndex].edited
      setReplyCom(newCom)
    }
    handleEditedToggle(cid)
  }
  const handleDelete = (cid) => {
    const newCom = com.filter((v, i) => v.cid !== cid)
    setCom(newCom)
  }
  return (
    <>
      <div className="container">
        <AddFrom
          heart={heart}
          username={username}
          text={text}
          com={com}
          setHeart={setHeart}
          setUser={setUser}
          setText={setText}
          setCom={setCom}
          addNewTodoItemToSever={addNewTodoItemToSever}
        />
        <List
          com={com}
          handleCompleted={handleCompleted}
          handleDelete={handleDelete}
          handleReplyToggle={handleReplyToggle}
          handleEditedToggle={handleEditedToggle}
          handleEditedSave={handleEditedSave}
          handleCompleted={handleCompleted}
          // handleEditedHeartPlus={handleEditedHeartPlus}
        />
      </div>
    </>
  )
}

export default withRouter(Comment)