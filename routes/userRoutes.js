const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticate');


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/list', userController.getAllUsers);
router.get('/:id', userController.getProfileByUserId);
router.put('/', authenticate, userController.modifyProfile);
router.delete('/', authenticate, userController.deleteUser);


module.exports = router;

