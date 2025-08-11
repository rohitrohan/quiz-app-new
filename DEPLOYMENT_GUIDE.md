# 🚀 Deployment Guide - QuizMaster

## ⚠️ CRITICAL: Secure Your API Keys First!

### Step 1: Protect Your API Keys
Your Gemini API key is currently exposed in `api/gemini-config.js`. We need to remove it before pushing to GitHub.

```bash
# 1. Save your API key somewhere safe (notepad, password manager, etc.)

# 2. Reset the API key in the file
# Edit api/gemini-config.js and change the API_KEY back to 'YOUR_API_KEY_HERE'

# 3. The file is already in .gitignore, so it won't be tracked after this
```

## 📁 Step 2: Initialize Git Repository

Open terminal in your project folder (`quiz-app-new`) and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Check what files will be committed (make sure api/gemini-config.js is NOT listed)
git status

# If gemini-config.js appears, remove it from staging
git rm --cached api/gemini-config.js

# Create first commit
git commit -m "Initial commit - QuizMaster Quiz Application"
```

## 🔗 Step 3: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** button (top right) → **"New repository"**
3. Configure repository:
   - **Repository name**: `quiz-app-new` (or your preferred name)
   - **Description**: "AI-powered quiz application with Firebase backend"
   - **Public** (required for GitHub Pages)
   - **DON'T** initialize with README (we already have one)
   - Click **"Create repository"**

## 📤 Step 4: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/quiz-app-new.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Deploy from a branch**
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**

## ⏰ Step 6: Wait for Deployment

- GitHub Pages takes 5-10 minutes to deploy
- Your site will be available at: `https://YOUR_USERNAME.github.io/quiz-app-new/`
- Check Actions tab for deployment status

## 🔧 Step 7: Configure for Production

### Create a Public Config File
Since API keys can't be in public repos, create a configuration system:

1. Create `js/config.js`:
```javascript
// Public configuration file
window.AppConfig = {
    // Set to true if you want to enable AI features
    // Users will need to enter their own API key
    enableAI: false,
    
    // Firebase config is public (it's secured by rules)
    firebase: {
        // Your Firebase config (already in firebase-config.js)
    }
};
```

2. Modify `api/gemini-config.js` to check for user-provided API key:
```javascript
// Check localStorage for user's API key
const userApiKey = localStorage.getItem('gemini_api_key');
const GEMINI_CONFIG = {
    API_KEY: userApiKey || 'YOUR_API_KEY_HERE',
    // ... rest of config
};
```

3. Add UI for users to enter their own API key (optional feature)

## 📝 Step 8: Update README for GitHub

Create/update `README.md` with:
- Live demo link
- Features list
- Setup instructions
- Screenshots
- Technologies used

## 🔄 Step 9: Future Updates

To update your site after changes:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push

# GitHub Pages will auto-update in a few minutes
```

## 🛠️ Troubleshooting

### Issue: 404 Error on GitHub Pages
- Check if index.html is in root directory
- Wait 10 minutes for deployment
- Clear browser cache

### Issue: Firebase not working
- Firebase config is public (it's OK, secured by rules)
- Check Firebase console for domain whitelist
- Add `https://YOUR_USERNAME.github.io` to authorized domains:
  1. Firebase Console → Authentication → Settings
  2. Add your GitHub Pages URL to Authorized domains

### Issue: AI Features not working
- Gemini API keys cannot be public
- Consider:
  1. Disable AI features for public version
  2. Let users input their own API key
  3. Use a backend service to proxy API calls

## 🎉 Step 10: Share Your App!

Your QuizMaster app is now live! Share the link:
`https://YOUR_USERNAME.github.io/quiz-app-new/`

## 📱 Bonus: Make it a PWA

Add a `manifest.json` for mobile app-like experience:

```json
{
  "name": "QuizMaster",
  "short_name": "QuizMaster",
  "start_url": "/quiz-app-new/",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "assets/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 🔐 Security Checklist

Before deploying, ensure:
- [ ] Gemini API key removed from code
- [ ] Firebase security rules are strict
- [ ] No sensitive data in code
- [ ] Test user credentials removed
- [ ] Console.log statements removed
- [ ] Error messages don't expose system details

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify Firebase configuration
3. Ensure all file paths are relative
4. Check GitHub Actions tab for deployment errors

Good luck with your deployment! 🚀