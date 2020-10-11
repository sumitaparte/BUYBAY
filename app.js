//importing set of packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //body-parser used to get form data
const userRoute = require('./api/routes/listingRoute');
const userPayment = require("./api/routes/paymentRoute");
const blogRoute  = require('./api/routes/blogRoute');
const path = require('path');
const expressWs = require('express-ws');

//setting boy-parser form-data limit 
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

const mongoURL = 'mongodb+srv://webdevadmin:admin123@webgroup18.qguff.mongodb.net/BestBuy?retryWrites=true&w=majority'

//creating connection with MongoDB Atlas database
mongoose.connect(mongoURL,{ useNewUrlParser: true},(err,db)=>{
    if(!err){
        console.log("Connected to database");
    }
});

//setting the CORS
const cors = require('cors');
const corsOptions = {
    exposedHeaders: 'auth-header',
  };
  app.use(cors(corsOptions));

app.use(express.json());
const wsInstance = expressWs(app);

//comment routing

const UserRouter = require('./api/routes/Users')
const commentsRouter = require('./api/routes/comment');
app.use('/api/comments',commentsRouter);
app.use('/api/users',UserRouter);
app.use('/blogs',blogRoute);


app.ws('/comment', (ws, req) => {

    ws.on('message', function incoming(message) {
      console.log(message) ;
      ws.broadcast(message);
    });

    ws.broadcast = function broadcast(data) {
      wsInstance.getWss().clients.forEach(function each(client) {
      client.send(data);
      });
    };
})

//running the route

app.use('/buybay-api', userRoute);
app.use("/payment-api", userPayment);

app.use(express.static(path.join(__dirname, 'frontend/build'))); //defining the directory name for the path

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'frontend/build/index.html')); // defining the path for running the index.html file on the express app
})

module.exports = app;
