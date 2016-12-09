var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var group = [];

io.on('connection', function (socket) {
  socket.emit("init", group);

  socket.on('login', function (name) {
  	socket.name = name;
  	group.push(name);
    io.emit('login', group);
  });

  socket.on('disconnect', function() {
  	var index = group.indexOf(socket.name);
  	if (index > -1) {
    	group.splice(index, 1);
	}
  	io.emit('disconnect', group);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});