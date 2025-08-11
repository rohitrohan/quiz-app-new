// Result Page JavaScript
let resultData = null;
let quizData = null;
let userData = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = 'auth.html';
            return;
        }
        
        userData = user;
        
        // Get result ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const resultId = urlParams.get('id');
        
        if (!resultId) {
            showError('No result specified');
            return;
        }
        
        // Load result data
        await loadResultData(resultId);
        
        // Setup event listeners
        setupEventListeners();
    });
});

// Load result data from Firebase
async function loadResultData(resultId) {
    try {
        showLoading(true);
        
        // Load result document
        const resultDoc = await db.collection('results').doc(resultId).get();
        
        if (!resultDoc.exists) {
            throw new Error('Result not found');
        }
        
        resultData = { id: resultDoc.id, ...resultDoc.data() };
        
        // Verify result belongs to current user (unless admin)
        if (resultData.userId !== auth.currentUser.uid) {
            const isAdmin = await checkAdminRole();
            if (!isAdmin) {
                throw new Error('Unauthorized access');
            }
        }
        
        // Load quiz data
        const quizDoc = await db.collection('quizzes').doc(resultData.quizId).get();
        
        if (!quizDoc.exists) {
            throw new Error('Quiz not found');
        }
        
        quizData = { id: quizDoc.id, ...quizDoc.data() };
        
        // Display results
        displayResults();
        
        // Display answer review if allowed
        if (quizData.allowReview !== false) {
            displayAnswerReview();
        }
        
        showLoading(false);
    } catch (error) {
        console.error('Error loading result:', error);
        showError('Failed to load result: ' + error.message);
        showLoading(false);
    }
}

// Check if user is admin
async function checkAdminRole() {
    try {
        const userDoc = await db.collection('users').doc(auth.currentUser.uid).get();
        if (userDoc.exists) {
            const role = userDoc.data().role;
            return role === 'admin' || role === 'teacher';
        }
    } catch (error) {
        console.error('Error checking admin role:', error);
    }
    return false;
}

// Display results
function displayResults() {
    // Calculate percentage and determine performance level
    const percentage = resultData.percentage || 0;
    const passingScore = quizData.passingScore || 60;
    const passed = percentage >= passingScore;
    
    // Update score circle
    updateScoreCircle(percentage);
    
    // Update status
    const statusElement = document.querySelector('.result-status');
    statusElement.textContent = passed ? 'Congratulations! You Passed' : 'Keep Trying!';
    statusElement.className = `result-status ${passed ? 'passed' : 'failed'}`;
    
    // Update message
    const messageElement = document.querySelector('.result-message');
    messageElement.textContent = getResultMessage(percentage, passed);
    
    // Update stats
    document.getElementById('correct-answers').textContent = 
        resultData.correctAnswers || 0;
    document.getElementById('incorrect-answers').textContent = 
        (resultData.totalQuestions || 0) - (resultData.correctAnswers || 0);
    document.getElementById('time-taken').textContent = 
        formatTime(resultData.timeSpent || 0);
    document.getElementById('points-earned').textContent = 
        `${resultData.score || 0}/${quizData.totalPoints || resultData.totalQuestions}`;
    
    // Show certificate section if passed
    if (passed) {
        document.getElementById('certificate-section').style.display = 'block';
        document.getElementById('download-btn').style.display = 'inline-block';
    } else {
        document.getElementById('download-btn').style.display = 'none';
    }
}

// Update score circle animation
function updateScoreCircle(percentage) {
    const circle = document.querySelector('.score-circle-progress');
    const scoreText = document.querySelector('.score-percentage');
    
    // Determine color based on score
    let colorClass = 'poor';
    if (percentage >= 80) colorClass = 'excellent';
    else if (percentage >= 60) colorClass = 'good';
    else if (percentage >= 40) colorClass = 'average';
    
    circle.classList.add(colorClass);
    
    // Calculate stroke offset
    const circumference = 2 * Math.PI * 90; // 565.48
    const offset = circumference - (circumference * percentage / 100);
    
    // Animate the circle
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);
    
    // Animate the percentage text
    animateValue(scoreText, 0, Math.round(percentage), 1500);
}

// Animate numeric value
function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const value = Math.round(start + range * easeOutQuad(progress));
        element.textContent = value + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Easing function for smooth animation
function easeOutQuad(t) {
    return t * (2 - t);
}

// Get result message based on performance
function getResultMessage(percentage, passed) {
    if (percentage >= 90) {
        return "Outstanding performance! You've mastered this topic!";
    } else if (percentage >= 80) {
        return "Excellent work! You have a strong understanding of the material.";
    } else if (percentage >= 70) {
        return "Good job! You're doing well, keep it up!";
    } else if (percentage >= 60) {
        return passed ? "You passed! With more practice, you can do even better." : 
               "You're getting there! A little more practice will help.";
    } else if (percentage >= 40) {
        return "Keep practicing! Review the material and try again.";
    } else {
        return "Don't give up! Review the content and take your time.";
    }
}

// Format time in seconds to MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Display answer review
function displayAnswerReview() {
    if (!quizData.showAnswers && quizData.showAnswers !== undefined) {
        return; // Don't show answers if disabled
    }
    
    const reviewSection = document.getElementById('answers-review');
    const container = document.getElementById('questions-review-container');
    
    container.innerHTML = '';
    
    quizData.questions.forEach((question, index) => {
        const userAnswer = resultData.answers[index];
        const isCorrect = checkAnswerCorrectness(question, userAnswer);
        
        const questionDiv = document.createElement('div');
        questionDiv.className = `question-review ${isCorrect ? 'correct' : 'incorrect'}`;
        
        let answerHTML = '';
        
        if (question.type === 'mcq') {
            const userOption = userAnswer !== undefined ? question.options[userAnswer] : 'Not answered';
            const correctOption = question.options[question.correctAnswer];
            
            answerHTML = `
                <div class="answer-row">
                    <span class="answer-label">Your Answer:</span>
                    <span class="${isCorrect ? 'correct-answer' : 'incorrect-answer'}">${userOption}</span>
                </div>
                ${!isCorrect ? `
                <div class="answer-row">
                    <span class="answer-label">Correct Answer:</span>
                    <span class="correct-answer">${correctOption}</span>
                </div>` : ''}
            `;
        } else if (question.type === 'short') {
            answerHTML = `
                <div class="answer-row">
                    <span class="answer-label">Your Answer:</span>
                    <span class="${userAnswer ? '' : 'incorrect-answer'}">${userAnswer || 'Not answered'}</span>
                </div>
                <div class="answer-row">
                    <span class="answer-label">Correct Answer:</span>
                    <span class="correct-answer">${question.correctAnswer}</span>
                </div>
            `;
        } else if (question.type === 'essay') {
            answerHTML = `
                <div class="answer-row">
                    <span class="answer-label">Your Answer:</span>
                    <div style="margin-top: 10px; padding: 10px; background: white; border-radius: 5px;">
                        ${userAnswer || 'Not answered'}
                    </div>
                </div>
                ${question.correctAnswer ? `
                <div class="answer-row">
                    <span class="answer-label">Sample Answer:</span>
                    <div style="margin-top: 10px; padding: 10px; background: #e8f5e9; border-radius: 5px;">
                        ${question.correctAnswer}
                    </div>
                </div>` : ''}
            `;
        }
        
        questionDiv.innerHTML = `
            <div class="question-number">Question ${index + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="answer-section">
                ${answerHTML}
            </div>
            ${question.explanation ? `
            <div class="explanation-box">
                <div class="explanation-label">Explanation:</div>
                <div>${question.explanation}</div>
            </div>` : ''}
        `;
        
        container.appendChild(questionDiv);
    });
    
    reviewSection.style.display = 'block';
}

// Check if answer is correct
function checkAnswerCorrectness(question, userAnswer) {
    if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
        return false;
    }
    
    if (question.type === 'mcq') {
        return userAnswer === question.correctAnswer;
    } else if (question.type === 'short') {
        // Check if answer matches any of the acceptable answers
        const acceptableAnswers = question.correctAnswer.split(';').map(a => a.trim().toLowerCase());
        return acceptableAnswers.includes(userAnswer.toLowerCase().trim());
    }
    
    // For essay questions, we'd need AI evaluation
    return null;
}

// Setup event listeners
function setupEventListeners() {
    // Retake quiz button
    document.getElementById('retake-btn').addEventListener('click', () => {
        if (confirm('Are you sure you want to retake this quiz?')) {
            window.location.href = `quiz.html?id=${resultData.quizId}`;
        }
    });
    
    // Download certificate button
    document.getElementById('download-btn').addEventListener('click', generateCertificate);
}

// Generate certificate PDF
function generateCertificate() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });
    
    // Set font styles
    doc.setFontSize(30);
    doc.setTextColor(102, 126, 234);
    doc.text('Certificate of Completion', 148, 40, { align: 'center' });
    
    // Add decorative border
    doc.setDrawColor(102, 126, 234);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);
    
    // Certificate content
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('This is to certify that', 148, 70, { align: 'center' });
    
    doc.setFontSize(28);
    doc.setTextColor(51, 51, 51);
    doc.text(userData.displayName || userData.email, 148, 90, { align: 'center' });
    
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text('has successfully completed the quiz', 148, 110, { align: 'center' });
    
    doc.setFontSize(24);
    doc.setTextColor(102, 126, 234);
    doc.text(quizData.title, 148, 130, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`with a score of ${Math.round(resultData.percentage)}%`, 148, 150, { align: 'center' });
    
    // Add date
    const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    doc.setFontSize(14);
    doc.text(`Date: ${date}`, 148, 170, { align: 'center' });
    
    // Add QuizMaster branding
    doc.setFontSize(12);
    doc.setTextColor(102, 102, 102);
    doc.text('QuizMaster - Excellence in Learning', 148, 185, { align: 'center' });
    
    // Save the PDF
    doc.save(`QuizMaster_Certificate_${quizData.title.replace(/\s+/g, '_')}.pdf`);
    
    showMessage('Certificate downloaded successfully!', 'success');
}

// Show loading
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'flex' : 'none';
}

// Show error message
function showError(message) {
    const statusElement = document.querySelector('.result-status');
    statusElement.textContent = 'Error';
    statusElement.className = 'result-status failed';
    
    const messageElement = document.querySelector('.result-message');
    messageElement.textContent = message;
    
    // Hide other elements
    document.querySelector('.score-circle').style.display = 'none';
    document.querySelector('.stats-grid').style.display = 'none';
    document.getElementById('retake-btn').style.display = 'none';
    document.getElementById('download-btn').style.display = 'none';
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}