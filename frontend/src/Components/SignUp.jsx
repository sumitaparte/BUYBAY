import React, { Component } from "react";
import { Redirect} from "react-router-dom";

const emailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
    let valid = true;
    // for invalid data check
    Object.values(errors).forEach(
      (val) => (val.length > 0) && (valid = false)
    );
    return valid;
  }
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fname: null,
          email: null,
          password: null,
          repass: null,
          errors: {
            name: '',
            email: '',
            password: '',
            repass: ''
          },
          toHome: false
        };
      }
      
      handleChange = (event) => {
        event.preventDefault();
        const {password} = this.state;
        const { name, value } = event.target;
        let errors = this.state.errors;
        
        switch (name) {
          case 'fname':
            errors.name = 
              value.length < 4 ? 'Name must be 4 characters long!' : '';
            break;
          case 'email': 
            errors.email = emailRegex.test(value) ? '' : 'Email is not valid!';
            break;
          case 'password': 
            errors.password = value.length < 8 ? 'Password must be 8 characters long!' : '';
            break;
          case 'repass': 
            errors.repass = value != password ? 'Password Mismatch!' : '';
            break;  
          default:
            break;
        }
      
        this.setState({errors, [name]: value});
      } 
      
      handleSubmit = (event) => {
        event.preventDefault();
        // for blank data check
        const {fname, email, password, repass, errors, toHome} = this.state;
        if(!fname){
            errors.name = "Name cannot be blank!";
        }
        if(!email){
            errors.email = "Email cannot be blank!"; 
        }
        if(!password){
            errors.password = "Password cannot be blank!";
        }
        if(!repass){
            errors.repass = "Enter password again!";
        }
        if(validateForm(errors)) {
          alert("Successfully Registered. *Note: Redirecting to Home page now");
          this.setState({toHome:true});
          // history.push('/listings')
        }else{
        }
        this.setState({errors, errors});
      }
      
    render() {
        const {errors, toHome} = this.state;
        if (toHome === true) {
           return <Redirect to='/home' />
        }
        return (
            <div className="container col-sm-6 offset-sm-3 shadow-lg p-3 mb-5 mt-5 bg-light rounded">
                <h2 className="text-center">Sign up!!</h2>
                <span className="subtitle text-center"> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</span>
                <form className="contact-form pt-4" onSubmit={this.handleSubmit} noValidate >
               
                    <div className="form-group">
                        <input className="form-control" type="text" name="fname" placeholder="First Name" onChange={this.handleChange} noValidate />
                        {errors.name.length >= 0 &&  <span className='text-danger text-left'>{errors.name}</span>}                    
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="email" name="email" placeholder="E-mail" onChange={this.handleChange} noValidate/>
                        {errors.email.length >= 0 &&  <span className='text-danger text-left'>{errors.email}</span>}  
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handleChange} noValidate/>
                        {errors.password.length >= 0 &&  <span className='text-danger text-left'>{errors.password}</span>}  
                    </div>
                    <div className="form-group">
                        <input type="password" name="repass" className="form-control" placeholder="Re-type Password" onChange={this.handleChange} noValidate/>
                        {errors.repass.length >= 0 &&  <span className='text-danger text-left'>{errors.repass}</span>}  
                    </div>
                    <div className="pb-4">
                    <span className="help-block">Password must be atleast 8 character in length.</span>
                        </div>                    
                    <input className="btn btn-md btn-primary btn-center mr-3" type="submit" value="Sign Up" />
                    <a href="/underCons">Already a user?</a>

                </form>
            </div>
        );
    }
}