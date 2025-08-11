# Quiz App - Complete Game Plan

## Project Overview
A modern, interactive quiz application with AI-powered adaptive learning, user authentication, separate admin and user interfaces, built with HTML, CSS, and JavaScript that provides an engaging learning experience with comprehensive quiz management capabilities.

## Core Features

### 1. Authentication System
- **Sign In/Sign Up Page**
  - User registration form (username, email, password, confirm password)
  - Login form for existing users
  - Password recovery option
  - Remember me functionality
  - Form validation and error messages
  - User role selection during signup (Student/Teacher)
  - Social login options (optional - Google, Facebook)

### 2. User Interface (Student/User Screen)
- **User Dashboard**
  - Welcome message with username
  - Available quizzes list
  - Quiz history and scores
  - Performance statistics
  - Upcoming quizzes
  - Profile management
  - Resume incomplete quizzes section

- **Quiz Interface**
  - Question display area
  - Multiple choice answer buttons (4 options)
  - Progress indicator (Question X of Y)
  - Timer display (question-level and overall)
  - Score display
  - Next/Previous navigation buttons
  - Submit quiz button
  - Bookmark question feature
  - Pause button (one-time use)

- **Results Screen**
  - Final score display
  - Percentage achieved
  - Performance message (Excellent/Good/Need Practice)
  - Review answers option
  - Detailed answer explanations
  - Restart quiz button
  - Share results option
  - Save results to profile

### 3. Admin Interface (Admin Screen)
- **Admin Dashboard**
  - Overview statistics (total users, quizzes, average scores)
  - Recent activity feed
  - Quick actions menu
  - System notifications
  - Real-time user activity monitoring
  
- **Quiz Assignment Tracking**
  - **Assignment Overview**
    - Total quizzes assigned
    - Pending submissions count
    - Overdue assignments highlighted in red
    - Today's due assignments
    - This week's upcoming deadlines
  
  - **Assignment Management Table**
    - Quiz title and assignment date
    - Assigned to (individual/group/all)
    - Due date and time
    - Status (Not Started/In Progress/Completed/Overdue)
    - Attempts made vs allowed attempts
    - Current score/grade
    - Time spent on quiz
    - Quick actions (Extend deadline/Send reminder/View details)
  
  - **Assignment Filters**
    - Filter by status (All/Pending/Completed/Overdue)
    - Filter by due date range
    - Filter by quiz type/category
    - Filter by user/group
    - Sort by due date/submission date/score
  
  - **Bulk Assignment Actions**
    - Assign quiz to multiple users/groups
    - Set/modify due dates in bulk
    - Send reminders to pending users
    - Export assignment report
    - Grant extensions to selected users

- **Advanced User Analytics & Query System**
  - **User Search & Query**
    - Search by name, email, ID
    - Filter by performance metrics
    - Advanced query builder (e.g., "users with <60% in Physics")
    - Query templates for common scenarios
    - Bulk user selection for actions
    - Custom user groups/segments
    - Export query results
  
  - **Individual User Deep Dive**
    - Complete quiz history timeline
    - Performance trends over time
    - Topic-wise strength/weakness heatmap
    - Time spent per topic analysis
    - Learning velocity tracking
    - Mistake pattern analysis
    - Recommended intervention points
    - AI-generated performance summaries
  
  - **Comparative Analytics**
    - Compare multiple users side-by-side
    - Peer group performance benchmarking
    - Class/cohort average comparisons
    - Performance distribution curves
    - Identify top performers and struggling students
  
  - **AI-Powered Insights (Using Gemini Pro)**
    - Auto-generate performance summaries
    - Predict future performance trends
    - Suggest personalized learning paths
    - Identify at-risk students
    - Recommend optimal quiz difficulty
    - Generate intervention strategies
    - 30-day performance predictions

- **Analytics Dashboard Features**
  - **Visual Analytics Tools**
    - Interactive charts (Chart.js/D3.js)
    - Performance heatmaps
    - Skill radar charts
    - Progress timelines
    - Score distribution histograms
    - Topic mastery grids
  
  - **Custom Reports Builder**
    - Drag-and-drop report components
    - Scheduled report generation
    - Automated email reports
    - Export to PDF/Excel/CSV
    - Shareable report links
  
  - **Real-time Monitoring**
    - Live quiz attempts dashboard
    - Active user tracking
    - Real-time score updates
    - Alert system for poor performance
    - Intervention notifications

- **Quiz Management**
  - Create new quiz
  - Edit existing quizzes
  - Delete quizzes
  - Duplicate quiz feature
  - Set quiz availability (active/inactive)
  - Schedule quiz publication
  - Quiz preview mode
  - Auto-assign based on performance
  - Question-level time configuration
  
- **Quiz Reassignment Features**
  - **Reassign Previous Quizzes:**
    - View user's quiz history
    - Select any completed quiz
    - Reset quiz for retake
    - Allow multiple attempts
    - Compare attempt scores
  
  - **Reassignment Options:**
    - Reset with same questions
    - Reset with shuffled questions
    - Generate similar difficulty quiz
    - Keep or clear previous answers
    - Set new deadline
    - Add retry notes/feedback
  
  - **Reassignment Scenarios:**
    - Student needs practice on same topic
    - Technical issues during first attempt
    - Request for grade improvement
    - Remedial practice after failure
    - Periodic skill reassessment
  
  - **Tracking Reassignments:**
    - Mark as "Reassigned" vs "New"
    - Track attempt number (1st, 2nd, 3rd)
    - Compare scores across attempts
    - Show improvement trends
    - Flag best attempt
    - Calculate average across attempts

- **Question Bank Management**
  - Add new questions with rich media
  - Upload visual descriptions (SVG/images)
  - Add hints with optional visuals
  - Create detailed explanations with diagrams
  - Edit/Delete questions
  - Import questions (CSV/Excel)
  - Export questions with media
  - Categorize questions
  - Set difficulty levels
  - Configure hint timing and penalties
  - Question performance analytics
  - Preview questions with visuals

- **User Management**
  - View all registered users
  - Advanced search and filter
  - Bulk user operations
  - Edit user details
  - Activate/Deactivate users
  - Reset user passwords
  - View detailed performance
  - Assign roles (Admin/User)
  - Create user groups/classes

### 4. Quiz Functionality
- **Question Types**
  - Multiple choice questions (4 options)
  - True/False questions
  - Short answer/Type-in questions
  - Long answer/Essay questions
  - Reading comprehension with follow-up questions
  - Fill-in-the-blank questions
  - Mixed question types in single quiz

- **AI-Powered Answer Evaluation (Gemini Pro)**
  - **Type-in Answer Analysis:**
    - Evaluate correctness of short answers
    - Partial credit for partially correct answers
    - Synonym and variation recognition
    - Spelling tolerance options
  
  - **Essay/Long Answer Evaluation:**
    - Assess comprehension and understanding
    - Check for key concepts and ideas
    - Evaluate answer completeness
    - Provide detailed feedback on missing points
    - Grade based on rubric criteria
  
  - **Reading Comprehension Analysis:**
    - Main idea identification
    - Supporting details verification
    - Inference and critical thinking assessment
    - Vocabulary in context evaluation
    - Author's purpose and tone analysis

- **Intelligent Feedback System**
  - Real-time AI feedback on typed answers
  - Suggestions for improvement
  - Highlighting missing key points
  - Positive reinforcement for correct concepts
  - Learning tips based on answer quality
  - Sample correct answers for comparison

- **Scoring System**
  - Multiple choice: Binary scoring (correct/incorrect)
  - Type-in answers: Partial credit (0-100%)
  - Essay questions: Rubric-based scoring
  - AI-generated score justification
  - Weighted scoring by question difficulty
  - Bonus points for exceptional answers

- **Timer Features** (Advanced)
  - **Question-Level Time Management:**
    - Admin sets individual time limit per question
    - Different time for different question types
    - More time for essay/comprehension questions
    - Less time for true/false questions
    - Override default with custom time
  
  - **Time Configuration Options:**
    - Default time by question type
    - Custom time per specific question
    - Time multiplier for difficulty (easy: 1x, hard: 1.5x)
    - Extra time for questions with passages
    - Buffer time for technical delays
  
  - **Timer Display Modes:**
    - Countdown timer per question
    - Overall quiz timer
    - Both timers simultaneously
    - Warning alerts at 30 seconds
    - Critical alert at 10 seconds
  
  - **Time-Based Scoring:**
    - Bonus points for quick correct answers
    - No penalty for using allowed time
    - Partial credit if time expires mid-answer
    - Time statistics for analysis
  
  - **Timer Flexibility:**
    - Auto-submit when question time expires
    - Option to use overall time pool
    - Borrow time from next question
    - Save unused time for harder questions
    - Timer state persistence

- **Session Management**
  - **Pause Feature:**
    - One-time pause allowed per quiz
    - Pause button stops timer completely
    - Screen hides questions during pause
    - Resume button continues from exact point
    - Pause duration tracked but not counted
  
  - **Auto-Save Progress:**
    - Save state after every answer
    - Track current question index
    - Store elapsed time per question
    - Save partial answers for type-in questions
    - Sync to Firestore in real-time
    - Auto-save every 10 seconds
  
  - **Resume Capability:**
    - Detect incomplete quiz sessions
    - Show "Resume Quiz" option on dashboard
    - Restore exact question position
    - Restore timer to previous elapsed time
    - Restore all previous answers
    - Handle multiple incomplete quizzes
    - 24-hour expiry for sessions
  
  - **Session Recovery Scenarios:**
    - Browser crash/close
    - Internet disconnection
    - Power outage
    - Accidental navigation away
    - System restart
    - Tab closure
  
  - **Session Security:**
    - Validate session integrity
    - Prevent multiple active sessions
    - Time limit for resuming (24 hours)
    - Lock quiz after submission attempt

### 5. AI-Powered Quiz Generation & Adaptive Learning (Gemini Pro Integration)
- **AI Quiz Generator for Admin**
  - Generate quiz questions using Gemini Pro API
  - Input topic/subject and difficulty level
  - Auto-generate multiple choice questions
  - AI-suggested answer explanations
  - Bulk question generation
  - Review and edit AI-generated questions before publishing

- **Intelligent Skill Analysis System**
  - Track all user responses (correct/incorrect)
  - Identify knowledge gaps and weak areas
  - Pattern recognition in wrong answers
  - Time taken per question analysis
  - Topic-wise performance mapping
  - Difficulty level performance tracking
  - Generate skill proficiency reports

- **Adaptive Quiz Generation (Personalized Learning)**
  - Auto-generate targeted quizzes based on weak areas
  - Progressive difficulty adjustment
  - Focus on frequently missed topics
  - Remedial questions for incorrect answers
  - Concept reinforcement through varied questions
  - Smart question selection algorithm
  - Spaced repetition for better retention

- **Performance Analytics Dashboard**
  - Individual skill radar charts
  - Progress over time graphs
  - Topic mastery levels (Beginner/Intermediate/Expert)
  - Predicted improvement areas
  - Learning path recommendations
  - Comparative analysis with peer group
  - Time to mastery estimates

- **Quiz Sharing & Assignment**
  - Generate unique shareable links for each quiz
  - Direct link sharing to specific users
  - Auto-assign remedial quizzes based on performance
  - QR code generation for easy access
  - Time-limited access links
  - Track who accessed via shared links
  - Bulk assignment to user groups

### 6. Advanced Features
- **Categories**
  - Multiple quiz categories (Science, History, Sports, etc.)
  - Category selection screen
  - Category-specific question banks

- **Difficulty Levels**
  - Easy, Medium, Hard questions
  - Adaptive difficulty based on performance
  - Different point values for different difficulties

- **Progress Tracking**
  - Save quiz progress
  - Resume incomplete quizzes
  - Track quiz history
  - Performance statistics

### 7. User Experience
- **Visual Feedback**
  - Highlight selected answer
  - Show correct/incorrect immediately
  - Smooth transitions between questions
  - Loading animations

- **Sound Effects** (Optional)
  - Correct answer sound
  - Incorrect answer sound
  - Timer warning sound
  - Completion celebration

- **Responsive Design**
  - Mobile-friendly interface
  - Touch-friendly buttons
  - Landscape/portrait support

## Technical Architecture

### File Structure
```
quiz-app/
├── index.html              # Landing page
├── auth.html               # Sign in/Sign up page
├── admin-dashboard.html    # Admin main page
├── user-dashboard.html     # User main page
├── quiz.html               # Quiz taking interface
├── css/
│   ├── styles.css          # Main stylesheet
│   ├── auth.css            # Authentication styles
│   ├── admin.css           # Admin interface styles
│   └── user.css            # User interface styles
├── js/
│   ├── app.js              # Main application logic
│   ├── auth.js             # Authentication logic
│   ├── admin.js            # Admin functionality
│   ├── user.js             # User functionality
│   ├── quiz.js             # Quiz engine
│   ├── session-manager.js  # Session management
│   ├── timer.js            # Timer functionality
│   ├── analytics.js        # Analytics and reporting
│   ├── gemini-integration.js # Gemini Pro API integration
│   └── share.js            # Link sharing functionality
├── api/
│   ├── gemini-api.js       # Gemini Pro API wrapper
│   └── db.js               # Firebase operations
├── data/
│   ├── questions.json      # Question data
│   └── users.json          # User data (for demo)
├── assets/
│   ├── images/             # Images if needed
│   └── sounds/             # Sound effects
└── README.md               # Documentation
```

### Data Structure in Firestore
```javascript
firebase-db/
├── users/
│   ├── userId1 { 
│   │   email, name, role, createdAt,
│   │   metadata: { lastActive, totalQuizzes, avgScore }
│   │   tags: ["group1", "physics-weak", "needs-attention"]
│   │ }
│   └── userId2 { ... }
├── quizzes/
│   ├── quizId1 { 
│   │   title, questions[], createdBy, sharedWith[], 
│   │   analytics, timerSettings, categoryTags
│   │ }
│   └── quizId2 { ... }
├── assignments/
│   ├── assignmentId1 {
│   │   quizId, title, assignedBy: adminId,
│   │   assignedTo: ["userId1", "userId2"] // or ["all"] or ["groupId1"]
│   │   assignedAt: "ISO-date",
│   │   dueDate: "ISO-date",
│   │   allowedAttempts: 2,
│   │   instructions: "Complete by Friday",
│   │   status: "active", // or "expired", "completed"
│   │   settings: {
│   │     showScoreOnSubmit: true,
│   │     allowLateSubmission: true,
│   │     latePenalty: 10, // percentage
│   │     sendReminders: true,
│   │     reminderDays: [1, 3] // days before due date
│   │   },
│   │   submissions: [
│   │     {
│   │       userId: "userId1",
│   │       status: "completed", // "not-started", "in-progress", "overdue"
│   │       attemptIds: ["attemptId1", "attemptId2"],
│   │       bestScore: 85,
│   │       lastScore: 82,
│   │       submittedAt: "ISO-date",
│   │       isLate: false,
│   │       timeSpent: 1800 // seconds
│   │     }
│   │   ],
│   │   statistics: {
│   │     totalAssigned: 25,
│   │     completed: 20,
│   │     inProgress: 3,
│   │     notStarted: 2,
│   │     overdue: 1,
│   │     averageScore: 78.5,
│   │     averageTimeSpent: 1650
│   │   }
│   │ }
│   └── assignmentId2 { ... }
├── sessions/
│   ├── sessionId1 {
│   │   userId, quizId, status: "in-progress",
│   │   startTime, lastActiveTime, 
│   │   currentQuestionIndex: 5,
│   │   answers: [{q1}, {q2}, ...],
│   │   timeElapsed: { total: 1200, perQuestion: [45, 60, ...] },
│   │   pauseUsed: false, pauseStartTime: null,
│   │   expiresAt: "ISO-date"
│   │ }
│   └── sessionId2 { ... }
├── attempts/
│   ├── attemptId1 { 
│   │   userId, quizId, sessionId, answers[], score, timestamp,
│   │   timePerQuestion: [], incorrectQuestions: [],
│   │   completionStatus: "completed", // or "abandoned"
│   │   attemptNumber: 1, // 1st attempt, 2nd attempt, etc.
│   │   isReassignment: false,
│   │   reassignedBy: null, // adminId if reassigned
│   │   reassignmentReason: null, // "practice", "technical-issue", "improvement"
│   │   previousAttemptId: null // Link to previous attempt if reassigned
│   │ }
│   └── attemptId2 { ... }
├── reassignments/
│   ├── reassignId1 {
│   │   userId, quizId, adminId,
│   │   originalAttemptId, // Link to first attempt
│   │   reassignedAt: "ISO-date",
│   │   reason: "Student requested retry for grade improvement",
│   │   options: {
│   │     shuffleQuestions: true,
│   │     clearPreviousAnswers: false,
│   │     deadline: "ISO-date",
│   │     maxAttempts: 3,
│   │     showPreviousScore: true
│   │   },
│   │   adminNotes: "Focus on Physics section",
│   │   attempts: ["attemptId2", "attemptId3"] // All reassignment attempts
│   │ }
│   └── reassignId2 { ... }
├── performance/
│   ├── userId1 { 
│   │   weakAreas: [
│   │     {topic: "Physics", subtopic: "Mechanics", errorRate: 0.6}
│   │   ],
│   │   skillProfile: {category: {proficiency, trend}},
│   │   learningPath: {current, next, estimated},
│   │   historicalData: [{date, score, topics}]
│   │ }
│   └── userId2 { ... }
├── analytics/
│   ├── daily/ { date, activeUsers, quizzesTaken, avgScore }
│   ├── weekly/ { ... }
│   └── monthly/ { ... }
└── sharedLinks/
    ├── linkId1 { quizId, accessCode, expiryDate, assignedTo[] }
    └── linkId2 { ... }
```

### Key Data Models

#### Question Object Structure
```javascript
{
  id: 1,
  category: "Science",
  subcategory: "Chemistry",
  difficulty: "medium",
  questionType: "multiple-choice", // or "short-answer", "essay", "comprehension"
  question: "What is the chemical symbol for gold?",
  
  // Time Configuration
  timeLimit: 60, // seconds - admin configured
  defaultTime: 45, // system default for this type
  minTime: 30, // minimum allowed
  maxTime: 300, // maximum allowed
  timeMultiplier: 1.0, // difficulty multiplier
  bonusTimeThreshold: 20, // answer within 20 seconds for bonus points
  
  // For multiple choice
  options: ["Au", "Ag", "Fe", "Cu"],
  correctAnswer: 0,
  
  // For short answer/type-in
  acceptableAnswers: ["Au", "AU", "au"],
  keywords: ["gold", "Au", "aurum"],
  
  // For essay/comprehension
  rubric: {
    mainIdea: { points: 5, criteria: "Identifies main concept" },
    supportingDetails: { points: 3, criteria: "Provides examples" },
    clarity: { points: 2, criteria: "Clear expression" }
  },
  
  // For reading comprehension
  passage: "Long text passage here...",
  subQuestions: [
    { type: "main-idea", question: "What is the main idea?" },
    { type: "inference", question: "What can you infer about...?" }
  ],
  
  // Visual and Hint Support
  visualDescription: {
    type: "svg", // or "image"
    content: "<svg>...</svg>", // SVG code or image URL
    position: "above-question", // or "below-question", "side"
    alt: "Periodic table highlighting gold element"
  },
  
  hint: {
    text: "Think about precious metals used in jewelry",
    showAfter: 30, // Show hint after 30 seconds (optional)
    deductPoints: 5, // Points deducted if hint is used (optional)
    visual: {
      type: "svg",
      content: "<svg>...</svg>", // Optional visual hint
      alt: "Visual hint showing Au symbol"
    }
  },
  
  // Enhanced Explanation with Visuals
  explanation: {
    text: "Au comes from the Latin word 'aurum' meaning gold",
    visual: {
      type: "svg",
      content: "<svg>...</svg>", // Visual explanation
      alt: "Diagram showing gold's position in periodic table"
    },
    detailedNote: "Gold is a chemical element with atomic number 79...",
    showInReview: true, // Show when reviewing answers
    relatedConcepts: ["periodic table", "chemical elements", "metals"]
  },
  
  concepts: ["periodic table", "chemical elements", "metals"],
  relatedTopics: ["chemistry", "elements", "periodic-table"]
}
```

#### AI Evaluation Response Structure
```javascript
{
  questionId: 1,
  questionType: "essay",
  userAnswer: "User's typed response here...",
  
  // Gemini Pro returns:
  aiEvaluation: {
    score: 85,
    maxScore: 100,
    feedback: "Great understanding of the main concept...",
    missingPoints: ["Could have mentioned...", "Consider adding..."],
    strengths: ["Excellent explanation of...", "Good use of examples"],
    suggestions: ["Next time, try to...", "Consider exploring..."],
    correctAnswer: "Sample ideal answer for reference..."
  }
}
```

#### User Performance Tracking
```javascript
{
  userId: "user123",
  quizHistory: [
    {
      quizId: "quiz456",
      date: "2024-01-15",
      score: 75,
      timeSpent: 1200, // seconds
      questions: [
        {
          questionId: 1,
          answered: 0,
          correct: true,
          timeSpent: 45,
          confidence: "high"
        }
      ]
    }
  ],
  skillProfile: {
    "Science": {
      "Chemistry": { proficiency: 0.65, questionsAttempted: 50, correctRate: 0.65 },
      "Physics": { proficiency: 0.45, questionsAttempted: 40, correctRate: 0.45 },
      "Biology": { proficiency: 0.80, questionsAttempted: 60, correctRate: 0.80 }
    }
  },
  weakAreas: [
    { topic: "Physics - Mechanics", errorRate: 0.60, recommendedFocus: "high" },
    { topic: "Chemistry - Organic", errorRate: 0.45, recommendedFocus: "medium" }
  ],
  learningPath: {
    currentLevel: "intermediate",
    nextTopics: ["Physics - Mechanics", "Chemistry - Organic Compounds"],
    estimatedImprovementTime: "2 weeks"
  }
}
```

#### Assignment Tracking Implementation
```javascript
class AssignmentManager {
  constructor() {
    this.db = firebase.firestore();
  }

  // Create new assignment
  async createAssignment(quizId, assignedTo, dueDate, settings) {
    const assignment = {
      quizId,
      title: await this.getQuizTitle(quizId),
      assignedBy: getCurrentAdminId(),
      assignedTo, // array of userIds or ["all"] or groupIds
      assignedAt: Date.now(),
      dueDate: new Date(dueDate).getTime(),
      allowedAttempts: settings.attempts || 1,
      instructions: settings.instructions || "",
      status: "active",
      settings: {
        showScoreOnSubmit: settings.showScore !== false,
        allowLateSubmission: settings.allowLate || false,
        latePenalty: settings.latePenalty || 0,
        sendReminders: settings.reminders || true,
        reminderDays: settings.reminderDays || [1, 3]
      },
      submissions: [],
      statistics: {
        totalAssigned: assignedTo.length,
        completed: 0,
        inProgress: 0,
        notStarted: assignedTo.length,
        overdue: 0,
        averageScore: 0,
        averageTimeSpent: 0
      }
    };
    
    const docRef = await this.db.collection('assignments').add(assignment);
    await this.notifyAssignedUsers(assignedTo, quizId, dueDate);
    return docRef.id;
  }

  // Get assignment dashboard data
  async getAssignmentDashboard(adminId) {
    const assignments = await this.db.collection('assignments')
      .where('assignedBy', '==', adminId)
      .orderBy('dueDate', 'desc')
      .get();
    
    const now = Date.now();
    const dashboard = {
      total: 0,
      pending: 0,
      overdue: 0,
      todayDue: 0,
      weekDue: 0,
      assignments: []
    };
    
    assignments.forEach(doc => {
      const assignment = doc.data();
      const dueTime = assignment.dueDate;
      
      dashboard.total++;
      
      // Calculate overdue
      if (dueTime < now && assignment.statistics.notStarted + assignment.statistics.inProgress > 0) {
        dashboard.overdue++;
        assignment.isOverdue = true;
      }
      
      // Today's due
      if (this.isToday(dueTime)) {
        dashboard.todayDue++;
      }
      
      // This week's due
      if (this.isThisWeek(dueTime)) {
        dashboard.weekDue++;
      }
      
      // Pending submissions
      dashboard.pending += assignment.statistics.notStarted + assignment.statistics.inProgress;
      
      dashboard.assignments.push({
        id: doc.id,
        ...assignment,
        completionRate: (assignment.statistics.completed / assignment.statistics.totalAssigned * 100).toFixed(1)
      });
    });
    
    return dashboard;
  }

  // Update submission status
  async updateSubmissionStatus(assignmentId, userId, status, attemptId = null, score = null) {
    const assignmentRef = this.db.collection('assignments').doc(assignmentId);
    const assignment = await assignmentRef.get();
    const data = assignment.data();
    
    // Find or create submission entry
    let submission = data.submissions.find(s => s.userId === userId);
    if (!submission) {
      submission = {
        userId,
        status: "not-started",
        attemptIds: [],
        bestScore: 0,
        lastScore: 0,
        timeSpent: 0
      };
      data.submissions.push(submission);
    }
    
    // Update submission
    submission.status = status;
    if (attemptId) submission.attemptIds.push(attemptId);
    if (score !== null) {
      submission.lastScore = score;
      if (score > submission.bestScore) submission.bestScore = score;
    }
    
    // Check if late
    if (status === "completed" && Date.now() > data.dueDate) {
      submission.isLate = true;
      submission.submittedAt = Date.now();
    }
    
    // Update statistics
    this.updateStatistics(data);
    
    await assignmentRef.update(data);
  }

  // Send reminder notifications
  async sendReminders() {
    const assignments = await this.db.collection('assignments')
      .where('status', '==', 'active')
      .where('settings.sendReminders', '==', true)
      .get();
    
    const now = Date.now();
    
    assignments.forEach(async doc => {
      const assignment = doc.data();
      const daysUntilDue = Math.floor((assignment.dueDate - now) / (1000 * 60 * 60 * 24));
      
      if (assignment.settings.reminderDays.includes(daysUntilDue)) {
        const pendingUsers = assignment.submissions
          .filter(s => s.status !== "completed")
          .map(s => s.userId);
        
        if (pendingUsers.length > 0) {
          await this.sendReminderNotification(pendingUsers, assignment.title, daysUntilDue);
        }
      }
    });
  }

  // Admin view component
  renderAssignmentTable(assignments) {
    return `
      <table class="assignment-table">
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Assigned To</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Completion</th>
            <th>Avg Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${assignments.map(a => `
            <tr class="${a.isOverdue ? 'overdue' : ''}">
              <td>${a.title}</td>
              <td>${a.assignedTo.length} users</td>
              <td class="${a.isOverdue ? 'text-danger' : ''}">
                ${new Date(a.dueDate).toLocaleDateString()}
                ${a.isOverdue ? '<span class="badge">OVERDUE</span>' : ''}
              </td>
              <td>
                <div class="status-badges">
                  <span class="completed">${a.statistics.completed}</span>
                  <span class="in-progress">${a.statistics.inProgress}</span>
                  <span class="not-started">${a.statistics.notStarted}</span>
                </div>
              </td>
              <td>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: ${a.completionRate}%"></div>
                </div>
                ${a.completionRate}%
              </td>
              <td>${a.statistics.averageScore.toFixed(1)}%</td>
              <td>
                <button onclick="viewDetails('${a.id}')">View</button>
                <button onclick="sendReminder('${a.id}')">Remind</button>
                <button onclick="extendDeadline('${a.id}')">Extend</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}
```

#### Visual Question Display Implementation
```javascript
class QuestionRenderer {
  constructor() {
    this.currentQuestion = null;
    this.hintUsed = false;
    this.isReviewMode = false;
  }

  // Render question with visual description
  renderQuestion(question, questionIndex, isReview = false) {
    this.currentQuestion = question;
    this.isReviewMode = isReview;
    
    let html = `
      <div class="question-container">
        <div class="question-header">
          <h3>Question ${questionIndex + 1}</h3>
          ${this.renderHintButton(question)}
        </div>
    `;
    
    // Add visual description if exists
    if (question.visualDescription) {
      html += this.renderVisual(question.visualDescription, 'question-visual');
    }
    
    // Add question text
    html += `
      <div class="question-text">
        ${question.question}
      </div>
    `;
    
    // Add hint display area
    html += `
      <div id="hint-container" class="hint-container" style="display: none;">
        ${this.renderHint(question.hint)}
      </div>
    `;
    
    // Add answer options or input field
    html += this.renderAnswerArea(question);
    
    // Add explanation area (shown in review mode or after answering)
    if (isReview || question.answered) {
      html += this.renderExplanation(question);
    }
    
    html += `</div>`;
    
    return html;
  }

  // Render visual content (SVG or image)
  renderVisual(visual, className = '') {
    if (!visual) return '';
    
    if (visual.type === 'svg') {
      return `
        <div class="${className} visual-container">
          ${visual.content}
          ${visual.alt ? `<p class="visual-caption">${visual.alt}</p>` : ''}
        </div>
      `;
    } else if (visual.type === 'image') {
      return `
        <div class="${className} visual-container">
          <img src="${visual.content}" alt="${visual.alt || ''}" />
          ${visual.alt ? `<p class="visual-caption">${visual.alt}</p>` : ''}
        </div>
      `;
    }
    
    return '';
  }

  // Render hint button
  renderHintButton(question) {
    if (!question.hint) return '';
    
    const pointsText = question.hint.deductPoints ? 
      ` (-${question.hint.deductPoints} points)` : '';
    
    return `
      <button id="hint-btn" class="hint-button" onclick="questionRenderer.showHint()">
        💡 Show Hint${pointsText}
      </button>
    `;
  }

  // Render hint content
  renderHint(hint) {
    if (!hint) return '';
    
    let hintHtml = `
      <div class="hint-content">
        <span class="hint-icon">💡</span>
        <div class="hint-text">${hint.text}</div>
    `;
    
    if (hint.visual) {
      hintHtml += this.renderVisual(hint.visual, 'hint-visual');
    }
    
    hintHtml += `</div>`;
    
    return hintHtml;
  }

  // Show hint (with auto-show timer support)
  showHint() {
    const hintContainer = document.getElementById('hint-container');
    const hintBtn = document.getElementById('hint-btn');
    
    if (hintContainer && !this.hintUsed) {
      hintContainer.style.display = 'block';
      this.hintUsed = true;
      
      if (hintBtn) {
        hintBtn.disabled = true;
        hintBtn.textContent = 'Hint Used';
      }
      
      // Track hint usage for scoring
      if (this.currentQuestion.hint.deductPoints) {
        this.applyHintPenalty(this.currentQuestion.hint.deductPoints);
      }
    }
  }

  // Auto-show hint after specified time
  startHintTimer(question) {
    if (question.hint && question.hint.showAfter) {
      this.hintTimer = setTimeout(() => {
        if (!this.hintUsed && !question.answered) {
          this.showHint();
        }
      }, question.hint.showAfter * 1000);
    }
  }

  // Render explanation with visuals
  renderExplanation(question) {
    if (!question.explanation || !question.explanation.showInReview) {
      return '';
    }
    
    const exp = question.explanation;
    const userAnswer = question.userAnswer;
    const isCorrect = this.checkAnswer(question, userAnswer);
    
    let expHtml = `
      <div class="explanation-container ${isCorrect ? 'correct' : 'incorrect'}">
        <div class="explanation-header">
          ${isCorrect ? '✅ Correct!' : '❌ Incorrect'}
        </div>
        
        <div class="explanation-content">
          <div class="explanation-text">
            ${exp.text}
          </div>
    `;
    
    // Add visual explanation if exists
    if (exp.visual) {
      expHtml += this.renderVisual(exp.visual, 'explanation-visual');
    }
    
    // Add detailed note if exists
    if (exp.detailedNote) {
      expHtml += `
        <div class="detailed-note">
          <h4>Detailed Explanation:</h4>
          <p>${exp.detailedNote}</p>
        </div>
      `;
    }
    
    // Add related concepts
    if (exp.relatedConcepts && exp.relatedConcepts.length > 0) {
      expHtml += `
        <div class="related-concepts">
          <h4>Related Concepts:</h4>
          <ul>
            ${exp.relatedConcepts.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    // Show correct answer if user was wrong
    if (!isCorrect) {
      expHtml += `
        <div class="correct-answer">
          <strong>Correct Answer:</strong> ${this.getCorrectAnswerText(question)}
        </div>
      `;
    }
    
    expHtml += `
        </div>
      </div>
    `;
    
    return expHtml;
  }

  // Navigation with review capability
  navigateToPrevious(currentIndex, questions, answers) {
    if (currentIndex > 0) {
      const prevQuestion = questions[currentIndex - 1];
      prevQuestion.userAnswer = answers[currentIndex - 1];
      prevQuestion.answered = true;
      
      // Render in review mode to show explanation
      const questionHtml = this.renderQuestion(prevQuestion, currentIndex - 1, true);
      document.getElementById('quiz-content').innerHTML = questionHtml;
      
      // Add navigation buttons
      this.addNavigationButtons(currentIndex - 1, questions.length);
    }
  }

  // Add navigation buttons with review support
  addNavigationButtons(currentIndex, totalQuestions) {
    const navHtml = `
      <div class="navigation-buttons">
        ${currentIndex > 0 ? 
          `<button onclick="questionRenderer.navigateToPrevious(${currentIndex}, questions, answers)">
            ← Previous (Review)
          </button>` : ''
        }
        
        ${currentIndex < totalQuestions - 1 ? 
          `<button onclick="questionRenderer.navigateToNext(${currentIndex}, questions, answers)">
            Next →
          </button>` : ''
        }
        
        ${currentIndex === totalQuestions - 1 ? 
          `<button onclick="submitQuiz()" class="submit-btn">
            Submit Quiz
          </button>` : ''
        }
        
        <button onclick="toggleReviewMode()" class="review-toggle">
          ${this.isReviewMode ? 'Hide' : 'Show'} Explanations
        </button>
      </div>
    `;
    
    document.getElementById('quiz-content').insertAdjacentHTML('beforeend', navHtml);
  }
}

// CSS for visual elements
const visualStyles = `
<style>
.visual-container {
  margin: 20px 0;
  text-align: center;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.visual-container svg {
  max-width: 100%;
  height: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  background: #f9f9f9;
}

.visual-caption {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
  font-style: italic;
}

.hint-container {
  background: #fff3cd;
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
}

.hint-content {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.hint-icon {
  font-size: 24px;
}

.hint-visual {
  margin-top: 15px;
}

.explanation-container {
  margin-top: 30px;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid;
}

.explanation-container.correct {
  background: #d4edda;
  border-color: #28a745;
}

.explanation-container.incorrect {
  background: #f8d7da;
  border-color: #dc3545;
}

.explanation-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.explanation-visual {
  margin: 20px 0;
  padding: 15px;
  background: white;
  border-radius: 8px;
}

.detailed-note {
  margin-top: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.related-concepts {
  margin-top: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 8px;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
}

.review-toggle {
  background: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.hint-button {
  background: #ffc107;
  color: #333;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.hint-button:disabled {
  background: #e0e0e0;
  cursor: not-allowed;
}
</style>
`;
```

#### Admin Question Editor with Visual Support
```javascript
class QuestionEditor {
  constructor() {
    this.currentQuestion = {};
    this.visualFiles = {};
  }

  // Render question editor form
  renderEditor(question = null) {
    this.currentQuestion = question || this.getEmptyQuestion();
    
    return `
      <div class="question-editor">
        <h3>${question ? 'Edit Question' : 'Create New Question'}</h3>
        
        <!-- Basic Question Info -->
        <div class="form-group">
          <label>Question Text *</label>
          <textarea id="question-text" required>${this.currentQuestion.question || ''}</textarea>
        </div>
        
        <!-- Visual Description Section -->
        <div class="visual-section">
          <h4>Visual Description (Optional)</h4>
          <div class="visual-options">
            <label>
              <input type="radio" name="visual-type" value="none" checked> No Visual
            </label>
            <label>
              <input type="radio" name="visual-type" value="svg"> SVG Code
            </label>
            <label>
              <input type="radio" name="visual-type" value="upload"> Upload Image
            </label>
          </div>
          
          <div id="visual-input" style="display: none;">
            <!-- SVG Input -->
            <div id="svg-input" style="display: none;">
              <label>SVG Code:</label>
              <textarea id="svg-content" placeholder="Paste SVG code here..."></textarea>
              <button onclick="previewSVG()">Preview</button>
            </div>
            
            <!-- Image Upload -->
            <div id="image-upload" style="display: none;">
              <label>Upload Image:</label>
              <input type="file" id="image-file" accept="image/*,.svg" onchange="handleImageUpload(event)">
              <div id="image-preview"></div>
            </div>
            
            <div class="form-group">
              <label>Visual Caption/Alt Text:</label>
              <input type="text" id="visual-alt" placeholder="Describe the visual...">
            </div>
            
            <div class="form-group">
              <label>Position:</label>
              <select id="visual-position">
                <option value="above-question">Above Question</option>
                <option value="below-question">Below Question</option>
                <option value="side">Side by Side</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Hint Section -->
        <div class="hint-section">
          <h4>Hint Configuration (Optional)</h4>
          <div class="form-group">
            <label>
              <input type="checkbox" id="enable-hint" onchange="toggleHintSection()">
              Enable Hint
            </label>
          </div>
          
          <div id="hint-config" style="display: none;">
            <div class="form-group">
              <label>Hint Text:</label>
              <textarea id="hint-text" placeholder="Enter hint text..."></textarea>
            </div>
            
            <div class="form-group">
              <label>Show Hint After (seconds):</label>
              <input type="number" id="hint-timer" min="0" placeholder="0 = manual only">
            </div>
            
            <div class="form-group">
              <label>Point Deduction for Using Hint:</label>
              <input type="number" id="hint-penalty" min="0" max="50" placeholder="0">
            </div>
            
            <div class="form-group">
              <label>
                <input type="checkbox" id="hint-has-visual" onchange="toggleHintVisual()">
                Add Visual to Hint
              </label>
            </div>
            
            <div id="hint-visual-input" style="display: none;">
              <textarea id="hint-visual-content" placeholder="SVG code or image URL for hint..."></textarea>
            </div>
          </div>
        </div>
        
        <!-- Enhanced Explanation Section -->
        <div class="explanation-section">
          <h4>Explanation Configuration *</h4>
          <div class="form-group">
            <label>Explanation Text:</label>
            <textarea id="explanation-text" required placeholder="Basic explanation...">${this.currentQuestion.explanation?.text || ''}</textarea>
          </div>
          
          <div class="form-group">
            <label>Detailed Note (Optional):</label>
            <textarea id="explanation-detail" placeholder="Additional detailed explanation..."></textarea>
          </div>
          
          <div class="form-group">
            <label>
              <input type="checkbox" id="explanation-has-visual" onchange="toggleExplanationVisual()">
              Add Visual Explanation
            </label>
          </div>
          
          <div id="explanation-visual-input" style="display: none;">
            <textarea id="explanation-visual-content" placeholder="SVG code or image URL for explanation..."></textarea>
            <input type="text" id="explanation-visual-alt" placeholder="Visual description...">
          </div>
          
          <div class="form-group">
            <label>Related Concepts (comma-separated):</label>
            <input type="text" id="related-concepts" placeholder="concept1, concept2, concept3">
          </div>
          
          <div class="form-group">
            <label>
              <input type="checkbox" id="show-in-review" checked>
              Show explanation during review
            </label>
          </div>
        </div>
        
        <!-- Preview Section -->
        <div class="preview-section">
          <h4>Question Preview</h4>
          <button onclick="previewQuestion()">Preview Question</button>
          <div id="question-preview"></div>
        </div>
        
        <!-- Save Buttons -->
        <div class="form-actions">
          <button onclick="saveQuestion()" class="btn-primary">Save Question</button>
          <button onclick="saveAndAddAnother()" class="btn-secondary">Save & Add Another</button>
          <button onclick="cancelEdit()" class="btn-cancel">Cancel</button>
        </div>
      </div>
    `;
  }

  // Handle image upload
  async handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // For SVG files, read as text
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.visualFiles.svg = e.target.result;
        this.previewSVG(e.target.result);
      };
      reader.readAsText(file);
    } else {
      // For other images, upload to storage
      const imageUrl = await this.uploadToStorage(file);
      this.visualFiles.image = imageUrl;
      this.previewImage(imageUrl);
    }
  }

  // Upload image to Firebase Storage
  async uploadToStorage(file) {
    const storage = firebase.storage();
    const timestamp = Date.now();
    const fileName = `questions/${timestamp}_${file.name}`;
    const storageRef = storage.ref(fileName);
    
    const snapshot = await storageRef.put(file);
    const downloadUrl = await snapshot.ref.getDownloadURL();
    
    return downloadUrl;
  }

  // Save question with all visual data
  async saveQuestion() {
    const question = this.buildQuestionObject();
    
    // Validate question
    if (!this.validateQuestion(question)) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      if (this.currentQuestion.id) {
        // Update existing question
        await db.collection('questions').doc(this.currentQuestion.id).update(question);
      } else {
        // Add new question
        await db.collection('questions').add(question);
      }
      
      alert('Question saved successfully!');
      this.resetEditor();
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Failed to save question');
    }
  }

  // Build question object from form
  buildQuestionObject() {
    const question = {
      ...this.currentQuestion,
      question: document.getElementById('question-text').value,
      updatedAt: Date.now()
    };
    
    // Add visual description if enabled
    const visualType = document.querySelector('input[name="visual-type"]:checked').value;
    if (visualType !== 'none') {
      question.visualDescription = {
        type: visualType === 'svg' ? 'svg' : 'image',
        content: visualType === 'svg' ? 
          document.getElementById('svg-content').value :
          this.visualFiles.image,
        alt: document.getElementById('visual-alt').value,
        position: document.getElementById('visual-position').value
      };
    }
    
    // Add hint if enabled
    if (document.getElementById('enable-hint').checked) {
      question.hint = {
        text: document.getElementById('hint-text').value,
        showAfter: parseInt(document.getElementById('hint-timer').value) || 0,
        deductPoints: parseInt(document.getElementById('hint-penalty').value) || 0
      };
      
      if (document.getElementById('hint-has-visual').checked) {
        question.hint.visual = {
          type: 'svg',
          content: document.getElementById('hint-visual-content').value
        };
      }
    }
    
    // Add enhanced explanation
    question.explanation = {
      text: document.getElementById('explanation-text').value,
      detailedNote: document.getElementById('explanation-detail').value,
      showInReview: document.getElementById('show-in-review').checked,
      relatedConcepts: document.getElementById('related-concepts').value
        .split(',').map(c => c.trim()).filter(c => c)
    };
    
    if (document.getElementById('explanation-has-visual').checked) {
      question.explanation.visual = {
        type: 'svg',
        content: document.getElementById('explanation-visual-content').value,
        alt: document.getElementById('explanation-visual-alt').value
      };
    }
    
    return question;
  }

  // Preview question with visuals
  previewQuestion() {
    const question = this.buildQuestionObject();
    const renderer = new QuestionRenderer();
    const previewHtml = renderer.renderQuestion(question, 0, false);
    
    document.getElementById('question-preview').innerHTML = previewHtml;
  }
}
```

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid/Flexbox for layout
- **Database**: Firebase Firestore (real-time, shared data)
- **Authentication**: Firebase Auth (email/password + Google)
- **Hosting**: GitHub Pages or Netlify (static hosting)
- **AI Integration**: Gemini Pro API for quiz generation and evaluation
- **Charts**: Chart.js for visualizations
- **Link Sharing**: UUID-based unique links
- **Build Tools**: Optional - Webpack/Parcel for bundling
- **Testing**: Optional - Jest for unit tests

## API Endpoint Documentation

### Firebase Client SDK Operations

#### Authentication Endpoints
```javascript
// Sign Up
firebase.auth().createUserWithEmailAndPassword(email, password)
  // Returns: User object with uid, email, etc.
  // Error codes: auth/email-already-in-use, auth/weak-password

// Sign In
firebase.auth().signInWithEmailAndPassword(email, password)
  // Returns: User credential object
  // Error codes: auth/user-not-found, auth/wrong-password

// Sign Out
firebase.auth().signOut()
  // Returns: Promise<void>

// Password Reset
firebase.auth().sendPasswordResetEmail(email)
  // Returns: Promise<void>
  // Error codes: auth/user-not-found

// Google Sign In
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider)
  // Returns: User credential with Google profile
```

#### Firestore Database Operations
```javascript
// Users Collection
db.collection('users').doc(userId).set({
  email, name, role, createdAt, metadata, tags
})

db.collection('users').where('role', '==', 'student').get()
  // Returns: QuerySnapshot with user documents

// Quizzes Collection
db.collection('quizzes').add({
  title, questions, createdBy, timerSettings, categoryTags
})

db.collection('quizzes').doc(quizId).update({
  questions: firebase.firestore.FieldValue.arrayUnion(newQuestion)
})

// Sessions Collection
db.collection('sessions').doc(sessionId).set({
  userId, quizId, status, startTime, answers, timeElapsed
})

// Real-time listeners
db.collection('sessions').doc(sessionId)
  .onSnapshot((doc) => {
    // Handle real-time updates
  })

// Assignments Collection
db.collection('assignments').where('dueDate', '<', Date.now())
  .where('status', '==', 'active').get()
  // Returns: Overdue assignments

// Performance Analytics
db.collection('performance').doc(userId).get()
  // Returns: User performance metrics
```

#### Gemini Pro API Integration
```javascript
// Quiz Generation
POST https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent
{
  "contents": [{
    "parts": [{
      "text": "Generate 10 quiz questions about [topic]..."
    }]
  }]
}
// Returns: Generated questions in JSON format

// Answer Evaluation
POST https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent
{
  "contents": [{
    "parts": [{
      "text": "Evaluate this answer: [userAnswer] for question: [question]"
    }]
  }]
}
// Returns: Score, feedback, and suggestions
```

#### Firebase Storage (for images/media)
```javascript
// Upload Image
const storageRef = firebase.storage().ref();
const fileRef = storageRef.child(`questions/${fileName}`);
fileRef.put(file)
  // Returns: UploadTaskSnapshot with downloadURL

// Get Download URL
fileRef.getDownloadURL()
  // Returns: Promise<string> with public URL

// Delete File
fileRef.delete()
  // Returns: Promise<void>
```

## Firebase Security Rules

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isSignedIn() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isOwner(userId) {
      return isSignedIn() && request.auth.uid == userId;
    }
    
    function isAssignedTo(assignment) {
      return isSignedIn() && (
        assignment.data.assignedTo.hasAny([request.auth.uid]) ||
        assignment.data.assignedTo.hasAny(['all'])
      );
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow create: if isSignedIn() && isOwner(userId);
      allow update: if isOwner(userId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Quizzes collection
    match /quizzes/{quizId} {
      allow read: if isSignedIn();
      allow create: if isAdmin();
      allow update, delete: if isAdmin();
    }
    
    // Sessions collection
    match /sessions/{sessionId} {
      allow read: if isSignedIn() && 
        (isOwner(resource.data.userId) || isAdmin());
      allow create: if isSignedIn() && 
        isOwner(request.resource.data.userId);
      allow update: if isSignedIn() && 
        isOwner(resource.data.userId) &&
        resource.data.status != 'completed';
      allow delete: if isAdmin();
    }
    
    // Attempts collection
    match /attempts/{attemptId} {
      allow read: if isSignedIn() && 
        (isOwner(resource.data.userId) || isAdmin());
      allow create: if isSignedIn() && 
        isOwner(request.resource.data.userId);
      allow update: if false; // Attempts are immutable
      allow delete: if isAdmin();
    }
    
    // Assignments collection
    match /assignments/{assignmentId} {
      allow read: if isSignedIn() && 
        (isAssignedTo(resource) || isAdmin());
      allow create, update, delete: if isAdmin();
    }
    
    // Performance collection
    match /performance/{userId} {
      allow read: if isSignedIn() && 
        (isOwner(userId) || isAdmin());
      allow write: if isSignedIn() && 
        (isOwner(userId) || isAdmin());
    }
    
    // Reassignments collection
    match /reassignments/{reassignmentId} {
      allow read: if isSignedIn() && 
        (isOwner(resource.data.userId) || isAdmin());
      allow create, update, delete: if isAdmin();
    }
    
    // Questions collection (if separate)
    match /questions/{questionId} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
    }
  }
}
```

```javascript
// Firebase Storage Security Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return request.auth.token.role == 'admin';
    }
    
    // Questions media folder
    match /questions/{fileName} {
      allow read: if isSignedIn();
      allow write: if isAdmin();
      allow delete: if isAdmin();
    }
    
    // User uploads folder
    match /users/{userId}/{fileName} {
      allow read: if isSignedIn();
      allow write: if request.auth.uid == userId;
      allow delete: if request.auth.uid == userId || isAdmin();
    }
    
    // Public assets
    match /public/{fileName} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

## Firebase Configuration

### Firebase Free Tier Limits (More than enough for 100-500 users):
- **Authentication**: Unlimited users
- **Database**: 1GB storage
- **Reads**: 50,000 per day
- **Writes**: 20,000 per day
- **Bandwidth**: 10GB per month

### Setup Steps:
1. Go to console.firebase.google.com
2. Create new project (free)
3. Enable Authentication (Email + Google)
4. Enable Firestore Database
5. Set Security Rules (copy from above)
6. Enable Storage (for media files)
7. Copy config keys to your app
8. Deploy to GitHub Pages

## User Flow Diagrams

### 1. Authentication Flow
```
┌─────────────┐
│  Landing    │
│    Page     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Sign In   │◄──────┐
│   /Sign Up  │       │
└──────┬──────┘       │
       │              │
    ┌──▼──┐           │
    │Auth?│───No──────┤
    └──┬──┘           │
      Yes             │
       │              │
       ▼              │
┌─────────────┐       │
│ Check Role  │       │
└──┬──────┬───┘       │
   │      │           │
Admin   Student       │
   │      │           │
   ▼      ▼           │
┌─────┐ ┌────────┐    │
│Admin│ │Student │    │
│Dash │ │Dashboard│   │
└─────┘ └────────┘    │
   │         │        │
   └─────────┴────────┘
       (Sign Out)
```

### 2. Quiz Taking Flow (Student)
```
┌──────────────┐
│   Student    │
│  Dashboard   │
└──────┬───────┘
       │
   ┌───▼────┐
   │Select  │
   │ Quiz   │
   └───┬────┘
       │
   ┌───▼────────┐
   │Check for   │
   │Previous    │
   │Session?    │
   └───┬───┬────┘
      No  Yes
       │   │
       │   ▼
       │ ┌──────────┐
       │ │Resume    │
       │ │Dialog    │
       │ └───┬──┬───┘
       │    No Yes
       │     │  │
       └─────┤  │
             ▼  ▼
       ┌──────────┐
       │Start/Load│
       │  Quiz    │
       └────┬─────┘
            │
     ┌──────▼──────┐
     │Display      │
     │Question     │◄────────┐
     └──────┬──────┘         │
            │                │
     ┌──────▼──────┐         │
     │Show Visual? │         │
     └──────┬──────┘         │
            │                │
     ┌──────▼──────┐         │
     │Start Timer  │         │
     └──────┬──────┘         │
            │                │
     ┌──────▼──────┐         │
     │User Answer  │         │
     └──────┬──────┘         │
            │                │
     ┌──────▼──────┐         │
     │Save Answer  │         │
     │(Auto-save)  │         │
     └──────┬──────┘         │
            │                │
     ┌──────▼──────┐         │
     │More         │         │
     │Questions?   │─Yes─────┘
     └──────┬──────┘
           No
            │
     ┌──────▼──────┐
     │Submit Quiz  │
     └──────┬──────┘
            │
     ┌──────▼──────┐
     │AI Evaluation│
     │(if needed)  │
     └──────┬──────┘
            │
     ┌──────▼──────┐
     │Show Results │
     │& Explanation│
     └──────┬──────┘
            │
     ┌──────▼──────┐
     │Save to      │
     │Database     │
     └──────┬──────┘
            │
     ┌──────▼──────┐
     │Return to    │
     │Dashboard    │
     └─────────────┘
```

### 3. Admin Quiz Assignment Flow
```
┌──────────────┐
│    Admin     │
│  Dashboard   │
└──────┬───────┘
       │
   ┌───▼───────────┐
   │Select Quiz    │
   │to Assign      │
   └───┬───────────┘
       │
   ┌───▼───────────┐
   │Select Users/  │
   │Groups         │
   └───┬───────────┘
       │
   ┌───▼───────────┐
   │Set Assignment │
   │Parameters:    │
   │- Due Date     │
   │- Attempts     │
   │- Instructions │
   │- Reminders    │
   └───┬───────────┘
       │
   ┌───▼───────────┐
   │Create         │
   │Assignment     │
   └───┬───────────┘
       │
   ┌───▼───────────┐
   │Notify Users   │
   │(Email/App)    │
   └───┬───────────┘
       │
   ┌───▼───────────┐
   │Monitor        │
   │Progress       │
   └───┬───────────┘
       │
   ┌───▼────────────────┐
   │Track:              │
   │- Submissions       │
   │- Overdue          │
   │- In Progress      │
   │- Scores           │
   └───┬────────────────┘
       │
   ┌───▼────────────────┐
   │Actions:            │
   │- Send Reminders    │
   │- Extend Deadline   │
   │- View Details      │
   │- Export Report     │
   └────────────────────┘
```

### 4. Session Recovery Flow
```
┌──────────────┐
│User Opens    │
│Quiz Page     │
└──────┬───────┘
       │
   ┌───▼──────────┐
   │Check for     │
   │Active Session│
   └───┬────┬─────┘
      No   Yes
       │    │
       │    ▼
       │ ┌────────────┐
       │ │Load Session│
       │ │Data        │
       │ └──────┬─────┘
       │        │
       │    ┌───▼──────────┐
       │    │Show Resume   │
       │    │Dialog:       │
       │    │- Question #  │
       │    │- Time Elapsed│
       │    │- Progress %  │
       │    └───┬────┬─────┘
       │       Resume │
       │         │   Start New
       │         │    │
       │    ┌────▼────▼──┐
       │    │Restore:     │
       │    │- Question   │
       │    │- Timer      │
       │    │- Answers    │
       │    └──────┬──────┘
       │           │
       └───────────┤
                   │
            ┌──────▼──────┐
            │Continue     │
            │Quiz         │
            └─────────────┘
```

### 5. Quiz Review & Explanation Flow
```
┌──────────────┐
│Quiz Complete │
│or Previous Q │
└──────┬───────┘
       │
   ┌───▼──────────┐
   │Enter Review  │
   │Mode          │
   └───┬──────────┘
       │
   ┌───▼──────────┐
   │Display:      │
   │- Question    │
   │- User Answer │
   │- Correct Ans │
   └───┬──────────┘
       │
   ┌───▼──────────┐
   │Show          │
   │Explanation?  │
   └───┬────┬─────┘
      No   Yes
       │    │
       │    ▼
       │ ┌────────────┐
       │ │Display:    │
       │ │- Text      │
       │ │- Visual    │
       │ │- Details   │
       │ │- Concepts  │
       │ └──────┬─────┘
       │        │
       └────────┤
                │
        ┌───────▼──────┐
        │Navigate:     │
        │- Previous    │
        │- Next        │
        │- Exit Review │
        └──────────────┘
```

### 6. AI-Powered Adaptive Quiz Generation Flow
```
┌──────────────┐
│Analyze User  │
│Performance   │
└──────┬───────┘
       │
   ┌───▼──────────┐
   │Identify:     │
   │- Weak Areas  │
   │- Error Types │
   │- Time Issues │
   └───┬──────────┘
       │
   ┌───▼──────────┐
   │Generate      │
   │Gemini Prompt │
   └───┬──────────┘
       │
   ┌───▼──────────┐
   │Call Gemini   │
   │Pro API       │
   └───┬──────────┘
       │
   ┌───▼──────────┐
   │Receive       │
   │Questions     │
   └───┬──────────┘
       │
   ┌───▼──────────┐
   │Admin Review? │
   └───┬────┬─────┘
      No   Yes
       │    │
       │    ▼
       │ ┌────────────┐
       │ │Admin Edits │
       │ │& Approves  │
       │ └──────┬─────┘
       │        │
       └────────┤
                │
        ┌───────▼──────┐
        │Create Quiz   │
        │in Database   │
        └───────┬──────┘
                │
        ┌───────▼──────┐
        │Auto-Assign   │
        │to User       │
        └──────────────┘
```

### 7. Hint System Flow
```
┌──────────────┐
│Question      │
│Displayed     │
└──────┬───────┘
       │
   ┌───▼──────────┐
   │Hint          │
   │Available?    │
   └───┬────┬─────┘
      No   Yes
       │    │
       │    ▼
       │ ┌────────────┐
       │ │Show Hint   │
       │ │Button      │
       │ └──────┬─────┘
       │        │
       │   ┌────▼─────┐
       │   │Timer Set?│
       │   └──┬───┬───┘
       │     No  Yes
       │      │   │
       │      │   ▼
       │      │ ┌────────────┐
       │      │ │Auto-show   │
       │      │ │After Timer │
       │      │ └──────┬─────┘
       │      │        │
       │      │   ┌────▼─────┐
       │      └──►│User Click│
       │          │Hint?     │
       │          └────┬──────┘
       │               │
       │          ┌────▼──────┐
       │          │Show:      │
       │          │- Text     │
       │          │- Visual   │
       │          └────┬──────┘
       │               │
       │          ┌────▼──────┐
       │          │Deduct     │
       │          │Points?    │
       │          └────┬──────┘
       │               │
       └───────────────┤
                       │
                ┌──────▼──────┐
                │Continue     │
                │Question     │
                └─────────────┘
```

## Success Metrics
- User engagement time
- Quiz completion rate (>80% target)
- Average score improvement over time
- Return user rate (>60% weekly)
- Feature usage analytics
- Time to first quiz completion
- Session recovery success rate
- AI feedback accuracy

## Data Migration & Schema Management

### Overview
A robust migration system to handle database schema changes without data loss, supporting versioning, rollback, and automatic migration execution.

### Migration System Architecture

#### Migration Manager Class
```javascript
class MigrationManager {
  constructor() {
    this.db = firebase.firestore();
    this.currentVersion = null;
    this.targetVersion = null;
    this.migrations = [];
  }

  // Initialize migration system
  async initialize() {
    // Get current schema version
    const metaDoc = await this.db.collection('_metadata').doc('schema').get();
    
    if (!metaDoc.exists) {
      // First time setup
      await this.db.collection('_metadata').doc('schema').set({
        version: '1.0.0',
        lastMigration: null,
        createdAt: Date.now(),
        migrationHistory: []
      });
      this.currentVersion = '1.0.0';
    } else {
      this.currentVersion = metaDoc.data().version;
    }
    
    // Load migration definitions
    this.loadMigrations();
    
    // Check if migrations needed
    if (this.needsMigration()) {
      console.log(`Migration needed: ${this.currentVersion} → ${this.targetVersion}`);
      await this.runMigrations();
    }
  }

  // Load all migration definitions
  loadMigrations() {
    this.migrations = [
      // Version 1.0.0 → 1.1.0: Add visual support fields
      {
        version: '1.1.0',
        description: 'Add visual description and hint fields to questions',
        up: async () => {
          const batch = this.db.batch();
          const questions = await this.db.collection('quizzes').get();
          
          questions.forEach(doc => {
            const quiz = doc.data();
            if (quiz.questions) {
              quiz.questions = quiz.questions.map(q => ({
                ...q,
                visualDescription: q.visualDescription || null,
                hint: q.hint || null,
                explanation: typeof q.explanation === 'string' ? 
                  { text: q.explanation, showInReview: true } : q.explanation
              }));
              batch.update(doc.ref, { questions });
            }
          });
          
          await batch.commit();
          console.log('Migration 1.1.0: Added visual fields to questions');
        },
        down: async () => {
          // Rollback: Remove visual fields
          const batch = this.db.batch();
          const questions = await this.db.collection('quizzes').get();
          
          questions.forEach(doc => {
            const quiz = doc.data();
            if (quiz.questions) {
              quiz.questions = quiz.questions.map(q => {
                const { visualDescription, hint, ...rest } = q;
                if (q.explanation?.text) {
                  rest.explanation = q.explanation.text;
                }
                return rest;
              });
              batch.update(doc.ref, { questions });
            }
          });
          
          await batch.commit();
        }
      },
      
      // Version 1.1.0 → 1.2.0: Add assignment tracking
      {
        version: '1.2.0',
        description: 'Add assignment tracking collection and fields',
        up: async () => {
          // Check if assignments collection exists
          const assignments = await this.db.collection('assignments').limit(1).get();
          
          if (assignments.empty) {
            // Create default structure
            console.log('Creating assignments collection structure');
          }
          
          // Update user documents with assignment references
          const batch = this.db.batch();
          const users = await this.db.collection('users').get();
          
          users.forEach(doc => {
            const userData = doc.data();
            if (!userData.assignments) {
              batch.update(doc.ref, {
                assignments: [],
                pendingAssignments: []
              });
            }
          });
          
          await batch.commit();
          console.log('Migration 1.2.0: Added assignment tracking');
        },
        down: async () => {
          // Remove assignment fields
          const batch = this.db.batch();
          const users = await this.db.collection('users').get();
          
          users.forEach(doc => {
            batch.update(doc.ref, {
              assignments: firebase.firestore.FieldValue.delete(),
              pendingAssignments: firebase.firestore.FieldValue.delete()
            });
          });
          
          await batch.commit();
        }
      },
      
      // Version 1.2.0 → 1.3.0: Add session management fields
      {
        version: '1.3.0',
        description: 'Add session pause and recovery fields',
        up: async () => {
          const sessions = await this.db.collection('sessions')
            .where('pauseUsed', '==', null).get();
          
          const batch = this.db.batch();
          sessions.forEach(doc => {
            batch.update(doc.ref, {
              pauseUsed: false,
              pauseStartTime: null,
              autoSaveEnabled: true,
              lastAutoSave: Date.now()
            });
          });
          
          await batch.commit();
          console.log('Migration 1.3.0: Added session management fields');
        },
        down: async () => {
          const sessions = await this.db.collection('sessions').get();
          const batch = this.db.batch();
          
          sessions.forEach(doc => {
            batch.update(doc.ref, {
              pauseUsed: firebase.firestore.FieldValue.delete(),
              pauseStartTime: firebase.firestore.FieldValue.delete(),
              autoSaveEnabled: firebase.firestore.FieldValue.delete(),
              lastAutoSave: firebase.firestore.FieldValue.delete()
            });
          });
          
          await batch.commit();
        }
      },
      
      // Version 1.3.0 → 1.4.0: Performance optimization indexes
      {
        version: '1.4.0',
        description: 'Add performance tracking indexes',
        up: async () => {
          // Add composite indexes for better query performance
          // Note: Actual index creation happens in Firebase Console
          console.log('Migration 1.4.0: Performance indexes (manual step required)');
          console.log('Please create the following composite indexes in Firebase Console:');
          console.log('1. assignments: assignedBy + dueDate');
          console.log('2. sessions: userId + status + expiresAt');
          console.log('3. attempts: userId + quizId + timestamp');
        },
        down: async () => {
          console.log('Rollback 1.4.0: Remove indexes manually in Firebase Console');
        }
      }
    ];
    
    // Set target version to latest migration
    this.targetVersion = this.migrations[this.migrations.length - 1]?.version || '1.0.0';
  }

  // Check if migration is needed
  needsMigration() {
    return this.compareVersions(this.currentVersion, this.targetVersion) < 0;
  }

  // Run pending migrations
  async runMigrations() {
    const pendingMigrations = this.migrations.filter(m => 
      this.compareVersions(this.currentVersion, m.version) < 0
    );
    
    console.log(`Running ${pendingMigrations.length} migrations...`);
    
    for (const migration of pendingMigrations) {
      try {
        console.log(`Running migration ${migration.version}: ${migration.description}`);
        
        // Create backup before migration
        await this.createBackup(migration.version);
        
        // Run migration
        await migration.up();
        
        // Update schema version
        await this.updateSchemaVersion(migration.version);
        
        console.log(`✓ Migration ${migration.version} completed successfully`);
      } catch (error) {
        console.error(`✗ Migration ${migration.version} failed:`, error);
        
        // Attempt rollback
        await this.rollback(migration.version);
        throw error;
      }
    }
    
    console.log('All migrations completed successfully');
  }

  // Create backup before migration
  async createBackup(version) {
    const backupData = {
      version,
      timestamp: Date.now(),
      collections: {}
    };
    
    // Backup critical collections
    const collections = ['users', 'quizzes', 'sessions', 'attempts', 'assignments'];
    
    for (const collectionName of collections) {
      const snapshot = await this.db.collection(collectionName).get();
      backupData.collections[collectionName] = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
    }
    
    // Store backup
    await this.db.collection('_backups').doc(`backup_${version}_${Date.now()}`).set(backupData);
    
    console.log(`Backup created for migration ${version}`);
  }

  // Rollback migration
  async rollback(version) {
    console.log(`Rolling back migration ${version}...`);
    
    const migration = this.migrations.find(m => m.version === version);
    if (migration && migration.down) {
      try {
        await migration.down();
        
        // Restore from backup if available
        const backups = await this.db.collection('_backups')
          .where('version', '==', version)
          .orderBy('timestamp', 'desc')
          .limit(1)
          .get();
        
        if (!backups.empty) {
          await this.restoreFromBackup(backups.docs[0].data());
        }
        
        console.log(`✓ Rollback ${version} completed`);
      } catch (error) {
        console.error(`✗ Rollback ${version} failed:`, error);
        throw error;
      }
    }
  }

  // Restore from backup
  async restoreFromBackup(backupData) {
    console.log('Restoring from backup...');
    
    for (const [collectionName, documents] of Object.entries(backupData.collections)) {
      const batch = this.db.batch();
      
      for (const doc of documents) {
        const ref = this.db.collection(collectionName).doc(doc.id);
        batch.set(ref, doc.data);
      }
      
      await batch.commit();
      console.log(`Restored ${documents.length} documents to ${collectionName}`);
    }
  }

  // Update schema version in metadata
  async updateSchemaVersion(version) {
    await this.db.collection('_metadata').doc('schema').update({
      version,
      lastMigration: Date.now(),
      migrationHistory: firebase.firestore.FieldValue.arrayUnion({
        version,
        timestamp: Date.now(),
        success: true
      })
    });
    
    this.currentVersion = version;
  }

  // Compare semantic versions
  compareVersions(v1, v2) {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);
    
    for (let i = 0; i < 3; i++) {
      if (parts1[i] < parts2[i]) return -1;
      if (parts1[i] > parts2[i]) return 1;
    }
    
    return 0;
  }
}
```

### Data Validation & Integrity Checks
```javascript
class DataIntegrityChecker {
  constructor() {
    this.db = firebase.firestore();
    this.errors = [];
    this.warnings = [];
  }

  // Run all integrity checks
  async runAllChecks() {
    console.log('Running data integrity checks...');
    
    await this.checkUserIntegrity();
    await this.checkQuizIntegrity();
    await this.checkSessionIntegrity();
    await this.checkAssignmentIntegrity();
    await this.checkOrphanedRecords();
    
    this.reportResults();
  }

  // Check user data integrity
  async checkUserIntegrity() {
    const users = await this.db.collection('users').get();
    
    users.forEach(doc => {
      const user = doc.data();
      
      // Check required fields
      if (!user.email) {
        this.errors.push(`User ${doc.id} missing email`);
      }
      
      if (!user.role || !['student', 'admin'].includes(user.role)) {
        this.errors.push(`User ${doc.id} has invalid role: ${user.role}`);
      }
      
      // Check data types
      if (user.createdAt && typeof user.createdAt !== 'number') {
        this.warnings.push(`User ${doc.id} has invalid createdAt format`);
      }
    });
  }

  // Check quiz data integrity
  async checkQuizIntegrity() {
    const quizzes = await this.db.collection('quizzes').get();
    
    quizzes.forEach(doc => {
      const quiz = doc.data();
      
      if (!quiz.questions || !Array.isArray(quiz.questions)) {
        this.errors.push(`Quiz ${doc.id} has invalid questions array`);
      } else {
        quiz.questions.forEach((q, index) => {
          // Check question structure
          if (!q.question || !q.questionType) {
            this.errors.push(`Quiz ${doc.id} question ${index} missing required fields`);
          }
          
          // Check answer format
          if (q.questionType === 'multiple-choice' && !q.options) {
            this.errors.push(`Quiz ${doc.id} question ${index} missing options`);
          }
        });
      }
    });
  }

  // Check for orphaned records
  async checkOrphanedRecords() {
    // Check sessions without users
    const sessions = await this.db.collection('sessions').get();
    const userIds = new Set();
    const users = await this.db.collection('users').get();
    users.forEach(doc => userIds.add(doc.id));
    
    sessions.forEach(doc => {
      const session = doc.data();
      if (!userIds.has(session.userId)) {
        this.warnings.push(`Session ${doc.id} references non-existent user ${session.userId}`);
      }
    });
  }

  // Report results
  reportResults() {
    console.log('\n=== Data Integrity Check Results ===');
    
    if (this.errors.length === 0) {
      console.log('✓ No critical errors found');
    } else {
      console.log(`✗ ${this.errors.length} errors found:`);
      this.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (this.warnings.length > 0) {
      console.log(`⚠ ${this.warnings.length} warnings:`);
      this.warnings.forEach(warning => console.log(`  - ${warning}`));
    }
    
    return {
      errors: this.errors,
      warnings: this.warnings,
      healthy: this.errors.length === 0
    };
  }

  // Fix common issues automatically
  async autoFix() {
    console.log('Attempting auto-fix of common issues...');
    
    const batch = this.db.batch();
    let fixes = 0;
    
    // Add missing default fields
    const users = await this.db.collection('users').get();
    users.forEach(doc => {
      const user = doc.data();
      const updates = {};
      
      if (!user.metadata) {
        updates.metadata = { 
          lastActive: Date.now(), 
          totalQuizzes: 0, 
          avgScore: 0 
        };
        fixes++;
      }
      
      if (Object.keys(updates).length > 0) {
        batch.update(doc.ref, updates);
      }
    });
    
    if (fixes > 0) {
      await batch.commit();
      console.log(`✓ Auto-fixed ${fixes} issues`);
    } else {
      console.log('No auto-fixable issues found');
    }
  }
}
```

### Migration CLI Tool
```javascript
// migration-cli.js
class MigrationCLI {
  constructor() {
    this.manager = new MigrationManager();
    this.checker = new DataIntegrityChecker();
  }

  async run(command, ...args) {
    switch (command) {
      case 'status':
        await this.showStatus();
        break;
        
      case 'migrate':
        await this.migrate(args[0]); // target version
        break;
        
      case 'rollback':
        await this.rollback(args[0]); // version to rollback
        break;
        
      case 'check':
        await this.checkIntegrity();
        break;
        
      case 'backup':
        await this.createBackup();
        break;
        
      case 'restore':
        await this.restore(args[0]); // backup id
        break;
        
      default:
        this.showHelp();
    }
  }

  async showStatus() {
    await this.manager.initialize();
    console.log(`Current Version: ${this.manager.currentVersion}`);
    console.log(`Target Version: ${this.manager.targetVersion}`);
    
    if (this.manager.needsMigration()) {
      console.log('⚠ Migration needed');
      const pending = this.manager.migrations.filter(m => 
        this.manager.compareVersions(this.manager.currentVersion, m.version) < 0
      );
      console.log(`Pending migrations: ${pending.map(m => m.version).join(', ')}`);
    } else {
      console.log('✓ Database is up to date');
    }
  }

  async migrate(targetVersion) {
    await this.manager.initialize();
    
    if (targetVersion) {
      this.manager.targetVersion = targetVersion;
    }
    
    await this.manager.runMigrations();
  }

  async checkIntegrity() {
    const result = await this.checker.runAllChecks();
    
    if (result.healthy) {
      console.log('\n✓ Database integrity check passed');
    } else {
      console.log('\n✗ Database integrity issues found');
      
      const fix = await this.prompt('Attempt auto-fix? (y/n): ');
      if (fix.toLowerCase() === 'y') {
        await this.checker.autoFix();
      }
    }
  }

  showHelp() {
    console.log(`
Migration Manager Commands:
  
  status              Show current migration status
  migrate [version]   Run migrations up to version
  rollback <version>  Rollback specific migration
  check              Run integrity checks
  backup             Create manual backup
  restore <id>       Restore from backup
  
Examples:
  node migrate.js status
  node migrate.js migrate 1.4.0
  node migrate.js check
    `);
  }
}

// Run migration on app startup
async function initializeApp() {
  const migrationManager = new MigrationManager();
  
  try {
    await migrationManager.initialize();
    console.log('Database schema is up to date');
  } catch (error) {
    console.error('Migration failed:', error);
    // Prevent app startup if migration fails
    throw new Error('Cannot start app with outdated schema');
  }
  
  // Continue with normal app initialization
  startApp();
}
```

### Best Practices for Schema Changes

1. **Version Control**
   - Always increment version numbers semantically
   - Document all schema changes in migration files
   - Keep migration history in database

2. **Backup Strategy**
   - Automatic backup before each migration
   - Manual backup option for major changes
   - Retention policy for old backups

3. **Testing Migrations**
   - Test on development database first
   - Run integrity checks after migration
   - Have rollback plan ready

4. **Zero-Downtime Migrations**
   - Make changes backward compatible
   - Deploy code that works with both schemas
   - Run migration
   - Remove old code in next release

5. **Data Safety Rules**
   - Never delete fields immediately (deprecate first)
   - Always provide default values for new required fields
   - Test rollback procedures

## Security Considerations
1. **Authentication**: Firebase Auth handles security
2. **Session validation**: Verify user owns session
3. **Time tracking**: Detect suspicious patterns
4. **Answer locking**: Can't change previous answers after moving forward
5. **One pause only**: Prevents timer manipulation
6. **24-hour session expiry**: Prevents indefinite sessions
7. **Input sanitization**: Prevent XSS attacks
8. **API key security**: Use environment variables

## Deployment Strategy
1. **Development**: Local with Live Server
2. **Testing**: Deploy to Netlify (drag & drop)
3. **Production**: GitHub Pages (version controlled)
4. **Backup**: Keep on Surge.sh as fallback

## Future Enhancements
- Multiplayer quiz mode
- Global leaderboards
- Achievement badges and gamification
- Daily challenges
- Voice-based quiz navigation
- Offline mode with sync
- Mobile app (React Native)
- Integration with LMS platforms
- Video explanations for answers
- Collaborative study groups