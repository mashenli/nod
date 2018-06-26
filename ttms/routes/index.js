var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');
/* GET home page. */
/*电影主页*/
router.get('/', function(req, res, next) {
  
       
        db.query('SELECT * FROM movies', function(err, rows){
      		if (err) {
          			res.send("读取失败");
         	 }else {
    				var data1 = [];
      				data1 = rows;
    				res.render('index', {name:req.session.username,test:'登录',data:"#myModal",data1}); 
    				
      		}
        });

});



router.post('/', function(req, res, next) {
    // console.log(req.body.data);
    var queryString= "delete from seat where seatid='" + req.body.data +"'";
    db.query(queryString, function(err, rows){
          if (err) {
                res.send("读取失败");
                res.json({error:2});
           }else {
           console.log("成功");
             res.json({success:1});
          }
        });
       
   

});








/*选座页面 */
router.get('/posts/:moviename/:key/:item',require("./posts"));
router.post('/posts/:moviename/:key/:item',require("./posts"));
/*电影信息页面 */







router.get('/movie/:id',require("./movie"));
router.post('/movie/:id',require("./movie"));
/*后台系统登录界面*/
router.get('/login',require("./login"));
router.post('/login',require("./login"));
/*经理页面*/

router.get('/bossindex',require("./bossindex"));
router.post('/bossindex',require("./bossindex"));

router.get('/bossindex/useradd',require("./bossadd"));
router.post('/bossindex/useradd',require("./bossadd"));

router.get('/bossindex/userlist',require("./userlist"));
router.post('/bossindex/userlist',require("./userlist"));

router.get('/adindex',require("./adindex"));
router.post('/adindex',require("./adindex"));



router.get('/adindex/movielist',require("./movielist"));
router.post('/adindex/movielist',require("./movielist"));


router.get('/adindex/movieadd',require("./movieadd"));
router.post('/adindex/movieadd',require("./movieadd"));


router.get('/adindex/playadd',require("./movieadd"));
router.post('/adindex/playadd',require("./movieadd"));
router.get('/adindex/playlist',require("./movieadd"));
router.get('/adindex/playmovie',require("./movieadd"));
router.post('/adindex/playmovie',require("./movieadd"));
router.get('/adindex/played',require("./movieadd"));
router.post('/adindex/played',require("./movieadd"));



router.get('/user',require("./user"));
router.post('/user',require("./user"));


router.post('/users',require("./users"));
router.get('/users',require("./users"));


router.get('/bossindex/bill',require("./bossadd"));
router.post('/bossindex/bill',require("./bossadd"));
module.exports = router;
