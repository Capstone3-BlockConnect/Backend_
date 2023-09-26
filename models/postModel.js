const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - type
 *         - author
 *         - authorNickname
 *         - region
 *       properties:
 *         title:
 *           type: string
 *           description: The post's title.
 *         content:
 *           type: string
 *           description: The post's content.
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the post.
 *         type:
 *           type: string
 *           enum: [거래, 자율, 나눔]
 *           description: The type of the post.
 *         datePosted:
 *           type: string
 *           format: date-time
 *           description: When the post was created.
 *         price:
 *           type: number
 *           description: The price, only applicable for 거래 type.
 *         expirationDate:
 *           type: string
 *           format: date-time
 *           description: Expiry date, only applicable for 거래 and 나눔 types.
 *         author:
 *           type: string
 *           description: The ID of the author from the User model.
 *         authorNickname:
 *           type: string
 *           description: The nickname of the author.
 *         region:
 *           type: string
 *           description: The region where the post was created.
 *         upvotes:
 *           type: number
 *           description: The number of upvotes for the post.
 *         upvotedUsers:
 *           type: array
 *           items:
 *             type: string
 *           description: The list of users who upvoted the post.
 *         views:
 *           type: number
 *           description: The number of views for the post.
 *         imageURL:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs associated with the post.
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID of the commenter.
 *               nickname:
 *                 type: string
 *                 description: Nickname of the commenter.
 *               content:
 *                 type: string
 *                 description: The content of the comment.
 *               datePosted:
 *                 type: string
 *                 format: date-time
 *                 description: When the comment was posted.
 *       example:
 *         title: "제목입니다"
 *         content: "내용입니다"
 *         tags: ["tag1", "tag2"]
 *         type: "거래"
 *         datePosted: "2022-03-17T08:00:00Z"
 *         price: 10000
 *         expirationDate: "2022-04-01T08:00:00Z"
 *         author: "5f50a1c76fbb1a1f0fe1f7eb"
 *         authorNickname: "게시글작성자"
 *         region: "서울시 관악구 봉천동"
 *         upvotes: 10
 *         upvotedUsers: ["5f50a1c76fbb1a1f0fe1f7eb", "5f50a1c76fbb1a1f0fe1f7ec"]
 *         views: 100
 *         imageURL: ["sample1.jpg", "sample2.jpg"]
 *         comments: [
 *           {
 *             user: "5f50a1c76fbb1a1f0fe1f7ec",
 *             nickname: "댓글작성자",
 *             content: "댓글입니다.",
 *             datePosted: "2022-03-17T09:00:00Z"
 *           }
 *         ]
 */

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