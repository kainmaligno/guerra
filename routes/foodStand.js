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
      res.render('/newFoodStand', { message: "Ya existe usuario" });
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

router.get("/foodStand",  (req, res) => {
  FoodStand.find().populate('postedBy')
    .then(food => {
      
      res.render("ironplace/foodStand", {food, user: req.user});
      //console.log(food)
    })
    .catch(error => {
      console.log(error);
    });
}); //end render food


router.get('/foodstand/:id', (req, res) => {
  const user = req.user;
  const id = req.params.id;
  FoodStand.findById({_id: req.params.id} )
  .populate("postedBy")
  .then( post => {
    res.render('ironplace/foodDetails', {post, user})
  })
      });
      
router.get('/removeStand/:id', (req, res) => {
  Promise.all([
    FoodStand.findByIdAndRemove({_id: req.params.id}),
    User.findOneAndUpdate(
      {foodStand: req.params.id},
      {$pull: {foodStand: req.params.id}},
      {new: true}
    )
  ])
  .then(results => {
    res.redirect("/foodStands");
  })
  .catch(e => {
    console.log(e);
  });
});

module.exports = router;
