const express = require("express");
const router = express.Router();
const FoodStand = require("../models/FoodStand");
const User = require("../models/user");
const uploadCloud = require("../config/cloudinary");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

//revisa la autenticacion del user
function isLoggedIn(req, res, next) {
  if (req.isAuthenticaded()) return next();
  return res.redirect("/login?next=/profile");
}

//nuevo lugar



router.get("/newFoodStand", (req, res) => {
  res.render("ironplace/newFoodStand", { user: req.user });
}); //end render

router.post("/newFoodStand",uploadCloud.single('photo'), (req, res, next) => {
  if (req.file) {
    req.body.photoURL = req.file.url;
    req.body.aportedBy = req.user._id;

    FoodStand.create(req.body)
      .then(foodStand =>
        User.findByIdAndUpdate(req.user._id, {
          $push: { foodstand: foodstand._id }
        })
      )
      .then(res.redirect("/private-page"))
      .catch(error => {
        console.log(error);
      });
  } else {
    req.body.aportedBy;
    FoodStand.create(req.body)
      .then(foodStand =>
        User.findByIdAndUpdate(req.user._id, {
          $push: { foodstand: foodstand._id }
        })
      )
      .then(res.redirect("/private-page"))
      .catch(error => {
        console.log(error);
      });
  }
}); //end post

router.get("/foodStand", (req, res) => {
  FoodStand.find()
    .then(food => {
      res.render("ironplace/foodStand", { foodStand });
    })
    .catch(error => {
      console.log(error);
    });
}); //end render food

router.get("foodStand/:id", (res, req) => {
  const user = req.user;
  console.log(user);
  if (user === undefined) {
    FoodStand.findById(req.params.id).then(foods => {
      res.render("ironplace/foodDetails", { foods });
    });
  } else {
    FoodStand.findById(req.params.id)
      .populate("aportedBy")
      .then(foodStand => {
        let ctx = { foodStand };
        if (user._id.toString() === foodStand.aportedBy._id.toString())
          ctx = { foodStand, user };

        res.render("ironplace/foodDetails", ctx);
      })
      .catch(error => {
        console.log(error);
      });
  }
}); //end get


router.get('/removeStand/:id', (req, res) => {
    Promise.all([
    FoodStand.findByIdAndRemove(req.params.id),
    User.findOneAndUpdate(
        {foodstand: req.params.id},
        {$pull: {foodstand: req.params.id} },
        {new: true}
    )
    ])
    .then(results => {
    res.render("/foodStand")
    })
    .catch(error => {
        console.log(error);
    })
});
module.exports = router;
