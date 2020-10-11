//Author : Zeel Shah
import React, { Component } from "react";
import { Alert, CardDeck, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import img01 from "./images/image1.jpg";
import logo from "./images/logo.png";
import img02 from "./images/image01.png";
import img03 from "./images/image3.jpg";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: [], data: [] };
  }

  callAPI() {
    fetch("https://csci5709-a4-webgroup18.herokuapp.com/blogs")
      .then((res) => res.json())
      .then((res) => this.setState({ apiResponse: res }));
  }
  componentDidMount() {
    this.callAPI();
  }

  render() {
    const { apiResponse } = this.state;
    return (
      <div className="row container-fluid d-flex justify-content-center">
        <h2>Visit Our Top Blog Stories</h2>
        <CardDeck>
          {apiResponse.map((item, index) => (
            <div className="p-1 col-sm-4" key={item.blogId}>
              <Card>
                <Card.Img
                  variant="top"
                  src={require(`./images/${item.image}`)}
                />
                <Card.Body>
                  <Card.Title>
                    {item.blogtitle}
                    <Button variant="primary" style={{ float: "right" }}>
                      {" "}
                      Ratings <Badge variant="light">{item.ratings}</Badge>
                      <span className="sr-only">unread messages</span>
                    </Button>
                  </Card.Title>{" "}
                  <br />
                  <Card.Subtitle className="mb-2 text-muted">
                    Posted By {item.author} on {item.postdate}
                  </Card.Subtitle>
                  <Card.Text> {item.shortdescription} </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <p style={{ float: "right" }}>
                    <Link to={{ pathname: "/blogpost", data: item.blogId }}>
                      <Button variant="primary">Read more</Button>
                    </Link>
                  </p>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </CardDeck>
      </div>
    );
  }
}
