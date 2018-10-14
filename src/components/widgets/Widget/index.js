import React from 'react'

import './style.scss'

class Widget extends React.Component {

  constructor(props){
    super(props)
  }


  render(){
    let className = 'rounded widget text-white' + (this.props.className ? ' ' + this.props.className : '');
    return <div className={className}>
      <span>{this.props.title}</span>
    </div>
  }
}

export default Widget