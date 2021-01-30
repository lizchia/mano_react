import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormFileInput from 'react-bootstrap/FormFileInput'
//import { object } from 'prop-types'

function AddForm(props) {
  const {
    member,
    text,
    img,
    com,
    setCom,
    setText,
    setMember,
    setImg,
    addNewTodoItemToSever,
    handleImgToDirectory,
  } = props
  // console.log(com)
  return (
    <div className="container">
      {/* <label htmlFor="todoInput">留言</label>
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
      <Form name="form2">
        <input
          id="avatar"
          name="avatar"
          type="file"
          className="form-control-file"
          onChange={(event) => {
            let img2 = event.target.value.substr(12)
            console.log(img2)
            setImg(img2)
          }}
        />
      </Form>
      <Button
        variant="secondary"
        size="sm"
        onClick={(event) => {
          // 處理按下 Enter鍵
          if (text !== '') {
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
            setCom([newComItem, ...com])
            addNewTodoItemToSever(newComItem)
            console.log(event)
            handleImgToDirectory(event)
            setUser('')
            setText('')
          }
        }}
      >
        Post
      </Button> */}
      {/* Modal */}
      <div
        class="modal fade"
        id="darkModalForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog form-dark" role="document">
          {/* Content */}
          <div
            class="modal-content card card-image"
            style={{ backgroundImage: 'url(/picture/leaves.jpg)' }}
          >
            <div class="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
              {/* Header */}
              <div class="modal-header text-center pb-4">
                <h3
                  class="modal-title w-100 white-text font-weight-bold"
                  id="myModalLabel"
                >
                  <strong>留</strong>{' '}
                  <a class="green-text font-weight-bold">
                    <strong> 言</strong>
                  </a>
                </h3>
                <button
                  type="button"
                  class="close white-text"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              {/* Body */}
              <div class="modal-body">
                {/* Body */}
                <div class="md-form mb-5">
                  <input
                    id="memberID"
                    className="form-control"
                    type="text"
                    value={member}
                    placeholder="請先登入會員喔"
                    onChange={(event) => {
                      console.log(member)
                      console.log(event.target.value)
                    }}
                    disabled
                  />
                </div>

                <div class="md-form pb-3">
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

                  <div class="form-group mt-4">
                    <Form name="form1">
                      <label for="avatar" style={{ color: '#D4AE5C' }}>
                        <i class="fas fa-paperclip" aria-hidden="true"></i>
                        上傳圖片
                        <input
                          id="avatar"
                          name="avatar"
                          type="file"
                          className="form-control-file d-none"
                          onChange={(event) => {
                            let img2 = event.target.value.substr(12)
                            console.log(img2)
                            setImg(img2)
                          }}
                        />
                      </label>
                    </Form>
                  </div>
                </div>

                {/* Grid row */}
                <div class="row d-flex align-items-center mb-4">
                  {/* Grid column */}
                  <div class="text-center mb-3 col-md-12">
                    <button
                      type="button"
                      class="btn btn-success btn-block btn-rounded z-depth-1"
                      onClick={(event) => {
                        // 處理按下 Enter鍵
                        if (member !== '' && img !== '') {
                          const newComItem = {
                            cid: +new Date(),
                            username: member,
                            text: text,
                            edited: 0,
                            completed: 0,
                            commentImg: img,
                          }

                          setCom([newComItem, ...com])

                          addNewTodoItemToSever(newComItem)
                          handleImgToDirectory(event)

                          setText('')
                        } else {
                          alert('請賜給我們一張美照吧')
                        }
                      }}
                    >
                      Post
                    </button>
                  </div>
                  {/* Grid column */}
                </div>
                {/* Grid row */}

                {/* Grid row */}
                <div class="row">
                  {/* Grid column */}
                  <div class="col-md-12">
                    <p class="font-small white-text d-flex justify-content-end">
                      一起互動吧！{' '}
                      <a
                        href="/life/login"
                        class="green-text ml-1 font-weight-bold"
                      >
                        Log in
                      </a>
                    </p>
                  </div>
                  {/* Grid column */}
                </div>
                {/* Grid row */}
              </div>
            </div>
          </div>
          {/* Content */}
        </div>
      </div>
      {/* Modal */}

      <div>
        <a
          href=""
          // class="btn btn-default btn-rounded"
          style={{ width: '150px' }}
          data-toggle="modal"
          data-target="#darkModalForm"
        >
          一起互動吧！<i class="far fa-comment-dots"></i>
        </a>
      </div>
    </div>
  )
}
export default AddForm
