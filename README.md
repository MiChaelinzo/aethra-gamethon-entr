# 🌍 EcoRise - Restore the Planet

**A Match-3 Puzzle Game for Climate Action & Environmental Education**

[![Game Type](https://img.shields.io/badge/Genre-Educational%20Puzzle-green)](https://github.com)
[![Platform](https://img.shields.io/badge/Platform-Web-blue)](https://github.com)
[![Status](https://img.shields.io/badge/Status-Complete-success)](https://github.com)

## 🎮 Game Overview

**EcoRise** is an innovative match-3 puzzle game that combines engaging gameplay with environmental education. Players restore polluted biomes by matching renewable energy sources and sustainable solutions, learning about real-world climate action while having fun.

### 🎯 Core Concept

Match 3 or more tiles of renewable energy sources (solar, wind, hydroelectric) to reduce pollution and restore Earth's biomes. Each successful match reduces CO₂ emissions and teaches players about sustainable technologies through interactive educational cards.

### 👥 Target Audience

- **Ages:** 13+ (suitable for teens and adults)
- **Players:** Single-player with competitive leaderboards
- **Interest:** Climate-conscious individuals, puzzle game enthusiasts, educational gaming fans

### 🎪 The Pitch

*"Save the planet one match at a time! EcoRise turns climate action into an addictive puzzle adventure where every move counts toward a greener future. Learn real environmental facts while competing globally to become the ultimate Eco Warrior!"*

---

## ✨ What Makes EcoRise Unique?

### 🌟 Innovation Highlights

1. **Educational Integration** - First-time tile matches trigger educational pop-ups with real climate facts
2. **Dynamic Biome System** - 8 unique biomes (Forest, Ocean, Desert, Mountain, Arctic, Savanna, Wetland, Coral Reef) + 8 EXTREME variants
3. **Mouse Trail Physics** - Advanced particle collision system with multipliers when trails intersect
4. **Adaptive Difficulty** - Normal and EXTREME modes with significantly harder challenges
5. **Social Impact Tracking** - Track total CO₂ reduction across all players

### 🎨 Unique Gameplay Mechanics

- **Collision Multipliers:** Particle trails interact during matches, creating score multipliers
- **Power-Up System:** Unlock special tiles (Supernova, Tsunami, Earthquake, Meteor, Phoenix) via daily challenges
- **Combo System:** Chain matches for escalating bonuses (up to 3x multiplier)
- **Dynamic Biome Effects:** Visual effects and music change based on current biome
- **Heat Mapping:** Track your most active collision zones across all levels

---

## 🎮 Gameplay Mechanics

### Core Mechanics

**Objective:** Match 3+ tiles to reduce pollution and reach target scores before running out of moves

**Controls:**
- **Mouse Click:** Select and swap adjacent tiles
- **Ctrl + P:** Toggle particle trail effects
- **Ctrl + Shift + P:** Cycle through unlocked particle themes
- **Ctrl + H:** Toggle collision heatmap overlay
- **Ctrl + S:** View detailed collision statistics

### Tile Types

- **Solar Panel** ☀️ - Clean energy from the sun (100 CO₂ impact)
- **Wind Turbine** 🌀 - Harness wind power (150 CO₂ impact)
- **Hydroelectric** 💧 - Water-generated electricity (120 CO₂ impact)
- **Geothermal** 🌋 - Earth's internal heat (180 CO₂ impact)
- **Nuclear** ⚛️ - High-output clean energy (200 CO₂ impact)
- **Biomass** 🌱 - Organic renewable fuel (90 CO₂ impact)

### Power-Ups (Unlockable)

- **Supernova** ☀️ - Massive solar burst (2.5x score multiplier)
- **Tsunami** 🌊 - Cleansing ocean wave (2.5x score multiplier)
- **Earthquake** 🏔️ - Tectonic transformation (2.5x score multiplier)
- **Meteor** ☄️ - Cosmic impact (2.5x score multiplier)
- **Phoenix** 🔥 - Rising from the ashes (2.5x score multiplier)

### Win/Loss Conditions

**Win:** Reach target score before running out of moves
**Loss:** Use all moves without reaching target score
**Auto-Shuffle:** Board automatically reshuffles when no valid moves remain

### Scoring System

- **3-match:** 100 points
- **4-match:** 200 points
- **5-match:** 350 points
- **Combo Multiplier:** +30% per consecutive match (max 3x)
- **Power-Up Multiplier:** 2.5x when power-up tile is matched
- **Collision Multiplier:** Dynamic bonus when particle trails intersect (2x-10x)

---

## 🏆 Game Modes & Features

### Campaign Mode
- **16 Total Levels** - 8 Normal + 8 EXTREME difficulty
- **Progressive Difficulty** - Each level increases challenge
- **Biome Progression** - Unlock new environments as you advance
- **Persistent Progress** - All progress automatically saved

### Daily Challenges
- **New Challenge Daily** - Fresh puzzle every 24 hours
- **Exclusive Rewards** - Unlock unique power-up tiles
- **Streak System** - Maintain consecutive days for bonuses
- **Streak Master Badge** - Complete 7 challenges in a row

### Tournament Mode
- **Weekly Competitions** - Limited-time high-score challenges
- **Global Leaderboards** - Compete against all players
- **Special Badges** - Champion, Runner-Up, Top 10 badges
- **Best Score Tracking** - Submit unlimited attempts, only best counts

### Badge System
- **🏆 Champion** - 1st place in tournament
- **🥈 Runner-Up** - 2nd place in tournament
- **🥉 Third Place** - 3rd place in tournament
- **🔟 Top 10** - Finish in top 10 of tournament
- **🔥 Streak Master** - 7-day challenge streak
- **🌍 Eco Warrior** - Reduce 100,000+ CO₂
- **⭐ Challenger** - Complete 25+ daily challenges
- **💀 EXTREME Master** - Complete all 8 EXTREME levels
- **🎮 Tournament Participant** - Enter any tournament

### Advanced Features

**Music Visualizer System**
- Dynamic audio visualizer synced to background music
- 3 visualizer styles: Bars, Circular, Waveform
- Biome-specific color themes
- Toggle music on/off with persistent preference

**Particle Trail System**
- Customizable mouse trail effects
- Unlockable themes matching power-ups
- Adjustable intensity (Low, Medium, High)
- Collision detection with score multipliers
- Keyboard shortcuts for quick control

**Collision Analytics**
- Real-time collision heatmap overlay
- Historical zone activation tracking
- Time-based statistics (hourly, daily patterns)
- Biome-specific collision data
- Peak hour/day analysis

---

## 🎨 Technical Details

### Engine & Tools
- **Framework:** React 19.2.0 + TypeScript 5.7.3
- **Build Tool:** Vite 7.2.6
- **UI Library:** Shadcn v4 + Radix UI
- **Styling:** Tailwind CSS 4.1.17
- **Animation:** Framer Motion 12.23.25
- **State Management:** React Hooks + Spark KV persistence
- **Icons:** Phosphor Icons React 2.1.10

### Platform(s)
- **Primary:** Web Browser (Desktop & Mobile responsive)
- **Hosting:** GitHub Spark (Serverless)
- **Database:** Built-in Spark KV (key-value store)

### System Requirements

**Minimum:**
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript enabled
- 2GB RAM
- Internet connection

**Recommended:**
- Latest version of Chrome or Firefox
- 4GB+ RAM
- Stable internet connection for leaderboards

### Technical Innovations

1. **Collision Detection Algorithm** - Custom physics for particle trail intersections
2. **Adaptive Grid System** - Dynamic board sizes (4x4 to 8x8)
3. **Real-time Heatmap** - Canvas-based collision zone visualization
4. **Persistent State** - All progress saved using Spark KV API
5. **Audio Synthesis** - Web Audio API for biome-specific soundscapes

---

## 📦 Installation & Launch

### Quick Start (Web)

**Live Demo:** [Add your GitHub Spark URL here]

Simply open the link in any modern web browser - no installation required!

### Local Development

```bash
# Clone the repository
git clone [your-repo-url]

# Navigate to project directory
cd spark-template

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## 🎬 Gameplay Video

[Include a link to your gameplay video or trailer here - highly recommended for Devpost]

### Sample Gameplay Flow

1. **Select Level** - Choose from available biomes
2. **Tutorial Pop-up** - First-time players see interactive guide
3. **Match Tiles** - Click adjacent tiles to swap
4. **Educational Cards** - Learn about each renewable energy type
5. **Build Combos** - Chain matches for multipliers
6. **Unlock Power-Ups** - Complete daily challenges
7. **Track Progress** - View stats and leaderboards
8. **Earn Badges** - Achieve milestones

---

## 📸 Screenshots

[Add 4-6 high-quality screenshots showing:]
1. Main menu with level selection
2. Active gameplay with particle effects
3. Educational card pop-up
4. Daily challenge interface
5. Leaderboard/tournament view
6. Badge showcase page
7. Collision heatmap overlay
8. Level completion screen

---

## 🌍 Impact & Educational Value

### Climate Action Themes

**EcoRise addresses multiple UN Sustainable Development Goals:**
- **SDG 7:** Affordable & Clean Energy
- **SDG 13:** Climate Action
- **SDG 12:** Responsible Consumption

### Real-World Learning

Each tile type includes:
- **Factual Information** - Real statistics about renewable energy
- **CO₂ Impact** - Quantified environmental benefit
- **Visual Representation** - Recognizable iconography
- **Practical Applications** - How technology is used today

### Measurable Impact

- **Total CO₂ Reduced** - Cumulative across all players
- **Awareness Metrics** - Tiles discovered and facts learned
- **Engagement Tracking** - Daily challenge completion rates
- **Community Building** - Global leaderboards foster friendly competition

---

## 🏅 Why EcoRise Deserves to Win

### ✅ Clarity
Crystal-clear concept: match renewable energy tiles to fight pollution. Simple to understand, immediately engaging.

### 🚀 Innovation
First match-3 game combining:
- Particle collision physics
- Real-time analytics
- Educational integration
- Social impact tracking

### 💡 Impact Potential
Educates players about climate solutions while entertaining them. Every match reinforces positive environmental messaging.

### ⚙️ Feasibility
Fully functional and polished. Complete with 16 levels, daily challenges, tournaments, and advanced analytics.

### 🎨 Presentation
Professional UI, smooth animations, responsive design, comprehensive documentation, and engaging gameplay loop.

---

## 👨‍💻 Development Journey

**Total Features Implemented:** 38+ major iterations

Key milestones:
- ✅ Core match-3 mechanics
- ✅ Educational card system
- ✅ 8 unique biomes + EXTREME variants
- ✅ Daily challenges & tournaments
- ✅ Badge system (9 unique badges)
- ✅ Music visualizer (3 styles)
- ✅ Particle trail system (6 themes)
- ✅ Collision physics & multipliers
- ✅ Heatmap analytics
- ✅ Time-based statistics
- ✅ Interactive tutorial
- ✅ Global leaderboards
- ✅ Persistent state management

---

## 🙏 Acknowledgments

Created for **AETHRA GLOBAL GAMETHON 2025**

**Theme:** Games that raise awareness about climate action and sustainability

**Technologies:** Built with modern web technologies and GitHub Spark platform

**Inspiration:** Combining the addictive gameplay of match-3 puzzles with meaningful climate education

---

## 📄 License

[[MIT]
](https://github.com/MiChaelinzo/aethra-gamethon-entr/blob/main/LICENSE)

---

## 📧 Contact

**Discord:** @MiChaelinzo
**Email:** N/A
**GitHub:** [[GitHub profile]](https://github.com/MiChaelinzo)

---

**#ClimateAction #EducationalGaming #Match3 #Sustainability #GameDev #AETHRA2025**
