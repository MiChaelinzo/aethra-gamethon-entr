# 🌍 EcoRise - AETHRA GLOBAL GAMETHON 2025 Submission

## 📝 Game Description

### Title
**EcoRise: Restore the Planet**

### Genre
Educational Puzzle-Adventure Game (Match-3 Mechanics)

### Core Concept
An engaging climate-action puzzle game where players restore Earth's ecosystems by matching eco-solution tiles, learning about real environmental impact, and competing in daily challenges and weekly tournaments.

### Target Audience
- Ages 13+ (aligned with hackathon requirements)
- Students interested in environmental science and sustainability
- Casual gamers who enjoy puzzle mechanics with purpose
- Educators looking for interactive climate education tools

### Gameplay Overview
Players match eco-solution tiles (solar panels, trees, wind turbines, recycling) to clean pollution and restore diverse biomes including forests, deserts, oceans, cities, tundras, and rainforests. Each successful match reduces CO₂ and transforms polluted landscapes into thriving ecosystems.

### Compelling Pitch
**"What if fighting climate change felt like your favorite puzzle game?"** EcoRise transforms environmental action into an addictive match-3 adventure where every move matters. Restore polluted landscapes, unlock rare power-ups, compete in global tournaments, and watch your cumulative CO₂ reduction grow with each level—all while learning real climate solutions that work.

---

## 🎮 Gameplay Mechanics

### What Makes This Game Unique?

1. **Real Environmental Impact Education**
   - Every tile represents actual climate solutions (renewable energy, reforestation, ocean cleanup)
   - Educational pop-ups teach real CO₂ reduction statistics
   - Players see cumulative environmental impact measured in kg of CO₂ reduced

2. **Dynamic Biome System**
   - 6 unique biomes with specialized tiles (ice crystals in tundra, exotic orchids in rainforest)
   - Visual transformation from polluted to restored environments
   - Background gradients and music adapt to each ecosystem

3. **Competitive Community Features**
   - Daily challenges with exclusive power-up rewards
   - Weekly tournaments with top 10 rankings and prestigious badges
   - Global leaderboard tracking scores, CO₂ reduction, and streak days
   - Badge showcase system (Streak Master, Eco Warrior, Champion, etc.)

4. **Particle Trail Collision System**
   - Mouse trails that follow cursor with biome-specific themes
   - Trail collisions create score multipliers (2x, 3x, 5x+)
   - Collision heatmaps show most active zones over time
   - Statistical analytics tracking collision patterns by hour/day/biome

5. **Mega Power-Up Animations**
   - 5 rare power-ups with full-screen spectacles (Supernova, Tsunami, Earthquake, Meteor, Phoenix)
   - Synthesized sound effects for all achievements
   - Procedural background music that changes per biome

### Core Mechanics

**Tile Matching**
- Click adjacent tiles to swap positions
- Match 3 or more identical tiles to collect eco-solutions
- Power-up tiles (2-3% spawn rate) trigger mega-effects
- Combo system multiplies scores for consecutive matches

**Resource Management**
- Limited moves per level (typically 15-30)
- Pollution meter decreases with each match
- Score targets vary by biome difficulty
- Strategic planning required for optimal solutions

**Progression System**
- 8 progressive levels across 6 biomes
- Daily challenges unlock exclusive power-ups
- Weekly tournaments provide competitive goals
- Badge collection for long-term achievement tracking

### Controls

**Desktop**
- Mouse click: Select and swap tiles
- Keyboard shortcuts:
  - `Ctrl+P`: Toggle particle trails
  - `Ctrl+Shift+P`: Cycle particle themes
  - `Ctrl+H`: Toggle collision heatmap
  - `Ctrl+S`: View collision statistics

**Mobile/Touch**
- Tap: Select tiles
- Tap adjacent: Swap and match
- All controls optimized for touch with 56px+ targets

### Win/Loss Conditions

**Win Conditions**
- Reach target score before running out of moves
- Daily challenges: Complete specific objectives (e.g., "Match 10 solar panels")
- Tournaments: Highest score in the week wins top placement

**Loss Conditions**
- Exceed move limit without reaching target score
- No valid moves remaining on board (triggers auto-shuffle with warning)

**Success States**
- Level completion with star ratings (1-3 stars based on score)
- Badge unlocks (audio + confetti celebration)
- Power-up acquisition from daily challenges
- Tournament placement (top 10 receives badges)

### Objectives
- **Primary**: Restore 6 major biomes by completing 8 progressive levels
- **Secondary**: Build a 7-day streak for Streak Master badge
- **Competitive**: Place in top 10 of weekly tournaments
- **Collection**: Unlock all 5 rare power-ups
- **Mastery**: Reduce 100,000 kg of CO₂ for Eco Warrior badge

---

## 🎨 Technical Details

### Engine/Tools Used
- **React 19** with TypeScript for robust component architecture
- **Framer Motion 12** for smooth animations and transitions
- **Vite 7** for fast development and optimized production builds
- **Tailwind CSS 4** with custom OKLCH color system
- **Shadcn UI v4** component library for polished interface
- **Web Audio API** for synthesized sound effects and procedural music
- **Spark Runtime SDK** for persistent state management and user authentication

### Platform(s)
- **Primary**: Web browsers (Chrome, Firefox, Safari, Edge)
- **Responsive**: Desktop (1920x1080+), tablet (768px+), mobile (375px+)
- **Progressive Web App**: Can be installed as standalone app

### System Requirements

**Minimum**
- Modern web browser with JavaScript enabled
- 2GB RAM
- Internet connection (initial load only)
- Screen resolution: 375x667 (mobile) or higher

**Recommended**
- Desktop browser on 1080p+ display
- 4GB RAM for smooth particle effects
- Hardware acceleration enabled for optimal graphics

**Browser Compatibility**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- No plugins or extensions required

---

## 📂 Submission Package

### Playable Game File(s)
- **Live Web Application**: [Your deployed URL here]
- **Source Code Repository**: GitHub repository (link to be added)
- **Build Output**: Optimized static files in `/dist` directory

### Installation/Launch Instructions

**Option 1: Play Online (Recommended)**
1. Visit the deployed URL
2. Game loads automatically in your browser
3. No installation required

**Option 2: Run Locally**
```bash
# Clone the repository
git clone [repository-url]
cd spark-template

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:5173
```

**Option 3: Build for Production**
```bash
# Install and build
npm install
npm run build

# Serve the /dist folder with any static file server
npx serve dist
```

### Gameplay Video/Trailer
**[Video link to be added]**

**Suggested video content:**
- 30-second intro showing game title and concept
- Demonstrate basic tile matching in Forest biome
- Show ecosystem transformation from polluted to restored
- Highlight power-up mega-animation (Supernova or Phoenix)
- Demonstrate daily challenge completion and power-up unlock
- Show tournament leaderboard and badge showcase
- Display particle trail collision system with multipliers
- End with statistics panel showing global impact

### Screenshots

**Recommended screenshots to capture:**

1. **Main Menu** - Level select screen showing all 6 biomes
2. **Forest Level Gameplay** - Active match with combo counter
3. **Power-Up Animation** - Supernova explosion mid-screen
4. **Ocean Biome** - Restored ecosystem with vibrant blue gradient
5. **Daily Challenge Modal** - Shows streak counter and reward
6. **Tournament View** - Top 10 leaderboard with badges
7. **Badge Showcase** - Collection of earned badges with tooltips
8. **Collision System** - Heatmap overlay showing hot zones
9. **Statistics Panel** - Charts showing collision analytics
10. **Level Complete** - Celebration screen with CO₂ stats

### Link to Game
**Production URL**: [To be added after deployment]

---

## 🎯 Alignment with Hackathon Themes

### Climate Action & Sustainability ✅
- Primary focus on environmental restoration
- Educates about real climate solutions (renewable energy, reforestation)
- Tracks cumulative CO₂ reduction across all players
- Each biome represents critical Earth ecosystems needing protection

### Educational Gaming ✅
- Pop-up info cards teach real environmental statistics
- Tile types represent actual technologies and solutions
- Players learn cause-and-effect of climate interventions
- Suitable for classroom use or independent learning

### Community Building ✅
- Global leaderboard fosters friendly competition
- Weekly tournaments create recurring engagement
- Badge system rewards consistent participation
- Streak mechanics encourage daily connection

### Real-World Problem Solving ✅
- Addresses climate change through interactive gameplay
- Makes environmental action feel achievable and rewarding
- Translates complex issues into accessible mechanics
- Inspires players to think about solutions beyond the game

### Innovative Mechanics ✅
- Particle collision system with score multipliers
- Collision heatmaps and statistical analytics
- Procedural music generation based on biome
- Dynamic ecosystem transformation visuals

---

## 🏆 Key Features Summary

### Implemented Features

✅ **8 Progressive Levels** across 6 unique biomes  
✅ **Daily Challenges** with exclusive power-up rewards  
✅ **Weekly Tournaments** with top 10 rankings  
✅ **Badge System** (10+ unique badges)  
✅ **Global Leaderboard** with multiple sort options  
✅ **5 Mega Power-Ups** with full-screen animations  
✅ **Synthesized Sound Effects** (8+ distinct sounds)  
✅ **Procedural Background Music** (7 biome themes)  
✅ **Music Visualizer** (3 styles: bars, circular, waveform)  
✅ **Particle Trail System** with mouse cursor interaction  
✅ **Collision Multipliers** (2x, 3x, 5x+ bonuses)  
✅ **Collision Heatmaps** showing activity zones  
✅ **Statistics Dashboard** with time-based analytics  
✅ **Educational Content** with real climate facts  
✅ **Persistent Progress** across sessions  
✅ **Mobile Responsive** design  
✅ **Smooth Animations** using Framer Motion  
✅ **Custom Color System** with OKLCH values  

---

## 📊 Future Roadmap

### Potential Expansions
- Multiplayer cooperative mode for team-based restoration
- AR integration for real-world environment scanning
- Integration with real environmental organizations
- Player-created custom levels and challenges
- Social features (friend challenges, shared achievements)
- Expanded biomes (coral reefs, wetlands, grasslands)
- Seasonal events and limited-time power-ups

---

## 👥 Credits

**Development**: [Your name/team name]  
**Framework**: React + TypeScript  
**UI Components**: Shadcn UI  
**Icons**: Phosphor Icons  
**Fonts**: Space Grotesk, Crimson Pro (Google Fonts)  
**Hosting**: [Your hosting platform]

---

## 📜 License

MIT License - Copyright GitHub, Inc.

---

## 🔗 Links

- **Live Game**: [URL to be added]
- **Source Code**: [GitHub URL to be added]
- **Video Demo**: [Video URL to be added]
- **Discord**: https://discord.gg/tyna9bjWPj (AETHRA server)

---

## 📝 Additional Notes for Judges

### Why EcoRise Stands Out

**Clarity**: The game's purpose is immediately obvious—match tiles to restore ecosystems. Mechanics are intuitive for anyone familiar with match-3 games.

**Innovation**: While match-3 is familiar, the collision system, procedural audio, heatmap analytics, and tournament structure create fresh twists. The educational integration feels natural, not forced.

**Impact Potential**: This game could genuinely inspire environmental awareness in students. Teachers could use it in classrooms. Players track real CO₂ metrics, connecting gameplay to real-world scale.

**Feasibility**: Built with production-ready web technologies. Fully functional with no placeholder features. Scales from mobile to desktop. No external API dependencies beyond authentication.

**Presentation**: Polished UI with cohesive design language. Smooth animations. Comprehensive feedback systems (visual, audio, statistical). Professional documentation and clear onboarding.

### Development Journey

This game represents [X hours] of development, focusing on:
- Creating a satisfying core gameplay loop
- Building competitive features that drive engagement
- Polishing audio-visual feedback for maximum impact
- Ensuring educational content enhances rather than interrupts play
- Implementing analytics to show players their patterns and progress

Thank you for considering EcoRise for AETHRA GLOBAL GAMETHON 2025! 🌍✨
