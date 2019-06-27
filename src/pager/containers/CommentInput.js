import React, { Component } from 'react'
import CommentInput from '../components/CommentInput'
import { connect } from 'react-redux'
import { addComment } from '../../reducer/comment'
import PropTypes from 'prop-types'

class CommentInputContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  }
  
  constructor () {
    super()
    this.state = {
      username: ''
    }
  }

  componentWillMount () {
    this._loadUsername()
  }

  _loadUsername () {
    // 从LocalStorage获取username
    let username = localStorage.getItem('userName')
    if(username) {
      this.setState({ username })
    }
  }

  _saveUserName(data) {
    if (data) {
      localStorage.setItem('userName', data)
    }
  }

  handleSubmitComment (comment) {
    // 数据验证
    if (!comment) return
    if (!comment.username) return alert('请输入用户名！！！！')
    if (!comment.content) return alert('请输入评论内容！！！！')
    // 数据存入localStorage
    const { comments } = this.props
    const newComments = [...comments, comment]
    localStorage.setItem('comments', JSON.stringify(newComments))
    // this.props.onSubmit 是 connect 传进来的
    // 会 dispatch 一个 action 去新增评论
    if (this.props.onSubmit) {
      this.props.onSubmit(comment)
    }
  }

  render () {
    return (
      <CommentInput 
        username={this.state.username}
        onUserNameInputBlur={this._saveUserName.bind(this)}
        onSubmit={this.handleSubmitComment.bind(this)}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => {
      dispatch(addComment(comment))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer)