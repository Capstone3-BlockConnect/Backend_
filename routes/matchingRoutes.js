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
 *       - Matching
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
 *                 description: Time of the matching request
 *                 example: "12:00"
 *               category:
 *                 type: string
 *                 description: Category of the matching request
 *                 example: "한식"
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
 *               time:
 *                 type: string
 *                 format: time
 *                 description: Time of the matching request
 *               category:
 *                 type: string
 *                 description: Category of the matching request
 *               memo:
 *                 type: string
 *                 description: Additional memo for the matching request
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Matching request already exists
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
router.post('/request', authenticate, matchingController.request);
/**
 * @swagger
 * /matchings/request/{id}:
 *   delete:
 *     summary: Delete a matching request by ID
 *     tags:
 *       - Test
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Matching request not found
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
router.delete('/request/:id', authenticate, matchingController.deleteRequest);
/**
 * @swagger
 * /matchings/request/list:
 *   get:
 *     summary: Get all matching requests
 *     tags:
 *       - Matching
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/request/list', matchingController.getAllRequests);
/**
 * @swagger
 * /matchings/request/{id}:
 *   get:
 *     summary: Get a matching request by ID
 *     tags:
 *       - Test
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Matching request not found
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
router.get('/request/:id', matchingController.getRequest);
/**
 * @swagger
 * /matchings/request/my:
 *   get:
 *     summary: Get all matching requests of the user
 *     tags:
 *       - Matching
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
 *           application/json:
 *             schema:
 *               type: object 
 *               properties:
 *                 message:
 *                   type: string 
 */
router.get('/request/my', authenticate, matchingController.getMyRequest);
/**
 * @swagger
 * /matchings/request/my:
 *   delete:
 *     summary: Delete all matching requests of the user
 *     tags:
 *       - Matching
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
 * /matchings/{id}:
 *   get:
 *     summary: Get a matching by ID
 *     tags:
 *       - Test
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Matching not found
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
router.get('/matching/:id', matchingController.getMatching);
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object 
 *               properties:
 *                 message:
 *                   type: string 
 */
router.get('/matching/list', authenticate, matchingController.getAllMatchings);
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object 
 *               properties:
 *                 message:
 *                   type: string 
 */
router.get('/matching/my', authenticate, matchingController.getMyMatching);
/**
 * @swagger
 * /matchings/my:
 *   delete:
 *     summary: Delete all matchings of the user
 *     tags:
 *       - Matching
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Matchings of the user deleted successfully
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
router.delete('/matching/my', authenticate, matchingController.deleteMyMatching);
/**
 * @swagger
 * /matchings/{id}/confirm:
 *   put:
 *     summary: Confirm a matching by ID
 *     tags:
 *       - Matching
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Matching not found
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
router.post('/:id/confirm', authenticate, matchingController.confirmMatching);

module.exports = router;