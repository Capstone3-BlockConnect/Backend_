const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [String],  // 태그
    type: {
        type: String,
        enum: ['거래', '자율', '나눔'], // 글 종류
        required: true,
        index: true  // 인덱스 적용
    },
    datePosted: {
        type: Date,
        default: Date.now // 작성 시간
    },
    price: {
        type: Number,
        required: function() { return this.type === '거래'; } // 거래인 경우에만 필요
    },
    expirationDate: {
        type: Date,
        required: function() { return this.type === '거래' || this.type === '나눔'; } // 거래 또는 나눔인 경우에만 필요
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    authorNickname: { // 작성자의 닉네임
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true,
        index: true  // 인덱스 적용
    },
    upvotes: { // 추천수
        type: Number,
        default: 0
    },
    upvotedUsers: [{  // 중복 추천 방지를 위한 추천인 명단
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    views: {
        type: Number,
        default: 0
    },
    imageURL: {
        type: [String],
        default: null
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        nickname: {  // 댓글 작성자의 닉네임
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
        }
    }]
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;

