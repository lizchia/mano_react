import React, { useState, useEffect } from 'react'
import Items from '../../components/Items/Items'
import CategoryBar from '../../components/CategoryBar/CategoryBar'
import './productList-style.scss'

function ProductList() {
  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <div className="d-flex align-items-start product-list">
      <CategoryBar />
      <Items />
    </div>
  )

  return (
    <>
      <div className="container">{display}</div>
    </>
  )
}

export default ProductList
