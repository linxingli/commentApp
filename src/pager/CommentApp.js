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
  componentWillMount() {
    this._loadComments()
  }
  _loadComments() {
    let commentData = JSON.parse(localStorage.getItem('commentData'))
    if (commentData.length) {
      this.setState({
        commentData
      })
    }
  }
  _saveComments(data) {
    localStorage.setItem('commentData', JSON.stringify(data))
  }
  getUsernameAndContent(data) {
    let temp = this.state.commentData
    temp.push(data)
    this._saveComments(temp)
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