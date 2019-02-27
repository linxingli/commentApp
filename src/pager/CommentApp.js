import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
  constructor() {
    super()
    this.state = {
      commentData: []
    }
  }
  getUsernameAndContent(data) {
    let temp = this.state.commentData
    temp.push(data)
    this.setState({
      commentData: temp
    })
  }
  render() {
    return (
      <div className='wrapper'>
        <CommentInput onSubmit={this.getUsernameAndContent.bind(this)}></CommentInput>
        <CommentList commentData={this.state.commentData}></CommentList>
      </div>
    )
  }
}

export default CommentApp