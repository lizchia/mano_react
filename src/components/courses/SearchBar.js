import React, { Component } from 'react'

function SearchBar(props) {
  return (
    <>
      <div>
        <input
          type="text"
          value={props.searchValue}
          className="searchBar"
          style={{
            background: 'transparent',
            border: '2px solid #ccc',
          }}
          onChange={props.onChange}
          placeholder="Search"
        />
        {/* <i className="fas fa-search icon"></i> */}
      </div>
    </>
  )
}

export default SearchBar
