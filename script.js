const messageContainer = document.querySelector("#dDayMessage");
const container = document.querySelector("#dDayContainer");
const savedDate = localStorage.getItem("saved-date");

const intervalIdArr = [];

const dataFormMaker = () => {
  const inputYear = document.querySelector("#targetYearInput").value;
  const inputMonth = document.querySelector("#targetMonthInput").value;
  const inputDate = document.querySelector("#targetDateInput").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
  // console.log(inputYear, inputMonth, inputDate);
};

const counterMake = (data) => {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data).setHours(0, 0, 0, 0);
  const remaining = (targetDate - nowDate) / 1000;
  if (remaining <= 0) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료 되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(remaining)) {
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor(remaining / 3600) % 24,
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);

  const format = (time) => {
    if (time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }
};

const starter = (targetDateInput) => {
  if (!targetDateInput) {
    targetDateInput = dataFormMaker();
  }
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  counterMake(targetDateInput);
  const intervalId = setInterval(() => {
    counterMake(targetDateInput);
  }, 1000);
  intervalIdArr.push(intervalId);
};

const setClearInterval = () => {
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = () => {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해주세요!</h3>";
  messageContainer.style.display = "flex";
  setClearInterval();
  localStorage.removeItem("saved-date");
};

if (savedDate) {
  starter(savedDate);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해주세요!</h3>";
}
