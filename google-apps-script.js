/**
 * Google Apps Script for SGS Coaching Quiz Data Storage
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions → Apps Script
 * 3. Paste this code
 * 4. Save and Deploy as Web App
 * 5. Copy the Web App URL
 */

// Configuration - Update these with your sheet names
const QUIZ_RESULTS_SHEET = 'QuizResults';
const MOCK_TEST_SHEET = 'MockTestResults';
const REVIEWS_SHEET = 'StudentReviews';

/**
 * Handle POST requests to save quiz results
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'saveQuizResult') {
      return saveQuizResult(data);
    } else if (action === 'saveMockTestResult') {
      return saveMockTestResult(data);
    } else if (action === 'saveReview') {
      return saveReview(data);
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Invalid action' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests to retrieve quiz results
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'getAllResults';
    
    if (action === 'getAllResults') {
      return getAllResults();
    } else if (action === 'getQuizRankings') {
      return getQuizRankings(e);
    } else if (action === 'getMockTestRankings') {
      return getMockTestRankings();
    } else if (action === 'getReviews') {
      return getReviews();
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Invalid action' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save quiz result to Google Sheet
 */
function saveQuizResult(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(QUIZ_RESULTS_SHEET);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(QUIZ_RESULTS_SHEET);
      // Add headers
      newSheet.appendRow([
        'Timestamp', 'Name', 'Mobile', 'Class', 'Subject', 'Quiz Title', 
        'Score', 'Total Questions', 'Percentage', 'Time Taken (seconds)', 'Date'
      ]);
      return saveQuizResult(data); // Retry after creating sheet
    }
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Name', 'Mobile', 'Class', 'Subject', 'Quiz Title', 
        'Score', 'Total Questions', 'Percentage', 'Time Taken (seconds)', 'Date'
      ]);
    }
    
    const timestamp = new Date();
    const dateStr = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    const percentage = ((data.score / data.totalQuestions) * 100).toFixed(2);
    
    sheet.appendRow([
      timestamp.getTime(), // Timestamp for sorting
      data.name || '',
      data.mobile || '',
      data.class || '',
      data.subject || '',
      data.quizTitle || '',
      data.score || 0,
      data.totalQuestions || 0,
      percentage,
      data.timeTaken || 0,
      dateStr
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Quiz result saved' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Save mock test result to Google Sheet
 */
function saveMockTestResult(data) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MOCK_TEST_SHEET);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(MOCK_TEST_SHEET);
      // Add headers
      newSheet.appendRow([
        'Timestamp', 'Name', 'Mobile', 'Test Type', 'Subject', 'Topic', 
        'Marks', 'Total Questions', 'Accuracy', 'Duration (seconds)', 'Date'
      ]);
      return saveMockTestResult(data); // Retry after creating sheet
    }
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Name', 'Mobile', 'Test Type', 'Subject', 'Topic', 
        'Marks', 'Total Questions', 'Accuracy', 'Duration (seconds)', 'Date'
      ]);
    }
    
    const timestamp = new Date();
    const dateStr = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    
    sheet.appendRow([
      timestamp.getTime(), // Timestamp for sorting
      data.name || '',
      data.mobile || '',
      data.testType || '',
      data.subject || '',
      data.topic || '',
      data.marks || 0,
      data.totalQuestions || 0,
      data.accuracy || 0,
      data.duration || 0,
      dateStr
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Mock test result saved' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get all quiz results
 */
function getAllResults() {
  try {
    const quizSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(QUIZ_RESULTS_SHEET);
    const mockSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MOCK_TEST_SHEET);
    
    const quizResults = [];
    const mockResults = [];
    
    // Get quiz results
    if (quizSheet && quizSheet.getLastRow() > 1) {
      const quizData = quizSheet.getRange(2, 1, quizSheet.getLastRow() - 1, 11).getValues();
      quizData.forEach(row => {
        quizResults.push({
          timestamp: row[0],
          name: row[1],
          mobile: row[2],
          class: row[3],
          subject: row[4],
          quizTitle: row[5],
          score: row[6],
          totalQuestions: row[7],
          percentage: row[8],
          timeTaken: row[9],
          date: row[10]
        });
      });
    }
    
    // Get mock test results
    if (mockSheet && mockSheet.getLastRow() > 1) {
      const mockData = mockSheet.getRange(2, 1, mockSheet.getLastRow() - 1, 11).getValues();
      mockData.forEach(row => {
        mockResults.push({
          timestamp: row[0],
          name: row[1],
          mobile: row[2],
          testType: row[3],
          subject: row[4],
          topic: row[5],
          marks: row[6],
          totalQuestions: row[7],
          accuracy: row[8],
          duration: row[9],
          date: row[10]
        });
      });
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        quizResults: quizResults,
        mockResults: mockResults
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get quiz rankings (top performers)
 * Optionally filter by quizTitle parameter
 */
function getQuizRankings(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(QUIZ_RESULTS_SHEET);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, rankings: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get quizTitle from query parameter if provided
    const quizTitle = e && e.parameter && e.parameter.quizTitle ? e.parameter.quizTitle : null;
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();
    let results = data.map(row => ({
      timestamp: row[0],
      name: row[1],
      mobile: row[2],
      class: row[3],
      subject: row[4],
      quizTitle: row[5],
      score: row[6],
      totalQuestions: row[7],
      percentage: parseFloat(row[8]) || 0,
      timeTaken: row[9],
      date: row[10]
    }));
    
    // Filter by quiz title if provided (case-insensitive, partial match)
    if (quizTitle) {
      const searchTitle = quizTitle.trim().toLowerCase();
      results = results.filter(r => 
        r.quizTitle && r.quizTitle.trim().toLowerCase().includes(searchTitle)
      );
    }
    
    // Sort by percentage (desc), then by time (asc)
    results.sort((a, b) => {
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage;
      }
      return a.timeTaken - b.timeTaken;
    });
    
    // De-duplicate results, keeping the best score for each student
    const bestScores = new Map();
    for (const result of results) {
      const key = `${(result.name || '').trim().toLowerCase()}-${result.mobile || ''}`;
      const existing = bestScores.get(key);
      
      if (!existing || result.score > existing.score || 
          (result.score === existing.score && result.timeTaken < existing.timeTaken)) {
        bestScores.set(key, result);
      }
    }
    
    // Convert map to array and sort again after de-duplication
    const uniqueResults = Array.from(bestScores.values());
    uniqueResults.sort((a, b) => {
      if (b.percentage !== a.percentage) {
        return b.percentage - a.percentage;
      }
      return a.timeTaken - b.timeTaken;
    });
    
    // Return all results (not just top 10) so client can filter/display as needed
    const rankings = uniqueResults.map((result, index) => ({
      ...result,
      rank: index + 1
    }));
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, rankings: rankings }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Get mock test rankings
 */
function getMockTestRankings() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MOCK_TEST_SHEET);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, rankings: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 11).getValues();
    const results = data.map(row => ({
      timestamp: row[0],
      name: row[1],
      mobile: row[2],
      testType: row[3],
      subject: row[4],
      topic: row[5],
      marks: row[6],
      totalQuestions: row[7],
      accuracy: parseFloat(row[8]) || 0,
      duration: row[9],
      date: row[10]
    }));
    
    // Sort by marks (desc), then by timestamp (asc)
    results.sort((a, b) => {
      if (b.marks !== a.marks) {
        return b.marks - a.marks;
      }
      return a.timestamp - b.timestamp;
    });
    
    // Get top 10
    const topRankings = results.slice(0, 10).map((result, index) => ({
      ...result,
      rank: index + 1
    }));
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, rankings: topRankings }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

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


