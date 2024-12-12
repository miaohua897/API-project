// backend/routes/api/users.js


const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// backend/routes/api/users.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// backend/routes/api/users.js
// ...
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('userName')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('userName')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];
// ...
// backend/routes/api/users.js
// ...

// backend/routes/api/users.js
// ...

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { email, password, userName,firstName,lastName } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email,userName,firstName, lastName, hashedPassword });
  
      const safeUser = {
        id: user.id,
        email: user.email,
        userName: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;


