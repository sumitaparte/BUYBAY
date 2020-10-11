const router = require('express').Router();
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');


router.post('/login',async (request, response) => {
    
    const user = await User.findOne({email : request.body.email});
    if(! user ) return response.status(400).json({ registered : false});
    const validPass = await User.findOne({password : request.body.password});
    if(!validPass) return response.status(400).json({password : false});
    //Passing the token along with the header
    const token = jwt.sign({ _id : user._id},"<key>");
    response.header('auth-header',token);
    response.json({success: true, message: 'Logged in'});
});


module.exports = router