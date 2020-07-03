import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/home.scss'
import Slider from './Slider'
import AOS from 'aos'
import { ToastsContainer, ToastsStore } from 'react-toasts'

import '../styles/aos-master/dist/aos.css'
import { useEffect } from 'react'

function Home(props) {
  AOS.init()

  useEffect(() => {
    props.changeBackgroundColorWhite()
  }, [])

  return (
    <>
      <div class="bigarea">
        <div class="row row-cols-1  row-cols-md-2">
          <div class="col">
            <img className="home" src="/home_with_oval.svg" />
          </div>
          <div
            class="col aLink  align-self-center"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
          >
            <div className="row   justify-content-center">
              <a href="#thirdPage">
                <h5>SERVICE</h5>
              </a>
            </div>
            <div className="row justify-content-center">
              <a href="#secondPage">
                <h5>ABOUT US</h5>
              </a>
            </div>
            <div className="row  justify-content-center">
              <a href="#fourthPage">
                <h5>CONTACT</h5>
              </a>
            </div>
          </div>
        </div>

        <div
          className="row row-cols-1  row-cols-md-4 secondPage"
          id="secondPage"
        >
          <div class="col">
            <div className="row line"></div>
            <h3>品牌故事About Us</h3>
            <div
              data-aos="zoom-out-right"
              data-aos-duration="800"
              className="row brandPic align-items-end"
            ></div>
          </div>
          <div class="col align-self-center">
            <div className="row ">
              <div
                className="description2 col"
                data-aos="fade-up-right"
                data-aos-duration="800"
              >
                <h4>抹上質感，療癒人生</h4>
                <p>
                  綠色有很多，抹茶是天生帶有質感的一種。
                  你可以從這裡帶走的有很多，向右融入社群，向左進入商城。或許只是看看，也對眼睛有益。
                </p>
              </div>
            </div>
          </div>
          <div class="col ">
            <div className="row parentbox"></div>
            <div className="row ">
              <div
                className="description1"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-easing="ease-in-out"
              >
                <h4>發現您與生活的一期一會</h4>
                <div className="dec">
                  Mano以抹茶為品牌形象，獻上珍選商品。每一個與產品對上眼的瞬間，都是屬於您
                  與生活的一期一會。
                </div>
              </div>
            </div>
          </div>
          <div class="col align-self-center">
            <div className="row">
              <div
                className="moreBtn"
                data-aos="flip-left"
                data-aos-duration="800"
                data-aos-easing="ease-in-out"
              >
              <Link
                  onClick={() =>
                    ToastsStore.success(<Link to="/mall/login">快點我成為會員！</Link>)
                  }
                >
                  MORE→
                </Link>
                <ToastsContainer store={ToastsStore} lightBackground />
              </div>
            </div>
          </div>
        </div>

        <div className="col" id="thirdPage">
          <div class="row">
            <Slider />
          </div>
        </div>
        <div class="fourthPage col" id="fourthPage">
          <div class="row">
            <h3>Contact Us</h3>
          </div>
          <div class="row">
            <div className="brandPic2"></div>
          </div>
          <div class="row row-cols-1  row-cols-md-3 justify-content-between">
            <div class="col">
              <div className="contactinfo">
                <p className="ctitle"> Contact info</p>
                <p>Email : mano@mano.com.tw</p>
                <p>TEL:02-6618-1818</p>
              </div>
            </div>
            <div class="col noBox"></div>
            <div class="col ">
              <div className="transparentbox"></div>
              <div className="inputbox">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Your email address"
                  style={{
                    // position: 'absolute',
                    // left: '68px',
                    // top: '56px',
                    // minWidth: '150px',
                    height: '40px',
                    margin: '15px',
                  }}
                />
                <textarea
                  className="form-control"
                  type="text"
                  placeholder="Something to tell us..."
                  style={{
                    // position: 'absolute',
                    // left: '68px',
                    // top: '106px',
                    // minWidth: '200px',
                    height: '40px',
                    margin: '15px',
                  }}
                />

                <button name="" id="" className="btn btn-ipb" value="SEND NOW">
                  SEND NOW <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fifthPage d-flex flex-column align-items-center">
          <p>Mano is our life style. It can be yours.</p>
          <div className="footline "></div>
          <div className="buttonarea d-flex justify-content-between">
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter-square"></i>
          </div>
          <span>2020 MANO COPYRIGHT</span>
        </div>
      </div>
      {/* <div className="firstPage row">
        <div className="bgLeft col-6 col-sm-12">
          <div className="oval"></div>
        </div>
        <div className="bgRight col-6 col-sm-12">
          <div className="aLink">
            <a href="#thirdPage">
              <h5>SERVICE</h5>
            </a>
            <a href="#secondPage">
              <h5>ABOUT US</h5>
            </a>
            <a href="#fourthPage">
              <h5>CONTACT</h5>
            </a>
          </div>
        </div>
      </div>
      <div className="secondPage" id="secondPage">
          <div className="line"></div>
          <h3>
            品牌故事About Us
          </h3>
          <div className="description2">
            <h4>抹上質感，療癒人生</h4>
            <p>
              綠色有很多，抹茶是天生帶有質感的一種。
              你可以從這裡帶走的有很多，向右融入社群，向左進入商城。或許只是看看，也對眼睛有益。
            </p>
          </div>
        <div className="brandPic"></div>
          <div className="description1">
            <h4>發現您與生活的一期一會</h4>
            <div className="dec">
              Mano以抹茶為品牌形象，獻上珍選商品。每一個與產品對上眼的瞬間，都是屬於您 與生活的一期一會。
            </div>
          </div>
          
          <div className="moreBtn">
            <a href="/about" className="more">
              MORE→
            </a>
          </div>
        </div>
      <div className="thirdPage" id="thirdPage">
        <Slider />
      </div>
      <div className="fourthPage" id="fourthPage">
        <h3>Contact Us</h3>
        <div className="brandPic2"></div>
        <div className="transparentbox"></div>
        <div className="inputbox">
         <input type="text" placeholder="Your email address"style={{position:"relative",left:"68px",top:"56px",width:"293px",height:"40px"}} />
         <input type="text" placeholder="Something to tell us..."style={{position:"relative",left:"68px",top:"80px",width:"481px",height:"40px"}}/>
         <button name="" id="" className="btn btn-ipb" value="SEND NOW" >SEND NOW <i class="fas fa-arrow-right"></i></button>
        </div>
        <div className="contactinfo">
          <p className="ctitle">  Contact info</p>
          <p>Email : mano@mano.com.tw</p>
          <p>TEL:02-6618-1818</p>
          </div>
      </div>
      <div className="fifthPage d-flex flex-column align-items-center">
        <p>Mano is our life style. It can be yours.</p>
        <div className="footline "></div>
        <div className="buttonarea d-flex justify-content-between">
        <i className="fab fa-facebook-square"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter-square"></i>
        </div>
        <span>2020 MANO COPYRIGHT</span>
      </div> */}
    </>
  )
}

export default withRouter(Home)