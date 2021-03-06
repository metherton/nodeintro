"use strict";

var express    = require('express')
var bodyParser = require('body-parser')
var fs         = require('fs')

var app = express()
app.use( express.static( __dirname+'/public') )
app.use( bodyParser.json() )



app.use( function( req, res, next ){
  if( '/slow' === req.url ) {
    setTimeout(function(){
      res.send( new Date().toISOString() )
    },1000)
  }
  else return next();
})

app.get('/say/:who',function(req,res){
  res.send("Hello "+req.params.who)
})

app.get('/ping',function(req,res){
  res.send({pong:new Date().toISOString()})
})

app.post('/print',function(req,res){
  console.dir( req.body )
  res.send({ok:true})
})

app.get('/load',function(req,res){
  fs.readFile( './express4.js', function(err,data){
    if( err ) return res.send(500);

    res.send( data.toString() )
  })
})




app.listen(3000)


