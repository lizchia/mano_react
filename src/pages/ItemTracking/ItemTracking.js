import React, { useState, useEffect } from 'react'
import "./itemTracking-style.scss";
import ItemTracking from '../../components/ItemTracking/ItemTracking';

function ItemTrack() {
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
      <ItemTracking />
    </div>
  )

  return (
    <>
      <div className="container">{display}</div>
    </>
  )
}

export default ItemTracking
