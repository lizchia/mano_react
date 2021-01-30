import React from 'react'

function MainContent(props) {
  //console.log(props)

  return (
    <>
      <main role="main" className="flex-shrink-0">
        {/* <div className="container"> */}
        {/* 網頁的主內容標題
          <h1 className="mt-5">{props.title}</h1>
          <hr /> */}
        {/* 主要內容寫在這 */}
        {props.children}
        {/* </div> */}
      </main>
    </>
  )
}

export default MainContent
