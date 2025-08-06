import { TypographySystem } from '@/types'

export interface FontPairing {
  name: string
  heading: {
    family: string
    weight: number[]
    category: 'serif' | 'sans-serif' | 'display' | 'monospace'
  }
  body: {
    family: string
    weight: number[]
    category: 'serif' | 'sans-serif' | 'display' | 'monospace'
  }
  description: string
  personality: string[]
  googleFonts?: {
    heading: string
    body: string
  }
}

export interface TypeScale {
  name: string
  ratio: number
  baseSize: number
  description: string
}

export class TypographyEngine {
  // Professional font pairings with Google Fonts
  static fontPairings: FontPairing[] = [
    {
      name: 'Modern Professional',
      heading: { family: 'Inter', weight: [400, 500, 600, 700], category: 'sans-serif' },
      body: { family: 'Inter', weight: [400, 500], category: 'sans-serif' },
      description: 'Clean, highly legible, and versatile for modern interfaces',
      personality: ['modern', 'clean', 'professional', 'tech'],
      googleFonts: { heading: 'Inter:wght@400;500;600;700', body: 'Inter:wght@400;500' }
    },
    {
      name: 'Editorial Classic',
      heading: { family: 'Playfair Display', weight: [400, 500, 600, 700], category: 'serif' },
      body: { family: 'Source Sans Pro', weight: [400, 500], category: 'sans-serif' },
      description: 'Elegant serif headlines with clean sans-serif body text',
      personality: ['elegant', 'editorial', 'luxury', 'classic'],
      googleFonts: { heading: 'Playfair Display:wght@400;500;600;700', body: 'Source Sans Pro:wght@400;500' }
    },
    {
      name: 'Tech Startup',
      heading: { family: 'Space Grotesk', weight: [400, 500, 600, 700], category: 'sans-serif' },
      body: { family: 'Inter', weight: [400, 500], category: 'sans-serif' },
      description: 'Distinctive geometric headlines with reliable body text',
      personality: ['tech', 'startup', 'modern', 'innovative'],
      googleFonts: { heading: 'Space Grotesk:wght@400;500;600;700', body: 'Inter:wght@400;500' }
    },
    {
      name: 'Creative Studio',
      heading: { family: 'Fraunces', weight: [400, 500, 600, 700], category: 'serif' },
      body: { family: 'Inter', weight: [400, 500], category: 'sans-serif' },
      description: 'Expressive variable serif with modern sans-serif',
      personality: ['creative', 'artistic', 'unique', 'expressive'],
      googleFonts: { heading: 'Fraunces:wght@400;500;600;700', body: 'Inter:wght@400;500' }
    },
    {
      name: 'Corporate Reliable',
      heading: { family: 'Roboto', weight: [400, 500, 600, 700], category: 'sans-serif' },
      body: { family: 'Roboto', weight: [400, 500], category: 'sans-serif' },
      description: 'Trustworthy and familiar, excellent for corporate applications',
      personality: ['corporate', 'reliable', 'friendly', 'accessible'],
      googleFonts: { heading: 'Roboto:wght@400;500;600;700', body: 'Roboto:wght@400;500' }
    },
    {
      name: 'Minimal Geometric',
      heading: { family: 'DM Sans', weight: [400, 500, 600, 700], category: 'sans-serif' },
      body: { family: 'DM Sans', weight: [400, 500], category: 'sans-serif' },
      description: 'Low-contrast geometric with excellent readability',
      personality: ['minimal', 'geometric', 'clean', 'modern'],
      googleFonts: { heading: 'DM Sans:wght@400;500;600;700', body: 'DM Sans:wght@400;500' }
    },
    {
      name: 'Warm Humanist',
      heading: { family: 'Libre Baskerville', weight: [400, 700], category: 'serif' },
      body: { family: 'Open Sans', weight: [400, 500], category: 'sans-serif' },
      description: 'Warm serif headlines with friendly sans-serif body',
      personality: ['warm', 'friendly', 'approachable', 'human'],
      googleFonts: { heading: 'Libre Baskerville:wght@400;700', body: 'Open Sans:wght@400;500' }
    },
    {
      name: 'Bold Statement',
      heading: { family: 'Oswald', weight: [400, 500, 600, 700], category: 'sans-serif' },
      body: { family: 'Nunito Sans', weight: [400, 500], category: 'sans-serif' },
      description: 'Strong condensed headlines with rounded body text',
      personality: ['bold', 'impactful', 'strong', 'confident'],
      googleFonts: { heading: 'Oswald:wght@400;500;600;700', body: 'Nunito Sans:wght@400;500' }
    }
  ]

  // Modular scale ratios
  static typeScales: TypeScale[] = [
    {
      name: 'Minor Second',
      ratio: 1.067,
      baseSize: 16,
      description: 'Subtle, close harmony - good for text-heavy designs'
    },
    {
      name: 'Major Second',
      ratio: 1.125,
      baseSize: 16,
      description: 'Balanced and versatile - most common choice'
    },
    {
      name: 'Minor Third',
      ratio: 1.2,
      baseSize: 16,
      description: 'Gentle contrast - readable and pleasant'
    },
    {
      name: 'Major Third',
      ratio: 1.25,
      baseSize: 16,
      description: 'Strong hierarchy - good for marketing sites'
    },
    {
      name: 'Perfect Fourth',
      ratio: 1.333,
      baseSize: 16,
      description: 'Clear distinction - excellent for landing pages'
    },
    {
      name: 'Golden Ratio',
      ratio: 1.618,
      baseSize: 16,
      description: 'Dramatic contrast - bold and attention-grabbing'
    }
  ]

  /**
   * Generate typography system based on requirements
   */
  static generateTypographySystem(
    style: 'professional' | 'creative' | 'technical' | 'friendly',
    industry: string,
    scaleRatio: number = 1.25
  ): TypographySystem {
    // Select font pairing based on style and industry
    const pairing = this.selectFontPairing(style, industry)
    
    // Generate modular scale
    const scale = this.generateModularScale(16, scaleRatio)

    return {
      fontPairings: {
        heading: pairing.heading.family,
        body: pairing.body.family
      },
      scale,
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      }
    }
  }

  /**
   * Select appropriate font pairing
   */
  static selectFontPairing(
    style: 'professional' | 'creative' | 'technical' | 'friendly',
    industry: string
  ): FontPairing {
    // Style-based preferences
    const stylePreferences = {
      professional: ['modern', 'clean', 'professional', 'corporate'],
      creative: ['creative', 'artistic', 'unique', 'expressive'],
      technical: ['tech', 'modern', 'clean', 'minimal'],
      friendly: ['warm', 'friendly', 'approachable', 'human']
    }

    // Industry-specific adjustments
    const industryAdjustments = {
      tech: ['tech', 'startup', 'modern', 'innovative'],
      finance: ['corporate', 'reliable', 'professional', 'clean'],
      healthcare: ['friendly', 'approachable', 'clean', 'reliable'],
      creative: ['creative', 'artistic', 'unique', 'expressive'],
      education: ['friendly', 'approachable', 'warm', 'accessible'],
      ecommerce: ['modern', 'clean', 'friendly', 'accessible']
    }

    const desiredTraits = [
      ...stylePreferences[style],
      ...(industryAdjustments[industry as keyof typeof industryAdjustments] || [])
    ]

    // Score each font pairing
    let bestPairing = this.fontPairings[0]
    let bestScore = 0

    for (const pairing of this.fontPairings) {
      const score = pairing.personality.reduce((acc, trait) => {
        return acc + (desiredTraits.includes(trait) ? 1 : 0)
      }, 0)

      if (score > bestScore) {
        bestScore = score
        bestPairing = pairing
      }
    }

    return bestPairing
  }

  /**
   * Generate modular scale
   */
  static generateModularScale(baseSize: number, ratio: number) {
    const generate = (step: number): string => {
      const size = baseSize * Math.pow(ratio, step)
      return `${(size / 16).toFixed(3)}rem`
    }

    return {
      xs: generate(-2),   // 0.75rem
      sm: generate(-1),   // 0.875rem
      base: generate(0),  // 1rem
      lg: generate(1),    // 1.125rem
      xl: generate(2),    // 1.25rem
      '2xl': generate(3), // 1.5rem
      '3xl': generate(4), // 1.875rem
      '4xl': generate(5), // 2.25rem
      '5xl': generate(6), // 3rem
      '6xl': generate(7)  // 3.75rem
    }
  }

  /**
   * Calculate optimal line heights
   */
  static calculateLineHeights(fontSize: string): string {
    const size = parseFloat(fontSize)
    
    // Golden ratio for line height: 1.4-1.6 for body text, 1.1-1.3 for headings
    if (size <= 1.125) {
      return '1.5' // Body text
    } else if (size <= 1.5) {
      return '1.4' // Large body/small headings
    } else if (size <= 2.25) {
      return '1.3' // Medium headings
    } else {
      return '1.2' // Large headings
    }
  }

  /**
   * Generate Google Fonts URL
   */
  static generateGoogleFontsUrl(pairing: FontPairing): string {
    const { googleFonts } = pairing
    if (!googleFonts) return ''

    const fonts = [googleFonts.heading, googleFonts.body]
      .filter(Boolean)
      .join('&family=')
    
    return `https://fonts.googleapis.com/css2?family=${fonts}&display=swap`
  }

  /**
   * Generate CSS custom properties
   */
  static generateCSSProperties(system: TypographySystem): Record<string, string> {
    const properties: Record<string, string> = {
      '--font-heading': system.fontPairings.heading,
      '--font-body': system.fontPairings.body,
    }

    // Add font sizes
    Object.entries(system.scale).forEach(([key, value]) => {
      properties[`--font-size-${key}`] = value
      properties[`--line-height-${key}`] = this.calculateLineHeights(value)
    })

    // Add font weights
    Object.entries(system.weights).forEach(([key, value]) => {
      properties[`--font-weight-${key}`] = value.toString()
    })

    return properties
  }

  /**
   * Validate typography accessibility
   */
  static validateAccessibility(system: TypographySystem): {
    valid: boolean
    issues: string[]
    suggestions: string[]
  } {
    const issues: string[] = []
    const suggestions: string[] = []

    // Check minimum font sizes
    const baseSize = parseFloat(system.scale.base)
    if (baseSize < 1) { // 16px
      issues.push('Base font size is below 16px, which may be difficult to read')
      suggestions.push('Consider increasing base font size to at least 1rem (16px)')
    }

    const smallSize = parseFloat(system.scale.sm)
    if (smallSize < 0.875) { // 14px
      issues.push('Small text is below 14px, which may fail accessibility standards')
      suggestions.push('Increase small text size to at least 0.875rem (14px)')
    }

    // Check font weight availability
    if (system.weights.normal < 400) {
      issues.push('Normal weight is below 400, which may appear too light')
      suggestions.push('Set normal weight to at least 400 for better readability')
    }

    return {
      valid: issues.length === 0,
      issues,
      suggestions
    }
  }
}