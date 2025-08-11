// User Dashboard JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = 'auth.html';
            return;
        }
        
        // Load user data
        loadUserData(user);
        loadDashboard();
    });
    
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Show corresponding section
            const targetPage = item.dataset.page;
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            const targetSection = document.getElementById(`${targetPage}-section`);
            if (targetSection) {
                targetSection.style.display = 'block';
                
                // Load section-specific data
                switch(targetPage) {
                    case 'overview':
                        loadOverview();
                        break;
                    case 'quizzes':
                        loadAvailableQuizzes();
                        break;
                    case 'history':
                        loadQuizHistory();
                        break;
                    case 'profile':
                        loadProfile();
                        break;
                }
            }
        });
    });
    
    // Load user data
    async function loadUserData(user) {
        try {
            const userDoc = await firebaseApp.db.collection('users').doc(user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                
                // Update welcome message
                document.getElementById('user-name').textContent = userData.name || 'Student';
                
                // Update date
                const today = new Date();
                document.getElementById('current-date').textContent = today.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }
    
    // Load dashboard overview
    async function loadDashboard() {
        loadOverview();
        checkResumeSession();
    }
    
    // Load overview stats
    async function loadOverview() {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            // Get user stats
            const userDoc = await firebaseApp.db.collection('users').doc(user.uid).get();
            if (userDoc.exists) {
                const stats = userDoc.data().stats || {};
                
                // Update stat cards
                document.getElementById('total-quizzes').textContent = stats.totalQuizzes || 0;
                document.getElementById('avg-score').textContent = `${Math.round(stats.averageScore || 0)}%`;
                document.getElementById('time-spent').textContent = formatTime(stats.totalTimeSpent || 0);
                document.getElementById('streak').textContent = `${stats.currentStreak || 0} days`;
            }
            
            // Load recent activity
            loadRecentActivity();
            
        } catch (error) {
            console.error('Error loading overview:', error);
        }
    }
    
    // Load recent activity
    async function loadRecentActivity() {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            const results = await firebaseApp.db.collection('results')
                .where('userId', '==', user.uid)
                .orderBy('completedAt', 'desc')
                .limit(5)
                .get();
            
            const activityContainer = document.getElementById('recent-activity');
            
            if (results.empty) {
                activityContainer.innerHTML = '<p class="empty-state">No recent activity</p>';
                return;
            }
            
            activityContainer.innerHTML = '';
            
            for (const doc of results.docs) {
                const data = doc.data();
                const quizDoc = await firebaseApp.db.collection('quizzes').doc(data.quizId).get();
                const quizTitle = quizDoc.exists ? quizDoc.data().title : 'Unknown Quiz';
                
                const activityItem = document.createElement('div');
                activityItem.className = 'activity-item';
                activityItem.innerHTML = `
                    <div class="activity-info">
                        <h4>${quizTitle}</h4>
                        <p>${formatDate(data.completedAt.toDate())}</p>
                    </div>
                    <div class="activity-score">${Math.round(data.score)}%</div>
                `;
                
                activityContainer.appendChild(activityItem);
            }
        } catch (error) {
            console.error('Error loading recent activity:', error);
        }
    }
    
    // Check for resume session
    async function checkResumeSession() {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            const sessions = await firebaseApp.db.collection('sessions')
                .where('userId', '==', user.uid)
                .where('status', '==', 'paused')
                .orderBy('lastActivity', 'desc')
                .limit(1)
                .get();
            
            if (!sessions.empty) {
                const session = sessions.docs[0];
                const sessionData = session.data();
                
                const resumeSection = document.getElementById('resume-section');
                const resumeInfo = document.getElementById('resume-quiz-info');
                
                // Get quiz details
                const quizDoc = await firebaseApp.db.collection('quizzes').doc(sessionData.quizId).get();
                const quizTitle = quizDoc.exists ? quizDoc.data().title : 'Unknown Quiz';
                
                resumeInfo.innerHTML = `
                    <div>
                        <h3>${quizTitle}</h3>
                        <p>Question ${sessionData.currentQuestion + 1} of ${sessionData.totalQuestions}</p>
                        <p>Time spent: ${formatTime(sessionData.timeSpent)}</p>
                    </div>
                    <button class="btn btn-primary resume-btn" data-session-id="${session.id}">
                        Resume Quiz
                    </button>
                `;
                
                resumeSection.style.display = 'block';
                
                // Add resume button listener
                document.querySelector('.resume-btn').addEventListener('click', (e) => {
                    const sessionId = e.target.dataset.sessionId;
                    window.location.href = `quiz.html?session=${sessionId}`;
                });
            }
        } catch (error) {
            console.error('Error checking resume session:', error);
        }
    }
    
    // Load available quizzes
    async function loadAvailableQuizzes() {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            // Get user's assigned quizzes
            const assignments = await firebaseApp.db.collection('assignments')
                .where('userId', '==', user.uid)
                .where('status', '!=', 'completed')
                .get();
            
            const assignedQuizIds = assignments.docs.map(doc => doc.data().quizId);
            
            // Get all public quizzes
            const quizzesQuery = await firebaseApp.db.collection('quizzes')
                .where('isActive', '==', true)
                .get();
            
            const quizGrid = document.getElementById('quiz-grid');
            
            if (quizzesQuery.empty) {
                quizGrid.innerHTML = '<p class="empty-state">No quizzes available</p>';
                return;
            }
            
            quizGrid.innerHTML = '';
            
            quizzesQuery.forEach(doc => {
                const quiz = doc.data();
                const isAssigned = assignedQuizIds.includes(doc.id);
                
                const quizCard = document.createElement('div');
                quizCard.className = 'quiz-card';
                quizCard.innerHTML = `
                    <h3>${quiz.title}</h3>
                    <p>${quiz.description || 'No description available'}</p>
                    <div class="quiz-meta">
                        <span>${quiz.questionCount || 0} questions</span>
                        <span class="quiz-difficulty difficulty-${quiz.difficulty || 'medium'}">
                            ${quiz.difficulty || 'Medium'}
                        </span>
                    </div>
                    ${isAssigned ? '<span class="assigned-badge">Assigned</span>' : ''}
                    <div class="quiz-actions">
                        <button class="btn btn-primary start-quiz" data-quiz-id="${doc.id}">
                            Start Quiz
                        </button>
                    </div>
                `;
                
                quizGrid.appendChild(quizCard);
            });
            
            // Add event listeners to start buttons
            document.querySelectorAll('.start-quiz').forEach(button => {
                button.addEventListener('click', (e) => {
                    const quizId = e.target.dataset.quizId;
                    startQuiz(quizId);
                });
            });
            
        } catch (error) {
            console.error('Error loading quizzes:', error);
        }
    }
    
    // Start a quiz
    async function startQuiz(quizId) {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            // Create a new session
            const sessionData = {
                userId: user.uid,
                quizId: quizId,
                status: 'active',
                startTime: firebaseApp.getTimestamp(),
                lastActivity: firebaseApp.getTimestamp(),
                currentQuestion: 0,
                answers: [],
                timeSpent: 0
            };
            
            const sessionRef = await firebaseApp.db.collection('sessions').add(sessionData);
            
            // Redirect to quiz page
            window.location.href = `quiz.html?session=${sessionRef.id}`;
            
        } catch (error) {
            console.error('Error starting quiz:', error);
            alert('Failed to start quiz. Please try again.');
        }
    }
    
    // Load quiz history
    async function loadQuizHistory() {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            const results = await firebaseApp.db.collection('results')
                .where('userId', '==', user.uid)
                .orderBy('completedAt', 'desc')
                .get();
            
            const historyTbody = document.getElementById('history-tbody');
            
            if (results.empty) {
                historyTbody.innerHTML = '<tr><td colspan="5" class="empty-state">No quiz history yet</td></tr>';
                return;
            }
            
            historyTbody.innerHTML = '';
            
            for (const doc of results.docs) {
                const data = doc.data();
                const quizDoc = await firebaseApp.db.collection('quizzes').doc(data.quizId).get();
                const quizTitle = quizDoc.exists ? quizDoc.data().title : 'Unknown Quiz';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formatDate(data.completedAt.toDate())}</td>
                    <td>${quizTitle}</td>
                    <td>${Math.round(data.score)}%</td>
                    <td>${formatTime(data.timeSpent)}</td>
                    <td>
                        <button class="btn btn-sm btn-secondary view-result" data-result-id="${doc.id}">
                            View Details
                        </button>
                    </td>
                `;
                
                historyTbody.appendChild(row);
            }
            
            // Add event listeners to view buttons
            document.querySelectorAll('.view-result').forEach(button => {
                button.addEventListener('click', (e) => {
                    const resultId = e.target.dataset.resultId;
                    window.location.href = `result.html?id=${resultId}`;
                });
            });
            
        } catch (error) {
            console.error('Error loading quiz history:', error);
        }
    }
    
    // Load profile
    async function loadProfile() {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            const userDoc = await firebaseApp.db.collection('users').doc(user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                
                document.getElementById('profile-name').value = userData.name || '';
                document.getElementById('profile-email').value = userData.email || '';
                document.getElementById('profile-role').value = userData.role || 'student';
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        }
    }
    
    // Update profile
    document.getElementById('profile-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        const name = document.getElementById('profile-name').value;
        
        try {
            await firebaseApp.db.collection('users').doc(user.uid).update({
                name: name,
                profileCompleted: true,
                lastUpdated: firebaseApp.getTimestamp()
            });
            
            // Update display name in Firebase Auth
            await user.updateProfile({
                displayName: name
            });
            
            alert('Profile updated successfully!');
            document.getElementById('user-name').textContent = name;
            
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    });
    
    // Export history to CSV
    document.getElementById('export-history')?.addEventListener('click', async () => {
        const user = firebase.auth().currentUser;
        if (!user) return;
        
        try {
            const results = await firebaseApp.db.collection('results')
                .where('userId', '==', user.uid)
                .orderBy('completedAt', 'desc')
                .get();
            
            let csv = 'Date,Quiz Title,Score,Time Spent\n';
            
            for (const doc of results.docs) {
                const data = doc.data();
                const quizDoc = await firebaseApp.db.collection('quizzes').doc(data.quizId).get();
                const quizTitle = quizDoc.exists ? quizDoc.data().title : 'Unknown Quiz';
                
                csv += `"${formatDate(data.completedAt.toDate())}","${quizTitle}","${Math.round(data.score)}%","${formatTime(data.timeSpent)}"\n`;
            }
            
            // Download CSV
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'quiz-history.csv';
            a.click();
            
        } catch (error) {
            console.error('Error exporting history:', error);
            alert('Failed to export history. Please try again.');
        }
    });
    
    // Logout
    document.getElementById('logout-btn')?.addEventListener('click', async () => {
        try {
            await firebase.auth().signOut();
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    });
    
    // Helper functions
    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    }
    
    // Filter controls
    document.getElementById('category-filter')?.addEventListener('change', filterQuizzes);
    document.getElementById('difficulty-filter')?.addEventListener('change', filterQuizzes);
    
    function filterQuizzes() {
        const category = document.getElementById('category-filter').value;
        const difficulty = document.getElementById('difficulty-filter').value;
        
        // Apply filters to quiz cards
        document.querySelectorAll('.quiz-card').forEach(card => {
            const cardCategory = card.dataset.category || '';
            const cardDifficulty = card.dataset.difficulty || '';
            
            const categoryMatch = !category || cardCategory === category;
            const difficultyMatch = !difficulty || cardDifficulty === difficulty;
            
            card.style.display = categoryMatch && difficultyMatch ? 'block' : 'none';
        });
    }
});