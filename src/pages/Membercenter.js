import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, ListGroup, Image } from 'react-bootstrap'

import { withRouter } from 'react-router-dom'
import MemberListShow from './MemberListShow'
import Editpassword from './Editpassword'
import MyBreadcrumb from '../components/MyBreadcrumbForMember'

function Membercenter(props) {
  const { changeBackgroundColorDark } = props
  const [member, setMember] = useState('')
  const [isedit, setIsedit] = useState(false)
  const [ischangepwd, setIschangepwd] = useState(false)

  const localMember = JSON.parse(localStorage.getItem('member')) || [
    { memberName: '', memberId: '' },
  ]

  async function getData(memberId) {
    const request = new Request(
      `http://localhost:3002/membercenter/list/${memberId}`,
      {
        method: 'GET',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'appliaction/json',
        }),
      }
    )

    const response = await fetch(request)
    const data = await response.json()
    console.log('顯示的資料', data)
    // 設定資料
    setMember(data[0])
  }
  useEffect(() => {
    getData(localMember[0].memberId)
    changeBackgroundColorDark()
  }, [])
  async function updateMemberToSever(item, successCallback = () => {}) {
    // 開啟載入指示
    // setDataLoading(true)

    // 注意資料格式要設定，伺服器才知道是json格式
    const request = new Request('http://localhost:3002/membercenter/edit', {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    console.log('After JSON: ', JSON.stringify(item))

    const response = await fetch(request)
    const data = await response.json()

    // console.log('伺服器回傳的json資料', data)
    // 要等驗証過，再設定資料(簡單的直接設定)

    // if (data.id) {
    //   successCallback()
    //   console.log('call successCallback')
    // }
  }
  const handleEditedSave = (member) => {
    const newMember = member
    updateMemberToSever(newMember)
    setMember(newMember)
    alert('儲存成功')
  }

  //把新的圖片名稱存回database
  async function updateImgToSever(item, successCallback = () => {}) {
    const request = new Request('http://localhost:3002/membercenter/upimg', {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    })

    const response = await fetch(request)
    const data = await response.json()
    // await document.getElementById("myimg").setAttribute('src', 'http://localhost:3002/img-uploads/' +data.filename);
  }
  const handleImgSave = (member) => {
    const newMember = member
    updateImgToSever(newMember)
    setMember(newMember)
    alert('儲存成功')
  }

  return (
    <>
      <MyBreadcrumb />
      {ischangepwd ? (
        <Editpassword
          member={member}
          setMember={setMember}
          ischangepwd={ischangepwd}
          setIschangepwd={setIschangepwd}
          handleEditedSave={handleEditedSave}
          localMember={localMember}
        />
      ) : (
        <MemberListShow
          member={member}
          setMember={setMember}
          isedit={isedit}
          setIsedit={setIsedit}
          handleEditedSave={handleEditedSave}
          ischangepwd={ischangepwd}
          setIschangepwd={setIschangepwd}
          handleImgSave={handleImgSave}
          localMember={localMember}
        />
      )}
    </>
  )
}

export default Membercenter
