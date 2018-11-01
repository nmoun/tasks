import React from 'react'

const ThemedPage = function(props){
  return (<div className="container-fluid">
    {props.children}
  </div>)
}

export default ThemedPage