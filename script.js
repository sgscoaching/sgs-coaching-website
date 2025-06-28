// Quiz data with 5 quizzes per subject, tailored to class syllabus and increasing difficulty
const quizzes = {
    6: {
        math: [
            { title: "Basic Arithmetic", questions: [
                { q: "What is 5 + 3?", options: ["7", "8", "9", "10"], answer: "8" },
                { q: "What is 10 - 4?", options: ["5", "6", "7", "8"], answer: "6" },
                { q: "What is 2 × 3?", options: ["5", "6", "7", "8"], answer: "6" }
            ]},
            { title: "Fractions Intro", questions: [
                { q: "What is 1/2 of 10?", options: ["4", "5", "6", "7"], answer: "5" },
                { q: "What is 1/4 of 8?", options: ["1", "2", "3", "4"], answer: "2" },
                { q: "Add 1/2 + 1/4?", options: ["3/4", "1", "1/2", "2/3"], answer: "3/4" }
            ]},
            { title: "Shapes and Area", questions: [
                { q: "What is the area of a 2x3 rectangle?", options: ["5", "6", "7", "8"], answer: "6" },
                { q: "How many sides does a triangle have?", options: ["3", "4", "5", "6"], answer: "3" },
                { q: "What is the perimeter of a 2x2 square?", options: ["6", "8", "10", "12"], answer: "8" }
            ]},
            { title: "Number Patterns", questions: [
                { q: "What comes next: 2, 4, 6, 8?", options: ["9", "10", "11", "12"], answer: "10" },
                { q: "What is the next odd number after 7?", options: ["8", "9", "10", "11"], answer: "9" },
                { q: "Complete: 1, 3, 5, 7?", options: ["8", "9", "10", "11"], answer: "9" }
            ]},
            { title: "Word Problems", questions: [
                { q: "If you have 3 apples and get 2 more, how many?", options: ["4", "5", "6", "7"], answer: "5" },
                { q: "A book costs 4 rupees, how much for 2?", options: ["6", "7", "8", "9"], answer: "8" },
                { q: "If 5 candies cost 10 rupees, 1 costs?", options: ["1", "2", "3", "4"], answer: "2" }
            ]}
        ],
        science: [
            { title: "Living Things", questions: [
                { q: "What do plants need to grow?", options: ["Water", "Sand", "Stone", "Metal"], answer: "Water" },
                { q: "What gas do plants release?", options: ["Oxygen", "Carbon", "Nitrogen", "Hydrogen"], answer: "Oxygen" },
                { q: "How many legs does a spider have?", options: ["6", "8", "10", "12"], answer: "8" }
            ]},
            { title: "Earth and Space", questions: [
                { q: "What is the closest star?", options: ["Mars", "Sun", "Moon", "Jupiter"], answer: "Sun" },
                { q: "How many planets in our solar system?", options: ["7", "8", "9", "10"], answer: "8" },
                { q: "What covers most of Earth?", options: ["Land", "Water", "Air", "Fire"], answer: "Water" }
            ]},
            { title: "Matter Basics", questions: [
                { q: "What are the three states of matter?", options: ["Solid, Liquid, Gas", "Hot, Cold, Warm", "Red, Blue, Green", "Big, Small, Medium"], answer: "Solid, Liquid, Gas" },
                { q: "What is water in frozen form?", options: ["Steam", "Ice", "Vapor", "Cloud"], answer: "Ice" },
                { q: "Which is a solid?", options: ["Air", "Water", "Wood", "Steam"], answer: "Wood" }
            ]},
            { title: "Energy Sources", questions: [
                { q: "What is a renewable energy source?", options: ["Coal", "Solar", "Oil", "Gas"], answer: "Solar" },
                { q: "What powers a windmill?", options: ["Water", "Wind", "Fire", "Sun"], answer: "Wind" },
                { q: "Which gives us light?", options: ["Moon", "Sun", "Stars", "Clouds"], answer: "Sun" }
            ]},
            { title: "Simple Machines", questions: [
                { q: "What is a lever?", options: ["A wheel", "A bar that lifts", "A rope", "A screw"], answer: "A bar that lifts" },
                { q: "What uses a wheel and axle?", options: ["Door", "Car", "Table", "Chair"], answer: "Car" },
                { q: "What is a pulley used for?", options: ["Lifting", "Cutting", "Heating", "Cooling"], answer: "Lifting" }
            ]}
        ],
        english: [
            { title: "Vocabulary Basics", questions: [
                { q: "What does 'happy' mean?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: "Joyful" },
                { q: "What is a synonym for 'big'?", options: ["Small", "Large", "Tiny", "Short"], answer: "Large" },
                { q: "What is an antonym for 'dark'?", options: ["Light", "Black", "Night", "Shadow"], answer: "Light" }
            ]},
            { title: "Grammar Intro", questions: [
                { q: "Which is a noun?", options: ["Run", "Dog", "Jump", "Sing"], answer: "Dog" },
                { q: "What is a sentence?", options: ["Word", "Phrase with verb", "Letter", "Number"], answer: "Phrase with verb" },
                { q: "Which is a verb?", options: ["Cat", "Play", "Blue", "Tree"], answer: "Play" }
            ]},
            { title: "Reading Comprehension", questions: [
                { q: "If a cat sleeps, what does it do?", options: ["Eats", "Rests", "Runs", "Jumps"], answer: "Rests" },
                { q: "What color is the sky?", options: ["Green", "Blue", "Red", "Yellow"], answer: "Blue" },
                { q: "Who flies a plane?", options: ["Doctor", "Pilot", "Teacher", "Cook"], answer: "Pilot" }
            ]},
            { title: "Punctuation", questions: [
                { q: "Where does a period go?", options: ["End", "Middle", "Start", "None"], answer: "End" },
                { q: "What marks a question?", options: ["?", "!", ".", ","], answer: "?" },
                { q: "What is used for a list?", options: [",", ".", ":", ";"], answer: "," }
            ]},
            { title: "Story Elements", questions: [
                { q: "Who is in a story?", options: ["Characters", "Numbers", "Colors", "Shapes"], answer: "Characters" },
                { q: "What is the story about?", options: ["Plot", "Page", "Ink", "Paper"], answer: "Plot" },
                { q: "Where does a story happen?", options: ["Setting", "Title", "Word", "Line"], answer: "Setting" }
            ]}
        ]
    },
    7: {
        math: [
            { title: "Algebra Basics", questions: [
                { q: "Solve: x + 3 = 7", options: ["4", "5", "6", "7"], answer: "4" },
                { q: "What is 2x = 10?", options: ["4", "5", "6", "7"], answer: "5" },
                { q: "Solve: 3x - 2 = 7", options: ["2", "3", "4", "5"], answer: "3" }
            ]},
            { title: "Geometry Shapes", questions: [
                { q: "What is the area of a 3x4 rectangle?", options: ["10", "12", "14", "16"], answer: "12" },
                { q: "How many degrees in a triangle?", options: ["180", "270", "360", "450"], answer: "180" },
                { q: "Perimeter of a 5x5 square?", options: ["15", "20", "25", "30"], answer: "20" }
            ]},
            { title: "Fractions and Decimals", questions: [
                { q: "What is 1/2 + 1/3?", options: ["5/6", "2/3", "3/4", "1"], answer: "5/6" },
                { q: "Convert 0.75 to fraction?", options: ["3/4", "1/2", "2/3", "3/5"], answer: "3/4" },
                { q: "What is 25% of 20?", options: ["4", "5", "6", "7"], answer: "5" }
            ]},
            { title: "Measurement", questions: [
                { q: "How many cm in 1 meter?", options: ["50", "100", "150", "200"], answer: "100" },
                { q: "What is the area of a 4x3 rectangle?", options: ["10", "12", "14", "16"], answer: "12" },
                { q: "Convert 1 km to meters?", options: ["100", "500", "1000", "1500"], answer: "1000" }
            ]},
            { title: "Basic Probability", questions: [
                { q: "What is the chance of heads in a coin?", options: ["25%", "50%", "75%", "100%"], answer: "50%" },
                { q: "What is 1/2 as a percentage?", options: ["25%", "50%", "75%", "100%"], answer: "50%" },
                { q: "If 2 of 4 are red, what is P(red)?", options: ["25%", "50%", "75%", "100%"], answer: "50%" }
            ]}
        ],
        science: [
            { title: "Ecosystems", questions: [
                { q: "What do animals eat in a food chain?", options: ["Sun", "Plants", "Rocks", "Air"], answer: "Plants" },
                { q: "What is a producer?", options: ["Lion", "Grass", "Eagle", "Fish"], answer: "Grass" },
                { q: "What eats a producer?", options: ["Sun", "Herbivore", "Carnivore", "Decomposer"], answer: "Herbivore" }
            ]},
            { title: "Forces and Motion", questions: [
                { q: "What makes things move?", options: ["Force", "Color", "Sound", "Light"], answer: "Force" },
                { q: "What opposes motion?", options: ["Gravity", "Friction", "Speed", "Energy"], answer: "Friction" },
                { q: "What pulls objects down?", options: ["Push", "Gravity", "Lift", "Pull"], answer: "Gravity" }
            ]},
            { title: "Chemical Changes", questions: [
                { q: "What is a chemical change?", options: ["Melting", "Burning", "Freezing", "Dissolving"], answer: "Burning" },
                { q: "What gas is in rusting?", options: ["O₂", "H₂", "CO₂", "N₂"], answer: "O₂" },
                { q: "What is produced in combustion?", options: ["Water", "CO₂", "O₂", "H₂"], answer: "CO₂" }
            ]},
            { title: "Weather Patterns", questions: [
                { q: "What causes rain?", options: ["Sun", "Clouds", "Wind", "Heat"], answer: "Clouds" },
                { q: "What is a hurricane?", options: ["Calm", "Strong wind", "Snow", "Fog"], answer: "Strong wind" },
                { q: "What measures temperature?", options: ["Barometer", "Thermometer", "Anemometer", "Hygrometer"], answer: "Thermometer" }
            ]},
            { title: "Human Body", questions: [
                { q: "What pumps blood?", options: ["Lungs", "Heart", "Stomach", "Brain"], answer: "Heart" },
                { q: "What gas do we breathe?", options: ["O₂", "CO₂", "N₂", "H₂"], answer: "O₂" },
                { q: "What digests food?", options: ["Heart", "Stomach", "Lungs", "Kidneys"], answer: "Stomach" }
            ]}
        ],
        english: [
            { title: "Sentence Structure", questions: [
                { q: "Which is a complete sentence?", options: ["Run fast", "The dog barks", "Happy child", "Big house"], answer: "The dog barks" },
                { q: "What is a subject?", options: ["Verb", "Noun", "Adjective", "Adverb"], answer: "Noun" },
                { q: "What is a predicate?", options: ["Noun", "Verb", "Adjective", "Article"], answer: "Verb" }
            ]},
            { title: "Reading Skills", questions: [
                { q: "What is the main idea?", options: ["Detail", "Topic", "Word", "Sentence"], answer: "Topic" },
                { q: "What supports the main idea?", options: ["Title", "Details", "Picture", "Page"], answer: "Details" },
                { q: "What is a conclusion?", options: ["Start", "End", "Middle", "Title"], answer: "End" }
            ]},
            { title: "Parts of Speech", questions: [
                { q: "Which is an adverb?", options: ["Quickly", "Dog", "Run", "Happy"], answer: "Quickly" },
                { q: "Which is a pronoun?", options: ["He", "Jump", "Blue", "Run"], answer: "He" },
                { q: "Which is a preposition?", options: ["On", "Sing", "Tall", "Book"], answer: "On" }
            ]},
            { title: "Spelling and Vocabulary", questions: [
                { q: "Spell 'beautiful' correctly?", options: ["beautifull", "beautiful", "beautifal", "beautifull"], answer: "beautiful" },
                { q: "What means 'kind'?", options: ["Mean", "Nice", "Rude", "Sad"], answer: "Nice" },
                { q: "Spell 'together' correctly?", options: ["togather", "together", "togther", "togehter"], answer: "together" }
            ]},
            { title: "Creative Writing", questions: [
                { q: "What is a story beginning?", options: ["End", "Introduction", "Middle", "Conclusion"], answer: "Introduction" },
                { q: "What describes a character?", options: ["Plot", "Setting", "Traits", "Theme"], answer: "Traits" },
                { q: "What is a climax?", options: ["Start", "Highest point", "End", "Middle"], answer: "Highest point" }
            ]}
        ]
    },
    11: {
        math: [
            { title: "Algebra Advanced", questions: [
                { q: "Solve: 2x² - 8 = 0", options: ["2, -2", "4, -4", "1, -1", "3, -3"], answer: "2, -2" },
                { q: "What is the discriminant of x² - 5x + 6?", options: ["1", "5", "25", "49"], answer: "1" },
                { q: "Solve: (x - 3)(x + 2) = 0", options: ["3, -2", "3, 2", "-3, 2", "-3, -2"], answer: "3, -2" }
            ]},
            { title: "Trigonometry Basics", questions: [
                { q: "What is sin(30°)?", options: ["0.5", "0.707", "1", "0"], answer: "0.5" },
                { q: "What is cos(60°)?", options: ["0.5", "0.707", "1", "0"], answer: "0.5" },
                { q: "What is tan(45°)?", options: ["0", "1", "0.707", "1.414"], answer: "1" }
            ]},
            { title: "Calculus Intro", questions: [
                { q: "What is the derivative of x²?", options: ["2x", "x", "2", "0"], answer: "2x" },
                { q: "What is ∫(2x) dx?", options: ["x²", "x² + C", "2x²", "2x² + C"], answer: "x² + C" },
                { q: "What is the limit as x→0 of sin(x)/x?", options: ["0", "1", "∞", "-1"], answer: "1" }
            ]},
            { title: "Coordinate Geometry", questions: [
                { q: "Distance between (0,0) and (3,4)?", options: ["3", "5", "7", "9"], answer: "5" },
                { q: "Slope of line y = 3x - 2?", options: ["2", "3", "-2", "0"], answer: "3" },
                { q: "What is midpoint of (1,2) and (3,4)?", options: ["(2,3)", "(2,2)", "(3,3)", "(1,1)"], answer: "(2,3)" }
            ]},
            { title: "Competitive Math (JEE)", questions: [
                { q: "Solve: x² - 6x + 9 = 0", options: ["3", "±3", "0", "6"], answer: "3" },
                { q: "What is (a + b)²?", options: ["a² + b²", "a² + 2ab + b²", "a² - b²", "2ab"], answer: "a² + 2ab + b²" },
                { q: "What is logₐb × logᵦa?", options: ["0", "1", "2", "-1"], answer: "1" }
            ]}
        ],
        science: [
            { title: "Physics Mechanics", questions: [
                { q: "What is the unit of force?", options: ["kg", "m/s", "N", "J"], answer: "N" },
                { q: "What is acceleration due to gravity?", options: ["9.8 m/s²", "10 m/s²", "8 m/s²", "12 m/s²"], answer: "9.8 m/s²" },
                { q: "What is momentum?", options: ["mass × velocity", "force × time", "energy × distance", "power × time"], answer: "mass × velocity" }
            ]},
            { title: "Chemistry Reactions", questions: [
                { q: "What is a catalyst?", options: ["Speeds reaction", "Slows reaction", "Stops reaction", "No effect"], answer: "Speeds reaction" },
                { q: "What gas is produced by acid + metal?", options: ["O₂", "H₂", "CO₂", "N₂"], answer: "H₂" },
                { q: "What is the pH of a neutral solution?", options: ["0", "7", "14", "1"], answer: "7" }
            ]},
            { title: "Physics Waves", questions: [
                { q: "What is the speed of sound (approx)?", options: ["340 m/s", "300 m/s", "400 m/s", "500 m/s"], answer: "340 m/s" },
                { q: "What is wavelength × frequency?", options: ["Speed", "Energy", "Amplitude", "Period"], answer: "Speed" },
                { q: "What is the unit of frequency?", options: ["Hz", "m/s", "N", "J"], answer: "Hz" }
            ]},
            { title: "Chemistry Organic", questions: [
                { q: "What is the functional group of alcohol?", options: ["-OH", "-COOH", "-CHO", "-NH₂"], answer: "-OH" },
                { q: "What is C₂H₅OH?", options: ["Ethanol", "Methanol", "Propanol", "Butanol"], answer: "Ethanol" },
                { q: "What is a hydrocarbon?", options: ["C and H", "C and O", "H and O", "C and N"], answer: "C and H" }
            ]},
            { title: "Competitive Science (JEE)", questions: [
                { q: "What is the atomic number of Carbon?", options: ["6", "7", "8", "9"], answer: "6" },
                { q: "What is the formula of sulfuric acid?", options: ["H₂SO₄", "HNO₃", "HCl", "NaOH"], answer: "H₂SO₄" },
                { q: "What is the SI unit of energy?", options: ["N", "J", "W", "kg"], answer: "J" }
            ]}
        ],
        english: [
            { title: "Advanced Grammar", questions: [
                { q: "Which is a gerund?", options: ["Running", "Run", "Ran", "Runner"], answer: "Running" },
                { q: "What is a participle?", options: ["Singing", "Sing", "Song", "Sung"], answer: "Sung" },
                { q: "Which is a complex sentence?", options: ["I run", "I run and jump", "Because I run, I win", "Run now"], answer: "Because I run, I win" }
            ]},
            { title: "Literature Analysis", questions: [
                { q: "What is a theme?", options: ["Plot", "Main idea", "Character", "Setting"], answer: "Main idea" },
                { q: "What is a metaphor?", options: ["Comparison with like", "Direct comparison", "Sound device", "Rhyme"], answer: "Direct comparison" },
                { q: "Who is the narrator?", options: ["Author", "Character", "Reader", "Editor"], answer: "Character" }
            ]},
            { title: "Critical Analysis", questions: [
                { q: "What is a thesis?", options: ["Conclusion", "Main argument", "Evidence", "Summary"], answer: "Main argument" },
                { q: "What is a foil character?", options: ["Hero", "Contrast to main", "Villain", "Narrator"], answer: "Contrast to main" },
                { q: "What is an allusion?", options: ["Direct quote", "Reference to other work", "New idea", "Random word"], answer: "Reference to other work" }
            ]},
            { title: "Essay Writing", questions: [
                { q: "What is an introduction?", options: ["End", "Start with thesis", "Middle", "Conclusion"], answer: "Start with thesis" },
                { q: "What supports an argument?", options: ["Opinion", "Evidence", "Guess", "Story"], answer: "Evidence" },
                { q: "What is a counterargument?", options: ["Opposing view", "Same view", "New topic", "Old idea"], answer: "Opposing view" }
            ]},
            { title: "Competitive English (SSC)", questions: [
                { q: "Choose the correct sentence:", options: ["He go to school", "He goes to school", "He gone to school", "He going to school"], answer: "He goes to school" },
                { q: "What is a synonym for 'difficult'?", options: ["Easy", "Hard", "Simple", "Clear"], answer: "Hard" },
                { q: "Fill in: She ___ (read) a book.", options: ["reads", "read", "reading", "readed"], answer: "reads" }
            ]}
        ]
    },
    12: {
        math: [
            { title: "Calculus Advanced", questions: [
                { q: "What is the derivative of sin(x)?", options: ["cos(x)", "sin(x)", "-cos(x)", "1"], answer: "cos(x)" },
                { q: "What is ∫(x³) dx?", options: ["x⁴/4 + C", "x⁴ + C", "x³/3 + C", "x²/2 + C"], answer: "x⁴/4 + C" },
                { q: "What is the second derivative of x³?", options: ["3x", "6x", "6", "3"], answer: "6" }
            ]},
            { title: "Probability and Statistics", questions: [
                { q: "What is P(A) if A occurs 3/10 times?", options: ["0.3", "0.4", "0.5", "0.6"], answer: "0.3" },
                { q: "What is P(A or B) if P(A)=0.4, P(B)=0.3, P(A and B)=0.1?", options: ["0.6", "0.7", "0.8", "0.9"], answer: "0.6" },
                { q: "What is the median of 1, 3, 5, 7, 9?", options: ["3", "5", "7", "9"], answer: "5" }
            ]},
            { title: "Vectors and 3D Geometry", questions: [
                { q: "What is magnitude of vector <3, 4>?", options: ["5", "6", "7", "8"], answer: "5" },
                { q: "What is dot product of <1, 2> and <2, 1>?", options: ["4", "5", "6", "7"], answer: "4" },
                { q: "What is equation of plane if normal is <1, 1, 1>?", options: ["x + y + z = 0", "x - y + z = 0", "x + y - z = 0", "x - y - z = 0"], answer: "x + y + z = 0" }
            ]},
            { title: "Competitive Math (JEE)", questions: [
                { q: "Solve: x² - 6x + 9 = 0", options: ["3", "±3", "0", "6"], answer: "3" },
                { q: "What is (a + b)²?", options: ["a² + b²", "a² + 2ab + b²", "a² - b²", "2ab"], answer: "a² + 2ab + b²" },
                { q: "What is logₐb × logᵦa?", options: ["0", "1", "2", "-1"], answer: "1" }
            ]},
            { title: "Competitive Math (SSC Advanced)", questions: [
                { q: "What is 20% of 250?", options: ["40", "45", "50", "55"], answer: "50" },
                { q: "If A:B=3:4, B:C=5:6, A:C?", options: ["15:24", "5:8", "3:4", "1:2"], answer: "15:24" },
                { q: "Average of 5, 10, 15, 20?", options: ["10", "12.5", "15", "17.5"], answer: "12.5" }
            ]}
        ],
        science: [
            { title: "Physics Waves", questions: [
                { q: "What is the speed of sound (approx)?", options: ["340 m/s", "300 m/s", "400 m/s", "500 m/s"], answer: "340 m/s" },
                { q: "What is wavelength × frequency?", options: ["Speed", "Energy", "Amplitude", "Period"], answer: "Speed" },
                { q: "What is the unit of frequency?", options: ["Hz", "m/s", "N", "J"], answer: "Hz" }
            ]},
            { title: "Chemistry Organic", questions: [
                { q: "What is the functional group of alcohol?", options: ["-OH", "-COOH", "-CHO", "-NH₂"], answer: "-OH" },
                { q: "What is C₂H₅OH?", options: ["Ethanol", "Methanol", "Propanol", "Butanol"], answer: "Ethanol" },
                { q: "What is a hydrocarbon?", options: ["C and H", "C and O", "H and O", "C and N"], answer: "C and H" }
            ]},
            { title: "Physics Electricity", questions: [
                { q: "What is the unit of current?", options: ["V", "A", "Ω", "W"], answer: "A" },
                { q: "What is Ohm’s Law?", options: ["V = IR", "I = VR", "R = VI", "V = I/R"], answer: "V = IR" },
                { q: "What is power in P = VI?", options: ["Voltage", "Current", "Voltage × Current", "Resistance"], answer: "Voltage × Current" }
            ]},
            { title: "Chemistry Equilibrium", questions: [
                { q: "What is Le Chatelier’s principle?", options: ["Shift with change", "No change", "Reverse reaction", "Stop reaction"], answer: "Shift with change" },
                { q: "What increases with pressure in gas equilibrium?", options: ["Reactants", "Products", "Both", "None"], answer: "Products" },
                { q: "What is Kc?", options: ["Equilibrium constant", "Reaction rate", "Pressure", "Volume"], answer: "Equilibrium constant" }
            ]},
            { title: "Competitive Science (JEE)", questions: [
                { q: "What is the atomic number of Carbon?", options: ["6", "7", "8", "9"], answer: "6" },
                { q: "What is the formula of sulfuric acid?", options: ["H₂SO₄", "HNO₃", "HCl", "NaOH"], answer: "H₂SO₄" },
                { q: "What is the SI unit of energy?", options: ["N", "J", "W", "kg"], answer: "J" }
            ]}
        ],
        english: [
            { title: "Critical Analysis", questions: [
                { q: "What is a thesis?", options: ["Conclusion", "Main argument", "Evidence", "Summary"], answer: "Main argument" },
                { q: "What is a foil character?", options: ["Hero", "Contrast to main", "Villain", "Narrator"], answer: "Contrast to main" },
                { q: "What is an allusion?", options: ["Direct quote", "Reference to other work", "New idea", "Random word"], answer: "Reference to other work" }
            ]},
            { title: "Essay Writing", questions: [
                { q: "What is an introduction?", options: ["End", "Start with thesis", "Middle", "Conclusion"], answer: "Start with thesis" },
                { q: "What supports an argument?", options: ["Opinion", "Evidence", "Guess", "Story"], answer: "Evidence" },
                { q: "What is a counterargument?", options: ["Opposing view", "Same view", "New topic", "Old idea"], answer: "Opposing view" }
            ]},
            { title: "Literary Devices", questions: [
                { q: "What is alliteration?", options: ["Repetition of sounds", "Rhyme", "Metaphor", "Simile"], answer: "Repetition of sounds" },
                { q: "What is a hyperbole?", options: ["Exaggeration", "Fact", "Comparison", "Sound"], answer: "Exaggeration" },
                { q: "What is personification?", options: ["Human traits to objects", "Animal traits", "Sound effect", "Rhyme"], answer: "Human traits to objects" }
            ]},
            { title: "Competitive English (Bank PO)", questions: [
                { q: "Choose the correct sentence:", options: ["He have a car", "He has a car", "He had a car", "He having a car"], answer: "He has a car" },
                { q: "What is a synonym for 'rapid'?", options: ["Slow", "Fast", "Calm", "Quiet"], answer: "Fast" },
                { q: "Fill in: They ___ (play) football.", options: ["plays", "play", "played", "playing"], answer: "play" }
            ]},
            { title: "Competitive English (CAT)", questions: [
                { q: "Choose the correct sentence:", options: ["She go to market", "She goes to market", "She gone to market", "She going to market"], answer: "She goes to market" },
                { q: "What is a synonym for 'vivid'?", options: ["Dull", "Bright", "Dark", "Faint"], answer: "Bright" },
                { q: "Fill in: He ___ (write) a letter.", options: ["writes", "write", "wrote", "writing"], answer: "writes" }
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
