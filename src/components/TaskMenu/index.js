import React from 'react'
import Menu from 'components/Menu'
import { withRouter } from 'react-router-dom'

import './style.scss'

function TaskMenu(props){
  const classMenu = props.isDisplayed ? "task-menu" : "task-menu-hidden",
    { history } = props,
    // hard coded for now
    entries = [{
      handleClickEntry: () => {
        history.push('/order')
      },
      label: 'Order',
    },{
      handleClickEntry: () => {
        history.push('/reception')
      },
      label: 'Reception',
    }] 
  return <div className={classMenu}>
    <Menu entries={entries}/>
  </div>
}

export default withRouter(TaskMenu)