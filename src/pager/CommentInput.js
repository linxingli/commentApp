import React,{ Component } from 'react'
import warpWithLoadData from './component/warpWithLoadData'

class CommentInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: props.data,
      content: ''
    }
  }
  componentWillMount() {
    this._loadUserName()
  }
  componentDidMount() {
    this.textarea.focus()
  }
  _saveUserName(data) {
    if (data) {
      localStorage.setItem('userName', data)
    }
  }
  _loadUserName() {
    let username = localStorage.getItem('userName')
    if(username) {
      this.setState({username})
    }
  }
  // 保存用户名至localStorage
  saveUserNametoLocal(e) {
    this._saveUserName(e.target.value)
    // this.props.saveData(e.target.value)
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
    if (!this.state.username) return alert('用户名不能为空')
    if (!this.state.content) return alert('评论不能为空')
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

// CommentInput = warpWithLoadData(CommentInput, 'userName')

export default CommentInput