import ReactDOM from 'react-dom'
import React from 'react'

import './style.scss'

function Dialog(props){

  function handleClickOverlay(){
    if(props.isDismissible === true){
      closeDialog()
    }
  }

  return <div className="overlay" onClick={handleClickOverlay}>
    <div className="dialog">{props.children}</div>
  </div>
}

export function openDialog(content, props){
  const container = document.createElement("div")
  container.setAttribute("id", "dialog-container")
  const {isDismissible, ...rest} = props
  const Content = content
  ReactDOM.render(<Dialog isDismissible={isDismissible}><Content {...rest}/></Dialog>, document.body.appendChild(container))
}

export function closeDialog(){
  const container = document.getElementById("dialog-container")
  if(container){
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container); 
  } 
}