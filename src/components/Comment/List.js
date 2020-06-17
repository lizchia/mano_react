import React from 'react'
import ItemC from './ItemC'
import EditForm from './EditForm'

function List(props) {
  //console.log(props)
  const { com, comment, handleDelete, handleEditedToggle, handleEditedSave } = props
  console.log(com)
  console.log(comment)
  console.log(props)
  return (
    <>
      <div>
        <ul className="list-group">
          {com.map((value, index) => {
            console.log(value)
            if (value.editd == "true") {
              return (
                <EditForm
                  key={value.id}
                  value={value.text}
                  handleEditSave={handleEditedSave}
                />
              )
            }
            return (
              <ItemC
                key={value.id}
                value={value}
                handleEditedToggle={handleEditedToggle}
                handleDelete={handleDelete}
              />
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default List
