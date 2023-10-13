const express = require('express');
const router = express.Router();
const matchingController = require('../controllers/matchingController');
const { authenticate } = require('../middlewares/authenticate');

router.post('/request', authenticate, matchingController.request);
router.delete('/request/:id', authenticate, matchingController.deleteRequest);
router.get('/request/list', authenticate, matchingController.getAllRequests);
router.get('/request/:id', authenticate, matchingController.getRequest);
router.get('/request/my', authenticate, matchingController.getMyRequest);

router.get('/matching/:id', authenticate, matchingController.getMatching);
router.get('/matching/list', authenticate, matchingController.getAllMatchings);
router.get('/matching/my', authenticate, matchingController.getMyMatching);
router.post('/confirm/:id', authenticate, matchingController.confirmMatching);

module.exports = router;