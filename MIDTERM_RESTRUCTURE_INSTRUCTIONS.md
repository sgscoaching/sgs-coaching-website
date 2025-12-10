# Instructions for Restructuring Midterm Questions

## Goal
Restructure `midterm-questions.js` so that:
1. **ALL classes** (1, 6, 7, 8, 9, 10) have chapter-based structure
2. **ALL subjects** for each class use chapters instead of "sample1", "sample2", "sample3"
3. **No duplicate chapters** - each chapter appears only once
4. **First half of chapters** → Midterm 1
5. **Second half of chapters** → Midterm 2

## Process

### Step 1: Extract Chapters from script.js
For each class and subject in `script.js`:
- Get all chapter titles
- Remove suffixes like " - Quiz 1", " - Quiz 2"
- Get unique chapter names

### Step 2: Split Chapters
- First half → `midterm1`
- Second half → `midterm2`

### Step 3: Create Structure
For each chapter, create:
- 25 MCQs
- 10 Fill-in-Blank
- 10 True/False
- 5 Assertion/Reasoning
- Total: 50 questions per chapter

## Example Structure

```javascript
window.midtermQuizData = {
  "1": {
    "English": {  // Note: Subject names in midterm-questions.js use Title Case
      "midterm1": {
        "Unit 1: My Family and Me": [
          // 25 MCQs + 10 Fill-in-Blank + 10 True/False + 5 Assertion/Reasoning
        ],
        "Unit 2: Life Around Us": [
          // Same structure
        ]
      },
      "midterm2": {
        "Unit 3: Food": [
          // Same structure
        ],
        "Unit 4: Seasons": [
          // Same structure
        ]
      }
    },
    "Mathematics": {
      "midterm1": {
        // First half of math chapters
      },
      "midterm2": {
        // Second half of math chapters
      }
    }
  }
}
```

## Subject Name Mapping

**script.js uses lowercase with underscores:**
- `english` → `"English"` in midterm-questions.js
- `mathematics` → `"Mathematics"` in midterm-questions.js
- `science` → `"Science"` in midterm-questions.js
- `hindi` → `"Hindi"` in midterm-questions.js
- `english_grammar` → `"English Grammar"` in midterm-questions.js
- `social_science` → `"Social Science"` in midterm-questions.js

## Chapter Name Matching

The chapter names in `midterm-questions.js` must match the cleaned chapter names from `script.js`:
- Remove " - Quiz 1", " - Quiz 2" suffixes
- Keep the main chapter/unit name
- Example: "Unit 1: My Family and Me - Quiz 1" → "Unit 1: My Family and Me"

