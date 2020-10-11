import React, { Component } from "react"
import axios from "axios"
import cogoToast from 'cogo-toast';

export default class commentlogin extends Component{

    constructor(props){
        super(props);
       
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            email: '',
            password: ''
        }
      }
      onChangeEmail(e){
          this.setState({
              email : e.target.value
          });
      }

      onChangePassword(e){
        this.setState({
            password : e.target.value
        });
      }
    onSubmit(e){
        e.preventDefault();
        const authData = {
            email   : this.state.email,
            password : this.state.password
        }
        sessionStorage.setItem("email", this.state.email)
        axios.post('https://csci5709-a4-webgroup18.herokuapp.com/api/users/login', authData)
            .then(res => {
              sessionStorage.setItem("jwt-token",res.headers['auth-header']);
              cogoToast.success('Logged in successfully!', { hideAfter : 5 })
                  .then(() => window.location = '/listings')
            })
            .catch(err => {
              if(err.response.data.registered === false){
                 cogoToast.error('You have not registered, Register to our website to continue!')
              }
              else
                cogoToast.error('Login failed, please check your credentials & try again!', { hideAfter : 5 })
                .then(() => this.setState({email : '', password : ''}))
            });
        
      }
      render() {
        return (
          <div className="container">
          <h3>Login</h3>
          <form onSubmit={this.onSubmit} >
              <div className="form-group">
                <input type="text"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    placeholder="Email"
                    className="form-control"
                    >    
                </input>
              </div>
              <div className="form-group">
                <input type="password"
                    required
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    minLength = "8"
                    placeholder="Password"
                    className="form-control"
                    >    
                </input>
              </div>
              <div className="form-group" align="right">
                <input type="submit"
                    className="btn btn-dark"
                    value="Login">
                </input>
              </div>
          </form>
          </div>
        );
      }
}
