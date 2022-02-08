const startBtn = document.querySelector(".start__btn"),
  info = document.querySelector(".info-container"),
  quitBtn = document.querySelectorAll(".btn_quit"),
  restartBtn = document.querySelector(".info__btn-start"),
  resultBox = document.querySelector(".result-container"),
  nextBtn = document.querySelector(".quiz__btn-next"),
  escapeBtn = document.querySelector(".quiz__btn-esc");
quizBox = document.querySelector(".quiz-container");
header = document.querySelector(".quiz-container header");

startBtn.addEventListener("click", () => {
  info.classList.add("active-info");
});

restartBtn.addEventListener("click", () => {
  info.classList.remove("active-info");
  quizBox.classList.add("active-info");
  showCardInfo(0);
  idleLogout();
});

let questionCounter = 0;
let correctAns = 0;
let timerSec = 15;
let quizTimerId;
let timerLineId;
let timerLineValue = 0;
let timerLineWidth = quizBox.getBoundingClientRect().width;

function showCardInfo(index) {
  setupTimer(timerSec);
  startTimerLine(timerLineValue, timerLineWidth);
  const item = questions[index];
  const question = item.question;
  const options = item.options;
  const answer = item.answer;
  showQuestion(question);

  showOptionsList(answer, options);

  quizFooterInfo();
  disableBtn();

  const optionChoice = [...document.querySelectorAll(".quiz__option")];

  const wrongIcon = `<div class=" quiz__icon quiz__icon_cross"><i class="fas fa-times"></i></div>`;

  optionChoice.forEach((option) => {
    option.addEventListener("click", (e) => {
      const target = e.currentTarget;
      const correctOption = findCorrectOptionElement();
      if (
        target.textContent === answer ||
        target.firstElementChild.textContent === answer
      ) {
        correctAns++;
        option.classList.add("correct");
        showIcons();
      } else {
        option.innerHTML += wrongIcon;
        option.classList.add("wrong");
        showIcons();
        correctOption.classList.add("correct");
      }
      enableBtn();
      disableOptions(optionChoice);
      clearInterval(quizTimerId);
      clearInterval(timerLineId);
    });
  });
}

function showQuestion(question) {
  const questionDOM = document.querySelector(".quiz__question");
  const queText = `${question}`;
  questionDOM.textContent = queText;
}

function showOptionsList(answer, options) {
  const optionsDOM = document.querySelector(".quiz__options");
  let optionsList = "";
  optionsList = options
    .map((option) => {
      if (option === answer) {
        return `<div class="quiz__option">
              <span>${option}</span>
              <div class="quiz__icon quiz__icon_tick"><i class="fas fa-check"></i></div>
          </div>`;
      } else {
        return `<div class="quiz__option">
          <span>${option}</span>
          </div>`;
      }
    })
    .join("");
  optionsDOM.innerHTML = optionsList;
}

function quizFooterInfo() {
  const currentOption = document.querySelector(".quiz__num-current");
  const totalNumOption = document.querySelector(".quiz__num-total");
  currentOption.textContent = questionCounter + 1;
  totalNumOption.textContent = questions.length;
}

function showScore() {
  const userScore = document.querySelector(".result__score-correct");
  const totalScore = document.querySelector(".result__score-total");
  userScore.textContent = correctAns;
  totalScore.textContent = questions.length;
  showScoreMessage();
}

function showScoreMessage() {
  const messageDOM = document.querySelector(".result__score-message");
  let message = "";
  let winscore = Math.floor((correctAns / questions.length) * 100);
  if (winscore >= 81) {
    message = `Perfect!🎉 It is ${winscore}%! `;
  } else if (winscore >= 51 && winscore < 81) {
    message = `Not bad! It is ${winscore}%! `;
  } else {
    message = `You can do better! It is ${winscore}%! `;
  }
  messageDOM.textContent = message;
}

function findCorrectOptionElement() {
  const correctOption =
    document.querySelector(".quiz__icon_tick").parentElement;

  return correctOption;
}

function disableBtn() {
  nextBtn.classList.add("btn-disabled");
  nextBtn.disabled = true;
}
function enableBtn() {
  nextBtn.classList.remove("btn-disabled");
  nextBtn.disabled = false;
}
function disableOptions(optionChoiceArr) {
  optionChoiceArr.forEach((option) => {
    option.classList.add("answered");
  });
}
function showIcons() {
  const icons = document.querySelectorAll(".quiz__icon");
  icons.forEach((icon) => {
    icon.classList.add("display-icon");
  });
}

function getTimeDiff(deadline) {
  const timeNow = Date.parse(new Date());
  const timeDiff = (deadline - timeNow) / 1000;
  return timeDiff;
}

function setupTimer(sec) {
  const timerDOM = document.querySelector(".quiz__timer-sec");
  const deadline = Date.parse(new Date()) + sec * 1000;
  updateTimer();
  function updateTimer() {
    const timeDiff = getTimeDiff(deadline);
    timerDOM.textContent = timeDiff;
    if (timeDiff <= 0) {
      clearInterval(quizTimerId);
      enableBtn();
      const optionChoice = [...document.querySelectorAll(".quiz__option")];
      disableOptions(optionChoice);
      showIcons();
      correctOption = findCorrectOptionElement();
      correctOption.classList.add("correct");
    }
  }

  quizTimerId = setInterval(updateTimer, 1000);
}

nextBtn.addEventListener("click", () => {
  questionCounter++;
  clearInterval(timerLineId);
  if (questionCounter < questions.length) {
    showCardInfo(questionCounter);
  } else if (questionCounter === questions.length) {
    resultBox.classList.add("active-info");
    quizBox.classList.remove("active-info");
    showScore();
    correctAns = 0;
    questionCounter = 0;
    clearInterval(quizTimerId);
    clearInterval(timerLineId);
  }
});

escapeBtn.onclick = () => {
  window.location.reload();
};

quitBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.reload(); //wont work in code pen
  });
});

const replayBtn = document.querySelector(".result__btn-replay");

replayBtn.addEventListener("click", () => {
  resultBox.classList.remove("active-info");
  info.classList.add("active-info");
});

const timerLine = document.querySelector(".quiz__timer-line");
function startTimerLine(time, width) {
  let speed = 0;
  if (width >= 540) {
    speed = 28;
  } else {
    speed = 44;
  }

  timerLineId = setInterval(timer, speed);
  function timer() {
    time++;
    timerLine.style.width = time + "px";
    if (time > width) {
      clearInterval(timerLineId);
    }
  }
}

function idleLogout() {
  var t,
    timeout = 300000;

  function resetTimer() {
    console.log("reset: " + new Date().toLocaleString());
    if (t) {
      window.clearTimeout(t);
    }
    t = window.setTimeout(logout, timeout);
  }

  function logout() {
    console.log("done: " + new Date().toLocaleString());
    window.location.reload();
  }
  resetTimer();

  ["click", "mousemove", "keypress"].forEach(function (name) {
    console.log(name);
    document.addEventListener(name, resetTimer);
  });
}
