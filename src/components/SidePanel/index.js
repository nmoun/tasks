import React from 'react'

import './style.scss'

function SidePanel(props) {
  let className = props.isDisplayed === true ? "side-panel" : "side-panel hide";

  let entries = props.entries

  return <div className='side-panel-container'>
    <div className={className}>
      <div>
        <ul className="entries">
          {entries.map(function(entry) {
            return <Entry key={entry.label} {...entry} />
          })}
        </ul>
      </div>
    </div>
  </div>
}
export default SidePanel

function Entry(props) {
  return <li className="entry clickable" id={props.entryId} onClick={props.handleClickEntry}>
    <span>{props.label}</span>
  </li>
}