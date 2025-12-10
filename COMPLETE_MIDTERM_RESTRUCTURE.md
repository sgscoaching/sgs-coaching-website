# Complete Midterm Restructure Guide

## Overview
This document explains how to restructure `midterm-questions.js` for ALL classes and subjects to use chapters instead of "sample1", "sample2", "sample3".

## Pattern to Follow

### For Each Class and Subject:

1. **Extract chapters from `script.js`**
   - Get all chapter/unit titles
   - Remove " - Quiz 1", " - Quiz 2" suffixes
   - Get unique chapter names

2. **Split chapters:**
   - First half → `midterm1`
   - Second half → `midterm2`

3. **Create structure:**
   ```javascript
   "CLASS_NUMBER": {
     "Subject Name": {  // Use Title Case
       "midterm1": {
         "Chapter Name 1": [
           // 25 MCQs + 10 Fill-in-Blank + 10 True/False + 5 Assertion/Reasoning
           ...Array(25).fill().map((_, i) => ({
             type: "mcq",
             q: `MCQ Question ${i + 1} about Chapter Name 1`,
             options: ["Option A", "Option B", "Option C", "Option D"],
             answer: "Option A",
             difficulty: "moderate"
           })),
           ...Array(10).fill().map((_, i) => ({
             type: "fill_in_blank",
             q: `Fill in the blank question ${i + 1} about Chapter Name 1`,
             answer: "answer",
             difficulty: "moderate"
           })),
           ...Array(10).fill().map((_, i) => ({
             type: "true_false",
             q: `True/False question ${i + 1} about Chapter Name 1`,
             answer: i % 2 === 0 ? "True" : "False",
             difficulty: "moderate"
           })),
           ...Array(5).fill().map((_, i) => ({
             type: "assertion_reasoning",
             q: `Assertion/Reasoning question ${i + 1} about Chapter Name 1`,
             options: [
               "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
               "Both Assertion and Reason are true but Reason is not the correct explanation of Assertion",
               "Assertion is true but Reason is false",
               "Both Assertion and Reason are false"
             ],
             answer: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
             difficulty: "hard"
           }))
         ],
         "Chapter Name 2": [
           // Same structure
         ]
         // ... more chapters (first half)
       },
       "midterm2": {
         "Chapter Name (second half)": [
           // Same structure
         ]
         // ... more chapters (second half)
       }
     }
   }
   ```

## Class 1 Example

### From script.js:
- **English**: 4 units (Unit 1-4)
- **Mathematics**: 13 chapters (Chapter 1-13)
- **Hindi**: Multiple chapters

### Structure:
```javascript
"1": {
  "English": {
    "midterm1": {
      "Unit 1: My Family and Me": [...],
      "Unit 2: Life Around Us": [...]
    },
    "midterm2": {
      "Unit 3: Food": [...],
      "Unit 4: Seasons": [...]
    }
  },
  "Mathematics": {
    "midterm1": {
      "Chapter 1: Finding the Furry Cat! (Pre-number Concepts)": [...],
      "Chapter 2: What is Long? What is Round? (Shapes)": [...],
      // ... Chapters 1-6 or 1-7 (first half)
    },
    "midterm2": {
      // ... Chapters 7-13 or 8-13 (second half)
    }
  },
  "Hindi": {
    "midterm1": {
      // First half of Hindi chapters
    },
    "midterm2": {
      // Second half of Hindi chapters
    }
  }
}
```

## Subject Name Mapping

| script.js (lowercase) | midterm-questions.js (Title Case) |
|----------------------|-----------------------------------|
| `english` | `"English"` |
| `mathematics` | `"Mathematics"` |
| `science` | `"Science"` |
| `hindi` | `"Hindi"` |
| `english_grammar` | `"English Grammar"` |
| `social_science` | `"Social Science"` |
| `environmental_studies` or `evs` | `"Environmental Studies"` |

## Important Notes

1. **Chapter names must match exactly** (after removing " - Quiz 1", " - Quiz 2")
2. **No duplicates** - each chapter appears only once
3. **Split evenly** - first half in midterm1, second half in midterm2
4. **Each chapter needs 50 questions**: 25 MCQs + 10 Fill-in-Blank + 10 True/False + 5 Assertion/Reasoning

## Status

- ✅ Class 9 Science - Already restructured correctly
- ⏳ Class 1 - In progress
- ⏳ Class 6 - Needs restructuring
- ⏳ Class 7 - Needs restructuring
- ⏳ Class 8 - Needs restructuring
- ⏳ Class 10 - Needs restructuring

