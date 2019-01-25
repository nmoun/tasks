import React from 'react'

import './style.scss'

function NavButton(props){
  return <div className="navbutton-container clickable">
    <span>{props.text}</span><img className="navbutton-img" alt="navbutton" src={props.imgSrc}/>
  </div>
}

export default NavButton