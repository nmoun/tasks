import React from 'react'

import './style.scss'

class Autocomplete extends React.Component {
  constructor(props){
    super(props)
  }

  focus(){
    this.input.focus()
  }

  render(){
    return <div>
      <input
        ref={(input) => { this.input = input; }}
        type="text"
        value={this.props.value}
        className="autocomplete-input"
        onChange={this.props.handleChange}/>
    </div>
  }
}

export default Autocomplete