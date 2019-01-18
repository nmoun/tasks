import React from 'react'
import { logout } from 'service/AuthService'
import ThemedPage from 'components/layout/ThemedPage'
import TaskList from 'components/TaskList'
import Header from 'components/Header'
import { withRouter } from 'react-router-dom'
import { fetchTasks } from 'actions/tasks'
import { getTasks, getIsFetching } from 'reducers'
import { connect } from 'react-redux'
import LoadingList from 'components/LoadingList'
import SidePanel from 'components/SidePanel'
import { ICONS } from 'components/Fab'
import Menu from 'components/Menu'

class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      isDisplayedSidePanel: false,
      isDisplayedMenu: false
    }
    this.logout = this.logout.bind(this)
    this.toggleSidePanel = this.toggleSidePanel.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }

  toggleSidePanel() {
    this.setState({
      isDisplayedSidePanel: !this.state.isDisplayedSidePanel,
    });
  }

  toggleMenu() {
    this.setState({
      isDisplayedMenu: !this.state.isDisplayedMenu,
    });
  }

  handleBack(){
    if(this.state.isDisplayedMenu){
      this.toggleMenu()
    } else {
      this.toggleSidePanel()
    }
  }

  logout() {
    logout().then(() => {
      this.props.history.replace('/')
    })
  }

  render() {
    const { isFetching, tasks } = this.props;
    const leftIcon = (this.state.isDisplayedSidePanel || this.state.isDisplayedMenu) ? Header.ICONS.BACK : Header.ICONS.MENU;
    return (<ThemedPage fab={true} handleClickFab={this.toggleMenu} fabIcon={ICONS.PLUS}>
      <Header
        title='Tasks'
        leftIcon={leftIcon}
        handleClickLeft={this.handleBack}
        rightText="Reload"
        handleClickRight={this.props.fetchTasks} />
      <AppSidePanel
        logout={this.logout}
        isDisplayed={this.state.isDisplayedSidePanel} />
      <Menu isDisplayed={this.state.isDisplayedMenu} />
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
