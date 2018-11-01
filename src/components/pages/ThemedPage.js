import React from 'react'

const ThemedPage = function(props){
  return (<div className="container-all">
    {props.children}
  </div>)
}

export default ThemedPage