const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  //Check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    //create user
    user = new User(req.body);
    //Password hashing
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    //save user
    await user.save();
    //Create jwt
    const payload = {
      user: { id: user.id },
    };
    //Sign the jwt
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600, //one hour
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      },
    );
    // message confirmation
    console.log('User created successfully');
  } catch (error) {
    console.log(error);
    res.status(400).send('Something went wrong');
  }
};
