let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 100);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return (num < 10 ? "0" : "") + num;
}

function pauseTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapsContainer.innerHTML = "";
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapElement = document.createElement('div');
        lapElement.textContent = lapTime;
        lapsContainer.appendChild(lapElement);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
