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


 var express = require('express')
 var app = express()

 const NodeCache = require("node-cache" );
const myCache = new NodeCache({maxKeys:50});


var expressWs = require('express-ws')(app);

clients={};


 app.get('/android',function(req,resp){
  
  
    var move=req.query.path

    var value=move+"-_"
    
    myCache.set("move",value)
    temp={'action':"path chosen"}
    resp.end(JSON.stringify(temp))
  
    
  
 })

 app.get("/car",function(req,res){

  var value=myCache.get("move")
  if(value==undefined){
    temp={'action':"$"}
    res.end(JSON.stringify(temp))
   }
   else{
  arr=value.split("-")
  temp={'action':arr[0]}
  if(arr[0]=="_"){
    myCache.del("move")
  }
  else{
  arr.shift()

  value=arr.join("-")
  myCache.set("move",value)
  }

  res.end(JSON.stringify(temp))
  clients['app'].send(temp['action'])

   }
 });


 app.ws('/', function(ws, req) {

  var user=req.query.user
  clients[user]=ws

  
  ws.on('message', function(msg) {
    console.log(msg);
  });
  

  

});

expressWs.getWss().on('connection', function(ws) {
  ws.send("connection successful")
  console.log('connection open');
});


  app.listen(process.env.PORT || 3000)
  // app.listen(3000)


