//Author : Zeel Shah and Sumita Parte
const listingData = require("../model/listingModel");
var mongodb = require("../DatabaseConfig");

const searchListingByName = (key, value) => {
  const matchedResult = listingData.find({ listingName: { $regex: "^" + value.toString() + '.*', $options: 'i' } });
  return matchedResult;
};

const searchByFilter = (key, value) => {
  query = {}
  if(value.propertType){
    query['type'] = value.propertType
  }
  if(value.furnished){
    query['furnished'] = value.furnished
  }
  if(value.bedrooms){
    if(value.bedrooms != "Any"){
      query['bedrooms'] = value.bedrooms
    }if (value.bedrooms == "2 or more"){
      query['bedrooms'] = { $ne: 1 }
    }
  }
    //price range
    if(value.priceRange){
      query['priceRange'] = value.priceRange
    }
    //Gender value search
    if(value.gender){
      console.log(value.gender)
      query['gender'] = value.gender
    }
    //prefered age
     if(value.preAge){
      query['preAge'] = value.preAge
    }
    
    //preferences
    if(value.preferences){
      query['preferences'] = value.preferences
    }

  console.log(query)
  // query = { $and: [{type: value.propertType },{bedrooms: value.bedrooms}, {furnished: value.furnished}] }
  const matchedResult = listingData.find(query);
  return matchedResult;
};

const getListingbyId = (key, value)=>{

  const matchedlisting = listingData.find({ listingId: value.toString() });
  console.log("matchedlisting is"+matchedlisting);
  return matchedlisting; 
}
module.exports.searchListingByName = searchListingByName;
module.exports.searchByFilter = searchByFilter;
module.exports.getListingbyId = getListingbyId;
