var express = require('express');
var router = express.Router();
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');





router.get('/bossindex/userlist', function(req, res) {

 if(req.session.username!=null){
        var name=req.session.username;
        db.query('SELECT * FROM admin', function(err, rows){
    	if (err) {
      		res.send("读取失败");
    	}else {
		var data = [];
    	data = rows;
 		res.render('userlist', {title:name,data});   
    	}
  		});
        console.log(name);
    }else{
        res.redirect('../login',302);
    }
});

router.post('/bossindex/userlist', function(req, res) {
     console.log(req.body.td);
     var queryString= "delete from movies where moviename='" + req.body.td +"'";
    db.query(queryString, function(err, rows){
          if (err) {
                
               
           }else {
           console.log("删除成功");
             res.json({success:1});
          }
        });
 



});
        module.exports = router;