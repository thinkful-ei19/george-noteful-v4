'use strict';



const express = require('express');
const passport = require('passport');
const router = express.Router();
const localAuth = passport.authenticate('local', {session:false, failWithError: true});
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('../config');



// router.post('/login', localAuth, function (req, res) {
//   return res.json(req.user);
// });

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.post('/login', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({ authToken });
});

function createAuthToken (user) {
  return jwt.sign({ user }, JWT_SECRET, {
    subject: user.username,
    expiresIn: JWT_EXPIRY
  });
}
module.exports = router;
