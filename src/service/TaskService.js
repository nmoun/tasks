
export function fetchTasks() {
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
  }).then((tasks) => {
    
  }).catch(error => {
    console.log('error: ' + error)
  });
};