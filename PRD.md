# Planning Guide

An educational puzzle-adventure game where players restore Earth's ecosystems by solving climate-action challenges, combining engaging gameplay with real environmental awareness.

**Experience Qualities**:
1. **Empowering** - Players feel they're making meaningful choices that create visible positive change in the game world
2. **Educational** - Seamlessly teaches real climate solutions (renewable energy, reforestation, ocean cleanup) through interactive mechanics
3. **Satisfying** - Immediate visual feedback with vibrant transformations as polluted areas become thriving ecosystems

**Complexity Level**: Light Application (multiple features with basic state)
This is a tile-based puzzle game with multiple levels, persistent progress tracking, and educational content integration. It has distinct game mechanics (tile matching, resource management) but remains focused and accessible for a hackathon submission.

## Essential Features

### Daily Challenges System
- **Functionality**: Every 24 hours, a new unique challenge is generated with special conditions, time-limited availability, and exclusive power-up rewards
- **Purpose**: Encourages daily engagement, rewards consistent play with streak bonuses, and unlocks rare power-ups that can spawn in regular gameplay
- **Trigger**: Player clicks "Daily Challenge" button from main menu
- **Progression**: View challenge details → See special conditions and reward → Start challenge → Complete within move limit → Unlock exclusive power-up → Power-up now spawns in all future games
- **Success criteria**: Challenge rotates daily at midnight, streak counter increments for consecutive days, unlocked power-ups persist and appear in regular gameplay (2-3% spawn rate)

### Global Leaderboard
- **Functionality**: Real-time competitive rankings showing all players' scores, CO2 reduced, challenges completed, and streak days. Multiple sort options (score, CO2, challenges, streak)
- **Purpose**: Creates social competition, motivates players to improve, showcases top performers, and validates player achievements
- **Trigger**: Player clicks "Leaderboard" button from main menu
- **Progression**: Open leaderboard → View rankings → See own position highlighted → Sort by different metrics → Compare stats with others
- **Success criteria**: Leaderboard updates automatically after each game, shows player avatars and usernames, highlights current user's position, displays top 3 with special badges

### Weekly Tournament System
- **Functionality**: Weekly competitive events with rotating biomes and special rules. Each tournament runs Monday-Sunday with unique challenges: Rainforest Revival, Arctic Preservation, Ocean Clean-Up, or Global Reforestation. Top 10 players receive CO2 bonus prizes (10,000 kg for 1st down to 1,000 kg for 10th). Players can replay unlimited times to improve their ranking. **Tournament badges are awarded to top 10 finishers and displayed on player profiles throughout the leaderboard and tournament views.**
- **Purpose**: Creates recurring engagement, fosters competitive community, rewards skilled players, provides fresh weekly content, and offers prestigious badges for achievement
- **Trigger**: Player clicks "Weekly Tournament" button from main menu
- **Progression**: View tournament details → See time remaining and special rules → Enter tournament → Complete challenge → Submit score → View top 10 rankings with badges → Replay to improve rank → Receive badge and prize at week end if in top 10
- **Success criteria**: Tournament rotates weekly automatically, leaderboard shows top 10 with ranks and badges, player's best score is kept, special rules affect gameplay (e.g., "Rainforest tiles worth 2x points"), prizes and badges are awarded correctly, countdown timer shows time remaining, replays replace score only if higher

### Tournament Badge System
- **Functionality**: Animated badge collection with synthesized audio feedback displayed on player profiles showing tournament placements (Champion 🥇, Runner-Up 🥈, Third Place 🥉, Top 10 🏆), achievement badges (Streak Master 🔥, Eco Warrior ♻️, Challenger ⚡), and participant badges. Each badge features unique colors, glowing animations, distinct sound effects, and tooltips with details. Players can click any profile to view their full badge collection and tournament history.
- **Purpose**: Creates prestigious rewards for competitive play, provides satisfying audio-visual feedback for achievements, builds social proof of skill, and encourages long-term progression across all game modes
- **Trigger**: Badges appear automatically with sound when earned; visible on player cards in leaderboard and tournament views; clicking a player opens their full profile
- **Progression**: Earn tournament placement or achievement → Badge appears with celebration sound → Other players see badges → Click profile to view full collection → See tournament history and detailed stats
- **Success criteria**: Badges display with smooth animations and appropriate sound effects (champion fanfare, streak master ascending arpeggio, standard badge unlock chime), show accurate rank/achievement, appear on all instances of player profile, clicking opens detailed profile modal with stats and badge gallery, tournament history shows past placements

### Sound Effects System
- **Functionality**: Web Audio API-powered synthesized sound effects that provide immediate audio feedback for achievements and interactions, including badge unlocks, power-up activations, and milestone celebrations
- **Purpose**: Enhances satisfaction and reward feeling for achievements, makes moments of success more memorable and impactful, adds another layer of polish to the game experience
- **Trigger**: Sounds automatically play when specific events occur (badge earned, power-up matched, achievement unlocked, streak milestone reached)
- **Progression**: Event occurs → Appropriate sound plays → Visual and audio feedback combine for maximum impact
- **Success criteria**: Five distinct synthesized sounds using oscillators and gain nodes:
  - **Badge Unlock**: Ascending three-tone chime (C5→C6, 400ms) - plays for standard badges (participant, runner-up, third-place, top-10)
  - **Streak Master**: Dramatic five-note ascending cascade (C5→E5→G5→C6→E6, 500ms total, 80ms intervals) with bass note accompaniment - plays for Streak Master badge
  - **Champion**: Triumphant trumpet-like fanfare (C5→E5→G5→C6, 1000ms) with high shimmer overtones - plays for tournament Champion badge
  - **Power-Up**: Rising square wave with filter sweep (A3→A4, 300ms) - plays when power-up tiles are matched or unlocked
  - **Achievement**: Warm three-note chord (C5+E5+G5, 600ms) with high sparkle note - plays for Eco Warrior and Challenger badges

### Power-Up Collection System
- **Functionality**: Visual collection display showing all 5 power-ups (Supernova, Tsunami, Earthquake, Meteor, Phoenix), tracking which are locked/unlocked
- **Purpose**: Provides long-term progression goal, incentivizes daily challenge completion, creates collection mechanic
- **Trigger**: Displayed on main menu after first daily challenge is completed
- **Progression**: Complete daily challenge → Unlock power-up → See in collection → Power-up spawns in games → Build complete collection
- **Success criteria**: Shows 5/5 power-ups with lock icons for incomplete, unlocked power-ups spawn in regular levels at 2-3% rate, tooltips explain how to unlock

### Level-Based Gameplay
- **Functionality**: Progressive stages where players restore different biomes (forest, desert, ocean, city, tundra, rainforest) across 8 challenging levels
- **Purpose**: Creates achievable goals while teaching about diverse environmental challenges across Earth's most critical ecosystems
- **Trigger**: Player clicks "Start Game" or "Next Level" button
- **Progression**: Select Level → View Objective → Match tiles to collect resources → Deploy solutions → Watch ecosystem transform → Complete level
- **Success criteria**: Level completes when target score is reached within the move limit; players see ecosystem transformation in real-time

### Tile-Matching Mechanic
- **Functionality**: Grid-based system where players match 3+ adjacent tiles representing eco-solutions. Each biome features unique tiles: general solutions (solar panels, trees, wind turbines, recycling bins), tundra-specific (ice crystals, arctic wildlife, clean air auroras), rainforest-specific (exotic orchids, jaguars, medicinal plants), and **rare power-up tiles** (supernova, tsunami, earthquake, meteor, phoenix) that spawn randomly with 2-3% chance
- **Purpose**: Familiar, accessible mechanic that reinforces learning through repetition while introducing biome-specific environmental challenges and exciting power-up moments
- **Trigger**: Player clicks/taps tiles to swap adjacent pieces
- **Progression**: Select tile → Swap with adjacent → Match forms → Resources collected → Solution deployed → (Power-up triggers mega-animation if matched)
- **Success criteria**: Valid matches award points and resources; power-ups trigger spectacular screen-wide animations and clear all adjacent tiles with 3x score multiplier

### Power-Up System
- **Functionality**: Five ultra-rare power-up tiles with unique mega-animations that trigger full-screen visual spectacles when matched, accompanied by synthesized sound effects
- **Purpose**: Creates moments of excitement and surprise, rewarding players with spectacular effects, massive point bonuses, and satisfying audio feedback
- **Trigger**: Power-ups spawn randomly (2-3% chance) and activate when successfully matched
- **Progression**: Discover power-up → Match it → Full-screen mega-animation plays with power-up sound → All adjacent tiles cleared → Massive CO2 reduction bonus
- **Success criteria**: Each power-up has a distinct animation:
  - **Supernova** ☀️: Explosive radial burst with 40+ golden particles, 1500ms duration, clears 3x3 area (10,000 kg CO2)
  - **Tsunami** 🌊: Rising blue wave sweeps across screen, 1300ms duration, clears entire row/column (8,500 kg CO2)
  - **Earthquake** 🏔️: Screen shakes with tectonic rumble, 1200ms duration, strategic board reshuffle (7,000 kg CO2)
  - **Meteor** ☄️: Purple cosmic impacts rain down, 1400ms duration, clears all tiles of chosen type (9,500 kg CO2)
  - **Phoenix** 🔥: Rebirth animation with 50+ flame particles, 1800ms duration, transforms board optimally (12,000 kg CO2)

### Visual Ecosystem Transformation
- **Functionality**: Background gradually transforms from polluted (gray, smoggy) to healthy (vibrant, green) based on player progress
- **Purpose**: Provides powerful visual feedback showing direct impact of player actions
- **Trigger**: Each successful match and deployed solution
- **Progression**: Pollution level decreases → Background color shifts → New elements appear (animals, plants, clear skies)
- **Success criteria**: Smooth transitions that are noticeable but don't distract from gameplay

### Educational Info Cards
- **Functionality**: Pop-up cards that appear when new tile types are unlocked, explaining real-world impact
- **Purpose**: Connects gameplay to actual environmental solutions and statistics
- **Trigger**: First time encountering a new tile type or completing a level
- **Progression**: Card appears → Shows fact/stat → Player reads → Dismisses → Returns to game
- **Success criteria**: Information is concise (2-3 sentences), accurate, and inspiring rather than overwhelming

### Progress Tracking
- **Functionality**: Persistent save system tracking completed levels, high scores, and total "CO2 reduced"
- **Purpose**: Motivates continued play and shows cumulative positive impact
- **Trigger**: Automatic save after each level completion or milestone
- **Progression**: Complete action → Stats update → Save to storage → Display on progress screen
- **Success criteria**: Progress persists between sessions, displays clearly in UI

## Edge Case Handling

- **No Valid Moves Available**: Auto-shuffle the board with animation and brief tip about looking for different patterns
- **Rapid Clicking/Tapping**: Debounce inputs to prevent accidental double-moves or UI glitches
- **Level Completion Without Full Stars**: Show encouraging message about impact made, suggest trying again for full stars
- **First-Time Player**: Display brief tutorial overlay on first level only, skippable with "Got it" button
- **Browser Refresh Mid-Game**: Auto-save current level progress, offer "Resume Level" option on return

## Design Direction

The design should feel hopeful, vibrant, and energizing—like watching a time-lapse of nature reclaiming space. Use organic shapes, smooth transitions, and a color palette that evolves from muted pollution tones to rich, saturated natural colors. The aesthetic should feel modern and polished while remaining warm and inviting, avoiding clinical or overly corporate environmental messaging.

## Color Selection

A dynamic palette that shifts throughout gameplay, from pollution to restoration, adapting to each biome:

- **Primary Color**: Deep Forest Green `oklch(0.52 0.14 155)` - Represents growth and environmental health, used for primary actions and success states
- **Secondary Colors**: Sky Blue `oklch(0.65 0.15 230)` for water/air restoration, Warm Earth `oklch(0.55 0.09 65)` for soil/land themes, Icy Cyan `oklch(0.70 0.12 210)` for tundra, Vibrant Emerald `oklch(0.58 0.18 150)` for rainforest
- **Accent Color**: Vibrant Lime `oklch(0.75 0.20 135)` - Energizing highlight for power-ups, matches, and celebration moments
- **Foreground/Background Pairings**: 
  - Primary (Forest Green oklch(0.52 0.14 155)): White text (oklch(0.99 0 0)) - Ratio 6.2:1 ✓
  - Background Gradient (Pollution oklch(0.40 0.02 260) → Restored oklch(0.88 0.08 145)): Dark text (oklch(0.20 0 0)) - Ratio 9.5:1 ✓
  - Accent (Vibrant Lime oklch(0.75 0.20 135)): Dark text (oklch(0.25 0 0)) - Ratio 7.8:1 ✓

## Font Selection

Typography should feel modern yet organic, with enough personality to engage younger audiences while remaining readable and professional.

- **Primary Font**: Space Grotesk - Geometric yet friendly, perfect for UI elements and scores
- **Secondary Font**: Crimson Pro - Elegant serif for educational content cards, adding authority to facts

**Typographic Hierarchy**:
- H1 (Game Title): Space Grotesk Bold / 48px / -0.02em letter-spacing
- H2 (Level Names): Space Grotesk SemiBold / 32px / -0.01em letter-spacing
- Body (Instructions): Space Grotesk Regular / 16px / 1.5 line-height
- Educational Cards: Crimson Pro Medium / 18px / 1.6 line-height
- Stats/Scores: Space Grotesk Medium / 20px / Tabular numbers

## Animations

Animations should celebrate player success and make the cause-and-effect relationship between actions and environmental improvement crystal clear. Use spring physics for tile movements (bouncy, energetic), smooth color transitions for background transformations (2-3 second gradual shifts), and biome-specific particle effects for matches.

**Tile Match Animations**: When tiles are matched, they trigger unique biome-specific transformations:
- **Forest/Rainforest**: Green leaves spiral outward with organic falling motion
- **Ocean**: Blue bubbles rise and expand in rippling circles
- **Tundra**: Snowflakes cascade and drift with wind physics
- **Desert**: Golden star bursts radiate with solar energy
- **City**: Electric blue tech flashes pulse outward

**Particle System**: Each tile type has custom particle configurations with specific colors, shapes (leaves, snowflakes, stars, water droplets, lightning bolts, petals, explosions, flames, comets), count (8-20 particles for normal tiles, 30-60 for power-ups), duration (600-1200ms for normal, 1200-1800ms for power-ups), and spread patterns. Particles animate from tile center outward using natural easing curves. Power-up animations are full-screen spectacles with unique physics and multiple animation layers.

**Power-Up Mega-Animations**: Each power-up tile triggers a dramatic full-screen effect:
- **Supernova**: Radial golden explosion with pulsing core and 40+ particle rays
- **Tsunami**: Multiple blue wave layers rising from bottom with rippling water particles
- **Earthquake**: Screen shake effect with brown/amber tectonic plates and debris
- **Meteor**: Purple cosmic projectiles falling diagonally with trailing comet tails
- **Phoenix**: Rising bird silhouette in flames with ascending ember particles and rebirth transformation

**Background Effects**: Full-screen biome atmosphere effects trigger during matches, including falling leaves, rising bubbles, drifting snow, floating particles specific to the current biome.

**Icon Transformations**: Matched tile icons scale, rotate, and fade with multi-stage animations (scale 1→1.2→0.8→1.1→0 over 800ms) while particles explode outward simultaneously.

Avoid lengthy animations that slow gameplay—keep tile matching snappy (150-200ms for selection) while allowing match celebrations to be impactful (800ms) and ecosystem changes to be more contemplative (2-3s).

## Component Selection

- **Components**: 
  - Dialog for educational info cards and level completion celebrations
  - Card for tile grid container and stat displays
  - Button for all primary actions (start, restart, next level) with full color variants
  - Progress bar for pollution meter and level completion
  - Badge for displaying combo counts and achievement notifications
  - Tabs for switching between different game modes or level sets
  
- **Customizations**: 
  - Custom tile component (square cards with icon, subtle shadow, hover lift effect)
  - Animated background gradient component that shifts based on game state
  - Custom score counter with animated number transitions
  - Match animation overlay using framer-motion for tile combinations

- **States**: 
  - Tiles: default (idle), hover (subtle lift + glow), selected (border highlight), matching (scale + fade), locked (dimmed)
  - Buttons: vibrant fills with hover scale, active press state, disabled with low opacity
  - Progress bars: animated fill with color shift from red (pollution) to green (health)

- **Icon Selection**: 
  - General tiles: Leaf (tree planting), Recycle, SolarPanel, Wind, Drop (water), Lightning (energy)
  - Tundra tiles: Snowflake (ice crystals), Bird (arctic wildlife), Sparkle (aurora/clean air)
  - Rainforest tiles: FlowerLotus (exotic orchids), Cat (jaguar/biodiversity), Leaf (medicinal plants)
  - Power-up tiles: Sun (supernova), Waves (tsunami), Mountains (earthquake), Meteor (cosmic impact), Fire (phoenix rebirth)
  - UI icons: Heart (health), Star (achievements) from Phosphor Icons
  - All icons using duotone weight for richer visual depth

- **Spacing**: 
  - Tile grid: gap-2 (8px between tiles)
  - Main layout: p-6 (24px padding), larger screens p-8
  - Card content: p-4 internally
  - Stat displays: space-y-3 for vertical rhythm

- **Mobile**: 
  - Grid sizes adapt to screen size (6x6 on mobile, up to 10x10 on desktop for later levels)
  - Stack stat panels vertically below game board instead of side-by-side
  - Larger tap targets (min 56px) for tiles on touch devices
  - Full-screen level completion dialogs on mobile, floating cards on desktop
  - Simplified particle effects on mobile for performance
