const express = require('express');
const router = express.Router();
const storeController = require('../controllers/matchingController');
const { authenticate } = require('../middlewares/authenticate');

router.post('/request', authenticate, matchingController.request);
router.delete('/request/:id', authenticate, matchingController.deleteRequest);
router.get('/request/list', authenticate, matchingController.getRequestList);

router.get('/matching/:id', authenticate, matchingController.getMatching);
router.post('/confirm/:id', authenticate, matchingController.matching);

module.exports = router;