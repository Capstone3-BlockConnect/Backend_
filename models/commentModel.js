const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        index: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;