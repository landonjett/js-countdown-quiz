// Quiz questions and answers
const questions = [
  {
    question: "What is JavaScript?",
    answers: [
      "A programming language",
      "A type of coffee",
      "A dinosaur",
      "A fruit"
    ],
    correctAnswer: "A programming language"
  },

  {
  question: "What keyword is used to declare a variable in JavaScript?",
  answers: [
      "var",
      "int",
      "string",
      "let"],
      correctAnswer: "var"},

      {
        question: "Which statement is used to execute a block of code repeatedly?",
        answers: [
            "if",
            "for",
            "switch",
            "do-while"],
            correctAnswer: "for"},

            {
                question: "How do you comment a single line in JavaScript?",
                answers: [
                    "/* comment */",
                    "// comment",
                    "<!-- comment -->",
                    "/comment/"],
                    correctAnswer: "// comment"},
    
                    {
                        question: "How do you declare a function in JavaScript?",
                        answers: [
                            "create function myFunction()",
                            "function: myFunction()",
                            "function myFunction()",
                            "declare function myFunction()"],
                            correctAnswer: "function myFunction()"},
]

// Global variables
let currentQuestionIndex = 0;
let timer;
let timeRemaining = 30; // Initial time in seconds
const timeDisplay = document.getElementById("time");
const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const startButton = document.getElementById("start-button");
const resultDisplay = document.getElementById("result");
const scoreForm = document.getElementById("score-form");
const initialsInput = document.getElementById("initials");
const scoreList = document.getElementById("score-list");
const highScoresContainer = document.getElementById("high-scores");
const clearScoresButton = document.getElementById("clear-scores");

// Event listeners
startButton.addEventListener("click", startQuiz);
answerButtons.addEventListener("click", selectAnswer);
scoreForm.addEventListener("submit", saveScore);
clearScoresButton.addEventListener("click", clearScores);

// Function to start the quiz
function startQuiz() {
  startButton.classList.add("hide");
  showQuestion(questions[currentQuestionIndex]);
  timer = setInterval(updateTimer, 1000);
}
// Function to display a question
function showQuestion(question) {
  questionContainer.textContent = question.question;
  answerButtons.innerHTML = "";
  question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    answerButtons.appendChild(button);
  });
}

// Function to update the timer
function updateTimer() {
  timeDisplay.textContent = timeRemaining;
  timeRemaining--;

  if (timeRemaining < 0) {
    endQuiz();
  }
}

 // Function to handle answer selection
 function selectAnswer(event) {
  const selectedAnswer = event.target.textContent;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedAnswer === correctAnswer) {
    resultDisplay.textContent = "Correct!";
  } else {
    resultDisplay.textContent = "Incorrect!";
    timeRemaining -= 10; // Subtract 10 seconds for incorrect answer
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
  } else {
    endQuiz();
  }
}
 // Function to end the quiz
 function endQuiz() {
  clearInterval(timer);
  questionContainer.textContent = "Quiz Over!";
  answerButtons.innerHTML = "";
  resultDisplay.textContent = "";
  scoreForm.classList.remove("hide");
  highScoresContainer.classList.remove("hide");
  restartButton.classList.remove("hide");
}

 // Function to save the score
 function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value.toUpperCase();
  const score = timeRemaining;

  // Save score to local storage or any other desired storage method
  // You can implement this part based on your requirements

  // Display the scores
  const scoreItem = document.createElement("li");
  scoreItem.textContent = `${initials}: ${score}`;
  scoreList.appendChild(scoreItem);

  // Hide the form after saving the score
  scoreForm.classList.add("hide");
}

// Function to clear high scores
function clearScores() {
  // Clear scores from local storage or any other storage method
  // You can implement this part based on your requirements

  // Clear the displayed scores
  scoreList.innerHTML = "";
}

const restartButton = document.createElement("button");
restartButton.textContent = "Restart Quiz";
restartButton.classList.add("btn", "hide");
restartButton.addEventListener("click", restartQuiz);
document.getElementById("quiz-container").appendChild(restartButton);

function restartQuiz() {
  currentQuestionIndex = 0;
  timeRemaining = 30; // Reset the timer
  showQuestion(questions[currentQuestionIndex]);
  resultDisplay.textContent = "";
  scoreForm.classList.add("hide");
  highScoresContainer.classList.add("hide");
  restartButton.classList.add("hide");
  startQuiz();
}

