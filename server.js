const express = require('express');
const app = express();
const http = require('http');
const path=require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
var io = new Server(server);
app.use(express.static(path.join('public')));
let name;
let user=0;

  // const nam=prompt('enter your name');
io.on('connection', (socket) => {
  console.log('a user connected');
  user++;
  socket.on('user-joined',nam=>{
    console.log(nam);
    socket.broadcast.emit('new',nam);
    name=nam;
    })
  socket.on("disconnect",nam=>{
    console.log(nam);
      socket.broadcast.emit('old',name);
    })
    socket.on('send',message=>{
    socket.broadcast.emit('r',{o:message.message,p:message.nam});
    
  })
  socket.on('vedio',nam=>{
    socket.broadcast.emit('ved',nam);}
  )})

server.listen(8000, () => {
  console.log('listening on *:3000');
})
// const express = require('express')
// const app = express()
// const http = require('http').createServer(app)

// const PORT = process.env.PORT || 3000

// http.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`)
// })

// app.use(express.static(__dirname + '/public'))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

// // Socket 
// const io = require('socket.io')(http)

// io.on('connection', (socket) => {
//     console.log('Connected...')
//     socket.on('message', (msg) => {
//         socket.broadcast.emit('message', msg)
//     })

// })
