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
        eventInfo[temp] = {}
        eventInfo[temp] = data
        eventInfo[temp].time = {}
        eventInfo[temp].chat = []
        eventInfo[temp].users = {}

        console.log(eventInfo[temp])
        socket.emit('makeRoom',{room_id:temp})
    })

    socket.on('joinRoom', (data)=>{
        try{
            console.log('You joined creebo!')
            console.log(JSON.stringify(data))
            socket.leave(socket.room);
            socket.join(data.room_id);
            socket.room = data.room_id;
            socket.user_id = data.user_id
            eventInfo[data.room_id].users[data.user_id] = {}
            if (data.username){
                eventInfo[data.room_id].users[data.user_id].username = data.username
            }else{
                eventInfo[data.room_id].users[data.user_id].username = "Anonymous"
            }
            if (data.color){
                eventInfo[data.room_id].users[data.user_id].color = data.color
            }else{
                eventInfo[data.room_id].users[data.user_id].color = "bg-blue-500"
            }
            if (!eventInfo[data.room_id].time[data.user_id]){
                eventInfo[data.room_id].time[data.user_id] = [0,0,0]
            }
            var temp = eventInfo[data.room_id]
            temp.room_id = data.room_id
            temp.user_id = data.user_id
            socket.emit('joinRoom',temp)
            socket.broadcast.to(socket.room).emit('sendAva',eventInfo[data.room_id].time)
            socket.broadcast.to(socket.room).emit('updateUser',eventInfo[data.room_id].users)
        }catch{
            console.log("BIIIIIIG BREAAAAAAKKK HEREEE")
        }
    })

    socket.on('sendAva', (data)=>{
        console.log('You sent creebin!')
        console.log(JSON.stringify(data))
        // console.log(JSON.stringify(eventInfo[data.room_id]))
        console.log("PUPPYYYYYYYY: " + data.user_id)
        eventInfo[data.room_id].time[socket.user_id] = data.time
        var temp = {}
        temp[data.user_id] = data.time
        console.log(temp)
        socket.broadcast.to(socket.room).emit('sendAva',temp)
    })

    socket.on('updateUser', (data)=>{
        console.log("Looking for User: " + JSON.stringify(data))
        eventInfo[data.room_id].users[data.user_id].username = data.username
        eventInfo[data.room_id].users[data.user_id].color = data.color
        socket.broadcast.to(socket.room).emit('updateUser',eventInfo[data.room_id].users)
    })

    socket.on('sendChat', (data)=>{
        console.log('You said creebin!')
        console.log(JSON.stringify(data))
        var temp = {}
        temp.message = data.message
        temp.user_id = data.user_id
        temp.timestamp = moment(data.timestamp)
        eventInfo[data.room_id].chat.push(temp)
        socket.broadcast.to(socket.room).emit('sendChat',[temp])
    })

})

makeid = function() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 1; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
