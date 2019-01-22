import React from 'react'
import { connect } from 'react-redux'
import {Route, withRouter} from 'react-router-dom'
import OrderArticleList from './OrderArticleList'
import OrderArticleDetail from './OrderArticleDetail'
import { createTask } from 'actions/tasks'
import { startTransaction } from 'actions/transaction'
import { generateTmpId } from 'utils/functions'

class Order extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log('Order componentDidMount: ' + JSON.stringify(this.props, null, 2))
    if(this.props.match.path === this.props.location.pathname){
      // Root route: create a temporary task and display it
      const { history } = this.props,
        newTaskId = generateTmpId()
      this.props.createTask({id: newTaskId, type: 'order', title: 'Order'})
      history.replace(`${this.props.match.path}/${newTaskId}`)
    }
  }

  render(){
    return <React.Fragment>
      <Route path={`${this.props.match.path}/:taskId`} exact render={(props) => {
        this.props.startTransaction(props.match.params.taskId);
        return <OrderArticleList taskId={props.match.params.taskId} {...props}/> }} />
      <Route path={`${this.props.match.path}/:taskId/:articleId`} exact render={(props) => {
        this.props.startTransaction(props.match.params.taskId);
        return <OrderArticleDetail taskId={props.match.params.taskId} articleId={props.match.params.articleId} {...props}/> }} />
    </React.Fragment>
  }
}

const mapDispatchToProps = {
  createTask,
  startTransaction,
}

export default withRouter(connect(null, mapDispatchToProps)(Order))