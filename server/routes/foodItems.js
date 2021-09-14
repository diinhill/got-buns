const foodItemsModel = require('../model/foodItemsModel')


const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send({ msg: 'Test route.' });
});
module.exports = router;

router.get('/all', (req, res) => {
    foodItemsModel.find({}, function(err, foodItems ) {
      if (err) {
        res.send(err);
      } else {
        res.send(foodItems);
      }
    });
  });