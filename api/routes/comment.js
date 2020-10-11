const router =require ('express').Router();
const Comment = require('../model/commentsModel');
const verify  = require('./Verify');
const mongoose = require('mongoose');

router.get('/' , (request,response) => {
     Comment.find()
    .populate('user')
    .sort({'createdAt':-1})
    .then(comments => response.json(comments))
    .catch(err => response.status(400).json('Error' + err));
});

router.post('/add',async (req,res) => {

    console.log(req.body);
    console.log(req.body.message)
    console.log(req.body.emailId)
    const comment = new Comment({

       // user : req.user._id,
        message : req.body.message,
        userName : req.body.userName,
        emailId: req.body.emailId
    });
    try {
        const savedComment = await comment.save();
        const savedCommentWithUserData = await Comment.findById(savedComment._id).populate('user');
        res.send(savedCommentWithUserData); 
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/delete', async (req,res) => {
    console.log(req.body.message)
    var id =req.body.message
    console.log(mongoose.Types.ObjectId(id));

        
     try {
         Comment.deleteOne({_id:mongoose.Types.ObjectId(id)})
         .then(result=>{
            res.status(201).json({message:"Comment Deleted"}); 
            console.log(result)
         });
        
         //console.log(Comment.deleteOne({_id:req.body.message}))
     }catch(err){
         res.status(400).send(err);
     }
})

module.exports = router;