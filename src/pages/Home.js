import React from 'react'
import {logout} from 'service/AuthService'
import ProtectedPage from 'components/ProtectedPage';
import * as tasksApi from 'service/TaskService';
import WidgetList from 'components/WidgetList';
import Header from 'components/Header';

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      dummy: "",
      tasks: []
    }
    this.launchService = this.launchService.bind(this)
    this.logout = this.logout.bind(this)
  }

  launchService() {
    tasksApi.fetchTasks()
      .then((tasks) => {
        console.log('fetched tasks: ' + JSON.stringify(tasks) );
        this.setState({
          tasks
        })
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
      <div className="container-emo">
        <Header title='TODO'/>
        <div>Home    <button onClick={this.launchService}>Fetch tasks</button>
          <button onClick={this.logout}>Logout</button>
          <WidgetList entities={this.state.tasks}/>
        </div>
      </div>
    </ProtectedPage>)
  }
}

export default Home