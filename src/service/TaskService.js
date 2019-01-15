import {JWT_TOKEN} from 'utils/constants'
import { normalize } from 'normalizr';
import schema from 'schemas';

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
  }).then((res) => {
    return normalize(res, schema)
  }).catch(error => {
    console.log('error: ' + error)
  });
};

export function saveTask(task) {
  const taskId = task.id,
    body = JSON.stringify(task);
  return fetch(`/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem(JWT_TOKEN),
    },
    credentials: 'same-origin',
    body
  }).then((res) => {
    return res.json()
  }).catch(error => {
    console.log('error: ' + error)
  });
};