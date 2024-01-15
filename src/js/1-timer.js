import flatpickr from "flatpickr";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector("[data-start]");
const daysUI = document.querySelector("[data-days]");
const hoursUI = document.querySelector("[data-hours]");
const minutesUI = document.querySelector("[data-minutes]");
const secondsUI = document.querySelector("[data-seconds]");
let userSelectedDate = new Date(0);
let time = 0;
let intervalID;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const date = new Date();
    if (date.getTime() > userSelectedDate.getTime()) {
      resetTimer();
      startButton.setAttribute("disabled", "");
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      resetTimer();
      startButton.removeAttribute("disabled");
      time = userSelectedDate.getTime() - date.getTime();
    }
  },
};
startButton.setAttribute("disabled", "");
flatpickr("#datetime-picker", options);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const addLeadingZero = (value) => value.toString().padStart(2, "0");
const setTimer = () => {
  const { days, hours, minutes, seconds } = convertMs(time);
  daysUI.textContent = addLeadingZero(days);
  hoursUI.textContent = addLeadingZero(hours);
  minutesUI.textContent = addLeadingZero(minutes);
  secondsUI.textContent = addLeadingZero(seconds);
  time -= 1000;
  if (time <= 0) {
    resetTimer();
  }
}
const resetTimer = () => {
  clearInterval(intervalID);
  time = 0;
  const { days, hours, minutes, seconds } = convertMs(time);
  daysUI.textContent = addLeadingZero(days);
  hoursUI.textContent = addLeadingZero(hours);
  minutesUI.textContent = addLeadingZero(minutes);
  secondsUI.textContent = addLeadingZero(seconds);
}
startButton.addEventListener("click", () => {
  intervalID = setInterval(setTimer, 1000)
  startButton.setAttribute("disabled", "");
})