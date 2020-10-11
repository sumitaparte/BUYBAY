const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    message: { type: String, required: true},
    userName: {type : String, required : true}  ,
    emailId: {type : String, required : true}  
},{
    timestamps : true,
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;