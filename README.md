# QuizMaster - Interactive Quiz Application

A comprehensive quiz application built with HTML, CSS, JavaScript, and Firebase, featuring AI-powered quiz generation, real-time progress tracking, and advanced analytics.

## Features

- 🔐 **Authentication System**: Email/password and Google Sign-In
- 👥 **Role-based Access**: Student and Admin/Teacher roles
- 📝 **Multiple Question Types**: MCQ, Short Answer, Essay
- 🤖 **AI Integration**: Gemini Pro API for quiz generation and evaluation
- 📊 **Analytics Dashboard**: Performance tracking and insights
- ⏸️ **Session Management**: Pause and resume quiz sessions
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Visual Support**: Images and SVG for questions and explanations
- 📅 **Assignment Tracking**: Due dates and overdue monitoring

## Setup Instructions

### Prerequisites

- A modern web browser
- Node.js (optional, for local development server)
- Firebase account
- Gemini Pro API key

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password provider
   - Enable Google provider
4. Create Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
   - Choose your preferred location
5. Enable Storage:
   - Go to Storage
   - Get started with storage
6. Get your configuration:
   - Go to Project Settings > General
   - Scroll to "Your apps" and click "Add app"
   - Choose Web platform (</>)
   - Register your app and copy the configuration

### 2. Update Firebase Configuration

Edit `js/firebase-config.js` and replace the placeholder values with your Firebase configuration:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 3. Firebase Security Rules

Go to Firestore Database > Rules and add the following security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admins can read all users
    match /users/{userId} {
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Quiz access rules
    match /quizzes/{quizId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'teacher'];
    }
    
    // Session rules
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Results rules
    match /results/{resultId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'teacher']);
      allow write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Assignments rules
    match /assignments/{assignmentId} {
      allow read: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'teacher']);
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'teacher'];
    }
  }
}
```

### 4. Gemini Pro API Setup

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a file `api/gemini-config.js` with your API key:

```javascript
const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
```

### 5. Local Development

To run the application locally:

1. Using Python:
```bash
python -m http.server 8000
```

2. Using Node.js:
```bash
npx http-server
```

3. Open your browser and navigate to `http://localhost:8000`

### 6. Deployment to GitHub Pages

1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings > Pages
4. Select source: Deploy from a branch
5. Select branch: main (or master)
6. Select folder: / (root)
7. Save and wait for deployment

Your app will be available at: `https://[your-username].github.io/[repository-name]/`

## Project Structure

```
quiz-app-new/
├── index.html              # Landing page
├── auth.html               # Authentication page
├── user-dashboard.html     # Student dashboard
├── admin-dashboard.html    # Admin dashboard
├── quiz.html              # Quiz session page
├── css/
│   ├── styles.css         # Global styles
│   ├── auth.css           # Authentication styles
│   ├── user.css           # User dashboard styles
│   ├── admin.css          # Admin dashboard styles
│   └── quiz.css           # Quiz page styles
├── js/
│   ├── firebase-config.js # Firebase configuration
│   ├── auth.js            # Authentication logic
│   ├── app.js             # Landing page logic
│   ├── user.js            # User dashboard logic
│   ├── admin.js           # Admin dashboard logic
│   └── quiz.js            # Quiz session logic
├── api/                   # API integrations
├── data/                  # Data files
└── assets/                # Images and media
```

## Creating Your First Admin Account

1. Sign up with your email
2. Select "Teacher/Admin" role during registration
3. Access the admin dashboard at `/admin-dashboard.html`

## Creating Quizzes

As an admin:
1. Go to Admin Dashboard > Quizzes
2. Click "Create New Quiz"
3. Add questions with optional visual content
4. Set difficulty levels and categories
5. Assign to students with due dates

## Testing the Application

1. Create test accounts:
   - Admin account: admin@test.com
   - Student account: student@test.com

2. Create sample quizzes in different categories

3. Test quiz functionality:
   - Start a quiz
   - Pause and resume
   - Complete and view results

## Troubleshooting

### Firebase Authentication Issues
- Check that authentication providers are enabled
- Verify Firebase configuration is correct
- Check browser console for errors

### Firestore Permission Errors
- Ensure security rules are properly configured
- Check that users have appropriate roles

### Quiz Not Loading
- Verify Firestore has quiz documents
- Check network connectivity
- Review browser console for errors

## Support

For issues and feature requests, please create an issue in the GitHub repository.

## License

This project is licensed under the MIT License.