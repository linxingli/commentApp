import React,{ Component } from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'

class CommentList extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
  }

  static defaultProps = {
    comments: []
  }

  handleDeleteComment (index) {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(index)
    }
  }

  render () {
    return(
      <div>
        {this.props.comments.map((item,index) => 
          <Comment 
            key={index} 
            index={index} 
            comment={item} 
            delComment={this.handleDeleteComment.bind(this)}/>
        )}
      </div>
    )
  }
}

export default CommentList