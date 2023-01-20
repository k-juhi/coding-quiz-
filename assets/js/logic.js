var currentTime = 60;
var intervalId;
var currentQuestion = 0;
var wrongAnswerSound = new Audio("./assets/sfx/incorrect.wav");
var rightAnswerSound = new Audio("./assets/sfx/correct.wav")

function startTimer() {
  intervalId = setInterval(countdown, 1000);
  displayQuestion();
}

function countdown() {
  currentTime--;
  document.getElementById("time-left").innerHTML = currentTime;

  if (currentTime === 0) {
    clearInterval(intervalId);
    alert("Time's up!");
    saveScore();
  }
}

function displayQuestion() {
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("option0").innerHTML = questions[currentQuestion].options[0];
    document.getElementById("option1").innerHTML = questions[currentQuestion].options[1];
    document.getElementById("option2").innerHTML = questions[currentQuestion].options[2];
    document.getElementById("option3").innerHTML = questions[currentQuestion].options[3];
  }
  

  function checkAnswer(index) {
    if (index === questions[currentQuestion].correctOption) {
      // correct answer
      rightAnswerSound.play()
    } else {
      currentTime -= 10;
      document.getElementById("time-left").innerHTML = currentTime;
      wrongAnswerSound.play();
    }
    currentQuestion++;
    if (currentQuestion === questions.length) {
      clearInterval(intervalId);
      saveScore();
    } else {
      displayQuestion();
    }
  }
  

function resetTimer() {
    currentTime = 60;
    document.getElementById("time-left").innerHTML = currentTime;
  }
  

function saveScore() {
  var initials = prompt("Enter your initials:");
  var score = currentTime;

  localStorage.setItem(initials, score);
  alert("Score saved!");
  resetTimer()
}

function viewHighscores() {
  var highscores = "";
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    highscores += key + ": " + value + "<br>";
  }
  document.getElementById("highscores").innerHTML = highscores;
}
