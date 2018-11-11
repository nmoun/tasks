import React from 'react'
import Header from 'components/Header'
import ThemedProtectedPage from 'components/pages/ThemedProtectedPage'
import {withRouter} from 'react-router-dom'

function Order(props){
  let {history} = props;
  let goBack = () => {
    history.goBack();
  }
  return <ThemedProtectedPage>
    <Header title="Order" leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
  </ThemedProtectedPage>
}

Order = withRouter(Order)

export default Order