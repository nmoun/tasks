import React from 'react'
import { startTransaction, stopTransaction } from 'actions/transaction'
import { connect } from 'react-redux'

function withTransaction(WrappedComponent){
  class WithTransaction extends React.Component {
    constructor(props){
      super(props)
    }

    componentDidMount(){
      this.props.startTransaction()
    }

    componentWillUnmount(){
      this.props.stopTransaction()
    }

    render(){
      return <WrappedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = {
    startTransaction,
    stopTransaction
  }

  return connect(null, mapDispatchToProps)(WithTransaction)
}

export default withTransaction