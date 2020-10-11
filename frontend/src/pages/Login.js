import React, { Component } from 'react'
import LoginPage from '../Components/LoginPage'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    }
    handleSuccessfulLogin(emailId){
        this.props.handleLogin(emailId);
        this.props.history.push("/")
    }
    render(props) {
        return (
            <div>
                <LoginPage handleSuccessfulLogin = {this.handleSuccessfulLogin}/>
            </div>
        )
    }
}
