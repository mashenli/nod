var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');


router.get('/users', function(req, res, next) {
      //   var myDate = new Date();
      //   myDate.getDate();             
      //   var mytime=myDate.toLocaleTimeString();    
      // var moviename = req.params.id.split('=')[1];
      // var querytring = "select * from played where moviename='" + moviename +"' and time='" + myDate.toLocaleDateString() +"'and playtime > '" + mytime +"'";
      // var data2=[];

       var myDate = new Date();
       myDate.getDate();             
       var mytime=myDate.toLocaleTimeString();  
      console.log(myDate.toLocaleDateString(),mytime);


  phone = req.session.phone;

        var query = "select s.*,p.* from seat s,played p where s.name='" + phone +"' and s.playid=p.playid and p.time='" + myDate.toLocaleDateString() +"'and p.playtime > '" + mytime +"'" ;
        db.query(query,function(err,rows){
          if (err) {
                res.send("202");
            } else {
              
               res.json(rows);
            }
          });
  
      

});






/* GET users listing. */
router.post('/users', function(req, res, next) {

        db.query('SELECT * FROM movies', function(err, rows){
          if (err) {
                res.send("读取失败");
           }else {
             data1 = [];
              data1 = rows;
      
              
          }
        });






var queryString = "select * from user where phone='" + req.body.phone +"'";

  db.query(queryString, function(err, rows){
  	if (err) {
  		res.send(err);
  	}else {
      if (rows.length == 0){
        res.send("用户名不存在");
      }else if (rows[0].password == req.body.password) {
        req.session.name=rows[0].name;
        req.session.phone=rows[0].phone;
    
        res.render('index',{name :req.session.name,test:"退出",data:"#1",data1});
        console.log("登录成功"); 
        console.log(req.session.name); //登录成功，返回用户的全部信息
      }else {
        res.send('密码错误');
        console.log(req.body.password);
      }
  	}
  })

});

module.exports = router;
