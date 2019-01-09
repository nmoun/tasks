import React from 'react'
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

export default TaskList