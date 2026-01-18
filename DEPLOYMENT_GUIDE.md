# 🚀 Deployment Guide - XIME Learning Platform

## ✅ Pre-Deployment Checklist

Before deploying to Vercel, make sure you have:
- [x] Filled in `.env.local` with all credentials
- [ ] Run `supabase-schema.sql` in Supabase SQL Editor
- [ ] Created `content-files` storage bucket in Supabase
- [ ] Pushed code to GitHub (see instructions below)

---

## 📤 Step 1: Push to GitHub

### If you haven't authenticated with GitHub yet:

**Option A: Using GitHub CLI**
```bash
gh auth login
```

**Option B: Using Personal Access Token**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic) with `repo` scope
3. Use this command:
```bash
git remote set-url origin https://YOUR_TOKEN@github.com/playfullserious/dtapp.git
git push -u origin master
```

**Option C: Using GitHub Desktop**
1. Open GitHub Desktop
2. Add the repository
3. Push to origin

---

## 🌐 Step 2: Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import GitHub Repository**
   - Select `playfullserious/dtapp`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variables**
   Click "Environment Variables" and add these:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://your-app.vercel.app
   ALLOWED_EMAIL_DOMAIN=xime.org
   FACULTY_EMAILS=your_email@xime.org
   ```

   **IMPORTANT**: 
   - Copy values from your `.env.local` file
   - Update `NEXTAUTH_URL` to your Vercel URL (you'll get this after deployment)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete

6. **Get Your URL**
   - After deployment, you'll get a URL like: `https://dtapp-xyz.vercel.app`
   - Copy this URL

---

## 🔧 Step 3: Update Google OAuth

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/apis/credentials

2. **Edit OAuth Client**
   - Click on your OAuth 2.0 Client ID
   - Under "Authorized redirect URIs", add:
     ```
     https://your-app.vercel.app/api/auth/callback/google
     ```
   - Click "Save"

---

## 🔄 Step 4: Update NEXTAUTH_URL in Vercel

1. **Go to Vercel Dashboard**
   - Select your project
   - Go to "Settings" → "Environment Variables"

2. **Update NEXTAUTH_URL**
   - Find `NEXTAUTH_URL`
   - Change value to: `https://your-actual-vercel-url.vercel.app`
   - Click "Save"

3. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

---

## ✅ Step 5: Test Your Deployment

1. Visit your Vercel URL
2. Click "Sign in with Google"
3. Use your `@xime.org` email
4. You should be redirected to the appropriate dashboard

---

## 🎯 Quick Deploy Commands (Alternative)

If you prefer using Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

---

## 🔍 Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure you added the Vercel URL to Google OAuth authorized redirect URIs
- Format: `https://your-app.vercel.app/api/auth/callback/google`

### Error: "Access denied - not from xime.org"
- Verify `ALLOWED_EMAIL_DOMAIN=xime.org` in Vercel environment variables
- Try signing in with a different `@xime.org` email

### Error: "Database connection failed"
- Check Supabase credentials in Vercel environment variables
- Verify database schema was run successfully

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`

---

## 📊 Post-Deployment

### Set Up Custom Domain (Optional)
1. Go to Vercel → Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Google OAuth redirect URI with new domain

### Monitor Usage
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com

---

## 🎉 You're Live!

Your XIME Learning Platform is now deployed and accessible to students!

**Next Steps:**
1. Share the URL with students
2. Upload content via faculty dashboard
3. Monitor student engagement

---

## 📞 Need Help?

If you encounter issues:
1. Check Vercel build logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Ensure database schema is properly set up
