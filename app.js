const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const answerButtonsElement = document.getElementById("answer-buttons");
const questionElement = document.getElementById("question");

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
    currentIndex++;
    setNextQuestion();
})

let shuffledQuestions, currentIndex;

const questions = [
    {
        question: "What is 2+2?",
        answers: [
            {answer: "4", correct: true},
            {answer: "3", correct: false},
            {answer: "45", correct: false},
            {answer: "22", correct: false}
        ]
    },
    {
        question: "Who is Faceless God?",
        answers: [
            {answer: "Nothing", correct: false},
            {answer: "Noone", correct: true},
            {answer: "Anyone", correct: false},
            {answer: "IDK", correct: false}
        ]
    }
]

function startGame() {
    questionContainerElement.classList.remove("hide");
    startBtn.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    setNextQuestion();
}

function setNextQuestion() {
    showQuestion(shuffledQuestions[currentIndex]);
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        let button = document.createElement("button");
        button.innerText = answer.answer;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button);
    })
}

function selectAnswer(e) {
    let selectedButton = e.target;
    let correct = selectedButton.dataset.correct;
    setStatus(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatus(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentIndex + 1) {
        nextBtn.classList.remove("hide");
    } else {
        startBtn.innerText = "Restart";
        startBtn.classList.remove("hide");
    }

}

function setStatus(element, correct) {
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function resetState() {
    document.body.classList.remove("correct");
    document.body.classList.remove("wrong");
    nextBtn.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    };
}
