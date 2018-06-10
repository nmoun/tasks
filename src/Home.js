import React from 'react'

class Home extends React.Component {

    constructor(){
        super()
        this.launchService = this.launchService.bind(this)
    }

    launchService(){
        return fetch('/api/authRequired', {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        }).then((res) => {
            if(!res.ok){
                throw new Error('Error')
            }
            return res.json()
        }).then((data) => {
            console.log('message: '+ data.message)
        }).catch(error => {
            console.log('message: '+ data.message)
        });
    }

    render(){
        return <div>Home    <button onClick={this.launchService}>Launch protected service</button></div>
    }
}

export default Home