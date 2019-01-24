import React from 'react'
import { getTask } from 'state/reducers'
import { startTransaction, stopTransaction } from 'state/actions/transaction'
import { createTask } from 'utils/functions'
import { connect } from 'react-redux'
import { generateTmpId } from 'utils/functions'

/**
 * @param {React.Component} WrappedComponent - Module needing transaction system
 * @param {Object} defaultTaskFields -
 */
function withTransaction(WrappedComponent, defaultTaskFields){
  class WithTransaction extends React.Component {
    constructor(props){
      super(props)
      if(props.location.hash.length > 0){
        props.startTransaction(props.location.hash.slice(1), props.task);
      }else {
        // Root route: create a temporary task and display it
        const { history } = props,
          newTaskId = generateTmpId()
        const newTask = createTask({id: newTaskId, ...defaultTaskFields})
        props.startTransaction(newTaskId, newTask);
        history.replace(`${props.match.path}/${newTaskId}`)
      }
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
    stopTransaction,
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      task: getTask(state, ownProps.location.hash.slice(1))
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(WithTransaction)
}

export default withTransaction