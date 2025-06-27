const quizzes = {
    '6-math': {
        'quiz1': [
            { question: "What is 2 + 3?", options: ["4", "5", "6"], answer: "5" },
            { question: "What is 10 - 4?", options: ["5", "6", "7"], answer: "6" },
            { question: "What is 3 x 2?", options: ["5", "6", "7"], answer: "6" },
            { question: "What is 8 / 2?", options: ["3", "4", "5"], answer: "4" },
            { question: "What is 5 + 5?", options: ["9", "10", "11"], answer: "10" }
        ],
        'quiz2': [
            { question: "What is 7 + 8?", options: ["14", "15", "16"], answer: "15" },
            { question: "What is 12 - 5?", options: ["6", "7", "8"], answer: "7" },
            { question: "What is 4 x 3?", options: ["11", "12", "13"], answer: "12" },
            { question: "What is 20 / 5?", options: ["3", "4", "5"], answer: "4" },
            { question: "What is 9 + 6?", options: ["14", "15", "16"], answer: "15" }
        ]
    },
    '6-science': {
        'quiz1': [
            { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Kolkata"], answer: "Delhi" },
            { question: "What gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: "Carbon Dioxide" },
            { question: "What is H2O?", options: ["Oxygen", "Water", "Carbon"], answer: "Water" },
            { question: "What is the largest planet?", options: ["Earth", "Jupiter", "Mars"], answer: "Jupiter" },
            { question: "What is the boiling point of water?", options: ["90°C", "100°C", "110°C"], answer: "100°C" }
        ],
        'quiz2': [
            { question: "What is the freezing point of water?", options: ["0°C", "2°C", "5°C"], answer: "0°C" },
            { question: "What gas do humans breathe?", options: ["Nitrogen", "Oxygen", "Carbon Dioxide"], answer: "Oxygen" },
            { question: "What is the study of plants called?", options: ["Zoology", "Botany", "Ecology"], answer: "Botany" },
            { question: "What is the hardest natural substance?", options: ["Gold", "Diamond", "Iron"], answer: "Diamond" },
            { question: "What planet has rings?", options: ["Mars", "Saturn", "Venus"], answer: "Saturn" }
        ]
    },
    '7-math': {
        'quiz1': [
            { question: "What is 15 / 3?", options: ["4", "5", "6"], answer: "5" },
            { question: "What is 7 x 4?", options: ["26", "28", "30"], answer: "28" },
            { question: "What is 20 - 9?", options: ["10", "11", "12"], answer: "11" },
            { question: "What is 6 + 8?", options: ["13", "14", "15"], answer: "14" },
            { question: "What is 4 x 5?", options: ["18", "20", "22"], answer: "20" }
        ],
        'quiz2': [
            { question: "What is 25 - 10?", options: ["14", "15", "16"], answer: "15" },
            { question: "What is 8 x 3?", options: ["22", "24", "26"], answer: "24" },
            { question: "What is 18 / 3?", options: ["5", "6", "7"], answer: "6" },
            { question: "What is 9 + 7?", options: ["15", "16", "17"], answer: "16" },
            { question: "What is 12 - 4?", options: ["7", "8", "9"], answer: "8" }
        ]
    },
    '7-science': {
        'quiz1': [
            { question: "What is the main source of energy?", options: ["Moon", "Sun", "Stars"], answer: "Sun" },
            { question: "What is the smallest unit of life?", options: ["Cell", "Atom", "Molecule"], answer: "Cell" },
            { question: "What gas makes up most of the air?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide"], answer: "Nitrogen" },
            { question: "What is the study of plants called?", options: ["Zoology", "Botany", "Ecology"], answer: "Botany" },
            { question: "What is the freezing point of water?", options: ["0°C", "2°C", "5°C"], answer: "0°C" }
        ],
        'quiz2': [
            { question: "What is the study of animals called?", options: ["Botany", "Zoology", "Geology"], answer: "Zoology" },
            { question: "What is the process of water turning to ice?", options: ["Evaporation", "Condensation", "Freezing"], answer: "Freezing" },
            { question: "What gas is released during photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: "Oxygen" },
            { question: "What is the closest star to Earth?", options: ["Mars", "Sun", "Moon"], answer: "Sun" },
            { question: "What is the unit of temperature?", options: ["Meter", "Celsius", "Liter"], answer: "Celsius" }
        ]
    },
    '8-math': {
        'quiz1': [
            { question: "What is 25 / 5?", options: ["4", "5", "6"], answer: "5" },
            { question: "What is 9 x 3?", options: ["25", "27", "29"], answer: "27" },
            { question: "What is 15 - 7?", options: ["7", "8", "9"], answer: "8" },
            { question: "What is 12 + 6?", options: ["17", "18", "19"], answer: "18" },
            { question: "What is 7 x 7?", options: ["46", "49", "52"], answer: "49" }
        ],
        'quiz2': [
            { question: "What is 30 / 6?", options: ["4", "5", "6"], answer: "5" },
            { question: "What is 6 x 4?", options: ["22", "24", "26"], answer: "24" },
            { question: "What is 19 - 8?", options: ["10", "11", "12"], answer: "11" },
            { question: "What is 13 + 5?", options: ["17", "18", "19"], answer: "18" },
            { question: "What is 10 x 5?", options: ["45", "50", "55"], answer: "50" }
        ]
    },
    '8-science': {
        'quiz1': [
            { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter"], answer: "Mars" },
            { question: "What is the process of water turning into vapor?", options: ["Condensation", "Evaporation", "Precipitation"], answer: "Evaporation" },
            { question: "What is the hardest natural substance?", options: ["Gold", "Diamond", "Iron"], answer: "Diamond" },
            { question: "What gas do humans breathe?", options: ["Nitrogen", "Oxygen", "Carbon Dioxide"], answer: "Oxygen" },
            { question: "What is the study of rocks called?", options: ["Biology", "Geology", "Chemistry"], answer: "Geology" }
        ],
        'quiz2': [
            { question: "What is the study of weather called?", options: ["Meteorology", "Astronomy", "Oceanography"], answer: "Meteorology" },
            { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific"], answer: "Pacific" },
            { question: "What gas is most abundant in the atmosphere?", options: ["Oxygen", "Nitrogen", "Argon"], answer: "Nitrogen" },
            { question: "What is the boiling point of alcohol?", options: ["78°C", "80°C", "85°C"], answer: "78°C" },
            { question: "What is the study of stars called?", options: ["Geology", "Astronomy", "Biology"], answer: "Astronomy" }
        ]
    },
    '9-math': {
        'quiz1': [
            { question: "What is 50 / 10?", options: ["4", "5", "6"], answer: "5" },
            { question: "What is 8 x 6?", options: ["46", "48", "50"], answer: "48" },
            { question: "What is 25 - 13?", options: ["11", "12", "13"], answer: "12" },
            { question: "What is 15 + 7?", options: ["21", "22", "23"], answer: "22" },
            { question: "What is 9 x 9?", options: ["78", "81", "84"], answer: "81" }
        ],
        'quiz2': [
            { question: "What is 100 / 20?", options: ["4", "5", "6"], answer: "5" },
            { question: "What is 7 x 9?", options: ["60", "63", "66"], answer: "63" },
            { question: "What is 18 - 9?", options: ["8", "9", "10"], answer: "9" },
            { question: "What is 11 + 8?", options: ["18", "19", "20"], answer: "19" },
            { question: "What is 15 x 2?", options: ["28", "30", "32"], answer: "30" }
        ]
    },
    '9-science': {
        'quiz1': [
            { question: "What is the primary source of energy for Earth?", options: ["Moon", "Sun", "Wind"], answer: "Sun" },
            { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe"], answer: "Au" },
            { question: "What organ pumps blood?", options: ["Lungs", "Heart", "Kidney"], answer: "Heart" },
            { question: "What is the unit of force?", options: ["Watt", "Newton", "Joule"], answer: "Newton" },
            { question: "What is the largest organ in the human body?", options: ["Liver", "Skin", "Brain"], answer: "Skin" }
        ],
        'quiz2': [
            { question: "What is the chemical symbol for oxygen?", options: ["O", "Ox", "O2"], answer: "O" },
            { question: "What organ filters blood?", options: ["Liver", "Kidney", "Lungs"], answer: "Kidney" },
            { question: "What is the unit of energy?", options: ["Watt", "Joule", "Newton"], answer: "Joule" },
            { question: "What is the study of life called?", options: ["Physics", "Biology", "Chemistry"], answer: "Biology" },
            { question: "What planet is known for its blue color?", options: ["Mars", "Earth", "Neptune"], answer: "Earth" }
        ]
    },
    '10-math': {
        'quiz1': [
            { question: "What is 100 / 20?", options: ["4", "5", "6"], answer: "5" },
            { question: "What is 12 x 4?", options: ["46", "48", "50"], answer: "48" },
            { question: "What is 30 - 17?", options: ["12", "13", "14"], answer: "13" },
            { question: "What is 18 + 5?", options: ["22", "23", "24"], answer: "23" },
            { question: "What is 11 x 3?", options: ["31", "33", "35"], answer: "33" }
        ],
        'quiz2': [
            { question: "What is 50 / 10?", options: ["4", "5", "6"], answer: "5" },
            { question: "What is 9 x 5?", options: ["40", "45", "50"], answer: "45" },
            { question: "What is 25 - 12?", options: ["12", "13", "14"], answer: "13" },
            { question: "What is 16 + 7?", options: ["22", "23", "24"], answer: "23" },
            { question: "What is 6 x 6?", options: ["32", "36", "40"], answer: "36" }
        ]
    },
    '10-science': {
        'quiz1': [
            { question: "What is the chemical symbol for water?", options: ["CO2", "H2O", "O2"], answer: "H2O" },
            { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome"], answer: "Mitochondria" },
            { question: "What gas do plants release?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: "Oxygen" },
            { question: "What is the speed of sound approximately?", options: ["340 m/s", "300 m/s", "400 m/s"], answer: "340 m/s" },
            { question: "What is the study of electricity called?", options: ["Mechanics", "Electronics", "Physics"], answer: "Electronics" }
        ],
        'quiz2': [
            { question: "What is the chemical symbol for carbon dioxide?", options: ["CO", "CO2", "O2"], answer: "CO2" },
            { question: "What is the control center of the cell?", options: ["Mitochondria", "Nucleus", "Cytoplasm"], answer: "Nucleus" },
            { question: "What gas is used in balloons?", options: ["Helium", "Oxygen", "Nitrogen"], answer: "Helium" },
            { question: "What is the study of heat called?", options: ["Thermodynamics", "Optics", "Acoustics"], answer: "Thermodynamics" },
            { question: "What is the largest moon of Jupiter?", options: ["Titan", "Ganymede", "Europa"], answer: "Ganymede" }
        ]
    },
    '11-math': {
        'quiz1': [
            { question: "What is the value of π (approx)?", options: ["3.14", "3.15", "3.16"], answer: "3.14" },
            { question: "What is 25 x 4?", options: ["90", "100", "110"], answer: "100" },
            { question: "What is the square root of 144?", options: ["11", "12", "13"], answer: "12" },
            { question: "What is 50 / 5?", options: ["9", "10", "11"], answer: "10" },
            { question: "What is 7^2?", options: ["47", "49", "51"], answer: "49" }
        ],
        'quiz2': [
            { question: "What is the square root of 81?", options: ["8", "9", "10"], answer: "9" },
            { question: "What is 15 x 6?", options: ["85", "90", "95"], answer: "90" },
            { question: "What is 100 - 37?", options: ["62", "63", "64"], answer: "63" },
            { question: "What is 8^2?", options: ["60", "64", "68"], answer: "64" },
            { question: "What is 20 / 4?", options: ["4", "5", "6"], answer: "5" }
        ]
    },
    '11-physics': {
        'quiz1': [
            { question: "What is the unit of energy?", options: ["Watt", "Joule", "Newton"], answer: "Joule" },
            { question: "What is the acceleration due to gravity?", options: ["9.8 m/s²", "10 m/s²", "8 m/s²"], answer: "9.8 m/s²" },
            { question: "What is the speed of light?", options: ["3x10^8 m/s", "3x10^6 m/s", "3x10^10 m/s"], answer: "3x10^8 m/s" },
            { question: "What is Ohm's Law?", options: ["V=IR", "P=IV", "E=mc²"], answer: "V=IR" },
            { question: "What is the SI unit of power?", options: ["Joule", "Watt", "Newton"], answer: "Watt" }
        ],
        'quiz2': [
            { question: "What is the unit of force?", options: ["Joule", "Newton", "Watt"], answer: "Newton" },
            { question: "What is the formula for power?", options: ["P=IV", "V=IR", "E=mc²"], answer: "P=IV" },
            { question: "What is the SI unit of pressure?", options: ["Pascal", "Joule", "Volt"], answer: "Pascal" },
            { question: "What is the speed of sound in air?", options: ["330 m/s", "340 m/s", "350 m/s"], answer: "340 m/s" },
            { question: "What is the law of inertia?", options: ["Newton's 1st", "Newton's 2nd", "Newton's 3rd"], answer: "Newton's 1st" }
        ]
    },
    '12-math': {
        'quiz1': [
            { question: "What is the derivative of x^2?", options: ["2x", "x", "2"], answer: "2x" },
            { question: "What is 100 / 25?", options: ["3", "4", "5"], answer: "4" },
            { question: "What is the area of a circle with radius 7?", options: ["153.86", "154", "155"], answer: "153.86" },
            { question: "What is 8 x 8?", options: ["62", "64", "66"], answer: "64" },
            { question: "What is the integral of 2x?", options: ["x^2", "x^2 + C", "2x^2"], answer: "x^2 + C" }
        ],
        'quiz2': [
            { question: "What is the derivative of x^3?", options: ["3x^2", "2x^3", "x^3"], answer: "3x^2" },
            { question: "What is 50 x 3?", options: ["140", "150", "160"], answer: "150" },
            { question: "What is the area of a circle with radius 5?", options: ["75.36", "78.54", "80"], answer: "78.54" },
            { question: "What is 12 x 6?", options: ["68", "70", "72"], answer: "72" },
            { question: "What is the integral of 3x^2?", options: ["x^3", "x^3 + C", "3x^3"], answer: "x^3 + C" }
        ]
    },
    '12-physics': {
        'quiz1': [
            { question: "What is the unit of frequency?", options: ["Hertz", "Ohm", "Volt"], answer: "Hertz" },
            { question: "What is the law of conservation of energy?", options: ["Energy can be created", "Energy cannot be created or destroyed", "Energy is lost"], answer: "Energy cannot be created or destroyed" },
            { question: "What is the formula for kinetic energy?", options: ["mv", "½mv²", "mgh"], answer: "½mv²" },
            { question: "What is the SI unit of electric charge?", options: ["Ampere", "Coulomb", "Volt"], answer: "Coulomb" },
            { question: "What is the principle of superposition?", options: ["Sum of waves", "Single wave", "No interference"], answer: "Sum of waves" }
        ],
        'quiz2': [
            { question: "What is the unit of electric current?", options: ["Ampere", "Volt", "Ohm"], answer: "Ampere" },
            { question: "What is the formula for potential energy?", options: ["mv", "½mv²", "mgh"], answer: "mgh" },
            { question: "What is the SI unit of resistance?", options: ["Ohm", "Watt", "Joule"], answer: "Ohm" },
            { question: "What is the law of reflection?", options: ["Angle i = Angle r", "Angle i ≠ Angle r", "No reflection"], answer: "Angle i = Angle r" },
            { question: "What is the speed of sound in water?", options: ["1480 m/s", "1500 m/s", "1600 m/s"], answer: "1480 m/s" }
        ]
    }
};

let currentQuiz = null;

function loadSubjects() {
    const classSelect = document.getElementById('class-select').value;
    const subjectSelect = document.getElementById('subject-select');
    const quizSelect = document.getElementById('quiz-select');
    subjectSelect.innerHTML = '<option value="">Choose Subject</option>';
    quizSelect.innerHTML = '<option value="">Choose Quiz</option>';

    if (classSelect) {
        const subjects = {
            '6': ['math', 'science'],
            '7': ['math', 'science'],
            '8': ['math', 'science'],
            '9': ['math', 'science'],
            '10': ['math', 'science'],
            '11': ['math', 'physics'],
            '12': ['math', 'physics']
        }[classSelect] || [];
        subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = `${classSelect}-${subject}`;
            option.textContent = subject.charAt(0).toUpperCase() + subject.slice(1);
            subjectSelect.appendChild(option);
        });
    }
}

function loadQuizzes() {
    const subjectSelect = document.getElementById('subject-select').value;
    const quizSelect = document.getElementById('quiz-select');
    quizSelect.innerHTML = '<option value="">Choose Quiz</option>';

    if (subjectSelect && quizzes[subjectSelect]) {
        Object.keys(quizzes[subjectSelect]).forEach(quiz => {
            const option = document.createElement('option');
            option.value = quiz;
            option.textContent = `Quiz ${quiz.replace('quiz', '')}`;
            quizSelect.appendChild(option);
        });
    }
    loadQuiz();
}

function loadQuiz() {
    currentQuiz = document.getElementById('subject-select').value;
    const quizSelect = document.getElementById('quiz-select').value;
    const quizTitle = document.getElementById('quiz-title');
    const quizContainer = document.getElementById('quiz-questions');
    const submitButton = document.getElementById('submit-quiz');
    quizContainer.innerHTML = '';
    submitButton.style.display = 'none';

    if (currentQuiz && quizSelect && quizzes[currentQuiz][quizSelect]) {
        quizTitle.textContent = `${currentQuiz.replace('-', ' ').toUpperCase()} - ${quizSelect.replace('quiz', 'Quiz ')}`;
        quizzes[currentQuiz][quizSelect].forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.innerHTML = `
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map((option, i) => `
                    <label class="quiz-option">
                        <input type="radio" name="q${index}" value="${option}" data-index="${index}" data-option="${i}"> ${option}
                    </label><br>
                `).join('')}
            `;
            quizContainer.appendChild(questionDiv);
        });
        submitButton.style.display = 'block';
    }
}

function submitQuiz() {
    const quizContainer = document.getElementById('quiz-questions');
    const resultDiv = document.getElementById('quiz-result');
    const submitButton = document.getElementById('submit-quiz');
    let score = 0;
    const totalQuestions = quizzes[currentQuiz][document.getElementById('quiz-select').value].length;

    quizzes[currentQuiz][document.getElementById('quiz-select').value].forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        const options = quizContainer.querySelectorAll(`input[name="q${index}"]`);
        options.forEach(option => {
            const label = option.closest('.quiz-option');
            if (option.value === q.answer) {
                label.classList.add('correct-answer'); // Highlight correct answer in green
            }
            if (selectedOption && option.value === selectedOption.value && option.value !== q.answer) {
                label.classList.add('wrong-answer'); // Highlight wrong selected answer in red
                // Highlight the correct answer in green
                options.forEach(correctOption => {
                    const correctLabel = correctOption.closest('.quiz-option');
                    if (correctOption.value === q.answer) {
                        correctLabel.classList.add('correct-answer');
                    }
                });
            } else if (selectedOption && option.value === selectedOption.value && option.value === q.answer) {
                label.classList.add('correct-answer'); // Highlight correct selection in green
            }
        });

        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });

    resultDiv.innerHTML = `You scored ${score} out of ${totalQuestions}!`;
    submitButton.style.display = 'none';
}