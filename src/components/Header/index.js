import React from 'react';

import './style.scss'

function Header(props){
  return <div className='header'>
    <div className='headerButton'>
    </div>
    <div className='headerTitle'>
      <span className='text-white'>{props.title}</span>
    </div>
  </div>
}

export default Header