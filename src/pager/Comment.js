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
    difftime = difftime > 60 ? `${Math.round(difftime/60)}分钟前`:`${Math.round(difftime)}秒前`
    this.setState({
      timeString: difftime
    })
  }

  render() {
    const { comment } = this.props

    return(
      <div className='comment'>
        <div className='comment-user'>
          <span>{comment.username} </span>：
        </div>
        <p>{comment.content}</p>
        <span className='comment-createdtime'>
          {this.state.timeString}
        </span>
      </div>
    )
  }
}

export default Comment