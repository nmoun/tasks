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
    console.log('Order constructor: ' + JSON.stringify(props, null, 2))
    if(props.location.hash.length > 0){
      props.startTransaction(props.location.hash.slice(1));
    }else {
      // Root route: create a temporary task and display it
      const { history } = props,
        newTaskId = generateTmpId()
      props.createTask({id: newTaskId, type: 'order', title: 'Order'})
      props.startTransaction(newTaskId);
      history.replace(`${props.match.path}/${newTaskId}`)
    }
  }

  componentDidMount(){
  }

  render(){
    return <React.Fragment>
      <Route path={`${this.props.match.path}/:taskId`} exact render={(props) => {
        return <OrderArticleList taskId={props.match.params.taskId} {...props}/> }} />
      <Route path={`${this.props.match.path}/:taskId/:articleId`} exact render={(props) => {
        return <OrderArticleDetail taskId={props.match.params.taskId} articleId={props.match.params.articleId} {...props}/> }} />
    </React.Fragment>
  }
}

const mapDispatchToProps = {
  createTask,
  startTransaction,
}

export default withRouter(connect(null, mapDispatchToProps)(Order))