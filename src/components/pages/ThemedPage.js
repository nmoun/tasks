import React from 'react'

const ThemedPage = function(props){
  return (<div className="container-emo">
    {props.children}
  </div>)
}

export default ThemedPage