import React, { Component } from "react";
import ReadMoreReact from 'read-more-react';
import { Link } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";
import Cookies from "js-cookie";

class ViewFavourite extends Component {
    constructor() {
        super();
        this.state = {
          favListings: [],
          sessionEmailId: Cookies.get("User"),
        };
        this.getFavListingByUser();
      }
    getFavListingByUser = () => {
        const{sessionEmailId} = this.state;
        if(sessionEmailId !=null){
          const searchObj = {
            emailid : sessionEmailId
          }
          let url = `https://csci5709-a4-webgroup18.herokuapp.com/getFavListingByUser/`;
          
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(searchObj),
          };
          fetch(url, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              this.setState({favListings: data.object})
            });
        } else {
            alert("Please login to view Favourites listing, Redirecting Login page.");
            window.location = "/login";
          }
              
      };

  render() {
    const {  favListings  } = this.state;
    return (
      <div className="row container-fluid d-flex justify-content-center">
        <div className="col-sm-12">
        <h2>My Favourites</h2>
        </div>
         <CardDeck className="col-sm-12">
          {favListings.map((item, index) => (
            <div className="p-1 col-sm-4" key={item.listingId}>
                <Card>
                <Card.Img variant="top" src={require(`./images/${item.image}`)} />
                  <Card.Body>
                    <Card.Title>{item.listingName}</Card.Title>
                    <Card.Text>{item.listingLocation}</Card.Text>
                    <Card.Text><ReadMoreReact text={item.description}  min={50}/></Card.Text>
                    <Card.Text><b>Type: </b>{item.type}</Card.Text>
                    <Card.Text><b>Bedrooms:</b> {item.bedrooms}</Card.Text>
                  <Link to={{ pathname: '/property-page', data: item.listingId }}>  View Property Details</Link>
                  </Card.Body>
                </Card>
            </div>
          ))}
           </CardDeck> 
      </div>
    );
  }
}

export default ViewFavourite;
