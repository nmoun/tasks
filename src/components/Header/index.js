import React from 'react';

import './style.scss'

/**
 * @param {object} props
 * @param {string} leftIcon - possible values in Header.ICONS
 */
function Header(props){
  let classLeft = 'header-left' + (props.leftIcon ? ' ' + props.leftIcon : '');

  return <div className='header'>
    <div className={classLeft} onClick={props.onLeftClick}>
      <span>{props.leftText}</span>
    </div>
    <div className='headerTitle'>
      <span className='text-white'>{props.title}</span>
    </div>
    <div className='header-right' onClick={props.onRightClick}>
      <span>{props.rightText}</span>
    </div>
  </div>
}

/**
 * Contains possible values for css class icons
 */
Header.ICONS = {
  MENU: 'header-icon-menu',
  BACK: 'header-icon-back'
}

export default Header