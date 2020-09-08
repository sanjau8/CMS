const express = require('express')
const {MongoClient} = require('mongodb');
const mongoose=require('mongoose');

const app = express()



const uri = "mongodb+srv://sanjau8:garchomp@cluster0.v9uku.mongodb.net/crowd";


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(function(){
    console.log("Connection Established");
}).catch(function(err){
    console.log(err);
})





/*app.get('/',function(req,res){
    res.send('Hello world');
});

app.listen(3000);
*/
//sanjau8
//garchomp