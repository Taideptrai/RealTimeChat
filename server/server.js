const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=>{ //socketobj
  console.log('we have a new connection !!');
  socket.on('join', ({name,room},callback)=>{ //get data send from client
    const {error, user} = addUser({id:socket.id,name,room});
    console.log(user);
    if (error) return callback(error);
    socket.emit('message', {user: 'admin', text:`${user.name},welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined`});
    socket.join(user.room);
    callback(); //end of userlogin, join and get message "welcome login"
  })

  socket.on('sendMessage',(message,callback)=>{
    const user = getUser(socket.id)
    io.to(user.room).emit('message', {user: user.name,text: message})
    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log('userleft')
    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

app.use(router);

server.listen(PORT,()=>console.log('server is running'))