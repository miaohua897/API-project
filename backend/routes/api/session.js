
// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// backend/routes/api/session.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

// backend/routes/api/session.js
// ...
// backend/routes/api/session.js
// ...

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];


  // backend/routes/api/session.js
// ...

// Log in
router.post(
    '/',
    validateLogin,
    // requireAuth,
    async (req, res,next) => {
      // const { user } = req;
      const { credential, password } = req.body;

     
        const user = await User.unscoped().findOne({
          where: {
            [Op.or]: {
              username: credential,
              email: credential
            }
          }
        });
    
        if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
          const err = new Error('Login failed');
          // err.status = 401;
          err.title = 'Login failed';
          // err.errors = { credential: 'The provided credentials were invalid.' };
          // err.errors={
          //   "message": "Invalid credentials"
          // };
          // return next(err);
          res.status(401);
          return res.json(
            {
              "message": "Invalid credentials"
            }
          )
        }
    
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName
        };
    
        await setTokenCookie(res, safeUser);
     
        res.status(200);
        return res.json({
          user: safeUser
        });
 
     
    }
  );
// backend/routes/api/session.js
// ...

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );
  
  // ...
  // backend/routes/api/session.js
// ...

// Restore session user
router.get(
    '/',
    (req, res) => {
      const { user } = req;
      console.log(user);
      if (user) {
        const safeUser = {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName
        };
        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );
  
  // ...

module.exports = router;



