let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
const display = document.querySelector('.display');
const lapsList = document.querySelector('.laps');

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

startButton.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 100);
        isRunning = true;
        toggleButtons();
    }
});

pauseButton.addEventListener('click', () => {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
        isRunning = false;
        toggleButtons();
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00.0";
    lapsList.innerHTML = '';
    toggleButtons();
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(Date.now() - startTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapItem.appendChild(createDeleteButton(lapItem));
        lapsList.appendChild(lapItem);
    }
});

function updateTime() {
    const time = Date.now() - startTime;
    display.textContent = formatTime(time);
}

function formatTime(time) {
    const milliseconds = Math.floor(time % 1000 / 100);
    const seconds = Math.floor(time / 1000 % 60);
    const minutes = Math.floor(time / (1000 * 60) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${milliseconds}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function toggleButtons() {
    startButton.disabled = isRunning;
    pauseButton.disabled = !isRunning;
    resetButton.disabled = isRunning && elapsedTime === 0;
    lapButton.disabled = !isRunning;
}

function createDeleteButton(lapItem) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => {
        lapsList.removeChild(lapItem);
    });
    return deleteButton;
}

// Initialize button states
toggleButtons();
