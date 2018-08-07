const express        = require("express");
const router         = express.Router();
// User model
const User           = require("../models/user");
// Bcrypt to encrypt passwords
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;
const passport       = require("passport");
//cloudinary
const uploadCloud    = require('../config/cloudinary.js');
//ensure logg
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

//login

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect   : "/",
    failureRedirect   : "/login",
    failureFlash      : false,
    passReqToCallback : false
  })
);

// router.post('/login', passport.authenticate('local-login', {
//   successRedirect : '/',
//   failureRedirect : '/login',
//   failureFlash : true,
//   passReqToCallback: false
//   }));
    

//signup
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});


router.post("/signup", uploadCloud,(req, res, next) => { 
  const username = req.body.username;
  const password = req.body.password;
  const {firstName, lastName, email, birth, gender} = req.body;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    reject();
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) throw new Error("The username already exists");
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password:  hashPass,
        firstName,
        lastName,
        email,
        birth,
        gender
        // imgPath: req.file.url,
        // imgName: req.file.originalname
      });
      return newUser.save();
    })
    .then(newUser => {
      res.redirect("/");
      console.log('ya triunfaste CHINGON')
    })
    .catch(e => {
      res.render("auth/signup", { message: e.message });
      console.log('no guardaste ni madres PUTO');
    });
});

router.get("/private-page", ensureLoggedIn(), (req, res) => {
  res.render("auth/private", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// router.get("/newFoodStand",ensureLoggedIn, (req, res) => {
//   res.render("ironplace/newFoodStand", { user: req.user });
// }); //end render



module.exports = router;



// router.get('/signup', ensureLoggedOut(), (req, res) => {
//   res.render('auth/signup', { message: req.flash('error')});
// });

// router.post('/signup', [ensureLoggedOut(), uploadCloud.single('profile'), passport.authenticate('local-signup', {
//   successRedirect : '/',
//   failureRedirect : '/signup',
//   failureFlash : true
// })]);




