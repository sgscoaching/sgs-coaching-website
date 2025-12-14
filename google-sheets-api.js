/**
 * Google Sheets API Integration for SGS Coaching
 * 
 * IMPORTANT: Update GOOGLE_SCRIPT_URL with your Web App URL from Google Apps Script
 */

// ⚠️ UPDATE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL ⚠️
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRpRU9ImsWokMZsqiEqloYbA187mQb2Lyir1WFyh8WzScxqNkIEhaSuoM1wBMFMqgCEg/exec';

/**
 * Send quiz result to Google Sheets
 */
async function saveQuizResultToSheets(quizData) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
    console.warn('Google Sheets URL not configured. Data will only be saved locally.');
    return { success: false, error: 'Google Sheets URL not configured' };
  }

  try {
    const payload = {
      action: 'saveQuizResult',
      name: quizData.name,
      mobile: quizData.mobile,
      class: quizData.class,
      subject: quizData.subject,
      quizTitle: quizData.quizTitle,
      score: quizData.score,
      totalQuestions: quizData.totalQuestions,
      timeTaken: quizData.timeTaken
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script doesn't support CORS, so we use no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // With no-cors, we can't read the response, but the data should be saved
    console.log('Quiz result sent to Google Sheets');
    return { success: true };
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send mock test result to Google Sheets
 */
async function saveMockTestResultToSheets(testData) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
    console.warn('Google Sheets URL not configured. Data will only be saved locally.');
    return { success: false, error: 'Google Sheets URL not configured' };
  }

  try {
    const payload = {
      action: 'saveMockTestResult',
      name: testData.name,
      mobile: testData.mobile,
      testType: testData.testType,
      subject: testData.subject,
      topic: testData.topic,
      marks: testData.marks,
      totalQuestions: testData.totalQuestions,
      accuracy: testData.accuracy,
      duration: testData.duration
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('Mock test result sent to Google Sheets');
    return { success: true };
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}

// Cache for quiz rankings (per quiz title)
let quizRankingsCache = new Map();
const QUIZ_CACHE_DURATION = 2 * 60 * 1000; // 2 minutes (reduced for more real-time updates)

/**
 * Fetch quiz rankings from Google Sheets, with caching per quiz
 * @param {string} quizTitle - Optional quiz title to filter rankings
 */
async function fetchQuizRankingsFromSheets(quizTitle = null) {
  const now = Date.now();
  const cacheKey = quizTitle || 'all';

  // If we have a valid cache for this quiz, return it immediately
  const cached = quizRankingsCache.get(cacheKey);
  if (cached && (now - cached.timestamp < QUIZ_CACHE_DURATION)) {
    console.log(`Returning cached quiz rankings for: ${cacheKey}`);
    return cached.data;
  }

  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
    console.warn('Google Sheets URL not configured. Using local data only.');
    return null;
  }

  try {
    console.log(`Fetching fresh quiz rankings from Google Sheets${quizTitle ? ` for: ${quizTitle}` : ''}...`);
    let url = `${GOOGLE_SCRIPT_URL}?action=getQuizRankings`;
    if (quizTitle) {
      url += `&quizTitle=${encodeURIComponent(quizTitle)}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success) {
      // Update cache for this quiz
      quizRankingsCache.set(cacheKey, {
        data: data.rankings,
        timestamp: now
      });
      console.log(`Quiz rankings fetched and cached successfully for: ${cacheKey}`);
      return data.rankings;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching quiz rankings from Google Sheets:', error);
    return null;
  }
}

/**
 * Fetch mock test rankings from Google Sheets
 */
async function fetchMockTestRankingsFromSheets() {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
    console.warn('Google Sheets URL not configured. Using local data only.');
    return null;
  }

  try {
    const url = `${GOOGLE_SCRIPT_URL}?action=getMockTestRankings`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.success ? data.rankings : null;
  } catch (error) {
    console.error('Error fetching mock test rankings from Google Sheets:', error);
    return null;
  }
}

/**
 * Fetch all results from Google Sheets
 */
async function fetchAllResultsFromSheets() {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
    console.warn('Google Sheets URL not configured. Using local data only.');
    return null;
  }

  try {
    const url = `${GOOGLE_SCRIPT_URL}?action=getAllResults`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.success ? data : null;
  } catch (error) {
    console.error('Error fetching all results from Google Sheets:', error);
    return null;
  }
}

/**
 * Send review to Google Sheets
 */
async function saveReviewToSheets(reviewData) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
    console.warn('Google Sheets URL not configured. Data will only be saved locally.');
    return { success: false, error: 'Google Sheets URL not configured' };
  }

  try {
    const payload = {
      action: 'saveReview',
      name: reviewData.name,
      class: reviewData.class,
      rating: reviewData.rating,
      text: reviewData.text
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('Review sent to Google Sheets');
    return { success: true };
  } catch (error) {
    console.error('Error saving review to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch reviews from Google Sheets
 */
async function fetchReviewsFromSheets() {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_WEB_APP_URL_HERE') {
    console.warn('Google Sheets URL not configured. Using local data only.');
    return null;
  }

  try {
    const url = `${GOOGLE_SCRIPT_URL}?action=getReviews`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.success ? data.reviews : null;
  } catch (error) {
    console.error('Error fetching reviews from Google Sheets:', error);
    return null;
  }
}

/**
 * Merge local and Google Sheets data (fallback strategy)
 */
function mergeRankings(localRankings, sheetsRankings) {
  if (!sheetsRankings || sheetsRankings.length === 0) {
    return localRankings;
  }

  if (!localRankings || localRankings.length === 0) {
    return sheetsRankings;
  }

  // Combine both sources
  const combined = [...localRankings, ...sheetsRankings];
  
  // Remove duplicates based on name + mobile + score
  const seen = new Set();
  const unique = [];
  
  for (const item of combined) {
    const key = `${item.name}_${item.mobile}_${item.score || item.marks}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  }
  
  // Sort and return top results
  unique.sort((a, b) => {
    const scoreA = a.score || a.marks || 0;
    const scoreB = b.score || b.marks || 0;
    const totalA = a.totalQuestions || a.total || 0;
    const totalB = b.totalQuestions || b.total || 0;
    const percentA = totalA > 0 ? (scoreA / totalA) * 100 : 0;
    const percentB = totalB > 0 ? (scoreB / totalB) * 100 : 0;
    
    if (percentB !== percentA) {
      return percentB - percentA;
    }
    return (a.timeTaken || a.duration || 0) - (b.timeTaken || b.duration || 0);
  });
  
  return unique.slice(0, 10);
}

