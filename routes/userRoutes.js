const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticate');


/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID
 *               password:
 *                 type: string
 *                 description: The user's password
 *               nickname:
 *                 type: string
 *                 description: The user's nickname
 *               gender:
 *                 type: string
 *                 description: The user's gender
 *                 enum: ['남성', '여성']
 *                 example: '남성'
 *               age:
 *                 type: number
 *                 description: The user's age
 *               phoneNumber:
 *                 type: string
 *                 description: The user's phone number
 *               foodCategory:
 *                 type: string
 *                 description: The user's food category
 * 
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               password:
 *                 type: string
 *               nickname:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: number
 *               phoneNumber:
 *                 type: string
 *               foodCategory:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Id나 nickname 또는 phoneNumber가 이미 존재합니다
 *       500:
 *         description: Internal server error
 */
router.post('/signup', userController.signup);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID
 *               password:
 *                 type: string
 *                 description: The user's password
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     age:
 *                       type: integer
 *                     phoneNumber:
 *                       type: string
 *                     foodCategory:
 *                       type: string
 *       401:
 *         description: User not found
 *       402:
 *         description: Incorrect password
 *       500:
 *         description: Internal server error
 */
router.post('/login', userController.login);
/**
 * @swagger
 * /users/list:
 *   get:
 *     summary: Get a list of all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       nickname:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       age:
 *                         type: integer
 *                       phoneNumber:
 *                         type: string
 *                       foodCategory:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
router.get('/list', userController.getAllUsers);
/**
 * @swagger
 * /users/profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to fetch profile
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     gender:
 *                       type: string
 *                     age:
 *                       type: integer
 *                     phoneNumber:
 *                       type: string
 *                     foodCategory:
 *                       type: string
 *       401:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/profile/:id', userController.getProfileByUserId);
/**
 * @swagger
 * /users/my/profile:
 *   get:
 *     summary: Get the profile of the authenticated user
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - User not found or authentication failed
 *       500:
 *         description: Internal server error
 */
router.get('/my/profile', authenticate, userController.getMyProfile);
/**
 * @swagger
 * /users/my/profile:
 *   put:
 *     summary: Modify the profile of the authenticated user
 *     tags:
 *       - Test
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Profile modification details
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               nickname:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *               foodCategory:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               nickname:
 *                 type: string
 *               gender:
 *                 type: string
 *               age:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *               foodCategory:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully modified the user's profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - User not found or authentication failed
 *       402:
 *         description: Invalid old password
 *       500:
 *         description: Internal server error
 */
router.put('/my/profile', authenticate, userController.modifyProfile);

/**
 * @swagger
 * /users/my/profile:
 *   delete:
 *     summary: Delete the authenticated user's account
 *     tags:
 *       - Test
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: User authentication password
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the user's account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *       401:
 *         description: Unauthorized - User not found or authentication failed
 *       402:
 *         description: Invalid password
 *       500:
 *         description: Internal server error
 */
router.delete('/my', authenticate, userController.deleteUser);


module.exports = router;

