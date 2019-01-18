import React from 'react'
import { connect } from 'react-redux'
import {Route, withRouter} from 'react-router-dom'
import OrderArticleList from './OrderArticleList'
import OrderArticleDetail from './OrderArticleDetail'
import { createTask } from 'actions/tasks'
import { startTransaction, stopTransaction } from 'actions/transaction'
import { generateTmpId } from 'utils/functions'

class Order extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.startTransaction()
    if(this.props.match.path === this.props.location.pathname){
      // Root route: create a temporary task and display it
      const { history } = this.props,
        newTaskId = generateTmpId()
      this.props.createTask({id: newTaskId, type: 'order', title: 'Order'})
      history.replace(`${this.props.match.path}/${newTaskId}`)
    }
  }

  componentWillUnmount(){
    this.props.stopTransaction()
  }

  render(){
    return <React.Fragment>
      <Route path={`${this.props.match.path}/:taskId`} exact render={(props) => { return <OrderArticleList taskId={props.match.params.taskId} {...props}/> }} />
      <Route path={`${this.props.match.path}/:taskId/:articleId`} exact render={(props) => { return <OrderArticleDetail taskId={props.match.params.taskId} articleId={props.match.params.articleId} {...props}/> }} />
    </React.Fragment>
  }
}

const mapDispatchToProps = {
  createTask,
  startTransaction,
  stopTransaction,
}

export default withRouter(connect(null, mapDispatchToProps)(Order))