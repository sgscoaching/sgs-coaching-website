# Google Sheets Integration - Setup Instructions

## Quick Start Guide

Follow these steps to integrate Google Sheets with your SGS Coaching website:

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "SGS Quiz Results" (or any name you prefer)
4. The script will automatically create the required sheets with headers

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code
3. Copy the entire contents of `google-apps-script.js` file
4. Paste it into the Apps Script editor
5. Click **Save** (Ctrl+S or Cmd+S)
6. Click **Deploy** → **New deployment**
7. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
8. Configure:
   - **Description**: "SGS Quiz Data API"
   - **Execute as**: **Me** (your account)
   - **Who has access**: **Anyone** (for public access)
9. Click **Deploy**
10. **IMPORTANT**: Copy the Web App URL that appears - you'll need this!

### Step 3: Update Your Website

1. Open `google-sheets-api.js` in your project
2. Find this line near the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
   ```
3. Replace `'YOUR_WEB_APP_URL_HERE'` with your Web App URL from Step 2
   Example:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```
4. Save the file

### Step 4: Test the Integration

1. Open your website
2. Take a quiz or mock test
3. Check your Google Sheet - you should see the data appear automatically
4. Refresh the main page - the leaderboards should show data from Google Sheets

## How It Works

### Data Flow

1. **Student takes quiz** → Data saved to localStorage (as backup)
2. **Data sent to Google Sheets** → Via Google Apps Script Web App
3. **Main page loads** → Fetches data from Google Sheets
4. **Leaderboards display** → Shows top performers from Google Sheets

### Sheets Created Automatically

The script creates two sheets:

1. **QuizResults** - Stores regular quiz results
   - Columns: Timestamp, Name, Mobile, Class, Subject, Quiz Title, Score, Total Questions, Percentage, Time Taken, Date

2. **MockTestResults** - Stores mock test results
   - Columns: Timestamp, Name, Mobile, Test Type, Subject, Topic, Marks, Total Questions, Accuracy, Duration, Date

## Troubleshooting

### Data not appearing in Google Sheets?

1. Check that the Web App URL is correct in `google-sheets-api.js`
2. Make sure the Web App is deployed and set to "Anyone" access
3. Check browser console for errors (F12 → Console tab)
4. Verify the Apps Script has permission to edit the sheet

### Leaderboards not updating?

1. Check browser console for errors
2. Verify the Web App URL is correct
3. Make sure the sheet names match: "QuizResults" and "MockTestResults"
4. Try refreshing the page (Ctrl+F5 or Cmd+Shift+R)

### "CORS error" in console?

- This is normal! The `no-cors` mode is used intentionally
- Data is still being saved, but you can't read the response
- Check your Google Sheet to verify data is being saved

## Security Notes

- The Web App URL is public - anyone who knows it can send data
- For production, consider adding a simple password check in the Apps Script
- For better security, use Google Sheets API with OAuth (more complex setup)

## Features

✅ Automatic data sync to Google Sheets  
✅ Leaderboards update from Google Sheets  
✅ Fallback to localStorage if Google Sheets unavailable  
✅ No duplicate entries  
✅ Real-time rankings  
✅ Supports both quiz and mock test results  

## Need Help?

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Verify all steps were completed correctly
3. Make sure the Google Apps Script is deployed correctly
4. Check that the sheet names match exactly

