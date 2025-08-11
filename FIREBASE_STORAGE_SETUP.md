# Firebase Storage Setup Guide

## 🔧 Fix Storage Configuration Issues

### Step 1: Enable Firebase Storage
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (quiz-app-6a1f3)
3. Click on **Storage** in the left sidebar
4. If not already done, click **"Get started"**
5. Choose your storage location (select the closest region to you)
6. Start in **production mode** (we'll apply our custom rules)

### Step 2: Apply Storage Security Rules
1. In Firebase Console → Storage → **Rules** tab
2. Replace the default rules with the content from `storage-rules.txt`
3. Click **"Publish"** to apply the rules

### Step 3: Check Storage Bucket Configuration
1. In Firebase Console → Project Settings → General
2. Scroll down to find your storage bucket URL
3. It should look like: `quiz-app-6a1f3.appspot.com` or `quiz-app-6a1f3.firebasestorage.app`
4. Verify this matches the `storageBucket` in your `firebase-config.js`

### Step 4: Enable CORS (if needed)
If you're still getting errors, you may need to configure CORS:

1. Install Google Cloud SDK (if not installed):
```bash
# For macOS
brew install --cask google-cloud-sdk

# Or download from: https://cloud.google.com/sdk/docs/install
```

2. Create a `cors.json` file:
```json
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600
  }
]
```

3. Apply CORS configuration:
```bash
gsutil cors set cors.json gs://quiz-app-6a1f3.appspot.com
```

### Step 5: Verify Storage is Active
1. Go to Firebase Console → Storage
2. You should see the **Files** tab active
3. Check if there's a folder structure visible
4. If you see "Storage is not activated", click the activation button

### Step 6: Check Billing/Quota
- Firebase Storage requires the Blaze (Pay as you go) plan for full functionality
- However, the free tier includes:
  - 5GB storage
  - 1GB/day bandwidth
  - 20K/day upload operations
  - 50K/day download operations

If on Spark (free) plan and hitting limits:
1. Go to Firebase Console → Settings → Usage and billing
2. Check your current usage
3. Consider upgrading to Blaze plan (still free for small usage)

### Common Issues and Solutions

#### Issue: "storage/retry-limit-exceeded"
**Solutions:**
- Check internet connection stability
- Verify storage bucket is properly configured
- Ensure Storage is enabled in Firebase Console
- Check if you're on VPN (may cause issues)
- Try a different browser

#### Issue: "storage/unauthorized"
**Solutions:**
- Verify user is authenticated before upload
- Check storage rules are published
- Ensure file meets size/type restrictions

#### Issue: "storage/object-not-found"
**Solutions:**
- File doesn't exist at specified path
- Check the file path structure
- Ensure file was successfully uploaded first

### Test Storage with cURL
Test if your storage bucket is accessible:

```bash
curl -X GET "https://firebasestorage.googleapis.com/v0/b/quiz-app-6a1f3.appspot.com/o?maxResults=1"
```

Should return a JSON response (may be empty but shouldn't error)

### Troubleshooting Checklist
- [ ] Firebase Storage is enabled in console
- [ ] Storage rules are published
- [ ] Storage bucket URL matches config
- [ ] User is authenticated before operations
- [ ] File size is under 5MB (as per rules)
- [ ] File type is image/* for image uploads
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows storage requests completing

### Alternative: Direct Test in Console
1. Go to Firebase Console → Storage
2. Click "Upload file" button
3. Try uploading a small test image manually
4. If this works, the issue is in the client code
5. If this fails, there's a configuration issue

## Next Steps
After fixing storage:
1. Refresh the test-firebase.html page
2. Try uploading a small image (< 1MB)
3. Check if file appears in Firebase Console → Storage
4. Test the "List Files" button

## Support Resources
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage/web/start)
- [Storage Security Rules Guide](https://firebase.google.com/docs/storage/security)
- [Storage Quotas and Limits](https://firebase.google.com/docs/storage/quotas)
- [Firebase Status Page](https://status.firebase.google.com/)