
const display = document.getElementById('clock');

// set audio for alarm
const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;

let alarmTime = null;
let alarmTimeout = null;

const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm');

var alarmList = [];  // Stores all the alarms being set 

function ringing(now) {
    audio.play();
   // alert(`Hey! it is ${now}`);
}


function showTime() {
    var time = new Date();
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var session = "AM";

    // var now = `${hour}:${minutes}:${seconds} ${session}`;

    if (hour > 12) {
        session = "PM";
        hour = hour - 12;
    }

    if (hour == 0) {
        session = "AM";
        hour = 0;
    }

    if (hour < 10) {
        hour = "0" + hour;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    var currentTime = `${hour}:${minutes}:${seconds} ${session}`;
    
    display.innerHTML = currentTime;

    // check if alarmList includes the current time, "now"
    // if yes,ringing() is called
    if (alarmList.includes(currentTime)) {
        ringing(currentTime);
        console.log("alert");
    }
}

//update showTime in every second
setInterval(showTime, 1000);

//function to clear/stop the currently playing alarm
function clearAlarm() {
    audio.pause();
    if(alarmTimeout){
        clearTimeout(alarmTimeout);
        alert('Alarm cleared')
    }
}

// removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})

// removes an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear contents
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}

// Add new alarm to the list on webpage
function showNewAlarm(newAlarm) {
    const html = `
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    
    myList.innerHTML += html;
};

//adding event listener to Set Alarm button,
//whenever the form is submitted
addAlarm.addEventListener('submit', e=>{
    console.log("button clicked");
    e.preventDefault();

    let newHour = addAlarm.hours.value;
    let newMinute = addAlarm.minutes.value;
    let newSecond = addAlarm.seconds.value;
    let newSessions = addAlarm.sessions.value;

    const newAlarm = `${newHour}:${newMinute}:${newSecond} ${newSessions}`;

    //add newAlarm to alarmList
    if(isNaN(newAlarm)){

        if(!alarmList.includes(newAlarm)){
            console.log(newAlarm);
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);

            showNewAlarm(newAlarm);
            addAlarm.reset();
        }else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    }else{
        alert("Invalid Time Entered");
    }

})