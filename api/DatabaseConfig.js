
const {MongoClient} = require('mongodb');
const uri = "<DB_URL>"
const client = new MongoClient(uri);
client.connect(function (err){
    if (err) throw err;
    else console.log("connected");
});
module.exports = client;