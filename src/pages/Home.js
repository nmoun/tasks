import React from 'react'
import {logout} from 'service/AuthService'
import ProtectedPage from 'components/ProtectedPage'
import TaskList from 'components/TaskList'
import Header from 'components/Header'
import {withRouter} from 'react-router-dom'
import {fetchTasks} from 'actions/tasks'
import {getTasks, getIsFetching} from 'reducers'
import { connect } from 'react-redux'
import LoadingWidget from 'components/LoadingWidget';

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      dummy: "",
    }
    this.logout = this.logout.bind(this)
  }

  logout() {
    logout().then(() => {
      this.setState({dummy: ""})
    })
  }

  render() {
    const {isFetching, tasks} = this.props;
    return (<ProtectedPage>
      <div className="container-emo">
        <Header title='TODO'/>
        <div>Home    <button onClick={this.props.fetchTasks}>Fetch tasks</button>
          <button onClick={this.logout}>Logout</button>
          {
            (isFetching && !tasks.length) ?
              <LoadingWidget /> : <TaskList/>
          }
        </div>
      </div>
    </ProtectedPage>)
  }
}

const mapStateToProps = (state) => ({
  tasks: getTasks(state),
  isFetching: getIsFetching(state)
})

export default withRouter(connect(
  mapStateToProps,
  {fetchTasks}
)(Home))