var express = require('express');
var app = express();
var server = app.listen(5000);

var socket = require('socket.io');
var io = socket(server);

var playerStarted = 0;

io.sockets.on('connection', onConnection);

function onConnection(socket){
  console.log("Player connected!");

  socket.on('pos', enemyPos);
  socket.on('death', restart);
  socket.on('start', start);

  function enemyPos(enemy){
    socket.broadcast.emit('pos',enemy);
    console.log(enemy);
  }
  function restart(){
    socket.broadcast.emit('death');
  }
  function start(){
    playerStarted ++;
    if(playerStarted == 2){

    }
  }
}

app.use(express.static('public')); //Serves resources from public folder
console.log("Running on: localhost:5000");
