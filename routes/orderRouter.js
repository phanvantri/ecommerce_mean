var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../models/Order');
const checkAuth =require("../config/check-auth");

router.get('/',checkAuth, function(req, res, next) {
  
    Order.find(function (err, order) {
      if (err) return next(err);
      res.json(order);
     
    });
  });
  /* GET SINGLE BOOK BY ID */
router.get('/:id', checkAuth,function(req, res, next) {
    Order.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  
  });
});

  module.exports = router;