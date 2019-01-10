import React from 'react'
import { logout } from 'service/AuthService'
import ThemedPage from 'components/pages/ThemedPage'
import TaskList from 'components/TaskList'
import Header from 'components/Header'
import { withRouter } from 'react-router-dom'
import { fetchTasks } from 'actions/tasks'
import { getTasks, getIsFetching } from 'reducers'
import { connect } from 'react-redux'
import LoadingList from 'components/LoadingList'
import SidePanel from 'components/SidePanel'

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      isDisplayedSidePanel: false
    }
    this.logout = this.logout.bind(this)
    this.displaySidePanel = this.displaySidePanel.bind(this)
  }

  displaySidePanel() {
    this.setState({
      isDisplayedSidePanel: !this.state.isDisplayedSidePanel,
    });
  }

  logout() {
    logout().then(() => {
      this.props.history.replace('/')
    })
  }

  render() {
    const { isFetching, tasks } = this.props;
    const leftIcon = this.state.isDisplayedSidePanel ? Header.ICONS.BACK : Header.ICONS.MENU;
    return (<ThemedPage>
      <Header
        title='Tasks'
        leftIcon={leftIcon}
        onLeftClick={this.displaySidePanel}
        rightText="Reload"
        onRightClick={this.props.fetchTasks} />
      <AppSidePanel
        logout={this.logout}
        isDisplayed={this.state.isDisplayedSidePanel} />
      <div>
        {
          isFetching ? <LoadingList /> : <TaskList tasks={tasks}/>
        }
      </div>
    </ThemedPage>)
  }
}

const mapStateToProps = (state) => ({
  tasks: getTasks(state),
  isFetching: getIsFetching(state)
})

export default withRouter(connect(
  mapStateToProps,
  { fetchTasks }
)(Home))

function AppSidePanel(props) {
  let entries = [
    {
      entryId: 1,
      entryLabel: "Logout",
      onEntryClick: props.logout
    }
  ]

  let newProps = { ...props, entries }

  return <SidePanel {...newProps} />
}
