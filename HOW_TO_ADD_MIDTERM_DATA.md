# 📚 Guide: How to Add Midterm Data for All Classes and Subjects

## 🎯 Overview

This guide will help you add midterm test questions for every class and subject. Each midterm test requires:
- **25 MCQs** (Multiple Choice Questions)
- **10 Fill in the Blank** questions
- **10 True/False** questions
- **5 Assertion/Reasoning** questions
- **Total: 50 questions per sample test**

## 📋 Structure

The midterm data is stored in `midterm-questions.js` with this structure:

```javascript
window.midtermQuizData = {
  "CLASS_NUMBER": {  // Use string, e.g., "1", "6", "7", etc.
    "Subject Name": {  // Use Title Case, e.g., "Mathematics", "English"
      "midterm1": {  // First midterm
        "sample1": [  // Sample Test 1
          // 50 questions here (25 MCQ + 10 Fill + 10 T/F + 5 A/R)
        ],
        "sample2": [  // Sample Test 2
          // 50 questions here
        ],
        "sample3": [  // Sample Test 3
          // 50 questions here
        ]
      },
      "midterm2": {  // Second midterm
        "sample1": [  // Sample Test 1
          // 50 questions here
        ],
        "sample2": [  // Sample Test 2
          // 50 questions here
        ],
        "sample3": [  // Sample Test 3
          // 50 questions here
        ]
      }
    }
  }
}
```

## 📝 Question Types Format

### 1. MCQ (Multiple Choice Question)
```javascript
{
  type: "mcq",
  q: "What is 5 + 3?",
  options: ["6", "7", "8", "9"],
  answer: "8",
  difficulty: "easy"  // or "moderate", "difficult"
}
```

### 2. Fill in the Blank
```javascript
{
  type: "fill_in_blank",
  q: "The capital of India is _____.",  // Use _____ for blank
  answer: "Delhi",  // Case-insensitive matching
  difficulty: "easy"
}
```

### 3. True/False
```javascript
{
  type: "true_false",
  q: "The sun rises in the east.",
  answer: "True",  // Must be exactly "True" or "False" (capital T/F)
  difficulty: "easy"
}
```

### 4. Assertion/Reasoning
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

## 🔍 Step-by-Step Process

### Step 1: Identify Classes and Subjects

Check `script.js` to see which classes and subjects exist:
- Classes: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
- Common subjects: English, Mathematics, Science, Hindi, etc.

**Important:** Subject names in `midterm-questions.js` use **Title Case**:
- `english` → `"English"`
- `mathematics` → `"Mathematics"`
- `science` → `"Science"`
- `hindi` → `"Hindi"`
- `english_grammar` → `"English Grammar"`

### Step 2: Open `midterm-questions.js`

Open the file `midterm-questions.js` in your code editor.

### Step 3: Find or Create Class Entry

For each class, find or create an entry:
```javascript
"1": {  // Class 1
  // Subjects go here
}
```

### Step 4: Add Subject Entry

For each subject in that class:
```javascript
"1": {
  "Mathematics": {  // Subject name in Title Case
    "midterm1": {
      // Midterm 1 tests
    },
    "midterm2": {
      // Midterm 2 tests
    }
  }
}
```

### Step 5: Add Questions for Each Sample Test

For each sample test (sample1, sample2, sample3), add exactly:
- **25 MCQs** (type: "mcq")
- **10 Fill in the Blank** (type: "fill_in_blank")
- **10 True/False** (type: "true_false")
- **5 Assertion/Reasoning** (type: "assertion_reasoning")

**Example:**
```javascript
"sample1": [
  // 25 MCQs
  {
    type: "mcq",
    q: "Question 1?",
    options: ["A", "B", "C", "D"],
    answer: "A",
    difficulty: "easy"
  },
  // ... 24 more MCQs
  
  // 10 Fill in the Blank
  {
    type: "fill_in_blank",
    q: "Fill in the blank: _____",
    answer: "answer",
    difficulty: "easy"
  },
  // ... 9 more Fill in the Blank
  
  // 10 True/False
  {
    type: "true_false",
    q: "Statement here.",
    answer: "True",
    difficulty: "easy"
  },
  // ... 9 more True/False
  
  // 5 Assertion/Reasoning
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
  // ... 4 more Assertion/Reasoning
]
```

## ✅ Complete Example

Here's a complete example for Class 1, Mathematics, Midterm 1, Sample 1:

```javascript
"1": {
  "Mathematics": {
    "midterm1": {
      "sample1": [
        // MCQ 1
        {
          type: "mcq",
          q: "What is 2 + 3?",
          options: ["4", "5", "6", "7"],
          answer: "5",
          difficulty: "easy"
        },
        // ... 24 more MCQs
        
        // Fill in Blank 1
        {
          type: "fill_in_blank",
          q: "The sum of 1 and 1 is _____.",
          answer: "2",
          difficulty: "easy"
        },
        // ... 9 more Fill in Blank
        
        // True/False 1
        {
          type: "true_false",
          q: "2 + 2 equals 4.",
          answer: "True",
          difficulty: "easy"
        },
        // ... 9 more True/False
        
        // Assertion/Reasoning 1
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
        // ... 4 more Assertion/Reasoning
      ],
      "sample2": [
        // Same structure - 50 questions
      ],
      "sample3": [
        // Same structure - 50 questions
      ]
    },
    "midterm2": {
      "sample1": [
        // Same structure - 50 questions
      ],
      "sample2": [
        // Same structure - 50 questions
      ],
      "sample3": [
        // Same structure - 50 questions
      ]
    }
  }
}
```

## 🚨 Important Rules

1. **Class numbers must be strings**: Use `"1"` not `1`
2. **Subject names must match exactly**: Check spelling and capitalization
3. **Question counts are strict**: 
   - Exactly 25 MCQs
   - Exactly 10 Fill in Blank
   - Exactly 10 True/False
   - Exactly 5 Assertion/Reasoning
4. **True/False answers**: Must be exactly `"True"` or `"False"` (capital letters)
5. **Fill in Blank answers**: Case-insensitive, but be consistent
6. **Commas**: Don't forget commas between questions (except the last one)
7. **Brackets**: Make sure all arrays and objects are properly closed

## 📊 Quick Checklist

For each class and subject, you need:
- [ ] Class entry created (e.g., `"1": {`)
- [ ] Subject entry created (e.g., `"Mathematics": {`)
- [ ] `midterm1` section with `sample1`, `sample2`, `sample3`
- [ ] `midterm2` section with `sample1`, `sample2`, `sample3`
- [ ] Each sample test has exactly:
  - [ ] 25 MCQs
  - [ ] 10 Fill in Blank
  - [ ] 10 True/False
  - [ ] 5 Assertion/Reasoning

## 🧪 Testing

After adding data:
1. Open `quizzes.html` in your browser
2. Select Class → Subject → Test Type (Mid Term 1 or Mid Term 2)
3. Select Sample Test (1, 2, or 3)
4. Click "Start Quiz"
5. Verify it shows 50 questions
6. Check console for any errors

## 💡 Tips

1. **Start small**: Add data for one class/subject first, test it, then continue
2. **Copy existing structure**: Look at Class 1 examples in the file
3. **Use consistent difficulty**: Mix easy, moderate, and difficult questions
4. **Save frequently**: Save your work often
5. **Check syntax**: Make sure all brackets and commas are correct
6. **Test after each addition**: Don't wait until everything is done

## 🐛 Common Errors

1. **"Class X not found in midterm data"**
   - Solution: Make sure class number is a string: `"1"` not `1`

2. **"Subject 'X' not found in class data"**
   - Solution: Check subject name spelling and capitalization

3. **"midterm1 not found in subject data"**
   - Solution: Make sure you have both `midterm1` and `midterm2` sections

4. **"Sample test X not found"**
   - Solution: Make sure you have `sample1`, `sample2`, and `sample3` for each midterm

5. **"No questions found"**
   - Solution: Check that questions array is not empty and has proper structure

6. **JavaScript syntax errors**
   - Solution: Check for missing commas, brackets, or quotes

## 📞 Need Help?

If you encounter issues:
1. Check browser console (F12) for error messages
2. Verify your JSON syntax is correct
3. Compare with existing working examples in the file
4. Make sure all required fields are present in each question

---

**Good luck adding your midterm data! 🎓**

