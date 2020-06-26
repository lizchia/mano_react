import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'

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

  const date = new Date(value.id)

  const cssCard = {
    width: '300',
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
                <i class="far fa-clock pr-1"></i>
                {date.toLocaleString()}
              </li>
              <li class="list-inline-item pr-2">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    handleEditedToggle(value.cid)
                  }}
                >
                  <i class="far fa-comments pr-1"></i>12
                </button>
              </li>
              <li class="list-inline-item pr-2">
                <a href="#" class="white-text">
                  <i class="fab fa-facebook-f pr-1"></i>21
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" class="white-text">
                  <i class="fab fa-twitter pr-1"> </i>5
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
