const express = require('express');
const passport = require('passport');
const router = express.Router();
const { loginStrategy } = require('../strategies/loginStrategy');
const ensureAuthenticated = require('../controllers/authController');
passport.use(loginStrategy)
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


router.get('/', ensureAuthenticated, (req, res, next) => {
  res.render("panel")
});
router.get('/login', (req, res, next) => {
    res.render("login")
})
router.post('/login',passport.authenticate('local', {
  successRedirect: "/panel",
  failureRedirect: "/panel/login"
}))
router.post('/logout', (req, res, next) => {
  req.logout(function(err){
    if(err){
      return next(err)
    }
    res.redirect("/panel")
  })
})
module.exports = router;
