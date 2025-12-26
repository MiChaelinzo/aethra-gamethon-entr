# Planning Guide

An educational puzzle-adventure game where players restore Earth's ecosystems by solving climate-action challenges, combining engaging gameplay with real environmental awareness.

**Experience Qualities**:
1. **Empowering** - Players feel they're making meaningful choices that create visible positive change in the game world
2. **Educational** - Seamlessly teaches real climate solutions (renewable energy, reforestation, ocean cleanup) through interactive mechanics
3. **Satisfying** - Immediate visual feedback with vibrant transformations as polluted areas become thriving ecosystems

**Complexity Level**: Light Application (multiple features with basic state)
This is a tile-based puzzle game with multiple levels, persistent progress tracking, and educational content integration. It has distinct game mechanics (tile matching, resource management) but remains focused and accessible for a hackathon submission.

## Essential Features

### Level-Based Gameplay
- **Functionality**: Progressive stages where players restore different biomes (forest, desert, ocean, city, tundra, rainforest) across 8 challenging levels
- **Purpose**: Creates achievable goals while teaching about diverse environmental challenges across Earth's most critical ecosystems
- **Trigger**: Player clicks "Start Game" or "Next Level" button
- **Progression**: Select Level → View Objective → Match tiles to collect resources → Deploy solutions → Watch ecosystem transform → Complete level
- **Success criteria**: Level completes when target score is reached within the move limit; players see ecosystem transformation in real-time

### Tile-Matching Mechanic
- **Functionality**: Grid-based system where players match 3+ adjacent tiles representing eco-solutions. Each biome features unique tiles: general solutions (solar panels, trees, wind turbines, recycling bins), tundra-specific (ice crystals, arctic wildlife, clean air auroras), and rainforest-specific (exotic orchids, jaguars, medicinal plants)
- **Purpose**: Familiar, accessible mechanic that reinforces learning through repetition while introducing biome-specific environmental challenges
- **Trigger**: Player clicks/taps tiles to swap adjacent pieces
- **Progression**: Select tile → Swap with adjacent → Match forms → Resources collected → Solution deployed
- **Success criteria**: Valid matches award points and resources; invalid moves provide gentle feedback

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

Animations should celebrate player success and make the cause-and-effect relationship between actions and environmental improvement crystal clear. Use spring physics for tile movements (bouncy, energetic), smooth color transitions for background transformations (2-3 second gradual shifts), and particle effects for matches (leaves, water droplets, sparkles depending on tile type). Avoid lengthy animations that slow gameplay—keep tile matching snappy (150-200ms) while allowing ecosystem changes to be more contemplative (2-3s) since they reward progress.

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
