import React from 'react'
import {logout} from 'service/AuthService'
import { JWT_TOKEN } from 'utils/constants'
import ProtectedPage from 'components/ProtectedPage';

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
    return fetch('/api/tasks', {
      method: 'get',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem(JWT_TOKEN),
      },
      credentials: 'same-origin'
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Error')
      }
      return res.json()
    }).then((tasks) => {
      console.log('fetched tasks: ' + JSON.stringify(tasks) )
    }).catch(error => {
      console.log('error: ' + error)
    });
  }

  logout() {
    logout().then(() => {
      this.setState({dummy: ""})
    })
  }

  render() {
    return (<ProtectedPage>
      <div>Home    <button onClick={this.launchService}>Launch protected service</button>
        <button onClick={this.logout}>Logout</button>
      </div>
    </ProtectedPage>)
  }
}

export default Home