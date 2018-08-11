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

//nuevo lugar (vista)

router.get("/newFoodStand", (req, res) => {
  res.render("ironplace/newFoodStand", { user: req.user });
}); //end render

//nuevo lugar (post)
router.post("/newFoodStand", uploadCloud.single('photo'), (req, res, next) => {

  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const { name, descritpion, category, address, longitude, latitude } = req.body;
  let postedBy = req.user.id;
  let location = { type: 'Point', coordinates: [longitude, latitude] };

  FoodStand.findOne({ name }, "name", (err, place) => {
    if (place !== null) {
      res.render('/newFoodStand', { message: "Ya existe weee" });
      return;
    }
  });

  const newFoodStand = new FoodStand({
    postedBy: postedBy,
    name: name,
    descritpion,
    category,
    location: location,
    address,
    imgName,
    imgPath
  });

  newFoodStand.save()
    .then(() => {
      res.redirect('/')
    })
    .catch(e => {
      console.log(e)
    })

});
//end post



router.get("/foodStand", (req, res) => {
  FoodStand.find()
    .then(food => {
      res.render("ironplace/foodStand", { food});
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
      { foodstand: req.params.id },
      { $pull: { foodstand: req.params.id } },
      { new: true }
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
