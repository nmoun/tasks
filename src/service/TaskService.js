import {JWT_TOKEN} from 'utils/constants'
import {Promise} from 'es6-promise'

export function fetchTasks() {
  // var p = new Promise(function(resolve, reject) {
  //   setTimeout(function() {
  //     resolve();
  //   }, 600000);
  // }).then(function(){
  //   return fetch('/api/tasks', {
  //     method: 'get',
  //     headers: {
  //       'Accept': 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json',
  //       'Authorization': 'bearer ' + localStorage.getItem(JWT_TOKEN),
  //     },
  //     credentials: 'same-origin'
  //   }).then((res) => {
  //     return res.json()
  //   }).catch(error => {
  //     console.log('error: ' + error)
  //   });
  // });

  // return p;


  return fetch('/api/tasks', {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem(JWT_TOKEN),
    },
    credentials: 'same-origin'
  }).then((res) => {
    return res.json()
  }).catch(error => {
    console.log('error: ' + error)
  });
};