var express = require('express');
var router = express.Router();





router.get('/adindex', function(req, res) {
 if(req.session.username!=null){
        var name=req.session.username;
     	res.render('adindex', {title: name});
        console.log(name);
    }else{
        res.redirect('login',302);
        
    }
    

});

router.post('/adindex', function(req, res) {
    res.render('adindex', {title: '后台登录'});
});
        module.exports = router;