import React,{ Component } from 'react'

class Comment extends Component {

  constructor() {
    super()
    this.state = {
      timeString: ''
    }
  }

  componentWillMount() {
    this._updateTimeString()
    this._timer = setInterval(this._updateTimeString.bind(this), 5000)
  }

  componentWillUnmount() {
    clearInterval(this._timer)
  }

  _updateTimeString() {
    let difftime = (+new Date() - this.props.comment.createdTime)/1000
    difftime = difftime > 3600 ? `${Math.round(difftime/3600)} 小时前`:`${Math.round(difftime/60)} 分钟前`
    this.setState({
      timeString: difftime
    })
  }

  render() {
    const { comment, delComment, index } = this.props

    return(
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username} </span>：
        </div>
        <p>{comment.content}</p>
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
        <span className='comment-delete' onClick={delComment.bind(this, index)}>
          删除
        </span>
      </div>
    )
  }
}

export default Comment