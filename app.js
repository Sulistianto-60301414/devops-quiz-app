let allQuestions = [];
let filteredQuestions = [];
let currentIndex = 0;
let currentTopic = "all";
let answered = false;

const topicSelect = document.getElementById("topicSelect");
const startBtn = document.getElementById("startBtn");

const quizArea = document.getElementById("quizArea");
const topicTitle = document.getElementById("topicTitle");
const questionText = document.getElementById("questionText");
const optionsArea = document.getElementById("optionsArea");
const feedbackArea = document.getElementById("feedbackArea");

const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

function loadQuestions() {
  return fetch("data/questions.json")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      allQuestions = data;
      populateTopics();
    })
    .catch(function () {
      feedbackArea.textContent = "Error loading questions.json";
      quizArea.classList.remove("hidden");
    });
}

function populateTopics() {
  const topics = {};
  for (let i = 0; i < allQuestions.length; i++) {
    topics[allQuestions[i].topic] = true;
  }

  // reset dropdown (keep "All Topics")
  while (topicSelect.options.length > 1) {
    topicSelect.remove(1);
  }

  for (const t in topics) {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    topicSelect.appendChild(opt);
  }
}

function startQuiz() {
  currentTopic = topicSelect.value;
  filteredQuestions = [];

  if (currentTopic === "all") {
    filteredQuestions = allQuestions;
  } else {
    for (let i = 0; i < allQuestions.length; i++) {
      if (allQuestions[i].topic === currentTopic) {
        filteredQuestions.push(allQuestions[i]);
      }
    }
  }

  currentIndex = 0;
  answered = false;

  quizArea.classList.remove("hidden");
  restartBtn.classList.add("hidden");
  renderQuestion();
}

function renderQuestion() {
  feedbackArea.textContent = "";
  optionsArea.innerHTML = "";
  nextBtn.classList.add("hidden");
  answered = false;

  if (filteredQuestions.length === 0) {
    topicTitle.textContent = "No questions found";
    questionText.textContent = "Try another topic.";
    restartBtn.classList.remove("hidden");
    return;
  }

  if (currentIndex >= filteredQuestions.length) {
    topicTitle.textContent = "Finished!";
    questionText.textContent = "You reached the end of this topic.";
    restartBtn.classList.remove("hidden");
    return;
  }

  const q = filteredQuestions[currentIndex];
  topicTitle.textContent = "Topic: " + q.topic + " (" + q.id + ")";
  questionText.textContent = q.question;

  for (let i = 0; i < q.options.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = q.options[i];

    btn.addEventListener("click", function () {
      checkAnswer(i);
    });

    optionsArea.appendChild(btn);
  }
}

function checkAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = filteredQuestions[currentIndex];
  const correct = (selectedIndex === q.answerIndex);

  if (correct) {
    feedbackArea.textContent = "✅ Correct! " + q.explanation;
  } else {
    const correctText = q.options[q.answerIndex];
    feedbackArea.textContent = "❌ Wrong. Correct answer: " + correctText + ". " + q.explanation;
  }

  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentIndex += 1;
  renderQuestion();
}

function restartQuiz() {
  quizArea.classList.add("hidden");
  feedbackArea.textContent = "";
  optionsArea.innerHTML = "";
}

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

loadQuestions();