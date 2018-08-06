var express = require("express");

var router = express.Router();
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.groceryTrip.findAll({
    attributes: ["id","grocery_store_name","trip_date","item_count","tax"],
    raw: true
  })
});

router.post("/api/groceryTrip", function(req, res) {
  db.groceryTrip.create({
    grocery_store_name: req.body.grocery_store_name,
    trip_date: req.body.trip_date,
    item_count: req.body.item_count,
    tax: req.body.tax
  }).then(function(data) {
    res.json({ id: data.insertId });
    // res.redirect("/");
  });
});

// router.put("/api/burgers/:id", function(req, res) {
//   db.Burger.update({devoured:req.body.devoured},
//   {
//     where: {
//       id: req.params.id
//     }
//   }).then(function(data) {
//     console.log(data);
//     res.json("/");
//   });
// });

// Export routes for server.js to use.
module.exports = router;
