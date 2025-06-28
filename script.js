// Quiz data (partial example, extend as needed)
const quizzes = {
    6: {
        math: [
            { title: "Basic Arithmetic", questions: [
                { q: "What is 5 + 3?", options: ["7", "8", "9", "10"], answer: "8" },
                { q: "What is 10 - 4?", options: ["5", "6", "7", "8"], answer: "6" }
            ]},
            { title: "Fractions Intro", questions: [
                { q: "What is 1/2 of 10?", options: ["4", "5", "6", "7"], answer: "5" },
                { q: "What is 1/4 of 8?", options: ["1", "2", "3", "4"], answer: "2" }
            ]}
        ],
        science: [
            { title: "Living Things", questions: [
                { q: "What do plants need to grow?", options: ["Water", "Sand", "Stone", "Metal"], answer: "Water" },
                { q: "What gas do plants release?", options: ["Oxygen", "Carbon", "Nitrogen", "Hydrogen"], answer: "Oxygen" }
            ]},
            { title: "Earth and Space", questions: [
                { q: "What is the closest star?", options: ["Mars", "Sun", "Moon", "Jupiter"], answer: "Sun" },
                { q: "How many planets in our solar system?", options: ["7", "8", "9", "10"], answer: "8" }
            ]}
        ],
        english: [
            { title: "Vocabulary Basics", questions: [
                { q: "What does 'happy' mean?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: "Joyful" },
                { q: "What is a synonym for 'big'?", options: ["Small", "Large", "Tiny", "Short"], answer: "Large" }
            ]},
            { title: "Grammar Intro", questions: [
                { q: "Which is a noun?", options: ["Run", "Dog", "Jump", "Sing"], answer: "Dog" },
                { q: "What is a sentence?", options: ["Word", "Phrase with verb", "Letter", "Number"], answer: "Phrase with verb" }
            ]}
        ]
    },
    7: {
        math: [
            { title: "Algebra Basics", questions: [
                { q: "Solve: x + 3 = 7", options: ["4", "5", "6", "7"], answer: "4" },
                { q: "What is 2x = 10?", options: ["4", "5", "6", "7"], answer: "5" }
            ]},
            { title: "Geometry Shapes", questions: [
                { q: "What is the area of a 3x4 rectangle?", options: ["10", "12", "14", "16"], answer: "12" },
                { q: "How many degrees in a triangle?", options: ["180", "270", "360", "450"], answer: "180" }
            ]}
        ],
        science: [
            { title: "Ecosystems", questions: [
                { q: "What do animals eat in a food chain?", options: ["Sun", "Plants", "Rocks", "Air"], answer: "Plants" },
                { q: "What is a producer?", options: ["Lion", "Grass", "Eagle", "Fish"], answer: "Grass" }
            ]},
            { title: "Forces and Motion", questions: [
                { q: "What makes things move?", options: ["Force", "Color", "Sound", "Light"], answer: "Force" },
                { q: "What opposes motion?", options: ["Gravity", "Friction", "Speed", "Energy"], answer: "Friction" }
            ]}
        ],
        english: [
            { title: "Sentence Structure", questions: [
                { q: "Which is a complete sentence?", options: ["Run fast", "The dog barks", "Happy child", "Big house"], answer: "The dog barks" },
                { q: "What is a subject?", options: ["Verb", "Noun", "Adjective", "Adverb"], answer: "Noun" }
            ]},
            { title: "Reading Skills", questions: [
                { q: "What is the main idea?", options: ["Detail", "Topic", "Word", "Sentence"], answer: "Topic" },
                { q: "What supports the main idea?", options: ["Title", "Details", "Picture", "Page"], answer: "Details" }
            ]}
        ]
    },
    11: {
        math: [
            { title: "Algebra Advanced", questions: [
                { q: "Solve: 2x² - 8 = 0", options: ["2, -2", "4, -4", "1, -1", "3, -3"], answer: "2, -2" },
                { q: "What is the discriminant of x² - 5x + 6?", options: ["1", "5", "25", "49"], answer: "1" }
            ]},
            { title: "Trigonometry Basics", questions: [
                { q: "What is sin(30°)?", options: ["0.5", "0.707", "1", "0"], answer: "0.5" },
                { q: "What is cos(60°)?", options: ["0.5", "0.707", "1", "0"], answer: "0.5" }
            ]}
        ],
        science: [
            { title: "Physics Mechanics", questions: [
                { q: "What is the unit of force?", options: ["kg", "m/s", "N", "J"], answer: "N" },
                { q: "What is acceleration due to gravity?", options: ["9.8 m/s²", "10 m/s²", "8 m/s²", "12 m/s²"], answer: "9.8 m/s²" }
            ]},
            { title: "Chemistry Reactions", questions: [
                { q: "What is a catalyst?", options: ["Speeds reaction", "Slows reaction", "Stops reaction", "No effect"], answer: "Speeds reaction" },
                { q: "What gas is produced by acid + metal?", options: ["O₂", "H₂", "CO₂", "N₂"], answer: "H₂" }
            ]}
        ],
        english: [
            { title: "Advanced Grammar", questions: [
                { q: "Which is a gerund?", options: ["Running", "Run", "Ran", "Runner"], answer: "Running" },
                { q: "What is a participle?", options: ["Singing", "Sing", "Song", "Sung"], answer: "Sung" }
            ]},
            { title: "Literature Analysis", questions: [
                { q: "What is a theme?", options: ["Plot", "Main idea", "Character", "Setting"], answer: "Main idea" },
                { q: "What is a metaphor?", options: ["Comparison with like", "Direct comparison", "Sound device", "Rhyme"], answer: "Direct comparison" }
            ]}
        ]
    },
    12: {
        math: [
            { title: "Calculus Advanced", questions: [
                { q: "What is the derivative of sin(x)?", options: ["cos(x)", "sin(x)", "-cos(x)", "1"], answer: "cos(x)" },
                { q: "What is ∫(x³) dx?", options: ["x⁴/4 + C", "x⁴ + C", "x³/3 + C", "x²/2 + C"], answer: "x⁴/4 + C" }
            ]},
            { title: "Probability and Statistics", questions: [
                { q: "What is P(A) if A occurs 3/10 times?", options: ["0.3", "0.4", "0.5", "0.6"], answer: "0.3" },
                { q: "What is P(A or B) if P(A)=0.4, P(B)=0.3, P(A and B)=0.1?", options: ["0.6", "0.7", "0.8", "0.9"], answer: "0.6" }
            ]}
        ],
        science: [
            { title: "Physics Waves", questions: [
                { q: "What is the speed of sound (approx)?", options: ["340 m/s", "300 m/s", "400 m/s", "500 m/s"], answer: "340 m/s" },
                { q: "What is wavelength × frequency?", options: ["Speed", "Energy", "Amplitude", "Period"], answer: "Speed" }
            ]},
            { title: "Chemistry Organic", questions: [
                { q: "What is the functional group of alcohol?", options: ["-OH", "-COOH", "-CHO", "-NH₂"], answer: "-OH" },
                { q: "What is C₂H₅OH?", options: ["Ethanol", "Methanol", "Propanol", "Butanol"], answer: "Ethanol" }
            ]}
        ],
        english: [
            { title: "Critical Analysis", questions: [
                { q: "What is a thesis?", options: ["Conclusion", "Main argument", "Evidence", "Summary"], answer: "Main argument" },
                { q: "What is a foil character?", options: ["Hero", "Contrast to main", "Villain", "Narrator"], answer: "Contrast to main" }
            ]},
            { title: "Essay Writing", questions: [
                { q: "What is an introduction?", options: ["End", "Start with thesis", "Middle", "Conclusion"], answer: "Start with thesis" },
                { q: "What supports an argument?", options: ["Opinion", "Evidence", "Guess", "Story"], answer: "Evidence" }
            ]}
        ]
    }
};

// Function to populate quiz options
function loadQuizzes() {
    const classSelect = document.getElementById('class-select');
    const subjectSelect = document.getElementById('subject-select');
    const quizSelect = document.getElementById('quiz-select');
    const quizContainer = document.getElementById('quiz-container');

    const classValue = classSelect.value;
    const subjectValue = subjectSelect.value;

    quizSelect.innerHTML = '<option value="">Select Quiz</option>';
    quizSelect.disabled = true;
    quizContainer.style.display = 'none';

    if (classValue && subjectValue && quizzes[classValue] && quizzes[classValue][subjectValue]) {
        quizzes[classValue][subjectValue].forEach(quiz => {
            const option = document.createElement('option');
            option.value = quiz.title;
            option.textContent = quiz.title;
            quizSelect.appendChild(option);
        });
        quizSelect.disabled = false;
    }
}

// Function to load and display the selected quiz
function loadQuiz() {
    const classSelect = document.getElementById('class-select');
    const subjectSelect = document.getElementById('subject-select');
    const quizSelect = document.getElementById('quiz-select');
    const quizTitle = document.getElementById('quiz-title');
    const questionsDiv = document.getElementById('questions');
    const quizContainer = document.getElementById('quiz-container');
    const resultDiv = document.getElementById('result');

    const classValue = classSelect.value;
    const subjectValue = subjectSelect.value;
    const quizTitleValue = quizSelect.value;

    if (classValue && subjectValue && quizTitleValue && quizzes[classValue] && quizzes[classValue][subjectValue]) {
        const selectedQuiz = quizzes[classValue][subjectValue].find(q => q.title === quizTitleValue);
        if (selectedQuiz) {
            quizTitle.textContent = selectedQuiz.title;
            questionsDiv.innerHTML = '';
            selectedQuiz.questions.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';
                questionDiv.innerHTML = `
                    <p>${index + 1}. ${q.q}</p>
                    ${q.options.map(opt => `
                        <label><input type="radio" name="question${index}" value="${opt}" required> ${opt}</label><br>
                    `).join('')}
                `;
                questionsDiv.appendChild(questionDiv);
            });
            quizContainer.style.display = 'block';
            resultDiv.style.display = 'none';
        }
    }
}

// Handle quiz submission
document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const questionsDiv = document.getElementById('questions');
    const resultDiv = document.getElementById('result');
    const scoreP = document.getElementById('score');
    const feedbackP = document.getElementById('feedback');
    const tryAgainBtn = document.getElementById('try-again-btn');

    let score = 0;
    const totalQuestions = questionsDiv.getElementsByClassName('question').length;

    questionsDiv.querySelectorAll('.question').forEach((qDiv, index) => {
        const selectedOption = qDiv.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            const answer = quizzes[document.getElementById('class-select').value][document.getElementById('subject-select').value]
                .find(q => q.title === document.getElementById('quiz-select').value).questions[index].answer;
            if (selectedOption.value === answer) score++;
        }
    });

    scoreP.textContent = `Your Score: ${score} out of ${totalQuestions} (${((score / totalQuestions) * 100).toFixed(2)}%)`;
    feedbackP.textContent = score === totalQuestions ? "Excellent! Perfect score!" : score > totalQuestions / 2 ? "Good job! Keep practicing." : "Needs improvement. Try again!";
    resultDiv.style.display = 'block';
    tryAgainBtn.style.display = 'inline-block';
    this.style.display = 'none';
});
