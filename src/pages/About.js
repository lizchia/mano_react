import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import '../styles/home.scss'
import AOS from 'aos'
import '../styles/aos-master/dist/aos.css'
import { useEffect } from 'react'

function About(props) {
  AOS.init()

  useEffect(() => {
    props.changeBackgroundColorGreen()
  }, [])

  return (
    <>
      <div className="row row-cols-1  row-cols-md-4 secondPage" id="secondPage">
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
              <a href="/life/about" className="more">
                MORE→
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// 高階元件的用法
export default withRouter(About)
