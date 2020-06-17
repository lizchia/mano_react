import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import Table from 'react-bootstrap/Table'
import { ToastsContainer, ToastsStore } from 'react-toasts'

import MyBanner from '../components/MyBanner'
import AddFrom from '../components/Comment/AddFrom'
import List from '../components/Comment/List'
// import { Button } from 'react-bootstrap'
import requestToServer from '../utils/requestToServer'

function Marketing(props) {
  const [com, setCom] = useState([])
  const [text, setText] = useState('')
  const [username, setUser] = useState('')

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
    //const comments = data.rows
    setCom(data)
    //console.log(data.rows)
  }

  async function addNewTodoItemToSever(item) {
    //console.log(item)
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
    setCom(data)
  }

  // function handleInsertSave (comment) {
  //   const newComment = comment
  //   addNewTodoItemToSever(newComment)
  //   setCom(newComment)
//}
  
  async function updateComToServer(item) {
    const request = new Request('http://localhost:3002/comment/' + item.id, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
    const comments = data.rows
    setCom(comments)
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
  const handleCompleted = (id) => {
    const newCom = [...com]
    const comIndex = com.findIndex((v, i) => v.id === id)
    if (comIndex !== -1) {
      newCom[comIndex].completed = !newCom[comIndex].completed
      updateComToServer(newCom[comIndex], () => {
        setCom(newCom)
      })
    }
  }
  const handleEditedToggle = (id) => {
    const newCom = [...com]
    const comIndex = com.findIndex((v, i) => v.id === id)
    if (comIndex !== -1) {
      console.log(newCom)
      newCom[comIndex].editd = !newCom[comIndex].editd
      updateComToServer(newCom[comIndex], () => {
        setCom(newCom)
      })
    }
  }
  const handleEditedSave = (id, username, text) => {
    const newCom = [...com]
    const comIndex = com.findIndex((v, i) => v.id === id)
    if (comIndex !== -1) {
      newCom[comIndex].username = username
      newCom[comIndex].text = text
      updateComToServer(newCom[comIndex])
      setCom(newCom)
    }
    handleEditedToggle(id)
  }

  const handleDelete = (id) => {
    const newCom = com.filter((v, i) => v.id !== id)
    setCom(newCom)
  }
  console.log(props)
  console.log(com)
  console.log(setCom)
  return (
    <>
      <MyBanner title="專屬優惠" lead="mano友" />
      <Table responsive>
        <tr>
          <th>手摘</th>
          <th></th>
        </tr>

        <tr>
          <td>生日禮</td>
          <td>300元生日禮金</td>
        </tr>
        <tr>
          <td>全館消費</td>
          <td>單單九折</td>
        </tr>
        <tr>
          <th>一番茶</th>
          <th></th>
        </tr>
        <tr>
          <td>生日禮</td>
          <td>100元生日禮金</td>
        </tr>
        <tr>
          <td>全館消費</td>
          <td>單單九五折</td>
        </tr>
        <tr>
          <th>二番茶</th>
          <th></th>
        </tr>
        <tr>
          <td>新手禮</td>
          <td>300元購物禮金</td>
        </tr>
      </Table>
      <div>
        <Link
          onClick={() =>
            ToastsStore.success(<Link to="/">快點我成為會員！</Link>)
          }
        >
          <img src="/picture/m.jpg" />
        </Link>
        <ToastsContainer store={ToastsStore} lightBackground />
      </div>
      <hr />
      <AddFrom
        username={username}
        text={text}
        com={com}
        setUser={setUser}
        setText={setText}
        setCom={setCom}
        addNewTodoItemToSever={addNewTodoItemToSever}
        // handleInsertSave={handleInsertSave}
      />
      <List
        com={com}
        handleCompleted={handleCompleted}
        handleDelete={handleDelete}
        handleEditedToggle={handleEditedToggle}
        handleEditedSave={handleEditedSave}
      />
    </>
  )
}

export default withRouter(Marketing)
