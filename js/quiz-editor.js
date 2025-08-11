// Quiz Editor JavaScript
let questionCount = 0;
let questions = [];
let editingQuizId = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Check authentication and admin role
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = 'auth.html';
            return;
        }
        
        // Check if user is admin
        const isAdmin = await checkAdminRole();
        if (!isAdmin) {
            alert('You need admin privileges to access this page');
            window.location.href = 'user-dashboard.html';
            return;
        }
        
        // Check if editing existing quiz
        const urlParams = new URLSearchParams(window.location.search);
        const quizId = urlParams.get('id');
        
        if (quizId) {
            editingQuizId = quizId;
            await loadQuizForEditing(quizId);
        } else {
            // Add first question by default
            addQuestion();
        }
        
        // Setup event listeners
        setupEventListeners();
    });
});

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

// Load quiz for editing
async function loadQuizForEditing(quizId) {
    try {
        showLoading(true);
        
        const quizDoc = await db.collection('quizzes').doc(quizId).get();
        if (!quizDoc.exists) {
            throw new Error('Quiz not found');
        }
        
        const quizData = quizDoc.data();
        
        // Update page title
        document.getElementById('edit-mode').textContent = 'Edit Quiz';
        
        // Fill basic information
        document.getElementById('quiz-title').value = quizData.title || '';
        document.getElementById('quiz-description').value = quizData.description || '';
        document.getElementById('quiz-category').value = quizData.category || '';
        document.getElementById('quiz-difficulty').value = quizData.difficulty || '';
        document.getElementById('quiz-duration').value = quizData.timeLimit ? quizData.timeLimit / 60 : '';
        document.getElementById('quiz-passing-score').value = quizData.passingScore || 60;
        
        // Fill settings
        document.getElementById('quiz-shuffle-questions').checked = quizData.shuffleQuestions || false;
        document.getElementById('quiz-shuffle-options').checked = quizData.shuffleOptions || false;
        document.getElementById('quiz-show-answers').checked = quizData.showAnswers !== false;
        document.getElementById('quiz-allow-review').checked = quizData.allowReview !== false;
        document.getElementById('quiz-active').checked = quizData.isActive !== false;
        
        // Load questions
        if (quizData.questions && quizData.questions.length > 0) {
            questions = quizData.questions;
            questions.forEach((question, index) => {
                addQuestionToUI(question, index);
            });
            questionCount = questions.length;
        } else {
            addQuestion();
        }
        
        showLoading(false);
    } catch (error) {
        console.error('Error loading quiz:', error);
        alert('Failed to load quiz: ' + error.message);
        showLoading(false);
    }
}

// Add new question
function addQuestion() {
    const question = {
        id: `q_${Date.now()}_${questionCount}`,
        type: 'mcq',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1,
        explanation: '',
        hint: ''
    };
    
    questions.push(question);
    addQuestionToUI(question, questionCount);
    questionCount++;
}

// Add question to UI
function addQuestionToUI(question, index) {
    const container = document.getElementById('questions-container');
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-container';
    questionDiv.id = `question-${index}`;
    questionDiv.innerHTML = `
        <div class="question-header">
            <span class="question-number">Question ${index + 1}</span>
            <div class="question-actions">
                <button type="button" class="btn-icon btn-duplicate" onclick="duplicateQuestion(${index})" title="Duplicate">
                    📋
                </button>
                <button type="button" class="btn-icon btn-delete" onclick="deleteQuestion(${index})" title="Delete">
                    🗑️
                </button>
            </div>
        </div>
        
        <div class="form-group">
            <label>Question Type</label>
            <select onchange="changeQuestionType(${index}, this.value)">
                <option value="mcq" ${question.type === 'mcq' ? 'selected' : ''}>Multiple Choice</option>
                <option value="short" ${question.type === 'short' ? 'selected' : ''}>Short Answer</option>
                <option value="essay" ${question.type === 'essay' ? 'selected' : ''}>Essay</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Question Text *</label>
            <textarea rows="2" placeholder="Enter your question here" 
                      onchange="updateQuestionText(${index}, this.value)">${question.question || ''}</textarea>
        </div>
        
        <div id="answer-options-${index}">
            ${generateAnswerOptions(question, index)}
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label>Points</label>
                <input type="number" min="1" value="${question.points || 1}" 
                       onchange="updateQuestionPoints(${index}, this.value)">
            </div>
            
            <div class="form-group">
                <label>Hint (Optional)</label>
                <input type="text" placeholder="Give a hint" value="${question.hint || ''}"
                       onchange="updateQuestionHint(${index}, this.value)">
            </div>
        </div>
        
        <div class="form-group">
            <label>Explanation (Shown after answer)</label>
            <textarea rows="2" placeholder="Explain the correct answer" 
                      onchange="updateQuestionExplanation(${index}, this.value)">${question.explanation || ''}</textarea>
        </div>
    `;
    
    container.appendChild(questionDiv);
}

// Generate answer options based on question type
function generateAnswerOptions(question, index) {
    if (question.type === 'mcq') {
        let optionsHTML = '<div class="options-container"><label>Answer Options</label>';
        
        question.options.forEach((option, optIndex) => {
            optionsHTML += `
                <div class="option-item">
                    <input type="radio" name="correct-${index}" 
                           ${question.correctAnswer === optIndex ? 'checked' : ''}
                           onchange="updateCorrectAnswer(${index}, ${optIndex})">
                    <input type="text" placeholder="Option ${optIndex + 1}" 
                           value="${option || ''}"
                           onchange="updateOption(${index}, ${optIndex}, this.value)">
                </div>
            `;
        });
        
        optionsHTML += `
            <button type="button" class="btn-add-option" onclick="addOption(${index})">
                Add Option
            </button>
        </div>`;
        
        return optionsHTML;
    } else if (question.type === 'short') {
        return `
            <div class="form-group">
                <label>Correct Answer(s) - Separate multiple answers with semicolon (;)</label>
                <input type="text" placeholder="e.g., Answer 1; Answer 2" 
                       value="${question.correctAnswer || ''}"
                       onchange="updateCorrectAnswer(${index}, this.value)">
            </div>
        `;
    } else if (question.type === 'essay') {
        return `
            <div class="form-group">
                <label>Sample Answer / Grading Rubric</label>
                <textarea rows="3" placeholder="Provide sample answer or grading criteria"
                          onchange="updateCorrectAnswer(${index}, this.value)">${question.correctAnswer || ''}</textarea>
            </div>
        `;
    }
}

// Change question type
function changeQuestionType(index, type) {
    questions[index].type = type;
    
    // Reset answer format based on type
    if (type === 'mcq') {
        questions[index].options = ['', '', '', ''];
        questions[index].correctAnswer = 0;
    } else {
        questions[index].correctAnswer = '';
    }
    
    // Update UI
    document.getElementById(`answer-options-${index}`).innerHTML = 
        generateAnswerOptions(questions[index], index);
}

// Update question text
function updateQuestionText(index, text) {
    questions[index].question = text;
}

// Update question points
function updateQuestionPoints(index, points) {
    questions[index].points = parseInt(points) || 1;
}

// Update question hint
function updateQuestionHint(index, hint) {
    questions[index].hint = hint;
}

// Update question explanation
function updateQuestionExplanation(index, explanation) {
    questions[index].explanation = explanation;
}

// Update correct answer
function updateCorrectAnswer(index, value) {
    questions[index].correctAnswer = value;
}

// Update MCQ option
function updateOption(index, optionIndex, value) {
    questions[index].options[optionIndex] = value;
}

// Add option to MCQ
function addOption(index) {
    questions[index].options.push('');
    document.getElementById(`answer-options-${index}`).innerHTML = 
        generateAnswerOptions(questions[index], index);
}

// Delete question
function deleteQuestion(index) {
    if (questions.length === 1) {
        alert('Quiz must have at least one question');
        return;
    }
    
    if (confirm('Are you sure you want to delete this question?')) {
        questions.splice(index, 1);
        
        // Rebuild UI
        document.getElementById('questions-container').innerHTML = '';
        questions.forEach((question, idx) => {
            addQuestionToUI(question, idx);
        });
        questionCount = questions.length;
    }
}

// Duplicate question
function duplicateQuestion(index) {
    const original = questions[index];
    const duplicate = JSON.parse(JSON.stringify(original));
    duplicate.id = `q_${Date.now()}_${questionCount}`;
    
    questions.splice(index + 1, 0, duplicate);
    
    // Rebuild UI
    document.getElementById('questions-container').innerHTML = '';
    questions.forEach((question, idx) => {
        addQuestionToUI(question, idx);
    });
    questionCount = questions.length;
}

// Setup event listeners
function setupEventListeners() {
    // Add question button
    document.getElementById('add-question-btn').addEventListener('click', addQuestion);
    
    // Form submission
    document.getElementById('quiz-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await publishQuiz();
    });
    
    // Save draft button
    document.getElementById('save-draft-btn').addEventListener('click', async () => {
        await saveQuiz(false);
    });
    
    // Preview button
    document.getElementById('preview-btn').addEventListener('click', previewQuiz);
}

// Validate quiz data
function validateQuiz() {
    const title = document.getElementById('quiz-title').value.trim();
    if (!title) {
        alert('Please enter a quiz title');
        return false;
    }
    
    const category = document.getElementById('quiz-category').value;
    if (!category) {
        alert('Please select a category');
        return false;
    }
    
    const difficulty = document.getElementById('quiz-difficulty').value;
    if (!difficulty) {
        alert('Please select difficulty level');
        return false;
    }
    
    // Validate questions
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        
        if (!q.question || q.question.trim() === '') {
            alert(`Question ${i + 1} is empty`);
            return false;
        }
        
        if (q.type === 'mcq') {
            const validOptions = q.options.filter(opt => opt && opt.trim() !== '');
            if (validOptions.length < 2) {
                alert(`Question ${i + 1} must have at least 2 options`);
                return false;
            }
        } else if (q.type === 'short' && (!q.correctAnswer || q.correctAnswer.trim() === '')) {
            alert(`Question ${i + 1} must have a correct answer`);
            return false;
        }
    }
    
    return true;
}

// Save quiz
async function saveQuiz(isPublished) {
    if (!validateQuiz()) return false;
    
    try {
        showLoading(true);
        
        const quizData = {
            title: document.getElementById('quiz-title').value.trim(),
            description: document.getElementById('quiz-description').value.trim(),
            category: document.getElementById('quiz-category').value,
            difficulty: document.getElementById('quiz-difficulty').value,
            timeLimit: document.getElementById('quiz-duration').value ? 
                       parseInt(document.getElementById('quiz-duration').value) * 60 : null,
            passingScore: parseInt(document.getElementById('quiz-passing-score').value) || 60,
            questions: questions,
            questionCount: questions.length,
            totalPoints: questions.reduce((sum, q) => sum + (q.points || 1), 0),
            shuffleQuestions: document.getElementById('quiz-shuffle-questions').checked,
            shuffleOptions: document.getElementById('quiz-shuffle-options').checked,
            showAnswers: document.getElementById('quiz-show-answers').checked,
            allowReview: document.getElementById('quiz-allow-review').checked,
            isActive: isPublished && document.getElementById('quiz-active').checked,
            isDraft: !isPublished,
            createdBy: auth.currentUser.uid,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        if (editingQuizId) {
            // Update existing quiz
            await db.collection('quizzes').doc(editingQuizId).update(quizData);
            showMessage(`Quiz ${isPublished ? 'published' : 'saved as draft'} successfully!`, 'success');
        } else {
            // Create new quiz
            quizData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            quizData.attempts = 0;
            quizData.averageScore = 0;
            
            const docRef = await db.collection('quizzes').add(quizData);
            editingQuizId = docRef.id;
            
            showMessage(`Quiz ${isPublished ? 'published' : 'saved as draft'} successfully!`, 'success');
            
            // Update URL to include quiz ID
            window.history.replaceState({}, '', `?id=${docRef.id}`);
            document.getElementById('edit-mode').textContent = 'Edit Quiz';
        }
        
        showLoading(false);
        return true;
    } catch (error) {
        console.error('Error saving quiz:', error);
        showMessage('Failed to save quiz: ' + error.message, 'error');
        showLoading(false);
        return false;
    }
}

// Publish quiz
async function publishQuiz() {
    const saved = await saveQuiz(true);
    if (saved) {
        setTimeout(() => {
            window.location.href = 'admin-dashboard.html';
        }, 2000);
    }
}

// Preview quiz
function previewQuiz() {
    if (!validateQuiz()) return;
    
    // Save to localStorage for preview
    const previewData = {
        title: document.getElementById('quiz-title').value,
        description: document.getElementById('quiz-description').value,
        category: document.getElementById('quiz-category').value,
        difficulty: document.getElementById('quiz-difficulty').value,
        timeLimit: document.getElementById('quiz-duration').value ? 
                   parseInt(document.getElementById('quiz-duration').value) * 60 : null,
        questions: questions
    };
    
    localStorage.setItem('quizPreview', JSON.stringify(previewData));
    
    // Open preview in new tab
    window.open('quiz.html?preview=true', '_blank');
}

// Show loading
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'flex' : 'none';
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