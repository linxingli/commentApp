import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import warpWithLoadData from './component/warpWithLoadData'

class CommentApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      commentData: props.data
    }
  }

  // componentWillMount() {
  //   this._loadComments()
  // }

  // _loadComments() {
  //   let commentData = JSON.parse(localStorage.getItem('commentData'))
  //   if (commentData.length) {
  //     this.setState({
  //       commentData
  //     })
  //   }
  // }

  // _saveComments(data) {
  //   localStorage.setItem('commentData', JSON.stringify(data))
  // }

  getUsernameAndContent(data) {
    let commentData = this.state.commentData
    commentData.push(data)
    this.setState({ commentData })
    // this._saveComments(commentData)
    this.props.saveData(commentData)
  }

  delComment(index) {
    let commentData = this.state.commentData
    commentData.splice(index,1)
    this.setState({ commentData })
    // this._saveComments(commentData)
    this.props.saveData(commentData)
  }

  render() {
    return (
      <div className='wrapper'>
        <CommentInput 
          onSubmit={this.getUsernameAndContent.bind(this)}/>
        <CommentList 
          commentData={this.state.commentData} 
          delComment={this.delComment.bind(this)}/>
      </div>
    )
  }
}

CommentApp = warpWithLoadData(CommentApp, 'commentData')

export default CommentApp