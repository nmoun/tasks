import React from 'react'
import { logout } from 'service/AuthService'
import ThemedProtectedPage from 'components/pages/ThemedProtectedPage'
import TaskList from 'containers/TaskList'
import Header from 'components/Header'
import { withRouter } from 'react-router-dom'
import { fetchTasks } from 'actions/tasks'
import { getTasks, getIsFetching } from 'reducers'
import { connect } from 'react-redux'
import LoadingWidget from 'components/widgets/LoadingWidget'
import SidePanel from 'components/SidePanel'

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      dummy: "",
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
      this.setState({ dummy: "" })
    })
  }

  render() {
    const { isFetching, tasks } = this.props;
    const leftIcon = this.state.isDisplayedSidePanel ? Header.ICONS.BACK : Header.ICONS.MENU;
    return (<ThemedProtectedPage>
      <Header
        title='TODO'
        leftIcon={leftIcon}
        onLeftClick={this.displaySidePanel}
        rightText="Reload"
        onRightClick={this.props.fetchTasks} />
      <AppSidePanel
        logout={this.logout}
        isDisplayed={this.state.isDisplayedSidePanel} />
      <div>
        {
          (isFetching && !tasks.length) ?
            <LoadingWidget /> : <TaskList />
        }
      </div>
    </ThemedProtectedPage>)
  }
}

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

const mapStateToProps = (state) => ({
  tasks: getTasks(state),
  isFetching: getIsFetching(state)
})

export default withRouter(connect(
  mapStateToProps,
  { fetchTasks }
)(Home))