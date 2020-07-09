import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, ListGroup, Image } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'

import MemberSideLink from './MemberSideLink'
import MyBreadcrumb from '../components/MyBreadcrumbForMember'

function MemberStory(props) {
  const [story, setStory] = useState([])
  const [storyusedlist, setStoryusedlist] = useState([])

  const [storyshow, setStoryshow] = useState(true)
  const localMember = JSON.parse(localStorage.getItem('member')) || [
    { memberName: '', memberId: '' },
  ]

  function changeBackgroundColorDark() {
    document.body.style.background = '#5C6447'
  }

  async function getData(memberName) {
    const request = new Request(
      `http://localhost:3002/membercenter/memberstory/${memberName}`,
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
    setStory(data)
  }
  async function getlovedData() {
    const request = new Request(
      `http://localhost:3002/membercenter/memberstoryloved/`,
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
    setStoryusedlist(data)
  }
  async function deleteComToServer(value) {
    const request = new Request(
      'http://localhost:3002/membercenter/memberstory/' + value.id,
      {
        method: 'Delete',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
      }
    )
    const response = await fetch(request)
    const data = await response.json()
  }

  useEffect(() => {
    getData(localMember[0].memberName)
    changeBackgroundColorDark()
    document.getElementById('maintable').classList.add('coupontable')
  }, [])

  const handleDelet = (value) => {
    const newCom = story.filter((v, i) => v.id !== value)
    console.log(value)
    setStory(newCom)
  }

  const storynotused = story.map((value, index) => {
    return (
      <tr style={{ border: '2px solid #C5895A' }}>
        <td>{value.username}</td>
        <td style={{ color: ' #C5895A' }}>{value.text}</td>
        <td>
          <img
            style={{ width: '100px', height: '100px' }}
            src={`http://localhost:3002/img-uploads/${value.commentImg}`}
            rounded
          ></img>
        </td>
        <td>
          <a
            onClick={() => {
              alert(`確定要刪除「${value.text}」這篇文章嗎？`)
              console.log(value.id)
              handleDelet(value.id)
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </a>
        </td>
      </tr>
    )
  })
  const storyused = storyusedlist.map((value, index) => {
    return (
      <tr style={{ border: '2px solid #C5895A' }}>
        <td>{value.username}</td>
        <td style={{ color: ' #C5895A' }}>{value.text}</td>
        <td>
          <img
            style={{ width: '100px', height: '100px' }}
            src={`http://localhost:3002/img-uploads/${value.commentImg}`}
            rounded
          ></img>
        </td>
        <td>
          <a
            onClick={() => {
              alert(`確定要刪除「${value.text}」這篇文章嗎？`)
              console.log(value.id)
              handleDelet(value.id)
            }}
          >
            <i className="fas fa-heart"></i>
          </a>
        </td>
      </tr>
    )
  })
  const activebutton = {
    width: '120px',
    height: '44px',
    color: '#5C6447',
    borderBottom: '2px solid #C5895A',
  }
  const normalbutton = { width: '120px', height: '44px', color: '#5C6447' }

  return (
    <>
      <MyBreadcrumb />
      <MemberSideLink>
        <Col
          md={10}
          xs={12}
          className="mb-5"
          style={{
            background: 'white',
            padding: '0',
            borderRadius: '5px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '44px',
              background: '#D1DBCE',
              marginBottom: '32px',
            }}
          >
            <button
              className="btn"
              style={storyshow ? activebutton : normalbutton}
              onClick={() => {
                setStoryshow(true)
              }}
            >
              我的文章
            </button>
            <button
              className="btn"
              style={storyshow ? normalbutton : activebutton}
              onClick={() => {
                getlovedData()
                setStoryshow(false)
              }}
            >
              讚過的內容
            </button>
          </div>
          <Col md={{ span: 10, offset: 1 }}>
            <Table id="maintable">
              <thead
                style={{ border: '2px solid #C5895A', borderBottom: '#C5895A' }}
              >
                <tr className="bg-primary ">
                  <th>抹之友</th>
                  <th>內容</th>
                  <th>照片</th>
                  <th>功能</th>
                </tr>
              </thead>
              <tbody
                style={{ border: '2px solid #C5895A', borderTop: '#C5895A' }}
              >
                {storyshow ? storynotused : storyused}
              </tbody>
            </Table>
          </Col>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="../../life/story">回到故事牆</Link>
          </div>
        </Col>
      </MemberSideLink>
    </>
  )
}
export default MemberStory
