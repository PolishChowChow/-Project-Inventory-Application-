const express = require('express');
const passport = require('passport');
const router = express.Router();
const { loginStrategy } = require('../strategies/loginStrategy');
const ensureAuthenticated = require('../controllers/authController');
const { get_all_stats } = require('../controllers/mainController');
const { get_all_parts } = require('../controllers/partsController');
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



router.post('/login',passport.authenticate('local', {
  successRedirect: "/panel",
  failureRedirect: "/panel/login"
}))
router.get('/logout', (req, res, next) => {
  req.logout(function(err){
    if(err){
      return next(err)
    }
    res.redirect("/panel")
  })
})
router.get('/login', (req, res, next) => {
  res.render("login")
})

router.use(ensureAuthenticated)

router.get('/', get_all_stats);
router.get('/parts', get_all_parts, (req, res, next) => {
  res.render("partsPanel",{
    parts: req.parts
  })
});



module.exports = router;
