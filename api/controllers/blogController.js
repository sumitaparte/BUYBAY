const blogData = require("../model/blogModel");
const objectID = require("mongodb").ObjectID;

const searchUser2 = (key, value)=>{

  const matchedUser = blogData.find({ blogId: value.toString() });
  console.log("matcheduser is"+matchedUser);
  return matchedUser;

  
}

module.exports.searchUser2 = searchUser2;