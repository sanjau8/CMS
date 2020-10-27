// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: 'remotemysql.com:3306',
//     user: "OBvpHD7CSf",
//     password: "vlYNAQGrdf",
//     database:"OBvpHD7CSf"
//   });
  
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

console.log("in")
 var express = require('express')
 var app = express()

 app.get('/car',function(req,resp){
     temp={'action':'L'}
     resp.end(JSON.stringify(temp))
 })
   app.listen(process.env.PORT || 3000)
   //app.listen(3000)


