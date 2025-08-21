# 🔐 OAuth Setup Guide (Google & Apple)

## 🚨 **Signup Issue Fixed!**

The signup form was failing because OAuth providers weren't configured. Here's how to fix it:

## 📋 **Step-by-Step Setup**

### 1. **Create Environment File**
Create a `.env` file in the `client/` directory:

```bash
cd client
touch .env
```

### 2. **Add OAuth Configuration**
Add this to your `client/.env` file:

```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
VITE_GOOGLE_REDIRECT_URI=http://localhost:3002/auth/google/callback

# Apple OAuth Configuration
VITE_APPLE_CLIENT_ID=your-apple-client-id-here
VITE_APPLE_REDIRECT_URI=http://localhost:3002/auth/apple/callback

# Backend Configuration
VITE_API_URL=http://localhost:3002
```

### 3. **Get OAuth Credentials**

#### **Option A: Quick Test (Use Placeholders)**
For now, you can use the placeholders and the signup will work with email registration:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
VITE_APPLE_CLIENT_ID=your-apple-client-id-here
```

#### **Option B: Full Google OAuth Setup**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API and Google Identity Services
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Set **Application Type** to "Web application"
6. Add **Authorized origins**: `http://localhost:3002`
7. Add **Authorized redirect URIs**: `http://localhost:3002/auth/google/callback`
8. Copy the **Client ID** to your `.env` file

#### **Option C: Full Apple OAuth Setup**
1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Create a new App ID or select existing one
3. Enable "Sign In with Apple" capability
4. Go to **Certificates, Identifiers & Profiles** → **Identifiers**
5. Create a new **Services ID** for web authentication
6. Add **Domains and Subdomains**: `localhost`
7. Add **Return URLs**: `http://localhost:3002/auth/apple/callback`
8. Copy the **Services ID** to your `.env` file as `VITE_APPLE_CLIENT_ID`

### 4. **Restart Development Server**
```bash
# Stop current server (Ctrl+C)
# Then restart
PORT=3002 npm run dev
```

## ✅ **What's Fixed**

- **Signup Form**: Now works properly with email registration
- **OAuth Buttons**: Show helpful messages when not configured
- **Error Handling**: Graceful fallback for missing OAuth setup
- **User Experience**: Clear guidance on what needs to be configured
- **Dual OAuth Support**: Both Google and Apple Sign-In available

## 🧪 **Test the Fix**

1. **Visit**: http://localhost:3002
2. **Click**: "Sign Up" or "Join BizHub"
3. **Select**: Your role (Platform Admin/Organization/Employee)
4. **Choose**: "Continue with Email"
5. **Fill**: Registration form
6. **Submit**: Account creation should work!

### **Or Test with Demo Credentials**
- **Platform Admin**: username: `admin`, password: `admin123`
- **Organization**: username: `techcorp`, password: `techcorp123`
- **Employee**: username: `employee`, password: `employee123`

## 🔍 **Current Status**

- ✅ **Email Registration**: Working perfectly
- ✅ **Role Selection**: All three tiers available
- ✅ **Form Validation**: Proper error handling
- ✅ **Google OAuth**: Ready when configured
- ✅ **Apple OAuth**: Ready when configured
- ⚠️ **OAuth Sign-In**: Shows "Not Configured" until setup

## 🚀 **Next Steps**

1. **Test email registration** - Should work immediately
2. **Set up Google OAuth** - For production use
3. **Set up Apple OAuth** - For iOS/macOS users
4. **Configure environment** - Add real OAuth Client IDs
5. **Test OAuth Sign-In** - Verify both Google and Apple flows

## 🆘 **Still Having Issues?**

If signup still fails:

1. **Check browser console** for JavaScript errors
2. **Verify server is running** on port 3002
3. **Check network tab** for API call failures
4. **Ensure database** is accessible (in-memory storage by default)

## 📞 **Support**

The signup form is now robust and should work reliably. Both Google and Apple OAuth integrations are fully implemented and ready to use once configured!

---

**🎯 Quick Test**: Try the email registration now - it should work without any OAuth setup!
