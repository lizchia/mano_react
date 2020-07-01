import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import Table from 'react-bootstrap/Table'
import { ToastsContainer, ToastsStore } from 'react-toasts'

import MyBanner from '../components/MyBanner'
import NewSite from '../components/NewSite'

import './marketing.css'

function Marketing(props) {
  useEffect(() => {
    props.changeBackgroundColorWhite();
  }, [])

  const cssImg = {
    height: '350px',
    margin: '35px',
  }
  const cssCard = {
    border: '1px solid transparent',
  }

  return (
    <>
      <div className="container">
        <img
          class="text-center"
          style={{ width: '30vw' }}
          src="/picture/manoMem4.svg"
        />
        <div class="card-group text-center">
          <div class="card" style={cssCard}>
            <Link
              onClick={() =>
                ToastsStore.success(<Link to="/">快點我成為會員！</Link>)
              }
            >
              <img
                style={cssImg}
                src="/picture/manoMem1.svg"
                className="card-img-top"
              ></img>
            </Link>
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-user-check"></i>手摘等級
              </h5>
              <p class="card-text">
                <h6>
                  滿一萬立即享
                  <mark style={{ backgroundColor: '#D4AE5C' }}>手摘</mark>
                  會員福利
                </h6>
                <br />
                <h6>
                  <i class="fas fa-gift"></i>生日月全館
                  <mark style={{ backgroundColor: '#D4AE5C' }}>六折</mark>
                </h6>
                <h6>
                  非生日月全館
                  <mark style={{ backgroundColor: '#D4AE5C' }}>九折</mark>
                </h6>
              </p>
            </div>
          </div>
          <div class="card" style={cssCard}>
            <Link
              onClick={() =>
                ToastsStore.success(<Link to="/">快點我成為會員！</Link>)
              }
            >
              <img style={cssImg} src="/picture/manoMem2.svg"></img>
            </Link>
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-user-check"></i>一番茶等級
              </h5>
              <p class="card-text">
                <h6>
                  滿三千立即享
                  <mark style={{ backgroundColor: '#D4AE5C' }}>一番茶</mark>
                  會員福利
                </h6>
                <br />
                <h6>
                  <i class="fas fa-gift"></i>生日單月全館
                  <mark style={{ backgroundColor: '#D4AE5C' }}>七五折</mark>
                </h6>
                <h6>
                  非生日月全館
                  <mark style={{ backgroundColor: '#D4AE5C' }}>九五折</mark>
                </h6>
              </p>
            </div>
          </div>
          <div class="card" style={cssCard}>
            <Link
              onClick={() =>
                ToastsStore.success(<Link to="/">快點我成為會員！</Link>)
              }
            >
              <img style={cssImg} src="/picture/manoMem3.svg"></img>
            </Link>
            <div class="card-body">
              <h5 class="card-title">
                <i class="fas fa-user-check"></i>二番茶等級
              </h5>
              <p class="card-text">
                <h6>
                  加入會員立即享
                  <mark style={{ backgroundColor: '#D4AE5C' }}>二番茶</mark>
                  會員福利
                </h6>
                <br />
                <h6>
                  <i class="fas fa-gift"></i>新手禮
                </h6>
                <h6>
                  整筆消費
                  <mark style={{ backgroundColor: '#D4AE5C' }}>七五折</mark>
                </h6>
              </p>
            </div>
          </div>
        </div>

        <ToastsContainer store={ToastsStore} lightBackground />
        <div style={{ height: '250px' }}></div>
      </div>
      <hr />
      <NewSite />
    </>
  )
}

export default withRouter(Marketing)