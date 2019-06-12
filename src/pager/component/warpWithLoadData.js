import React, { Component } from 'react'

/**
 * @pramas name localStorage的ItemName
 */
export default (WarppedComponent, name) => {
  class LocalStorageActions extends Component {
    constructor() {
      super()
      this.state = {
        data: null
      }
    }

    componentWillMount() {
      let data = localStorage.getItem(name) || []
      try {
        this.setState({
          // 尝试把它解释成JSON对象
          data: JSON.parse(data)
        })
      } catch (error) {
        // 如果上面报错就执行难这里（说明不是JSON对象，只是普通字符串）
        this.setState({ data })
      }
    }

    saveData(data) {
      try {
        localStorage.setItem(name, JSON.stringify(data))
      } catch (error) {
        localStorage.setItem(name, `${data}`)        
      }
    }

    render() {
      return (
        <WarppedComponent 
          data={this.state.data}
          saveData={this.saveData.bind(this)}
          // 这里的意思是把其他的参数原封不动地传递给被包装的组件
          {...this.props} />
      )
    }
  }
  return LocalStorageActions
}