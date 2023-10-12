const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticate');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/list', userController.getAllUsers);
router.get('/:id', authenticate, userController.getProfile);
router.put('/:id', authenticate, userController.modifyProfile);
router.delete('/:id', authenticate, userController.deleteUser);


module.exports = router;

