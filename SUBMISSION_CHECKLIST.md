# 📋 Devpost Submission Checklist

## Before You Click "Publish"

### Required Items ✅

- [ ] **Join the Discord** (REQUIRED): https://discord.gg/tyna9bjWPj
- [ ] **Game is deployed** and accessible via public URL
- [ ] **GitHub repository** is public (if you want to share source code)
- [ ] **Project title** is clear and compelling
- [ ] **Tagline** written (60 characters max)
- [ ] **Description** completed (see DEVPOST_DESCRIPTION.md)
- [ ] **Built With** tags added (React, TypeScript, Framer Motion, etc.)

### Submission Package 📦

- [ ] **Playable game link** added to submission
- [ ] **Installation instructions** provided (for local setup)
- [ ] **Screenshots uploaded** (minimum 4, recommended 10):
  1. Main menu / level select
  2. Active gameplay with matches
  3. Power-up animation
  4. Daily challenge
  5. Tournament leaderboard
  6. Badge showcase
  7. Collision system / heatmap
  8. Statistics panel
  9. Level complete screen
  10. Restored biome visual
  
- [ ] **Video demo** recorded and uploaded (HIGHLY RECOMMENDED)
  - 30-90 seconds ideal length
  - Show core gameplay loop
  - Highlight unique features (power-ups, tournaments, collisions)
  - Include audio (music + sound effects)
  - Upload to YouTube/Vimeo/Loom

### Documentation 📄

- [ ] **README.md** is updated with:
  - Clear game description
  - How to play instructions
  - Installation steps
  - Credits and license
  
- [ ] **Code comments** are clean (remove debug logs)
- [ ] **Dependencies** are documented in package.json
- [ ] **License** is specified (MIT License already present)

### Testing ✅

- [ ] **Game runs smoothly** on desktop browsers
- [ ] **Mobile responsive** design works (test on phone)
- [ ] **No console errors** in production build
- [ ] **All features work**:
  - Level progression
  - Daily challenges
  - Tournaments
  - Leaderboard
  - Badge system
  - Sound effects
  - Background music
  - Particle trails
  - Collision system
  - Heatmap
  - Statistics panel
  
- [ ] **Data persists** across page refreshes
- [ ] **No broken links** or missing assets

### Judging Criteria Alignment 🎯

Review how your submission addresses each criterion:

#### 1. **Clarity** ⭐⭐⭐⭐⭐
- [ ] Game concept is immediately obvious
- [ ] Controls are intuitive
- [ ] Tutorial/instructions are clear
- [ ] UI is clean and uncluttered

**Your strengths**: Match-3 mechanics are universally understood, educational cards explain tiles, visual feedback is immediate

#### 2. **Innovation** ⭐⭐⭐⭐⭐
- [ ] Unique features that stand out
- [ ] Fresh take on familiar concepts
- [ ] Technical creativity demonstrated

**Your strengths**: Particle collision system with multipliers, procedural audio generation, heatmap analytics, tournament badge system

#### 3. **Impact Potential** ⭐⭐⭐⭐⭐
- [ ] Addresses real-world problem (climate change)
- [ ] Educational value is clear
- [ ] Could inspire behavioral change
- [ ] Scalable to reach many users

**Your strengths**: Real CO₂ metrics, accurate climate solutions, teacher-friendly web platform, tracks cumulative environmental impact

#### 4. **Feasibility** ⭐⭐⭐⭐⭐
- [ ] Fully functional (not just a concept)
- [ ] Built with proven technologies
- [ ] No placeholder features
- [ ] Could be maintained/expanded

**Your strengths**: Production-ready React app, no external API dependencies, runs in any browser, clear code architecture

#### 5. **Presentation** ⭐⭐⭐⭐⭐
- [ ] Polished visual design
- [ ] Smooth animations
- [ ] Professional documentation
- [ ] Engaging demo video

**Your strengths**: Cohesive color system, 60fps animations, comprehensive sound design, detailed submission docs

### Deployment Options 🚀

Choose one of these platforms for hosting:

#### Option 1: **Vercel** (RECOMMENDED)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts, get instant URL
```
**Pros**: Free, instant SSL, automatic builds, great performance  
**Setup time**: 2 minutes

#### Option 2: **Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```
**Pros**: Free, drag-and-drop option available, form handling  
**Setup time**: 3 minutes

#### Option 3: **GitHub Pages**
```bash
# Add to package.json:
# "homepage": "https://yourusername.github.io/repo-name"

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```
**Pros**: Free, integrates with GitHub repo  
**Setup time**: 5 minutes

#### Option 4: **Cloudflare Pages**
1. Connect GitHub repo at https://pages.cloudflare.com
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy automatically on push

**Pros**: Free, CDN included, very fast globally  
**Setup time**: 5 minutes

### Video Recording Tips 🎥

#### Tools
- **Free**: OBS Studio (screen recording)
- **Paid**: Loom, ScreenFlow, Camtasia
- **Quick**: Browser screen recording (Chrome/Edge built-in)

#### Structure (60-90 seconds)
1. **0-5s**: Title card with game name
2. **5-15s**: Main menu overview
3. **15-30s**: Core gameplay demonstration
4. **30-40s**: Show off power-up animation
5. **40-50s**: Daily challenge completion
6. **50-60s**: Tournament leaderboard
7. **60-75s**: Collision system and heatmap
8. **75-85s**: Statistics panel
9. **85-90s**: Call to action with URL

#### Recording Checklist
- [ ] Record in 1080p (1920x1080)
- [ ] Use game's background music (or add royalty-free music)
- [ ] Show mouse cursor for clarity
- [ ] Keep movements smooth (not too fast)
- [ ] Highlight unique features
- [ ] Include text overlay with feature names
- [ ] Export as MP4 for best compatibility
- [ ] Keep file size under 100MB if possible

### Screenshot Guidelines 📸

#### Technical Specs
- Resolution: 1920x1080 (or native game resolution)
- Format: PNG or JPG
- Quality: High (90%+ for JPG)
- No browser UI visible (use fullscreen mode)

#### Must-Have Shots
1. **Hero image**: Main menu or gameplay (this appears first on Devpost)
2. **Gameplay**: Active match with UI visible
3. **Unique feature**: Power-up animation or collision effect
4. **Competition**: Tournament or leaderboard
5. **Progress**: Badge showcase or statistics

#### Tips
- Take screenshots during actual gameplay (not staged)
- Ensure UI is visible and clear
- Capture exciting moments (combos, celebrations)
- Show variety (different biomes, screens)
- Use game's natural lighting/colors

### Why You Might Not Be Able to Publish ⚠️

Common issues and solutions:

#### Issue: "Complete required fields"
**Solution**: Check for red asterisks (*) marking required fields. Common ones:
- Project name
- Tagline
- Description
- Built With tags
- At least one link (playable game or GitHub)

#### Issue: "Add at least one image"
**Solution**: Upload minimum 1 screenshot (4+ recommended)

#### Issue: "Invalid video URL"
**Solution**: 
- Use direct video links (YouTube, Vimeo, Loom)
- Make sure video is set to "Public" not "Unlisted" or "Private"
- Test the URL in an incognito window

#### Issue: "Project already submitted"
**Solution**: You can only submit once. Use "Edit" to make changes after submission.

#### Issue: "Must accept terms"
**Solution**: Scroll to bottom and check all required checkboxes

#### Issue: "Discord requirement not met"
**Solution**: Join the required Discord server: https://discord.gg/tyna9bjWPj

### After Publishing ✨

- [ ] **Test your submission** by viewing as if you're a judge
- [ ] **Share on social media** (Twitter, LinkedIn, Instagram)
- [ ] **Follow hackathon organizers** (LinkedIn, Instagram as noted)
- [ ] **Monitor Discord** for updates and announcements
- [ ] **Engage with other submissions** (view, comment, support)

### Social Media Templates 📱

**Twitter/X**:
```
Just submitted EcoRise to @AethraClub Global Gamethon 2025! 🌍🎮

Fight climate change through addictive puzzle gameplay. Match eco-solution tiles, unlock power-ups, compete in tournaments!

Play now: [your-url]

#AethraGamethon #ClimateAction #IndieGame #WebGame
```

**LinkedIn**:
```
Excited to share my submission for the AETHRA Global Gamethon 2025!

EcoRise: Restore the Planet is an educational puzzle game that makes climate action engaging and fun. Players match eco-solution tiles (solar panels, wind turbines, trees) to restore polluted biomes while learning real environmental science.

Key features:
🌍 6 unique biomes with ecosystem transformation
🏆 Daily challenges & weekly tournaments
✨ Particle collision system with score multipliers
📊 Analytics dashboard tracking player patterns
🎵 Procedural background music for each biome

Built with React, TypeScript, and Web Audio API. Runs smoothly on any device!

Try it: [your-url]

#GameDevelopment #ClimateChange #EdTech #WebDevelopment
```

**Instagram Caption**:
```
🌍✨ Just launched EcoRise: Restore the Planet!

An educational puzzle game where you fight climate change by matching eco-solution tiles. Every move matters! 🌱

Features:
🎮 8 levels across 6 biomes
🏆 Daily challenges & tournaments
⚡ Particle collision multipliers
🎵 Dynamic music system
📊 Analytics dashboard

Built for @aethra.club Global Gamethon 2025

Link in bio! [or: Play at [short-url]]

#EcoRise #IndieGame #ClimateAction #PuzzleGame #GameDev #WebGame #EducationalGaming
```

---

## Final Checklist Before Clicking "Publish" 🚀

- [ ] Discord joined ✅
- [ ] Game deployed and URL working ✅
- [ ] All required fields completed ✅
- [ ] Minimum 1 image uploaded (4+ recommended) ✅
- [ ] Video uploaded (highly recommended) ✅
- [ ] Links tested (game, GitHub, video) ✅
- [ ] Description reviewed for typos ✅
- [ ] Built With tags added ✅
- [ ] Terms accepted ✅

---

## 🎉 YOU'RE READY!

Click that "Publish" button and good luck! Your game is impressive and well-documented. You've built something that genuinely addresses climate education in an engaging way.

Remember: Judges look for clarity, innovation, impact potential, feasibility, and presentation. **EcoRise excels in all five areas.**

## Questions?

If you're still having issues publishing:
1. Check the hackathon Discord for help
2. Email: aethra.club@gmail.com
3. Review Devpost's help docs: https://help.devpost.com

---

**Now go submit that project and make an impact! 🌍🏆**
