import React, { useState, useEffect } from 'react'
import {
  Table,
  Container,
  Row,
  Col,
  ListGroup,
  Image,
  Form,
} from 'react-bootstrap'
import areaData from './areaData'
function MemberEditForm(props) {
  const {
    member,
    setMember,
    isedit,
    setIsedit,
    handleEditedSave,
    handleImgSave,
    localMember,
  } = props

  //選擇地區時會自動改變
  const [indexstatus, setIndexstatus] = useState(0)
  const city = areaData.map((value, index) => {
    return (
      <option key={index} value={value.city}>
        {value.city}
      </option>
    )
  })
  const district = areaData.map((value, index) => {
    return value.district.map((area, index) => {
      return (
        <option key={index} value={area}>
          {area}
        </option>
      )
    })
  })
  function areaChange() {
    var objS = document.getElementById('pid')
    setIndexstatus(objS.selectedIndex)
  }
  //真正的圖片上傳
  function doUpload(event) {
    // const fd = new FormData(document.form1)
    fetch('http://localhost:3002/membercenter/try-upload2', {
      method: 'POST',
      body: new FormData(document.form1),
    })
      .then((r) => r.json())
      .then((obj) => {
        //$('#myimg').attr('src', '/img-uploads/' +obj.filename)
        console.log(obj.filename)
        setMember({
          ...member,
          memberImg: obj.filename,
        })
      })
  }
  const handleImgToDirectory = (event) => {
    doUpload(event)
    alert('上傳成功')
  }
  useEffect(() => {
    // setMember({ ...member, memberId: localMember[0].memberId })
  })

  return (
    <>
      <Col md={10} xs={12} style={{ background: 'white' }}>
        <Table responsive style={{ color: '#5C6447' }}>
          <thead>
            <tr>
              <Image
                style={{ width: '100px', height: '100px' }}
                src={`http://localhost:3002/img-uploads/${member.memberImg}`}
                alt={member.memberImg}
                rounded
              />
              <th colSpan={4}>
                <Form name="form1">
                  <Form.Group>
                    <Form.File
                      id="avatar"
                      name="avatar"
                      onChange={(event) => {
                        handleImgToDirectory(event)
                        setMember({
                          ...member,
                          memberId: localMember[0].memberId,
                        })
                      }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={(event) => {
                        handleImgSave(member)
                      }}
                    >
                      儲存為新的大頭貼
                    </button>
                  </Form.Group>
                </Form>
                <img src="" alt="" id="myimg"></img>
              </th>
            </tr>
            <tr>
              <th>會員帳號(email)</th>
              <th>會員密碼</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  id="editemail"
                  type="email"
                  value={member.email}
                  onChange={(event) => {
                    setMember({
                      ...member,
                      email: event.target.value,
                    })
                  }}
                />
              </td>
              <td>******</td>
            </tr>
          </tbody>
          <thead>
            <th>姓名</th>
            <th>聯絡電話</th>
          </thead>
          <tbody>
            <td>
              <input
                id="editmemberName"
                type="text"
                value={member.memberName}
                onChange={(event) => {
                  setMember({
                    ...member,
                    memberName: event.target.value,
                  })
                }}
              />
            </td>
            <td>
              <input
                id="editphone"
                type="text"
                value={member.phone}
                onChange={(event) => {
                  setMember({
                    ...member,
                    phone: event.target.value,
                  })
                }}
              />
            </td>
          </tbody>
          <thead>
            <tr>
              <th>住址所在地</th>
              <th>詳細地址</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {member.paymentCity}
                {member.paymentDistrict}
                <br />
                <select
                  id="pid"
                  onChange={(event) => {
                    areaChange()
                    setMember({
                      ...member,
                      paymentCity: event.target.value,
                      paymentDistrict: '請選擇區域',
                    })
                  }}
                >
                  {city}
                </select>
                <select
                  onChange={(event) => {
                    setMember({
                      ...member,
                      paymentDistrict: event.target.value,
                    })
                  }}
                >
                  {district[indexstatus]}
                </select>
              </td>
              <td>
                <input
                  id="editshipAddress"
                  type="text"
                  value={member.shipAddress}
                  onChange={(event) => {
                    setMember({
                      ...member,
                      shipAddress: event.target.value,
                    })
                  }}
                />
              </td>
            </tr>
          </tbody>
          <thead>
            <th>會員等級</th>
            <th>會員加入時間</th>
          </thead>
          <tbody>
            <td>{member.class}</td>
            <td>{member.created_at}</td>
          </tbody>
        </Table>
        <div className=" d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onMouseEnter={() => {
              setMember({ ...member, memberId: localMember[0].memberId })
            }}
            onClick={() => {
              handleEditedSave(member)
              setIsedit(!isedit)
            }}
          >
            SAVE
          </button>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setIsedit(!isedit)}
          >
            取消編輯
          </button>
        </div>
      </Col>
    </>
  )
}
export default MemberEditForm
