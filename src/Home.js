import React from 'react'
import fakeAuth from 'utils/fakeAuth'
import { Redirect } from 'react-router-dom'

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      dummy: ""
    }
    this.launchService = this.launchService.bind(this)
    this.logout = this.logout.bind(this)
  }

  launchService() {
    return fetch('/api/authRequired', {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Error')
      }
      return res.json()
    }).then((data) => {
      console.log('message: ' + data.message)
    }).catch(error => {
      console.log('message: ' + data.message)
    });
  }

  logout() {
    fakeAuth.logout().then(() => this.setState({dummy: ""}))
  }

  render() {
    if(fakeAuth.isAuthenticated){
      return <div>Home    <button onClick={this.launchService}>Launch protected service</button>
        <button onClick={this.logout}>Logout</button></div>
    } else {
      return <Redirect
        to={{pathname: '/'}}
      />
    }
  }
}

export default Home