import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../../reducer/comment'

// CommentListContainer
// 一个 Smart 组件，负责评论列表数据的加载、初始化、删除评论
// 沟通 CommentList 和 state
class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  }

  componentWillMount () {
    this._loadComments()
  }

  _loadComments () {
    let comments = localStorage.getItem('comments')
    comments = comments ? JSON.parse(comments) : []
    // this.props.initComments 是 connect 传进来的
    // 可以帮我们把数据初始化到 state 里面去
    this.state.initComments(comments)
  }

  handleDeleteComment (index) {
    const { comments } = this.props
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    // 保存最新的评论列表到 LocalStorage
    localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.onDeleteComment) {
      // this.props.onDeleteComment 是 connect 传进来的
      // 会 dispatch 一个 action 去删除评论
      this.props.onDeleteComment(index)
    }
  }

  render () {
    return (
      <CommentList 
        comments={this.props.comments}
        onDeleteComment={this.handleDeleteComment.bind(this)} />
    )
  }
}

// 评论列表从 state.comments 中获取
const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // 提供给 CommentListContainer
    // 当从 LocalStorage 加载评论列表以后就会通过这个方法
    // 把评论列表初始化到 state 当中
    initComments: (comments) => {
      dispatch(initComments(comments))
    },
    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)