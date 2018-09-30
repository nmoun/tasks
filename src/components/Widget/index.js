import React from 'react'

import './style.scss'

class Widget extends React.Component {

  constructor(props){
    super(props)
  }


  render(){
    return <div className='rounded widget text-white'>
      <span>{this.props.title}</span>
    </div>
  }
}

export default Widget