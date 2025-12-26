import { VisualizerStyle } from './types'

export interface VisualizerColorTheme {
  primary: string
  secondary: string
  accent: string
  glow: string
  gradient: {
    start: string
    middle: string
    end: string
  }
}

export interface BiomeVisualizerThemes {
  bars: VisualizerColorTheme
  waveform: VisualizerColorTheme
  circular: VisualizerColorTheme
}

export const VISUALIZER_THEMES: Record<string, BiomeVisualizerThemes> = {
  forest: {
    bars: {
      primary: 'rgba(34, 197, 94, 0.7)',
      secondary: 'rgba(74, 222, 128, 0.5)',
      accent: 'rgba(22, 163, 74, 0.9)',
      glow: 'rgba(34, 197, 94, 0.4)',
      gradient: {
        start: 'rgba(21, 128, 61, 0.8)',
        middle: 'rgba(34, 197, 94, 0.9)',
        end: 'rgba(74, 222, 128, 0.7)'
      }
    },
    waveform: {
      primary: 'rgba(5, 150, 105, 0.6)',
      secondary: 'rgba(16, 185, 129, 0.5)',
      accent: 'rgba(52, 211, 153, 0.8)',
      glow: 'rgba(16, 185, 129, 0.3)',
      gradient: {
        start: 'rgba(5, 150, 105, 0.7)',
        middle: 'rgba(16, 185, 129, 0.8)',
        end: 'rgba(52, 211, 153, 0.6)'
      }
    },
    circular: {
      primary: 'rgba(22, 163, 74, 0.7)',
      secondary: 'rgba(134, 239, 172, 0.5)',
      accent: 'rgba(240, 253, 244, 0.6)',
      glow: 'rgba(34, 197, 94, 0.5)',
      gradient: {
        start: 'rgba(240, 253, 244, 0.8)',
        middle: 'rgba(134, 239, 172, 0.7)',
        end: 'rgba(22, 163, 74, 0.6)'
      }
    }
  },
  ocean: {
    bars: {
      primary: 'rgba(59, 130, 246, 0.7)',
      secondary: 'rgba(96, 165, 250, 0.5)',
      accent: 'rgba(37, 99, 235, 0.9)',
      glow: 'rgba(59, 130, 246, 0.4)',
      gradient: {
        start: 'rgba(29, 78, 216, 0.8)',
        middle: 'rgba(59, 130, 246, 0.9)',
        end: 'rgba(96, 165, 250, 0.7)'
      }
    },
    waveform: {
      primary: 'rgba(14, 165, 233, 0.6)',
      secondary: 'rgba(56, 189, 248, 0.5)',
      accent: 'rgba(125, 211, 252, 0.8)',
      glow: 'rgba(14, 165, 233, 0.3)',
      gradient: {
        start: 'rgba(3, 105, 161, 0.7)',
        middle: 'rgba(14, 165, 233, 0.8)',
        end: 'rgba(125, 211, 252, 0.6)'
      }
    },
    circular: {
      primary: 'rgba(37, 99, 235, 0.7)',
      secondary: 'rgba(147, 197, 253, 0.5)',
      accent: 'rgba(219, 234, 254, 0.6)',
      glow: 'rgba(59, 130, 246, 0.5)',
      gradient: {
        start: 'rgba(219, 234, 254, 0.8)',
        middle: 'rgba(147, 197, 253, 0.7)',
        end: 'rgba(37, 99, 235, 0.6)'
      }
    }
  },
  desert: {
    bars: {
      primary: 'rgba(251, 146, 60, 0.7)',
      secondary: 'rgba(253, 186, 116, 0.5)',
      accent: 'rgba(234, 88, 12, 0.9)',
      glow: 'rgba(251, 146, 60, 0.4)',
      gradient: {
        start: 'rgba(194, 65, 12, 0.8)',
        middle: 'rgba(251, 146, 60, 0.9)',
        end: 'rgba(253, 186, 116, 0.7)'
      }
    },
    waveform: {
      primary: 'rgba(245, 158, 11, 0.6)',
      secondary: 'rgba(251, 191, 36, 0.5)',
      accent: 'rgba(252, 211, 77, 0.8)',
      glow: 'rgba(245, 158, 11, 0.3)',
      gradient: {
        start: 'rgba(217, 119, 6, 0.7)',
        middle: 'rgba(245, 158, 11, 0.8)',
        end: 'rgba(252, 211, 77, 0.6)'
      }
    },
    circular: {
      primary: 'rgba(234, 88, 12, 0.7)',
      secondary: 'rgba(254, 215, 170, 0.5)',
      accent: 'rgba(255, 247, 237, 0.6)',
      glow: 'rgba(251, 146, 60, 0.5)',
      gradient: {
        start: 'rgba(255, 247, 237, 0.8)',
        middle: 'rgba(254, 215, 170, 0.7)',
        end: 'rgba(234, 88, 12, 0.6)'
      }
    }
  },
  city: {
    bars: {
      primary: 'rgba(168, 85, 247, 0.7)',
      secondary: 'rgba(192, 132, 252, 0.5)',
      accent: 'rgba(147, 51, 234, 0.9)',
      glow: 'rgba(168, 85, 247, 0.4)',
      gradient: {
        start: 'rgba(126, 34, 206, 0.8)',
        middle: 'rgba(168, 85, 247, 0.9)',
        end: 'rgba(192, 132, 252, 0.7)'
      }
    },
    waveform: {
      primary: 'rgba(139, 92, 246, 0.6)',
      secondary: 'rgba(167, 139, 250, 0.5)',
      accent: 'rgba(196, 181, 253, 0.8)',
      glow: 'rgba(139, 92, 246, 0.3)',
      gradient: {
        start: 'rgba(109, 40, 217, 0.7)',
        middle: 'rgba(139, 92, 246, 0.8)',
        end: 'rgba(196, 181, 253, 0.6)'
      }
    },
    circular: {
      primary: 'rgba(147, 51, 234, 0.7)',
      secondary: 'rgba(216, 180, 254, 0.5)',
      accent: 'rgba(250, 245, 255, 0.6)',
      glow: 'rgba(168, 85, 247, 0.5)',
      gradient: {
        start: 'rgba(250, 245, 255, 0.8)',
        middle: 'rgba(216, 180, 254, 0.7)',
        end: 'rgba(147, 51, 234, 0.6)'
      }
    }
  },
  tundra: {
    bars: {
      primary: 'rgba(125, 211, 252, 0.7)',
      secondary: 'rgba(165, 243, 252, 0.5)',
      accent: 'rgba(14, 165, 233, 0.9)',
      glow: 'rgba(125, 211, 252, 0.4)',
      gradient: {
        start: 'rgba(8, 145, 178, 0.8)',
        middle: 'rgba(125, 211, 252, 0.9)',
        end: 'rgba(165, 243, 252, 0.7)'
      }
    },
    waveform: {
      primary: 'rgba(103, 232, 249, 0.6)',
      secondary: 'rgba(186, 230, 253, 0.5)',
      accent: 'rgba(224, 242, 254, 0.8)',
      glow: 'rgba(103, 232, 249, 0.3)',
      gradient: {
        start: 'rgba(6, 182, 212, 0.7)',
        middle: 'rgba(103, 232, 249, 0.8)',
        end: 'rgba(224, 242, 254, 0.6)'
      }
    },
    circular: {
      primary: 'rgba(14, 165, 233, 0.7)',
      secondary: 'rgba(186, 230, 253, 0.5)',
      accent: 'rgba(240, 249, 255, 0.6)',
      glow: 'rgba(125, 211, 252, 0.5)',
      gradient: {
        start: 'rgba(240, 249, 255, 0.8)',
        middle: 'rgba(186, 230, 253, 0.7)',
        end: 'rgba(14, 165, 233, 0.6)'
      }
    }
  },
  rainforest: {
    bars: {
      primary: 'rgba(16, 185, 129, 0.7)',
      secondary: 'rgba(52, 211, 153, 0.5)',
      accent: 'rgba(5, 150, 105, 0.9)',
      glow: 'rgba(16, 185, 129, 0.4)',
      gradient: {
        start: 'rgba(4, 120, 87, 0.8)',
        middle: 'rgba(16, 185, 129, 0.9)',
        end: 'rgba(52, 211, 153, 0.7)'
      }
    },
    waveform: {
      primary: 'rgba(20, 184, 166, 0.6)',
      secondary: 'rgba(45, 212, 191, 0.5)',
      accent: 'rgba(94, 234, 212, 0.8)',
      glow: 'rgba(20, 184, 166, 0.3)',
      gradient: {
        start: 'rgba(13, 148, 136, 0.7)',
        middle: 'rgba(20, 184, 166, 0.8)',
        end: 'rgba(94, 234, 212, 0.6)'
      }
    },
    circular: {
      primary: 'rgba(5, 150, 105, 0.7)',
      secondary: 'rgba(110, 231, 183, 0.5)',
      accent: 'rgba(209, 250, 229, 0.6)',
      glow: 'rgba(16, 185, 129, 0.5)',
      gradient: {
        start: 'rgba(209, 250, 229, 0.8)',
        middle: 'rgba(110, 231, 183, 0.7)',
        end: 'rgba(5, 150, 105, 0.6)'
      }
    }
  },
  menu: {
    bars: {
      primary: 'rgba(148, 163, 184, 0.7)',
      secondary: 'rgba(186, 230, 253, 0.5)',
      accent: 'rgba(100, 116, 139, 0.9)',
      glow: 'rgba(148, 163, 184, 0.4)',
      gradient: {
        start: 'rgba(71, 85, 105, 0.8)',
        middle: 'rgba(148, 163, 184, 0.9)',
        end: 'rgba(203, 213, 225, 0.7)'
      }
    },
    waveform: {
      primary: 'rgba(100, 116, 139, 0.6)',
      secondary: 'rgba(148, 163, 184, 0.5)',
      accent: 'rgba(203, 213, 225, 0.8)',
      glow: 'rgba(100, 116, 139, 0.3)',
      gradient: {
        start: 'rgba(51, 65, 85, 0.7)',
        middle: 'rgba(100, 116, 139, 0.8)',
        end: 'rgba(203, 213, 225, 0.6)'
      }
    },
    circular: {
      primary: 'rgba(100, 116, 139, 0.7)',
      secondary: 'rgba(203, 213, 225, 0.5)',
      accent: 'rgba(248, 250, 252, 0.6)',
      glow: 'rgba(148, 163, 184, 0.5)',
      gradient: {
        start: 'rgba(248, 250, 252, 0.8)',
        middle: 'rgba(203, 213, 225, 0.7)',
        end: 'rgba(100, 116, 139, 0.6)'
      }
    }
  }
}

export function getVisualizerTheme(biome: string, style: VisualizerStyle): VisualizerColorTheme {
  const biomeThemes = VISUALIZER_THEMES[biome] || VISUALIZER_THEMES.menu
  return biomeThemes[style]
}

export function getVisualizerColors(biome: string, style: VisualizerStyle) {
  const theme = getVisualizerTheme(biome, style)
  
  return {
    primary: theme.primary,
    secondary: theme.secondary,
    accent: theme.accent,
    glow: theme.glow,
    gradient: theme.gradient
  }
}

export function getVisualizerGradientStops(biome: string, style: VisualizerStyle, gradientId: string) {
  const theme = getVisualizerTheme(biome, style)
  
  return `
    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.gradient.start}" />
      <stop offset="50%" stop-color="${theme.gradient.middle}" />
      <stop offset="100%" stop-color="${theme.gradient.end}" />
    </linearGradient>
  `
}

export function getThemeDescription(biome: string, style: VisualizerStyle): string {
  const descriptions: Record<string, Record<VisualizerStyle, string>> = {
    forest: {
      bars: 'Verdant green bars growing like trees reaching for the sky',
      waveform: 'Organic waves flowing like wind through the canopy',
      circular: 'Concentric rings radiating like tree growth'
    },
    ocean: {
      bars: 'Deep blue columns rising like ocean waves',
      waveform: 'Undulating waves capturing the rhythm of the tide',
      circular: 'Ripples expanding like a stone dropped in water'
    },
    desert: {
      bars: 'Warm amber pillars glowing like desert heat',
      waveform: 'Flowing dunes shifting with the desert wind',
      circular: 'Radiant sun rays spreading across the horizon'
    },
    city: {
      bars: 'Neon purple lights pulsing like city nightlife',
      waveform: 'Electric waves flowing through urban circuits',
      circular: 'Tech rings orbiting like holographic displays'
    },
    tundra: {
      bars: 'Crystalline ice formations shimmering in polar light',
      waveform: 'Arctic waves flowing like the aurora borealis',
      circular: 'Frozen rings expanding like ice crystallization'
    },
    rainforest: {
      bars: 'Lush emerald pillars dense like jungle vegetation',
      waveform: 'Tropical waves flowing like rainfall through leaves',
      circular: 'Vibrant rings blooming like exotic flowers'
    },
    menu: {
      bars: 'Neutral tones rising in balanced harmony',
      waveform: 'Gentle waves flowing in peaceful rhythm',
      circular: 'Soft rings expanding in calm meditation'
    }
  }
  
  const biomeDescriptions = descriptions[biome] || descriptions.menu
  return biomeDescriptions[style]
}
