import React, { useState, useEffect } from 'react'

import './course-style.css'

import { withRouter } from 'react-router-dom'

function Course(props) {
  return (
    <div className="course-card" value={props.courseId}>
      <a
        className="course-img"
        href={`/life/courseDetail${props.linkUrl}?courseId=${props.courseId}`}
      >
        <img
          src={`/courses/${props.courseImg}`}
          alt={props.courseImg}
          value={props.courseId}
          onMouseOver={(e) =>
            (e.currentTarget.src = `/courses/${props.courseImg2}`)
          }
          onMouseOut={(e) =>
            (e.currentTarget.src = `/courses/${props.courseImg}`)
          }
        />
        <div className="learnMore">どうぞ</div>
      </a>

      <div className="content">
        <div className="course-content-left">
            <h2 className="course-name">{props.courseName}</h2>
          <p className="course-desc">{props.courseDesc}</p>
        </div>

        <div className="course-right">
         <p className="course-qty-list">人數上限：{props.courseQty}</p>
          <button className="add-cart-list" onClick={props.handleClick}>
            add to cart
            <i class="fas fa-shopping-cart" style={{ marginLeft: '8px' }}></i>
          </button>
          <p className="course-price-list">$ {props.coursePrice}</p>

        </div>
      </div>
    </div>
  )
}

export default withRouter(Course)