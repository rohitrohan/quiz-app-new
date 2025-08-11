// Authentication Management
document.addEventListener('DOMContentLoaded', () => {
    // Form elements
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const resetForm = document.getElementById('reset-form');
    
    // Toggle links
    const showSignup = document.getElementById('show-signup');
    const showSignin = document.getElementById('show-signin');
    const showReset = document.getElementById('show-reset');
    const backSignin = document.getElementById('back-signin');
    
    // Error/Success message elements
    const signinError = document.getElementById('signin-error');
    const signupError = document.getElementById('signup-error');
    const resetError = document.getElementById('reset-error');
    const resetSuccess = document.getElementById('reset-success');
    
    // Google auth buttons
    const googleSignin = document.getElementById('google-signin');
    const googleSignup = document.getElementById('google-signup');
    
    // Form toggle functions
    function showForm(formToShow) {
        // Hide all forms
        signinForm.style.display = 'none';
        signupForm.style.display = 'none';
        resetForm.style.display = 'none';
        
        // Hide all toggle links
        document.getElementById('toggle-signup').style.display = 'none';
        document.getElementById('toggle-signin').style.display = 'none';
        document.getElementById('toggle-reset').style.display = 'none';
        document.getElementById('back-to-signin').style.display = 'none';
        
        // Clear all error messages
        clearErrors();
        
        // Show requested form and appropriate links
        switch(formToShow) {
            case 'signup':
                signupForm.style.display = 'block';
                document.getElementById('toggle-signin').style.display = 'block';
                document.getElementById('auth-subtitle').textContent = 'Create your account';
                break;
            case 'reset':
                resetForm.style.display = 'block';
                document.getElementById('back-to-signin').style.display = 'block';
                document.getElementById('auth-subtitle').textContent = 'Reset your password';
                break;
            default: // signin
                signinForm.style.display = 'block';
                document.getElementById('toggle-signup').style.display = 'block';
                document.getElementById('toggle-reset').style.display = 'block';
                document.getElementById('auth-subtitle').textContent = 'Sign in to continue';
        }
    }
    
    function clearErrors() {
        signinError.textContent = '';
        signupError.textContent = '';
        resetError.textContent = '';
        resetSuccess.textContent = '';
    }
    
    // Toggle link event listeners
    showSignup?.addEventListener('click', (e) => {
        e.preventDefault();
        showForm('signup');
    });
    
    showSignin?.addEventListener('click', (e) => {
        e.preventDefault();
        showForm('signin');
    });
    
    showReset?.addEventListener('click', (e) => {
        e.preventDefault();
        showForm('reset');
    });
    
    backSignin?.addEventListener('click', (e) => {
        e.preventDefault();
        showForm('signin');
    });
    
    // Sign In
    signinForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Set persistence based on remember me
        const persistence = rememberMe ? 
            firebase.auth.Auth.Persistence.LOCAL : 
            firebase.auth.Auth.Persistence.SESSION;
        
        try {
            await firebase.auth().setPersistence(persistence);
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            
            // Get user data
            const userDoc = await firebaseApp.db.collection('users').doc(userCredential.user.uid).get();
            
            if (userDoc.exists) {
                const userData = userDoc.data();
                // Redirect based on role
                if (userData.role === 'admin' || userData.role === 'teacher') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'user-dashboard.html';
                }
            } else {
                // Create user document if it doesn't exist
                await createUserDocument(userCredential.user, 'student');
                window.location.href = 'user-dashboard.html';
            }
        } catch (error) {
            signinError.textContent = firebaseApp.handleFirebaseError(error);
        }
    });
    
    // Sign Up
    signupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const role = document.getElementById('user-role').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            signupError.textContent = 'Passwords do not match';
            return;
        }
        
        // Validate password strength
        if (password.length < 6) {
            signupError.textContent = 'Password must be at least 6 characters';
            return;
        }
        
        try {
            // Create user account
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            
            // Update display name
            await userCredential.user.updateProfile({
                displayName: name
            });
            
            // Create user document in Firestore
            await createUserDocument(userCredential.user, role, name);
            
            // Redirect based on role
            if (role === 'admin' || role === 'teacher') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'user-dashboard.html';
            }
        } catch (error) {
            signupError.textContent = firebaseApp.handleFirebaseError(error);
        }
    });
    
    // Password Reset
    resetForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('reset-email').value;
        
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            resetSuccess.textContent = 'Password reset email sent! Check your inbox.';
            resetError.textContent = '';
            
            // Clear form
            resetForm.reset();
            
            // Redirect to signin after 3 seconds
            setTimeout(() => {
                showForm('signin');
            }, 3000);
        } catch (error) {
            resetError.textContent = firebaseApp.handleFirebaseError(error);
            resetSuccess.textContent = '';
        }
    });
    
    // Google Sign In
    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        
        try {
            const result = await firebase.auth().signInWithPopup(provider);
            
            // Check if user exists in database
            const userDoc = await firebaseApp.db.collection('users').doc(result.user.uid).get();
            
            if (!userDoc.exists) {
                // New user - create document with default role
                await createUserDocument(result.user, 'student');
                window.location.href = 'user-dashboard.html';
            } else {
                // Existing user - redirect based on role
                const userData = userDoc.data();
                if (userData.role === 'admin' || userData.role === 'teacher') {
                    window.location.href = 'admin-dashboard.html';
                } else {
                    window.location.href = 'user-dashboard.html';
                }
            }
        } catch (error) {
            const errorElement = signinForm.style.display !== 'none' ? signinError : signupError;
            errorElement.textContent = firebaseApp.handleFirebaseError(error);
        }
    }
    
    googleSignin?.addEventListener('click', signInWithGoogle);
    googleSignup?.addEventListener('click', signInWithGoogle);
    
    // Create user document in Firestore
    async function createUserDocument(user, role, name = null) {
        const userData = {
            uid: user.uid,
            email: user.email,
            name: name || user.displayName || user.email.split('@')[0],
            role: role,
            createdAt: firebaseApp.getTimestamp(),
            lastActive: firebaseApp.getTimestamp(),
            profileCompleted: false,
            stats: {
                totalQuizzes: 0,
                averageScore: 0,
                totalTimeSpent: 0,
                currentStreak: 0,
                bestStreak: 0,
                lastQuizDate: null
            },
            preferences: {
                notifications: true,
                emailUpdates: false,
                theme: 'light'
            }
        };
        
        await firebaseApp.db.collection('users').doc(user.uid).set(userData);
    }
    
    // Check if user is already logged in
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, redirect to appropriate dashboard
            firebaseApp.db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const userData = doc.data();
                        if (window.location.pathname.includes('auth.html')) {
                            if (userData.role === 'admin' || userData.role === 'teacher') {
                                window.location.href = 'admin-dashboard.html';
                            } else {
                                window.location.href = 'user-dashboard.html';
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error checking user role:', error);
                });
        }
    });
    
    // Password strength indicator
    const signupPassword = document.getElementById('signup-password');
    signupPassword?.addEventListener('input', (e) => {
        const password = e.target.value;
        const strength = checkPasswordStrength(password);
        updatePasswordStrengthIndicator(strength);
    });
    
    function checkPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        
        if (strength <= 2) return 'weak';
        if (strength <= 4) return 'medium';
        return 'strong';
    }
    
    function updatePasswordStrengthIndicator(strength) {
        // This would update a visual indicator if added to the HTML
        console.log('Password strength:', strength);
    }
});