# Google Sheets Integration Guide

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "SGS Quiz Results"
4. Create two sheets:
   - **Sheet 1**: Name it "QuizResults" (for regular quizzes)
   - **Sheet 2**: Name it "MockTestResults" (for mock tests)

### QuizResults Sheet Headers (Row 1):
```
Timestamp | Name | Mobile | Class | Subject | Quiz Title | Score | Total Questions | Percentage | Time Taken (seconds) | Date
```

### MockTestResults Sheet Headers (Row 1):
```
Timestamp | Name | Mobile | Test Type | Subject | Topic | Marks | Total Questions | Accuracy | Duration (seconds) | Date
```

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete the default code
3. Copy and paste the code from `google-apps-script.js` file
4. Save the script (Ctrl+S or Cmd+S)
5. Click **Deploy** → **New deployment**
6. Select type: **Web app**
7. Set:
   - Description: "SGS Quiz Data API"
   - Execute as: **Me**
   - Who has access: **Anyone** (or "Anyone with Google account" for more security)
8. Click **Deploy**
9. **IMPORTANT**: Copy the Web App URL - you'll need this for your website

## Step 3: Update Your Website

1. Open `google-sheets-api.js` and update the `GOOGLE_SCRIPT_URL` with your Web App URL
2. Include `google-sheets-api.js` in your HTML files
3. The integration will automatically sync data

## Step 4: Test

1. Take a quiz on your website
2. Check your Google Sheet - data should appear automatically
3. Refresh the main page - leaderboards should update

## Security Notes

- The Web App URL is public - anyone can send data if they know the URL
- Consider adding a simple password check in the Apps Script for production
- For better security, use Google Sheets API with OAuth (more complex setup)

