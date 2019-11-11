var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = require('../models/Category');

/* GET ALL CATEGORY */
router.get('/', function(req, res, next) {
  console.log("Da vao day");
  Category.find(function (err, category) {
      if (err) return next(err);
      res.json(category);
      console.log(category);
    });
  });

  module.exports = router;