const { use } = require("../routes/listingRoute");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  listingId: {
    type: String,
    required: true,
  },
  listingName: {
    type: String,
  },
  listingLocation: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  bedrooms: {
    type: String,
  },
  furnished: {
    type: String,
  },
  neighbourhood_name:
  {
    type:String,
  },
  parking_type:
  {
    type: String,
  },
  lease:
  {
    type: String,
  },
  area:
  {
    type: String,
  },
  rent:
  {
    type: String,
  },
  sellername:
  {
    type: String,
  },
  sellerno:
  {
    type:String,
  }, gender:
  {
    type: String,
  },
  preAge:
  {
    type: String,
  },
  priceRange:
  {
    type: String,
  },
  preferences:
  {
      type : String,
  }

});

module.exports = mongoose.model("listings", userSchema);


