
var mysql = require('mysql');

// 传入一个js对象作为参数
// host是主机，可以是本地的localhost，也可以是你服务器的ip地址
// user 登录数据库的用户，password 登录用户的密码
// database 数据库的名字，我使用的是blog这个数据库
var db = mysql.createConnection({
    host:'localhost',
    port:3308,
    user:'root',
    password:'mashen',
    database:'马伸'
    },console.log("数据库连接成功！"));

// 连接数据库
db.connect();

// 将这个模块公有化
// 使得其他js文件可以通过require语句来引入。
module.exports = db;
