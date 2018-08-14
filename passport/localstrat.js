const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "local-login",
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      // console.log(user);
      // console.log("username"+username);
      // console.log("pass"+password);
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  })
);
