var express = require('express');
var api = require('./api/api');
var app = express();

var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

app.use(express.static('public'));
app.use('/api', api);

http.listen(process.env.PORT || 3000);

// io.listen(app.get('port'));
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});



// game
var game = require('./core/game');
game.resetGame();
