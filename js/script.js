import questions from "./questions.js";

const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const exitBtn = document.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const optionList = document.querySelector(".option-list");
const resultBox = document.querySelector(".result-box");
// const timeLine = document.querySelector('header .time-line')
const timeText = document.querySelector(".timer .time-left__text");
const timeCount = document.querySelector(".timer .timer-sec");

startBtn.onclick = () => {
  infoBox.classList.add("activeInfo");
};

exitBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
};

continueBtn.onclick = () => {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.add("activeQuiz");
  showQuestions(0);
  queCounter(1);
  startTimer(300);
  // startTimeLine(0);
};

let timeValue = 300;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
// let counterLine;
// let widthValue = 0;

const restartQuiz = resultBox.querySelector(".buttons .restart");
const quitQuiz = resultBox.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
  quizBox.classList.add("activeQuiz");
  resultBox.classList.remove("activeResult");
  timeValue = 300;
  queCount = 0;
  queNumb = 1;
  userScore = 0;
  // widthValue = 0;
  showQuestions(queCount);
  queCounter(queNumb);
  clearInterval(counter);
  // clearInterval(counterLine);
  startTimer(timeValue);
  // startTimeLine(widthValue);
  timeText.textContent = "Time left";
  nextBtn.classList.remove("show");
  escapeBtn.classList.remove("show");
};

quitQuiz.onclick = () => {
  window.location.reload();
};

const nextBtn = document.querySelector("footer .next-btn");
const escapeBtn = document.querySelector("footer .escape-btn");
const bottomQueCounter = document.querySelector("footer .total-que");
/////
escapeBtn.onclick = () => {
  window.location.reload();
};

nextBtn.onclick = () => {
  if (queCount < questions.length - 1) {
    queCount++;
    queNumb++;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    // clearInterval(counterLine)
    startTimer(timeValue);
    // startTimeLine(widthValue)
    timeText.textContent = "Time Left";
    nextBtn.classList.remove("show");
    escapeBtn.classList.remove("show");
  } else {
    clearInterval(counter);
    // clearInterval(counterLine)
    showResult();
  }
};

function showQuestions(index) {
  const queText = document.querySelector(".que-text");
  let queTag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";

  let optionTag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";

  queText.innerHTML = queTag;
  optionList.innerHTML = optionTag;

  const option = optionList.querySelectorAll(".option");

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon tick"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  // clearInterval(counterLine)
  let userAnsw = answer.textContent;
  let correctAnsw = questions[queCount].answer;
  const allOptions = optionList.children.length;

  if (userAnsw == correctAnsw) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
    //   console.log('Correct Answer');
    //   console.log("You correct answer = " + userScore);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    //   console.log('Wrong Anwser');

    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnsw) {
        optionList.children[i].setAttribute("class", "option correct");
        optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        //   console.log('Auto selected correct answer');
      }
    }
  }

  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }
  nextBtn.classList.add("show");
  escapeBtn.classList.add("show");
}

function showResult() {
  infoBox.classList.remove("activeInfo");
  quizBox.classList.remove("activeQuiz");
  resultBox.classList.add("activeResult");
  const scoreText = resultBox.querySelector(".score-text");
  let winscore = Math.floor((userScore / questions.length) * 100);
  if (winscore >= 81) {
    let scoreTag =
      "<span>and congrats! 🎉, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (winscore >= 51 && winscore < 81) {
    let scoreTag =
      "<span>and nice 😎, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>and sorry 😐, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      const allOptions = optionList.children.length;

      for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
      }
      window.location.reload();
    }
  }
}

function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottomQueCounter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
