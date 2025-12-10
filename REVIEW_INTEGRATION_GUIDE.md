# Review Integration with Google Sheets - Setup Guide

## ✅ What's Been Implemented

### 1. Review Form Integration
- ✅ Review form saves to Google Sheets
- ✅ Reviews are fetched from Google Sheets and displayed
- ✅ Reviews appear in the testimonials slider on main page
- ✅ Merges with local storage as backup

### 2. Contact Section Privacy
- ✅ Phone number is hidden (shows as ●●● ●●● ●●●●)
- ✅ Email is hidden (shows as ●●●●●●●●●●●●●●●●●●●●)
- ✅ Clicking phone icon reveals number and initiates call
- ✅ Clicking email icon reveals email and opens email client

---

## 📋 Setup Instructions

### Step 1: Update Google Apps Script

1. Open your Google Sheet
2. Go to **Extensions** → **Apps Script**
3. Open your existing `google-apps-script.js` file
4. **Add these two functions at the end of the file:**

```javascript
/**
 * Save review to Google Sheet
 */
function saveReview(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REVIEWS_SHEET);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(REVIEWS_SHEET);
      // Add headers
      newSheet.appendRow([
        'Timestamp', 'Name', 'Class/Exam', 'Rating', 'Review Text', 'Initials', 'Date'
      ]);
      return saveReview(data); // Retry after creating sheet
    }
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Name', 'Class/Exam', 'Rating', 'Review Text', 'Initials', 'Date'
      ]);
    }
    
    const timestamp = new Date();
    const dateStr = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    // Generate initials from name
    const nameParts = (data.name || '').trim().split(' ');
    const initials = nameParts.length > 1 ? 
      (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase() :
      nameParts[0].substring(0, 2).toUpperCase();
    
    sheet.appendRow([
      timestamp.getTime(), // Timestamp for sorting
      data.name || '',
      data.class || '',
      data.rating || 0,
      data.text || '',
      initials,
      dateStr
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Review saved' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get all reviews from Google Sheet
 */
function getReviews() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REVIEWS_SHEET);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, reviews: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7).getValues();
    const reviews = data.map(row => ({
      timestamp: row[0],
      name: row[1],
      class: row[2],
      rating: row[3],
      text: row[4],
      initials: row[5],
      date: row[6]
    }));
    
    // Sort by timestamp (newest first)
    reviews.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, reviews: reviews }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. **Make sure** the `doPost` function includes:
```javascript
} else if (action === 'saveReview') {
  return saveReview(data);
}
```

6. **Make sure** the `doGet` function includes:
```javascript
} else if (action === 'getReviews') {
  return getReviews();
}
```

7. **Make sure** at the top you have:
```javascript
const REVIEWS_SHEET = 'StudentReviews';
```

8. **Save** and **Deploy** → **Manage deployments** → **Edit** → **New version** → **Deploy**

---

## ✅ What's Already Done in Your Code

1. ✅ `google-sheets-api.js` - Added `saveReviewToSheets()` and `fetchReviewsFromSheets()` functions
2. ✅ `index.html` - Updated `saveReview()` to save to Google Sheets
3. ✅ `index.html` - Updated `loadReviews()` to fetch from Google Sheets
4. ✅ `index.html` - Contact section hides phone/email until clicked
5. ✅ `index.html` - Phone and email functions added

---

## 🎯 How It Works

### Review Submission Flow:
1. Student fills review form → Clicks "Submit Review"
2. Review saved to:
   - ✅ Google Sheets (via API)
   - ✅ localStorage (as backup)
3. Review appears in testimonials slider automatically
4. Reviews are sorted by newest first

### Contact Section Flow:
1. Phone/Email are hidden by default (showing dots)
2. User clicks phone icon → Number revealed + Call initiated
3. User clicks email icon → Email revealed + Email client opens

---

## 📊 Google Sheet Structure

The script will automatically create a sheet named **"StudentReviews"** with these columns:

| Column | Description |
|--------|-------------|
| Timestamp | For sorting (milliseconds) |
| Name | Student's name |
| Class/Exam | Their class or exam name |
| Rating | Star rating (1-5) |
| Review Text | The review content |
| Initials | Auto-generated from name |
| Date | Formatted date string |

---

## 🧪 Testing

1. **Test Review Submission:**
   - Go to main page
   - Scroll to "Share Your Experience" section
   - Fill the review form
   - Submit
   - Check Google Sheet - review should appear
   - Check testimonials slider - review should appear

2. **Test Contact Section:**
   - Scroll to contact section
   - Phone should show as dots
   - Click phone icon - should reveal number and call
   - Email should show as dots
   - Click email icon - should reveal email and open email client

---

## ⚠️ Important Notes

- The Google Apps Script needs to be updated with the review functions (see Step 1 above)
- The sheet "StudentReviews" will be created automatically
- Reviews from Google Sheets will merge with local reviews
- Contact info is hidden for privacy but accessible when needed

---

## 🐛 Troubleshooting

**Reviews not appearing?**
- Check Google Apps Script is deployed
- Check browser console for errors
- Verify Google Sheets URL is correct in `google-sheets-api.js`

**Contact not working?**
- Make sure phone/email functions are defined
- Check browser console for errors
- Test on actual device (phone links work better on mobile)

