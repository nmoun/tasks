import React from 'react'
import Fab from 'components/Fab'

const ThemedPage = function(props){
  if(props.fab === true){
    var fabProps = {}
    if(props.handleClickFab)
      fabProps.handleClickFab = props.handleClickFab
  }

  return (<div className="container-all">
    {props.children}
    {props.fab === true ? <Fab {...fabProps}/> : ""}
  </div>)
}

export default ThemedPage