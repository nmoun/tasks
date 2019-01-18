import React from 'react'
import { Link } from 'react-router-dom'

import './style.scss'

// hard coded for now
const entries = [{
  type: '/order',
  label: 'Order',
},{
  type: '/reception',
  label: 'Reception',
}] 

function Menu(props){
  const classMenu = props.isDisplayed ? "menu-container" : "menu-hidden"
  return <div className={classMenu}>
    <div className="menu">
      <ul>
        {entries.map((entry) => {
          return <li key={entry.label} className="menu-entry">
            <Link to={entry.type}>
              <span>{entry.label}</span>
            </Link>
          </li>
        })}
      </ul>
    </div>
  </div>
}

export default Menu