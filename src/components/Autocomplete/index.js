import React from 'react'

import './style.scss'

class Autocomplete extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  focus(){
    this.input.focus()
  }

  handleClick(optionId){
    return () => {
      if(this.props.handleClick)
        this.props.handleClick(optionId)
    }
  }

  render(){
    const width = this.props.width ? this.props.width : "200px",
      options = this.props.options ? this.props.options : []
    return <div className="autocomplete">
      <input
        style={{width: width}}
        ref={(input) => { this.input = input; }}
        type="text"
        value={this.props.value}
        className="autocomplete-input"
        onChange={this.props.handleChange}/>
      <ul style={{width: width}} className="autocomplete-list">
        {options.map((option) => {
          return <li className="autocomplete-entry clickable" onClick={this.handleClick(option.id)}><span>{option.label}</span></li>
        })}
        <li className="autocomplete-entry clickable"><span>Article 1</span></li>
        <li className="autocomplete-entry clickable"><span>Artice 2</span></li>
        <li className="autocomplete-entry clickable"><span>Artice 3</span></li>
      </ul>
    </div>
  }
}

export default Autocomplete