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
        
        
        // Initialize room data and info
        eventInfo[temp] = data
        eventInfo[temp].time = 0
        eventInfo[temp] = {}
        eventInfo[temp].chat = []
        eventInfo[temp].users = {}

        socket.emit('makeRoom',{room_id:temp})
    })

    socket.on('joinRoom', (data)=>{
        console.log('You joined creebo!')
        console.log(JSON.stringify(data))
        socket.leave(socket.room);
        socket.join(data.room_id);
        socket.room = data.room_id;
        socket.user_id = data.user_id
        if (data.username){
            eventInfo[data.room_id].users[data.user_id] = data.username
        }else{
            eventInfo[data.room_id].users[data.user_id] = "Anonymous"
        }
        var temp = eventInfo[data.room_id]
        temp.room_id = data.room_id
        temp.user_id = data.user_id
        socket.emit('joinRoom',temp)
        socket.broadcast.to(socket.room).emit('updateUser',eventInfo[data.room_id].users)
    })

    socket.on('sendAva', (data)=>{
        console.log('You sent creebin!')
        console.log(JSON.stringify(data))
        eventInfo[data.room_id].time[socket.user_id] = data.time
        var temp = {}
        temp[socket.user_id] = data.time
        socket.broadcast.to(socket.room).emit('sendAva',temp)
    })

    socket.on('updateUser', (data)=>{
        console.log("Looking for User: " + JSON.stringify(data))
        eventInfo[data.room_id].users[data.user_id] = data.username
        socket.broadcast.to(socket.room).emit('updateUser',eventInfo[data.room_id].users)
    })

    socket.on('sendChat', (data)=>{
        console.log('You said creebin!')
        console.log(JSON.stringify(data))
        var temp = {}
        temp.message = data.message
        temp.user_id = data.user_id
        eventInfo[data.room_id].chat.push(temp)
        socket.broadcast.to(socket.room).emit('sendChat',data.message)
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
