//Author : Zeel Shah
import React, { Component } from 'react';
import {Alert, Container, Row, Col, Image, } from 'react-bootstrap';
import img01 from "./images/image1.jpg";
import img02 from "./images/image01.png";
import img03 from "./images/image3.jpg";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import BeautyStars from "beauty-stars";
import axios from 'axios';
import cogoToast from 'cogo-toast';
import Cookies from "js-cookie";

import logo from './images/logo.png';

export default class Blogpost extends Component {
   constructor(props)
      {
        super(props);
        this.state={apiResponse:[], 
        blogId: this.props.location.data, ratingvalue : 0, sessionEmailId: Cookies.get("User"),};
      }
    

    handleChange = (ratingvalue)=> {
    const cookieUser = Cookies.get("User");
    if (cookieUser == null) {
      const { hide } = cogoToast.warn("Please login to proceed", {
        onClick: () => {
          hide();
          window.location = "/login";
        },
      });
    } 
    else
    {
    this.setState({ ratingvalue })
    const { blogId }  = this.state;
    const book = {ratingvalue,};
    axios
      .put(`https://csci5709-a4-webgroup18.herokuapp.com/blogs/ratings/${blogId}`, book)
      .catch(err => {
      });
    if( ratingvalue == 1 || ratingvalue ==2 || ratingvalue ==3 || ratingvalue==4 || ratingvalue==5)
    {
      alert("Your rating " + ratingvalue + "  stars has been successfully saved" )
    }
  }
}


    callAPI()
    {
      const { blogId } = this.state;
      fetch(`https://csci5709-a4-webgroup18.herokuapp.com/blogs/blogById/${blogId}`)
      .then(res => res.json())
      .then(res => this.setState({apiResponse: res}));              
    }
    componentDidMount(){
      this.callAPI();
    }

  render(){
    const {apiResponse, handleChange, ratingvalue} =this.state;
  return(
      <div className="auth-wrapper">
          <Container style={{alignItems:"stretch"}}>
          <Row>
          <Col className ="col-md-9 text-left"> 
          <Row><div className="heading" style={{ float: 'left'}}> <p>{apiResponse.map(home => <div>{home.blogtitle}</div>)}</p></div></Row> 
          <Row>
            <Col><div><b> Posted By </b> <p>{apiResponse.map(home => <div>{home.author}</div>)}</p></div></Col>
            <Col><div><b>Posting Date </b> <p>{apiResponse.map(home => <div>{home.postdate}</div>)}</p></div> </Col> 
            </Row>
           </Col>
          <Col className ="col-md-3">
          <Row> Please provide your ratings here </Row>
          <Row>  <BeautyStars value={this.state.ratingvalue}  onChange={this.handleChange}/> </Row>
          </Col>
          
          </Row>
          </Container>
           <Row className ="offset-sm-1">
           {apiResponse.map(home => <Image src={require(`./images/${home.image}`)} fluid/>)}
          </Row><br/> 
           <div className="heading offset-sm-1" style={{ float: 'left'}}> Content </div><br/>
           <p className="offset-sm-1"> {apiResponse.map(home => <div>{home.description}</div>)} </p><br/>
           
</div>
 );
}
}
