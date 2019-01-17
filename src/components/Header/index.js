import React from 'react';

import './style.scss'

/**
 * @param {object} props
 * @param {string} leftIcon - possible values in Header.ICONS
 */
function Header(props){
  let classLeft = 'header-left clickable' + (props.leftIcon ? ' ' + props.leftIcon : '');

  return <div className='header'>
    <div className={classLeft} onClick={props.handleClickLeft}>
      <span>{props.leftText}</span>
    </div>
    <div className='header-title'>
      <span className='text-white'>{props.title}</span>
    </div>
    <div className='header-right clickable' onClick={props.handleClickRight}>
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