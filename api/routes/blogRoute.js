const express = require("express");
const router = express.Router();

const blogData = require("../model/blogModel");
const {searchUser2} = require("../controllers/blogController");

// get all listings
router.get("/", (req, res) => {
console.log("Entering blogs")
  blogData
    .find()
    .exec()
    .then((result) => {
    console.log("Data entered")
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/blogById/:username", (req, res) => {
 
  let username = req.params.username;
  console.log("blog id is"+username);
  searchUser2("username", username).then((data) => {
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
});



router.put('/ratings/:blogratingid', function(req, res) {
  let blogratingid = req.params.blogratingid;
  console.log("Blog rating id"+blogratingid)
  //console.log("new")
 // console.log(blogData.findOne({blogratingid}))
  let ratings = req.body.ratingvalue;
 // const newBook = new blogData({

//    blogratingid :  req.params.blogratingid,
   // ratings: req.body.ratingvalue,
  //});
  blogData.updateOne(
    {
      "blogId" : req.params. blogratingid
    },
    {
      "ratings" : req.body.ratingvalue
    }
  ).then(data => {
      console.log(data)
  }).catch(err=>{
    console.log(err)
  })
    //console.log("saved")    

});


module.exports = router;
