import React from 'react'
import { stopTransaction } from 'actions/transaction'
import { connect } from 'react-redux'

function withTransaction(WrappedComponent){
  class WithTransaction extends React.Component {
    constructor(props){
      super(props)
    }

    componentWillUnmount(){
      this.props.stopTransaction()
    }

    render(){
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = {
    stopTransaction
  }

  return connect(null, mapDispatchToProps)(WithTransaction)
}

export default withTransaction