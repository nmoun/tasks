import React from 'react'

import './style.scss'


class Autocomplete extends React.Component {
  /**
   * @param {Object} props 
   * @param {Array} props.options - suggestions displayed below text input (e.g: [{id: 5, label: "Item 1"}, {id: 2, label: "Item 5"}])
   * @param {function} props.handleClick - called when an suggestion is clicked. Parameter is the id of the selected option.
   * @param {function} props.handleChange - called when input's value changes
   * @param {Number} props.value - value in the input
   * @param {Number} props.width - (optional) width of input and suggestions
   */
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
          return <li key={option.id} className="autocomplete-entry clickable" onClick={this.handleClick(option.id)}><span>{option.label}</span></li>
        })}
      </ul>
    </div>
  }
}

export default Autocomplete