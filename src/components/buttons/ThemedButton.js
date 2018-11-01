import React from 'react'

import "scss/custom.scss"

function ThemedButton(props){
  return <button type="button" className="btn btn-lg btn-emo-dark border-emo text-emo" onClick={props.onClick}>{props.text}</button>
}

export default ThemedButton