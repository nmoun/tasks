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
            return <Entry key={entry.entryId} {...entry} />
          })}
        </ul>
      </div>
    </div>
  </div>
}
export default SidePanel

function Entry(props) {
  return <li className="entry clickable" id={props.entryId} onClick={props.onEntryClick}>
    <span>{props.entryLabel}</span>
  </li>
}