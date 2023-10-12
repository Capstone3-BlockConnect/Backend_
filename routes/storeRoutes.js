const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { authenticate } = require('../middlewares/authenticate');



router.post('/register', authenticate, storeController.register);
router.get('/list', authenticate, storeController.getAllStores);
router.get('/:id', authenticate, storeController.getStore);
router.put('/:id', authenticate, storeController.modifyStore);
router.delete('/:id', authenticate, storeController.deleteStore);

module.exports = router;