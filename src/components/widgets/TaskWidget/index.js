import React from 'react'
import Widget from '../Widget'
import {Link} from 'react-router-dom'

import './style.scss'

class TaskWidget extends React.Component {

  constructor(props){
    super(props)
  }


  render(){
    return <Link to={this.props.type}><Widget {...this.props} className="task-widget"/></Link>
  }
}

export default TaskWidget