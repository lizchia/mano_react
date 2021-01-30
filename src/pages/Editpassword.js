import React, { useState, useEffect } from "react"
import { Form, Alert,Col } from "react-bootstrap"
import MemberSideLink from "./MemberSideLink"


var sha1 = require('sha1');



function Editpassword(props) {
  const { member, setMember, ischangepwd, setIschangepwd,handleEditedSave,localMember } = props
  const [thesame, setThesame] = useState(false)
  const [pwd1, setPwd1] = useState("")
  const [pwd2, setPwd2] = useState("")
  const [oldpwd, setOldpwd] = useState("")
  const [newmember,setNewmember] = useState("")
  const [content, setContent] = useState(false)
  const [appear, setAppear] = useState(false)
  
  function checkOldPwd() {
    // console.log(member.pwd)
    // console.log("before",oldpwd,"after",sha1(oldpwd))
    if (sha1(oldpwd) === member.pwd) {
      setThesame(true)
    } else {
      setThesame(false)
    }
  }
  function validate() {
    if (pwd1 == pwd2 && pwd1.length > 5) {
      setContent(true)
    } else {
      setContent(false)
    }
  }
 
  return (
    <>
    <MemberSideLink>
    <Col md={10}>
      <h1 className="text-white">修改會員密碼</h1>
      <form style={{ width: "200px" ,color:"white"}}>
        <Form.Group controlId="formBasicEmail" >
          <Form.Label>輸入舊密碼</Form.Label>
          <Form.Control
            id="oldpassword"
            type="password"
            onFocus={()=>setAppear(true)}
            onKeyUp={()=>checkOldPwd()}
            onChange={(event) => {
              setOldpwd(event.target.value)
            }}
            required
          />
          {!appear ? (
            ""
          ) : (
            <Alert id="hint1" variant={thesame ? "success" : "danger"}>
              {thesame ? "通過密碼" : "密碼不通過請重新輸入"}
            </Alert>
          )}
          <Form.Label>輸入新密碼</Form.Label>
          <Form.Control
            id="pwd1"
            type="password"
            min={8}
            onFocus={()=>{setMember({...member,
              memberId:localMember[0].memberId});}}
            onKeyUp={() => validate()}
            value={pwd1}
            onChange={(event) => {
              setNewmember(member)
              setPwd1(event.target.value)
            }}
            required
          />
          <Form.Label>再次輸入新密碼</Form.Label>
          <Form.Control
            id="pwd2"
            type="password"
            value={pwd2}
            onKeyUp={() =>{ validate();setNewmember({
              ...newmember,
              pwd: sha1(pwd2),
            })}}
            onChange={(event) => {
              setPwd2(event.target.value)
            }}
            required
          />
          {pwd1 === "" ? (
            ""
          ) : (
            <Alert id="hint2" variant={content ? "success" : "danger"}>
              {content ? "兩次密碼一致" : "兩次密碼不一致，密碼至少要8個字以上"}
            </Alert>
          )}
          <button
            className="btn btn-primary"
            onClick={() => {
              
              setIschangepwd(!ischangepwd)
              handleEditedSave(newmember)
            }}
            disabled={!(content && thesame)}
          >
            Submit
          </button>
          <div style={{width:'10px'}}>   </div>
          <button
            className="btn btn-secondary"
            onClick={() => {              
              setIschangepwd(!ischangepwd)
            }}
          >
            取消修改
          </button>
        </Form.Group>
      </form>
      </Col>
    </MemberSideLink>
    </>
  )
}
export default Editpassword
