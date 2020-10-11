const { use } = require("../routes/blogRoute");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  blogId: {
    type: String,
  },
  description: {
    type: String,
  },
  ratings:
  {
    type: String,
  }

});

module.exports = mongoose.model("blogs", userSchema);


