var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');



router.get('/adindex/movielist', function(req, res) {

if(req.session.username!=null){
        var name=req.session.username;
        db.query('SELECT * FROM movies', function(err, rows){
      if (err) {
          res.send("读取失败");
      }else {
    var data = [];
      data = rows;
    res.render('movielist', {title:name,data});   
      }
      });
        console.log(name);
    }else{
        res.redirect('../login',302);
    }
});


        module.exports = router;