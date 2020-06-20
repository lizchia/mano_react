import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import Table from 'react-bootstrap/Table'
import { ToastsContainer, ToastsStore } from 'react-toasts'

import MyBanner from '../components/MyBanner'

function Marketing(props) {
  return (
    <>
      <MyBanner title="專屬優惠" lead="mano友" />
      <Table responsive>
        <tr>
          <th>手摘</th>
          <th></th>
        </tr>

        <tr>
          <td>生日禮</td>
          <td>300元生日禮金</td>
        </tr>
        <tr>
          <td>全館消費</td>
          <td>單單九折</td>
        </tr>
        <tr>
          <th>一番茶</th>
          <th></th>
        </tr>
        <tr>
          <td>生日禮</td>
          <td>100元生日禮金</td>
        </tr>
        <tr>
          <td>全館消費</td>
          <td>單單九五折</td>
        </tr>
        <tr>
          <th>二番茶</th>
          <th></th>
        </tr>
        <tr>
          <td>新手禮</td>
          <td>300元購物禮金</td>
        </tr>
      </Table>
      <div>
        <Link
          onClick={() =>
            ToastsStore.success(<Link to="/">快點我成為會員！</Link>)
          }
        >
          <img src="/picture/m.jpg" />
        </Link>
        <ToastsContainer store={ToastsStore} lightBackground />
      </div>
      <hr />
    </>
  )
}

export default withRouter(Marketing)
