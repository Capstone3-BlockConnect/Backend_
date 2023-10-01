const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authenticate } = require('../middlewares/authenticate');



/**
 * @swagger
 * paths:
 *   /posts/list:
 *     get:
 *       summary: Get all posts
 *       tags:
 *         - posts
 *       parameters:
 *         - name: page
 *           in: query
 *           description: Page number
 *           required: false
 *           schema:
 *             type: integer
 *         - name: limit
 *           in: query
 *           description: Number of posts per page
 *           required: false
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Posts retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   currentPage:
 *                     type: integer
 *                   totalPages:
 *                     type: integer
 *                   posts:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Post'
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.get('/list', postController.getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieve a post by its ID
 *     tags:
 *       - posts
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
 *     tags:
 *       - posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
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
 *     tags:
 *       - posts
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
 *         application/x-www-form-urlencoded:
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
 *     tags:
 *       - posts
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
 * paths:
 *   /posts/{id}/upvote:
 *     post:
 *       summary: Upvote or remove upvote from a post by ID
 *       tags:
 *         - posts 부가기능
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the post to upvote
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: 게시물 추천
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 upvotes:
 *                   type: number
 *                   example: 5
 *         '201':
 *           description: 게시물 추천 취소
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 upvotes:
 *                   type: number
 *                   example: 4
 *         '401':
 *           description: Unauthorized access
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: Post not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.post('/:id/upvote', authenticate, postController.upvotePost);

/**
 * @swagger
 * paths:
 *   /posts/{id}/bookmark:
 *     post:
 *       summary: Bookmark a post
 *       tags:
 *         - posts 부가기능
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the post
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: 북마크 추가
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   bookmarksCount:
 *                     type: number
 *                     example: 1
 *         '201':
 *           description: 북마크 취소
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   bookmarksCount:
 *                     type: number
 *                     example: 0
 *         '401':
 *           description: Unauthorized access
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: Post not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */

router.post('/:id/bookmark', authenticate, postController.bookmarkPost);
/**
 * @swagger
 * paths:
 *   /posts/{id}/comment:
 *     post:
 *       summary: Add a comment to a post
 *       tags:
 *         - posts 부가기능
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the post
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         description: Content of the comment
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *       responses:
 *         '201':
 *           description: Comment added successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         user:
 *                           type: string
 *                         content:
 *                           type: string
 *                         datePosted:
 *                           type: string
 *                   commentsCount:
 *                     type: number
 *         '401':
 *           description: Unauthorized access
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: Post not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.post('/:id/comment', authenticate, postController.commentPost);

/**
 * @swagger
 * paths:
 *   /posts/comment/{id}:
 *     delete:
 *       summary: Delete a comment on a post
 *       tags:
 *         - posts 부가기능
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the post
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Comment deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         user:
 *                           type: string
 *                         content:
 *                           type: string
 *                         datePosted:
 *                           type: string
 *                   commentsCount:
 *                     type: number
 *         '401':
 *           description: Unauthorized access
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '403':
 *           description: Only the comment author can delete the comment
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: Post not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '405':
 *           description: Comment not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.delete('/comment/:id', authenticate, postController.deleteComment);

/**
 * @swagger
 * paths:
 *   /posts/comments/{id}:
 *     put:
 *       summary: Modify a comment on a post
 *       tags:
 *         - posts 부가기능
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           description: ID of the post
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         description: New content of the comment
 *         required: true
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *       responses:
 *         '200':
 *           description: Comment modified successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         user:
 *                           type: string
 *                         content:
 *                           type: string
 *                         datePosted:
 *                           type: string
 *                   commentsCount:
 *                     type: number
 *         '401':
 *           description: Unauthorized access
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '403':
 *           description: Only the comment author can modify the comment
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '404':
 *           description: Post not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '405':
 *           description: Comment not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
router.put('/comment/:id', authenticate, postController.modifyComment);

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
 *           ref: User
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
 *               _id:
 *                 type: mongoose.Schema.Types.ObjectId
 *                 description: The ID of the comment.
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
 *             description: Array of comments associated with the post.
 *           commentsCount:
 *             type: number
 *             description: The number of comments for the post.
 *           bookmarksCount:
 *             type: number
 *             description: The number of bookmarks for the post.
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