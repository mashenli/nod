var express = require('express');
var router = express.Router();



router.get('/bossindex', function(req, res) {

	
  if(req.session.username!=null){
        var name=req.session.username;
     	res.render('bossindex', {title: name});
        console.log(name);
    }else{
        res.redirect('../login',302);
    }
    


});
        module.exports = router;