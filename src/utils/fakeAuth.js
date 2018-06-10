const fakeAuth = {
    isAuthenticated: false,
    authenticate(data){
        return fetch('/api/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'same-origin'
        }).then((res) => {
            console.log("login success")
            if(res.status == 200){
                this.isAuthenticated = true;
                // Cookies.set("SESSIONID","DUMMY")
            }
        });
    }
}
export default fakeAuth