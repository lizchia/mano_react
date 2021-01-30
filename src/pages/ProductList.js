import React, { useState, useEffect } from 'react'
import { Table, Container, Row, Col, ListGroup, Image } from 'react-bootstrap'
import Items from '../components/Items'
import CategoryBar from '../components/CategoryBar'

import '../components/courses/courses-style.css'

import bgSvg from '../components/bg-pattern.svg'
import { func } from 'prop-types'

function ProductList(props) {
  useEffect(() => {
    props.changeBackgroundColorLight()
  }, [])

  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => {
      let width = window.innerWidth
      setWidth(width)
    })
  }, [])

  return (
    <>
      <div
        style={{
          background: 'url(/bg-pattern.svg) repeat',
          position: ' fixed',
          left: '0',
          top: '0',
          width: '30vw',
          height: '100vh',
          opacity: '0.2',
          zIndex: '-1',
        }}
      ></div>
      <Container className="d-flex justify-content-center mt-5">
        {width <= 900 ? '' : <CategoryBar className="w-25" />}

        <Items />
      </Container>
    </>
  )
}

export default ProductList