import React from 'react'
import Header from 'components/Header'
import ThemedProtectedPage from 'components/pages/ThemedProtectedPage'
import {withRouter} from 'react-router-dom'

function Reception(props){
  let {history} = props;
  let goBack = () => {
    history.goBack();
  }
  return <ThemedProtectedPage>
    <Header title="Reception" leftIcon={Header.ICONS.BACK} onLeftClick={goBack}/>
  </ThemedProtectedPage>
}

Reception = withRouter(Reception)

export {Reception}