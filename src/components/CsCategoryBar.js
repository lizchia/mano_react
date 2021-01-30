import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

class CsCategoryBar extends Component {
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
      `http://localhost:3002/cscategory/${categoryParentId}`
    )
    const json = await response.json()
    const cscategory = json.rows

    this.setState({
      data: cscategory,
    })

    return this.state.data
  }

  treeMenu = async (categoryParentId) => {
    let output = await this.getData(categoryParentId)

    if (output) {
      // this.state.listArray.push(`<ul class="cat-lists">`)
      for (let i = 0; i < output.length; i++) {
        this.state.listArray.push({
          name: output[i]['categoryName'],
          id: output[i]['categoryId'],
          url: output[i]['linkUrl'],
        })
        await this.treeMenu(output[i]['categoryId'])
      }
      // this.state.listArray.push(`</ul>`)
      // console.log(this.state.listArray)
    }
    // console.log(output)
    return this.state.listArray
  }

  async componentDidMount() {
    await this.treeMenu(0)
    //console.log(await this.treeMenu(0));
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
              href={`/life${list.url}?categoryId=${list.id}`}
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

export default withRouter(CsCategoryBar)
