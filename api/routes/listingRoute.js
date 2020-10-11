// Author : Zeel Shah and Sumita Parte 
const express = require("express");
const router = express.Router();
var mongodb = require("../DatabaseConfig");
const listingData = require("../model/listingModel");
const {
  searchListingByName,
  searchByFilter,getListingbyId, getFavListingByUser,
} = require("../controllers/listingController");
const { response } = require("express");

// get all listings
router.get("/", (req, res) => {
  listingData
    .find()
    .exec()
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});


// get listing by name 
router.get("/bylistingName/:name", (req, res) => {
  let name = req.params.name;
  searchListingByName("name", name)
    .then((response) => {
      res.status(200).json({
        status: "Success",
        Object: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        status: "Failure",
        message: "User not found!!",
      });
    });
});

// search by listing filter and return all the listings matching search criteria 
router.post("/searchByFilter", (req, res) => {
  try {
    let searchListing = req.body;
    searchByFilter("searchListing", searchListing).then((response) => {
      res.status(200).json({
        status: "Success",
        Object: response,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(406).json({
      status: "failure",
      message: err,
    });
  }
});

router.get("/userById/:username", (req, res) => {
 
  let username = req.params.username;
  console.log("listing id is"+username);
  getListingbyId("username", username).then((data) => {
    console.log("data response is:"+ data);
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(200).json({
      status: "Failure",
      message: "User not found!!"
    });
  });
})

module.exports = router;
