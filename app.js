var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Server started.");

var playerLst = {};
var socketLst = {};
var Player = function(id) {
    var self = {
        id: id,
        name: "User: " + id
    }
    return self;
}
var io = require('socket.io')(serv, {});
io.sockets.on('connection', function(socket) {
    console.log('socket connection: ' + socket.id);

    var player = new Player(socket.id);
    playerLst[socket.id] = player;
    socketLst[socket.id] = socket;


    socket.on('disconnect', function() {
        console.log('socket disconnection: ' + socket.id + '\n' + 'Player: ' + player.name);
        delete playerLst[socket.id];
        delete socketLst[socket.id];
    });

    socket.on('sendMsgToServer', function(data) {
        for (var i in socketLst) {
            socketLst[i].emit('addToChat', (socket.id + '').slice(2, 7) + ': ' + data);
        }
    });
});