const express = require('express');
const router = express.Router();
const matchingController = require('../controllers/matchingController');
const { authenticate } = require('../middlewares/authenticate');

/**
 * @swagger
 * /matchings/request:
 *   post:
 *     summary: Create a new matching request
 *     tags:
 *       - MatchingRequest
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the matching request
 *                 example: "2023-10-28"
 *               time:
 *                 type: string
 *                 format: time
 *                 enum: ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00']
 *                 description: Time of the matching request
 *               category:
 *                 type: string
 *                 enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페']
 *                 description: Category of the matching request
 *               memo:
 *                 type: string
 *                 description: Additional memo for the matching request
 *                 example: "매운거 싫어요"
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date of the matching request
 *                 example: "2023-10-28"
 *               time:
 *                 type: string
 *                 format: time
 *                 enum: ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00']
 *                 description: Time of the matching request
 *               category:
 *                 type: string
 *                 enum: ['한식' , '일식', '양식', '아시안', '테이크아웃', '술집', '치킨/피자', '카페']
 *                 description: Category of the matching request
 *               memo:
 *                 type: string
 *                 description: Additional memo for the matching request
 *                 example: "매운거 싫어요"
 *     responses:
 *       201:
 *         description: Matching request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 matchingRequest:
 *                   type: object
 *       400:
 *         description: Bad request, validation error
 *       401:
 *        description: Unauthorized, authentication error 
 *       409:
 *         description: Matching request already exists
 *       500:
 *         description: Internal server error
 */
router.post('/request', authenticate, matchingController.request);
/**
 * @swagger
 * /matchings/request/one/{id}:
 *   delete:
 *     summary: Delete a matching request by ID
 *     tags:
 *       - MatchingRequest
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the matching request to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching request deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 matchingRequest:
 *                   type: object
 *       400:
 *         description: Bad request, invalid ID
 *       401:
 *         description: Unauthorized, authentication error or not owner of the matching request
 *       404:
 *         description: Matching request not found
 *       500:
 *         description: Internal server error
 */
router.delete('/request/one/:id', authenticate, matchingController.deleteRequest);
/**
 * @swagger
 * /matchings/request/list:
 *   get:
 *     summary: Get all matching requests
 *     tags:
 *       - MatchingRequest
 *     responses:
 *       200:
 *         description: List of matching requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matchingRequests:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/request/list', matchingController.getAllRequests);
/**
 * @swagger
 * /matchings/request/one/{id}:
 *   get:
 *     summary: Get a matching request by ID
 *     tags:
 *       - MatchingRequest
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the matching request to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching request retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matchingRequest:
 *                   type: object
 *       400:
 *         description: Bad request, invalid ID
 *       404:
 *         description: Matching request not found
 *       500:
 *         description: Internal server error
 */
router.get('/request/one/:id', matchingController.getRequest);
/**
 * @swagger
 * /matchings/request/my:
 *   get:
 *     summary: Get all matching requests of the user
 *     tags:
 *       - MatchingRequest
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of matching requests of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matchingRequests:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 *         content:
 */
router.get('/request/my', authenticate, matchingController.getMyRequest);
/**
 * @swagger
 * /matchings/request/my:
 *   delete:
 *     summary: Delete all matching requests of the user
 *     tags:
 *       - MatchingRequest
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Matching requests of the user deleted successfully
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
router.delete('/request/my', authenticate, matchingController.deleteMyRequest);

/**
 * @swagger
 * /matchings/request/all:
 *   delete:
 *     summary: 모든 매칭 요청 삭제
 *     tags:
 *       - MatchingRequest
 *     description: 모든 매칭 요청을 삭제합니다.
 *     responses:
 *       200:
 *         description: 매칭 요청 삭제 성공
 *       404:
 *         description: 매칭 요청을 찾을 수 없음
 *       500:
 *         description: 내부 서버 오류
 */
router.delete('/request/all', matchingController.deleteAllMatchingRequests);

/**
 * @swagger
 * /matchings/one/{id}:
 *   get:
 *     summary: Get a matching by ID
 *     tags:
 *       - Matching
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the matching to retrieve
 *     responses:
 *       200:
 *         description: Matching data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid Matching id
 *       404:
 *         description: Matching not found
 *       500:
 *         description: Internal server error
 */
router.get('/one/:id', matchingController.getMatching);
/**
 * @swagger
 * /matchings/list:
 *   get:
 *     summary: Get all matchings
 *     tags:
 *       - Matching
 *     responses:
 *       200:
 *         description: List of matchings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matchings:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/list', matchingController.getAllMatchings);
/**
 * @swagger
 * /matchings/my:
 *   get:
 *     summary: Get all matchings of the user
 *     tags:
 *       - Matching
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of matchings of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matchings:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */
router.get('/my', authenticate, matchingController.getMyMatching);
/**
 * @swagger
 * /matchings/confirm/{id}:
 *   post:
 *     summary: Confirm a matching by ID
 *     tags:
 *       - Matching
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the matching to confirm
 *     responses:
 *       200:
 *         description: Matching confirmed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: You are not a participant of this matching
 *       404:
 *         description: Matching not found
 *       500:
 *         description: Internal server error
 */
router.post('/confirm/:id', authenticate, matchingController.confirmMatching);
/**
 * @swagger
 * /matchings/all:
 *   delete:
 *     summary: 모든 매칭 삭제
 *     tags:
 *      - Matching
 *     description: 모든 매칭을 삭제합니다.
 *     responses:
 *       200:
 *         description: 매칭 삭제 성공
 *       404:
 *         description: 매칭을 찾을 수 없음
 *       500:
 *         description: 내부 서버 오류
 */
router.delete('/all', matchingController.deleteAllMatchings)

module.exports = router;