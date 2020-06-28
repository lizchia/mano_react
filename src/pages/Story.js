import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import MyBanner from '../components/MyBanner'
import AddFrom from '../components/Story/AddFrom'
import List from '../components/Story/List'
import ItemC from '../components/Story/ItemC'
//import ItemR from '../components/Comment/ItemR'
//import ReplyForm from '../components/Comment/ReplyForm'
import { Button } from 'react-bootstrap'
import requestToServer from '../utils/requestToServer'
import ReplyForm from '../components/Story/ReplyForm'

function Story(props) {
  const [com, setCom] = useState([])
  const [text, setText] = useState('')
  const [username, setUser] = useState('')
  const [heart, setHeart] = useState(0)
  const [img, setImg] = useState('')
  // const [page, setPage] = useState('')
  const {
    replyCom,
    setReplyCom,
    replyText,
    setReplyText,
    replyUser,
    setReplyUser,
  } = props
  const localMember = JSON.parse(localStorage.getItem('member')) || [
    { memberName: '', memberId: '' },
  ]
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

  function doUpload(event) {
    fetch('http://localhost:3002/comment/try-upload2', {
      method: 'POST',
      body: new FormData(document.form1),
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj)
      })
  }

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
      newCom[comIndex].reply = !newCom[comIndex].reply
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
      newCom[comIndex].edited = !newCom[comIndex].edited
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
  const handleEditedHeartPlus = (cid, value) => {
    const newHeart = heart + value
    const comIndex = com.findIndex((v, i) => v.cid === cid)
    if (comIndex !== -1) {
      console.log(heart)
      com[comIndex].heart = heart
      updateComToServer(com[comIndex])
      setHeart(newHeart)
    }
  }
  const handleDelete = (cid) => {
    const newCom = com.filter((v, i) => v.cid !== cid)
    setCom(newCom)
  }
  const handleImgToDirectory = (event) => {
    console.log(event.value)
    doUpload(event)
    alert('上傳成功')
  }
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-end">
          <div className="col-3">
            <AddFrom
              username={username}
              text={text}
              img={img}
              com={com}
              setUser={setUser}
              setText={setText}
              setImg={setImg}
              setCom={setCom}
              addNewTodoItemToSever={addNewTodoItemToSever}
              doUpload={doUpload}
              handleImgToDirectory={handleImgToDirectory}
            />
          </div>
          <div className="col-3">
            <input
              type="search"
              style={{ width: '150px', border: '1px solid grey' }}
              //className="btn-success btn-block btn-rounded z-depth-1 text-center"
              onChange={(event) => {
                console.log(event.target.value)
                //com.filter().includes(event.target.value)
              }}
            ></input>
          </div>
        </div>
        <div style={{ height: '50px' }}></div>
        <List
          com={com}
          handleCompleted={handleCompleted}
          handleDelete={handleDelete}
          handleReplyToggle={handleReplyToggle}
          handleEditedToggle={handleEditedToggle}
          handleEditedSave={handleEditedSave}
          handleCompleted={handleCompleted}
          handleEditedHeartPlus={handleEditedHeartPlus}
        />
      </div>
    </>
  )
}

export default withRouter(Story)
