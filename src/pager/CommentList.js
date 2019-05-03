import React,{ Component } from 'react'
import Comment from './Comment'

class CommentList extends Component {
  render() {
    return (this.props.commentData.map((item,index) => {
      return (
        <Comment key={index} index={index} comment={item} delComment={this.props.delComment}></Comment>
      )
    })
    )
  }
}

export default CommentList