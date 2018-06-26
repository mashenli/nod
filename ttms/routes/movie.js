var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');



router.get('/movie/:id', function(req, res) {
		
	
	if(req.session.name!=null){

		var myDate = new Date();



myDate.getDate();             
var mytime=myDate.toLocaleTimeString();    





			var moviename = req.params.id.split('=')[1];
			var querytring = "select * from played where moviename='" + moviename +"' and time='" + myDate.toLocaleDateString() +"'and playtime > '" + mytime +"'";
			var data2=[];
  			db.query(querytring, function(err, rows){	 
      		if (err) {
          			res.send("读取失败");
         	 }else {	
      				data2 = rows; 	
      				var a=[];	
      				console.log(rows);							
				for(var i=0;i<data2.length;i++){   
				if(a.indexOf(data2[i].playname) === -1){		
			                console.log(data2[i].playname);                              
					a.push(data2[i].playname);			
				}										
				   	} 

				 m = new Map();						

				for(var k=0;k<a.length;k++){			
					var temp = []; 						
					for(var j=0;j<data2.length;j++){	
						if(data2[j].playname === a[k] ){		
		                              
							temp.push(data2[j].playtime);		
						}								
					}									
					if(temp !== null){					
		      console.log(a[k],temp);    
						m.set(a[k],temp);				
					}								
				}										
					
      		}
        });
   		console.log(data2);
  				




		 	var queryString = "select * from movies where moviename='" + moviename +"'";
			
  			db.query(queryString, function(err, rows){
		 
      		if (err) {
          			res.send("读取失败");
         	 }else {
    				var data1 = [];
      				data1 = rows;
    				res.render('movie', {name:req.session.name,test:'退出',data:"#1",data1,m,data2}); 
    			
    				console.log(req.session.name);
    				
      		}
        });

     
    }else{
         res.redirect('../',302);
    }



});

        module.exports = router;