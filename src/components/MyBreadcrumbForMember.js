import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Form, FormControl, Button, Container, Col, Row } from 'react-bootstrap'

function MyBreadcrumb(props) {
  const pathlist = [
    '/',
    '/membercenter',
    '/coupon',
    '/memberorders',
    '/memberitemtracking',
  ]
  const pathnames = ['首頁', '會員中心', '會員中心', '會員中心', '會員中心']
  const pathnames2 = ['', '會員資料', '折價券', '我的訂單', '我的追蹤']
  // 先找出對應的中文詞
  let locationPathname = props.location.pathname

  // `/product/xxxx` 轉為 `/product`
  if (locationPathname.includes('/product')) locationPathname = '/product'
  if (locationPathname.includes('/membercenter/coupon'))
    locationPathname = '/coupon'
  if (locationPathname.includes('/membercenter/memberorders'))
    locationPathname = '/memberorders'
  if (locationPathname.includes('/membercenter/memberitemtracking'))
    locationPathname = '/memberitemtracking'
  if (locationPathname.includes('/membercenter'))
    locationPathname = '/membercenter'

  const index = pathlist.findIndex((v) => v === locationPathname)
  const searchicon = {
    borderRadius: '5px 0 0 5px',
    width: '20%',
    height: '100%',
    border: '1px solid white',
    borderRight: 'none',
    color: 'white',
    padding: '0',
  }
  const searchbar = {
    borderRadius: '0 5px 5px 0',
    width: '80%',
    height: '100%',
    background: 'transparent',
    borderLeft: 'none',
    color: 'white',
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={10} className="p-0">
            <nav
              aria-label="breadcrumb"
              className="d-flex justify-content-between"
            >
              <div>
                <ol
                  className="breadcrumb p-0"
                  style={{ background: 'transparent' }}
                >
                  <li className="breadcrumb-item ">
                    <Link className="p-0" to="/">
                      首頁
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ color: 'white' }}
                  >
                    {pathnames[index]}
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ color: 'white' }}
                  >
                    {pathnames2[index]}
                  </li>
                </ol>
              </div>
              <Form inline style={{ width: '204px', height: '30px' }}>
                <Button variant="outline-success" style={searchicon}>
                  <i class="fas fa-search"></i>
                </Button>
                <FormControl
                  type="text"
                  placeholder=""
                  className=""
                  style={searchbar}
                />
              </Form>
            </nav>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default withRouter(MyBreadcrumb)
