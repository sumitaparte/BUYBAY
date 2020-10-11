import React, { Component } from 'react'
import ForgotPasswordPage from '../Components/ForgotPasswordPage'

export default class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.handleSuccessfulForgotPassword = this.handleSuccessfulForgotPassword.bind(this);
    }
    handleSuccessfulForgotPassword(){
        this.props.history.push("/login")
    }
    render(props) {
        return (
            <div>
                <ForgotPasswordPage handleSuccessfulForgotPassword = {this.handleSuccessfulForgotPassword}/>
            </div>
        )
    }
}
