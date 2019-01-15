import React from 'react'
import './style.scss'

function Fab(props){
  function handleClick(){
    if(props.handleClickFab)
      props.handleClickFab()
  }
  return <div className="fab clickable" onClick={handleClick}><div className="fab-image"/></div>
}

export default Fab