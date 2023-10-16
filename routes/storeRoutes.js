const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { authenticate } = require('../middlewares/authenticate');


/**
 * @swagger
 * /stores/register:
 *   post:
 *     summary: Register a new store
 *     tags:
 *       - Test
 *     requestBody:
 *       description: Store information
 *       required: true
 *       content:
 *         application/xxx-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               storeName:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: object
 *               businessHours:
 *                 type: object
 *               phoneNumber:
 *                 type: string
 *               storeDescription:
 *                 type: string
 *               menu:
 *                 type: array
 *               photos:
 *                 type: array
 *               category:
 *                 type: string
 *               genre:
 *                 type: string    
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeName:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: object
 *               businessHours:
 *                 type: object
 *               phoneNumber:
 *                 type: string
 *               storeDescription:
 *                 type: string
 *               menu:
 *                 type: array
 *               photos:
 *                 type: array
 *               category:
 *                 type: string
 *               genre:
 *                 type: string    
 *     responses:
 *       201:
 *         description: Successfully registered the store
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                 store:
 *                   type: object
 *       400:
 *         description: Bad request - Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       409:
 *         description: Conflict - Store already exists
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
router.post('/register', storeController.register);
/**
 * @swagger
 * /stores/list:
 *   get:
 *     summary: Get a list of all stores
 *     tags:
 *       - Store
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of stores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stores:
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
router.get('/list', storeController.getAllStores);
/**
 * @swagger
 * /stores/one/{id}:
 *   get:
 *     summary: Get a store by ID
 *     tags:
 *       - Store
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the store to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the store
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 store:
 *                   type: object
 *       400:
 *         description: Invalid Store ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Store not found
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
router.get('/one/:id', storeController.getStore);
/**
 * @swagger
 * /stores/one/{id}:
 *   put:
 *     summary: Modify a store by ID
 *     tags:
 *       - Test
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the store to modify
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       description: Store data to modify
 *       content:
 *         application/xxx-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               storeName:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: object
 *               businessHours:
 *                 type: object
 *               phoneNumber:
 *                 type: string
 *               storeDescription:
 *                 type: string
 *               menu:
 *                 type: array
 *                 items:
 *                   type: object
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *               genre:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               storeName:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: object
 *               businessHours:
 *                 type: object
 *               phoneNumber:
 *                 type: string
 *               storeDescription:
 *                 type: string
 *               menu:
 *                 type: array
 *                 items:
 *                   type: object
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *               genre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully modified the store
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid Store ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Store not found
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
router.put('/one/:id', storeController.modifyStore);
/**
 * @swagger
 * /stores/one/{id}:
 *   delete:
 *     summary: Delete a store by ID
 *     tags:
 *       - Test
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the store to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the store
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid Store ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Store not found
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
router.delete('/one/:id',storeController.deleteStore);

module.exports = router;