// Routes to create users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
//Create user
router.post(
  '/',
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email is required'),
    check('password')
      .isLength({
        min: 6,
      })
      .withMessage('Password must be at least 6 characters'),
  ],
  userController.createUser,
);

module.exports = router;
