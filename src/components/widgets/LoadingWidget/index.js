import React from 'react'
import Widget from '../Widget'
import './style.scss'

class LoadingWidget extends React.Component {

  constructor(props){
    super(props)
  }


  render(){
    return <Widget title="Loading" className="loading-widget"/>
  }
}

export default LoadingWidget