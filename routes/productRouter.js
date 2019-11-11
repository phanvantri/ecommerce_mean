var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product');

/* GET ALL CATEGORY */
router.get('/', function(req, res, next) {
  console.log("Da vao day");
  Product.find(function (err, product) {
      if (err) return next(err);
      res.json(product);
      console.log(product);
    });
  });

  module.exports = router;