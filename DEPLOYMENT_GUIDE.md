# 🚀 Deployment Guide for EcoRise

This guide helps you deploy your game so you can submit it to the AETHRA GLOBAL GAMETHON 2025.

## Why Deploy?

Devpost requires a **playable link** to your game. While you can submit just the GitHub repository, having a live demo significantly improves your submission's impact and makes it easy for judges to experience your game.

---

## Option 1: Vercel (RECOMMENDED) ⭐

**Fastest and easiest option with great performance.**

### Prerequisites
- GitHub account
- Your code pushed to GitHub

### Steps

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" and choose "Continue with GitHub"

2. **Import Your Project**
   - Click "Add New Project"
   - Select your EcoRise repository
   - Click "Import"

3. **Configure Build Settings** (usually auto-detected)
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll get a URL like: `https://ecorise-[random].vercel.app`

5. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add a custom domain or use the Vercel subdomain

### Pro Tips
- Vercel auto-deploys on every GitHub push
- Free SSL certificate included
- Environment variables can be added in Settings
- Great performance with global CDN

---

## Option 2: Netlify

**Another excellent free option with drag-and-drop support.**

### Method A: Connect GitHub (Recommended)

1. **Go to Netlify**
   - Visit https://netlify.com
   - Sign up with GitHub

2. **New Site from Git**
   - Click "Add new site" > "Import an existing project"
   - Choose GitHub and authorize
   - Select your repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Get Your URL**
   - You'll get: `https://[random-name].netlify.app`
   - Can customize in Site Settings

### Method B: Manual Deploy

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy via Drag-and-Drop**
   - Go to https://app.netlify.com/drop
   - Drag your `/dist` folder
   - Get instant deployment

---

## Option 3: GitHub Pages

**Free hosting directly from your GitHub repository.**

### Steps

1. **Install gh-pages Package**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these lines:
   ```json
   {
     "homepage": "https://[your-username].github.io/[repo-name]",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   Add base URL:
   ```typescript
   export default defineConfig({
     base: '/[repo-name]/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repo Settings > Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

6. **Access Your Site**
   - URL: `https://[your-username].github.io/[repo-name]`
   - May take 5-10 minutes to go live

---

## Option 4: Cloudflare Pages

**Super fast with global CDN.**

### Steps

1. **Go to Cloudflare Pages**
   - Visit https://pages.cloudflare.com
   - Sign up (free account)

2. **Create a Project**
   - Click "Create a project"
   - Connect to GitHub
   - Select your repository

3. **Configure Build**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Click "Save and Deploy"

4. **Get Your URL**
   - Format: `https://[project-name].pages.dev`
   - Custom domains available

---

## Option 5: Render

**Good for full-stack apps (if you add a backend later).**

### Steps

1. **Go to Render**
   - Visit https://render.com
   - Sign up with GitHub

2. **New Static Site**
   - Click "New +" > "Static Site"
   - Connect your repository

3. **Configure**
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Click "Create Static Site"

4. **Access**
   - URL: `https://[project-name].onrender.com`

---

## Testing Your Deployment

Before submitting to Devpost, test these:

### Functionality Checklist
- [ ] Game loads without errors
- [ ] Can start a level
- [ ] Tiles can be matched
- [ ] Daily challenge appears
- [ ] Tournament loads
- [ ] Leaderboard displays
- [ ] Sound effects play
- [ ] Background music plays
- [ ] Particle trails work
- [ ] Collision system functions
- [ ] Statistics panel opens
- [ ] Progress persists on refresh

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browser (iOS/Android)

### Performance Check
- [ ] Animations are smooth (60fps)
- [ ] No console errors
- [ ] Loads in under 5 seconds
- [ ] Works on mobile data (not just WiFi)

---

## Common Deployment Issues

### Issue: Build Fails

**Error: "Cannot find module"**
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: "Out of memory"**
```bash
# Solution: Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Issue: Blank Page After Deploy

**Problem**: Routes not working or white screen

**Solution 1**: Check browser console for errors
- Fix any 404s for assets
- Ensure all imports use correct paths

**Solution 2**: Add `_redirects` file for SPA routing
```bash
# Create public/_redirects file with:
/* /index.html 200
```

**Solution 3**: Verify base path in vite.config.ts
```typescript
base: './' // For relative paths
// or
base: '/repo-name/' // For GitHub Pages
```

### Issue: Assets Not Loading

**Problem**: Images/fonts/sounds return 404

**Solution**: Check import paths
```typescript
// ✅ Correct
import logo from '@/assets/images/logo.png'

// ❌ Wrong
const logo = '/assets/images/logo.png'
```

### Issue: Environment Variables Not Working

**Problem**: Spark runtime features don't work

**Solution**: Most platforms auto-inject Spark variables. If issues:
- Vercel: Add in Project Settings > Environment Variables
- Netlify: Add in Site Settings > Build & Deploy > Environment
- Use `import.meta.env.VITE_` prefix for custom variables

---

## Post-Deployment Checklist

After deploying:

1. **Copy Your URL**
   - Save it for Devpost submission
   - Test in incognito window
   - Share with a friend to verify access

2. **Update Your Docs**
   - Add URL to README.md
   - Add to HACKATHON_SUBMISSION.md
   - Add to DEVPOST_DESCRIPTION.md

3. **Create Short Link (Optional)**
   - Use bit.ly, tinyurl.com, or short.io
   - Easier to share on social media
   - Example: `bit.ly/play-ecorise`

4. **Monitor Performance**
   - Check analytics (if provider offers them)
   - Monitor for errors
   - Watch for user feedback

---

## Next Steps

Once deployed:

1. ✅ Add the URL to your Devpost submission
2. ✅ Include it in your video demo
3. ✅ Share on social media
4. ✅ Add to your portfolio
5. ✅ Test thoroughly one more time

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Pages**: https://docs.github.com/pages
- **Cloudflare Pages**: https://developers.cloudflare.com/pages
- **Render**: https://render.com/docs

Or ask in the AETHRA Discord: https://discord.gg/tyna9bjWPj

---

**Good luck with your deployment! 🚀**
