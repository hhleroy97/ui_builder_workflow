import { ColorPalette } from '@/types'

export interface HSLColor {
  h: number // hue (0-360)
  s: number // saturation (0-100)
  l: number // lightness (0-100)
}

export interface ColorHarmony {
  name: string
  colors: HSLColor[]
  description: string
}

export class ColorTheoryEngine {
  /**
   * Convert hex color to HSL
   */
  static hexToHsl(hex: string): HSLColor {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  /**
   * Convert HSL color to hex
   */
  static hslToHex({ h, s, l }: HSLColor): string {
    const hNorm = h / 360
    const sNorm = s / 100
    const lNorm = l / 100

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    let r: number, g: number, b: number

    if (sNorm === 0) {
      r = g = b = lNorm
    } else {
      const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm
      const p = 2 * lNorm - q
      r = hue2rgb(p, q, hNorm + 1/3)
      g = hue2rgb(p, q, hNorm)
      b = hue2rgb(p, q, hNorm - 1/3)
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  /**
   * Generate complementary color harmony
   */
  static generateComplementary(baseColor: HSLColor): ColorHarmony {
    const complementary = {
      h: (baseColor.h + 180) % 360,
      s: baseColor.s,
      l: baseColor.l
    }

    return {
      name: 'Complementary',
      colors: [baseColor, complementary],
      description: 'Colors opposite on the color wheel, creating high contrast and vibrant look'
    }
  }

  /**
   * Generate triadic color harmony
   */
  static generateTriadic(baseColor: HSLColor): ColorHarmony {
    const color2 = {
      h: (baseColor.h + 120) % 360,
      s: baseColor.s,
      l: baseColor.l
    }
    
    const color3 = {
      h: (baseColor.h + 240) % 360,
      s: baseColor.s,
      l: baseColor.l
    }

    return {
      name: 'Triadic',
      colors: [baseColor, color2, color3],
      description: 'Three colors evenly spaced on the color wheel, offering vibrant yet balanced contrast'
    }
  }

  /**
   * Generate analogous color harmony
   */
  static generateAnalogous(baseColor: HSLColor): ColorHarmony {
    const color2 = {
      h: (baseColor.h + 30) % 360,
      s: Math.max(baseColor.s - 10, 20),
      l: baseColor.l
    }
    
    const color3 = {
      h: (baseColor.h - 30 + 360) % 360,
      s: Math.max(baseColor.s - 10, 20),
      l: baseColor.l
    }

    return {
      name: 'Analogous',
      colors: [baseColor, color2, color3],
      description: 'Colors adjacent on the color wheel, creating serene and comfortable designs'
    }
  }

  /**
   * Generate monochromatic color variations
   */
  static generateMonochromatic(baseColor: HSLColor): HSLColor[] {
    return [
      { ...baseColor, l: Math.min(baseColor.l + 40, 95) }, // lighter
      { ...baseColor, l: Math.min(baseColor.l + 20, 90) }, // light
      baseColor, // base
      { ...baseColor, l: Math.max(baseColor.l - 20, 10) }, // dark
      { ...baseColor, l: Math.max(baseColor.l - 40, 5) }   // darker
    ]
  }

  /**
   * Check WCAG contrast ratio
   */
  static getContrastRatio(color1: string, color2: string): number {
    const getLuminance = (hex: string): number => {
      const rgb = [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16)
      ].map(c => {
        c /= 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
    }

    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    
    return (brightest + 0.05) / (darkest + 0.05)
  }

  /**
   * Generate accessible color palette for industry
   */
  static generateIndustryPalette(
    industry: string, 
    baseColor?: string,
    style: 'modern' | 'minimal' | 'bold' | 'classic' | 'playful' = 'modern'
  ): ColorPalette {
    // Industry-based color psychology
    const industryColors: Record<string, HSLColor> = {
      tech: { h: 220, s: 70, l: 50 },        // Blue - trust, innovation
      healthcare: { h: 200, s: 60, l: 55 },  // Light blue - health, cleanliness
      finance: { h: 240, s: 45, l: 35 },     // Dark blue - trust, stability
      creative: { h: 280, s: 80, l: 60 },    // Purple - creativity, innovation
      ecommerce: { h: 350, s: 65, l: 55 },   // Red-pink - energy, action
      education: { h: 25, s: 70, l: 55 },    // Orange - enthusiasm, learning
      corporate: { h: 210, s: 40, l: 40 },   // Professional blue
      food: { h: 30, s: 85, l: 60 },         // Orange - appetite, warmth
      real_estate: { h: 120, s: 30, l: 45 }, // Green - growth, stability
      default: { h: 220, s: 60, l: 50 }      // Default blue
    }

    const base = baseColor ? 
      this.hexToHsl(baseColor) : 
      (industryColors[industry] || industryColors.default)

    // Adjust saturation and lightness based on style
    const styleAdjustments = {
      modern: { s: 0, l: 0 },
      minimal: { s: -20, l: 10 },
      bold: { s: 20, l: -10 },
      classic: { s: -10, l: -5 },
      playful: { s: 30, l: 15 }
    }

    const adj = styleAdjustments[style]
    const adjustedBase = {
      h: base.h,
      s: Math.max(Math.min(base.s + adj.s, 100), 10),
      l: Math.max(Math.min(base.l + adj.l, 90), 10)
    }

    // Generate harmonious colors
    const complementary = this.generateComplementary(adjustedBase)
    const analogous = this.generateAnalogous(adjustedBase)

    return {
      primary: this.hslToHex(adjustedBase),
      secondary: this.hslToHex(complementary.colors[1]),
      accent: this.hslToHex(analogous.colors[1]),
      neutral: this.hslToHex({ h: adjustedBase.h, s: 10, l: 70 }),
      semantic: {
        success: this.hslToHex({ h: 120, s: 50, l: 50 }),
        warning: this.hslToHex({ h: 45, s: 85, l: 60 }),
        error: this.hslToHex({ h: 0, s: 70, l: 55 }),
        info: this.hslToHex({ h: 200, s: 60, l: 60 })
      }
    }
  }

  /**
   * Validate and adjust palette for accessibility
   */
  static ensureAccessibility(palette: ColorPalette): ColorPalette {
    const white = '#ffffff'
    const black = '#000000'

    // Helper to find accessible text color
    const getAccessibleTextColor = (bgColor: string): string => {
      const whiteContrast = this.getContrastRatio(bgColor, white)
      const blackContrast = this.getContrastRatio(bgColor, black)
      
      // WCAG AA requires 4.5:1 for normal text
      if (whiteContrast >= 4.5) return white
      if (blackContrast >= 4.5) return black
      
      // Adjust background to meet contrast
      const hsl = this.hexToHsl(bgColor)
      const adjustedBg = this.hslToHex({
        ...hsl,
        l: whiteContrast > blackContrast ? 
          Math.max(hsl.l - 30, 0) : 
          Math.min(hsl.l + 30, 100)
      })
      
      return this.getContrastRatio(adjustedBg, white) >= 4.5 ? white : black
    }

    // Ensure all colors have sufficient contrast
    const ensureContrast = (color: string): string => {
      const contrast = Math.max(
        this.getContrastRatio(color, white),
        this.getContrastRatio(color, black)
      )
      
      if (contrast >= 4.5) return color
      
      const hsl = this.hexToHsl(color)
      return this.hslToHex({
        ...hsl,
        l: hsl.l > 50 ? Math.max(hsl.l - 20, 20) : Math.min(hsl.l + 20, 80)
      })
    }

    return {
      primary: ensureContrast(palette.primary),
      secondary: ensureContrast(palette.secondary),
      accent: ensureContrast(palette.accent),
      neutral: palette.neutral,
      semantic: {
        success: ensureContrast(palette.semantic.success),
        warning: ensureContrast(palette.semantic.warning),
        error: ensureContrast(palette.semantic.error),
        info: ensureContrast(palette.semantic.info)
      }
    }
  }
}