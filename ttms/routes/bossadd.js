var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');





router.get('/bossindex/useradd', function(req, res) {

 if(req.session.username!=null){
        var name=req.session.username;
      res.render('bossadd', {title: name});
        console.log(name);
    }else{
         res.redirect('../login',302);
    }
    
});

router.post('/bossindex/useradd', function(req, res) {

	  var queryString = "select * from admin where id='" + req.body.userId +"'";
  		db.query(queryString, function(err, rows){
    	if (err) {
      	res.send("404");
    	}else {
      	   if (rows.length != 0) {
                res.send("用户名已存在，注册失败");
            }
    
            else{
  	             queryString = "insert into admin(id,name, password,sex,age,photo) values('" + req.body.userId + "', '" + req.body.userName + "','" + req.body.userpassword + "','" + req.body.sex + "','" + req.body.userAge + "','" + req.body.userphone + "')";

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


router.get('/bossindex/bill', function(req, res) {

 if(req.session.username!=null){
        var name=req.session.username;
      res.render('bill', {title: name});
        console.log(name);
    }else{
         res.redirect('../login',302);
    }
    
});



router.post('/bossindex/bill', function(req, res) {

  var data=req.body.data;



   var queryString = "select pd.*,s.* from played pd,seat s where time='" + data +"'and pd.playid=s.playid";
      db.query(queryString, function(err, rows){
      if (err) {
        res.send("404");
      }else {
        res.json(rows);
      }
    
});
    });
        module.exports = router;