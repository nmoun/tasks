import {connect} from 'react-redux'
import {getTasks} from 'reducers'
import TaskWidget from 'components/TaskWidget'
import React from 'react'

class WidgetList extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    var {entities} = this.props;
    return <div>
      {
        entities.map(function(entity){
          return <TaskWidget key={entity.id} title={entity.title}/>
        })
      }
    </div>
  }
}

const mapStateToProps = (state) => ({
  entities: getTasks(state),
})

export default connect(
  mapStateToProps,
)(WidgetList)