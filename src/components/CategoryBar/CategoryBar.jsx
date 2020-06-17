import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './categoryBar-style.scss'

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
      this.state.listArray.push(`<ul class="cat-lists">`)
      for (let i = 0; i < output.length; i++) {
        this.state.listArray.push(
          `<li ><a class="cat-list" href="${output[i]['linkUrl']}?categoryId=${output[i]['categoryId']}">${output[i]['categoryName']}</a></li>`
        )
        await this.treeMenu(output[i]['categoryId'])
      }
      this.state.listArray.push(`</ul>`)
    }
    return this.state.listArray
  }

  async componentDidMount() {
    await this.treeMenu(0)
    //console.log(await this.treeMenu(0));
    let listsData = this.state.listArray.join('')
    this.listsRef.current.innerHTML = listsData
  }

  render() {
    return (
      <div
        ref={this.listsRef}
        className="cat-container"
        onClick={() => localStorage.setItem('page', 1)}
      ></div>
    )
  }
}

export default withRouter(CategoryBar)
