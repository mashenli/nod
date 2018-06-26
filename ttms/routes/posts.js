var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');


router.get('/posts/:moviename/:key/:item', function(req, res) {
		if(req.session.name!=null){
			var playname = req.params.key.split('=')[1];

			var playtime = req.params.item.split('=')[1];

			
      phone = req.session.phone;
			//渲染座位 play
			var querytring = "select * from play where playname='" + playname +"'";
			var play=[];
  			db.query(querytring, function(err,rows){	 
      		if(err){
          			res.send("读取失败");         			
         	 }else{        	 		
      				play = rows; 
      				//取出演出厅id
      				var query = "select * from played where playname='" + playname +"' and playtime='" + playtime +"'";
  					db.query(query, function(err, rows){
      				if (err) {
          					res.send("读取失败");
         	 		}else {
         	 			//取出卖出的票
         	 				var moviename = rows[0].moviename;
         	 				var price = rows[0].price;
         	 				var playid = rows[0].playid
         	 				var queryString = "select * from seat where playid='" + rows[0].playid +"'";
         	 				db.query(queryString, function(err, rows){
         	 					if (err) {
           								res.send("读取失败");
          	 					}else {
     									var data1 = [];
       									data1 = rows;

     				 					res.render('posts', {name:req.session.name,test:"退出",data:"#1",play,data1,price,moviename,playtime,playid});

       							}
         					});
     				}			
    			 	});

      				
      			}
        	});
  			
  			//读取已经卖出的票
  			
  		}
     else{
          res.redirect('../',302);
     		}
         	 	});
  

router.post('/posts/:moviename/:key/:item', function(req, res) {

	var a="";
	var c=[];
	var d=[];
  var z=[];
	var e="";

	a = req.body.selected;
	e = req.body.playid;

var onlyNumpluse = function(strArg){
    //用空格将字符串截成数组
    var strArr = strArg.split(' ');
       
    //循环判断非NaN的value相加
    for(var i=0,y=0,len=strArr.length;i<len;i++){
        if(!isNaN(parseInt(strArr[i]))){
          c[y]=strArr[i];
          y++;
        }
    };
   return c;
    
}
//调用
onlyNumpluse(a);
console.log(c);
for(var i=0,y=0,m=0;i<c.length;i++)
{
  if(i%2==0){
    d[y]=c[i];
    y++;
  }
  else{
    z[m]=c[i];
    m++;
  }
}
console.log(d,z);
	for(var i=0;i<c.length;i++)
	{
		queryString = "insert into seat(seatrow,seatcol,playid,name) values('" + d[i] + "', '" + z[i]+ "','" + e + "','" + req.session.phone + "')";
	
               db.query(queryString, function(err, rows){
                if (err) {
                   
                }else {
                    
                  console.log("成功");
     
                }
                });
     }
	
    res.json({success:1});
        });
        module.exports = router;