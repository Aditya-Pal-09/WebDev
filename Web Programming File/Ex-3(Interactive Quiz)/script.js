const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks and Text Markup Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "Java", "CSS", "Python"],
        answer: 2
    },
    {
        question: "Which tag creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "Which language runs in the browser?",
        options: ["Java", "C++", "Python", "JavaScript"],
        answer: 3
    },
    {
        question: "CSS comments use which syntax?",
        options: ["//", "#", "/* */", "<!-- -->"],
        answer: 2
    },
    {
        question: "Which keyword declares a variable in JS?",
        options: ["var", "int", "string", "define"],
        answer: 0
    },
    {
        question: "Which is a semantic HTML tag?",
        options: ["<div>", "<span>", "<section>", "<b>"],
        answer: 2
    },
    {
        question: "CSS property for text size?",
        options: ["font-style", "text-size", "font-size", "size"],
        answer: 2
    },
    {
        question: "Java was developed by?",
        options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
        answer: 1
    },
    {
        question: "Function keyword in JavaScript?",
        options: ["method", "function", "def", "func"],
        answer: 1
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionEl = document.getElementById("question");
const options = document.querySelectorAll("input[name='option']");
const nextBtn = document.getElementById("nextBtn");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const scoreText = document.getElementById("scoreText");
const feedback = document.getElementById("feedback");
const restartBtn = document.getElementById("restartBtn");
const reviewDiv = document.getElementById("review");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
    const q = quizData[currentQuestion];

    questionEl.textContent = `Q${currentQuestion + 1}. ${q.question}`;

    q.options.forEach((opt, i) => {
        document.getElementById("opt" + i).textContent = opt;
        options[i].checked = false;
    });

    progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;

    nextBtn.textContent =
        currentQuestion === quizData.length - 1
            ? "Submit Quiz"
            : "Next Question";
}

function getSelected() {
    let selected = null;
    options.forEach(opt => {
        if (opt.checked) {
            selected = parseInt(opt.value);
        }
    });
    return selected;
}

nextBtn.addEventListener("click", () => {
    const selected = getSelected();

    if (selected === null) {
        alert("Please select an option before continuing.");
        return;
    }

    userAnswers.push(selected);

    if (selected === quizData[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    progressBar.style.width = "100%";

    scoreText.textContent = `Your Score: ${score} / ${quizData.length}`;

    if (score >= 8) {
        feedback.textContent = "Outstanding Performance! 🚀";
    } else if (score >= 5) {
        feedback.textContent = "Great Job! Keep Improving 👍";
    } else {
        feedback.textContent = "Keep Practicing 💡";
    }

    reviewDiv.innerHTML = "";

    quizData.forEach((q, i) => {
        const div = document.createElement("div");
        div.classList.add("review-item");

        div.innerHTML = `
            <p><strong>Q${i + 1}. ${q.question}</strong></p>
            <p class="${userAnswers[i] === q.answer ? "correct" : "wrong"}">
                Your Answer: ${q.options[userAnswers[i]]}
            </p>
            <p class="correct">
                Correct Answer: ${q.options[q.answer]}
            </p>
        `;

        reviewDiv.appendChild(div);
    });
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    loadQuestion();
});

loadQuestion();