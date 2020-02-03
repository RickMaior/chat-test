//glitch test

var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
console.log(process.env.PORT)
var favicon = require("serve-favicon");

app.use(favicon(__dirname + "/public/images/favicon.ico"));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/chat", function(req, res) {
  res.sendFile(__dirname + "/chat.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.broadcast.emit("chat message", "nameinput connected ");
  socket.emit("chat message", "you connected");

  socket.on("message sended", function(msg) {
    if (msg) {
      console.log("message: " + msg);
      socket.broadcast.emit("chat message", "nameinput: " + msg);
      socket.emit("chat message", "you: " + msg);
    }
  });

  socket.on("discord message", function(msg, user) {
    if (msg) {
      console.log("Discord:");
      console.log("message: " + msg);
      console.log("user: " + user);
      socket.broadcast.emit("chat message", `DISCORD_${user} : ${msg}`);
    }
  });

  socket.on("twitch message", function(msg, user) {
    if (msg) {
      console.log("Twitch:");
      console.log("message: " + msg);
      console.log("user: " + user);
      socket.broadcast.emit("chat message", `Twitch_${user} : ${msg}`);
    }
  });

  socket.on("disconnect", function() {
    socket.broadcast.emit("chat message", "nameinput disconnected ");
    socket.emit("chat message", "you disconnected");
    console.log("user disconnected");
  });
});

app.get("*", function(req, res) {
  res.status(404)
  res.sendFile(__dirname + "/404.html");
});


http.listen(port, function() {
  console.log("listening on *:" + port);
});
