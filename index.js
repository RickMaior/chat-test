var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function (req, res) {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function (socket) {

  socket.on('chat message', function (msg) {
    if (msg) {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    }
  });

  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});


http.listen(port, function(){
  console.log('listening on *:' + port);
});