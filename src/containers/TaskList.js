import React from 'react'
import {connect} from 'react-redux'
import {getTasks} from 'reducers'
import TaskWidget from 'components/widgets/TaskWidget'

function TaskList(props){
  var {tasks} = props;
  return <div>
    {
      tasks.map(function(task){
        return <TaskWidget key={task.id} id={task.id} title={task.title} type={task.type}/>
      })
    }
  </div>
}

const mapStateToProps = (state) => ({
  tasks: getTasks(state),
})

export default connect(
  mapStateToProps,
)(TaskList)