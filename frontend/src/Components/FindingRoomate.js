import React, { Component, Fragment } from "react";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import ItemDetails from "./ItemDetails";
import { FaFilter, FaTimes, FaItalic } from "react-icons/fa";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import Cookies from "js-cookie";
import cogoToast from "cogo-toast";

export default class findroomate extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array),
  };

  static defaultProps = {
    suggestions: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      gender: ["Male", "Female", "Other"],
      preAge: ["20's", "30's", "40's and above"],
      priceRange: [">500", "500-1000", "1500 or more"],
      preferences: [
        "pets allowed",
        "Smoking allowed",
        "Drinking allowed",
        "All",
      ],
      selectedPropType: "",
      selectedfurnish: "",
      selectedpriceRange: "",
      selectedpreferences: "",
      showCard: false,
    };
  }
  // for selecting values from drop down
  handleprop = (option) => {
    const selectedPropType = option.value;
    this.setState({ selectedPropType });
  };

  handlegender = (option) => {
    const selectedgender = option.value;
    this.setState({ selectedgender });
  };
  handlepreAge = (option) => {
    const selectedpreAge = option.value;
    this.setState({ selectedpreAge });
  };
  handlepriceRange = (option) => {
    const selectedpriceRange = option.value;
    this.setState({ selectedpriceRange });
  };
  handlepreference = (option) => {
    const selectedpreferences = option.value;
    this.setState({ selectedpreferences });
  };
  resetAllDropdown = () => {
    this.setState({
      selectedpriceRange: "",
      selectedpreAge: "",
      selectedgender: "",
      selectedpreferences: "",
    });
  };
  getSearchData = () => {
    const {
      selectedpriceRange,
      selectedpreAge,
      selectedgender,
      selectedpreferences,
    } = this.state;
    const searchObj = {
      gender: selectedgender,
      preAge: selectedpreAge,
      priceRange: selectedpriceRange,
      preferences: selectedpreferences,
    };

    if (
      searchObj.gender ||
      searchObj.preAge ||
      searchObj.priceRange ||
      searchObj.preferences
    ) {
      // get data according to search filter
      this.setState({ showCard: true });
      if (Cookies.get("User")) {
        let url = `https://csci5709-a4-webgroup18.herokuapp.com/buybay-api/searchByFilter`;
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(searchObj),
        };
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              filteredSuggestions: data.Object,
            });
          });
      } else {
        const { hide } = cogoToast.warn(
          "Click to login to find roommate of your choice ",
          {
            onClick: () => {
              hide();
              window.location = "/login";
            },
          }
        );
      }
    } else {
      alert("Please select from the criteria");
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput,
        preferences,
        gender,
        preAge,
        priceRange,
        selectedgender,
        selectedpreAge,
        selectedpriceRange,
        selectedpreferences,
        showCard,
      },
    } = this;

    let cardcomp;
    //if(userInput || showCard){
    if (filteredSuggestions.length) {
      cardcomp = <ItemDetails allItems={this.state.filteredSuggestions} />;
    } else {
      cardcomp = (
        <div className="no-suggestions col-xs-12 col-sm-6 offset-sm-3">
          <em>
            Please select the value from the filter to view your best roomate
            apartment{" "}
          </em>
        </div>
      );
    }

    //}

    return (
      <div>
        <img
          className="d-block w-100 "
          src="https://www.cbc.ca/mediacentre/content/images/unnamed.jpg"
          alt="Girl in a jacket"
        ></img>
        <br />
        <form action="javascript:void(0);">
          <FormLabel component="legend">
            Please answer the questions to match your roomate of your own
            preference
          </FormLabel>

          <div className="questions">
            <div className="question1">
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  1. Please Identify your gender
                </FormLabel>

                <Dropdown
                  options={gender}
                  onChange={this.handlegender}
                  value={selectedgender}
                  placeholder="Gender"
                />
              </FormControl>
            </div>
            <br />
            <div>
              <div className="question2">
                <FormControl component="fieldset" className="Checkbox">
                  <FormLabel component="legend">
                    2. Please select the preferred age of your roommate
                  </FormLabel>
                  <Dropdown
                    options={preAge}
                    onChange={this.handlepreAge}
                    value={selectedpreAge}
                    placeholder="Preferred age"
                  />
                </FormControl>
              </div>
            </div>
            <br />
            <div>
              <div className="question2">
                <FormControl component="fieldset" className="Checkbox">
                  <FormLabel component="legend">
                    3. Please select the price range
                  </FormLabel>

                  <Dropdown
                    options={priceRange}
                    onChange={this.handlepriceRange}
                    value={selectedpriceRange}
                    placeholder="Price range"
                  />
                </FormControl>
              </div>
            </div>
            <br />
            <div>
              <div className="question2">
                <FormControl component="fieldset" className="Checkbox">
                  <FormLabel component="legend">
                    4. Please select the housing preference
                  </FormLabel>
                  <Dropdown
                    options={preferences}
                    onChange={this.handlepreference}
                    value={selectedpreferences}
                    placeholder="Preferences"
                  />
                </FormControl>
              </div>
            </div>
            <br />
            <Button variant="primary" size="sm" onClick={this.getSearchData}>
              {" "}
              Search Your rommate
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="danger" size="sm" onClick={this.resetAllDropdown}>
              Reset all the options
            </Button>
          </div>
        </form>
        {cardcomp}
      </div>
    );
  }
}
