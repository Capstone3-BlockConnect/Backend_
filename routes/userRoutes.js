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
 *                 enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페']
 *                 description: The user's food category
 *                 
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
 *                 enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페']
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully and logged in
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
 * 
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
 *     summary: Get user profile by id
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
router.get('/profile/:id', userController.getProfile);
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
 *       - User
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
 *                 enum: ['남성', '여성']
 *               age:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *               foodCategory:
 *                 type: string
 *                 enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페']
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
 *                 enum: ['남성', '여성']
 *               age:
 *                 type: integer
 *               phoneNumber:
 *                 type: string
 *               foodCategory:
 *                 type: string
 *                 enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페']
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
 *       - User
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
 *       403:
 *         description: User has pending matching requests or matching 
 *       500:
 *         description: Internal server error
 */
router.delete('/my/profile', authenticate, userController.deleteUser);
/**
 * @swagger
 * /users/all:
 *   delete:
 *     summary: 모든 사용자 지우기
 *     tags:
 *        - User
 *     description: 모든 사용자를 지우기.
 *     responses:
 *       '200':
 *         description: 성공적으로 가져온 경우
 *       '500':
 *         description: 서버 오류
 */
router.delete('/all', userController.deleteAllUsers);

/**
 * @swagger
 * /users/randomNickname:
 *   get:
 *     summary: 랜덤 닉네임 생성
 *     tags:
 *       - User
 *     description: 호출하면 랜덤으로 닉네임 생성하고 중복 검사하고 중복이면 다시 생성 아니면 반환
 *     responses:
 *       200:
 *         description: Successfully generated a random nickname
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 randomNickname:
 *                   type: string
 *                   description: The generated random nickname
 *       500:
 *         description: Internal server error
 */
router.get('/randomNickname', userController.createRandomNickname);
/**
 * @swagger
 * /users/my/openChatLink:
 *   put:
 *     summary: Open Chat Link 수정
 *     tags: 
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               openChatLink:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               openChatLink:
 *                 type: string
 *     responses:
 *       200:
 *         description: User modified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Id나 nickname 또는 phoneNumber가 이미 존재합니다
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/my/openChatLink', authenticate, userController.modifyMyOpenChatLink);
/**
 * @swagger
 * /users/my/openChatLink:
 *   get:
 *     summary: 내 Open Chat Link 가져오기
 *     tags: 
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User modified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 openChatLink:
 *                   type: string
 *       401:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/my/openChatLink', authenticate, userController.getMyOpenChatLink);
/**
 * @swagger
 * /users/my/openChatLink:
 *   delete:
 *     summary: 내 Open Chat Link 삭제
 *     tags: 
 *       - User
 *     description: 내 Open Chat Link 를 ''로 수정
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User modified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/my/openChatLink', authenticate, userController.deleteMyOpenChatLink);
/**
 * @swagger
 * /users/openChatLink/{id}:
 *   get:
 *     summary: Open Chat Link 가져오기
 *     tags: 
 *       - User
 *     description: _id에 해당하는 User의 Open Chat Link 가져오기
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID to fetch openChatLink
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get openChatLink
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 openChatLink:
 *                   type: string
 *       401:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         
 */
router.get('/openChatLink/:id', userController.getOpenChatLink);

module.exports = router;

