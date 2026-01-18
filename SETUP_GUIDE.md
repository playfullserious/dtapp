# XIME Content Platform - Setup Guide

## 📋 Prerequisites Checklist

Before you start, make sure you have:
- ✅ GitHub account (logged in)
- ✅ Supabase account with a project created
- ✅ Google Cloud Console access
- ✅ Node.js installed (v18 or higher)

---

## 🚀 Quick Start Guide

### Step 1: Get Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click on **Settings** (gear icon) → **API**
4. Copy the following:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 2: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable **Google+ API**:
   - Search for "Google+ API" in the search bar
   - Click **Enable**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen (if first time):
   - User Type: **External**
   - App name: `XIME Content Platform`
   - User support email: Your email
   - Authorized domains: Leave empty for now
   - Developer contact: Your email
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: `XIME Content Platform`
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - (Add production URL later after deploying)
7. Copy **Client ID** and **Client Secret**

### Step 3: Generate NextAuth Secret

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Or visit: https://generate-secret.vercel.app/32

Copy the generated secret.

### Step 4: Configure Environment Variables

1. Copy `.env.template` to `.env.local`:
   ```bash
   cp .env.template .env.local
   ```

2. Open `.env.local` and fill in all the values:
   - Paste your Supabase URL and anon key
   - Paste your Google Client ID and Secret
   - Paste your NextAuth secret
   - Confirm `ALLOWED_EMAIL_DOMAIN=xime.org`
   - Add your email to `FACULTY_EMAILS`

### Step 5: Set Up Supabase Database

You'll need to create the database tables. I'll provide SQL scripts for this.

The tables we need:
- **users** - Store user information
- **content** - Store uploaded documents/content
- **user_progress** - Track student learning progress

### Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Access Control Details

The platform implements **strict Google OAuth authentication** with:

1. **Domain Restriction**: Only `@xime.org` email addresses can sign in
2. **Role-Based Access**:
   - **Faculty**: Emails listed in `FACULTY_EMAILS` → Can upload/manage content
   - **Students**: All other `@xime.org` emails → Can view/interact with content
3. **Session Management**: Secure sessions with NextAuth.js

---

## 📁 Project Structure

```
dtapp/
├── app/
│   ├── api/
│   │   └── auth/          # NextAuth API routes
│   ├── dashboard/         # Student dashboard
│   ├── faculty/           # Faculty admin panel
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── auth.ts           # Auth utilities
├── .env.local            # Your credentials (DO NOT COMMIT)
├── .env.template         # Template file
└── package.json
```

---

## 🎯 Next Steps

Once you've filled in `.env.local`, let me know and I'll:
1. Create the database schema (SQL scripts)
2. Build the authentication system
3. Create the faculty dashboard
4. Create the student interface
5. Set up file upload functionality

---

## ❓ Troubleshooting

**Google OAuth Error: "redirect_uri_mismatch"**
- Make sure you added `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

**Supabase Connection Error**
- Verify your project URL and anon key are correct
- Check if your Supabase project is active

**Domain Restriction Not Working**
- Ensure `ALLOWED_EMAIL_DOMAIN=xime.org` (no @ symbol)
- Clear browser cookies and try again

---

## 📞 Ready to Continue?

Once you've completed Steps 1-4 and created your `.env.local` file, I'll proceed with building the application!
