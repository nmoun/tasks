import React from 'react'
import './style.scss'

function Notify(props){
  const handleClick = () => {
    if(props.handleClick){
      props.handleClick()
    }
  }
  const  classText = "notify-text " + (props.status || Notify.STATUS.INFO)
  return <div className="notify-container" onClick={handleClick}>
    <span className={classText}>{props.message}</span>
  </div>
}

Notify.STATUS = {
  ERROR: 'notify-error',
  SUCCESS: 'notify-success',
  INFO: 'notify-info'
}

export default Notify