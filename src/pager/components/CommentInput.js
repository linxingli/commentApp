import React,{ Component } from 'react'
import PropTypes from 'prop-types'

export default class CommentInput extends Component {
  static propTypes = {
    username: PropTypes.any,
    onSubmit: PropTypes.func,
    onUserNameInputBlur: PropTypes.func
  }

  static defaultProps = {
    username: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      content: ''
    }
  }
  
  componentDidMount() {
    this.textarea.focus()
  }

  // 保存用户名至localStorage
  saveUserNametoLocal(e) {
    if (this.props.onUserNameInputBlur) {
      this.props.onUserNameInputBlur(e.target.value)
    }
  }
  settingUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  settingContent(e) {
    this.setState({
      content: e.target.value
    })
  }
  submitData() {
    if(this.props.onSubmit) {
      let {username, content} = this.state
      this.props.onSubmit({
        username,
        content,
        createdTime: +new Date()
      })
    }
    this.setState({
      content: ''
    })
  }
  render() {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input value={this.state.username}
              onChange={this.settingUsername.bind(this)}
              onBlur={this.saveUserNametoLocal.bind(this)}/>
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea value={this.state.content}
              ref={(textarea) => this.textarea = textarea}
              onChange={this.settingContent.bind(this)}/>
          </div>
        </div>
        <div className='comment-field-button'>
          <button onClick={this.submitData.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}