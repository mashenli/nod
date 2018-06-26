var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');



router.post('/user', function(req, res) {
//注册
	

console.log(req.body.new);


console.log(req.body.phone);
console.log(req.body.password);
 var queryString = "select * from user where phone='" + req.body.phone +"'";
  		db.query(queryString, function(err, rows){
    	if (err) {
      	res.send("404");
    	}else {
      	   if (rows.length != 0) {
                res.send("用户名已存在，注册失败");
            }
    
            else{
  	             queryString = "insert into user(phone,password,name) values('" + req.body.phone + "','" + req.body.password + "','" + req.body.password + "')";

                   db.query(queryString, function(err, rows){
                   if (err) {
                         res.send(err);
                   }else {
                          res.send("成功");
                   }
                 });
               }
             }
        });

});
        module.exports = router;