const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate } = require('../middlewares/authenticate');
/**
 * @swagger
 * /reports:
 *   post:
 *     summary: Report 생성
 *     tags: 
 *       - Report
 *     description: 로그인 한 상황에서 Report를 생성한다. userId는 토큰에서 date는 현재시간 contents는 body에서 받아온다.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               contents:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contents:
 *                 type: string
 *     responses:
 *       201:
 *         description: Report 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 report:
 *                   $ref: '#/components/schemas/Report'
 *       400:
 *         description: Validation Error
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
router.post('/', authenticate, reportController.createReport);
/**
 * @swagger
 * /reports/my:
 *   get:
 *     summary: 내 Report 가져오기
 *     tags: 
 *       - Report
 *     description: 로그인 한 상황에서 내 Report들을 가져온다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 내 Report 가져오기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 reports:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Report'
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
router.get('/my', authenticate, reportController.getMyReports);
/**
 * @swagger
 * /reports/{id}:
 *   get:
 *     summary: 특정 Report 가져오기
 *     tags: 
 *       - Report
 *     description: 로그인 한 상황에서 특정 Report를 가져온다. 내가 쓴 Report가 아니면 401을 반환한다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Report의 id
 *     responses:
 *       200:
 *         description: Report 가져오기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 report:
 *                   $ref: '#/components/schemas/Report'
 *       401:
 *         description: You are not the author of this report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Report not found
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
router.get('/:id', authenticate, reportController.getReport);
/**
 * @swagger
 * /reports/{id}:
 *   put:
 *     summary: Report 수정
 *     tags: 
 *       - Report
 *     descrpiton: 로그인 한 상황에서 Report를 수정한다. 내가 쓴 Report가 아니면 401을 반환한다. 이미 해결된 Report라면 403을 반환한다.date를 최신으로 업데이트함
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Report의 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               contents:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contents:
 *                 type: string
 *     responses:
 *       200:
 *         description: Report 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 report:
 *                   $ref: '#/components/schemas/Report'
 *       401:
 *         description: You are not the author of this report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: This report is already resolved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Report not found
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
router.put('/:id', authenticate, reportController.modifyReport);
/**
 * @swagger
 * /reports/{id}:
 *   delete:
 *     summary: Report 삭제
 *     tags: 
 *       - Report
 *     description: 로그인 한 상황에서 Report를 삭제한다. 내가 쓴 Report가 아니면 401을 반환한다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Report의 id
 *     responses:
 *       200:
 *         description: Report 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string 
 *       401:
 *         description: You are not the author of this report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string 
 *       404:
 *         description: Report not found
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
router.delete('/:id', authenticate, reportController.deleteReport);
/**
 * @swagger
 * /reports/all:
 *   get:
 *     summary: 모든 Report 가져오기
 *     tags: 
 *       - Report
 *     description: 로그인 한 상황에서 모든 Report를 가져온다. 관리자만 접근 가능하다.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 모든 Report 가져오기 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reports:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Report'
 *       401:
 *         description: You are not an admin
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
router.get('/all', reportController.getAllReports);
/**
 * @swagger
 * /reports/{id}/resolve:
 *   put:
 *     summary: Report 해결
 *     tags: 
 *       - Report
 *     description: 로그인 한 상황에서 Report를 해결한다. 관리자만 접근 가능하다. response(답변)을 body에서 받아온다. 그리고 isResolved를 true로 바꾼다.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Report의 id
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: string
 *     responses:
 *       200:
 *         description: Report 해결 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string 
 *                 report:
 *                   $ref: '#/components/schemas/Report'
 *       401:
 *         description: You are not an admin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *       403:
 *         description: This report is already resolved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string 
 *       404:
 *         description: Report not found
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
router.put('/:id/resolve', authenticate, reportController.resolveReport);

module.exports = router;
