import React from 'react'
import {Route, withRouter} from 'react-router-dom'
import OrderArticleList from './OrderArticleList';

function Order(props){
  return <React.Fragment>
    <Route path={props.match.path + "/:id"} exact component={OrderArticleList} />
  </React.Fragment>
}

export default withRouter(Order)