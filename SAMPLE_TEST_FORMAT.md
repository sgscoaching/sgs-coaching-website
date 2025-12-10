# 📝 Sample Test Format - Sample 1 Template

This is a complete template for creating **Sample Test 1** questions. Copy this format and fill in your questions.

## 📊 Required Question Distribution

Each **sample1** test needs exactly:
- **25 MCQs** (Multiple Choice Questions)
- **10 Fill in the Blank** questions
- **10 True/False** questions
- **5 Assertion/Reasoning** questions
- **Total: 50 questions**

---

## 📋 Complete Template

```javascript
"sample1": [
  // ========== 25 MCQs (Multiple Choice Questions) ==========
  
  // MCQ 1
  {
    type: "mcq",
    q: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option A",  // Must match one of the options exactly
    difficulty: "easy"  // or "moderate" or "difficult"
  },
  
  // MCQ 2
  {
    type: "mcq",
    q: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option B",
    difficulty: "easy"
  },
  
  // MCQ 3
  {
    type: "mcq",
    q: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "Option C",
    difficulty: "moderate"
  },
  
  // ... Continue for MCQ 4 through MCQ 25
  // (You need 25 MCQs total)
  
  // ========== 10 Fill in the Blank Questions ==========
  
  // Fill in Blank 1
  {
    type: "fill_in_blank",
    q: "Your question with _____ blank here.",
    answer: "correct answer",  // Case-insensitive matching
    difficulty: "easy"
  },
  
  // Fill in Blank 2
  {
    type: "fill_in_blank",
    q: "Another question with _____ blank.",
    answer: "answer",
    difficulty: "easy"
  },
  
  // ... Continue for Fill in Blank 3 through Fill in Blank 10
  // (You need 10 Fill in Blank questions total)
  
  // ========== 10 True/False Questions ==========
  
  // True/False 1
  {
    type: "true_false",
    q: "Your statement here.",
    answer: "True",  // Must be exactly "True" or "False" (capital T/F)
    difficulty: "easy"
  },
  
  // True/False 2
  {
    type: "true_false",
    q: "Another statement here.",
    answer: "False",
    difficulty: "easy"
  },
  
  // ... Continue for True/False 3 through True/False 10
  // (You need 10 True/False questions total)
  
  // ========== 5 Assertion/Reasoning Questions ==========
  
  // Assertion/Reasoning 1
  {
    type: "assertion_reasoning",
    q: "Assertion: Your assertion statement here.\nReason: Your reason statement here.",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is not the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    answer: "Both A and R are true and R is the correct explanation of A.",
    difficulty: "difficult"
  },
  
  // Assertion/Reasoning 2
  {
    type: "assertion_reasoning",
    q: "Assertion: Another assertion.\nReason: Another reason.",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is not the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    answer: "Both A and R are true but R is not the correct explanation of A.",
    difficulty: "moderate"
  },
  
  // ... Continue for Assertion/Reasoning 3 through Assertion/Reasoning 5
  // (You need 5 Assertion/Reasoning questions total)
]
```

---

## 🎯 Real Example (Mathematics - Class 1)

Here's a complete real example you can use as reference:

```javascript
"sample1": [
  // ========== 25 MCQs ==========
  {
    type: "mcq",
    q: "What is 2 + 3?",
    options: ["4", "5", "6", "7"],
    answer: "5",
    difficulty: "easy"
  },
  {
    type: "mcq",
    q: "What is 5 - 2?",
    options: ["2", "3", "4", "5"],
    answer: "3",
    difficulty: "easy"
  },
  {
    type: "mcq",
    q: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    answer: "3",
    difficulty: "easy"
  },
  {
    type: "mcq",
    q: "What is 10 + 5?",
    options: ["14", "15", "16", "17"],
    answer: "15",
    difficulty: "easy"
  },
  {
    type: "mcq",
    q: "Which number comes after 9?",
    options: ["8", "9", "10", "11"],
    answer: "10",
    difficulty: "easy"
  },
  // ... Add 20 more MCQs (total 25)
  
  // ========== 10 Fill in the Blank ==========
  {
    type: "fill_in_blank",
    q: "The sum of 1 and 1 is _____.",
    answer: "2",
    difficulty: "easy"
  },
  {
    type: "fill_in_blank",
    q: "A triangle has _____ sides.",
    answer: "three",
    difficulty: "easy"
  },
  {
    type: "fill_in_blank",
    q: "5 + 3 equals _____.",
    answer: "8",
    difficulty: "easy"
  },
  // ... Add 7 more Fill in Blank (total 10)
  
  // ========== 10 True/False ==========
  {
    type: "true_false",
    q: "2 + 2 equals 4.",
    answer: "True",
    difficulty: "easy"
  },
  {
    type: "true_false",
    q: "A circle has 4 sides.",
    answer: "False",
    difficulty: "easy"
  },
  {
    type: "true_false",
    q: "5 is greater than 3.",
    answer: "True",
    difficulty: "easy"
  },
  // ... Add 7 more True/False (total 10)
  
  // ========== 5 Assertion/Reasoning ==========
  {
    type: "assertion_reasoning",
    q: "Assertion: All even numbers are divisible by 2.\nReason: Even numbers are multiples of 2.",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is not the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    answer: "Both A and R are true and R is the correct explanation of A.",
    difficulty: "moderate"
  },
  {
    type: "assertion_reasoning",
    q: "Assertion: A square has 4 equal sides.\nReason: All rectangles have 4 sides.",
    options: [
      "Both A and R are true and R is the correct explanation of A.",
      "Both A and R are true but R is not the correct explanation of A.",
      "A is true but R is false.",
      "A is false but R is true."
    ],
    answer: "Both A and R are true but R is not the correct explanation of A.",
    difficulty: "moderate"
  }
  // ... Add 3 more Assertion/Reasoning (total 5)
]
```

---

## ✅ Quick Checklist

Before submitting, make sure:
- [ ] Exactly **25 MCQs** (type: "mcq")
- [ ] Exactly **10 Fill in Blank** (type: "fill_in_blank")
- [ ] Exactly **10 True/False** (type: "true_false")
- [ ] Exactly **5 Assertion/Reasoning** (type: "assertion_reasoning")
- [ ] All MCQs have 4 options
- [ ] All True/False answers are exactly "True" or "False"
- [ ] All Assertion/Reasoning have the 4 standard options
- [ ] All questions have commas between them (except the last one)
- [ ] All brackets are properly closed

---

## 💡 Tips

1. **Copy the template** and replace with your questions
2. **Keep difficulty balanced** - mix easy, moderate, and difficult
3. **Test your format** - Make sure JSON syntax is correct
4. **Use consistent formatting** - Follow the spacing and indentation
5. **Double-check answers** - Make sure answers match options exactly

---

## 🚨 Common Mistakes

1. ❌ Wrong number of questions (must be exactly 25+10+10+5 = 50)
2. ❌ Missing commas between questions
3. ❌ True/False answers not capitalized ("true" instead of "True")
4. ❌ Answer doesn't match any option in MCQ
5. ❌ Missing `type` property
6. ❌ Wrong Assertion/Reasoning option text

---

**Good luck creating your questions! 🎓**

