import React from 'react'
import Loadable from 'react-loadable'
import Reception from 'screens/modules/Reception'
// import Order from 'screens/modules/Order'
import Register from 'screens/Register';
import Login from 'screens/Login';
import Home from 'screens/Home';

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/modules/order/:id",
    component: Loadable({
      loader: () => import('screens/modules/Order'),
      loading: function(){ return <div>Loading module...</div>},
    })
  },
  {
    path: "/modules/reception/:id",
    component: Reception
  },
];

export default routes