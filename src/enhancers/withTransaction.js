import React from 'react'
import {startTransaction, stopTransaction, discardChanges} from 'actions/transaction'
import {connect} from 'react-redux'

function withTransaction(WrappedComponent){
  class WithTransaction extends React.Component {
    constructor(props){
      super(props)
    }

    componentDidMount(){
      this.props.startTransaction()
    }

    componentWillUnmount(){
      this.props.discardChanges()
      this.props.stopTransaction()
    }

    render(){
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = {
    startTransaction,
    stopTransaction,
    discardChanges,
  }

  return connect(null, mapDispatchToProps)(WithTransaction)
}

export default withTransaction