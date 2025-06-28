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
    },11: {
    physics: [
        { title: "Units and Measurements", questions: [
            { q: "What is the SI unit of force?", options: ["kg", "N", "m/s", "J"], answer: "N" },
            { q: "How many significant figures in 0.0050?", options: ["1", "2", "3", "4"], answer: "2" },
            { q: "What is the dimensional formula of velocity?", options: ["L/T", "L²/T", "L/T²", "LT"], answer: "L/T" }
        ]},
        { title: "Motion in a Straight Line", questions: [
            { q: "What is average speed if distance is 100m in 20s?", options: ["4 m/s", "5 m/s", "6 m/s", "7 m/s"], answer: "5 m/s" },
            { q: "What is acceleration?", options: ["v/t", "v×t", "v+t", "v-t"], answer: "v/t" },
            { q: "What is uniform motion?", options: ["Constant speed", "Varying speed", "Zero speed", "Negative speed"], answer: "Constant speed" }
        ]},
        { title: "Laws of Motion", questions: [
            { q: "What is Newton’s First Law?", options: ["Law of inertia", "Law of acceleration", "Law of action-reaction", "Law of gravitation"], answer: "Law of inertia" },
            { q: "What is force unit?", options: ["kg", "N", "m/s", "J"], answer: "N" },
            { q: "What opposes motion?", options: ["Friction", "Gravity", "Momentum", "Energy"], answer: "Friction" }
        ]},
        { title: "Work, Energy and Power", questions: [
            { q: "What is the SI unit of work?", options: ["N", "J", "W", "kg"], answer: "J" },
            { q: "What is kinetic energy formula?", options: ["mv²", "½mv²", "mgh", "F×d"], answer: "½mv²" },
            { q: "What is power?", options: ["Work/time", "Force/distance", "Mass/velocity", "Energy/mass"], answer: "Work/time" }
        ]},
        { title: "System of Particles", questions: [
            { q: "What is center of mass?", options: ["Point of balance", "Point of force", "Point of energy", "Point of motion"], answer: "Point of balance" },
            { q: "What is momentum?", options: ["mass × velocity", "force × time", "energy × distance", "power × time"], answer: "mass × velocity" },
            { q: "What is conserved in an isolated system?", options: ["Energy", "Momentum", "Force", "Velocity"], answer: "Momentum" }
        ]}
    ],
    mathematics: [
        { title: "Sets", questions: [
            { q: "What is a set?", options: ["Collection of objects", "Single number", "Equation", "Function"], answer: "Collection of objects" },
            { q: "What is an empty set?", options: ["{0}", "{}", "{1}", "{null}"], answer: "{}" },
            { q: "What is union of A and B?", options: ["A ∩ B", "A ∪ B", "A - B", "A × B"], answer: "A ∪ B" }
        ]},
        { title: "Relations and Functions", questions: [
            { q: "What is a function?", options: ["One input, one output", "Many inputs, one output", "One input, many outputs", "No input"], answer: "One input, one output" },
            { q: "What is domain?", options: ["Set of outputs", "Set of inputs", "Set of relations", "Set of functions"], answer: "Set of inputs" },
            { q: "Is y = x² a function?", options: ["Yes", "No", "Sometimes", "Never"], answer: "Yes" }
        ]},
        { title: "Trigonometric Functions", questions: [
            { q: "What is sin(90°)?", options: ["0", "0.5", "1", "0.707"], answer: "1" },
            { q: "What is the value of cos(0°)?", options: ["0", "1", "0.5", "-1"], answer: "1" },
            { q: "What is identity sin²θ + cos²θ?", options: ["0", "1", "2", "-1"], answer: "1" }
        ]},
        { title: "Complex Numbers", questions: [
            { q: "What is i²?", options: ["1", "-1", "0", "i"], answer: "-1" },
            { q: "What is modulus of 3 + 4i?", options: ["3", "4", "5", "7"], answer: "5" },
            { q: "What is conjugate of 2 - 3i?", options: ["2 + 3i", "2 - 3i", "-2 + 3i", "-2 - 3i"], answer: "2 + 3i" }
        ]},
        { title: "Sequences and Series", questions: [
            { q: "What is sum of first n natural numbers?", options: ["n(n+1)/2", "n²", "n(n-1)/2", "n/2"], answer: "n(n+1)/2" },
            { q: "What is an AP?", options: ["Arithmetic Progression", "Geometric Progression", "Harmonic Progression", "None"], answer: "Arithmetic Progression" },
            { q: "What is common difference in 2, 5, 8?", options: ["2", "3", "5", "8"], answer: "3" }
        ]}
    ],
    chemistry: [
        { title: "Some Basic Concepts of Chemistry", questions: [
            { q: "What is a mole?", options: ["6.022 × 10²³ particles", "1 gram", "1 liter", "1 kg"], answer: "6.022 × 10²³ particles" },
            { q: "What is molar mass of H₂O?", options: ["16 g", "18 g", "20 g", "22 g"], answer: "18 g" },
            { q: "What is law of conservation of mass?", options: ["Mass is created", "Mass is destroyed", "Mass is constant", "Mass varies"], answer: "Mass is constant" }
        ]},
        { title: "Structure of Atom", questions: [
            { q: "What is atomic number?", options: ["Protons", "Neutrons", "Electrons", "Mass"], answer: "Protons" },
            { q: "Who proposed quantum model?", options: ["Bohr", "Rutherford", "Schrodinger", "Thomson"], answer: "Schrodinger" },
            { q: "What is an orbit?", options: ["Fixed path", "Random path", "Energy level", "Electron cloud"], answer: "Fixed path" }
        ]},
        { title: "Classification of Elements", questions: [
            { q: "What is periodic table based on?", options: ["Atomic mass", "Atomic number", "Density", "Volume"], answer: "Atomic number" },
            { q: "Which group has noble gases?", options: ["1", "2", "17", "18"], answer: "18" },
            { q: "What is a period?", options: ["Horizontal row", "Vertical column", "Diagonal line", "Center"], answer: "Horizontal row" }
        ]},
        { title: "Chemical Bonding", questions: [
            { q: "What is ionic bond?", options: ["Sharing electrons", "Transfer of electrons", "No electrons", "Weak force"], answer: "Transfer of electrons" },
            { q: "What is covalent bond?", options: ["Sharing electrons", "Transfer of electrons", "No bond", "Magnetic force"], answer: "Sharing electrons" },
            { q: "What is electronegativity?", options: ["Electron attraction", "Proton repulsion", "Neutron force", "Mass effect"], answer: "Electron attraction" }
        ]},
        { title: "States of Matter", questions: [
            { q: "What is Boyle’s Law?", options: ["P∝1/V", "V∝T", "P∝T", "V∝1/P"], answer: "P∝1/V" },
            { q: "What is ideal gas?", options: ["No interactions", "Strong interactions", "No volume", "No pressure"], answer: "No interactions" },
            { q: "What is plasma?", options: ["Ionized gas", "Solid", "Liquid", "Gas"], answer: "Ionized gas" }
        ]}
    ],
    biology: [
        { title: "The Living World", questions: [
            { q: "What is taxonomy?", options: ["Classification", "Evolution", "Genetics", "Ecology"], answer: "Classification" },
            { q: "What is a species?", options: ["Group of similar organisms", "Single organism", "Dead organism", "Plant only"], answer: "Group of similar organisms" },
            { q: "What is binomial nomenclature?", options: ["Two-name system", "One-name system", "Three-name system", "No name"], answer: "Two-name system" }
        ]},
        { title: "Biological Classification", questions: [
            { q: "What is a kingdom?", options: ["Broad category", "Single species", "Family", "Genus"], answer: "Broad category" },
            { q: "Which kingdom includes bacteria?", options: ["Monera", "Protista", "Fungi", "Plantae"], answer: "Monera" },
            { q: "What are autotrophs?", options: ["Self-feeders", "Heterotrophs", "Parasites", "Decomposers"], answer: "Self-feeders" }
        ]},
        { title: "Plant Kingdom", questions: [
            { q: "What is thallus?", options: ["Simple plant body", "Flower", "Root", "Leaf"], answer: "Simple plant body" },
            { q: "What is alternation of generations?", options: ["Sporophyte and gametophyte", "Only sporophyte", "Only gametophyte", "No alternation"], answer: "Sporophyte and gametophyte" },
            { q: "Which is a bryophyte?", options: ["Moss", "Fern", "Pine", "Grass"], answer: "Moss" }
        ]},
        { title: "Animal Kingdom", questions: [
            { q: "What is symmetry?", options: ["Body plan", "Color", "Size", "Shape"], answer: "Body plan" },
            { q: "Which phylum has cnidarians?", options: ["Porifera", "Cnidaria", "Platyhelminthes", "Annelida"], answer: "Cnidaria" },
            { q: "What are vertebrates?", options: ["Animals with backbone", "Animals without backbone", "Plants", "Fungi"], answer: "Animals with backbone" }
        ]},
        { title: "Human Physiology", questions: [
            { q: "What is digestion?", options: ["Breaking down food", "Building food", "Storing food", "Excreting food"], answer: "Breaking down food" },
            { q: "What pumps blood?", options: ["Heart", "Lungs", "Kidneys", "Liver"], answer: "Heart" },
            { q: "What is respiration?", options: ["Oxygen use", "Food intake", "Water loss", "Heat production"], answer: "Oxygen use" }
        ]}
    ]
},
12: {
    physics: [
        { title: "Electric Charges and Fields", questions: [
            { q: "What is Coulomb’s Law?", options: ["F = kq₁q₂/r²", "F = ma", "V = IR", "E = mc²"], answer: "F = kq₁q₂/r²" },
            { q: "What is electric field unit?", options: ["N/C", "V/m", "J/C", "Both N/C and V/m"], answer: "Both N/C and V/m" },
            { q: "What is a positive charge?", options: ["Excess protons", "Excess electrons", "No charge", "Neutral"], answer: "Excess protons" }
        ]},
        { title: "Current Electricity", questions: [
            { q: "What is Ohm’s Law?", options: ["V = IR", "I = V/R", "R = V/I", "All of these"], answer: "All of these" },
            { q: "What is unit of resistance?", options: ["Ω", "V", "A", "W"], answer: "Ω" },
            { q: "What is a series circuit?", options: ["One path", "Multiple paths", "No path", "Parallel only"], answer: "One path" }
        ]},
        { title: "Magnetic Effects of Current", questions: [
            { q: "Who discovered electromagnetism?", options: ["Faraday", "Maxwell", "Oersted", "Ampere"], answer: "Oersted" },
            { q: "What is right-hand rule for?", options: ["Magnetic field", "Electric field", "Current", "Voltage"], answer: "Magnetic field" },
            { q: "What is a solenoid?", options: ["Coiled wire", "Straight wire", "Plate", "Battery"], answer: "Coiled wire" }
        ]},
        { title: "Electromagnetic Induction", questions: [
            { q: "What is Faraday’s Law?", options: ["Induced EMF ∝ rate of change of flux", "F = ma", "V = IR", "E = mc²"], answer: "Induced EMF ∝ rate of change of flux" },
            { q: "What is Lenz’s Law?", options: ["Opposes change", "Supports change", "No effect", "Increases change"], answer: "Opposes change" },
            { q: "What generates EMF?", options: ["Moving magnet", "Stationary magnet", "Still wire", "No magnet"], answer: "Moving magnet" }
        ]},
        { title: "Optics", questions: [
            { q: "What is lens formula?", options: ["1/f = 1/v - 1/u", "1/f = 1/u + 1/v", "f = uv", "f = u - v"], answer: "1/f = 1/v - 1/u" },
            { q: "What is refraction?", options: ["Bending of light", "Reflection of light", "Absorption", "Emission"], answer: "Bending of light" },
            { q: "What is focal length?", options: ["Distance to focus", "Distance to lens", "Distance to object", "Distance to image"], answer: "Distance to focus" }
        ]}
    ],
    mathematics: [
        { title: "Relations and Functions", questions: [
            { q: "What is an inverse function?", options: ["f⁻¹(x)", "f(x)", "f(x)²", "1/f(x)"], answer: "f⁻¹(x)" },
            { q: "What is a binary operation?", options: ["Two inputs", "One input", "No input", "Three inputs"], answer: "Two inputs" },
            { q: "Is y = x³ a function?", options: ["Yes", "No", "Sometimes", "Never"], answer: "Yes" }
        ]},
        { title: "Inverse Trigonometric Functions", questions: [
            { q: "What is sin⁻¹(0)?", options: ["0", "π/2", "π", "-π/2"], answer: "0" },
            { q: "What is range of tan⁻¹(x)?", options: ["(-π/2, π/2)", "(0, π)", "(-π, π)", "(0, 2π)"], answer: "(-π/2, π/2)" },
            { q: "What is cos⁻¹(1)?", options: ["0", "π/2", "π", "2π"], answer: "0" }
        ]},
        { title: "Matrices", questions: [
            { q: "What is determinant of [[1, 2], [3, 4]]?", options: ["-2", "0", "2", "4"], answer: "-2" },
            { q: "What is identity matrix order 2?", options: ["[[1, 0], [0, 1]]", "[[0, 1], [1, 0]]", "[[1, 1], [1, 1]]", "[[0, 0], [0, 0]]"], answer: "[[1, 0], [0, 1]]" },
            { q: "What is transpose of [[1, 2], [3, 4]]?", options: ["[[1, 3], [2, 4]]", "[[2, 4], [1, 3]]", "[[1, 2], [3, 4]]", "[[4, 3], [2, 1]]"], answer: "[[1, 3], [2, 4]]" }
        ]},
        { title: "Determinants", questions: [
            { q: "What is determinant of 3x3 identity matrix?", options: ["0", "1", "3", "-1"], answer: "1" },
            { q: "What makes a matrix singular?", options: ["det = 0", "det = 1", "det = -1", "det = 2"], answer: "det = 0" },
            { q: "What is minor of element in 2x2 matrix?", options: ["Other element", "Row element", "Column element", "Diagonal element"], answer: "Other element" }
        ]},
        { title: "Continuity and Differentiability", questions: [
            { q: "What is derivative of x²?", options: ["2x", "x", "2", "0"], answer: "2x" },
            { q: "What is limit as x→0 of sin(x)/x?", options: ["0", "1", "∞", "-1"], answer: "1" },
            { q: "What is a continuous function?", options: ["No breaks", "With breaks", "Discontinuous", "Zero"], answer: "No breaks" }
        ]}
    ],
    chemistry: [
        { title: "Solutions", questions: [
            { q: "What is molarity?", options: ["Moles/L", "Moles/kg", "g/L", "g/kg"], answer: "Moles/L" },
            { q: "What is a saturated solution?", options: ["No more solute", "More solute", "No solute", "Less solute"], answer: "No more solute" },
            { q: "What affects solubility?", options: ["Temperature", "Color", "Shape", "Size"], answer: "Temperature" }
        ]},
        { title: "Electrochemistry", questions: [
            { q: "What is a galvanic cell?", options: ["Produces electricity", "Consumes electricity", "No reaction", "Stores charge"], answer: "Produces electricity" },
            { q: "What is standard electrode potential?", options: ["E°", "V", "I", "R"], answer: "E°" },
            { q: "What is electrolysis?", options: ["Decomposition by current", "Combination by current", "No change", "Heat reaction"], answer: "Decomposition by current" }
        ]},
        { title: "Chemical Kinetics", questions: [
            { q: "What is rate of reaction?", options: ["Change in conc./time", "Time/conc.", "Conc./time²", "Time²/conc."], answer: "Change in conc./time" },
            { q: "What is catalyst effect?", options: ["Speeds reaction", "Slows reaction", "Stops reaction", "No effect"], answer: "Speeds reaction" },
            { q: "What is order of reaction?", options: ["Sum of exponents", "Product of exponents", "Average of exponents", "None"], answer: "Sum of exponents" }
        ]},
        { title: "Surface Chemistry", questions: [
            { q: "What is adsorption?", options: ["Surface attachment", "Bulk attachment", "Dissolution", "Evaporation"], answer: "Surface attachment" },
            { q: "What is a catalyst?", options: ["Speeds reaction", "Slows reaction", "Stops reaction", "No effect"], answer: "Speeds reaction" },
            { q: "What is colloid?", options: ["Dispersed particles", "Dissolved particles", "Solid particles", "Gas particles"], answer: "Dispersed particles" }
        ]},
        { title: "Coordination Compounds", questions: [
            { q: "What is coordination number?", options: ["Ligands attached", "Electrons", "Protons", "Neutrons"], answer: "Ligands attached" },
            { q: "What is a ligand?", options: ["Ion/molecule bound", "Free ion", "Free molecule", "Gas"], answer: "Ion/molecule bound" },
            { q: "What is chelation?", options: ["Ring formation", "Straight chain", "No bond", "Weak bond"], answer: "Ring formation" }
        ]}
    ],
    biology: [
        { title: "Reproduction in Organisms", questions: [
            { q: "What is asexual reproduction?", options: ["One parent", "Two parents", "Three parents", "No parent"], answer: "One parent" },
            { q: "What is binary fission?", options: ["Cell division", "Cell fusion", "Cell growth", "Cell death"], answer: "Cell division" },
            { q: "What is vegetative propagation?", options: ["Plant parts", "Animal parts", "Human parts", "No parts"], answer: "Plant parts" }
        ]},
        { title: "Human Reproduction", questions: [
            { q: "What produces sperm?", options: ["Testes", "Ovaries", "Uterus", "Vagina"], answer: "Testes" },
            { q: "What is ovulation?", options: ["Egg release", "Sperm release", "Blood release", "No release"], answer: "Egg release" },
            { q: "What is fertilization?", options: ["Egg and sperm union", "Egg division", "Sperm division", "No union"], answer: "Egg and sperm union" }
        ]},
        { title: "Principles of Inheritance", questions: [
            { q: "Who is father of genetics?", options: ["Mendel", "Darwin", "Watson", "Crick"], answer: "Mendel" },
            { q: "What is dominant trait?", options: ["Expressed", "Hidden", "Neutral", "Absent"], answer: "Expressed" },
            { q: "What is genotype?", options: ["Genetic makeup", "Physical trait", "Environment", "Behavior"], answer: "Genetic makeup" }
        ]},
        { title: "Molecular Basis of Inheritance", questions: [
            { q: "What is DNA?", options: ["Deoxyribonucleic acid", "Ribonucleic acid", "Deoxyribose", "Ribose"], answer: "Deoxyribonucleic acid" },
            { q: "What is replication?", options: ["DNA copying", "RNA copying", "Protein making", "Cell division"], answer: "DNA copying" },
            { q: "What is a gene?", options: ["Unit of heredity", "Unit of energy", "Unit of mass", "Unit of volume"], answer: "Unit of heredity" }
        ]},
        { title: "Evolution", questions: [
            { q: "What is natural selection?", options: ["Survival of fittest", "Survival of weakest", "No survival", "Random survival"], answer: "Survival of fittest" },
            { q: "Who proposed evolution theory?", options: ["Darwin", "Mendel", "Lamarck", "Watson"], answer: "Darwin" },
            { q: "What is homologous structure?", options: ["Similar origin", "Different origin", "No origin", "Random"], answer: "Similar origin" }
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
