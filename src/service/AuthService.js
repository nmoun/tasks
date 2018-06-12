import {JWT_TOKEN} from 'utils/constants'
import decode from 'jwt-decode';

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  console.log('token exp date: '+ expirationDate)
  return expirationDate < new Date();
}

export function authenticate(data) {
  return fetch('/api/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'same-origin'
  }).then((res) => {
    if (res.status === 200) {
      console.log("login success")
      // this.isAuthenticated = true;
      return res.json();
    }
  }).then(data => {
    localStorage.setItem(JWT_TOKEN, data.token)
  });
};

export function logout() {
  return fetch('/api/logout', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  }).then((res) => {
    if (res.status === 200) {
      console.log("logout success")
      // this.isAuthenticated = false;
      localStorage.removeItem(JWT_TOKEN)
    }
  });
};

export function isLoggedIn(){
  const idToken = localStorage.getItem(JWT_TOKEN);
  return !!idToken && !isTokenExpired(idToken);
}
