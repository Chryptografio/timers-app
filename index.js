// // Set the date we're counting down to
// var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// // Update the count down every 1 second
// var x = setInterval(function() {

//   // Get today's date and time
//   var now = new Date().getTime();
    
//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;
    
//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
//   // Output the result in an element with id="demo"
//   document.getElementById("demo").innerHTML = days + "d " + hours + "h "
//   + minutes + "m " + seconds + "s ";
    
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);



console.log(`1 sec: ${getTimeFromMillisec(1000)}
30 min 30 sec: ${getTimeFromMillisec(1000 * 60 * 30 + 30000)}
1 hour: ${getTimeFromMillisec(1000 * 3600)}`)

function createTimer () {
    try {
        // считывание из поля ввода значения часов, минут, секунд
        let hours = parseInt(document.getElementById("hours").value)
        let minutes = parseInt(document.getElementById("minutes").value)
        let seconds = parseInt(document.getElementById("seconds").value)
        let name = document.getElementById("name").value
        console.log(hours, minutes, seconds)
        if(isNaN(hours) || isNaN(minutes) || isNaN(seconds)) throw new Error('Value is NaN')
        if(minutes > 60 || minutes < 0 || seconds > 60 || seconds < 0 || hours < 0 || hours > 24) throw new Error('Value not valid')
        if(name == '') throw new Error('Give a name the timer.')
        // кол-во времени в миллисекундах
        let timeinmillisec = ((hours * 60 + minutes) * 60 + seconds) * 1000

        // считывание уже существующих таймеров
        let line = document.getElementById("timers").innerHTML
        let timers = document.getElementById("timers").innerHTML.split('</li>')
        // подсчет времени на всех таймерах в миллисекундах
        let timeOnTimers = getTimeFromArray(timers)
        //console.log(timers)

        // подсчет оставшегося времени
        let timeleft = 24 * 3600 * 1000 - timeOnTimers - timeinmillisec

        // проверка того, что можно добавить таймер
        let okay = (timeleft - timeinmillisec) > 0
        if(!okay) throw new Error('Choose smaller amount of time.')
        line += `<li><div class="timer">Name: ${name}<br>Time: <div id="time${timers.length}">${hours}:${minutes}:${seconds}</div><button onclick="timing.playTimer(${timers.length})">Play</button><button onclick="timing.pauseTimer(${timers.length})">Pause</button></div></li>`
        document.getElementById("timers").innerHTML = line
        document.getElementById("timeleft").innerHTML = getTimeFromMillisec(timeleft)
        document.getElementById("here").innerHTML = ''  
    } catch (e) {
        document.getElementById("here").innerHTML = e
    }
    
}

function getTimeFromMillisec (distance) {
    //console.log(`getTimeFromMillisec: ${distance}`)
    // получает строку времени в виде чч:мм:сс
        let hours = Math.floor(distance / (1000 * 60 * 60))
    let minutes = Math.floor(distance / (1000 * 60)) - hours * 60
    let seconds = Math.floor(distance / 1000) - minutes * 60 - hours * 3600
    return `${hours.toString()}:${minutes.toString()}:${seconds.toString()}`
}

function getTimeMSfromString (str) {
    // из див-а таймера возвращает значение оставшегося времени в мс
    // 0: "↵<li><div class="timer">Name: Walk a dog<br>Time: <div id="time0">1:1:0</div><button onclick="playTimer(0)">Play</button><button onclick="PauseTimer(0)">Pause</button></div>"
    let n1 = str.indexOf('Time: ') + 6
    let n2 = str.indexOf('</div>')
    let line = str.slice(n1, n2)
    let n3 = line.indexOf('>') + 1
    line = line.slice(n3)
    console.log(line)
    line = line.split(':')
    console.log(line)
    return (((parseInt(line[0]) * 60) + parseInt(line[1])) * 60 + parseInt(line[2])) * 1000
}

function getTimeFromArray (arr) {
    // считает кол-во миллисекунд из всех таймеров
    arr.pop()
    console.log(arr)
    if (arr.length === 0) {
        return 0
    } else {
        console.log(arr)
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
            sum += getTimeMSfromString(arr[i])
        }
        return sum
    }
}



// function pauseTimer(id) {
//     window.stop()
// }

let timing = new timerFunction()

function timerFunction () {
    let x

    this.playTimer = function (id) {
        console.log(id)
        clearInterval(x)    
        x = setInterval(function() {
            let timers = document.getElementById("timers").innerHTML.split('</li>')
            console.log(timers)
            let timer = timers[id]
            console.log(timer)
            // Get today's date and time
            let newTime = getTimeMSfromString(timer) - 1000
              
            if(newTime > 0) {
                console.log(getTimeFromMillisec(newTime))
                document.getElementById(`time${id}`).innerHTML = getTimeFromMillisec(newTime)
            } else {
                clearInterval(x);
                document.getElementById(`time${id}`).innerHTML = "EXPIRED";
            }
          }, 1000)
    }

    this.pauseTimer = function() {
        clearInterval(x)
    }
}