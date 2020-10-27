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

 const NodeCache = require( "node-cache" );
const myCache = new NodeCache({maxKeys:50});


 app.get('/car',function(req,resp){
  value = myCache.get( "move" );
  if ( value == undefined ){
    var move="L+5+R+10+L+2"

    value=move+"+_"
    
    myCache.set("move",value)
      
  }

  arr=value.split("+")
  temp={'action':arr[0]}
  if(arr[0]=="_"){
    myCache.del("move")
  }
  else{
  arr.shift()

  value=arr.join("+")
  myCache.set("move",value)
  
  }
  resp.end(JSON.stringify(temp))


  
 })
   app.listen(process.env.PORT || 3000)
   //app.listen(3000)


