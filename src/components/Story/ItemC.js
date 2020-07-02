import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import './item.css'

function ItemC(props) {
  // 先解構賦值，直接套用由props得到的變數值
  //const [heart, setHeart] = useState(0)
  const {
    value,
    handleDelete,
    handleEditedToggle,
    handleCompleted,
    handleEditedHeartPlus,
    handleEditedHeartMinus,
  } = props
  //console.log(value)

  const date = new Date(value.cid)
  const day = `${date.getFullYear()} 年 ${date.getMonth()} 月 ${date.getDate()} 日`

  const cssCard = {
    width: '300',
  }
  const cssIcon = {
    fontSize: '10pt',
    margin: '2px',
    color: '#5C6447',
  }
  const cssSocial = {
    fontSize: '20pt',
    margin: '5px',
  }

  return (
    <>
      <div className="col mb-4">
        {/* Card */}
        <div class="card" style={cssCard}>
          {/* Card image  */}
          <div class="view overlay">
            <img
              class="card-img-top"
              src={`http://localhost:3002/img-uploads/${value.commentImg}`}
              alt="Card image cap"
            />
            <a>
              <div class="mask rgba-white-slight"></div>
            </a>
          </div>

          {/* Card content  */}
          <div class="card-body">
            {/* Title  */}
            <h4 class="card-title">{value.username}</h4>
            <hr />
            {/* Text  */}
            <p class="card-text">{value.text}</p>
          </div>

          {/* Card footer  */}
          <div class="rounded-bottom mdb-color lighten-3 text-center pt-3">
            <ul class="list-unstyled list-inline font-small">
              <li class="list-inline-item pr-2 white-text">
                <p style={{ color: '#5C6447', fontSize:'10pt' }}>{day}</p>
              </li>
              <li class="list-inline-item pr-1">
                {value.completed ? (
                  <a
                    onClick={() => {
                      handleCompleted(value.cid)
                    }}
                  >
                    <i style={cssIcon} class="fas fa-heart"></i>
                  </a>
                ) : (
                  <a
                    onClick={() => {
                      handleCompleted(value.cid)
                    }}
                  >
                    <i style={cssIcon} class="far fa-heart"></i>
                  </a>
                )}
              </li>
              <li class="list-inline-item pr-1">
                {/* <button
                  style={{ width: '30px' }}
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                              
                  }}
                >
                  <i class="fas fa-share"></i>
                </button> */}

                <a data-toggle="modal" data-target="#modalSocial">
                  <i style={cssIcon} class="fas fa-share"></i>
                </a>

                <div
                  class="modal fade"
                  id="modalSocial"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="myModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog cascading-modal" role="document">
                    <div class="modal-content">
                      <div class="modal-header light-blue darken-3 white-text text-center">
                        <h4 class="title cssIcon">Spreed the word!</h4>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>

                      <div class="modal-body mb-1 text-center cssIcon">
                        <a type="button" class="btn-floating btn-fb">
                          <i style={cssSocial} class="fab fa-facebook-f"></i>
                        </a>

                        <a type="button" class="btn-floating btn-gplus">
                          <i style={cssSocial} class="fab fa-google-plus-g"></i>
                        </a>

                        <a type="button" class="btn-floating btn-ins">
                          <i style={cssSocial} class="fab fa-instagram"></i>
                        </a>

                        <a type="button" class="btn-floating btn-pin">
                          <i style={cssSocial} class="fab fa-pinterest"></i>
                        </a>

                        <a type="button" class="btn-floating btn-yt">
                          <i style={cssSocial} class="fab fa-youtube"></i>
                        </a>

                        <a type="button" class="btn-floating btn-comm">
                          <i style={cssSocial} class="fas fa-comments"></i>
                        </a>

                        <a type="button" class="btn-floating btn-email">
                          <i style={cssSocial} class="fas fa-envelope"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-inline-item">
                <a
                  href={`http://localhost:3002/img-uploads/${value.commentImg}`}
                  target="_blank"
                  doenload
                >
                  <i style={cssIcon} class="fas fa-chevron-down"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Card  */}

      {/* <Card className="bg-dark text-white" style={cssCard}>
        <Card.Img
          src={`http://localhost:3002/img-uploads/${value.commentImg}`}
          alt="Card image"
        />
        <Card.ImgOverlay>
          <Card.Title>{value.username}</Card.Title>
          <Card.Text>{value.text}</Card.Text>
          <Card.Text>{date.toLocaleString()}</Card.Text>
        </Card.ImgOverlay>
      </Card> */}
    </>
  )
}

export default ItemC