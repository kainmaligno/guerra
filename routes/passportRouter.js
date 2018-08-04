const express        = require("express");
const router         = express.Router();
// User model
const User           = require("../models/user");
// Bcrypt to encrypt passwords
const bcrypt         = require("bcryptjs");
const bcryptSalt     = 10;
const ensureLogin = require("connect-ensure-login");
const passport      = require("passport");


router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

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
        password: hashPass
      });
      return newUser.save();
    })
    .then(newUser => {
      res.redirect("/");
    })
    .catch(e => {
      res.render("passport/signup", { message: e.message });
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