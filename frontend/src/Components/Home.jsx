import React, { Component } from "react";
import img01 from "./images/image01.png";
import img02 from "./images/image02.png";
import img03 from "./images/image03.png";
import Carousel from "react-bootstrap/Carousel";

export default class Home extends Component {
  render() {
    return (
      <div>       
          <Carousel className="col-sm-8 offset-sm-2 mt-4">
            <Carousel.Item>
              <img className="d-block w-100" src={img02} alt="First slide" />
              <Carousel.Caption>
                <h3>Convenience</h3>
                <p>
                Find home the easy way.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img03} alt="Third slide" />

              <Carousel.Caption>
                <h3>Quick</h3>
                <p>Save Time. Save Money.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img01} alt="Third slide" />

              <Carousel.Caption>
                <h3>Trust</h3>
                <p>
                Trusted source of homes.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>

      <div className="row mt-5">
          <div className="col-xs-3 col-sm-4 offset-sm-2">
            <h2>What we do?</h2> 
            <p>The process of finding accommodation has not been improved in decades. People often find difficulty in finding housing when they are migrating to a new place. Buybay is a platform that permits users with a variety of services such as a listing of apartments and contacts the buyers for further enquires. The purpose of the website is to allow users to view the listings with their interests like price range, locality, furnishing type, number of bedrooms.</p>
          </div>
          <div className="col-xs-3 col-sm-4">
            <h2 >Our Services</h2>
            <p>The central objective of Buybay is to provide services for the user who looks for accommodation in the major cities of Canada.  Users can view the listings and comment for the listed apartments which can act as a feedback for the listings. If users register for subscription service, they can be notified of the new listing on the website.</p>
          </div>
       </div>
      </div>
    );
  }
}
