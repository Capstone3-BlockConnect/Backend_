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
router.delete('/all', matchingController.deleteAllMatchings);

/**
 * @swagger
 * /matchings/myLog:
 *   get:
 *     summary: 현재 사용자의 매칭 로그 검색
 *     tags:
 *      - Matching
 *     description: 현재 사용자가 참여했었던 매칭의 목록과 해당 매칭 날짜, 다른 사용자 정보를 반환합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공적인 연산
 *         schema:
 *           type: object
 *           properties:
 *             logs:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-11-07T00:00:00.000Z"
 *                   user:
 *                     type: string
 *                     example: "5f8d04b3c88a4e2e50f7b07b"
 *       404:
 *         description: 매칭을 찾을 수 없음
 *       500:
 *         description: 내부 서버 오류
 */
router.get('/myLog', authenticate,matchingController.getMyLog);
/**
 * @swagger
 * /matchings/statistics:
 *   get:
 *     summary: 매칭 관련 통계 정보 검색
 *     tags:
 *       - Matching
 *     description: 전체 매칭 수를 검색합니다.
 *     responses:
 *       200:
 *         description: 성공적으로 통계 정보 검색
 *         schema:
 *           type: object
 *           properties:
 *             statistics:
 *               type: number
 *               example: 100
 *       404:
 *         description: 매칭 정보가 없음
 *       500:
 *         description: 내부 서버 오류
 */
router.get('/statistics', matchingController.getStatistics);
/**
 * @swagger
 * /matchings/myStatistics:
 *   get:
 *     summary: 현재 사용자의 매칭 통계 정보 검색
 *     tags:
 *       - Matching
 *     description: 현재 사용자가 참여한 전체 매칭 수를 검색합니다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 성공적으로 통계 정보 검색
 *         schema:
 *           type: object
 *           properties:
 *             statistics:
 *               type: number
 *               example: 25
 *       404:
 *         description: 매칭 정보가 없음
 *       500:
 *         description: 내부 서버 오류
 */
router.get('/myStatistics', authenticate, matchingController.getMyStatistics);

/**
 * @swagger
 * /matchings/matchingToLog:
 *   put:
 *     summary: 모든 매칭을 로그로 이동
 *     tags:
 *       - Matching
 *     description: 모든 매칭을 로그로 이동합니다.
 *     responses:
 *       200:
 *         description: 매칭 로그로 이동 성공
 *       500:
 *         description: 내부 서버 오류
 */
router.put('/matchingToLog', matchingController.matchingToLog)

module.exports = router;