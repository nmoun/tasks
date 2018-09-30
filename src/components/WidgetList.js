import React from 'react'
import Widget from './Widget'
import { connect } from 'react-redux'
import {getTasks} from 'reducers'

class WidgetList extends React.Component {

  constructor(props){
    super(props)
  }


  render(){
    return <div>
      {
        this.props.tasks.map(function(entity){
          return <Widget key={entity.id} title={entity.title}/>
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