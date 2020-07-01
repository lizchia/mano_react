import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Table, Container, Row, Col, ListGroup, Image } from 'react-bootstrap'

function MemberSideLink(props) {
  const aListStyle = {
    background: 'transparent',
    color: 'white',
    border: 'none',
  }
  const activeStyle = { background: '#C5895A', color: 'white', border: 'none' }
  const pathlist = [
    '/mall/membercenter',
    '/memberorders',
    '/coupon',
    '/memberitemtracking',
    '/life/membercenter',
  ]
  const pathnames2 = ['會員資料', '我的訂單', '折價券', '我的追蹤', '會員資料']

  // 先找出對應的主題
  let locationPathname = props.location.pathname
  if (locationPathname.includes('/membercenter/coupon'))
    locationPathname = '/coupon'
  if (locationPathname.includes('/membercenter/memberitemtracking'))
    locationPathname = '/memberitemtracking'
  if (locationPathname.includes('/membercenter/memberitemtracking'))
    locationPathname = '/memberitemtracking'
  if (locationPathname.includes('/membercenter/memberorders'))
    locationPathname = '/memberorders'

  const index = pathlist.findIndex((v) => v === locationPathname)

  return (
    <>
      <Container style={{ padding: '0' }}>
        <Row>
          <Col md={2}>
            {props.history.location.pathname.includes('/mall') ? (
              <nav className="navbar navbar-expand-lg navbar-dark ">
                <button
                  className="btn btn-primary w-100 navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span style={{ fontSize: '14pt' }}>
                    {pathnames2[index]}
                    <i className="fas fa-sort-down"></i>
                  </span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ListGroup>
                    <ListGroup.Item
                      action
                      href="/mall/membercenter"
                      style={index === 0 ? activeStyle : aListStyle}
                    >
                      會員資料
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      href="/mall/membercenter/memberorders"
                      style={index === 1 ? activeStyle : aListStyle}
                    >
                      我的訂單
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      href="/mall/membercenter/coupon"
                      style={index === 2 ? activeStyle : aListStyle}
                    >
                      折價券
                    </ListGroup.Item>
                    <ListGroup.Item
                      action
                      href="/mall/membercenter/memberitemtracking"
                      style={index === 3 ? activeStyle : aListStyle}
                    >
                      我的追蹤
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </nav>
            ) : (
              <nav className="navbar navbar-expand-lg navbar-dark ">
                <button
                  className="btn btn-primary w-100 navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span style={{ fontSize: '14pt' }}>
                    {pathnames2[index]}
                    <i className="fas fa-sort-down"></i>
                  </span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
              <ListGroup>
                <ListGroup.Item
                  action
                  href="/life/membercenter"
                  style={index === 4 ? activeStyle : aListStyle}
                >
                  會員資料
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="/life/membercenter/memberorders"
                  style={index === 1 ? activeStyle : aListStyle}
                >
                  我的訂單
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="/life/membercenter/coupon"
                  style={index === 2 ? activeStyle : aListStyle}
                >
                  折價券
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  href="/life/membercenter/memberitemtracking"
                  style={index === 3 ? activeStyle : aListStyle}
                >
                  我的追蹤
                </ListGroup.Item>
              </ListGroup>
              </div>
              </nav>
            )}
          </Col>
          {props.children}
        </Row>
      </Container>
    </>
  )
}
export default withRouter(MemberSideLink)