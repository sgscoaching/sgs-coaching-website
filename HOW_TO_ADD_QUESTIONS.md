# How to Add Questions to Your Quiz System

## ✅ GitHub Pages Compatibility

**YES, everything will work on GitHub Pages!** The Google Sheets integration uses API calls that work from any hosting platform, including GitHub Pages. All devices (mobile, tablet, desktop) will be able to:
- Take quizzes
- Submit results to Google Sheets
- See leaderboards from Google Sheets
- View all rankers

---

## 📚 Part 1: Adding Chapterwise Quiz Questions

### File: `script.js`

### Structure:
```javascript
window.quizData = {
  CLASS_NUMBER: {
    SUBJECT_NAME: [
      {
        title: "Chapter Name",
        questions: [
          {
            q: "Question text?",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            answer: "Correct Answer"
          },
          // Optional: Add image
          {
            q: "Question with image?",
            image: "images/your_image.png",  // Optional
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            answer: "Correct Answer"
          }
        ]
      }
    ]
  }
}
```

### Example - Adding a New Chapter:

```javascript
window.quizData = {
  1: {
    mathematics: [
      // ... existing chapters ...
      {
        title: "Chapter 8: New Chapter Name",
        questions: [
          {
            q: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
          },
          {
            q: "What is 5 - 3?",
            options: ["1", "2", "3", "4"],
            answer: "2"
          },
          {
            q: "Which shape has 4 sides?",
            image: "images/square.png",  // Optional image
            options: ["Circle", "Triangle", "Square", "Pentagon"],
            answer: "Square"
          }
        ]
      }
    ]
  }
}
```

### Steps:
1. Open `script.js`
2. Find the class number (e.g., `1:`, `2:`, etc.)
3. Find the subject (e.g., `mathematics:`, `english:`, etc.)
4. Add a new chapter object with `title` and `questions` array
5. Each question needs: `q`, `options`, `answer`
6. Optional: Add `image` property for questions with images

---

## 🎯 Part 2: Adding Midterm Test Questions

### File: `midterm-questions.js`

### Structure:
```javascript
window.midtermQuizData = {
  "CLASS_NUMBER": {
    "SUBJECT_NAME": {
      "midterm1": {  // or "midterm2"
        "sample1": [  // or "sample2", "sample3"
          // Questions array
        ]
      }
    }
  }
}
```

### Question Types:

#### 1. **MCQ (Multiple Choice Question)**
```javascript
{
  type: "mcq",
  q: "What is the capital of India?",
  options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
  answer: "Delhi",
  difficulty: "easy"  // or "moderate", "difficult"
}
```

#### 2. **Fill in the Blank**
```javascript
{
  type: "fill_in_blank",
  q: "The capital of India is _____.",
  answer: "Delhi",  // Case-insensitive matching
  difficulty: "easy"
}
```

#### 3. **True/False**
```javascript
{
  type: "true_false",
  q: "The sun rises in the east.",
  answer: "True",  // Must be exactly "True" or "False"
  difficulty: "easy"
}
```

#### 4. **Assertion/Reasoning**
```javascript
{
  type: "assertion_reasoning",
  q: "Assertion: The Earth is round.\nReason: All planets are round.",
  options: [
    "Both A and R are true and R is the correct explanation of A.",
    "Both A and R are true but R is not the correct explanation of A.",
    "A is true but R is false.",
    "A is false but R is true."
  ],
  answer: "Both A and R are true but R is not the correct explanation of A.",
  difficulty: "difficult"
}
```

### Complete Example - Adding Midterm Questions:

```javascript
window.midtermQuizData = {
  "1": {
    "Mathematics": {
      "midterm1": {
        "sample1": [
          // MCQ Example
          {
            type: "mcq",
            q: "What is 5 + 3?",
            options: ["6", "7", "8", "9"],
            answer: "8",
            difficulty: "easy"
          },
          
          // Fill in Blank Example
          {
            type: "fill_in_blank",
            q: "The sum of 2 and 3 is _____.",
            answer: "5",
            difficulty: "easy"
          },
          
          // True/False Example
          {
            type: "true_false",
            q: "2 + 2 equals 4.",
            answer: "True",
            difficulty: "easy"
          },
          
          // Assertion/Reasoning Example
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
          }
        ],
        "sample2": [
          // Add more questions for sample 2
        ],
        "sample3": [
          // Add more questions for sample 3
        ]
      },
      "midterm2": {
        "sample1": [
          // Midterm 2 questions
        ]
      }
    }
  }
}
```

### Important Notes for Midterm Tests:

1. **Question Distribution**: The system automatically selects:
   - 25 MCQs
   - 10 Fill in the Blank
   - 10 True/False
   - 5 Assertion/Reasoning
   - **Total: 50 questions**

2. **Add Enough Questions**: Make sure you have at least:
   - 25+ MCQs per sample test
   - 10+ Fill in Blank per sample test
   - 10+ True/False per sample test
   - 5+ Assertion/Reasoning per sample test

3. **Subject Names**: Use exact spelling:
   - "Mathematics" (not "Math" or "math")
   - "Science" (not "sciences")
   - "Environmental Studies" (exact match)

4. **Class Numbers**: Use strings: `"1"`, `"2"`, `"9"`, etc.

---

## 📝 Quick Reference

### Chapterwise Quiz (script.js)
```javascript
{
  q: "Question?",
  options: ["A", "B", "C", "D"],
  answer: "Correct Answer"
}
```

### Midterm MCQ
```javascript
{
  type: "mcq",
  q: "Question?",
  options: ["A", "B", "C", "D"],
  answer: "Correct Answer",
  difficulty: "easy"
}
```

### Midterm Fill in Blank
```javascript
{
  type: "fill_in_blank",
  q: "The answer is _____.",
  answer: "answer",
  difficulty: "easy"
}
```

### Midterm True/False
```javascript
{
  type: "true_false",
  q: "Statement here.",
  answer: "True",  // or "False"
  difficulty: "easy"
}
```

### Midterm Assertion/Reasoning
```javascript
{
  type: "assertion_reasoning",
  q: "Assertion: ...\nReason: ...",
  options: [
    "Both A and R are true and R is the correct explanation of A.",
    "Both A and R are true but R is not the correct explanation of A.",
    "A is true but R is false.",
    "A is false but R is true."
  ],
  answer: "Both A and R are true and R is the correct explanation of A.",
  difficulty: "difficult"
}
```

---

## ✅ Testing Your Questions

1. **For Chapterwise Quizzes**:
   - Go to `quizzes.html`
   - Select Class → Subject → Test Type: "Chapterwise"
   - Select your new chapter
   - Take the quiz to test

2. **For Midterm Tests**:
   - Go to `quizzes.html`
   - Select Class → Subject → Test Type: "Mid Term 1" or "Mid Term 2"
   - Select Sample Test (1, 2, or 3)
   - Take the test - it should have 50 questions with all types

---

## 🚨 Common Mistakes to Avoid

1. ❌ Missing `type` property in midterm questions
2. ❌ Wrong answer format (True/False must be exactly "True" or "False")
3. ❌ Subject name mismatch (check spelling exactly)
4. ❌ Missing commas between questions
5. ❌ Not enough questions of each type for midterm tests
6. ❌ Using numbers instead of strings for class numbers in midterm data

---

## 💡 Tips

- **Copy existing questions** and modify them
- **Test after adding** a few questions first
- **Keep questions organized** by chapter/topic
- **Use consistent difficulty levels** for midterm questions
- **Save your work frequently** while adding questions

