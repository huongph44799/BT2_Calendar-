const fullDatecurrent = document.querySelector(".date-month-year");
const currentMonthYear = document.querySelector(".current-month-year");
const displayUIDate = document.querySelector(".days");
const displayUIMonths = document.querySelector(".months");
const displayUIYears = document.querySelector(".years");
const toggleIcon = document.querySelector(".down arrow");
const hiddenMain = document.querySelector(".main");
const sub = document.querySelector(".sub-minute");
const add = document.querySelector(".add-minute");
const minuteDisplay = document.querySelector(".initialize-minute");
const timerPopup = document.querySelector(".timer-popup");
const timerDisplay = document.querySelector(".timer-display");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const summaryMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let date = new Date();
let currentDay = date.getDay();

let currentDate = date.getDate();

let currentMonth = date.getMonth();

let currentYear = date.getFullYear();

let calendarVisible = true;
let minutes = 30;
let timer = 0;
let timerInterval;

function displayFullDateCurrent() {
  fullDatecurrent.innerHTML = `${days[currentDay]}, ${months[currentMonth]} ${currentDate}`;
}

function displayDates(month, year) {
  let connectStringDate = "";
  const newDate = new Date();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const lastDateOfPreviousMonth = new Date(year, month, 0).getDate();

  const lastDateOfCurrentMonth = new Date(year, month + 1, 0).getDate();

  let defaultCurrentDate = 1;
  let nextMonthDate = 1;

  for (let i = 0; i < 6; i++) {
    connectStringDate += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        connectStringDate += `<td class="inactive">${
          lastDateOfPreviousMonth - firstDayOfMonth + j + 1
        }</td>`;
      } else if (defaultCurrentDate > lastDateOfCurrentMonth) {
        connectStringDate += `<td class="inactive">${nextMonthDate++}</td>`;
      } else {
        let isActive =
          defaultCurrentDate === newDate.getDate() &&
          month === newDate.getMonth() &&
          year === newDate.getFullYear()
            ? "active"
            : "";
        connectStringDate += `<td class="${isActive}">${defaultCurrentDate++}</td>`;
      }
    }
    connectStringDate += "</tr>";
  }

  currentMonthYear.innerHTML = `${months[month]} ${year}`;
  displayUIDate.innerHTML = connectStringDate;
}

function displayMonths(month, year) {
  let connectStringMonth = "";
  const newDate = new Date();

  for (let i = 0; i < 3; i++) {
    connectStringMonth += "<tr>";
    for (let j = 0; j < 4; j++) {
      let monthIndex = i * 4 + j;

      let isActive =
        monthIndex === newDate.getMonth() && year === newDate.getFullYear()
          ? "active"
          : "";

      connectStringMonth += `<td class="${isActive}" onclick="monthToDate(${monthIndex}, ${year})">${summaryMonths[monthIndex]}</td>`;
    }
    connectStringMonth += "</tr>";
  }

  currentMonthYear.innerHTML = `${year}`;
  displayUIMonths.innerHTML = connectStringMonth;
}

function displayYears(year) {
  let connectStringYear = "";
  let startYear = year - (year % 11);

  let endYear = startYear + 11;

  for (let i = 0; i < 3; i++) {
    connectStringYear += "<tr>";
    for (let j = 0; j < 4; j++) {
      let currentYear = startYear++;
      let isActive = currentYear === date.getFullYear() ? "active" : "";
      connectStringYear += `<td class="${isActive}" onclick="yearToMonth(${currentYear})">${currentYear}</td>`;
    }
    connectStringYear += "</tr>";
  }

  currentMonthYear.innerHTML = `${startYear - 12} - ${endYear}`;
  displayUIYears.innerHTML = connectStringYear;
}

displayFullDateCurrent();
displayDates(currentMonth, currentYear);

displayUIDate.addEventListener("wheel", function (e) {
  e.preventDefault();
  if (e.deltaY < 0) {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    currentYear -= currentMonth === 11 ? 1 : 0;
  } else {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;

    currentYear += currentMonth === 0 ? 1 : 0;
  }
  displayDates(currentMonth, currentYear);
});

displayUIMonths.addEventListener("wheel", function (e) {
  e.preventDefault();
  currentYear += e.deltaY < 0 ? -1 : 1;

  displayMonths(currentMonth, currentYear);
});

displayUIYears.addEventListener("wheel", function (e) {
  e.preventDefault();
  currentYear += e.deltaY < 0 ? -11 : 11;
  console.log(+currentYear);
  displayYears(currentYear);
});

function setCalendarMode() {
  const isDisplayingDates = !displayUIDate.classList.contains("hidden");

  const isDisplayingMonths = !displayUIMonths.classList.contains("hidden");

  if (isDisplayingDates) {
    displayUIDate.classList.add("hidden");
    displayUIMonths.classList.remove("hidden");
    displayMonths(currentMonth, currentYear);
  } else if (isDisplayingMonths) {
    displayUIMonths.classList.add("hidden");
    displayUIYears.classList.remove("hidden");
    displayYears(currentYear);
  }
  document.querySelector(".weeks").style.display = "none";
}

const monthToDate = (month, year) => {
  currentMonth = month;
  currentYear = year;

  displayDates(currentMonth, currentYear);
  document.querySelector(".weeks").style.display = "";
  displayUIDate.classList.remove("hidden");
  displayUIMonths.classList.add("hidden");
  displayUIYears.classList.add("hidden");
};

const yearToMonth = (year) => {
  currentYear = year;

  displayMonths(currentMonth, currentYear);

  displayUIDate.classList.add("hidden");
  displayUIMonths.classList.remove("hidden");
  displayUIYears.classList.add("hidden");
};

function backToCalendar() {
  const newDate = new Date();

  const isDisplayingDates = !displayUIDate.classList.contains("hidden");

  const isDisplayingMonths = !displayUIMonths.classList.contains("hidden");

  const isDisplayingYears = !displayUIYears.classList.contains("hidden");

  if (isDisplayingDates) {
    displayDates(newDate.getMonth(), newDate.getFullYear());
    return;
  }

  if (isDisplayingMonths || isDisplayingYears) {
    document.querySelector(".weeks").style.display = "";
    displayUIDate.classList.remove("hidden");
    displayUIMonths.classList.add("hidden");
    displayUIYears.classList.add("hidden");

    currentMonth = newDate.getMonth();
    currentYear = newDate.getFullYear();
    displayDates(currentMonth, currentYear);
  }
}

function updateDateInfo(value) {
  const isDisplayingDates = !displayUIDate.classList.contains("hidden");

  const isDisplayingMonths = !displayUIMonths.classList.contains("hidden");

  const isDisplayingYears = !displayUIYears.classList.contains("hidden");

  if (isDisplayingDates) {
    if (value > 0) {
      currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      currentYear += currentMonth === 0 ? 1 : 0;
    } else {
      currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      currentYear -= currentMonth === 11 ? 1 : 0;
    }
    displayDates(currentMonth, currentYear);
  } else if (isDisplayingMonths) {
    currentYear += value;
    displayMonths(currentMonth, currentYear);
  } else if (isDisplayingYears) {
    currentYear += value * 11;
    displayYears(currentYear);
  }
}

function showHideCalendar() {
  calendarVisible = !calendarVisible;
  console.log(+calendarVisible);

  toggleIcon.classList.toggle("rotate-icon", !calendarVisible);
  if (!calendarVisible) {
    hiddenMain.style.display = "none";
    console.log(+!calendarVisible);
  } else {
    hiddenMain.style.display = "";
    displayUIDate.classList.remove("hidden");
    displayUIMonths.classList.add("hidden");
    displayUIYears.classList.add("hidden");
    displayDates(currentMonth, currentYear);
  }
}

function displayMinutes() {
  minuteDisplay.textContent = minutes;
}

displayMinutes();

const updateMinute = (value) => {
  minutes += value;
  console.log(+value);
  minutes = Math.max(5, Math.min(240, minutes));
  minuteDisplay.textContent = minutes;
  console.log(+minutes);
  sub.disabled = minutes === 5;
  add.disabled = minutes === 240;
};

const focusMinute = () => {
  timerPopup.style.display = "flex";
  timer = minutes * 60;
  updateTimerDisplay();
  startTimer();
};

const removePopup = () => {
  clearInterval(timerInterval);
  timerPopup.style.display = "none";
};

const updateTimerDisplay = () => {
  const minutesRemaining = Math.floor(timer / 60);
  const secondsRemaining = timer % 60;
  timerDisplay.textContent = `${minutesRemaining}:${secondsRemaining
    .toString()
    .padStart(2, "0")}`;
};

const startTimer = () => {
  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      removePopup();
    }
  }, 1000);
};
