const port = 7070;
const host = '127.0.0.1';

const express = require('express')
const app = express();
const server = require('http').Server(app);
const io = require("socket.io")(server);
const moment = require('moment');


app.use(express.json())

server.listen(port);
console.log("listening on port: " + port)

app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>');
	// console.log(req.headers)
});

io.on('connection',(socket) => {
    socket.on('makeRoom', (data)=>{
        console.log('You made a creebin!')
        console.log(JSON.stringify(data))
        socket.emit('makeRoom',{roomid:3})
    })

    socket.on('joinRoom', (data)=>{
        console.log('You joined creebo!')
        console.log(JSON.stringify(data))
        socket.leave(socket.room);
        socket.join(data.room_id);
        socket.room = data.room_id;

    })

    socket.on('sendAva', (data)=>{
        console.log('You sent creebin!')
        console.log(JSON.stringify(data))
        socket.broadcast.to(socket.room).emit('sendAva',data)
        
    emit('recieveAva',data)
    })

})