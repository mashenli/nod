var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');






router.get('/adindex/movieadd', function(req, res, next) {


 if(req.session.username!=null){
        var name=req.session.username;
      res.render('movieadd', {title: name});
        console.log(name);
    }else{
         res.redirect('../login',302);
    }


});



router.post('/adindex/movieadd', function(req, res) {
  var name=req.session.username;

	  var queryString = "select * from movies where moviename='" + req.body.moviename +"'";
  	db.query(queryString, function(err, rows){
    	if (err) {
      	res.send("1");
    	 }
      else {
      	     if (rows.length != 0) {
                 
                  res.send("电影已存在");
                }
             else
                {
                queryString = "insert into movies(moviename,moviestyle,movieimage,movieintroduction,movielenth,movietime) values('" + req.body.moviename + "', '" + req.body.moviestyle+ "','" + req.body.movieimage + "','" + req.body.movieintroduction + "','" + req.body.movielenth + "','" + req.body.movietime + "')";

               db.query(queryString, function(err, rows){
                if (err) {
                      res.send(err);
                }else {
                    db.query('SELECT * FROM movies', function(err, rows){
                    if (err) {
                        res.send("读取失败");
                          }
                    else {
                        var data = [];
                        data = rows;
                        res.render('movielist', {title:name,data});
                        }
                    });
     
                }
                });
                }
        }
  });
      });
  	
 router.get('/adindex/playadd', function(req, res, next) {    

  if(req.session.username!=null){
        var name=req.session.username;
      res.render('playadd', {title: name});
    
    }else{
         res.redirect('../login',302);
    }
});



  router.post('/adindex/playadd', function(req, res, next) {   
var name=req.session.username;

 var queryString = "select * from play where playname='" + req.body.playname +"'";
    db.query(queryString, function(err, rows){
      if (err) {
        res.send("1");
       }
      else {
             if (rows.length != 0) {
                 
                  res.send("演出厅已存在");
                }
             else
                {
                queryString = "insert into play(playname,playrow,playcol) values('" + req.body.playname + "','" + req.body.playrow + "','" + req.body.playcol + "')";

               db.query(queryString, function(err, rows){
                if (err) {
                      res.send(err);
                }else {
                    db.query('SELECT * FROM play', function(err, rows){
                    if (err) {
                        res.send("读取失败");
                          }
                    else {
                        var data = [];
                        data = rows;
                       console.log("添加成功！");
                       res.render('playlist',{title:name,data});
                        }
                    });
     
                }
                });
                }
        }
  });
 

});



 router.get('/adindex/playlist', function(req, res, next) {   
  if(req.session.username!=null){
        var name=req.session.username;
      




        db.query('SELECT * FROM play ', function(err, rows){
      if (err) {
          res.send("读取失败");
      }else {
    var data = [];
      data = rows;
    
    res.render('playlist', {title:name,data});   
      }
      });
        
    }else{
        res.redirect('../login',302);
    }
});


router.get('/adindex/playmovie', function(req, res, next) {   
  if(req.session.username!=null){
        var name=req.session.username;
         db.query('SELECT * FROM movies', function(err, rows){
      if (err) {
          res.send("读取失败");
      }else {
         data1=[];
        data1=rows;
      }
    });


        db.query('SELECT * FROM play', function(err, rows){
      if (err) {
          res.send("读取失败");
      }else {
    var data = [];
      data = rows;
    res.render('playmovie', {title:name,data,data1});   
      }
      });
        console.log(name);
    }else{
        res.redirect('../login',302);
    }
});


router.post('/adindex/playmovie', function(req, res, next) {   
        var name=req.session.username;
        var time = req.body.time; 
        var playname = req.body.playname;
        var playtime = req.body.playtime;
        var s=[];
        var c="";

        s=playtime.split(':');
  
     s[0]= parseInt(s[0])+2;
        for(var i=0;i<=2;i++)
        {
         
          if(i!=2)
          {
          c+=s[i]+":";

          }
          else{
            c+=s[i];
          }
        }
        var query ="select * from played where  time='"+time+"' and playname='"+ playname+"' and( playtime between '"+ playtime+"' and '"+ c +" ' )";
        db.query(query,function(err,rows){
          if(err){
            console.log("1");
          }
          else{
            if(rows.length===0){
               queryString = "insert into played(playname,moviename,playtime,price,time,type) values('" + req.body.playname + "','" + req.body.moviename + "','" + req.body.playtime + "','" + req.body.price + "','" + req.body.time + "','1')";
        db.query(queryString, function(err, rows){
                if (err) {
                      res.send(err);
                }else {
                    db.query('SELECT * FROM played', function(err, rows){
                    if (err) {
                        res.send("读取失败");
                          }
                    else {
                        var data = [];
                        data = rows;
                       console.log("添加成功！");
                    res.render('played',{title:name,data});
                        }
                    });
     
                }
                });

            }
            else{
              res.send("该时间段内已存在计划！");
            }
          }
        });

       
      
 

});




router.get('/adindex/played', function(req, res, next) {   
  if(req.session.username!=null){
        var name=req.session.username;
        db.query('SELECT * FROM played where type=1', function(err, rows){
      if (err) {
          res.send("读取失败");
      }else {
    var data = [];
      data = rows;
    res.render('played', {title:name,data});   
      }
      });
        console.log(name);
    }else{
        res.redirect('../login',302);
    }
});



router.post('/adindex/played', function(req, res, next) {  


    var queryString="SELECT * FROM played where playname='"+ req.body.td+"' and playtime='"+ req.body.pt+"'";
    db.query( queryString, function(err, rows){
    if (err) {
        console.log("1");
      }else {
        var id = rows[0].playid;
        var queryString="update  played set type='0' where playid='"+ id+"' ";
         db.query( queryString, function(err, rows){
            if (err) {
        console.log("2");
      }else {

res.json({success:1});
      }
         });
        }
      });


    
});



 







        module.exports = router;