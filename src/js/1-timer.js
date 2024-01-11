import flatpickr from "flatpickr";
const btn = document.querySelector("[data-start]");
const daysUI = document.querySelector("[data-days]");
const hoursUI = document.querySelector("[data-hours]");
const minutesUI = document.querySelector("[data-days]");
const secondsUI = document.querySelector("[data-days]");
let userSelectedDate = new Date(0);
let time = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const date = new Date;
    if (date.getTime() > userSelectedDate.getTime()) {
      btn.setAttribute("disabled", "");
      alert("Please choose a date in the future");
    } else {
      btn.removeAttribute("disabled");
      time = userSelectedDate.getTime() - date.getTime();
    }
  },
};
btn.setAttribute("disabled", "");
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
btn.addEventListener("click", () => {
  const { days, hours, minutes, seconds } = convertMs(time);
  daysUI.textContent = days;
  hoursUI.textContent = hours;
  minutesUI.textContent = minutes;
  secondsUI.textContent = seconds;
})