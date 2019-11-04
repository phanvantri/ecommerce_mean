var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');

//Get All User
router.get('/user',function(req,res,next) {
    console.log('Da vao day');
    User.find(function(err, users){
        if(err)
            return next(err);
        res.json(users);
    })
});




