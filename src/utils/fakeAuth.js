const fakeAuth = {
  isAuthenticated: false,

  authenticate(data) {
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
        this.isAuthenticated = true;
      }
    });
  },

  logout() {
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
        this.isAuthenticated = false;
      }
    });
  }
}
export default fakeAuth