//Author: Zeel Shah, Keerthi Gowda and Sumita Parte
import React, { Component } from "react";
import img01 from "./images/image1.jpg";
import img02 from "./images/image01.png";
import img03 from "./images/image3.jpg";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import axios from "axios";
import cogoToast from "cogo-toast";
import clock from "./images/Clock.png";
import deleteIMG from "./images/delete.png";
import moment from "moment";
import Comment from "./viewComment";
import Cookies from "js-cookie";
import { Button, Modal } from "react-bootstrap";
import { FaPhoneAlt, FaMailBulk, FaHeart, FaTimes } from "react-icons/fa";

let user = {
  firstName: null,
  lastName: null,
  emailId: null,
  phoneNumber: null,
};
export default class Products extends Component {
  constructor(props) {
    super(props);

    //     const sock = new WebSocket('wss://csci5709-a4-webgroup18.herokuapp.com/comment');
    //     sock.onopen = function() {
    //     };
    //     const self = this;
    //      sock.onmessage = function(e) {
    //       const message = JSON.parse(e.data);
    //       const dataToSend = JSON.stringify(message);
    //       self.setState({ comment: dataToSend });
    // };
    this.state = {
      apiResponse: [],
      message: "",
      comments: [],
      //actions : sock,
      comment: {},
      listingid: this.props.location.data,
      showModal: false,
      showremoveFavModal: false,
      addFavFlg: true,
      sessionEmailId: Cookies.get("User"),
    };
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // if user is logged in then check if the listing is in fav listing or not
    if (this.state.sessionEmailId != null) {
      // get current user details
      axios
        .post("https://csci5709-a4-webgroup18.herokuapp.com/getCurrentUser", {
          emailId: this.state.sessionEmailId,
        })
        .then((response) => {
          user.emailId = response.data.user[0].emailId;
          if (response.data.user[0].favlisting) {
            user.favlisting = response.data.user[0].favlisting;
            // check if this listing is in favListing array
            const exists = user.favlisting.some(
              (v) => v === this.state.listingid
            );
            if (exists) {
              this.setState({ addFavFlg: false, showremoveFavModal: false });
            }
            return response;
          }
        });
    }
  }

  callAPI() {
    const { listingid } = this.state;
    if (listingid) {
      axios
        .get("https://csci5709-a4-webgroup18.herokuapp.com/api/comments/")
        .then((resp) => this.setState({ comments: resp.data }))
        .catch((err) => console.log(err));
      fetch(
        `https://csci5709-a4-webgroup18.herokuapp.com/buybay-api/userById/${listingid}`
      )
        .then((res) => res.json())
        .then((res) => this.setState({ apiResponse: res }));
    } else {
      alert("Property not found! Redirecting back to Listing page.");
      window.location = "/listings";
    }
  }
  componentDidMount() {
    this.callAPI();
  }
  onChangeMessage(e) {
    this.setState({
      message: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const comment = {
      message: this.state.message,
      userName: "",
      emailId: "",
    };
    const emailAddress = "askbfksfbdkfb";
    if (Cookies.get("User")) {
      axios
        .post("https://csci5709-a4-webgroup18.herokuapp.com/getCurrentUser", {
          emailId: Cookies.get("User"),
        })
        .then((response) => {
          this.callAPI();
          this.setState({ message: "" });
          if (Cookies.get("User")) {
            axios
              .post(
                "https://csci5709-a4-webgroup18.herokuapp.com/api/comments/add",
                {
                  emailId: response.data.user[0].emailId,
                  userName:
                    response.data.user[0].firstName +
                    " " +
                    response.data.user[0].lastName,
                  message: comment.message,
                }
              )
              .then((response) => {
                this.callAPI();
                this.setState({ message: "" });
              })
              .catch((err) =>
                cogoToast
                  .error("Failed adding comment", { hideAfter: 7 })
                  .then(() => this.setState({ message: "" }))
              );
          } else {
            const { hide } = cogoToast.warn("Click to login & comment", {
              onClick: () => {
                hide();
                window.location = "/login";
              },
            });
          }
          // comment.userName = response.data.user[0].firstName + response.data.user[0].lastName;
          // comment.emailId = response.data.user[0].emailId;
        })
        .catch((err) =>
          cogoToast
            .error("Failed adding comment", { hideAfter: 7 })
            .then(() => this.setState({ message: "" }))
        );
    }

    //  const token = sessionStorage.getItem("jwt-token");
    //    if(token === null){
    //      const { hide } = cogoToast.warn('Click to login & comment', {
    //        onClick: () => {
    //          hide();
    //          window.location = '/commentlogin';
    //        },
    //      });
    //    }
    //    else {
    //    const headers = { headers: {
    //      "Accept": "application/json",
    //      "Content-type": "application/json",
    //      "auth-header": token,
    //      }
    //    }
    //  if(Cookies.get("User")){
    //  axios.post('http://localhost:5000/api/comments/add', {
    //    emailId: comment.emailId,
    //    userName: comment.userName,
    //    message: comment.message
    //  })
    //    .then(response => {
    //      this.callAPI()
    //      this.setState({message : ''})
    //    })
    //    .catch(err => cogoToast.error('Failed adding comment', { hideAfter : 7 })
    //    .then(() => this.setState({message : ''})));
    //  }

    // else{
    //   const { hide } = cogoToast.warn('Click to login & comment', {
    //             onClick: () => {
    //               hide();
    //               window.location = '/login';
    //             },
    //         });
    // }
  }
  //}

  // componentDidMount(){
  //   axios.get('http://localhost:4000/api/comments/')
  //     .then(resp => this.setState({ comments : resp.data }))
  //   
  // }

  componentWillReceiveProps(nextProps) {
    const data = JSON.parse(nextProps.comment);

    this.setState({ comments: [data.data, ...this.state.comments] });
  }

  commentList() {
    return this.state.comments.map((currentcomment) => {
      return (
        <Comment
          comment={currentcomment}
          socket={this.props.actions}
          key={currentcomment._id}
        />
      );
    });
  }
  // for Add to fav. button toggle
  handleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  handleRemoveModal() {
    this.setState({ showremoveFavModal: !this.state.showremoveFavModal });
  }
  // Add the listing to favourites
  addFavListing(e) {
    // e.preventDefault();
    const token = sessionStorage.getItem("jwt-token");
    const cookieUser = Cookies.get("User");
    if (cookieUser == null) {
      const { hide } = cogoToast.warn("Please login to proceed", {
        onClick: () => {
          hide();
          window.location = "/login";
        },
      });
    } else {
      // get listing id and user id
      const { listingid } = this.state;
      const favlisting = {
        // user: sessionStorage.getItem("email"),
        user: Cookies.get("User").toString(),
        listingId: listingid,
      };
      // save data to db
      let url = `https://csci5709-a4-webgroup18.herokuapp.com/buybay-api/addToFav`;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favlisting),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
        });
      this.setState({
        showModal: true,
        addFavFlg: false,
        showremoveFavModal: false,
      });
    }
  }

  deleteFavListing() {
    // e.preventDefault();
    const { listingid } = this.state;
    const favlisting = {
      user: Cookies.get("User").toString(),
      listingId: listingid,
    };
    // save data to db
    let url = `https://csci5709-a4-webgroup18.herokuapp.com/buybay-api/deleteFav`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favlisting),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        
      });
    this.setState({
      showModal: false,
      addFavFlg: true,
      showremoveFavModal: true,
    });
  }
  render() {
    const {
      apiResponse,
      showModal,
      addFavFlg,
      showremoveFavModal,
    } = this.state;
    return (
      <div className="mt-3">
        <div className="row">
          <Carousel className="col-xs-3 col-sm-6 offset-sm-1">
            <Carousel.Item>
              <img className="d-block w-100" src={img01} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img02} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={img03} alt="Third slide" />
            </Carousel.Item>
          </Carousel>
          <div className="col-xs-3 col-sm-4">
            <h2>Description</h2>
            <br />
            <p>
              {" "}
              {apiResponse.map((home) => (
                <div>{home.description}</div>
              ))}{" "}
            </p>
          </div>
        </div>
        <hr />
        <div className="row mt-5">
          <div className="col-xs-2 col-sm-6 offset-sm-1">
            <h3>Property Summary</h3>
            <hr />
            <div className="row">
              <div className="col-sm-4 col-xs-1">
                <h6>Type</h6>
                <p>
                  {apiResponse.map((home) => (
                    <div>{home.type}</div>
                  ))}
                </p>
              </div>
              <div className="col-sm-4 col-xs-1">
                <h6>Neighbourhood Name</h6>
                <p>
                  {apiResponse.map((home) => (
                    <div>{home.neighbourhood_name}</div>
                  ))}
                </p>
              </div>
              <div className="col-sm-4">
                <h6>Rent</h6>
                <p>
                  {apiResponse.map((home) => (
                    <div>{home.rent}</div>
                  ))}
                </p>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-sm-4">
                <h6>Lease</h6>
                <p>
                  {apiResponse.map((home) => (
                    <div>{home.lease}</div>
                  ))}
                </p>
              </div>
              <div className="col-sm-4">
                <h6>Area</h6>
                <p>
                  {apiResponse.map((home) => (
                    <div>{home.area}</div>
                  ))}
                </p>
              </div>
              <div className="col-sm-4">
                <h6>Parking Type</h6>
                <p>
                  {apiResponse.map((home) => (
                    <div>{home.parking_type}</div>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <div className="col-xs-1 col-sm-4">
            <Card className="row">
              <Card.Body>
                <Card.Title>Contact Seller</Card.Title>
                <Card.Text>
                  {apiResponse.map((home) => (
                    <div>{home.sellername}</div>
                  ))}
                </Card.Text>
                <Card.Text>
                  <span>
                    {apiResponse.map((home) => (
                      <div>{home.sellerno}</div>
                    ))}
                  </span>
                </Card.Text>
                <Card.Text>
                  <span>
                    {apiResponse.map((home) => (
                      <div>{home.email}</div>
                    ))}{" "}
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
            {addFavFlg && (
              <Button
                variant="warning"
                onClick={() => {
                  this.addFavListing();
                }}
              >
                <FaHeart /> Favourite
              </Button>
            )}
            <Modal
              show={showModal}
              onHide={() => {
                this.handleModal();
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohooo!! This listing is added to your favourites.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    this.handleModal();
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {!addFavFlg && (
              <Button
                variant="danger"
                onClick={() => {
                  this.deleteFavListing();
                }}
              >
                <FaTimes /> Remove Favourite
              </Button>
            )}
            <Modal
              show={showremoveFavModal}
              onHide={() => {
                this.handleRemoveModal();
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Notification</Modal.Title>
              </Modal.Header>
              <Modal.Body>Listing is removed from your favourites.</Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    this.handleRemoveModal();
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div>
          <h3>Add Your Comment </h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <textarea
                rows="3"
                required
                className="form-control"
                value={this.state.message}
                placeholder="Type a comment"
                onChange={this.onChangeMessage}
              ></textarea>
            </div>
            <div className="form-group" align="right">
              <input
                type="submit"
                className="btn btn-dark"
                value="Submit"
              ></input>
            </div>
          </form>
        </div>
        <div className="d-flex flex-column">
          <h3>Comments</h3>

          {this.commentList()}
        </div>
      </div>
    );
  }
}
