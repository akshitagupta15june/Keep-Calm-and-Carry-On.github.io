const timer = document.querySelector('.time-left');
const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
let defaultTime = 25 * 60;
const defaultBreakTime = 5 * 60;
let countdown;

let timerCount = 0;

function timerDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timer.textContent = display;
  document.title = display;
}

function startTimer() {
  console.log('start button clicked!!!');
  timerDisplay(defaultTime);
  countdown = setInterval(() => {
    defaultTime <= 0 ? clearInterval(countdown) : defaultTime--;
    timerDisplay(defaultTime);
  }, 1000);

}

function startBreakTimer() {
  timerDisplay(defaultBreakTime);
  countdown = setInterval(() => {
    defaultBreakTime <= 0 ? (clearInterval(countdown), startTimer()) : defaultBreakTime--;
    timerDisplay(defaultBreakTime);
  }, 1000);
}


function resetTimer() {
  console.log('reset cliked!!!!');
  defaultTime = 25 * 60;
  clearInterval(countdown);
  timerDisplay(defaultTime);
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
