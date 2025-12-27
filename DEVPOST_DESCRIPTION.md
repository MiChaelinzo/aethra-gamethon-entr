# Copy-Paste This Into Devpost Submission Form

---

## GAME TITLE
EcoRise: Restore the Planet

---

## TAGLINE (60 characters max)
Fight climate change through addictive puzzle gameplay

---

## SHORT DESCRIPTION (200 characters)
An educational match-3 game where players restore Earth's ecosystems by matching eco-solution tiles, competing in tournaments, and learning real climate science through engaging gameplay.

---

## FULL DESCRIPTION

### What It Does

EcoRise transforms climate education into an addictive puzzle-adventure. Players match tiles representing real environmental solutions—solar panels, wind turbines, trees, and recycling—to clean pollution and restore six unique biomes: forests, deserts, oceans, cities, tundras, and rainforests.

**Key Features:**

🌍 **8 Progressive Levels** - Each level presents a new biome with unique environmental challenges and specialized tiles (ice crystals in tundra, exotic orchids in rainforest)

🏆 **Daily Challenges** - New 24-hour challenges with exclusive power-up rewards. Build a 7-day streak to earn the legendary Streak Master badge!

⚔️ **Weekly Tournaments** - Compete globally for top 10 rankings. Winners receive prestigious badges (Champion, Runner-Up, Top 10) displayed on profiles

🎯 **5 Mega Power-Ups** - Unlock rare tiles with spectacular full-screen animations:
- ☀️ Supernova: Explosive radial burst
- 🌊 Tsunami: Cleansing wave effect  
- 🏔️ Earthquake: Board-shaking reshuffle
- ☄️ Meteor: Cosmic impact
- 🔥 Phoenix: Rebirth transformation

✨ **Particle Collision System** - Mouse trails interact with matches, creating score multipliers (2x, 3x, 5x+) when collisions occur. View heatmaps showing your most active zones!

📊 **Global Leaderboard** - Track your score, CO₂ reduced, challenges completed, and streak against other players worldwide

🎵 **Dynamic Audio** - Procedurally-generated background music adapts to each biome, plus synthesized sound effects for every achievement

### How We Built It

**Tech Stack:**
- React 19 + TypeScript for robust component architecture
- Framer Motion for 60fps animations
- Tailwind CSS 4 with custom OKLCH color system
- Shadcn UI v4 for polished components
- Web Audio API for procedural music and synthesized sound effects
- Spark Runtime SDK for state persistence and authentication
- Vite 7 for optimized builds

**Key Development Challenges:**
1. **Collision Detection System** - Built custom collision detection for particle trails intersecting with matched tiles, calculating multipliers based on overlap density
2. **Procedural Audio** - Implemented Web Audio API oscillators and filters to generate 7 unique biome soundscapes without audio files
3. **Heatmap Analytics** - Created time-based analytics tracking collision patterns by hour/day/biome with data visualization
4. **Smooth Animations** - Balanced visual spectacle (power-up animations, particle effects) with 60fps performance on mobile

### Challenges We Faced

**Performance Optimization**: Initial particle systems spawned 500+ particles causing frame drops on mobile. Optimized by implementing particle pooling, lifecycle management, and adaptive spawn rates based on device capabilities.

**Tournament Ranking Logic**: Ensuring fair rankings with replay mechanics required careful state management—tracking best scores while preventing duplicate entries and handling edge cases like tied rankings.

**Educational Integration**: Finding the balance between engaging gameplay and educational content. Solved by creating non-intrusive info cards that appear on first encounters with new tile types, making learning feel organic rather than forced.

**Procedural Music**: Generating music that sounds musical (not random noise) while adapting to biome themes. Implemented chord progressions, scales, and biome-specific instrumentation (droning harmonics for desert, wave-like modulation for ocean).

### Accomplishments We're Proud Of

✅ **Full-Stack Game Mechanics** - Complete gameplay loop with progression, competition, and collection systems  
✅ **Polish & Feedback** - Every action has visual, audio, and statistical confirmation  
✅ **Educational Impact** - Real climate facts integrated seamlessly into gameplay  
✅ **Accessibility** - Responsive design works beautifully on mobile, tablet, and desktop  
✅ **Community Features** - Tournament system with badges creates genuine competitive engagement  
✅ **Innovation** - Collision multiplier system adds strategic depth unique to this game  

### What We Learned

**Game Design**: Creating satisfying feedback loops requires layering multiple systems—visual effects alone aren't enough. The combination of particles + sound + score multipliers + heatmap tracking creates addictive gameplay because players always have something new to discover.

**Web Audio API**: Procedural audio generation is powerful but requires careful tuning. Each oscillator's frequency, gain envelope, and filter cutoff affects perceived "musicality." We learned to think like synthesizer designers.

**Data Persistence**: Using functional updates (`setState(current => ...)`) is critical when working with async persistence APIs to avoid race conditions and data loss.

**Performance Budgets**: 60fps is non-negotiable. We learned to profile constantly, set particle limits, and use `will-change` CSS hints for animating elements.

### What's Next

**Immediate Roadmap:**
- 🤝 Multiplayer co-op mode where players collaborate to restore biomes
- 🌐 Integration with real environmental organizations (trees planted per X score)
- 📱 Progressive Web App features (offline play, push notifications for daily challenges)
- 🎨 Player-created custom levels with sharing system

**Long-Term Vision:**
- 🏫 Classroom integration tools for teachers
- 📊 Personal carbon footprint calculator tied to gameplay
- 🌍 Expanded biomes (coral reefs, wetlands, grasslands, mountains)
- 🎭 Narrative campaign mode with character-driven storytelling

---

## BUILT WITH

React, TypeScript, Framer Motion, Tailwind CSS, Shadcn UI, Web Audio API, Vite, Spark Runtime SDK

---

## LINKS

**Try It Now**: [Your deployed URL]  
**GitHub Repository**: [Your repo URL]  
**Video Demo**: [Your video URL]

---

## CATEGORY TAGS

🎮 Gaming  
📚 Education  
🌍 Environment  
♻️ Sustainability  
🎨 Web Design  
🏆 Gamification

---

## IMAGES/SCREENSHOTS TO UPLOAD

1. Main menu with level select (hero image)
2. Active gameplay with combo counter
3. Power-up animation (Supernova or Phoenix)
4. Daily challenge modal
5. Tournament leaderboard with badges
6. Collision heatmap overlay
7. Statistics dashboard
8. Badge showcase
9. Level complete celebration
10. Restored biome (before/after comparison)

---

## VIDEO SCRIPT (60-90 seconds)

[0:00-0:05] Title card: "EcoRise: Restore the Planet"

[0:05-0:15] Show main menu, pan across level select showing 6 biomes

[0:15-0:30] Gameplay demo: Make 3-4 matches, show combo counter increasing, pollution meter decreasing, background transforming from gray to vibrant green

[0:30-0:40] Trigger power-up (Supernova explosion or Phoenix rebirth) with full-screen animation

[0:40-0:50] Show daily challenge completion, power-up unlock notification, streak counter

[0:50-0:60] Display tournament leaderboard with top 10, zoom into badge showcase showing earned badges

[0:60-0:75] Show collision system: mouse trail following cursor, collisions creating multipliers, heatmap visualization

[0:75-0:85] Statistics panel with graphs showing collision patterns by hour/biome

[0:85-0:90] End card: "Play now! Fight climate change through puzzle gameplay" + URL

---

## PITCH NOTES FOR PRESENTATION

### Opening Hook (15 seconds)
"What if fighting climate change felt like your favorite puzzle game? EcoRise makes environmental action addictive."

### Problem Statement (20 seconds)
"Climate education often feels overwhelming or preachy. Students tune out. We need engaging ways to teach environmental solutions that actually stick."

### Solution (30 seconds)
"EcoRise disguises learning as entertainment. Players match tiles representing real climate solutions—solar panels, wind turbines, reforestation. Each match reduces CO₂, transforms polluted landscapes, and teaches real statistics through pop-up cards."

### Unique Value (45 seconds)
"But we didn't stop at education. EcoRise includes:
- Daily challenges with exclusive rewards
- Weekly tournaments with global rankings
- Particle collision system that creates score multipliers
- Procedurally-generated music for each biome
- Badge showcase tracking achievements

These competitive features turn a one-time play into a daily habit."

### Technical Achievement (30 seconds)
"Built with React and TypeScript, EcoRise runs smoothly on any device. We implemented custom collision detection, procedural audio generation with Web Audio API, and time-based analytics—all without external APIs or databases."

### Impact Potential (20 seconds)
"EcoRise can reach students globally via web browsers. Teachers can use it in classrooms. Players track cumulative CO₂ reduction, connecting their gameplay to real-world scale. We make climate action feel achievable."

### Closing (10 seconds)
"EcoRise proves educational games don't have to sacrifice fun for purpose. Let's restore the planet, one match at a time."

---

## FAQ RESPONSES

**Q: How does the game teach climate science?**
A: Info cards appear when players first encounter tile types, explaining real-world impact (e.g., "Solar panels reduce X kg CO₂ per year"). Players track cumulative CO₂ reduction across all games, making abstract concepts concrete.

**Q: What makes this different from other match-3 games?**
A: Three innovations: (1) Particle collision system creates strategic depth, (2) Daily challenges and tournaments drive engagement beyond single-player, (3) Educational integration feels natural, not forced.

**Q: Can teachers use this in classrooms?**
A: Yes! The game runs in any browser, requires no installation, and presents accurate environmental statistics. Perfect for science classes studying climate change, renewable energy, or ecosystems.

**Q: What are the system requirements?**
A: Any modern browser (Chrome, Firefox, Safari, Edge) on desktop, tablet, or mobile. No plugins needed. Game automatically adapts graphics quality to device capabilities.

**Q: Is there a mobile version?**
A: The game is fully responsive! The same web app works beautifully on mobile with touch-optimized controls and adjusted layouts.

---

**Good luck with your submission! This documentation should provide everything you need for a strong Devpost entry. 🌍🏆**
