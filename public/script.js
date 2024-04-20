const timeoutBtn = document.getElementById("timeout-btn");
let socket = io();

timeoutBtn.addEventListener("click", function(){
    const timeValueInput = document.getElementById("time-value");
    const timeValue = timeValueInput.value;
    const timeType = document.getElementById("time-type").value;
    if(timeValue>=0 && timeType){
        timeValueInput.value = '0';
        
        let userId = localStorage.getItem("userId");
        if(!userId){
            userId = socket.id;
            localStorage.setItem("userId", userId);
        }
        
        socket.emit('time data', {timeValue: timeValue, timeType: timeType, id: socket.id, userId: userId});   
    }    
})

function initializeUserId(){
    let userId = localStorage.getItem("userId");
    if(!userId){
        userId = socket.id;
        localStorage.setItem("userId", userId);
    }
    
    socket.emit('change user id', {userId: userId,id: socket.id});   
    
}

window.addEventListener("DOMContentLoaded", function(){
    setTimeout(initializeUserId, 1000);
});


socket.on('alert from server', function(msg) {
  alert(msg);
});


async function setTimeOut(value, type){
    console.log(value, type);
    const response = await fetch("/",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({value: value, type: type})
    });
    return response.json();
}