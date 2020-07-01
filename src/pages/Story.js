import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import MyBanner from '../components/MyBanner'
import AddFrom from '../components/Story/AddFrom'
import List from '../components/Story/List'
import ItemC from '../components/Story/ItemC'
import { Button } from 'react-bootstrap'

function Story(props) {
  const [com, setCom] = useState([])
  const [text, setText] = useState('')
  //const [username, setUser] = useState('')
  const [member, setMember] = useState([])
  const [img, setImg] = useState('')
  const [searchValue, setSearchValue] = useState("")
  // const [page, setPage] = useState('')

  async function getComFromServer() {
    const request = new Request('http://localhost:3002/story/', {
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
    const request = new Request('http://localhost:3002/story', {
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
    fetch('http://localhost:3002/story/try-upload2', {
      method: 'POST',
      body: new FormData(document.form1),
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj)
      })
  }

  async function updateComToServer(item) {
    const request = new Request('http://localhost:3002/story/' + item.cid, {
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
  async function deleteComToServer(item) {
    const request = new Request('http://localhost:3002/story/' + item.cid, {
      method: 'Delete',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })
    const response = await fetch(request)
    const data = await response.json()
  }
  // 一開始就會開始載入資料
  useEffect(() => {
    props.changeBackgroundColorWhite()
    getComFromServer()
    const member = JSON.parse(localStorage.getItem('member')) || [
      { memberName: '', memberId: '' },
    ]
    setMember(member[0].memberName)
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
  const handleEditedToggle = (cid) => {
    const newCom = [...com]
    const comIndex = com.findIndex((v, i) => v.cid === cid)
    if (comIndex !== -1) {
      newCom[comIndex].edited = !newCom[comIndex].edited
      updateComToServer(newCom[comIndex])
      setCom(newCom)
    }
  }
  const handleEditedSave = (cid, member, text) => {
    const newCom = [...com]
    const comIndex = com.findIndex((v, i) => v.cid === cid)
    if (comIndex !== -1) {
      newCom[comIndex].member = member
      newCom[comIndex].text = text
      updateComToServer(newCom[comIndex])
      // newCom[comIndex].edited = !newCom[comIndex].edited
      setCom(newCom)
    }
    handleEditedToggle(cid)
  }
  const handleDelete = (cid) => {
    const newCom = com.filter((v, i) => v.cid !== cid)
    deleteComToServer(cid)
    setCom(newCom)
  }
  const handleImgToDirectory = (event) => {
    console.log(event.value)
    doUpload(event)
    alert('上傳成功')
  }
  const handleSearch = (searchValue) => {
    const result = com.filter((obj) =>
      obj.username.includes(searchValue)
    )
    setCom(result)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-7 d-flex">
            <div className="col-9">
              <AddFrom
                member={member}
                text={text}
                img={img}
                com={com}
                setMember={setMember}
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
                style={{ width:'100px',border: '1px solid #D4AE5C' }}
                placeholder="找朋友"
                onFocus={{ border: '1px solid grey' }}
                value={searchValue}
                //className="btn-success btn-block btn-rounded z-depth-1 text-center"
                onChange={(event)=> {
                  setSearchValue(event.target.value)
                  if (event.target.value === "") getComFromServer()
                }}
                onKeyPress={(event) => {
                  //handleSearch()
                    console.log(searchValue)
                  console.log(
                    com.filter((obj) =>
                      obj.username.includes(searchValue)
                    )
                  )
                  
                  //com.filter().includes(event.target.value)
                  handleSearch(searchValue)


                }}
              ></input>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
        <div style={{ height: '50px' }}></div>
        <List
          com={com}
          handleCompleted={handleCompleted}
          handleDelete={handleDelete}
          handleEditedToggle={handleEditedToggle}
          handleEditedSave={handleEditedSave}
          handleCompleted={handleCompleted}
        />
      </div>
    </>
  )
}

export default withRouter(Story)