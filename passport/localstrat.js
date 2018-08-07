const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "local-login",
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      console.log(user);
      console.log("username"+username);
      console.log("pass"+password);
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

// passport.use(
//   "local-signup",
//   new LocalStrategy(
//     { passReqToCallback: true },
//     (req, username, password, next) => {
//       // To avoid race conditions
//       process.nextTick(() => {
//         if (username === "" || password === "") {
//               res.render("auth/signup", { message: "Indicate username and password" });
//               reject();
//             }
//         User.findOne(
//           {
//             username: username
//           },
//           (err, user) => {
//             if (err) {
//               return next(err);
//             }

//             if (user) {
//               return next(null, false);
//             } else {
//               // Destructure the body
//               const { username, email, password } = req.body;
//               console.log(req.file);
//               const hashPass = bcrypt.hashSync(
//                 password,
//                 bcrypt.genSaltSync(8),
//                 null
//               );
//               const newUser = new User({
//                 username,
//                 email,
//                 password: hashPass
//                 // profilePic: {
//                 //   url: req.file.url,
//                 //   name: req.file.originalname
//                 // }
//               });

//               newUser.save(err => {
//                 if (err) {
//                   next(null, false, { message: newUser.errors });
//                 }
//                 return next(null, newUser);
//               });
//             }
//           }
//         );
//       });
//     }
//   )
// );

