const express = require('express');
const router  = express.Router();
const FoodStand = require("../models/FoodStand");
/* GET home page */
router.get("/", (req, res, next) => {
  FoodStand.find().populate('postedBy')
    .then(food => {
      res.render("index",{food});
      //res.json(food);
    })
    .catch(error => {
      console.log(error);
    });

  if(req.user){
    let user = req.user;
    
    res.render("index", {user});
  }else{
    res.render("index");
  }
 
});

module.exports = router;
