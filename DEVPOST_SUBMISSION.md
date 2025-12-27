# 🌍 EcoRise - Devpost Submission Guide

### Basic Information


**Tagline (max 60 chars):** Save the planet one match at a time with renewable energy!

**Category/Tags:**
- Game
- Education
- Climate Tech
- Puzzle
- Web App
EcoRise
Every match red
Players progress

---

## 📖 What it does

EcoRise is an innovative match-3 puzzle game that makes climate education engaging and fun. Players restore polluted biomes by matching renewable energy sources like solar panels, wind turbines, and hydroelectric systems. 

Every match reduces virtual CO₂ emissions and unlocks educational facts about real-world sustainable technologies. With 16 challenging levels across 8 unique biomes, daily challenges, tournaments, and a sophisticated particle collision system, EcoRise proves that learning about climate action can be as addictive as it is important.

Players progress from restoring forests to saving coral reefs, unlocking powerful abilities and competing globally while discovering how renewable energy works in practice.

---

## 🎯 How we built it

**Frontend Framework:**
- React 19 with TypeScript for type-safe, maintainable code
- Vite 7 for lightning-fast development and optimized builds
- Framer Motion for smooth, engaging animations

**UI/UX:**
- Shadcn v4 component library with Radix UI primitives
- Tailwind CSS 4 for responsive, modern styling
- Custom theme system with biome-specific color palettes
- Phosphor Icons for consistent iconography

**State Management & Persistence:**
- React Hooks for local state management
- GitHub Spark KV API for persistent global state
- Real-time leaderboards synced across all players
- Automatic progress saving

**Advanced Features:**
- Custom particle collision physics algorithm
- Canvas-based heatmap visualization
- Web Audio API for biome-specific soundscapes
- Real-time analytics and statistics tracking

**Game Logic:**
- Custom match-3 engine with cascade effects
- Dynamic grid system (4x4 to 8x8)
- Intelligent shuffle algorithm ensuring valid moves
- Combo system with progressive multipliers

The entire game runs in the browser with no backend required, leveraging GitHub Spark's serverless infrastructure for data persistence.

---

## 💪 Challenges we ran into

### 1. **Balancing Difficulty**
**Problem:** Initial levels were too easy (could finish in one move), making gameplay boring.

**Solution:** Implemented two-tier difficulty system:
- **Normal Mode:** 8 progressively challenging levels with balanced scoring
- **EXTREME Mode:** 8 levels with dramatically increased targets (3-4x harder)
- Adjusted grid sizes and move limits per level
- Added target score scaling based on biome complexity

### 2. **Particle Trail Performance**
**Problem:** Mouse trails with collision detection caused lag on lower-end devices.

**Solution:** 
- Implemented intensity settings (Low/Medium/High)
- Added frame-rate optimization with requestAnimationFrame
- Introduced toggle to disable trails for performance-sensitive users
### 4. **Click Responsiveness**

- Added `isProcessing` stat
- Reduced animation durations for snappier feel

### 5. **Lead

- Leveraged GitHub Spark KV for serverless d
- Used functional state updates to prevent data races



✅ **38+ Major Features** - Comp
✅ **Advanced Physics** - Custom collision detection algorithm with real-

### Education
📚 **Interactive Learning** - Players discover facts organi
🎓 **Age-Appropriate** - Content suita
### Player Engagement
🏅 **9 Unique Badges** - Achievement system encouraging continued
🎨 **6 Unlockable Themes** - Progression rewards 

✨ **Smooth Animations** - Every in
📱 **Accessibility** - Keyboard shortcuts, clear feedback, tutorial system



- **React 19 Best Practices** - Functional components, cust
- **Canvas API** - Creating performant visualizations
- **Serverless Architecture** - Building multiplayer features without

- *



- **Documentation** - Im




- 🌴 **New Biomes** - Rainforest, Tundra, Urban, Space Station


- 👥 **Real-time Versus** - Head-to-head matches
- 🏆 **Seasonal Leagues** - Ranked competitive play
**Educational Expansion:**
- 🎓 **Quiz Mode** - Test knowledge with trivia

**Technical Improveme
- 🎮 **Gamepad Support** - Controller integration
- 💾 **Cloud Sync** - Cross-device progress
**Community Features:**
- 💬 **In-game Chat** - Social features
- 🎨 **User-generated Content** - Custom level editor

## 🎥 Demo Video Script (
**[0:00-0:15] Hook**
- Title reveal: "EcoRise - Restore the Planet"
**[0:15-0:45] Core Gameplay**
- Show combo chain and score multipliers

**[1:15-1:45] Game Mo


- Highlight CO₂ reduction counter
- Display total impact statistics
**[2:15-2:30] Call to Action**
- GitHub Spark URL overlay




- [ ] **Active Gameplay** - Mid-match with particle trails visible
- [ ] **Power-Up Animation** - Supernova or Tsunami effect
- [ ] **Tournament Leaderboard** - Competitive rankings
- [ ] **Collision Heatmap** - Analytics overlay on game grid

---
## 🔗 Links to Include
**Required:**
- [ ] Source code repository (if public)


- [



- [ ] README.md is c

- [ ] All features men
**Technical:**
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] No console errors in browser developer tools


- [ ] Challenges
- [ ] All grammar and spelling is correct
**Judging Criteria Alignment:**
- [ ] **Innovation** - Unique features are highligh





2. **Show, Don't Tell** - Use screenshots and video ext


- 📱 **Native Mobile Apps** - iOS and Android versions
- 🎮 **Gamepad Support** - Controller integration
- 🔊 **Custom Soundtracks** - Player music uploads
- 💾 **Cloud Sync** - Cross-device progress

**Community Features:**
- 👤 **Profile Customization** - Avatars, banners, titles
- 💬 **In-game Chat** - Social features
- 📊 **Clan System** - Team-based competitions
- 🎨 **User-generated Content** - Custom level editor

---

## 🎥 Demo Video Script (2-3 minutes)

**[0:00-0:15] Hook**
- Show polluted world transforming to clean environment
- Title reveal: "EcoRise - Restore the Planet"

**[0:15-0:45] Core Gameplay**
- Demonstrate matching 3 tiles
- Show combo chain and score multipliers
- Reveal educational card pop-up

**[0:45-1:15] Unique Features**
- Show particle trail collision system
- Demonstrate power-up activation (Supernova)
- Display heatmap analytics overlay

**[1:15-1:45] Game Modes**
- Quick cuts: Campaign → Daily Challenge → Tournament
- Show leaderboard with player rankings
- Badge showcase screen

**[1:45-2:15] Educational Impact**
- Highlight CO₂ reduction counter
- Show educational cards for different tile types
- Display total impact statistics

**[2:15-2:30] Call to Action**
- "Save the planet, one match at a time"
- GitHub Spark URL overlay
- Social media handles

---

## 📸 Screenshot Checklist

Required screenshots for strong submission:

- [ ] **Main Menu** - Level select screen showing biome variety
- [ ] **Active Gameplay** - Mid-match with particle trails visible
- [ ] **Educational Card** - Pop-up showing climate fact
- [ ] **Power-Up Animation** - Supernova or Tsunami effect
- [ ] **Daily Challenge** - Challenge interface with streak counter
- [ ] **Tournament Leaderboard** - Competitive rankings
- [ ] **Badge Showcase** - Achievement display page
- [ ] **Collision Heatmap** - Analytics overlay on game grid
- [ ] **Level Complete** - Victory screen with stats
- [ ] **Tutorial Overlay** - Help system for new players

---

## 🔗 Links to Include

**Required:**
- [ ] Live game URL (GitHub Spark deployment)
- [ ] Source code repository (if public)
- [ ] Demo video (YouTube/Vimeo)

**Optional but Recommended:**
- [ ] Discord server for community
- [ ] Twitter/X for updates
- [ ] Itch.io mirror build
- [ ] Documentation website

---

## ✅ Pre-Submission Checklist

**Content:**
- [ ] README.md is complete and professional
- [ ] All screenshots are high-quality (1920x1080 or higher)
- [ ] Demo video is under 3 minutes, engaging, and clear
- [ ] Game is fully playable with no critical bugs
- [ ] All features mentioned in submission are functional

**Technical:**
- [ ] Game loads quickly (<5 seconds)
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Mobile responsive (test on phone/tablet)
- [ ] No console errors in browser developer tools
- [ ] Audio controls work properly

**Presentation:**
- [ ] Tagline is compelling and under 60 characters
- [ ] Description clearly explains what makes game unique
- [ ] Challenges section shows problem-solving ability
- [ ] What's next section demonstrates vision
- [ ] All grammar and spelling is correct

**Judging Criteria Alignment:**
- [ ] **Clarity** - Submission explains game clearly
- [ ] **Innovation** - Unique features are highlighted
- [ ] **Impact Potential** - Educational value is emphasized
- [ ] **Feasibility** - Game is complete and polished
- [ ] **Presentation** - Professional, engaging materials

---

## 💡 Tips for Maximum Impact

### Writing Your Submission

1. **Lead with Impact** - Start with the climate education angle
2. **Show, Don't Tell** - Use screenshots and video extensively
3. **Highlight Innovation** - Emphasize collision physics and analytics
4. **Quantify Success** - Mention 38+ iterations, 16 levels, 9 badges, etc.
5. **Be Authentic** - Share genuine challenges and learning moments

### Video Production

1. **Hook Immediately** - First 10 seconds must grab attention
2. **Show Gameplay** - Actual footage, not just menu screens
3. **Demonstrate Uniqueness** - Focus on collision system and education
4. **Keep Pace Up** - Quick cuts, energetic music
5. **End with CTA** - Clear next step for viewers

### Screenshot Selection

1. **Variety** - Show different aspects of game
2. **Action Shots** - Capture exciting moments, not static screens
3. **Quality** - Full resolution, no compression artifacts
4. **Annotations** - Consider adding text overlays explaining features
5. **Visual Appeal** - Choose moments with interesting colors/effects

---

## 🏆 Why EcoRise Wins

### Against Judging Criteria

**Clarity (20%)** ⭐⭐⭐⭐⭐
- Instantly understandable: match tiles, reduce pollution
- Clear visual communication through icons and colors
- Comprehensive tutorial system for new players

**Innovation (25%)** ⭐⭐⭐⭐⭐
- Unique particle collision physics system
- First match-3 game with educational climate integration
- Advanced analytics (heatmaps, time-based statistics)
- Multi-tier difficulty with EXTREME mode

**Impact Potential (25%)** ⭐⭐⭐⭐⭐
- Addresses critical climate education need
- Makes learning about sustainability fun and engaging
- Scalable to global audience (web-based)
- Measurable impact tracking (CO₂ reduction counter)

**Feasibility (15%)** ⭐⭐⭐⭐⭐
- Fully functional and deployed
- 16 complete levels + daily challenges + tournaments
- Polished UI/UX with professional presentation
- Proven stable across 38 iterations

**Presentation (15%)** ⭐⭐⭐⭐⭐
- Professional design with cohesive visual language
- Comprehensive documentation
- Engaging demo materials
- Smooth, bug-free experience

---

**Good luck with your submission! 🍀**

*Remember: You've built something truly special that combines entertainment with education. Let your passion for the project shine through in your submission!*
### Video Production

1. **Hook Immediately** - First 10 seconds must grab attention
2. **Show Gameplay** - Actual footage, not just menu screens
3. **Demonstrate Uniqueness** - Focus on collision system and education
4. **Keep Pace Up** - Quick cuts, energetic music
5. **End with CTA** - Clear next step for viewers

### Screenshot Selection

1. **Variety** - Show different aspects of game
2. **Action Shots** - Capture exciting moments, not static screens
3. **Quality** - Full resolution, no compression artifacts
4. **Annotations** - Consider adding text overlays explaining features
5. **Visual Appeal** - Choose moments with interesting colors/effects

---

## 🏆 Why EcoRise Wins

### Against Judging Criteria

**Clarity (20%)** ⭐⭐⭐⭐⭐
- Instantly understandable: match tiles, reduce pollution
- Clear visual communication through icons and colors
- Comprehensive tutorial system for new players

**Innovation (25%)** ⭐⭐⭐⭐⭐
- Unique particle collision physics system
- First match-3 game with educational climate integration
- Advanced analytics (heatmaps, time-based statistics)
- Multi-tier difficulty with EXTREME mode

**Impact Potential (25%)** ⭐⭐⭐⭐⭐
- Addresses critical climate education need
- Makes learning about sustainability fun and engaging
- Scalable to global audience (web-based)
- Measurable impact tracking (CO₂ reduction counter)

**Feasibility (15%)** ⭐⭐⭐⭐⭐
- Fully functional and deployed
- 16 complete levels + daily challenges + tournaments
- Polished UI/UX with professional presentation
- Proven stable across 38 iterations

**Presentation (15%)** ⭐⭐⭐⭐⭐
- Professional design with cohesive visual language
- Comprehensive documentation
- Engaging demo materials
- Smooth, bug-free experience

---

**Good luck with your submission! 🍀**

*Remember: You've built something truly special that combines entertainment with education. Let your passion for the project shine through in your submission!*
