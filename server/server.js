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

var events = {}
var eventInfo = {}

io.on('connection',(socket) => {
    socket.on('makeRoom', (data)=>{
        console.log('You made a creebin!')
        console.log(JSON.stringify(data))
        var temp = makeid()
        eventInfo[temp] = data
        eventInfo[temp].time = 0
        socket.emit('makeRoom',{room_id:temp})
    })

    socket.on('joinRoom', (data)=>{
        console.log('You joined creebo!')
        console.log(JSON.stringify(data))
        socket.leave(socket.room);
        socket.join(data.room_id);
        socket.room = data.room_id;
        var temp = eventInfo[data.room_id]
        temp.room_id = data.room_id
        socket.emit('joinRoom',temp)
    })

    socket.on('sendAva', (data)=>{
        console.log('You sent creebin!')
        console.log(JSON.stringify(data))
        eventInfo[data.room_id].time = data.time
        socket.broadcast.to(socket.room).emit('sendAva',data.time)
    })

})

makeid = function() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
