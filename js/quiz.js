// Quiz Session Management
let currentQuiz = null;
let currentSession = null;
let currentQuestionIndex = 0;
let answers = {};
let timer = null;
let timeRemaining = 0;
let isPaused = false;

// Initialize quiz page
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = 'auth.html';
            return;
        }
        
        // Get quiz ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const quizId = urlParams.get('id');
        const sessionId = urlParams.get('session');
        
        if (!quizId) {
            showMessage('No quiz specified', 'error');
            setTimeout(() => window.location.href = 'user-dashboard.html', 2000);
            return;
        }
        
        // Load or create session
        if (sessionId) {
            await resumeSession(sessionId);
        } else {
            await startNewSession(quizId);
        }
        
        // Setup event listeners
        setupEventListeners();
    });
});

// Start new quiz session
async function startNewSession(quizId) {
    try {
        showLoading(true);
        
        // Load quiz data
        const quizDoc = await db.collection('quizzes').doc(quizId).get();
        if (!quizDoc.exists) {
            throw new Error('Quiz not found');
        }
        
        currentQuiz = { id: quizDoc.id, ...quizDoc.data() };
        
        // Check if user already has an active session for this quiz
        const existingSession = await db.collection('sessions')
            .where('userId', '==', auth.currentUser.uid)
            .where('quizId', '==', quizId)
            .where('status', '==', 'active')
            .limit(1)
            .get();
        
        if (!existingSession.empty) {
            // Resume existing session
            const sessionDoc = existingSession.docs[0];
            await resumeSession(sessionDoc.id);
            return;
        }
        
        // Create new session
        const sessionData = {
            userId: auth.currentUser.uid,
            quizId: quizId,
            quizTitle: currentQuiz.title,
            status: 'active',
            startedAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastActivity: firebase.firestore.FieldValue.serverTimestamp(),
            currentQuestion: 0,
            answers: {},
            timeSpent: 0,
            score: 0,
            totalQuestions: currentQuiz.questions ? currentQuiz.questions.length : 0
        };
        
        const sessionRef = await db.collection('sessions').add(sessionData);
        currentSession = { id: sessionRef.id, ...sessionData };
        
        // Initialize quiz UI
        initializeQuizUI();
        
        showLoading(false);
    } catch (error) {
        console.error('Error starting session:', error);
        showMessage('Failed to start quiz: ' + error.message, 'error');
        showLoading(false);
    }
}

// Resume existing session
async function resumeSession(sessionId) {
    try {
        showLoading(true);
        
        // Load session data
        const sessionDoc = await db.collection('sessions').doc(sessionId).get();
        if (!sessionDoc.exists) {
            throw new Error('Session not found');
        }
        
        currentSession = { id: sessionDoc.id, ...sessionDoc.data() };
        
        // Check if session belongs to current user
        if (currentSession.userId !== auth.currentUser.uid) {
            throw new Error('Unauthorized session access');
        }
        
        // Load quiz data
        const quizDoc = await db.collection('quizzes').doc(currentSession.quizId).get();
        if (!quizDoc.exists) {
            throw new Error('Quiz not found');
        }
        
        currentQuiz = { id: quizDoc.id, ...quizDoc.data() };
        
        // Restore session state
        currentQuestionIndex = currentSession.currentQuestion || 0;
        answers = currentSession.answers || {};
        
        // Initialize quiz UI
        initializeQuizUI();
        
        showLoading(false);
        showMessage('Session resumed', 'success');
    } catch (error) {
        console.error('Error resuming session:', error);
        showMessage('Failed to resume session: ' + error.message, 'error');
        showLoading(false);
    }
}

// Initialize quiz UI
function initializeQuizUI() {
    // Set quiz title and info
    document.querySelector('.quiz-title').textContent = currentQuiz.title || 'Quiz';
    document.querySelector('.quiz-category').textContent = currentQuiz.category || 'General';
    document.querySelector('.quiz-difficulty').textContent = currentQuiz.difficulty || 'Medium';
    
    // Set up timer if time limit exists
    if (currentQuiz.timeLimit) {
        timeRemaining = currentQuiz.timeLimit - (currentSession.timeSpent || 0);
        startTimer();
    }
    
    // Display current question
    displayQuestion();
    
    // Update progress
    updateProgress();
}

// Display current question
function displayQuestion() {
    if (!currentQuiz.questions || currentQuiz.questions.length === 0) {
        showMessage('No questions found in this quiz', 'error');
        return;
    }
    
    const question = currentQuiz.questions[currentQuestionIndex];
    const questionContainer = document.querySelector('.question-container');
    
    // Update question counter
    document.querySelector('.question-counter').textContent = 
        `Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}`;
    
    // Display question text
    document.querySelector('.question-text').textContent = question.question;
    
    // Display question image if exists
    const visualContent = document.querySelector('.visual-content');
    if (question.image) {
        visualContent.innerHTML = `<img src="${question.image}" alt="Question image">`;
        visualContent.style.display = 'block';
    } else {
        visualContent.style.display = 'none';
    }
    
    // Display hint if exists
    const hintSection = document.querySelector('.hint-section');
    if (question.hint) {
        document.querySelector('.hint-content').textContent = question.hint;
        hintSection.style.display = 'block';
    } else {
        hintSection.style.display = 'none';
    }
    
    // Display answer options based on question type
    displayAnswerOptions(question);
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Clear explanation
    document.querySelector('.explanation-section').style.display = 'none';
}

// Display answer options based on question type
function displayAnswerOptions(question) {
    const answerSection = document.querySelector('.answer-section');
    answerSection.innerHTML = '';
    
    const savedAnswer = answers[currentQuestionIndex];
    
    switch (question.type) {
        case 'mcq':
            const mcqOptions = document.createElement('div');
            mcqOptions.className = 'mcq-options';
            
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'mcq-option';
                if (savedAnswer === index) {
                    optionDiv.classList.add('selected');
                }
                
                optionDiv.innerHTML = `
                    <input type="radio" 
                           name="mcq-option" 
                           id="option-${index}" 
                           value="${index}"
                           ${savedAnswer === index ? 'checked' : ''}>
                    <label for="option-${index}">${option}</label>
                `;
                
                optionDiv.addEventListener('click', () => selectMCQOption(index));
                mcqOptions.appendChild(optionDiv);
            });
            
            answerSection.appendChild(mcqOptions);
            break;
            
        case 'short':
            const shortAnswer = document.createElement('div');
            shortAnswer.className = 'short-answer';
            shortAnswer.innerHTML = `
                <input type="text" 
                       id="short-answer-input" 
                       placeholder="Type your answer here..."
                       value="${savedAnswer || ''}"
                       maxlength="200">
                <div class="character-count">
                    <span id="char-count">${savedAnswer ? savedAnswer.length : 0}</span>/200
                </div>
            `;
            
            const input = shortAnswer.querySelector('#short-answer-input');
            input.addEventListener('input', (e) => {
                answers[currentQuestionIndex] = e.target.value;
                document.getElementById('char-count').textContent = e.target.value.length;
                saveProgress();
            });
            
            answerSection.appendChild(shortAnswer);
            break;
            
        case 'essay':
            const essayAnswer = document.createElement('div');
            essayAnswer.className = 'essay-answer';
            essayAnswer.innerHTML = `
                <textarea id="essay-answer-input" 
                          placeholder="Write your answer here..."
                          rows="8">${savedAnswer || ''}</textarea>
                <div class="word-count">
                    Words: <span id="word-count">${savedAnswer ? savedAnswer.split(/\s+/).filter(w => w).length : 0}</span>
                </div>
            `;
            
            const textarea = essayAnswer.querySelector('#essay-answer-input');
            textarea.addEventListener('input', (e) => {
                answers[currentQuestionIndex] = e.target.value;
                const wordCount = e.target.value.split(/\s+/).filter(w => w).length;
                document.getElementById('word-count').textContent = wordCount;
                saveProgress();
            });
            
            answerSection.appendChild(essayAnswer);
            break;
            
        default:
            answerSection.innerHTML = '<p>Unknown question type</p>';
    }
}

// Select MCQ option
function selectMCQOption(index) {
    // Update visual selection
    document.querySelectorAll('.mcq-option').forEach((opt, i) => {
        if (i === index) {
            opt.classList.add('selected');
            opt.querySelector('input').checked = true;
        } else {
            opt.classList.remove('selected');
            opt.querySelector('input').checked = false;
        }
    });
    
    // Save answer
    answers[currentQuestionIndex] = index;
    saveProgress();
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Next/Submit buttons
    if (currentQuestionIndex === currentQuiz.questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
    }
}

// Navigate to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        updateProgress();
    }
}

// Navigate to next question
function nextQuestion() {
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        updateProgress();
    }
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    document.querySelector('.progress-fill').style.width = progress + '%';
    
    // Update question status dots
    const statusContainer = document.querySelector('.question-status');
    if (statusContainer) {
        statusContainer.innerHTML = '';
        for (let i = 0; i < currentQuiz.questions.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'status-dot';
            if (i === currentQuestionIndex) {
                dot.classList.add('current');
            } else if (answers[i] !== undefined) {
                dot.classList.add('answered');
            }
            dot.addEventListener('click', () => jumpToQuestion(i));
            statusContainer.appendChild(dot);
        }
    }
}

// Jump to specific question
function jumpToQuestion(index) {
    currentQuestionIndex = index;
    displayQuestion();
    updateProgress();
}

// Save progress to Firebase
async function saveProgress() {
    if (!currentSession) return;
    
    try {
        await db.collection('sessions').doc(currentSession.id).update({
            currentQuestion: currentQuestionIndex,
            answers: answers,
            lastActivity: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

// Start timer
function startTimer() {
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        if (!isPaused) {
            timeRemaining--;
            
            if (timeRemaining <= 0) {
                clearInterval(timer);
                submitQuiz(true); // Auto-submit when time runs out
            }
            
            updateTimerDisplay();
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timerDisplay = document.querySelector('.timer');
    
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Add warning class if less than 2 minutes
    if (timeRemaining < 120) {
        timerDisplay.classList.add('warning');
    }
}

// Pause quiz
function pauseQuiz() {
    isPaused = true;
    document.getElementById('pause-modal').style.display = 'flex';
    
    // Update session status
    db.collection('sessions').doc(currentSession.id).update({
        status: 'paused',
        pausedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// Resume quiz
function resumeQuiz() {
    isPaused = false;
    document.getElementById('pause-modal').style.display = 'none';
    
    // Update session status
    db.collection('sessions').doc(currentSession.id).update({
        status: 'active',
        resumedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// Exit quiz
function exitQuiz() {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
        window.location.href = 'user-dashboard.html';
    }
}

// Submit quiz
async function submitQuiz(autoSubmit = false) {
    if (!autoSubmit && !confirm('Are you sure you want to submit the quiz?')) {
        return;
    }
    
    try {
        showLoading(true);
        
        // Clear timer
        if (timer) clearInterval(timer);
        
        // Calculate score
        let score = 0;
        let correctAnswers = 0;
        
        currentQuiz.questions.forEach((question, index) => {
            const userAnswer = answers[index];
            if (userAnswer !== undefined) {
                if (question.type === 'mcq' && userAnswer === question.correctAnswer) {
                    correctAnswers++;
                    score += question.points || 1;
                }
                // For short and essay questions, we'll need AI evaluation
            }
        });
        
        // Calculate percentage
        const percentage = (correctAnswers / currentQuiz.questions.length) * 100;
        
        // Create result document
        const resultData = {
            userId: auth.currentUser.uid,
            quizId: currentQuiz.id,
            quizTitle: currentQuiz.title,
            sessionId: currentSession.id,
            answers: answers,
            score: score,
            correctAnswers: correctAnswers,
            totalQuestions: currentQuiz.questions.length,
            percentage: percentage,
            timeSpent: currentQuiz.timeLimit - timeRemaining,
            completedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        const resultRef = await db.collection('results').add(resultData);
        
        // Update session status
        await db.collection('sessions').doc(currentSession.id).update({
            status: 'completed',
            completedAt: firebase.firestore.FieldValue.serverTimestamp(),
            resultId: resultRef.id,
            score: score,
            percentage: percentage
        });
        
        // Update user stats
        await updateUserStats(percentage);
        
        // Redirect to results page
        window.location.href = `result.html?id=${resultRef.id}`;
        
    } catch (error) {
        console.error('Error submitting quiz:', error);
        showMessage('Failed to submit quiz: ' + error.message, 'error');
        showLoading(false);
    }
}

// Update user statistics
async function updateUserStats(score) {
    try {
        const userRef = db.collection('users').doc(auth.currentUser.uid);
        const userDoc = await userRef.get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            const stats = userData.stats || {};
            
            const newStats = {
                quizzesTaken: (stats.quizzesTaken || 0) + 1,
                totalScore: (stats.totalScore || 0) + score,
                averageScore: ((stats.totalScore || 0) + score) / ((stats.quizzesTaken || 0) + 1),
                lastQuizDate: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            await userRef.update({ stats: newStats });
        }
    } catch (error) {
        console.error('Error updating user stats:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    document.getElementById('prev-btn')?.addEventListener('click', previousQuestion);
    document.getElementById('next-btn')?.addEventListener('click', nextQuestion);
    document.getElementById('submit-btn')?.addEventListener('click', () => submitQuiz(false));
    
    // Pause/Resume buttons
    document.getElementById('pause-btn')?.addEventListener('click', pauseQuiz);
    document.getElementById('resume-btn')?.addEventListener('click', resumeQuiz);
    document.getElementById('exit-btn')?.addEventListener('click', exitQuiz);
    
    // Hint toggle
    document.getElementById('hint-toggle')?.addEventListener('click', () => {
        const hintContent = document.querySelector('.hint-content');
        hintContent.style.display = hintContent.style.display === 'none' ? 'block' : 'none';
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
            previousQuestion();
        } else if (e.key === 'ArrowRight' && currentQuestionIndex < currentQuiz.questions.length - 1) {
            nextQuestion();
        } else if (e.key === 'Enter' && e.ctrlKey) {
            submitQuiz(false);
        }
    });
}

// Show loading state
function showLoading(show) {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.display = show ? 'flex' : 'none';
    }
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}