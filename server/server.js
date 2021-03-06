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

var eventInfo = {}
var users = {}

io.on('connection',(socket) => {
    socket.on('makeRoom', (data)=>{
        console.log('You made a creebin!')
        console.log(JSON.stringify(data))
        var temp = makeid()
        
        
        // Initialize room data and info
        eventInfo[temp] = {}
        eventInfo[temp] = data
        eventInfo[temp].time = {}
        eventInfo[temp].timeArraySize = data.selected.length
        eventInfo[temp].chat = []
        eventInfo[temp].users = {}

        console.log(eventInfo[temp])
        socket.emit('makeRoom',{room_id:temp})
    })

    socket.on('passwordCheck', (data)=>{
        console.log(data.username + " tried to log in with: " + data.password)
        if (data.user_id==" "){
            data.user_id = makeid()
            socket.user_id = data.user_id
        }
        if (data.username && data.color){
            data.check = '1'
            socket.emit('passwordCheck',data)
        }else{
            data.check = '0'
            socket.emit('passwordCheck',data)
        }
    })
    socket.on('joinRoom', (data)=>{
        try{
            console.log('You joined creebo!')
            console.log(JSON.stringify(data))
            socket.leave(socket.room);
            socket.join(data.room_id);
            socket.room = data.room_id;
            if (!socket.user_id){
                socket.user_id = data.user_id
            }
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
                var tempArr = []
                for (let i = 0; i < eventInfo[data.room_id].timeArraySize; i++) {
                    tempArr.push(0)
                }
                eventInfo[data.room_id].time[data.user_id] = tempArr
            }
            var temp = eventInfo[data.room_id]
            temp.room_id = data.room_id
            temp.user_id = data.user_id
            socket.emit('joinRoom',temp)
            // socket.broadcast.to(socket.room).emit('sendAva',eventInfo[data.room_id].time)
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
        users[data.user_id] = {}
        users[data.user_id].username = data.username
        users[data.user_id].color = data.color
        users[data.user_id].password = data.password
        socket.user_id = data.user_id
        if (eventInfo[data.room_id]){
            if (eventInfo[data.room_id].users[data.user_id]){
                eventInfo[data.room_id].users[data.user_id] = {}
            }
            eventInfo[data.room_id].users[data.user_id].username = data.username
            eventInfo[data.room_id].users[data.user_id].color = data.color
            socket.broadcast.to(socket.room).emit('updateUser',eventInfo[data.room_id].users)
        }
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

let makeid = function() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
