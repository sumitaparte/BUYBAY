import React, { Component } from "react";
import { Navbar, Nav, Button} from 'react-bootstrap';
import Cookies from "js-cookie";

export default class Header extends Component {
  render() {
    return (
      <div className="navbarbg">
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand  className="navbartitle" href="/">BUYBAY</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              
            </Nav>
            <Nav>
              <Nav.Link href="/roommate"><Button className="navbarbtn" type="submit">Find My Roommate</Button></Nav.Link>
              <Nav.Link href="/listings"><Button className="navbarbtn" type="submit">Listings</Button></Nav.Link>
              <Nav.Link href="/viewblog"><Button className="navbarbtn" type="submit">Blog</Button></Nav.Link>
              <Nav.Link href="/sign-up"><Button className="navbarbtn" type="submit">Register</Button></Nav.Link>
              <Nav.Link href="/upgrade"><Button className="navbarbtn" type="submit">Upgrade</Button></Nav.Link>
              <Nav.Link href="/profile"><Button className="navbarbtn" type="submit">My Profile</Button></Nav.Link>
              <Nav.Link href="/fav"><Button className="navbarbtn" type="submit">My Favourites</Button></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
