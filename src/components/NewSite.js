import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'

function NewSite(props) {
return(
    <div className="container mb-2">
        <h3> 最新活動 </h3>
        <div className="d-flex row" style={{ backgroundColor: '#D4AE5C' }}>
            <img
              className="col-8"
              style={cssImg}
              src="/picture/CS001.jpg"
            ></img>
            <div className="col-4 align-self-center">
              <h5 style={{ color: '#FFFFFF' }}>從抹茶製作過程，</h5>
              <h5 style={{ color: '#FFFFFF' }}>投入其中，</h5>
              <h5 style={{ color: '#FFFFFF' }}>精進技藝，反覆練習</h5>
              <h5 style={{ color: '#FFFFFF' }}>屬於大人的手作課程</h5>
              <Button variant="outline-light">給自己的練習課</Button>
            </div>
        </div>
    <div/>
)
}

export default withRouter(NewSite)