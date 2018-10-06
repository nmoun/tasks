import React from 'react'
import Widget from 'components/Widget'

import './style.scss'

class TaskWidget extends React.Component {

  constructor(props){
    super(props)
  }


  render(){
    return <Widget {...this.props} className="task-widget"/>
  }
}

export default TaskWidget