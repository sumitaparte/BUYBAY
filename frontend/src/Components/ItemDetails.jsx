import React, { Component } from "react";
import ReadMoreReact from 'read-more-react';
import { Link } from "react-router-dom";
import { Card, CardDeck } from "react-bootstrap";

class ItemDetails extends Component {
  

  render() {
    return (
      <div className="row container-fluid d-flex justify-content-center">
        
        <CardDeck>
          {this.props.allItems.map((item, index) => (
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

export default ItemDetails;
