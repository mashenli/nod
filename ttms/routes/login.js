var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');


router.get('/login', function(req, res,next) {

	 

 res.render('login', {}); 

        

});



router.post('/login', function(req, res, next) {

  if(req.body.boss){

	
  var queryString = "select * from boss where bossid='" + req.body.username +"'";

  db.query(queryString, function(err, rows){
  	if (err) {
  		res.send(err);
  	}else {
      if (rows.length == 0){
        res.send("用户名不存在");
      }else if (rows[0].bosspassword == req.body.password) {
        req.session.username=req.body.username;
    
        res.redirect('bossindex');
        console.log(req.session);  //登录成功，返回用户的全部信息
      }else {
        res.send('密码错误');
      }
  	}
  })}



  else{
    var queryString = "select * from admin where id='" + req.body.username +"'";

  db.query(queryString, function(err, rows){
    if (err) {
      res.send(err);
    }else {
      if (rows.length == 0){
        res.send("用户名不存在");
      }else if (rows[0].password == req.body.password) {
        req.session.username=req.body.username;;
        res.redirect('adindex', 302);  //登录成功，返回用户的全部信息
      }else {
        res.send('密码错误');
      }
    }
  })}

 
});
        module.exports = router;