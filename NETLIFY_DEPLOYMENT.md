# 🚀 Netlify Deployment Guide

## ✅ Fixed Issues
- **Success page error**: Fixed useSearchParams issue with Suspense wrapper
- **Build process**: Now builds successfully without errors
- **Ready for deployment**: All components properly configured

## 📋 Quick Deployment Steps

### Method 1: Drag & Drop (Easiest)
1. **Zip your project folder** (exclude node_modules)
2. **Go to Netlify.com** → Sign up/login
3. **Drag the zip file** to Netlify dashboard
4. **Add environment variables** in Site Settings:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_51NpegAGpdrvyBb8P4au1Sw9cAFrkhRxSVSQIh9i5m65xjXIHAhEDVPbiuwNSVVwXK3LYLqedgArUuUqyv1TmXyFA00E2yUovzP`
   - `STRIPE_SECRET_KEY` = `sk_live_...O96K`
   - `NEXTAUTH_URL` = `https://your-site-name.netlify.app`

### Method 2: GitHub (Recommended)
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/psy-course
   git push -u origin main
   ```
2. **Connect GitHub to Netlify**
3. **Add environment variables** in Netlify dashboard
4. **Auto-deploy** on every push

## 🔧 Environment Variables to Add in Netlify

Go to: **Site Settings → Environment variables → Add variable**

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_51NpegAGpdrvyBb8P4au1Sw9cAFrkhRxSVSQIh9i5m65xjXIHAhEDVPbiuwNSVVwXK3LYLqedgArUuUqyv1TmXyFA00E2yUovzP
STRIPE_SECRET_KEY = sk_live_...O96K
NEXTAUTH_URL = https://your-site-name.netlify.app
NEXTAUTH_SECRET = generate_a_random_secret_here
```

## 🎯 What Will Work After Deployment

✅ **Beautiful psychology course website**
✅ **Professional navy blue theme**  
✅ **Testimonials with photos**
✅ **Demo payment flow** (shows course info)
✅ **Success page** (now fixed)
✅ **Responsive design**
✅ **Fast loading**

## 🔄 Current Payment Status

**Demo Mode**: 
- Buttons show course information
- Redirects to success page
- No real payments processed
- Perfect for testing and showcasing

**To Enable Real Payments Later**:
Follow the guide in `STRIPE_SETUP.md`

## 🌐 After Deployment

1. **Get your URL**: `https://your-site-name.netlify.app`
2. **Update NEXTAUTH_URL** with your real domain
3. **Test all functionality**
4. **Share your professional course website!**

## 📞 Support
Questions? Email: twizug55@gmail.com

---
**Your website is ready to go live! 🎉**
