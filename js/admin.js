// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication and admin role
    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = 'auth.html';
            return;
        }
        
        // Check if user is admin
        const isAdmin = await firebaseApp.isAdmin();
        if (!isAdmin) {
            alert('Access denied. Admin privileges required.');
            window.location.href = 'user-dashboard.html';
            return;
        }
        
        // Load admin dashboard
        loadAdminData();
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
                    case 'users':
                        loadUsers();
                        break;
                    case 'quizzes':
                        loadQuizzes();
                        break;
                    case 'assignments':
                        loadAssignments();
                        break;
                    case 'analytics':
                        loadAnalytics();
                        break;
                }
            }
        });
    });
    
    // Load admin data
    async function loadAdminData() {
        // Update date
        const today = new Date();
        document.getElementById('current-date').textContent = today.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Load dashboard
    async function loadDashboard() {
        loadOverview();
    }
    
    // Load overview stats
    async function loadOverview() {
        try {
            // Get total users
            const usersSnapshot = await firebaseApp.db.collection('users').get();
            document.getElementById('total-users').textContent = usersSnapshot.size;
            
            // Get total quizzes
            const quizzesSnapshot = await firebaseApp.db.collection('quizzes').get();
            document.getElementById('total-quizzes').textContent = quizzesSnapshot.size;
            
            // Calculate average score
            const resultsSnapshot = await firebaseApp.db.collection('results').get();
            let totalScore = 0;
            let scoreCount = 0;
            
            resultsSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.score) {
                    totalScore += data.score;
                    scoreCount++;
                }
            });
            
            const avgScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;
            document.getElementById('avg-score').textContent = `${avgScore}%`;
            
            // Get active assignments
            const now = new Date();
            const assignmentsSnapshot = await firebaseApp.db.collection('assignments')
                .where('status', '!=', 'completed')
                .get();
            
            let activeCount = 0;
            assignmentsSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.dueDate && data.dueDate.toDate() > now) {
                    activeCount++;
                }
            });
            
            document.getElementById('active-assignments').textContent = activeCount;
            
            // Load recent activity
            loadRecentActivity();
            
        } catch (error) {
            console.error('Error loading overview:', error);
        }
    }
    
    // Load recent activity
    async function loadRecentActivity() {
        try {
            const results = await firebaseApp.db.collection('results')
                .orderBy('completedAt', 'desc')
                .limit(10)
                .get();
            
            const activityContainer = document.getElementById('recent-activity');
            
            if (results.empty) {
                activityContainer.innerHTML = '<p class="empty-state">No recent activity</p>';
                return;
            }
            
            activityContainer.innerHTML = '';
            
            for (const doc of results.docs) {
                const data = doc.data();
                
                // Get user and quiz info
                const userDoc = await firebaseApp.db.collection('users').doc(data.userId).get();
                const quizDoc = await firebaseApp.db.collection('quizzes').doc(data.quizId).get();
                
                const userName = userDoc.exists ? userDoc.data().name : 'Unknown User';
                const quizTitle = quizDoc.exists ? quizDoc.data().title : 'Unknown Quiz';
                
                const activityItem = document.createElement('div');
                activityItem.className = 'activity-item';
                activityItem.innerHTML = `
                    <div class="activity-info">
                        <h4>${userName} completed ${quizTitle}</h4>
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
    
    // Load users
    async function loadUsers() {
        try {
            const usersSnapshot = await firebaseApp.db.collection('users').get();
            const usersTbody = document.getElementById('users-tbody');
            
            if (usersSnapshot.empty) {
                usersTbody.innerHTML = '<tr><td colspan="6" class="empty-state">No users found</td></tr>';
                return;
            }
            
            usersTbody.innerHTML = '';
            
            for (const doc of usersSnapshot.docs) {
                const userData = doc.data();
                
                // Get user stats
                const resultsSnapshot = await firebaseApp.db.collection('results')
                    .where('userId', '==', doc.id)
                    .get();
                
                let totalScore = 0;
                let quizCount = resultsSnapshot.size;
                
                resultsSnapshot.forEach(resultDoc => {
                    totalScore += resultDoc.data().score || 0;
                });
                
                const avgScore = quizCount > 0 ? Math.round(totalScore / quizCount) : 0;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${userData.name || 'N/A'}</td>
                    <td>${userData.email}</td>
                    <td><span class="status-badge status-${userData.role}">${userData.role}</span></td>
                    <td>${quizCount}</td>
                    <td>${avgScore}%</td>
                    <td>
                        <button class="action-btn action-view" data-user-id="${doc.id}" title="View Details">👁️</button>
                        <button class="action-btn action-edit" data-user-id="${doc.id}" title="Edit User">✏️</button>
                        <button class="action-btn action-delete" data-user-id="${doc.id}" title="Delete User">🗑️</button>
                    </td>
                `;
                
                usersTbody.appendChild(row);
            }
            
            // Add event listeners
            document.querySelectorAll('.action-view').forEach(btn => {
                btn.addEventListener('click', (e) => viewUserDetails(e.target.dataset.userId));
            });
            
            document.querySelectorAll('.action-edit').forEach(btn => {
                btn.addEventListener('click', (e) => editUser(e.target.dataset.userId));
            });
            
            document.querySelectorAll('.action-delete').forEach(btn => {
                btn.addEventListener('click', (e) => deleteUser(e.target.dataset.userId));
            });
            
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }
    
    // Load quizzes
    async function loadQuizzes() {
        try {
            const quizzesSnapshot = await firebaseApp.db.collection('quizzes').get();
            const quizList = document.getElementById('quiz-list');
            
            if (quizzesSnapshot.empty) {
                quizList.innerHTML = '<p class="empty-state">No quizzes found. Create your first quiz!</p>';
                return;
            }
            
            quizList.innerHTML = '';
            
            quizzesSnapshot.forEach(doc => {
                const quiz = doc.data();
                
                const quizCard = document.createElement('div');
                quizCard.className = 'quiz-admin-card';
                quizCard.innerHTML = `
                    <h3>${quiz.title}</h3>
                    <p>${quiz.description || 'No description'}</p>
                    <div class="quiz-stats">
                        <span>📝 ${quiz.questionCount || 0} questions</span>
                        <span>📊 ${quiz.attemptCount || 0} attempts</span>
                        <span>⭐ ${quiz.averageScore || 0}% avg</span>
                    </div>
                    <div class="quiz-admin-actions">
                        <button class="btn btn-sm btn-secondary edit-quiz" data-quiz-id="${doc.id}">Edit</button>
                        <button class="btn btn-sm btn-primary assign-quiz" data-quiz-id="${doc.id}">Assign</button>
                        <button class="btn btn-sm btn-danger delete-quiz" data-quiz-id="${doc.id}">Delete</button>
                    </div>
                `;
                
                quizList.appendChild(quizCard);
            });
            
            // Add event listeners
            document.querySelectorAll('.edit-quiz').forEach(btn => {
                btn.addEventListener('click', (e) => editQuiz(e.target.dataset.quizId));
            });
            
            document.querySelectorAll('.assign-quiz').forEach(btn => {
                btn.addEventListener('click', (e) => assignQuiz(e.target.dataset.quizId));
            });
            
            document.querySelectorAll('.delete-quiz').forEach(btn => {
                btn.addEventListener('click', (e) => deleteQuiz(e.target.dataset.quizId));
            });
            
        } catch (error) {
            console.error('Error loading quizzes:', error);
        }
    }
    
    // Load assignments
    async function loadAssignments() {
        try {
            const now = new Date();
            const assignmentsSnapshot = await firebaseApp.db.collection('assignments')
                .orderBy('dueDate', 'asc')
                .get();
            
            // Calculate overview stats
            let pendingCount = 0;
            let overdueCount = 0;
            let todayCount = 0;
            let weekCount = 0;
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            
            assignmentsSnapshot.forEach(doc => {
                const data = doc.data();
                if (data.status !== 'completed' && data.dueDate) {
                    const dueDate = data.dueDate.toDate();
                    
                    if (dueDate < now) {
                        overdueCount++;
                    } else {
                        pendingCount++;
                        
                        if (dueDate >= today && dueDate < tomorrow) {
                            todayCount++;
                        }
                        
                        if (dueDate < nextWeek) {
                            weekCount++;
                        }
                    }
                }
            });
            
            // Update overview cards
            document.getElementById('pending-count').textContent = pendingCount;
            document.getElementById('overdue-count').textContent = overdueCount;
            document.getElementById('today-count').textContent = todayCount;
            document.getElementById('week-count').textContent = weekCount;
            
            // Load assignments table
            const assignmentsTbody = document.getElementById('assignments-tbody');
            
            if (assignmentsSnapshot.empty) {
                assignmentsTbody.innerHTML = '<tr><td colspan="6" class="empty-state">No assignments yet</td></tr>';
                return;
            }
            
            assignmentsTbody.innerHTML = '';
            
            for (const doc of assignmentsSnapshot.docs) {
                const data = doc.data();
                
                // Get quiz and user info
                const quizDoc = await firebaseApp.db.collection('quizzes').doc(data.quizId).get();
                const userDoc = await firebaseApp.db.collection('users').doc(data.userId).get();
                
                const quizTitle = quizDoc.exists ? quizDoc.data().title : 'Unknown Quiz';
                const userName = userDoc.exists ? userDoc.data().name : 'Unknown User';
                
                const dueDate = data.dueDate ? data.dueDate.toDate() : null;
                const isOverdue = dueDate && dueDate < now && data.status !== 'completed';
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${quizTitle}</td>
                    <td>${userName}</td>
                    <td>${dueDate ? formatDate(dueDate) : 'No due date'}</td>
                    <td>
                        <span class="status-badge status-${isOverdue ? 'overdue' : data.status}">
                            ${isOverdue ? 'Overdue' : data.status}
                        </span>
                    </td>
                    <td>${data.completionRate || 0}%</td>
                    <td>
                        <button class="action-btn action-edit" data-assignment-id="${doc.id}" title="Edit">✏️</button>
                        <button class="action-btn action-delete" data-assignment-id="${doc.id}" title="Delete">🗑️</button>
                    </td>
                `;
                
                assignmentsTbody.appendChild(row);
            }
            
        } catch (error) {
            console.error('Error loading assignments:', error);
        }
    }
    
    // Load analytics
    async function loadAnalytics() {
        try {
            // Performance trends chart
            const ctx1 = document.getElementById('performance-chart').getContext('2d');
            new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Average Score',
                        data: [65, 68, 72, 75, 78, 82],
                        borderColor: 'rgb(74, 144, 226)',
                        backgroundColor: 'rgba(74, 144, 226, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
            
            // Category distribution chart
            const ctx2 = document.getElementById('category-chart').getContext('2d');
            new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: ['Science', 'Math', 'History', 'General'],
                    datasets: [{
                        data: [30, 25, 20, 25],
                        backgroundColor: [
                            'rgb(74, 144, 226)',
                            'rgb(80, 200, 120)',
                            'rgb(243, 156, 18)',
                            'rgb(231, 76, 60)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            
        } catch (error) {
            console.error('Error loading analytics:', error);
        }
    }
    
    // Create new quiz
    document.getElementById('create-quiz-btn')?.addEventListener('click', () => {
        window.location.href = 'quiz-editor.html';
    });
    
    // New assignment
    document.getElementById('new-assignment-btn')?.addEventListener('click', () => {
        // Show assignment modal
        showAssignmentModal();
    });
    
    // Export report
    document.getElementById('export-report-btn')?.addEventListener('click', async () => {
        try {
            // Generate report data
            const report = await generateReport();
            
            // Download as CSV
            const csv = convertToCSV(report);
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `quiz-report-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            
        } catch (error) {
            console.error('Error exporting report:', error);
            alert('Failed to export report');
        }
    });
    
    // User search
    document.getElementById('user-search')?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        document.querySelectorAll('#users-tbody tr').forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
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
            day: 'numeric'
        });
    }
    
    async function generateReport() {
        // Generate comprehensive report data
        const users = await firebaseApp.db.collection('users').get();
        const quizzes = await firebaseApp.db.collection('quizzes').get();
        const results = await firebaseApp.db.collection('results').get();
        
        return {
            totalUsers: users.size,
            totalQuizzes: quizzes.size,
            totalAttempts: results.size,
            date: new Date().toISOString()
        };
    }
    
    function convertToCSV(data) {
        // Convert report data to CSV format
        let csv = 'Metric,Value\n';
        csv += `Total Users,${data.totalUsers}\n`;
        csv += `Total Quizzes,${data.totalQuizzes}\n`;
        csv += `Total Attempts,${data.totalAttempts}\n`;
        csv += `Report Date,${data.date}\n`;
        return csv;
    }
    
    function showAssignmentModal() {
        // Implementation for assignment modal
        alert('Assignment modal would appear here');
    }
    
    function viewUserDetails(userId) {
        // Implementation for viewing user details
        console.log('View user:', userId);
    }
    
    function editUser(userId) {
        // Implementation for editing user
        console.log('Edit user:', userId);
    }
    
    async function deleteUser(userId) {
        if (!confirm('Are you sure you want to delete this user?')) return;
        
        try {
            await firebaseApp.db.collection('users').doc(userId).delete();
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    }
    
    function editQuiz(quizId) {
        window.location.href = `quiz-editor.html?id=${quizId}`;
    }
    
    function assignQuiz(quizId) {
        // Implementation for assigning quiz
        console.log('Assign quiz:', quizId);
    }
    
    async function deleteQuiz(quizId) {
        if (!confirm('Are you sure you want to delete this quiz?')) return;
        
        try {
            await firebaseApp.db.collection('quizzes').doc(quizId).delete();
            loadQuizzes();
        } catch (error) {
            console.error('Error deleting quiz:', error);
            alert('Failed to delete quiz');
        }
    }
});