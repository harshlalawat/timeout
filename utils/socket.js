const {Server} = require('socket.io');
const obj={};

const timeObj = {
    "seconds": 1000,
    "minutes" : 60000,
    "hours": 3600000
}

module.exports.socket = function(server){
    const io = new Server(server);
    io.on('connection', (socket) => {
        socket.on("change user id", function({id, userId}){
            obj[userId] = id;
            // console.log("change user id",obj[userId]);
        })
        socket.on('time data', (msg) => {
            let {timeType, timeValue, id, userId}=msg;
            
            obj[userId] = id;
            if(timeValue<0) timeValue=0;
            timeValue = parseInt(timeObj[timeType])*parseInt(timeValue);
            // console.log(msg);
            setTimeout(function(){
                io.to(obj[userId]).emit("alert from server", "Times up");
                // console.log("alert from server to id",obj[userId]);
            }, timeValue);
            // console.log('message:',msge.timeValue,msge.timeType, timeValue);
        });
    });
}