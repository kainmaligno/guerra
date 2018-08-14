const express = require('express');
const router  = express.Router();
const FoodStand = require("../models/FoodStand");
/* GET home page */
router.get("/", async  (req, res, next) => {
  
  const Stand = await FoodStand.find()
res.render('index', { user: req.user, Stand })

 
});

router.get('/contact',(req, res) => {
  let user = req.user;
  res.render('contact',{user});
})
module.exports = router;
