// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwLwcagZOFXJ_CvV5myv9pFGQCuCg8WcU",
    authDomain: "quiz-app-6a1f3.firebaseapp.com",
    projectId: "quiz-app-6a1f3",
    storageBucket: "quiz-app-6a1f3.firebasestorage.app",
    messagingSenderId: "1081193858165",
    appId: "1:1081193858165:web:22e2f70434e5d9c757243c",
    measurementId: "G-2MBSL3N05E"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();
// Only initialize storage if it's available
let storage = null;
try {
    storage = firebase.storage();
} catch (error) {
    console.warn('Firebase Storage not initialized:', error);
}

// Enable offline persistence
db.enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
        } else if (err.code == 'unimplemented') {
            console.log('The current browser does not support offline persistence');
        }
    });

// Auth state observer
let currentUser = null;

auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (user) {
        // User is signed in
        console.log('User signed in:', user.email);
        updateUserLastActive();
    } else {
        // User is signed out
        console.log('User signed out');
    }
});

// Helper Functions
async function updateUserLastActive() {
    if (currentUser) {
        try {
            await db.collection('users').doc(currentUser.uid).update({
                lastActive: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating last active:', error);
        }
    }
}

// Get user role
async function getUserRole() {
    if (!currentUser) return null;
    
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
            return userDoc.data().role;
        }
    } catch (error) {
        console.error('Error getting user role:', error);
    }
    return null;
}

// Check if user is admin
async function isAdmin() {
    const role = await getUserRole();
    return role === 'admin' || role === 'teacher';
}

// Firestore Collections References
const collections = {
    users: db.collection('users'),
    quizzes: db.collection('quizzes'),
    sessions: db.collection('sessions'),
    assignments: db.collection('assignments'),
    questions: db.collection('questions'),
    results: db.collection('results')
};

// Error Handler
function handleFirebaseError(error) {
    console.error('Firebase error:', error);
    
    const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/operation-not-allowed': 'Operation not allowed',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/user-disabled': 'This account has been disabled',
        'auth/user-not-found': 'No user found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/invalid-credential': 'Invalid email or password',
        'auth/network-request-failed': 'Network error. Please check your connection',
        'permission-denied': 'You do not have permission to perform this action'
    };
    
    return errorMessages[error.code] || error.message || 'An error occurred';
}

// Timestamp helper
function getTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
}

// Export for use in other files
window.firebaseApp = {
    auth,
    db,
    storage,
    collections,
    currentUser: () => currentUser,
    getUserRole,
    isAdmin,
    handleFirebaseError,
    getTimestamp
};