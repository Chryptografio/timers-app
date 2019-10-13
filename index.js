// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

console.log(`1 sec: ${getTimeFromMillisec(1000)}
30 min 30 sec: ${getTimeFromMillisec(1000 * 60 * 30 + 30000)}
1 hour: ${getTimeFromMillisec(1000 * 3600)}`);

function createTimer() {
  // считывание из поля ввода значения часов, минут, секунд
  let hours = parseInt(document.getElementById("hours").value);
  let minutes = parseInt(document.getElementById("minutes").value);
  let seconds = parseInt(document.getElementById("seconds").value);

  // кол-во времени в миллисекундах
  let timeinmillisec = ((hours * 60 + minutes) * 60 + seconds) * 1000;

  // считывание уже существующих таймеров
  let line = document.getElementById("timers").innerHTML;
  let list = line.split(
    "</p><button>Play</button><button>Pause</button></li><li><p>"
  );

  // подсчет времени на всех таймерах в миллисекундах
  let timeOnTimers = getTimeFromArray(list);

  // подсчет оставшегося времени
  let timeleft = 24 * 3600 * 1000 - timeOnTimers - timeinmillisec;

  // проверка того, что можно добавить таймер
  let okay = timeleft - timeinmillisec > 0;
  console.log(
    `timeleft: ${timeleft}, timeinms: ${timeinmillisec}, timeontimers: ${timeOnTimers}`
  );
  if (okay) {
    line += `<li><p>${hours}:${minutes}:${seconds}</p><button>Play</button><button>Pause</button></li>`;
    document.getElementById("timers").innerHTML = line;
    document.getElementById("timeleft").innerHTML = getTimeFromMillisec(
      timeleft
    );
  } else {
    document.getElementById("here").innerHTML =
      "Choose smaller amount of time.";
  }
}

function getTimeFromMillisec(distance) {
  //console.log(`getTimeFromMillisec: ${distance}`)
  // получает строку времени в виде чч:мм:сс
  let hours = Math.floor(distance / (1000 * 60 * 60));
  let minutes = Math.floor(distance / (1000 * 60)) - hours * 60;
  let seconds = Math.floor(distance / 1000) - minutes * 60 - hours * 3600;
  return `${hours.toString()}:${minutes.toString()}:${seconds.toString()}`;
}

function getTimeFromArray(arr) {
  // считает кол-во миллисекунд из таймеров
  if (arr.length === 0) {
    return 0;
  } else if (arr.length === 1) {
    if (arr[0].length === 5) {
      return 0;
    } else {
      let n1 = arr[0].indexOf("<p>");
      let n2 = arr[0].indexOf("</p>");
      let line = arr[0].slice(n1 + 3, n2);
      line = line.split(":");
      console.log(line);
      return (
        ((parseInt(line[0]) * 60 + parseInt(line[1])) * 60 +
          parseInt(line[2])) *
        1000
      );
    }
  } else {
    let n1 = arr[0].indexOf("<p>");
    arr[0] = arr[0].slice(n1 + 3);
    let n2 = arr[arr.length - 1].indexOf("</p>");
    arr[arr.length - 1] = arr[arr.length - 1].slice(0, n2);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split(":");
      console.log(
        parseInt(arr[i][0]),
        parseInt(arr[i][1]),
        parseInt(arr[i][2])
      );
      sum +=
        ((parseInt(arr[i][0]) * 60 + parseInt(arr[i][1])) * 60 +
          parseInt(arr[i][2])) *
        1000;
    }
    return sum;
  }
}
