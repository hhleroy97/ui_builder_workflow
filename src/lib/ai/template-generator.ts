import { ProjectRequirements, GeneratedTemplate, ComponentDefinition, DesignTokens } from '@/types'
import { ColorTheoryEngine } from '@/lib/color-theory'
import { TypographyEngine } from '@/lib/design-system/typography'

export class TemplateGenerator {
  /**
   * Generate a complete website template based on user requirements
   */
  static async generateTemplate(requirements: ProjectRequirements): Promise<GeneratedTemplate> {
    // Generate design system
    const designTokens = await this.generateDesignSystem(requirements)
    
    // Generate components based on selected sections
    const components = await this.generateComponents(requirements, designTokens)
    
    // Generate main template HTML
    const html = await this.generateHTML(requirements, components, designTokens)
    
    // Generate CSS with design tokens
    const css = await this.generateCSS(designTokens, components)

    return {
      id: this.generateId(),
      name: this.generateTemplateName(requirements),
      description: this.generateDescription(requirements),
      html,
      css,
      designTokens,
      components
    }
  }

  /**
   * Generate design system tokens based on requirements
   */
  private static async generateDesignSystem(requirements: ProjectRequirements): Promise<DesignTokens> {
    // Generate color palette
    const colorPalette = ColorTheoryEngine.generateIndustryPalette(
      requirements.industry,
      requirements.colorPreferences?.values?.[0],
      requirements.styleDirection
    )
    
    const accessiblePalette = ColorTheoryEngine.ensureAccessibility(colorPalette)

    // Generate typography system
    const typography = TypographyEngine.generateTypographySystem(
      requirements.typographyStyle || 'professional',
      requirements.industry
    )

    return {
      colors: accessiblePalette,
      typography,
      spacing: this.generateSpacingTokens(),
      borderRadius: this.generateBorderRadiusTokens(requirements.styleDirection),
      shadows: this.generateShadowTokens(requirements.styleDirection)
    }
  }

  /**
   * Generate spacing tokens based on 8pt grid
   */
  private static generateSpacingTokens(): Record<string, string> {
    return {
      'xs': '0.5rem',    // 8px
      'sm': '1rem',      // 16px
      'md': '1.5rem',    // 24px
      'lg': '2rem',      // 32px
      'xl': '3rem',      // 48px
      '2xl': '4rem',     // 64px
      '3xl': '6rem',     // 96px
      '4xl': '8rem',     // 128px
    }
  }

  /**
   * Generate border radius tokens based on style
   */
  private static generateBorderRadiusTokens(style: string = 'modern'): Record<string, string> {
    const radiusValues = {
      modern: { sm: '0.375rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
      minimal: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem' },
      bold: { sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.5rem' },
      classic: { sm: '0.25rem', md: '0.5rem', lg: '0.75rem', xl: '1rem' },
      playful: { sm: '0.75rem', md: '1rem', lg: '1.5rem', xl: '2rem' }
    }

    return radiusValues[style as keyof typeof radiusValues] || radiusValues.modern
  }

  /**
   * Generate shadow tokens based on style
   */
  private static generateShadowTokens(style: string = 'modern'): Record<string, string> {
    const shadowValues = {
      modern: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
      },
      minimal: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.02)',
        md: '0 2px 4px -1px rgb(0 0 0 / 0.05)',
        lg: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
        xl: '0 8px 10px -2px rgb(0 0 0 / 0.05)'
      },
      bold: {
        sm: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
        md: '0 8px 12px -2px rgb(0 0 0 / 0.15)',
        lg: '0 16px 24px -4px rgb(0 0 0 / 0.15)',
        xl: '0 32px 40px -8px rgb(0 0 0 / 0.15)'
      }
    }

    return shadowValues[style as keyof typeof shadowValues] || shadowValues.modern
  }

  /**
   * Generate components based on selected sections
   */
  private static async generateComponents(
    requirements: ProjectRequirements, 
    designTokens: DesignTokens
  ): Promise<ComponentDefinition[]> {
    const components: ComponentDefinition[] = []

    // Generate atoms (basic components)
    components.push(...this.generateAtoms(designTokens))

    // Generate molecules for each required section
    for (const sectionId of requirements.requiredSections || []) {
      const component = await this.generateSectionComponent(sectionId, requirements, designTokens)
      if (component) {
        components.push(component)
      }
    }

    // Generate interactive components
    for (const elementId of requirements.interactiveElements || []) {
      const component = await this.generateInteractiveComponent(elementId, requirements, designTokens)
      if (component) {
        components.push(component)
      }
    }

    return components
  }

  /**
   * Generate basic atom components (buttons, inputs, etc.)
   */
  private static generateAtoms(designTokens: DesignTokens): ComponentDefinition[] {
    return [
      {
        id: 'button',
        name: 'Button',
        type: 'atom',
        html: `<button class="btn btn-primary">{{text}}</button>`,
        css: this.generateButtonCSS(designTokens),
        variants: [
          { name: 'primary', properties: { class: 'btn-primary' } },
          { name: 'secondary', properties: { class: 'btn-secondary' } },
          { name: 'outline', properties: { class: 'btn-outline' } }
        ]
      },
      {
        id: 'heading',
        name: 'Heading',
        type: 'atom',
        html: `<h1 class="heading">{{text}}</h1>`,
        css: this.generateHeadingCSS(designTokens),
        variants: [
          { name: 'h1', properties: { tag: 'h1' } },
          { name: 'h2', properties: { tag: 'h2' } },
          { name: 'h3', properties: { tag: 'h3' } }
        ]
      }
    ]
  }

  /**
   * Generate section-specific components
   */
  private static async generateSectionComponent(
    sectionId: string,
    requirements: ProjectRequirements,
    designTokens: DesignTokens
  ): Promise<ComponentDefinition | null> {
    const sectionTemplates = {
      hero: this.generateHeroComponent(requirements, designTokens),
      about: this.generateAboutComponent(requirements, designTokens),
      services: this.generateServicesComponent(requirements, designTokens),
      contact: this.generateContactComponent(requirements, designTokens),
      portfolio: this.generatePortfolioComponent(requirements, designTokens),
      testimonials: this.generateTestimonialsComponent(requirements, designTokens),
      team: this.generateTeamComponent(requirements, designTokens),
      pricing: this.generatePricingComponent(requirements, designTokens)
    }

    return sectionTemplates[sectionId as keyof typeof sectionTemplates] || null
  }

  /**
   * Generate hero section component
   */
  private static generateHeroComponent(
    requirements: ProjectRequirements,
    designTokens: DesignTokens
  ): ComponentDefinition {
    const heroHTML = `
      <section class="hero">
        <div class="hero-container">
          <div class="hero-content">
            <h1 class="hero-title">{{title}}</h1>
            <p class="hero-subtitle">{{subtitle}}</p>
            <div class="hero-actions">
              <button class="btn btn-primary">{{primaryCTA}}</button>
              <button class="btn btn-secondary">{{secondaryCTA}}</button>
            </div>
          </div>
          <div class="hero-image">
            <img src="{{heroImage}}" alt="{{heroImageAlt}}" />
          </div>
        </div>
      </section>
    `

    const heroCSS = `
      .hero {
        padding: 4rem 1rem;
        background: linear-gradient(135deg, ${designTokens.colors.primary}10, ${designTokens.colors.secondary}10);
      }
      
      .hero-container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
      }
      
      .hero-title {
        font-family: ${designTokens.typography.fontPairings.heading};
        font-size: ${designTokens.typography.scale['5xl']};
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        color: ${designTokens.colors.primary};
      }
      
      .hero-subtitle {
        font-size: ${designTokens.typography.scale.xl};
        line-height: 1.6;
        margin-bottom: 2rem;
        color: #6b7280;
      }
      
      .hero-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      
      @media (max-width: 768px) {
        .hero-container {
          grid-template-columns: 1fr;
          text-align: center;
        }
        
        .hero-title {
          font-size: ${designTokens.typography.scale['3xl']};
        }
      }
    `

    return {
      id: 'hero',
      name: 'Hero Section',
      type: 'organism',
      html: heroHTML,
      css: heroCSS
    }
  }

  /**
   * Generate CSS for buttons
   */
  private static generateButtonCSS(designTokens: DesignTokens): string {
    return `
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.75rem 1.5rem;
        font-family: ${designTokens.typography.fontPairings.body};
        font-weight: ${designTokens.typography.weights.medium};
        font-size: ${designTokens.typography.scale.base};
        line-height: 1.5;
        border: none;
        border-radius: ${designTokens.borderRadius.md};
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        text-decoration: none;
      }
      
      .btn-primary {
        background-color: ${designTokens.colors.primary};
        color: white;
        box-shadow: ${designTokens.shadows.sm};
      }
      
      .btn-primary:hover {
        background-color: ${this.darkenColor(designTokens.colors.primary, 10)};
        box-shadow: ${designTokens.shadows.md};
        transform: translateY(-1px);
      }
      
      .btn-secondary {
        background-color: ${designTokens.colors.secondary};
        color: ${designTokens.colors.primary};
        box-shadow: ${designTokens.shadows.sm};
      }
      
      .btn-outline {
        background-color: transparent;
        color: ${designTokens.colors.primary};
        border: 2px solid ${designTokens.colors.primary};
      }
    `
  }

  /**
   * Generate CSS for headings
   */
  private static generateHeadingCSS(designTokens: DesignTokens): string {
    return `
      .heading {
        font-family: ${designTokens.typography.fontPairings.heading};
        font-weight: ${designTokens.typography.weights.semibold};
        line-height: 1.2;
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
      }
    `
  }

  /**
   * Generate complete HTML template
   */
  private static async generateHTML(
    requirements: ProjectRequirements,
    components: ComponentDefinition[],
    designTokens: DesignTokens
  ): Promise<string> {
    const sections = requirements.requiredSections || []
    const sectionHTML = sections.map(sectionId => {
      const component = components.find(c => c.id === sectionId)
      return component?.html || ''
    }).join('\n\n')

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${requirements.industry} ${requirements.projectType}</title>
    <style>
        ${await this.generateCSS(designTokens, components)}
    </style>
</head>
<body>
    ${sectionHTML}
</body>
</html>
    `.trim()
  }

  /**
   * Generate complete CSS with design tokens
   */
  private static async generateCSS(
    designTokens: DesignTokens,
    components: ComponentDefinition[]
  ): Promise<string> {
    const resetCSS = this.generateResetCSS()
    const tokenCSS = this.generateTokenCSS(designTokens)
    const componentCSS = components.map(c => c.css).join('\n\n')

    return `${resetCSS}\n\n${tokenCSS}\n\n${componentCSS}`
  }

  /**
   * Generate CSS reset and base styles
   */
  private static generateResetCSS(): string {
    return `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        line-height: 1.6;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      }
      
      img {
        max-width: 100%;
        height: auto;
      }
    `
  }

  /**
   * Generate CSS custom properties from design tokens
   */
  private static generateTokenCSS(designTokens: DesignTokens): string {
    return `
      :root {
        --color-primary: ${designTokens.colors.primary};
        --color-secondary: ${designTokens.colors.secondary};
        --color-accent: ${designTokens.colors.accent};
        --font-heading: ${designTokens.typography.fontPairings.heading};
        --font-body: ${designTokens.typography.fontPairings.body};
      }
    `
  }

  /**
   * Helper functions
   */
  private static generateId(): string {
    return `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private static generateTemplateName(requirements: ProjectRequirements): string {
    const style = requirements.styleDirection || 'modern'
    const type = requirements.projectType || 'website'
    return `${style.charAt(0).toUpperCase() + style.slice(1)} ${type.charAt(0).toUpperCase() + type.slice(1)} Template`
  }

  private static generateDescription(requirements: ProjectRequirements): string {
    return `A ${requirements.styleDirection || 'modern'} ${requirements.projectType || 'website'} template designed for ${requirements.industry || 'business'} with ${requirements.colorPreferences?.type || 'professional'} color scheme.`
  }

  private static darkenColor(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = (num >> 16) - amt
    const G = (num >> 8 & 0x00FF) - amt
    const B = (num & 0x0000FF) - amt
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
  }

  // Placeholder methods for other components - would be implemented similarly
  private static generateAboutComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition | null { return null }
  private static generateServicesComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition | null { return null }
  private static generateContactComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition | null { return null }
  private static generatePortfolioComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition | null { return null }
  private static generateTestimonialsComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition | null { return null }
  private static generateTeamComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition | null { return null }
  private static generatePricingComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition | null { return null }
  private static async generateInteractiveComponent(elementId: string, requirements: ProjectRequirements, designTokens: DesignTokens): Promise<ComponentDefinition | null> { return null }
}