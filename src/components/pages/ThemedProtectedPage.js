import React from 'react'
import ThemedPage from './ThemedPage';
import ProtectedPage from './ProtectedPage';

const ThemedProtectedPage = function(props) {
  return <ProtectedPage>
    <ThemedPage>{props.children}</ThemedPage>
  </ProtectedPage>
}

export default ThemedProtectedPage