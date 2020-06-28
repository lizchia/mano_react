import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import Table from 'react-bootstrap/Table'
import { ToastsContainer, ToastsStore } from 'react-toasts'

import MyBanner from '../components/MyBanner'
import NewSite from '../components/NewSite'

function Marketing(props) {
  useEffect(() => {
    //props.changeBackgroundColorLight()
  }, [])

  const cssImg = {
    //width: '200px',
    height: '400px',
    margin: '35px',
  }
  const cssCard = {
    border: '1px solid transparent',
  }

  return (
    <>
      <div class="card-group text-center">
        <div class="card" style={cssCard}>
          <Link
            onClick={() =>
              ToastsStore.success(<Link to="/">快點我成為會員！</Link>)
            }
          >
            <img
              style={cssImg}
              src="/picture/hand.jpg"
              className="card-img-top"
            ></img>
          </Link>
          <div class="card-body">
            <h5 class="card-title">手摘</h5>
            <p class="card-text">
              <h6>生日禮</h6>
              <h6>生日單月全館六折</h6>
              <h6>非生日月全館九折</h6>
            </p>
          </div>
        </div>
        <div class="card" style={cssCard}>
          <Link
            onClick={() =>
              ToastsStore.success(<Link to="/">快點我成為會員！</Link>)
            }
          >
            <img style={cssImg} src="/picture/body.jpg"></img>
          </Link>
          <div class="card-body">
            <h5 class="card-title">一番茶</h5>
            <p class="card-text">
              <h6>生日禮</h6>
              <h6>生日單月全館七五折</h6>
              <h6>非生日月全館九五折</h6>
            </p>
          </div>
        </div>
        <div class="card" style={cssCard}>
          <Link
            onClick={() =>
              ToastsStore.success(<Link to="/">快點我成為會員！</Link>)
            }
          >
            <img style={cssImg} src="/picture/lip.jpg"></img>
          </Link>
          <div class="card-body">
            <h5 class="card-title">二番茶</h5>
            <p class="card-text">
              <h6>新手禮</h6>
              <h6>整筆消費七五折</h6>
            </p>
          </div>
        </div>
      </div>

      <ToastsContainer store={ToastsStore} lightBackground />
      <div style={{ height: '250px' }}></div>

      <hr />
      <NewSite />
    </>
  )
}

export default withRouter(Marketing)
