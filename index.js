var express = require('express')
 var app = express()

 const NodeCache = require("node-cache" );
const myCache = new NodeCache({maxKeys:50});


var expressWs = require('express-ws')(app);

clients={};


 app.get('/android',function(req,resp){
  
  
    var move=req.query.path

    var value=move+"+_"
    
    myCache.set("move",value)
      
  
    arr=value.split("-")
  
  temp={'action':arr[0]}
  resp.end(JSON.stringify(temp))
  arr.shift()
  value=arr.join("-")
  myCache.set("move",value)
  
  clients['car'].send(temp['action'])

  
 })

 app.get("/car",function(req,res){

  var value=myCache.get("move")
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


 });


 app.ws('/', function(ws, req) {

  var user=req.query.user
  clients[user]=ws
  
  ws.on('message', function(msg) {
    console.log(msg);
  });
  ws.on('error',function(){
   console.log("in error")
   ws.OPEN=1
   ws.send("in error")
  });
  
});


expressWs.getWss().on('connection', function(ws) {
 console.log('in connection');
  ws.send("connection successful")
  
});

expressWs.getWss().on('handshake', function(ws) {
  console.log('in handshake');
  ws.send("connection successful")
 
});

  app.listen(process.env.PORT || 3000)
  // app.listen(3000)
