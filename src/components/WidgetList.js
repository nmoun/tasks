import TaskWidget from 'components/widgets/TaskWidget'
import React from 'react'

export default class WidgetList extends React.Component{
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