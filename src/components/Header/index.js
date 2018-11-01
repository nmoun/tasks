import React from 'react';

import './style.scss'

/**
 * @param {object} props
 * @param {string} leftIcon - possible values in Header.ICONS
 */
function Header(props){
  let classLeft = 'header-left' + (props.leftIcon ? ' ' + props.leftIcon : '');

  return <div className='header'>
    <a className={classLeft} onClick={props.onLeftClick}>
      <span>{props.leftText}</span>
    </a>
    <div className='headerTitle'>
      <span className='text-white'>{props.title}</span>
    </div>
    <div className='header-right' onClick={props.onRightClick}>
      <a>{props.rightText}</a>
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