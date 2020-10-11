import React, { Component, Fragment } from "react";
import "react-dropdown/style.css";
import Dropdown from "react-dropdown";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import ItemDetails from "./ItemDetails";
import { FaFilter, FaTimes } from "react-icons/fa";

export default class View extends Component {
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
      propTypes: ["Apartment", "House", "Condos"],
      furnished: ["Fully Furnished", "Semi Furnished"],
      bedrooms: ["Any", "1", "2 or more"],
      selectedPropType: "",
      selectedfurnish: "",
      selectedbedrooms: "",
      showCard: false,
    };
    this.getAllListings();
  }
  // for selecting values from drop down
  handleprop = (option) => {
    const selectedPropType = option.value;
    this.setState({ selectedPropType });
  };
  handlefurnish = (option) => {
    const selectedfurnish = option.value;
    this.setState({ selectedfurnish });
  };
  handlebedrooms = (option) => {
    const selectedbedrooms = option.value;
    this.setState({ selectedbedrooms });
  };
  resetAllDropdown = () => {
    this.setState({
      selectedbedrooms: "",
      selectedfurnish: "",
      selectedPropType: "",
    });
    this.getAllListings();
  };
  getSearchData = () => {
    const { selectedbedrooms, selectedfurnish, selectedPropType } = this.state;
    const searchObj = {
      propertType: selectedPropType,
      furnished: selectedfurnish,
      bedrooms: selectedbedrooms,
    };

    if (searchObj.propertType || searchObj.furnished || searchObj.bedrooms) {
      // get data according to search filter
      this.setState({ showCard: true });
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
      alert("Please select from the criteria");
    }
  };
  getAllListings = () => {
    let _this = this;
    let suggestions = [];
    // Url of your website that process the data and returns a
    let url = `https://csci5709-a4-webgroup18.herokuapp.com/buybay-api`;
    // Configure a basic AJAX request to your server side API
    // that returns the data according to the sent text
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = () => {
      let status = xhr.status;

      if (status === 200) {
        suggestions = xhr.response;
        _this.setState({
          filteredSuggestions: suggestions,
        });
      } else {
        console.error("Cannot load data from remote source");
      }
    };
    xhr.send();
  };

  retrieveDataAsynchronously = (searchText) => {
    let _this = this;
    let suggestions = [];
    // Url of your website that process the data and returns listings according to search criteria
    let url = `https://csci5709-a4-webgroup18.herokuapp.com/buybay-api/bylistingName/${searchText}`;

    // Configure a basic AJAX request to your server side API
    // that returns the data according to the sent text
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.onload = () => {
      let status = xhr.status;
      if (status === 200) {
        if (xhr.response) {
          suggestions = xhr.response.Object;
          _this.setState({
            filteredSuggestions: suggestions,
          });
        } else {
          // get top listings to display
          this.getAllListings();
        }
      } else {
        console.error("Cannot load data from remote source");
      }
    };
    xhr.send();
  };

  // Event fired when the input value is changed
  onChange = (e) => {
    const userInput = e.currentTarget.value;
    // Filter our suggestions that don't contain the user's input
    this.retrieveDataAsynchronously(userInput);
    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      showSuggestions: true,
      userInput: e.currentTarget.value,
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = (e) => {
    // Update the user input and reset the rest of the state
    let selectedItem = [];
    let input = e.currentTarget.innerText;
    if (input.length > 1) {
      selectedItem = this.state.filteredSuggestions.filter(
        (item) => item.listingName === input
      );
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: selectedItem,
        showSuggestions: false,
        userInput: input,
      });
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
        propTypes,
        furnished,
        bedrooms,
        selectedPropType,
        selectedfurnish,
        selectedbedrooms,
        showCard,
      },
    } = this;
    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="col-xs-12 col-sm-6 offset-sm-3">
            {filteredSuggestions.map((suggestion, index) => {
              return (
                <li key={suggestion.listingId} onClick={onClick}>
                  {suggestion.listingName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions col-xs-12 col-sm-6 offset-sm-3">
            <em>No suggestions, please try different listings or use filter</em>
          </div>
        );
      }
    }
    let cardcomp;
    //if(userInput || showCard){
    if (filteredSuggestions.length) {
      cardcomp = <ItemDetails allItems={this.state.filteredSuggestions} />;
    } else {
      cardcomp = (
        <div className="no-suggestions col-xs-12 col-sm-6 offset-sm-3">
          <em>No suggestions, please try different search criteria</em>
        </div>
      );
    }
    //}

    return (
      <div className="row ml-2 mr-2 d-flex justify-content-center">
        <Fragment>
          <div className="Autocomplete">
            <input
              type="text"
              placeholder="Search by listing name"
              className="search-control mt-5 col-xs-12 col-sm-6 offset-sm-3"
              onChange={onChange}
              onKeyDown={onKeyDown}
              onClick={onClick}
              value={userInput}
            />
            {suggestionsListComponent}
          </div>
        </Fragment>

        <div className="row m-3">
          <Dropdown
            className="pr-2 pl-3 m-1"
            options={propTypes}
            onChange={this.handleprop}
            value={selectedPropType}
            placeholder="Property Type"
          />
          <Dropdown
            className="pr-2 m-1"
            options={furnished}
            onChange={this.handlefurnish}
            value={selectedfurnish}
            placeholder="Furnished"
          />
          <Dropdown
            className="pr-2 m-1"
            options={bedrooms}
            onChange={this.handlebedrooms}
            value={selectedbedrooms}
            placeholder="Bedrooms"
          />
          <Button
            className="pr-2 m-1"
            variant="warning"
            size="sm"
            onClick={this.getSearchData}
          >
            <FaFilter /> Apply filter
          </Button>
          <Button
            className="pr-2 m-1"
            variant="warning"
            size="sm"
            onClick={this.resetAllDropdown}
          >
            <FaTimes /> Clear filter
          </Button>
        </div>
        {cardcomp}
      </div>
    );
  }
}
