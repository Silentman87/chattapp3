const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: {
    origin: "*", // Allow ALL origins for now
    methods: ["GET", "POST"]
  }
});


const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("joined ", name);
        users[socket.id] = name;
       socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id] })
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})



