const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticate } = require('../middlewares/authenticate');



/**
 * @swagger
 * /posts/list:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 */
router.get('/list', postController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieve a post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A post object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', postController.getPost);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with the given data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: A new post object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, postController.createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     description: Update a post with the given ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               type:
 *                 type: string
 *               price:
 *                 type: number
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: An updated post object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Only the author of the post can modify it
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticate, postController.modifyPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete a post with the given ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 게시글이 삭제되었습니다
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Only the author of the post can delete it
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, postController.deletePost);

/**
 * @swagger
 * /posts/{id}/upvote:
 *   post:
 *     summary: Upvote or remove upvote from a post by ID
 *     description: Upvote or remove upvote from a post with the given ID 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to upvote
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: An object containing the upvote count and alreadyUpvoted status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 upvotes:
 *                   type: number
 *                   example: 5
 *                 alreadyUpvoted:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/upvote', authenticate, postController.upvotePost);


module.exports = router;

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