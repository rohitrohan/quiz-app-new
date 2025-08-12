# Security Notice

## Firebase Configuration

The Firebase configuration in `js/firebase-config.js` contains API keys that are **intentionally public**. This is by design and is not a security vulnerability.

### Why Firebase API Keys are Public

1. **Firebase API keys are not secret** - They identify your project but don't grant access
2. **Security is enforced server-side** - Through Firebase Security Rules
3. **This is Google's recommended approach** - See [official documentation](https://firebase.google.com/docs/projects/api-keys)

### Our Security Measures

- ✅ **Firestore Security Rules**: Strict rules prevent unauthorized data access
- ✅ **Authentication Required**: Users must be authenticated to access data
- ✅ **Role-Based Access Control**: Admin features restricted to admin users
- ✅ **Storage Security Rules**: File uploads restricted and validated
- ✅ **Input Validation**: All user inputs are validated and sanitized

### Actual Secrets (Not in Repository)

The following are actual secrets and are NOT included in this repository:
- ❌ Gemini API Key (in `.gitignore`)
- ❌ Firebase Service Account keys
- ❌ OAuth client secrets
- ❌ Payment API keys

### Reporting Security Issues

If you discover a security vulnerability, please email the maintainers privately rather than opening a public issue.

## Additional Security Resources

- [Firebase Security Checklist](https://firebase.google.com/support/guides/security-checklist)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase App Check](https://firebase.google.com/docs/app-check)