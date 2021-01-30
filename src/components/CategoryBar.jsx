import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

class CategoryBar extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      listArray: [],
    }

    this.listsRef = React.createRef()
  }

  getData = async (categoryParentId) => {
    const response = await fetch(
      `http://localhost:3002/category/${categoryParentId}`
    )
    const json = await response.json()
    const category = json.rows

    this.setState({
      data: category,
    })

    return this.state.data
  }

  treeMenu = async (categoryParentId) => {
    let output = await this.getData(categoryParentId)
    //console.log(output)
    if (output) {
      for (let i = 0; i < output.length; i++) {
        this.state.listArray.push({
          name: output[i]['categoryName'],
          id: output[i]['categoryId'],
          url: output[i]['linkUrl'],
        })

        await this.treeMenu(output[i]['categoryId'])
      }
    }
    return this.state.listArray
  }

  async componentDidMount() {
    await this.treeMenu(0)
  }

  render() {
    return (
      <div
        className="cat-container"
        onClick={() => localStorage.setItem('page', 1)}
        style={{
          textAlign: 'center',
          width: '200px',
        }}
      >
        <ListGroup variant="flush">
          {this.state.listArray.map((list) => (
            <ListGroup.Item
              action
              href={`/mall${list.url}?categoryId=${list.id}`}
              style={{
                backgroundColor: '#E4EEE3',
                color: '#5E6248',
              }}
            >
              {list.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }
}

export default withRouter(CategoryBar)
