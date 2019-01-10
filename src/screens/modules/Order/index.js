import React from 'react'
import {Route, withRouter} from 'react-router-dom'
import OrderArticleList from './OrderArticleList';

function Order(props){
  console.log('props.match: ' + JSON.stringify(props.match))
  let taskId = props.match.params.id
  return <React.Fragment>
    <Route path={`${props.match.path}/`} exact render={(props) => { console.log('sub routes : ' + JSON.stringify(props)); return <OrderArticleList taskId={taskId} {...props}/> }} />
  </React.Fragment>
}

export default withRouter(Order)