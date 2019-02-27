import React,{ Component } from 'react'

class Comment extends Component {
  render() {
    return(
      <div className='comment'>
        <div className='comment-user'>
          <span>{this.props.commentData.username} </span>：
        </div>
        <p>{this.props.commentData.content}</p>
      </div>
    )
  }
}

export default Comment