import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ChangePasswordPage from '../components/ChangePassword'
import {useHistory} from "react-router-dom";

export default function ChangePassword() {
    const history = useHistory();
        return (
            <div>
                <ChangePasswordPage  history = {this.history} handleSuccessfulChangePassword = {this.handleSuccessfulChangePassword}/>
            </div>
        )
}
