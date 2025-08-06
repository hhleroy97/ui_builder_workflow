export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  neutral: string
  semantic: {
    success: string
    warning: string
    error: string
    info: string
  }
}

export interface TypographySystem {
  fontPairings: {
    heading: string
    body: string
  }
  scale: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
    '5xl': string
    '6xl': string
  }
  weights: {
    light: number
    normal: number
    medium: number
    semibold: number
    bold: number
  }
}

export interface DesignTokens {
  colors: ColorPalette
  typography: TypographySystem
  spacing: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
}

export interface ProjectRequirements {
  projectType: 'landing' | 'portfolio' | 'ecommerce' | 'saas' | 'blog' | 'corporate'
  industry: string
  purpose: string
  targetAudience: string
  styleDirection: 'modern' | 'minimal' | 'bold' | 'classic' | 'playful'
  colorPreferences: {
    type: 'brand' | 'mood' | 'ai-suggested'
    values?: string[]
    mood?: string
  }
  typographyStyle: 'professional' | 'creative' | 'technical' | 'friendly'
  requiredSections: string[]
  interactiveElements: string[]
  specialFeatures: string[]
  devicePriority: 'mobile-first' | 'desktop-first' | 'equal'
  accessibilityLevel: 'basic' | 'enhanced' | 'full'
}

export interface GeneratedTemplate {
  id: string
  name: string
  description: string
  html: string
  css: string
  designTokens: DesignTokens
  components: ComponentDefinition[]
  figmaExport?: FigmaFileData
}

export interface ComponentDefinition {
  id: string
  name: string
  type: 'atom' | 'molecule' | 'organism' | 'template'
  html: string
  css: string
  variants?: ComponentVariant[]
  props?: ComponentProp[]
}

export interface ComponentVariant {
  name: string
  properties: Record<string, string>
}

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  defaultValue?: string
}

export interface FigmaFileData {
  fileId: string
  components: FigmaComponent[]
  pages: FigmaPage[]
}

export interface FigmaComponent {
  id: string
  name: string
  type: string
  properties: Record<string, any>
}

export interface FigmaPage {
  id: string
  name: string
  components: string[]
}