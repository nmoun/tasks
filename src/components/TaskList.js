import {connect} from 'react-redux'
import {getTasks} from 'reducers'
import TaskWidget from 'components/widgets/TaskWidget'
import React from 'react'

class WidgetList extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    var {tasks} = this.props;
    return <div>
      {
        tasks.map(function(task){
          return <TaskWidget key={task.id} title={task.title} type={task.type}/>
        })
      }
    </div>
  }
}

const mapStateToProps = (state) => ({
  tasks: getTasks(state),
})

export default connect(
  mapStateToProps,
)(WidgetList)