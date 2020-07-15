// Auth
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
//Auth user
router.post('/', authController.authUser);
router.get('/', auth, authController.authedUser);
module.exports = router;
