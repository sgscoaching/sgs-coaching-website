// mock-test-script.js - Main logic for SGS Coaching mock test system

let currentQuizData = [];
let studentName = "";
let studentMobile = "";
let quizData = window.questionBank;
let currentQuestionIndex = 0;
let answers = {};
let testDuration = 3600; // Default duration, overridden in startTest
let timerInterval;
let testStartTime; // To track when the test starts
let reviewMarked = {}; // key: questionIndex -> true if marked for review
let inTest = false; // controls back navigation blocking

// Function to save form data to localStorage
function saveFormData(name, mobile) {
    try {
        const formData = {
            name: name,
            mobile: mobile,
            timestamp: Date.now()
        };
        localStorage.setItem('mockTestFormData', JSON.stringify(formData));
        console.log('Form data saved:', formData);
    } catch (error) {
        console.error('Error saving form data:', error);
    }
}

// Function to load saved form data from localStorage
function loadSavedFormData() {
    try {
        const savedData = localStorage.getItem('mockTestFormData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            if (formData.name) {
                document.getElementById('studentName').value = formData.name;
            }
            if (formData.mobile) {
                document.getElementById('studentMobile').value = formData.mobile;
            }
            console.log('Form data loaded:', formData);
        }
        
        // Load mobile number suggestions
        loadMobileSuggestions();
    } catch (error) {
        console.error('Error loading form data:', error);
    }
}

// Function to load mobile number suggestions
function loadMobileSuggestions() {
    try {
        const mobileNumbers = [];
        
        // Get mobile numbers from quiz results
        const quizResults = JSON.parse(localStorage.getItem('quizResults') || '{}');
        Object.values(quizResults).forEach(results => {
            results.forEach(result => {
                if (result.mobile && !mobileNumbers.includes(result.mobile)) {
                    mobileNumbers.push(result.mobile);
                }
            });
        });
        
        // Get mobile numbers from mock test submissions
        const mockSubmissions = JSON.parse(localStorage.getItem('quizSubmissions') || '[]');
        mockSubmissions.forEach(submission => {
            if (submission.mobile && !mobileNumbers.includes(submission.mobile)) {
                mobileNumbers.push(submission.mobile);
            }
        });
        
        // Get mobile numbers from rankings
        const rankings = JSON.parse(localStorage.getItem('rankings') || '[]');
        rankings.forEach(ranking => {
            if (ranking.mobile && !mobileNumbers.includes(ranking.mobile)) {
                mobileNumbers.push(ranking.mobile);
            }
        });
        
        // Populate datalist
        const datalist = document.getElementById('mobileNumbers');
        if (datalist && mobileNumbers.length > 0) {
            datalist.innerHTML = '';
            mobileNumbers.forEach(mobile => {
                const option = document.createElement('option');
                option.value = mobile;
                datalist.appendChild(option);
            });
        }
        
        console.log('Mobile suggestions loaded:', mobileNumbers);
    } catch (error) {
        console.error('Error loading mobile suggestions:', error);
    }
}

// Function to hide timer and menu during selection phase
function hideTestControls() {
    const timer = document.querySelector('.navbar .timer');
    const menuToggle = document.querySelector('.navbar .menu-toggle');
    
    if (timer) {
        timer.style.display = 'none';
    }
    if (menuToggle) {
        menuToggle.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("studentInfoForm");
    if (!form) {
        console.error("studentInfoForm not found in DOM!");
        alert("Error: Login form not found. Please check the HTML structure.");
        return;
    }

    // Load saved form data
    loadSavedFormData();

    console.log("Form found, adding submit event listener");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        console.log("Form submit event triggered");

        studentName = document.getElementById("studentName").value.trim();
        studentMobile = document.getElementById("studentMobile").value.trim();
        console.log("Submitted:", { studentName, studentMobile });
        
        // Save form data for next time
        saveFormData(studentName, studentMobile);

        const loginPage = document.getElementById("loginPage");
        const selectionPage = document.getElementById("selectionPage");
        if (!loginPage || !selectionPage) {
            console.error("Page elements not found:", { loginPage, selectionPage });
            alert("Error: Login or selection page not found. Please check the HTML IDs.");
            return;
        }

        if (studentName && studentMobile.match(/^[0-9]{10}$/)) {
            console.log("Validation passed, hiding loginPage, showing selectionPage");
            loginPage.style.display = "none";
            selectionPage.style.display = "flex";
            // Show the test navbar after login
            const testNavbar = document.getElementById("testNavbar");
            if (testNavbar) {
                testNavbar.style.display = "block";
            }
            // Hide timer and menu during selection phase
            hideTestControls();
            loadMockType();
            updateLeaderboard();
        } else {
            console.log("Validation failed: Invalid name or mobile number");
            if (!studentName) {
                alert("Please enter your full name.");
            } else if (!studentMobile.match(/^[0-9]{10}$/)) {
                alert("Please enter a valid 10-digit mobile number.");
            }
        }
    });

    const startTestBtn = document.getElementById("startTestBtn");
    if (startTestBtn) {
        startTestBtn.addEventListener("click", startTest);
    } else {
        console.error("startTestBtn not found!");
    }

    const prevBtn = document.getElementById("prevBtn");
    if (prevBtn) {
        prevBtn.addEventListener("click", showPreviousQuestion);
    }

    const saveNextBtn = document.getElementById("saveNextBtn");
    if (saveNextBtn) {
        saveNextBtn.addEventListener("click", function(event) {
            event.preventDefault();
            saveAndNextQuestion(event);
        });
    }

    const menuToggle = document.getElementById("menuToggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            const panel = document.getElementById("questionPanel");
            panel.classList.toggle("show");
            // When opened on mobile, ensure the panel appears into view at the top
            if (panel.classList.contains("show")) {
                panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Disable back navigation only during an active test
    window.addEventListener('popstate', function(e) {
        if (inTest) {
            history.pushState(null, document.title, window.location.href);
            alert("Back navigation is disabled during the test.");
        }
    });

    // Prevent navbar link navigation only during test, allow normally otherwise
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(a => {
        a.addEventListener('click', function(e) {
            if (inTest) {
                e.preventDefault();
                alert('Navigation is disabled during the test.');
            }
        });
    });
});

function loadMockType() {
    const mockType = document.getElementById("mockType");
    const subjectDropdown = document.getElementById("subjectDropdown");
    const topicDropdown = document.getElementById("topicDropdown");
    const testDropdown = document.getElementById("testDropdown");

    if (!mockType || !subjectDropdown || !topicDropdown || !testDropdown) {
        console.error("Dropdown elements not found:", { mockType, subjectDropdown, topicDropdown, testDropdown });
        alert("Error: Dropdown elements missing. Please check the HTML IDs.");
        return;
    }

    console.log("Setting up mockType event listener");
    mockType.addEventListener("change", function() {
        console.log("mockType changed to:", mockType.value);
        subjectDropdown.style.display = "none";
        topicDropdown.style.display = "none";
        testDropdown.style.display = "none";
        document.getElementById("subjectSelect").innerHTML = '<option value="">Select Subject</option>';
        document.getElementById("topicSelect").innerHTML = '<option value="">Select Topic</option>';
        document.getElementById("testSelect").innerHTML = '<option value="">Select Test</option>';

        if (mockType.value === "subjectWise") {
            subjectDropdown.style.display = "block";
            topicDropdown.style.display = "none";
            testDropdown.style.display = "none";
            loadSubjects();
        } else if (mockType.value === "sectionalTest") {
            subjectDropdown.style.display = "block";
            topicDropdown.style.display = "none";
            testDropdown.style.display = "none";
            loadSectionalSubjects();
        } else if (mockType.value === "fullTest") {
            subjectDropdown.style.display = "none";
            topicDropdown.style.display = "none";
            testDropdown.style.display = "block";
            loadFullTests();
        }
    });

    // Trigger change to initialize dropdowns if a default value is set
    if (mockType.value) {
        mockType.dispatchEvent(new Event("change"));
    }
}

// Toggle mark for review for the current question
function toggleMarkForReview() {
    reviewMarked[currentQuestionIndex] = !reviewMarked[currentQuestionIndex];
    // Update panel class
    const questionNumbers = document.querySelectorAll('#questionPanel .question-number');
    if (questionNumbers[currentQuestionIndex]) {
        questionNumbers[currentQuestionIndex].classList.toggle('marked', !!reviewMarked[currentQuestionIndex]);
    }
    // Update button label
    updateMarkButtonLabel();
    // During an active test, move to next question after marking
    if (inTest && currentQuestionIndex < currentQuizData.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    }
}

function updateMarkButtonLabel() {
    const btn = document.getElementById('markReviewBtn');
    if (!btn) return;
    if (reviewMarked[currentQuestionIndex]) {
        btn.textContent = 'Unmark Review';
    } else {
        btn.textContent = 'Mark for Review';
    }
}

function loadSubjects() {
    const subjectSelect = document.getElementById("subjectSelect");
    const classSelect = document.getElementById("classSelect");
    
    if (!subjectSelect || !classSelect) {
        console.error("Required select elements not found");
        return;
    }

    console.log("Loading subjects for class:", classSelect.value);
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';
    
    // Define subjects based on class
    let subjects = [];
    if (classSelect.value === "7") {
        // For 7th class
        subjects = ["Mathematics", "Science", "English", "SocialStudies", "Hindi"];
    } else {
        // Default subjects for other classes
        subjects = ["QuantitativeAptitude", "Reasoning", "GeneralAwareness", "BasicComputer", "English"];
    }
    
    // Add subjects to dropdown
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.text = subject.replace(/([A-Z])/g, ' $1').trim();
        subjectSelect.appendChild(option);
    });

    subjectSelect.addEventListener("change", function() {
        console.log("Subject changed to:", subjectSelect.value);
        const topicDropdown = document.getElementById("topicDropdown");
        const testDropdown = document.getElementById("testDropdown");
        
        if (topicDropdown) topicDropdown.style.display = "none";
        if (testDropdown) testDropdown.style.display = "none";
        
        const topicSelect = document.getElementById("topicSelect");
        const testSelect = document.getElementById("testSelect");
        
        if (topicSelect) topicSelect.innerHTML = '<option value="">Select Topic</option>';
        if (testSelect) testSelect.innerHTML = '<option value="">Select Test</option>';
        
        if (subjectSelect.value) {
            loadTopics();
        }
    });

    // Trigger change to load topics if a subject is already selected
    if (subjectSelect.value) {
        subjectSelect.dispatchEvent(new Event("change"));
    }
}

function loadTopics() {
    const subjectSelect = document.getElementById("subjectSelect");
    const topicSelect = document.getElementById("topicSelect");
    const topicDropdown = document.getElementById("topicDropdown");
    const testDropdown = document.getElementById("testDropdown");

    if (!subjectSelect || !topicSelect || !topicDropdown || !testDropdown) {
        console.error("Dropdown elements not found:", { subjectSelect, topicSelect, topicDropdown, testDropdown });
        alert("Error: Dropdown elements missing. Please check the HTML IDs.");
        return;
    }

    console.log("Loading topics for subject:", subjectSelect.value);
    topicSelect.innerHTML = '<option value="">Select Topic</option>';
    if (subjectSelect.value && quizData[subjectSelect.value]) {
        topicDropdown.style.display = "block";
        // Updated topicMap with Quantitative Aptitude, Reasoning, General Awareness, Basic Computer, and English topics
        const topicMap = {
            QuantitativeAptitude: [
                "NumberSystem", "HCFandLCMofNumbers", "DecimalFractions", "Simplification", 
                "SquareRootsandCubeRoots", "Average", "ProblemsonNumbers", "ProblemsonAges", 
                "SurdsandIndices", "Logarithms", "Percentage", "ProfitandLoss", "RatioandProportion", 
                "Partnership", "ChainRule", "PipesandCistern", "TimeandWork", "TimeandDistance", 
                "BoatandStreams", "ProblemsonTrain", "AlligationMixture", "SimpleInterest", 
                "CompoundInterest", "Area", "VolumeandSurfaceArea", "RacesandGamesofSkill", 
                "Calendar", "Clock", "StocksandShares", "PermutationsandCombination", "Probability", 
                "TrueDiscount", "BankersDiscount", "HeightsandDistances", "OddManOutandSeries", 
                "TabulationDI", "BarGraphsDI", "PieChartDI", "LineGraphsDI"
            ],
            Reasoning: [
                "AlphabetandNumberTest", "Analogy", "Classification", "CodingDecoding", "Series", 
                "LogicalarrangementofWords", "DirectionandDistance", "BloodRelations", 
                "RankingandTimeSequenceTest", "SittingArrangement", "Puzzles", "Clock", "Calendar", 
                "MathematicalOperations", "MathematicalReasoning", "ProblemsBasedonAges", 
                "InsertingtheMissingCharacter", "Inequality", "VennDiagram", "MatrixCoding", 
                "DataSufficiency", "InputOutput", "DecisionMaking", "VerificationofTruthoftheStatement", 
                "Series", "Analogy", "Classification", "CompletionofFigures", "FormationofFigures", 
                "EmbeddedFigures", "CountingofFigures", "MirrorImage", "WaterImage", 
                "PaperFoldingandCutting", "SimilarityofFigures", "GroupingofFigures", "FigureMatrix", 
                "CubeandCuboid", "Dice", "DotSituation", "Syllogism", "StatementandConclusions", 
                "StatementandArguments", "StatementandAssumptions", "CourseofAction", 
                "AssertionandReason", "CauseandEffects", "PassageandConclusions"
            ],
            GeneralAwareness: [
                "AncientIndia", "MedievalIndia", "ModernIndia", "Miscellaneous", "AncientWorld", 
                "MedievalWorld", "ModernWorld", "Miscellaneous", "Geography", "Environment", 
                "IndianPolityandConstitution", "IndianEconomy", "ArtandCulture", "Physics", 
                "Chemistry", "Biology", "Miscellaneous"
            ],
            BasicComputer: [
                "GeneralIntroduction", "DevelopmentofComputer", "InputandOutputDevice", "Memory", 
                "PersonalComputer", "DesignToolsandProgrammingLanguages", "DataRepresentationandNumberSystem", 
                "Software", "DataCommunication", "Internet", "MicrosoftWindows", "MicrosoftOffice", 
                "AbbreviationRelatedtoComputer"
            ],
            English: [
                "Verb", "Noun", "Pronoun", "SubjectVerbAgreement", "Modals", "Adjective", 
                "ArticlesQuantifiersandOtherDeterminers", "Adverb", "NonFiniteVerbsVerbals", "Tense", 
                "QuestionTags", "Voice", "Preposition", "PunctuationContraction", "NarrationSpeech", 
                "Conjunction", "PhraseClauseandClauseAnalysis", "Sentences", "SynthesisofSentences", 
                "TransformationofSentences", "WordAssociationSimilarandOppositeWords", 
                "VerbalAnalogyandWordsWithMultiMeanings", "PhrasalVerbs", "IdiomsandPhrases", 
                "SpellingTest", "OneWordSubstitution", "WordFillers", "ClozeTest", "SentenceConnectors", 
                "SentenceCorrectionImprovement", "SpottingEmo", "ParajumblesandSentenceRearrangement", 
                "OddSentenceOut", "ParagraphCompletion", "GeneralComprehension", 
                "LogicalandCriticalReasoningBasedReadingComprehension", "SummaryThemeMainIdeaOfThePassage"
            ]
        };
        const topics = topicMap[subjectSelect.value] || [];
        topics.forEach(topic => {
            const option = document.createElement("option");
            option.value = topic;
            option.text = topic.replace(/([A-Z])/g, ' $1').replace(/and/g, ' & ').trim();
            topicSelect.appendChild(option);
        });

        topicSelect.addEventListener("change", function() {
            console.log("Topic changed to:", topicSelect.value);
            testDropdown.style.display = "none";
            document.getElementById("testSelect").innerHTML = '<option value="">Select Test</option>';
            if (topicSelect.value) {
                loadTests();
            }
        });

        // Trigger change to load tests if a topic is already selected
        if (topicSelect.value) {
            topicSelect.dispatchEvent(new Event("change"));
        }
    } else {
        console.log("No topics available for subject:", subjectSelect.value);
        topicDropdown.style.display = "none";
    }
}

function loadTests() {
    const subjectSelect = document.getElementById("subjectSelect");
    const topicSelect = document.getElementById("topicSelect");
    const testSelect = document.getElementById("testSelect");
    const testDropdown = document.getElementById("testDropdown");

    if (!subjectSelect || !topicSelect || !testSelect || !testDropdown) {
        console.error("Dropdown elements not found:", { subjectSelect, topicSelect, testSelect, testDropdown });
        alert("Error: Dropdown elements missing. Please check the HTML IDs.");
        return;
    }

    console.log("Loading tests for subject:", subjectSelect.value, "topic:", topicSelect.value);
    testSelect.innerHTML = '<option value="">Select Test</option>';
    if (subjectSelect.value && topicSelect.value && quizData[subjectSelect.value] && quizData[subjectSelect.value][topicSelect.value]) {
        testDropdown.style.display = "block";
        const tests = Object.keys(quizData[subjectSelect.value][topicSelect.value]);
        tests.forEach(test => {
            const option = document.createElement("option");
            option.value = test;
            option.text = test;
            testSelect.appendChild(option);
        });

        testSelect.addEventListener("change", function() {
            console.log("Test changed to:", testSelect.value);
            if (testSelect.value) {
                showInstructions();
            }
        });
    } else {
        console.log("No tests available for topic:", topicSelect.value);
        testDropdown.style.display = "none";
    }
}

function loadSectionalSubjects() {
    const subjectSelect = document.getElementById("subjectSelect");
    const testDropdown = document.getElementById("testDropdown");
    const topicDropdown = document.getElementById("topicDropdown");

    if (!subjectSelect || !testDropdown || !topicDropdown) {
        console.error("Dropdown elements not found:", { subjectSelect, testDropdown, topicDropdown });
        alert("Error: Dropdown elements missing. Please check the HTML IDs.");
        return;
    }

    console.log("Loading sectional subjects");
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';
    const subjects = ["QuantitativeAptitude", "Reasoning", "GeneralAwareness", "BasicComputer", "English"];
    subjects.forEach(subject => {
        const option = document.createElement("option");
        option.value = subject;
        option.text = subject.replace(/([A-Z])/g, ' $1').trim();
        subjectSelect.appendChild(option);
    });

    subjectSelect.addEventListener("change", function() {
        console.log("Sectional subject changed to:", subjectSelect.value);
        testDropdown.style.display = "none";
        topicDropdown.style.display = "none";
        document.getElementById("testSelect").innerHTML = '<option value="">Select Test</option>';
        if (subjectSelect.value) {
            loadSectionalTests();
        }
    });

    // Trigger change to load tests if a subject is already selected
    if (subjectSelect.value) {
        subjectSelect.dispatchEvent(new Event("change"));
    }
}

function loadSectionalTests() {
    const subjectSelect = document.getElementById("subjectSelect");
    const testSelect = document.getElementById("testSelect");
    const testDropdown = document.getElementById("testDropdown");

    if (!subjectSelect || !testSelect || !testDropdown) {
        console.error("Dropdown elements not found:", { subjectSelect, testSelect, testDropdown });
        alert("Error: Dropdown elements missing. Please check the HTML IDs.");
        return;
    }

    console.log("Loading sectional tests for subject:", subjectSelect.value);
    testSelect.innerHTML = '<option value="">Select Test</option>';
    if (subjectSelect.value && quizData[subjectSelect.value]) {
        testDropdown.style.display = "block";
        // Collect unique test names across all topics
        const testSet = new Set();
        const topics = Object.keys(quizData[subjectSelect.value]);
        topics.forEach(topic => {
            const tests = Object.keys(quizData[subjectSelect.value][topic] || {});
            tests.forEach(test => testSet.add(test));
        });
        // Sort tests numerically (e.g., Test1, Test2)
        const sortedTests = Array.from(testSet).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
        sortedTests.forEach(test => {
            const option = document.createElement("option");
            option.value = test;
            option.text = test; // Only show test name (e.g., "Test1")
            testSelect.appendChild(option);
        });

        testSelect.addEventListener("change", function() {
            console.log("Sectional test changed to:", testSelect.value);
            if (testSelect.value) {
                showInstructions();
            }
        });
    } else {
        console.log("No tests available for subject:", subjectSelect.value);
        testDropdown.style.display = "none";
    }
}

function loadFullTests() {
    const testSelect = document.getElementById("testSelect");
    const testDropdown = document.getElementById("testDropdown");

    if (!testSelect || !testDropdown) {
        console.error("Dropdown elements not found:", { testSelect, testDropdown });
        alert("Error: Dropdown elements missing. Please check the HTML IDs.");
        return;
    }

    console.log("Loading full tests");
    testSelect.innerHTML = '<option value="">Select Test</option>';
    const tests = ["Test1", "Test2"];
    tests.forEach(test => {
        const option = document.createElement("option");
        option.value = test;
        option.text = test;
        testSelect.appendChild(option);
    });

    testSelect.addEventListener("change", function() {
        console.log("Full test changed to:", testSelect.value);
        if (testSelect.value) {
            showInstructions();
        }
    });
}

function showInstructions() {
    const mockType = document.getElementById("mockType").value;
    const subjectSelect = document.getElementById("subjectSelect");
    const topicSelect = document.getElementById("topicSelect");
    const testSelect = document.getElementById("testSelect");
    const selectionPage = document.getElementById("selectionPage");
    const instructionsPage = document.getElementById("instructionsPage");

    if (!selectionPage || !instructionsPage) {
        console.error("Page elements not found:", { selectionPage, instructionsPage });
        alert("Error: Page elements missing. Please check the HTML IDs.");
        return;
    }

    if (mockType && (
        (mockType === "subjectWise" && subjectSelect.value && topicSelect.value && testSelect.value) ||
        (mockType === "sectionalTest" && subjectSelect.value && testSelect.value) ||
        (mockType === "fullTest" && testSelect.value)
    )) {
        console.log("Showing instructions for selected test");
        selectionPage.style.display = "none";
        instructionsPage.style.display = "flex";
    } else {
        console.log("Invalid test selection, instructions not shown");
        alert("Please select all required options to proceed.");
    }
}

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Function to shuffle questions and their options
function shuffleTestData(questions) {
    // Shuffle the order of questions
    const shuffledQuestions = shuffleArray(questions);
    
    // Shuffle options for each question while keeping track of correct answers
    return shuffledQuestions.map(question => {
        // Store the correct answer
        const correctAnswer = question.answer;
        
        // Create array of options with their original indices
        const optionsWithIndices = question.options.map((option, index) => ({
            text: option,
            originalIndex: index
        }));
        
        // Shuffle the options
        const shuffledOptions = shuffleArray(optionsWithIndices);
        
        // Find the new index of the correct answer
        const correctIndex = shuffledOptions.findIndex(opt => 
            opt.originalIndex === question.options.indexOf(correctAnswer)
        );
        
        // Return question with shuffled options and updated correct answer
        return {
            ...question,
            options: shuffledOptions.map(opt => opt.text),
            answer: shuffledOptions[correctIndex].text
        };
    });
}

function startTest() {
    console.log('=== Starting New Test Attempt ===');
    
    // Clear any existing intervals
    clearInterval(timerInterval);
    
    // Reset all test-related variables
    currentQuestionIndex = 0;
    answers = {};
    testStartTime = new Date().getTime();
    currentQuizData = [];
    reviewMarked = {};
    inTest = true;
    
    // Get test parameters
    const mockType = document.getElementById("mockType").value;
    const subjectSelect = document.getElementById("subjectSelect");
    const topicSelect = document.getElementById("topicSelect");
    const testSelect = document.getElementById("testSelect");
    
    // Validate test selection
    if (!mockType || !testSelect || !testSelect.value) {
        console.error("Invalid test selection");
        alert("Please select a valid test to start.");
        return;
    }
    
    // Load questions based on test type
    try {
        if (mockType === 'subjectWise' && subjectSelect?.value && topicSelect?.value) {
            console.log("Loading subject-wise test");
            currentQuizData = [...(quizData[subjectSelect.value]?.[topicSelect.value]?.[testSelect.value] || [])];
            // Subject Wise: 25 questions, 20 min
            currentQuizData = shuffleArray(currentQuizData).slice(0, 25);
            testDuration = 1200; // 20 minutes
        } 
        else if (mockType === 'sectionalTest' && subjectSelect?.value) {
            console.log("Loading sectional test");
            currentQuizData = [];
            // Find all questions for this test across all topics in the subject
            const subjectData = quizData[subjectSelect.value] || {};
            for (let topic in subjectData) {
                if (subjectData[topic]?.[testSelect.value]) {
                    currentQuizData = currentQuizData.concat(subjectData[topic][testSelect.value]);
                }
            }
            // Sectional Test: 35 questions, 25 min
            currentQuizData = shuffleArray(currentQuizData).slice(0, 35);
            testDuration = 1500; // 25 minutes
        } 
        else if (mockType === 'fullTest') {
            console.log("Loading full test");
            currentQuizData = [];
            // Gather 25 questions per subject for 4 sections (if enough data)
            const subjects = ["QuantitativeAptitude", "Reasoning", "GeneralAwareness", "BasicComputer", "English"];
            let sectionData = [];
            subjects.slice(0, 4).forEach(subject => {
                let subjectQuestions = [];
                for (let topic in quizData[subject]) {
                    if (quizData[subject][topic]?.[testSelect.value]) {
                        subjectQuestions = subjectQuestions.concat(quizData[subject][topic][testSelect.value]);
                    }
                }
                subjectQuestions = shuffleArray(subjectQuestions).slice(0, 25);
                sectionData.push({ subject, questions: subjectQuestions });
                currentQuizData = currentQuizData.concat(subjectQuestions);
            });
            window.fullTestSections = sectionData;
            // Full Test: 100 questions, 90 min
            currentQuizData = shuffleArray(currentQuizData).slice(0, 100);
            testDuration = 5400; // 90 minutes
        }
        
        if (currentQuizData.length === 0) {
            throw new Error("No questions found for the selected test");
        }
        
        console.log(`Loaded ${currentQuizData.length} questions`);
        
        // Shuffle questions and options
        console.log("Shuffling questions...");
        currentQuizData = shuffleTestData([...currentQuizData]);

        // Ensure there are enough questions to run a proper test
        if (!currentQuizData || currentQuizData.length < 2) {
            console.warn('Not enough questions to start this test. Questions found:', currentQuizData?.length || 0);
            alert("This test doesn't have enough questions to start. Please choose another test.");
            // Return user to selection page
            document.getElementById("instructionsPage").style.display = "none";
            document.getElementById("testPage").style.display = "none";
            document.getElementById("selectionPage").style.display = "flex";
            hideTestControls();
            return;
        }

        // Set duration based on mock type
        // Subject Wise should be 15 minutes = 900 seconds
        if (mockType === 'subjectWise') {
            testDuration = 900;
        }

        // Update UI
        console.log("Updating UI...");
        document.getElementById("instructionsPage").style.display = "none";
        document.getElementById("testPage").style.display = "flex";
        
        // Show timer and menu only when test actually starts
        document.getElementById("timer").style.display = "block";
        const menuToggle = document.querySelector('.navbar .menu-toggle');
        if (menuToggle) {
            menuToggle.style.display = "block";
        }
        // Ensure browser back is blocked from this point
        history.pushState(null, document.title, window.location.href);
        
        // Ensure navigation buttons are reset to test mode (in case they were re-bound in solution mode earlier)
        try {
            const prevBtnEl = document.getElementById("prevBtn");
            const saveNextBtnEl = document.getElementById("saveNextBtn");
            if (prevBtnEl) {
                const freshPrev = prevBtnEl.cloneNode(true);
                prevBtnEl.replaceWith(freshPrev);
                freshPrev.addEventListener('click', showPreviousQuestion);
            }
            if (saveNextBtnEl) {
                const freshNext = saveNextBtnEl.cloneNode(true);
                saveNextBtnEl.replaceWith(freshNext);
                freshNext.addEventListener('click', function(event) {
                    event.preventDefault();
                    saveAndNextQuestion(event);
                });
            }
            // Bind Mark for Review button
            const markBtnEl = document.getElementById('markReviewBtn');
            if (markBtnEl) {
                const freshMark = markBtnEl.cloneNode(true);
                markBtnEl.replaceWith(freshMark);
                freshMark.addEventListener('click', toggleMarkForReview);
                // Initialize button label
                updateMarkButtonLabel();
                // Make sure it's visible during the test
                freshMark.style.display = 'inline-block';
            }
        } catch (e) {
            console.warn('Failed to reset navigation buttons, continuing...', e);
        }
        
        // Clear and rebuild question panel
        const questionPanel = document.getElementById("questionPanel");
        if (questionPanel) {
            questionPanel.innerHTML = '';
            currentQuizData.forEach((_, index) => {
                const div = document.createElement("div");
                div.className = "question-number";
                div.textContent = index + 1;
                div.dataset.index = index;
                if (reviewMarked[index]) div.classList.add('marked');
                div.addEventListener("click", () => showQuestion(index));
                questionPanel.appendChild(div);
            });
        }
        
        // Reset and start timer
        testStartTime = new Date().getTime();
        startTimer();
        
        // Show first question
        console.log("Showing first question");
        showQuestion(0);
        
    } catch (error) {
        console.error("Error starting test:", error);
        alert("Failed to start test. Please try again.");
        // Reset UI to selection page
        document.getElementById("testPage").style.display = "none";
        document.getElementById("instructionsPage").style.display = "flex";
    }
}

function startTimer() {
    let timeLeft = testDuration;
    const timerElement = document.getElementById("timer");
    if (!timerElement) {
        console.error("Timer element not found");
        alert("Error: Timer element missing. Please contact support.");
        return;
    }
    // Let CSS control positioning to avoid overlap on mobile
    timerElement.style.display = 'block';
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitTest();
        }
    }, 1000);
}

function showQuestion(index) {
    console.log('showQuestion called with index:', index, 
                'Current index:', currentQuestionIndex,
                'Total questions:', currentQuizData?.length || 0);
                
    if (index >= 0 && index < currentQuizData.length) {
        console.log('Updating currentQuestionIndex from', currentQuestionIndex, 'to', index);
        currentQuestionIndex = index;
        const questionArea = document.getElementById("currentQuestion");
        if (!questionArea) {
            console.error("currentQuestion element not found");
            alert("Error: Question area missing. Please contact support.");
            return;
        }
        
        // Create question HTML with bar system for both question and options
        questionArea.innerHTML = `
            <div class="test-question-container">
                <!-- Question Bar -->
                <div class="question-bar">
                    <div class="question-number-indicator">Q${index + 1}</div>
                    <div class="question-text">${currentQuizData[index].question}</div>
                </div>
                <!-- Options Container -->
                <div class="test-options-container" id="optionsContainer">
                    ${currentQuizData[index].options.map((option, i) => {
                        const isChecked = answers[index] === option;
                        const safeOption = option.replace(/'/g, "\\'");
                        return `
                            <div class="option-bar ${isChecked ? 'selected' : ''}" 
                                 onclick="selectOption(this, '${safeOption}')">
                                <div class="option-letter">${String.fromCharCode(65 + i)}</div>
                                <div class="option-text">${option}</div>
                                <input type="radio" name="question" value="${safeOption}" ${isChecked ? 'checked' : ''} style="display: none;">
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <style>
                /* Main Container */
                .test-question-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 15px;
                }
                
                /* Question Bar Styles */
                .question-bar {
                    background: #2196F3;
                    color: white;
                    border-radius: 8px;
                    padding: 15px 20px;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .question-number-indicator {
                    background: rgba(255, 255, 255, 0.2);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 15px;
                    font-weight: bold;
                    font-size: 16px;
                    flex-shrink: 0;
                }
                .question-text {
                    font-size: 16px;
                    line-height: 1.5;
                }
                
                /* Options Container */
                .test-options-container {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding: 0 10px;
                }
                
                /* Option Bar Styles */
                .option-bar {
                    background: #ffffff;
                    border-radius: 8px;
                    padding: 16px 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid #e0e0e0;
                    display: flex;
                    align-items: center;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                }
                .option-bar:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-color: #2196F3;
                }
                .option-bar.selected {
                    background: #4CAF50;
                    border-color: #4CAF50;
                    color: white;
                }
                .option-letter {
                    background: #f5f5f5;
                    color: #333;
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    margin-right: 15px;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }
                .option-bar.selected .option-letter {
                    background: white;
                    color: #4CAF50;
                }
                .option-text {
                    font-size: 15px;
                    line-height: 1.5;
                    flex-grow: 1;
                }
                .option-bar.selected .option-text {
                    color: white;
                    font-weight: 500;
                }
                #questionPanel .question-number {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    margin: 5px;
                    border-radius: 8px;
                    background: #ffffff;
                    border: 2px solid #e0e0e0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                    box-shadow: 3px 3px 6px #d1d9e6, -3px -3px 6px #ffffff;
                }
                #questionPanel .question-number.answered {
                    background: #4CAF50;
                    color: white;
                    border-color: #4CAF50;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
                }
                #questionPanel .question-number.current {
                    border-color: #2196F3;
                    background: #2196F3;
                    color: white;
                    transform: scale(1.1);
                    box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #2196F3;
                }
                #questionPanel .question-number:hover {
                    transform: translateY(-2px);
                    box-shadow: 4px 4px 8px #d1d9e6, -4px -4px 8px #ffffff;
                }
                #questionPanel .question-number.marked {
                    background: #ff9800;
                    color: white;
                    border-color: #ff9800;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(255, 152, 0, 0.3);
                }
            </style>
        `;

        document.getElementById("prevBtn").style.display = index > 0 ? "inline-block" : "none";
        document.getElementById("saveNextBtn").textContent = index < currentQuizData.length - 1 ? "Save and Next" : "Submit";

        // Update question numbers
        const questionNumbers = document.querySelectorAll("#questionPanel .question-number");
        questionNumbers.forEach((num, i) => {
            num.classList.toggle("current", i === index);
            num.classList.toggle("marked", !!reviewMarked[i]);
        });

        // Update mark button label for current question
        updateMarkButtonLabel();
    }
}

function selectOption(element, option) {
    // Remove selected class from all options in the current question
    const options = document.querySelectorAll('.option-bar');
    options.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Update the radio input
    const radio = element.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
    
    // Save the answer
    answers[currentQuestionIndex] = option;
    
    // Update the question number indicator
    const questionNumbers = document.querySelectorAll("#questionPanel .question-number");
    if (questionNumbers[currentQuestionIndex]) {
        questionNumbers[currentQuestionIndex].classList.add('answered');
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
}

function saveAndNextQuestion(event) {
    // Only proceed if this was triggered by a button click
    if (event && event.type === 'click') {
        console.log('saveAndNextQuestion - Current index:', currentQuestionIndex, 
                    'Total questions:', currentQuizData?.length || 0);
        
        // Validate quiz data
        if (!currentQuizData || !Array.isArray(currentQuizData) || currentQuizData.length === 0) {
            console.error('Invalid or empty quiz data');
            return;
        }
        
        // The answer is already saved when clicking the option
        // Move to the next question if available
        if (currentQuestionIndex < currentQuizData.length - 1) {
            console.log('Moving to next question:', currentQuestionIndex + 1);
            showQuestion(currentQuestionIndex + 1);
        } else {
            // Only submit if we're on the last question
            console.log('Last question reached, submitting test');
            submitTest();
        }
    }
}

function submitTest() {
    console.log('submitTest called. Current question index:', currentQuestionIndex, 
                'Total questions:', currentQuizData?.length || 0);
    
    // Log the call stack to see what triggered the submit
    console.trace('submitTest call stack');
    
    // Check if we're really ready to submit
    if (currentQuestionIndex < currentQuizData.length - 1) {
        console.warn('Premature test submission detected! Current index:', currentQuestionIndex, 
                    'Total questions:', currentQuizData.length);
        // Instead of submitting, just move to the next question
        showQuestion(currentQuestionIndex + 1);
        return;
    }
    
    console.log('Proceeding with test submission...');
    clearInterval(timerInterval);
    
    // Hide the timer after test completion
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        timerElement.style.display = "none";
    }
    
    let attempted = 0;
    let unattempted = 0;
    currentQuizData.forEach((item, index) => {
        if (answers[index] !== undefined) {
            attempted++;
            console.log(`Question ${index + 1}: Answered - ${answers[index]}`);
        } else {
            unattempted++;
            console.log(`Question ${index + 1}: Unattempted`);
        }
    });

    let score = 0;
    currentQuizData.forEach((item, index) => {
        if (answers[index] === item.answer) score++;
    });

    // Calculate accuracy based only on attempted questions (both correct and incorrect)
    const attemptedQuestions = Object.keys(answers).length;
    const accuracy = attemptedQuestions > 0 ? (score / attemptedQuestions) * 100 : 0;
    const testEndTime = new Date().getTime();
    const timeElapsed = Math.floor((testEndTime - testStartTime) / 1000); // in seconds
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    const timeTaken = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
    const quizTitle = `${currentQuizData[0].difficulty || 'Mixed'} Test - ${document.getElementById("mockType").value.replace(/([A-Z])/g, ' $1').trim()} - ${document.getElementById("testSelect").value || document.getElementById("subjectSelect").value}`;

    const submission = {
        name: studentName,
        mobile: studentMobile,
        marks: score,
        accuracy: accuracy.toFixed(2),
        time: Date.now(),
        duration: timeElapsed * 1000,
        quiz: quizTitle,
        totalQuestions: currentQuizData.length
    };

    let submissions = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
    submissions.push(submission);
    localStorage.setItem('quizSubmissions', JSON.stringify(submissions));
    
    // Save to Google Sheets
    if (typeof saveMockTestResultToSheets === 'function') {
      const testType = document.getElementById("mockType").value || 'Unknown';
      const subject = document.getElementById("subjectSelect").value || 'Unknown';
      const topic = document.getElementById("testSelect").value || document.getElementById("topicSelect").value || 'Unknown';
      
      saveMockTestResultToSheets({
        name: studentName,
        mobile: studentMobile,
        testType: testType,
        subject: subject,
        topic: topic,
        marks: score,
        totalQuestions: currentQuizData.length,
        accuracy: parseFloat(accuracy.toFixed(2)),
        duration: timeElapsed
      });
    }
    
    updateLeaderboard();

    // Hide test page and show result stats with modern design
    document.getElementById("testPage").style.display = "none";
    document.getElementById("resultStats").style.display = "block";
    document.getElementById("resultStats").innerHTML = `
        <div class="result-summary">
            <div class="result-header">
                <h2>Test Summary</h2>
                <p>Review your performance before viewing detailed results</p>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${attempted}</div>
                    <div class="stat-label">Attempted</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${unattempted}</div>
                    <div class="stat-label">Unattempted</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${Math.max(attempted - score, 0)}</div>
                    <div class="stat-label">Wrong</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${currentQuizData.length}</div>
                    <div class="stat-label">Total Questions</div>
                </div>
            </div>
            <div class="result-actions">
                <button id="nextBtn" class="btn-primary">View Detailed Results</button>
            </div>
        </div>
        <style>
            .result-summary {
                max-width: 800px;
                margin: 20px auto;
                padding: 30px;
                background: #ffffff;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .result-header {
                text-align: center;
                margin-bottom: 30px;
            }
            .result-header h2 {
                color: #2c3e50;
                margin-bottom: 10px;
                font-size: 2em;
            }
            .result-header p {
                color: #7f8c8d;
                font-size: 1.1em;
            }
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            .stat-card {
                background: #f8f9fa;
                padding: 25px 15px;
                border-radius: 10px;
                text-align: center;
                transition: transform 0.3s, box-shadow 0.3s;
            }
            .stat-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            .stat-value {
                font-size: 2.5em;
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 5px;
            }
            .stat-label {
                color: #7f8c8d;
                font-size: 0.9em;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .result-actions {
                display: flex;
                justify-content: center;
                margin-top: 30px;
            }
            .btn-primary {
                background: linear-gradient(135deg, #6ab04c, #4a8f2d);
                color: white;
                border: none;
                padding: 12px 30px;
                font-size: 1.1em;
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(106, 176, 76, 0.3);
            }
            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(106, 176, 76, 0.4);
            }
            .btn-primary:active {
                transform: translateY(0);
            }
            @media (max-width: 768px) {
                .stats-grid {
                    grid-template-columns: 1fr;
                }
                .result-summary {
                    margin: 10px;
                    padding: 20px 15px;
                }
            }
        </style>
    `;

    document.getElementById("nextBtn").addEventListener("click", function() {
        document.getElementById("resultStats").style.display = "none";
        document.getElementById("result").style.display = "block";
        
        // Calculate rank and other metrics
        const rank = calculateRank(score, currentQuizData.length);
        
        // Calculate time taken during the test
        const testEndTime = new Date().getTime();
        const timeElapsed = Math.floor((testEndTime - testStartTime) / 1000); // in seconds
        const minutes = Math.floor(timeElapsed / 60);
        const seconds = timeElapsed % 60;
        const timeTaken = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
        // Calculate accuracy based only on attempted questions (both correct and incorrect)
        const attemptedQuestions = Object.keys(answers).length;
        const accuracy = (attemptedQuestions > 0 ? (score / attemptedQuestions) * 100 : 0).toFixed(1);
        const performanceMessage = getPerformanceMessage(accuracy);
        const rankBadge = getRankBadge(rank);
        
        // Generate result HTML
        document.getElementById("result").innerHTML = `
            <div class="result-container">
                <div class="result-card">
                    <!-- Header Section -->
                    <div class="result-header">
                        <div class="trophy-icon">${rankBadge}</div>
                        <h2>Test Completed!</h2>
                        <p class="subtitle">${quizTitle}</p>
                    </div>
                    
                    <!-- Score Section -->
                    <div class="score-section">
                        <div class="score-circle">
                            <div class="score-value">${score}<span>/${currentQuizData.length}</span></div>
                            <div class="score-label">Score</div>
                            <svg class="progress-ring" width="200" height="200">
                                <circle class="progress-ring-circle" stroke="#e0e0e0" stroke-width="10" fill="transparent" r="90" cx="100" cy="100"/>
                                <circle class="progress-ring-circle progress-ring-progress" stroke="#6ab04c" stroke-width="10" stroke-linecap="round" fill="transparent" r="90" cx="100" cy="100" 
                                    style="stroke-dashoffset: ${565.49 * (1 - (attemptedQuestions > 0 ? (score / attemptedQuestions) : 0))};"/>
                            </svg>
                        </div>
                        <div class="accuracy-badge">
                            <span>${accuracy}%</span>
                            <small>Accuracy</small>
                        </div>
                    </div>
                    
                    <!-- Stats Grid -->
                    <div class="stats-grid">
                        <div class="stat-item">
                            <div class="stat-value">${attempted}</div>
                            <div class="stat-label">Attempted</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${unattempted}</div>
                            <div class="stat-label">Unattempted</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value">${timeTaken}</div>
                            <div class="stat-label">Time Taken</div>
                        </div>
                        <div class="stat-item rank-item">
                            <div class="rank-badge">${rankBadge}</div>
                            <div class="rank-details">
                                <div class="rank-value">Rank #${rank}</div>
                                <div class="rank-label">Out of ${submissions.length} participants</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Performance Message -->
                    <div class="performance-message">
                        <div class="message-icon">💡</div>
                        <p>${performanceMessage}</p>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="action-buttons">
                        <button id="seeSolutionBtn" class="btn btn-primary">
                            <span class="btn-icon">🔍</span>
                            <span>View Solutions</span>
                        </button>
                        <button id="tryAgainBtn" class="btn btn-secondary">
                            <span class="btn-icon">🔄</span>
                            <span>Try Again</span>
                        </button>
                        <button id="shareBtn" class="btn btn-outline">
                            <span class="btn-icon">📤</span>
                            <span>Share Result</span>
                        </button>
                    </div>
                </div>
                
                <!-- Leaderboard Preview -->
                <div class="leaderboard-preview">
                    <h3>🏆 Leaderboard</h3>
                    <div id="leaderboardPreview">
                        <!-- Leaderboard will be inserted here -->
                    </div>
                    <button id="viewFullLeaderboard" class="btn-text">View Full Leaderboard →</button>
                </div>
            </div>
            
            <style>
                /* Base Styles */
                .result-container {
                    max-width: 1000px;
                    margin: 20px auto;
                    padding: 0 15px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }
                
                /* Result Card */
                .result-card {
                    background: #ffffff;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                    padding: 30px;
                    margin-bottom: 30px;
                }
                
                /* Header Section */
                .result-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .result-header h2 {
                    color: #2c3e50;
                    margin: 15px 0 5px;
                    font-size: 2em;
                }
                .result-header .subtitle {
                    color: #7f8c8d;
                    font-size: 1.1em;
                    margin: 0;
                }
                .trophy-icon {
                    font-size: 3em;
                    margin-bottom: 10px;
                }
                
                /* Score Section */
                .score-section {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    margin: 30px 0;
                    position: relative;
                }
                .score-circle {
                    position: relative;
                    width: 200px;
                    height: 200px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .score-value {
                    font-size: 3.5em;
                    font-weight: bold;
                    color: #2c3e50;
                    line-height: 1;
                    z-index: 2;
                }
                .score-value span {
                    font-size: 0.5em;
                    color: #7f8c8d;
                    font-weight: normal;
                }
                .score-label {
                    color: #7f8c8d;
                    font-size: 0.9em;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-top: 5px;
                }
                .progress-ring {
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform: rotate(-90deg);
                }
                .progress-ring-circle {
                    transition: stroke-dashoffset 1s ease-in-out;
                }
                .accuracy-badge {
                    background: #f8f9fa;
                    padding: 8px 20px;
                    border-radius: 20px;
                    margin-top: 20px;
                    font-weight: bold;
                    color: #2c3e50;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .accuracy-badge small {
                    font-size: 0.7em;
                    color: #7f8c8d;
                    font-weight: normal;
                }
                
                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 15px;
                    margin: 30px 0;
                }
                .stat-item {
                    background: #f8f9fa;
                    padding: 20px 10px;
                    border-radius: 10px;
                    text-align: center;
                    transition: all 0.3s ease;
                }
                .stat-item:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                }
                .stat-value {
                    font-size: 1.8em;
                    font-weight: bold;
                    color: #2c3e50;
                    margin-bottom: 5px;
                }
                .stat-label {
                    color: #7f8c8d;
                    font-size: 0.8em;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .rank-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 15px 10px;
                }
                .rank-badge {
                    font-size: 1.8em;
                }
                .rank-details {
                    text-align: left;
                }
                .rank-value {
                    font-weight: bold;
                    color: #2c3e50;
                    font-size: 1.1em;
                }
                .rank-label {
                    font-size: 0.7em;
                    color: #7f8c8d;
                }
                
                /* Performance Message */
                .performance-message {
                    background: #f0f7ff;
                    border-left: 4px solid #4a90e2;
                    padding: 15px 20px;
                    border-radius: 0 8px 8px 0;
                    margin: 25px 0;
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                }
                .message-icon {
                    font-size: 1.5em;
                    margin-top: 2px;
                }
                .performance-message p {
                    margin: 0;
                    color: #2c3e50;
                    line-height: 1.5;
                }
                
                /* Action Buttons */
                .action-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    margin-top: 30px;
                    justify-content: center;
                }
                .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 12px 25px;
                    border-radius: 50px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    font-size: 0.95em;
                }
                .btn-primary {
                    background: linear-gradient(135deg, #6ab04c, #4a8f2d);
                    color: white;
                    box-shadow: 0 4px 15px rgba(106, 176, 76, 0.3);
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(106, 176, 76, 0.4);
                }
                .btn-primary:active {
                    transform: translateY(0);
                }
                .btn-secondary {
                    background: linear-gradient(135deg, #f9ca24, #f0932b);
                    color: white;
                    box-shadow: 0 4px 15px rgba(249, 202, 36, 0.3);
                }
                .btn-secondary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(249, 202, 36, 0.4);
                }
                .btn-outline {
                    background: transparent;
                    border: 1px solid #dfe6e9;
                    color: #2c3e50;
                }
                .btn-outline:hover {
                    background: #f8f9fa;
                    transform: translateY(-2px);
                }
                .btn-text {
                    background: none;
                    border: none;
                    color: #6ab04c;
                    font-weight: 600;
                    padding: 10px 0;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin: 0 auto;
                }
                .btn-text:hover {
                    text-decoration: underline;
                }
                .btn-icon {
                    margin-right: 8px;
                    font-size: 1.1em;
                }
                
                /* Leaderboard Preview */
                .leaderboard-preview {
                    background: #ffffff;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                    padding: 25px;
                }
                .leaderboard-preview h3 {
                    color: #2c3e50;
                    margin: 0 0 20px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                /* Responsive Design */
                @media (max-width: 768px) {
                    .result-card, .leaderboard-preview {
                        padding: 20px 15px;
                    }
                    .stats-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                    .action-buttons {
                        flex-direction: column;
                    }
                    .btn {
                        width: 100%;
                    }
                }
                
                @media (max-width: 480px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                    .score-value {
                        font-size: 2.8em;
                    }
                }
                
                /* Animations */
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .result-card, .leaderboard-preview {
                    animation: fadeIn 0.6s ease-out forwards;
                }
                .leaderboard-preview {
                    animation-delay: 0.2s;
                }
            </style>
        `;
        
        // Add leaderboard preview
        updateLeaderboardPreview();
        
        // Add event listeners
        document.getElementById('viewFullLeaderboard').addEventListener('click', function() {
            // This would typically navigate to a full leaderboard page
            alert('Full leaderboard would be shown here');
        });
        
        document.getElementById('shareBtn').addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: 'My Test Results',
                    text: `I scored ${score}/${currentQuizData.length} (${accuracy}%) on ${quizTitle} at SGS Coaching!`,
                    url: window.location.href
                }).catch(console.error);
            } else {
                // Fallback for browsers that don't support Web Share API
                const shareText = `I scored ${score}/${currentQuizData.length} (${accuracy}%) on ${quizTitle} at SGS Coaching!`;
                prompt('Copy to clipboard: Ctrl+C, Enter', shareText);
            }
        });

        document.getElementById("seeSolutionBtn").addEventListener("click", function() {
            document.getElementById("result").style.display = "none";
            document.getElementById("testPage").style.display = "flex";
            currentQuestionIndex = 0; // Start from first question
            // Hide mark-for-review in solution mode
            const markBtn = document.getElementById('markReviewBtn');
            if (markBtn) markBtn.style.display = 'none';
            
            // Set up solution mode navigation
            const prevBtn = document.getElementById("prevBtn");
            const saveNextBtn = document.getElementById("saveNextBtn");
            
            // Remove existing event listeners and add solution navigation
            prevBtn.replaceWith(prevBtn.cloneNode(true));
            saveNextBtn.replaceWith(saveNextBtn.cloneNode(true));
            
            // Get fresh references after cloning
            const newPrevBtn = document.getElementById("prevBtn");
            const newSaveNextBtn = document.getElementById("saveNextBtn");
            
            // Add solution navigation event listeners
            newPrevBtn.addEventListener("click", function() {
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    updateSolutionView();
                }
            });
            
            newSaveNextBtn.addEventListener("click", function() {
                if (currentQuestionIndex < currentQuizData.length - 1) {
                    currentQuestionIndex++;
                    updateSolutionView();
                } else {
                    // Finished reviewing solutions, go back to results
                    document.getElementById("testPage").style.display = "none";
                    document.getElementById("result").style.display = "block";
                }
            });
            
            updateSolutionView();
        });

        document.getElementById("tryAgainBtn").addEventListener("click", function() {
            document.getElementById("result").style.display = "none";
            document.getElementById("selectionPage").style.display = "flex";
            hideTestControls();
            answers = {};
            currentQuizData = [];
            inTest = false;
            loadMockType();
        });
    });
}



function updateSolutionView() {
    const userAnswer = answers[currentQuestionIndex];
    const correctAnswer = currentQuizData[currentQuestionIndex].answer;
    const isAttempted = userAnswer !== undefined;
    const isCorrect = isAttempted && userAnswer === correctAnswer;
    
    document.getElementById("currentQuestion").innerHTML = `
        <div class="test-question-container">
            <div class="question-bar">
                <div class="question-number-indicator">Q${currentQuestionIndex + 1}</div>
                <div class="question-text">${currentQuizData[currentQuestionIndex].question}</div>
            </div>
            <div class="test-options-container">
                ${currentQuizData[currentQuestionIndex].options.map((option, i) => {
                    const isUserAnswer = isAttempted && option === userAnswer;
                    const isRightAnswer = option === correctAnswer;
                    let optionClass = '';
                    let statusText = '';
                    
                    if (isRightAnswer && isUserAnswer) {
                        optionClass = 'user-correct-answer';
                        statusText = '✓ Your Answer (Correct)';
                    } else if (isRightAnswer) {
                        optionClass = 'correct-answer';
                        statusText = '✓ Correct Answer';
                    } else if (isUserAnswer) {
                        optionClass = 'wrong-answer';
                        statusText = '✗ Your Answer';
                    }
                    
                    return `
                        <div class="option-bar ${optionClass}">
                            <div class="option-letter">${String.fromCharCode(65 + i)}</div>
                            <div class="option-text">${option}</div>
                            ${statusText ? `<span class="answer-status">${statusText}</span>` : ''}
                            <input type="radio" name="question" value="${option}" style="display: none;">
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="solution-actions">
                <button id="backToResultsBtn" class="btn-back">← Back to Results</button>
            </div>
        </div>
        <style>
            .option-bar {
                background: #ffffff;
                border-radius: 8px;
                padding: 16px 20px;
                margin: 8px 0;
                border: 2px solid #e0e0e0;
                position: relative;
                box-shadow: 3px 3px 6px #d1d9e6, -3px -3px 6px #ffffff;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                cursor: default;
            }
            .option-bar.correct-answer {
                background: #e8f5e9;
                border-color: #81c784;
            }
            .option-bar.user-correct-answer {
                background: #c8e6c9;
                border-color: #4caf50;
                box-shadow: 0 0 0 2px #fff, 0 0 0 4px #4caf50;
            }
            .option-bar.wrong-answer {
                background: #ffebee;
                border-color: #ef9a9a;
                position: relative;
                overflow: hidden;
            }
            .option-bar.wrong-answer::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                border-width: 0 30px 30px 0;
                border-style: solid;
                border-color: #f44336 #f44336 transparent transparent;
            }
            .option-bar .option-letter {
                background: #f5f5f5;
                color: #333;
                width: 30px;
                height: 30px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                margin-right: 15px;
                flex-shrink: 0;
            }
            .option-bar.correct-answer .option-letter,
            .option-bar.user-correct-answer .option-letter {
                background: #4caf50;
                color: white;
            }
            .option-bar.wrong-answer .option-letter {
                background: #f44336;
                color: white;
            }
            .answer-status {
                margin-left: auto;
                font-weight: 500;
                color: #4caf50;
                font-size: 14px;
            }
            .wrong-answer .answer-status {
                color: #f44336;
            }
            .question-bar {
                background: #2196F3;
                color: white;
                border-radius: 8px;
                padding: 15px 20px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
            }
            .question-number-indicator {
                background: rgba(255, 255, 255, 0.2);
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 15px;
                font-weight: bold;
                font-size: 16px;
                flex-shrink: 0;
            }
            .question-text {
                font-size: 16px;
                line-height: 1.5;
            }
            .solution-actions {
                margin: 10px 0;
            }
            .text-success {
                color: #28a745;
                font-weight: bold;
            }
            .text-danger {
                color: #dc3545;
                font-weight: bold;
            }
            .solution-actions {
                margin-top: 20px;
                text-align: center;
            }
            .btn-back {
                background: #6c757d;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            .btn-back:hover {
                background: #5a6268;
                transform: translateY(-2px);
            }
        </style>
    `;

    // Update question panel for solution mode with clickable functionality
    document.getElementById("questionPanel").innerHTML = "";
    currentQuizData.forEach((item, index) => {
        const userAnswer = answers[index] || "Not Answered";
        const isCorrect = userAnswer === item.answer;
        const boxColor = isCorrect ? 'green' : userAnswer === 'Not Answered' ? '#90ee90' : 'red';
        const div = document.createElement("div");
        div.className = "question-number";
        div.textContent = index + 1;
        div.dataset.index = index;
        div.style.backgroundColor = boxColor;
        div.style.color = 'white';
        div.style.padding = '5px';
        div.style.margin = '2px';
        div.style.display = 'inline-block';
        div.style.cursor = 'pointer'; // Make it clickable
        div.style.border = index === currentQuestionIndex ? '3px solid #333' : '1px solid transparent';
        
        // Add click event to jump to specific question solution
        div.addEventListener('click', function() {
            currentQuestionIndex = index;
            updateSolutionView();
        });
        
        document.getElementById("questionPanel").appendChild(div);
    });

    document.getElementById("prevBtn").style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
    document.getElementById("saveNextBtn").textContent = currentQuestionIndex < currentQuizData.length - 1 ? "Next" : "Finish";
    
    // Add event listener for Back to Results button
    const backToResultsBtn = document.getElementById("backToResultsBtn");
    if (backToResultsBtn) {
        backToResultsBtn.addEventListener("click", function() {
            document.getElementById("testPage").style.display = "none";
            document.getElementById("result").style.display = "block";
        });
    }
}

function calculateRank(score, totalQuestions) {
    // Get all submissions from localStorage
    let submissions = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
    
    // Add current test data for ranking
    const currentTest = {
        name: studentName,
        marks: score,
        totalQuestions: totalQuestions,
        accuracy: (score / totalQuestions) * 100,
        timestamp: Date.now()
    };
    
    // Add current test to submissions for ranking
    submissions.push(currentTest);
    
    // Sort by marks (descending) and then by time taken (ascending)
    submissions.sort((a, b) => {
        if (b.marks !== a.marks) {
            return b.marks - a.marks; // Higher marks first
        } else {
            return a.timestamp - b.timestamp; // Earlier submission first for same marks
        }
    });
    
    // Find the rank of the current test
    const rank = submissions.findIndex(s => 
        s.name === studentName && 
        s.marks === score && 
        s.totalQuestions === totalQuestions
    ) + 1;
    
    // Save the updated submissions
    localStorage.setItem('quizSubmissions', JSON.stringify(submissions));
    
    return rank > 0 ? rank : submissions.length;
}

function getRankBadge(rank) {
    if (rank === 1) return '🏆'; // Gold for 1st
    if (rank === 2) return '🥈'; // Silver for 2nd
    if (rank === 3) return '🥉'; // Bronze for 3rd
    if (rank <= 10) return '⭐'; // Star for top 10
    return '🎯'; // Target for others
}

function getPerformanceMessage(accuracy) {
    if (accuracy >= 90) return 'Outstanding Performance! Keep up the excellent work!';
    if (accuracy >= 75) return 'Great Job! You have a strong grasp of the material.';
    if (accuracy >= 50) return 'Good Effort! Review your mistakes to improve further.';
    return 'Keep Practicing! Review the material and try again.';
}

function updateLeaderboardPreview() {
    const leaderboardPreview = document.getElementById('leaderboardPreview');
    if (!leaderboardPreview) return;
    
    const submissions = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
    if (submissions.length === 0) {
        leaderboardPreview.innerHTML = `
            <div class="empty-leaderboard">
                <p>No test attempts yet. Be the first to take a test!</p>
            </div>`;
        return;
    }
    
    // Sort submissions by score (descending) and timestamp (ascending for same scores)
    const sortedSubmissions = [...submissions].sort((a, b) => {
        if (b.marks !== a.marks) return b.marks - a.marks;
        return a.timestamp - b.timestamp;
    });
    
    // Take top 5 for preview
    const topSubmissions = sortedSubmissions.slice(0, 5);
    
    // Generate leaderboard HTML
    leaderboardPreview.innerHTML = `
        <table class="leaderboard-table">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Accuracy</th>
                </tr>
            </thead>
            <tbody>
                ${topSubmissions.map((submission, index) => {
                    const isCurrentUser = submission.name === studentName;
                    const rowClass = isCurrentUser ? 'current-user' : '';
                    return `
                        <tr class="${rowClass}">
                            <td>
                                <span class="rank-badge">${getRankBadge(index + 1)}</span>
                                <span>${index + 1}</span>
                            </td>
                            <td>
                                ${submission.name} ${isCurrentUser ? '<span class="you-badge">(You)</span>' : ''}
                            </td>
                            <td>${submission.marks}/${submission.totalQuestions || '?'}</td>
                            <td>
                                <div class="accuracy-bar-container">
                                    <div class="accuracy-bar" style="width: ${submission.accuracy}%;"></div>
                                    <span>${parseFloat(submission.accuracy || 0).toFixed(1)}%</span>
                                </div>
                            </td>
                        </tr>`;
                }).join('')}
            </tbody>
        </table>
    `;
    
    // Add leaderboard styles if not already added
    if (!document.getElementById('leaderboard-preview-styles')) {
        const style = document.createElement('style');
        style.id = 'leaderboard-preview-styles';
        style.textContent = `
            .leaderboard-table {
                width: 100%;
                border-collapse: collapse;
                margin: 15px 0;
                font-size: 0.9em;
            }
            .leaderboard-table th, 
            .leaderboard-table td {
                padding: 12px 15px;
                text-align: left;
                border-bottom: 1px solid #e9ecef;
            }
            .leaderboard-table th {
                background-color: #f8f9fa;
                color: #6c757d;
                font-weight: 600;
                text-transform: uppercase;
                font-size: 0.8em;
                letter-spacing: 0.5px;
            }
            .leaderboard-table tr:last-child td {
                border-bottom: none;
            }
            .leaderboard-table .current-user {
                background-color: rgba(106, 176, 76, 0.08);
                font-weight: 600;
            }
            .rank-badge {
                margin-right: 8px;
            }
            .you-badge {
                background: #6ab04c;
                color: white;
                font-size: 0.7em;
                padding: 2px 6px;
                border-radius: 10px;
                margin-left: 5px;
            }
            .accuracy-bar-container {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .accuracy-bar {
                height: 6px;
                background: linear-gradient(90deg, #6ab04c, #f9ca24);
                border-radius: 3px;
                min-width: 20px;
                transition: width 0.5s ease-in-out;
            }
            .leaderboard-table td:first-child {
                display: flex;
                align-items: center;
                font-weight: 600;
            }
            .empty-leaderboard {
                text-align: center;
                padding: 20px;
                color: #6c757d;
                font-style: italic;
            }
        `;
        document.head.appendChild(style);
    }
}

function updateLeaderboard() {
    let submissions = JSON.parse(localStorage.getItem('quizSubmissions')) || [];
    
    // Sort by marks (primary) and then by time taken (secondary)
    submissions.sort((a, b) => {
        if (b.marks !== a.marks) {
            return b.marks - a.marks;
        } else {
            return a.timestamp - b.timestamp;
        }
    });
    
    const leaderboardBody = document.getElementById("leaderboardBody");
    if (leaderboardBody) {
        leaderboardBody.innerHTML = "";
        
        // Take top 10 for leaderboard
        const topSubmissions = submissions.slice(0, 10);
        
        if (topSubmissions.length === 0) {
            leaderboardBody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 15px; color: #6c757d;">
                        No test attempts yet. Be the first to take a test!
                    </td>
                </tr>`;
            return;
        }
        
        topSubmissions.forEach((submission, index) => {
            const row = document.createElement("tr");
            const rank = index + 1;
            const isCurrentUser = submission.name === studentName;
            
            // Add highlight class for current user
            const rowClass = isCurrentUser ? 'current-user' : '';
            
            row.className = rowClass;
            row.innerHTML = `
                <td>
                    <span class="rank-badge">${getRankBadge(rank)}</span>
                    <span>${rank}</span>
                </td>
                <td>
                    ${submission.name} ${isCurrentUser ? '<span class="you-badge">(You)</span>' : ''}
                </td>
                <td>${submission.marks} / ${submission.totalQuestions}</td>
                <td>
                    <div class="accuracy-bar-container">
                        <div class="accuracy-bar" style="width: ${submission.accuracy}%;"></div>
                        <span>${parseFloat(submission.accuracy).toFixed(1)}%</span>
                    </div>
                </td>
            `;
            leaderboardBody.appendChild(row);
        });
        
        // Add leaderboard styles
        const style = document.createElement('style');
        style.textContent = `
            .current-user {
                background-color: rgba(106, 176, 76, 0.1);
                font-weight: bold;
            }
            .rank-badge {
                margin-right: 5px;
                font-size: 1.2em;
            }
            .you-badge {
                background: #6ab04c;
                color: white;
                font-size: 0.7em;
                padding: 2px 6px;
                border-radius: 10px;
                margin-left: 5px;
            }
            .accuracy-bar-container {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .accuracy-bar {
                height: 8px;
                background: linear-gradient(90deg, #6ab04c, #f9ca24);
                border-radius: 4px;
                min-width: 5px;
                transition: width 0.5s ease-in-out;
            }
            .leaderboard-table td:first-child {
                display: flex;
                align-items: center;
            }
        `;
        document.head.appendChild(style);
    } else {
        console.error("leaderboardBody not found!");
    }
}
// Swipe navigation for mobile
let touchstartX = 0;
let touchendX = 0;
const questionArea = document.getElementById("questionArea");
if (questionArea) {
    questionArea.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });
    questionArea.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchendX < touchstartX - 50) {
        saveAndNextQuestion();
    }
    if (touchendX > touchstartX + 50) {
        showPreviousQuestion();
    }
}

// Prevent screenshots (basic attempt, note limitations)
document.addEventListener('keydown', function(e) {
    if (e.key === 'PrintScreen') {
        alert("Screenshots are prohibited during the test.");
        e.preventDefault();
    }
});