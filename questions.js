window.questionBank = {
    QuantitativeAptitude: {
        NumberSystem: {
            Test1: [
                {
                    question: "What is the sum of the first 10 natural numbers?",
                    options: ["45", "55", "65", "75"],
                    answer: "55",
                    explanation: "The sum of the first n natural numbers is given by n(n+1)/2. For n=10, sum = 10*11/2 = 55."
                },
                {
                    question: "Which of the following is a prime number?",
                    options: ["4", "9", "11", "15"],
                    answer: "11",
                    explanation: "A prime number is divisible only by 1 and itself. Among the options, only 11 is prime."
                },
                {
                    question: "What is the value of 2^5?",
                    options: ["16", "32", "64", "128"],
                    answer: "32",
                    explanation: "2^5 = 2 * 2 * 2 * 2 * 2 = 32."
                },
                {
                    question: "What is the GCD of 12 and 18?",
                    options: ["3", "6", "9", "12"],
                    answer: "6",
                    explanation: "Using the Euclidean algorithm, GCD(18,12) = GCD(12,6) = 6."
                },
                {
                    question: "If a number is divisible by both 3 and 5, it is divisible by:",
                    options: ["8", "15", "20", "25"],
                    answer: "15",
                    explanation: "A number divisible by both 3 and 5 is divisible by their LCM, which is 15."
                },
                // Add 15 more questions for Subject Wise (20 total)
                ...Array(15).fill().map((_, i) => ({
                    question: `What is the result of ${i + 6} * 2?`,
                    options: [`${(i + 6) * 2}`, `${(i + 6) * 2 + 1}`, `${(i + 6) * 2 - 1}`, `${(i + 6) * 2 + 2}`],
                    answer: `${(i + 6) * 2}`,
                    explanation: `The result of ${i + 6} * 2 is ${(i + 6) * 2}.`
                }))
            ],
            Test2: [
                {
                    question: "What is the square of 7?",
                    options: ["42", "49", "56", "64"],
                    answer: "49",
                    explanation: "7 * 7 = 49."
                },
                // Add 19 more for Subject Wise
                ...Array(19).fill().map((_, i) => ({
                    question: `What is ${i + 10} + 10?`,
                    options: [`${i + 20}`, `${i + 19}`, `${i + 21}`, `${i + 22}`],
                    answer: `${i + 20}`,
                    explanation: `${i + 10} + 10 = ${i + 20}.`
                }))
            ]
        },
        HCFandLCMofNumbers: {
            Test1: [
                {
                    question: "What is the LCM of 6 and 8?",
                    options: ["12", "24", "48", "16"],
                    answer: "24",
                    explanation: "LCM of 6 and 8 is found using the formula: LCM(a,b) = (a*b)/GCD(a,b). GCD(6,8) = 2, so LCM = (6*8)/2 = 24."
                },
                // Add 19 more for Subject Wise
                ...Array(19).fill().map((_, i) => ({
                    question: `What is the GCD of ${i + 10} and ${i + 10 + 2}?`,
                    options: ["1", "2", "3", "4"],
                    answer: "2",
                    explanation: `GCD(${i + 10}, ${i + 12}) = 2 for consecutive even numbers.`
                }))
            ]
        },
        Percentage: {
            Test1: [
                {
                    question: "What is 25% of 200?",
                    options: ["25", "50", "75", "100"],
                    answer: "50",
                    explanation: "25% of 200 = (25/100) * 200 = 50."
                },
                // Add 19 more for Subject Wise
                ...Array(19).fill().map((_, i) => ({
                    question: `What is ${i + 10}% of 100?`,
                    options: [`${i + 10}`, `${i + 11}`, `${i + 9}`, `${i + 12}`],
                    answer: `${i + 10}`,
                    explanation: `${i + 10}% of 100 = ${(i + 10) / 100 * 100} = ${i + 10}.`
                }))
            ]
        }
    },
    Reasoning: {
        LogicalReasoning: { Test1: [], Test2: [], Test3: [] },
        AnalyticalReasoning: { Test1: [], Test2: [], Test3: [] },
        Puzzles: { Test1: [], Test2: [], Test3: [] }
    },
    GeneralAwareness: {
        History: { Test1: [], Test2: [], Test3: [] },
        Geography: { Test1: [], Test2: [], Test3: [] },
        CurrentAffairs: { Test1: [], Test2: [], Test3: [] }
    },
    BasicComputer: {
        ComputerFundamentals: { Test1: [], Test2: [], Test3: [] },
        MSOffice: { Test1: [], Test2: [], Test3: [] },
        Internet: { Test1: [], Test2: [], Test3: [] }
    },
    English: {
        Grammar: { Test1: [], Test2: [], Test3: [] },
        Vocabulary: { Test1: [], Test2: [], Test3: [] },
        ReadingComprehension: { Test1: [], Test2: [], Test3: [] }
    }
};