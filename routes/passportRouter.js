const express        = require("express");
const router         = express.Router();
// User model
const User           = require("../models/user");
// Bcrypt to encrypt passwords
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
const passport      = require("passport");
//cloudinary
const uploadCloud= require('../config/cloudinary.js');


router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup",  uploadCloud.single('profile'),(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const {firstName, lastName, emial, birth, gender, photo_url} = req.body;

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
        password: hashPass,
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         birth: req.body.birth,
         gender: req.body.gender,
         photo_url: req.body.photo_url
      });
      return newUser.save();
    })
    .then(newUser => {
      res.redirect("/");
      console.log('ya triunfaste')
    })
    .catch(e => {
      res.render("auth/signup", { message: e.message });
      console.log('no guardaste ni madres');
    });
});


router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: false,
    passReqToCallback: false
  })
);
router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth/private", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;