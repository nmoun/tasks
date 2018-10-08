import React from 'react'
import { isLoggedIn } from 'service/AuthService'
import Welcome from 'modules/Welcome'

class ProtectedPage extends React.Component {

  constructor() {
    super()
  }

  render() {
    if(isLoggedIn()){
      return this.props.children
    } else {
      return <Welcome />
    }
  }
}

export default ProtectedPage