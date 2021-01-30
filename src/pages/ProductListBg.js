import React, { Componentm, useEffect } from 'react'
import '../styles/ProductList-style.css'

function ProductListBg(props) {

  useEffect(()=>{

  },[])

  const display = (
    <>
      <div className="bgSvg"></div>
    </>
  )

  return (
    <>
      <div className="container">{display}</div>
    </>
  )
}

export default ProductListBg
