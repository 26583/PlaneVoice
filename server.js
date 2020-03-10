var express = require('express');
var app = express();

//setting middleware
app.use(express.static('public')); //Serves resources from public folder
console.log("Running on: localhost:5000");

var server = app.listen(5000);
