/* author Keerthi Gowda /*
/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import clock from './images/Clock.png';
//import deleteIMG from "./images/delete.png" ;
import cogoToast from 'cogo-toast';
import Cookies from "js-cookie";

export default class Comment extends Component {

  constructor(props){
    super(props);
    this.onSubmit = this.onEdit.bind(this);
   
  }
  

  onEdit(com){
    const comment = {
      message : com._id
  }
  // const token = sessionStorage.getItem("jwt-token");
  //     if(token === null){
  //      const { hide } = cogoToast.warn('Click to login & Delete your comment.', {
  //       onClick: () => {
  //         hide();
  //         window.location = '/commentlogin';
  //       },
  //     });
  //   }
    if(Cookies.get("User")){
    
    axios.post('https://csci5709-a4-webgroup18.herokuapp.com/api/comments/delete',comment )
    .then(resp =>{ this.setState(resp.data)
      const { hide } = cogoToast.warn('You have successfully deleted the comment. Please click here to visit new listings you may interested', {
        onClick: () => {
          hide();
          window.location = '/listings';
           
        },
      });
           })
    //.then (window.location = '/listings')
    .catch(err => cogoToast.error('Failed deleting the comment', { hideAfter : 7 }))
      }
      else{
        const { hide } = cogoToast.warn('Click to login & Delete your comment.', {
                onClick: () => {
                  hide();
                  window.location = '/login';
                },
              });
      }
    }
    
  render() {
    var deleteButton = null;
    if(Cookies.get("User") === this.props.comment.emailId){
      deleteButton = <div> <input type="submit" className="btn btn-dark" name="edit"  onClick={()=>this.onEdit(this.props.comment)} alt="delete" width="60" height="40" value="Delete" /><span  style={{fontSize: '16px', 'fontWeight': 'bolder', 'verticalAlign':'4px'}}>&nbsp;&nbsp;&nbsp;</span> </div>
    
    }
    return (
      <div className="card">
        <div className="row">
          <div className="col-md-10 px-3">
            <div className="card-block px-3">
            <h5 className="card-title text-dark" style={{marginTop: '10px', 'fontWeight':'bolder'}}>{this.props.comment.userName}</h5>  
              <p className="card-text" style={{fontSize: '16px'}}>{this.props.comment.message }</p>
              <p className="text-muted" style={{fontSize: '13px'}}><img src={clock} style={{width: '13px', height: '13px'}} />&nbsp;&nbsp;{moment(Date.parse(this.props.comment.createdAt)).fromNow()}</p>
            </div>
          </div>
          <div className="col-md-2 px-3">
            <div>
              <br/>
              {deleteButton}
              </div>
          </div>
        </div>
      </div>
  )

  }
 
}