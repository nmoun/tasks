import React from 'react'
import Widget from './Widget'

class WidgetList extends React.Component {

  constructor(props){
    super(props)
  }


  render(){
    return <div>
      {
        this.props.entities.map(function(entity, index){
          return <Widget key={index} title={entity.title} />
        })
      }
    </div>
  }
}

export default WidgetList