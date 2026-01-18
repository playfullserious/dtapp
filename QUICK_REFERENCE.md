# 🎯 QUICK REFERENCE - What You Need to Do

## ✅ Checklist (Do these in order)

### 1️⃣ Get Supabase Credentials (5 minutes)
- [ ] Go to https://app.supabase.com
- [ ] Select your project
- [ ] Settings → API
- [ ] Copy **Project URL**
- [ ] Copy **anon public key**

### 2️⃣ Set Up Google OAuth (10 minutes)
- [ ] Go to https://console.cloud.google.com
- [ ] Create/select project
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 Client ID
- [ ] Add redirect URI: `http://localhost:3000/api/auth/callback/google`
- [ ] Copy **Client ID**
- [ ] Copy **Client Secret**

### 3️⃣ Generate NextAuth Secret (1 minute)
- [ ] Run: `openssl rand -base64 32`
- [ ] OR visit: https://generate-secret.vercel.app/32
- [ ] Copy the generated secret

### 4️⃣ Create .env.local File (3 minutes)
- [ ] Copy `.env.template` to `.env.local`
- [ ] Fill in all the values from steps 1-3
- [ ] Set your email in `FACULTY_EMAILS`

### 5️⃣ Set Up Database (5 minutes)
- [ ] Go to Supabase → SQL Editor
- [ ] Open `supabase-schema.sql` file
- [ ] Copy all contents
- [ ] Paste and run in Supabase SQL Editor

### 6️⃣ Create Storage Bucket (2 minutes)
- [ ] Go to Supabase → Storage
- [ ] Create new bucket: `content-files`
- [ ] Make it **private** (not public)

---

## 📝 What I've Created for You

1. **`.env.template`** - Template with all required environment variables
2. **`SETUP_GUIDE.md`** - Detailed step-by-step setup instructions
3. **`supabase-schema.sql`** - Complete database schema to run in Supabase
4. **`QUICK_REFERENCE.md`** - This file!

---

## 🚀 Once You're Done

**Let me know when you've completed the checklist above!**

I'll then build:
- ✨ Authentication system with Google OAuth
- 📚 Faculty dashboard for content management
- 🎓 Student learning interface
- 📊 Progress tracking
- 🔐 Domain-restricted access (@xime.org only)

---

## ❓ Need Help?

**Can't find Supabase credentials?**
→ Check `SETUP_GUIDE.md` - Step 1

**Google OAuth errors?**
→ Check `SETUP_GUIDE.md` - Step 2

**Database setup issues?**
→ Make sure you're running the entire `supabase-schema.sql` file

---

## 📧 Your Faculty Email

Don't forget to add your email to `FACULTY_EMAILS` in `.env.local`!

Example:
```
FACULTY_EMAILS=yourname@xime.org
```

This will give you admin/faculty access to upload content.

---

**Ready? Let's build this! 🎉**
