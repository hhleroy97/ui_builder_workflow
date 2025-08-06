import { ProjectRequirements, GeneratedTemplate, ComponentDefinition, DesignTokens } from '@/types'
import { ColorTheoryEngine } from '@/lib/color-theory'
import { TypographyEngine } from '@/lib/design-system/typography'
import { getIndustryContent, getIndustryServices, getIndustryTestimonials, getIndustryTeam, getIndustryPricing, getIndustryPortfolio } from '@/lib/content/industry-content'
import { getContentStrategy, getAudienceModifiers, generatePersonalizedContent, generateCTAText, generateValuePropositions } from '@/lib/content/content-strategy'

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
        html: `<button class="btn btn-primary">Get Started</button>`,
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
        html: `<h1 class="heading">Welcome to Our Platform</h1>`,
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
    // Generate content based on industry and project type
    const content = this.generateHeroContent(requirements)
    
    const heroHTML = `
      <section class="hero">
        <div class="hero-container">
          <div class="hero-content">
            <h1 class="hero-title">${content.title}</h1>
            <p class="hero-subtitle">${content.subtitle}</p>
            <div class="hero-actions">
              <button class="btn btn-primary">${content.primaryCTA}</button>
              <button class="btn btn-secondary">${content.secondaryCTA}</button>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-placeholder" style="width: 100%; height: 300px; background: ${designTokens.colors.primary}20; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: ${designTokens.colors.primary};">
              ${content.visualPlaceholder}
            </div>
          </div>
        </div>
      </section>
    `

    const heroCSS = `
      .hero {
        padding: 5rem 1rem;
        background: linear-gradient(135deg, ${designTokens.colors.primary}15, ${designTokens.colors.secondary}10);
        min-height: 80vh;
        display: flex;
        align-items: center;
      }
      
      .hero-container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        align-items: center;
      }
      
      .hero-content {
        padding: 0;
      }
      
      .hero-title {
        font-family: ${designTokens.typography.fontPairings.heading}, serif;
        font-size: clamp(2.5rem, 4vw, ${designTokens.typography.scale['6xl']});
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        color: ${designTokens.colors.primary};
        letter-spacing: -0.02em;
      }
      
      .hero-subtitle {
        font-family: ${designTokens.typography.fontPairings.body}, sans-serif;
        font-size: ${designTokens.typography.scale.xl};
        line-height: 1.6;
        margin-bottom: 2.5rem;
        color: #4b5563;
        font-weight: 400;
      }
      
      .hero-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
      }
      
      .hero-visual {
        position: relative;
      }
      
      .hero-placeholder {
        border: 2px dashed ${designTokens.colors.primary}40;
        font-family: ${designTokens.typography.fontPairings.body}, sans-serif;
        font-weight: 500;
        background: linear-gradient(45deg, ${designTokens.colors.primary}08, ${designTokens.colors.secondary}12);
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
      }
      
      .hero-placeholder:hover {
        background: linear-gradient(45deg, ${designTokens.colors.primary}15, ${designTokens.colors.secondary}20);
        transform: translateY(-2px);
      }
      
      @media (max-width: 768px) {
        .hero-container {
          grid-template-columns: 1fr;
          gap: 2rem;
          text-align: center;
        }
        
        .hero {
          padding: 3rem 1rem;
          min-height: auto;
        }
        
        .hero-actions {
          justify-content: center;
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
    // Get sections from requirements, or use default sections based on project type
    let sections = requirements.requiredSections || []
    
    // If no sections specified, add default sections based on project type
    if (sections.length === 0) {
      const defaultSections = this.getDefaultSections(requirements.projectType || 'landing')
      sections = defaultSections
    }
    
    // Generate HTML for each section, prioritizing organism components
    const sectionHTML = sections.map(sectionId => {
      const component = components.find(c => c.id === sectionId && c.type === 'organism')
      return component?.html || ''
    }).filter(html => html.trim() !== '').join('\n\n')
    
    // If no section HTML, generate a basic layout with all organism components
    let bodyContent = sectionHTML
    if (!bodyContent.trim()) {
      const organismComponents = components.filter(c => c.type === 'organism' && c.html && c.html.trim() !== '')
      bodyContent = organismComponents.map(c => c.html).join('\n\n')
      
      // If still no content, create a showcase of all components
      if (!bodyContent.trim()) {
        const templateName = this.generateTemplateName(requirements)
        const templateDesc = this.generateDescription(requirements)
        const primaryColor = designTokens.colors.primary
        
        const componentShowcase = components
          .filter(comp => comp.html && comp.html.trim())
          .map(comp => 
            '<div style="margin-bottom: 2rem; padding: 2rem; border: 1px solid #e5e5e5; border-radius: 8px;">' +
            `<h3 style="margin-bottom: 1rem; color: ${primaryColor};">${comp.name} Component</h3>` +
            comp.html +
            '</div>'
          ).join('\n')
        
        bodyContent = `
          <main style="padding: 2rem;">
            <header style="text-align: center; margin-bottom: 3rem;">
              <h1 style="color: ${primaryColor}; margin-bottom: 1rem;">${templateName}</h1>
              <p style="color: #666; max-width: 600px; margin: 0 auto;">${templateDesc}</p>
            </header>
            <section style="max-width: 1200px; margin: 0 auto;">
              ${componentShowcase}
            </section>
          </main>
        `
      }
    }

    const fontImports = this.generateFontImports(designTokens)
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${requirements.industry} ${requirements.projectType}</title>
    ${fontImports}
    <style>
        ${await this.generateCSS(designTokens, components)}
    </style>
</head>
<body>
    ${bodyContent}
</body>
</html>
    `.trim()
  }

  /**
   * Generate Google Fonts imports for the template
   */
  private static generateFontImports(designTokens: DesignTokens): string {
    const headingFont = designTokens.typography.fontPairings.heading
    const bodyFont = designTokens.typography.fontPairings.body
    
    // Create Google Fonts URL with proper weights
    const fonts = new Set([headingFont, bodyFont])
    const fontParams = Array.from(fonts).map(font => 
      `${font.replace(/ /g, '+')}:300,400,500,600,700`
    ).join('&family=')
    
    return `    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${fontParams}&display=swap" rel="stylesheet">`
  }

  /**
   * Generate hero content based on requirements
   */
  private static generateHeroContent(requirements: ProjectRequirements): any {
    const industryContent = getIndustryContent(requirements.industry || 'tech')
    const ctaTexts = generateCTAText(requirements)
    
    // Get base content from industry library
    const baseHeroContent = industryContent.hero
    
    // Apply personalization
    const personalizedTitle = generatePersonalizedContent(baseHeroContent.title, requirements)
    const personalizedSubtitle = generatePersonalizedContent(baseHeroContent.subtitle, requirements)

    return {
      title: personalizedTitle,
      subtitle: personalizedSubtitle,
      primaryCTA: ctaTexts.primary,
      secondaryCTA: ctaTexts.secondary,
      visualPlaceholder: baseHeroContent.visualPlaceholder
    }
  }

  /**
   * Generate about content based on requirements
   */
  private static generateAboutContent(requirements: ProjectRequirements): any {
    const industryContent = getIndustryContent(requirements.industry || 'tech')
    const baseAboutContent = industryContent.about
    
    // Apply personalization and strategy-based modifications
    const personalizedTitle = generatePersonalizedContent(baseAboutContent.title, requirements)
    const personalizedDescription = generatePersonalizedContent(baseAboutContent.description, requirements)
    
    return {
      title: personalizedTitle,
      description: personalizedDescription,
      feature1Title: baseAboutContent.feature1Title,
      feature1Description: generatePersonalizedContent(baseAboutContent.feature1Description, requirements),
      feature2Title: baseAboutContent.feature2Title,
      feature2Description: generatePersonalizedContent(baseAboutContent.feature2Description, requirements),
      feature3Title: baseAboutContent.feature3Title,
      feature3Description: baseAboutContent.feature3Description ? generatePersonalizedContent(baseAboutContent.feature3Description, requirements) : undefined
    }
  }

  /**
   * Generate contact content based on requirements
   */
  private static generateContactContent(requirements: ProjectRequirements): any {
    const industryContent = getIndustryContent(requirements.industry || 'tech')
    const baseContactContent = industryContent.contact
    
    const personalizedTitle = generatePersonalizedContent(baseContactContent.title, requirements)
    const personalizedDescription = generatePersonalizedContent(baseContactContent.description, requirements)
    
    return {
      title: personalizedTitle,
      description: personalizedDescription,
      phone: baseContactContent.phone,
      email: baseContactContent.email,
      address: baseContactContent.address
    }
  }

  /**
   * Get default sections based on project type
   */
  private static getDefaultSections(projectType: string): string[] {
    const sectionMap = {
      'landing': ['hero', 'about', 'services', 'contact'],
      'portfolio': ['hero', 'about', 'portfolio', 'contact'],
      'ecommerce': ['hero', 'services', 'portfolio', 'contact'],
      'saas': ['hero', 'about', 'pricing', 'contact'],
      'blog': ['hero', 'about', 'contact'],
      'corporate': ['hero', 'about', 'services', 'team', 'contact']
    }
    
    return sectionMap[projectType as keyof typeof sectionMap] || ['hero', 'about', 'contact']
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

  /**
   * Generate about section component
   */
  private static generateAboutComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition {
    const content = this.generateAboutContent(requirements)
    
    const aboutHTML = `
      <section class="about">
        <div class="about-container">
          <div class="about-content">
            <h2 class="about-title">${content.title}</h2>
            <p class="about-description">${content.description}</p>
            <div class="about-features">
              <div class="feature">
                <h3>${content.feature1Title}</h3>
                <p>${content.feature1Description}</p>
              </div>
              <div class="feature">
                <h3>${content.feature2Title}</h3>
                <p>${content.feature2Description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `

    const aboutCSS = `
      .about {
        padding: 4rem 1rem;
        background: ${designTokens.colors.neutral}10;
      }
      
      .about-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .about-title {
        font-family: ${designTokens.typography.fontPairings.heading};
        font-size: ${designTokens.typography.scale['3xl']};
        color: ${designTokens.colors.primary};
        margin-bottom: 1.5rem;
        text-align: center;
      }
      
      .about-description {
        font-size: ${designTokens.typography.scale.lg};
        text-align: center;
        margin-bottom: 3rem;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .about-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .feature h3 {
        font-family: ${designTokens.typography.fontPairings.heading};
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
      }
    `

    return {
      id: 'about',
      name: 'About Section',
      type: 'organism',
      html: aboutHTML,
      css: aboutCSS
    }
  }

  /**
   * Generate contact section component
   */
  private static generateContactComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition {
    const content = this.generateContactContent(requirements)
    
    const contactHTML = `
      <section class="contact">
        <div class="contact-container">
          <div class="contact-content">
            <h2 class="contact-title">${content.title}</h2>
            <p class="contact-description">${content.description}</p>
            <div class="contact-form">
              <form>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `

    const contactCSS = `
      .contact {
        padding: 4rem 1rem;
        background: ${designTokens.colors.primary}05;
      }
      
      .contact-container {
        max-width: 800px;
        margin: 0 auto;
      }
      
      .contact-title {
        font-family: ${designTokens.typography.fontPairings.heading};
        font-size: ${designTokens.typography.scale['3xl']};
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
        text-align: center;
      }
      
      .contact-description {
        text-align: center;
        margin-bottom: 2rem;
        color: #6b7280;
      }
      
      .form-group {
        margin-bottom: 1.5rem;
      }
      
      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: ${designTokens.typography.weights.medium};
        color: ${designTokens.colors.primary};
      }
      
      .form-group input,
      .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e5e7eb;
        border-radius: ${designTokens.borderRadius.md};
        font-family: ${designTokens.typography.fontPairings.body};
      }
      
      .form-group input:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: ${designTokens.colors.primary};
      }
    `

    return {
      id: 'contact',
      name: 'Contact Section',
      type: 'organism',
      html: contactHTML,
      css: contactCSS
    }
  }

  /**
   * Generate services section component
   */
  private static generateServicesComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition {
    const industryContent = getIndustryContent(requirements.industry || 'tech')
    const servicesContent = industryContent.services
    
    // Generate service cards HTML
    const serviceCardsHTML = servicesContent.services.map(service => `
      <div class="service-card">
        <div class="service-icon">
          <div class="icon-placeholder">${service.icon}</div>
        </div>
        <h3>${service.title}</h3>
        <p class="service-description">${service.description}</p>
        <ul class="service-features">
          ${service.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
    `).join('')

    const servicesHTML = `
      <section class="services">
        <div class="services-container">
          <div class="services-header">
            <h2 class="services-title">${servicesContent.title}</h2>
            <p class="services-subtitle">${servicesContent.subtitle}</p>
          </div>
          <div class="services-grid">
            ${serviceCardsHTML}
          </div>
        </div>
      </section>
    `

    const servicesCSS = `
      .services {
        padding: 4rem 1rem;
        background: ${designTokens.colors.neutral}05;
      }
      
      .services-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .services-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .services-title {
        font-family: ${designTokens.typography.fontPairings.heading};
        font-size: ${designTokens.typography.scale['3xl']};
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
      }
      
      .services-subtitle {
        font-size: ${designTokens.typography.scale.lg};
        color: #6b7280;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
      }
      
      .service-card {
        padding: 2.5rem;
        background: white;
        border-radius: ${designTokens.borderRadius.lg};
        box-shadow: ${designTokens.shadows.sm};
        text-align: center;
        border: 1px solid ${designTokens.colors.neutral}20;
        transition: all 0.3s ease;
      }
      
      .service-card:hover {
        transform: translateY(-4px);
        box-shadow: ${designTokens.shadows.lg};
        border-color: ${designTokens.colors.primary}20;
      }
      
      .service-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto 1.5rem;
        background: ${designTokens.colors.primary}10;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .icon-placeholder {
        color: ${designTokens.colors.primary};
        font-weight: bold;
        font-size: 0.875rem;
      }
      
      .service-card h3 {
        font-family: ${designTokens.typography.fontPairings.heading};
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
        font-size: ${designTokens.typography.scale.xl};
      }
      
      .service-description {
        color: #6b7280;
        margin-bottom: 1.5rem;
        line-height: 1.6;
      }
      
      .service-features {
        list-style: none;
        padding: 0;
        text-align: left;
      }
      
      .service-features li {
        padding: 0.5rem 0;
        color: #374151;
        position: relative;
        padding-left: 1.5rem;
      }
      
      .service-features li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: ${designTokens.colors.primary};
        font-weight: bold;
      }
      
      @media (max-width: 768px) {
        .services-grid {
          grid-template-columns: 1fr;
        }
        
        .service-card {
          padding: 2rem;
        }
      }
    `

    return {
      id: 'services',
      name: 'Services Section',
      type: 'organism',
      html: servicesHTML,
      css: servicesCSS
    }
  }

  /**
   * Generate portfolio section component
   */
  private static generatePortfolioComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition {
    const industryContent = getIndustryContent(requirements.industry || 'tech')
    const portfolioContent = industryContent.portfolio
    
    const portfolioItemsHTML = portfolioContent.projects.map(project => `
      <div class="portfolio-item">
        <div class="portfolio-image">
          <div class="image-placeholder">${project.category}</div>
        </div>
        <div class="portfolio-content">
          <div class="portfolio-meta">
            <span class="portfolio-category">${project.category}</span>
            ${project.metrics ? `<span class="portfolio-metric">${project.metrics}</span>` : ''}
          </div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="portfolio-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('')

    const portfolioHTML = `
      <section class="portfolio">
        <div class="portfolio-container">
          <div class="portfolio-header">
            <h2 class="portfolio-title">${portfolioContent.title}</h2>
            <p class="portfolio-subtitle">${portfolioContent.subtitle}</p>
          </div>
          <div class="portfolio-grid">
            ${portfolioItemsHTML}
          </div>
        </div>
      </section>
    `

    const portfolioCSS = `
      .portfolio {
        padding: 4rem 1rem;
      }
      
      .portfolio-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .portfolio-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .portfolio-title {
        font-family: ${designTokens.typography.fontPairings.heading};
        font-size: ${designTokens.typography.scale['3xl']};
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
      }
      
      .portfolio-subtitle {
        font-size: ${designTokens.typography.scale.lg};
        color: #6b7280;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
      }
      
      .portfolio-item {
        background: white;
        border-radius: ${designTokens.borderRadius.lg};
        box-shadow: ${designTokens.shadows.sm};
        overflow: hidden;
        transition: transform 0.3s ease;
      }
      
      .portfolio-item:hover {
        transform: translateY(-4px);
        box-shadow: ${designTokens.shadows.lg};
      }
      
      .portfolio-image {
        height: 200px;
        background: linear-gradient(135deg, ${designTokens.colors.primary}20, ${designTokens.colors.secondary}20);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .image-placeholder {
        color: ${designTokens.colors.primary};
        font-weight: bold;
        font-size: 1.125rem;
      }
      
      .portfolio-content {
        padding: 1.5rem;
      }
      
      .portfolio-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }
      
      .portfolio-category {
        font-size: 0.875rem;
        color: ${designTokens.colors.primary};
        font-weight: 500;
      }
      
      .portfolio-metric {
        font-size: 0.875rem;
        color: #059669;
        font-weight: 500;
      }
      
      .portfolio-content h3 {
        font-family: ${designTokens.typography.fontPairings.heading};
        color: ${designTokens.colors.primary};
        margin-bottom: 0.5rem;
      }
      
      .portfolio-content p {
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 1rem;
      }
      
      .portfolio-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      
      .tag {
        background: ${designTokens.colors.neutral}15;
        color: ${designTokens.colors.primary};
        padding: 0.25rem 0.5rem;
        border-radius: ${designTokens.borderRadius.sm};
        font-size: 0.75rem;
      }
    `

    return {
      id: 'portfolio',
      name: 'Portfolio Section',
      type: 'organism',
      html: portfolioHTML,
      css: portfolioCSS
    }
  }

  /**
   * Generate testimonials section component
   */
  private static generateTestimonialsComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition {
    const industryContent = getIndustryContent(requirements.industry || 'tech')
    const testimonialsContent = industryContent.testimonials
    
    const testimonialItemsHTML = testimonialsContent.testimonials.map(testimonial => `
      <div class="testimonial-card">
        <div class="testimonial-rating">
          ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
        </div>
        <blockquote>"${testimonial.content}"</blockquote>
        <div class="testimonial-author">
          <div class="author-info">
            <div class="author-name">${testimonial.name}</div>
            <div class="author-role">${testimonial.role}, ${testimonial.company}</div>
          </div>
        </div>
      </div>
    `).join('')

    const testimonialsHTML = `
      <section class="testimonials">
        <div class="testimonials-container">
          <div class="testimonials-header">
            <h2 class="testimonials-title">${testimonialsContent.title}</h2>
            <p class="testimonials-subtitle">${testimonialsContent.subtitle}</p>
          </div>
          <div class="testimonials-grid">
            ${testimonialItemsHTML}
          </div>
        </div>
      </section>
    `

    const testimonialsCSS = `
      .testimonials {
        padding: 4rem 1rem;
        background: ${designTokens.colors.neutral}05;
      }
      
      .testimonials-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .testimonials-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .testimonials-title {
        font-family: ${designTokens.typography.fontPairings.heading};
        font-size: ${designTokens.typography.scale['3xl']};
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
      }
      
      .testimonials-subtitle {
        font-size: ${designTokens.typography.scale.lg};
        color: #6b7280;
      }
      
      .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
      }
      
      .testimonial-card {
        background: white;
        padding: 2rem;
        border-radius: ${designTokens.borderRadius.lg};
        box-shadow: ${designTokens.shadows.sm};
        border: 1px solid ${designTokens.colors.neutral}20;
      }
      
      .testimonial-rating {
        color: #fbbf24;
        margin-bottom: 1rem;
        font-size: 1.125rem;
      }
      
      .testimonial-card blockquote {
        font-size: ${designTokens.typography.scale.lg};
        line-height: 1.6;
        color: #374151;
        margin: 0 0 1.5rem 0;
        font-style: italic;
      }
      
      .author-info {
        text-align: left;
      }
      
      .author-name {
        font-weight: 600;
        color: ${designTokens.colors.primary};
      }
      
      .author-role {
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 0.25rem;
      }
    `

    return {
      id: 'testimonials',
      name: 'Testimonials Section',
      type: 'organism',
      html: testimonialsHTML,
      css: testimonialsCSS
    }
  }

  /**
   * Generate team section component
   */
  private static generateTeamComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition {
    const industryContent = getIndustryContent(requirements.industry || 'tech')
    const teamContent = industryContent.team
    
    const teamMembersHTML = teamContent.members.map(member => `
      <div class="team-member">
        <div class="member-photo">
          <div class="photo-placeholder">${member.name.split(' ').map(n => n[0]).join('')}</div>
        </div>
        <div class="member-info">
          <h3>${member.name}</h3>
          <div class="member-role">${member.role}</div>
          <p class="member-description">${member.description}</p>
          <div class="member-expertise">
            ${member.expertise.map(skill => `<span class="expertise-tag">${skill}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('')

    const teamHTML = `
      <section class="team">
        <div class="team-container">
          <div class="team-header">
            <h2 class="team-title">${teamContent.title}</h2>
            <p class="team-subtitle">${teamContent.subtitle}</p>
          </div>
          <div class="team-grid">
            ${teamMembersHTML}
          </div>
        </div>
      </section>
    `

    const teamCSS = `
      .team {
        padding: 4rem 1rem;
      }
      
      .team-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .team-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .team-title {
        font-family: ${designTokens.typography.fontPairings.heading};
        font-size: ${designTokens.typography.scale['3xl']};
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
      }
      
      .team-subtitle {
        font-size: ${designTokens.typography.scale.lg};
        color: #6b7280;
      }
      
      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .team-member {
        background: white;
        padding: 2rem;
        border-radius: ${designTokens.borderRadius.lg};
        box-shadow: ${designTokens.shadows.sm};
        text-align: center;
        border: 1px solid ${designTokens.colors.neutral}20;
      }
      
      .member-photo {
        width: 120px;
        height: 120px;
        margin: 0 auto 1.5rem;
        background: ${designTokens.colors.primary}15;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .photo-placeholder {
        color: ${designTokens.colors.primary};
        font-weight: bold;
        font-size: 2rem;
      }
      
      .member-info h3 {
        font-family: ${designTokens.typography.fontPairings.heading};
        color: ${designTokens.colors.primary};
        margin-bottom: 0.5rem;
      }
      
      .member-role {
        color: #6b7280;
        font-weight: 500;
        margin-bottom: 1rem;
      }
      
      .member-description {
        color: #374151;
        line-height: 1.6;
        margin-bottom: 1.5rem;
        text-align: left;
      }
      
      .member-expertise {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
      }
      
      .expertise-tag {
        background: ${designTokens.colors.primary}10;
        color: ${designTokens.colors.primary};
        padding: 0.25rem 0.75rem;
        border-radius: ${designTokens.borderRadius.sm};
        font-size: 0.75rem;
        font-weight: 500;
      }
    `

    return {
      id: 'team',
      name: 'Team Section',
      type: 'organism',
      html: teamHTML,
      css: teamCSS
    }
  }

  /**
   * Generate pricing section component
   */
  private static generatePricingComponent(requirements: ProjectRequirements, designTokens: DesignTokens): ComponentDefinition {
    const industryContent = getIndustryContent(requirements.industry || 'tech')
    const pricingContent = industryContent.pricing
    
    const pricingPlansHTML = pricingContent.plans.map(plan => `
      <div class="pricing-card ${plan.highlighted ? 'pricing-highlighted' : ''}">
        ${plan.highlighted ? '<div class="pricing-badge">Most Popular</div>' : ''}
        <div class="pricing-header">
          <h3>${plan.name}</h3>
          <div class="pricing-price">
            <span class="price">${plan.price}</span>
            <span class="period">/${plan.period}</span>
          </div>
          <p class="pricing-description">${plan.description}</p>
        </div>
        <ul class="pricing-features">
          ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="pricing-cta">
          <button class="pricing-button ${plan.highlighted ? 'button-primary' : 'button-outline'}">
            ${plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
          </button>
        </div>
      </div>
    `).join('')

    const pricingHTML = `
      <section class="pricing">
        <div class="pricing-container">
          <div class="pricing-header">
            <h2 class="pricing-title">${pricingContent.title}</h2>
            <p class="pricing-subtitle">${pricingContent.subtitle}</p>
          </div>
          <div class="pricing-grid">
            ${pricingPlansHTML}
          </div>
        </div>
      </section>
    `

    const pricingCSS = `
      .pricing {
        padding: 4rem 1rem;
        background: ${designTokens.colors.neutral}05;
      }
      
      .pricing-container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .pricing-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      
      .pricing-title {
        font-family: ${designTokens.typography.fontPairings.heading};
        font-size: ${designTokens.typography.scale['3xl']};
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
      }
      
      .pricing-subtitle {
        font-size: ${designTokens.typography.scale.lg};
        color: #6b7280;
      }
      
      .pricing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        align-items: stretch;
      }
      
      .pricing-card {
        background: white;
        border-radius: ${designTokens.borderRadius.lg};
        box-shadow: ${designTokens.shadows.sm};
        padding: 2.5rem;
        text-align: center;
        position: relative;
        border: 1px solid ${designTokens.colors.neutral}20;
        display: flex;
        flex-direction: column;
      }
      
      .pricing-highlighted {
        border-color: ${designTokens.colors.primary};
        box-shadow: ${designTokens.shadows.lg};
        transform: scale(1.02);
      }
      
      .pricing-badge {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        background: ${designTokens.colors.primary};
        color: white;
        padding: 0.5rem 1rem;
        border-radius: ${designTokens.borderRadius.sm};
        font-size: 0.875rem;
        font-weight: 500;
      }
      
      .pricing-header h3 {
        font-family: ${designTokens.typography.fontPairings.heading};
        color: ${designTokens.colors.primary};
        margin-bottom: 1rem;
        font-size: ${designTokens.typography.scale.xl};
      }
      
      .pricing-price {
        margin-bottom: 1rem;
      }
      
      .price {
        font-size: 2.5rem;
        font-weight: bold;
        color: ${designTokens.colors.primary};
      }
      
      .period {
        color: #6b7280;
        font-size: ${designTokens.typography.scale.base};
      }
      
      .pricing-description {
        color: #6b7280;
        margin-bottom: 2rem;
      }
      
      .pricing-features {
        list-style: none;
        padding: 0;
        margin: 0 0 2rem 0;
        text-align: left;
        flex-grow: 1;
      }
      
      .pricing-features li {
        padding: 0.75rem 0;
        color: #374151;
        position: relative;
        padding-left: 1.5rem;
        border-bottom: 1px solid ${designTokens.colors.neutral}15;
      }
      
      .pricing-features li:last-child {
        border-bottom: none;
      }
      
      .pricing-features li::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: ${designTokens.colors.primary};
        font-weight: bold;
      }
      
      .pricing-button {
        width: 100%;
        padding: 0.75rem 1.5rem;
        border-radius: ${designTokens.borderRadius.md};
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .button-primary {
        background: ${designTokens.colors.primary};
        color: white;
        border: none;
      }
      
      .button-primary:hover {
        background: ${designTokens.colors.primary}dd;
        transform: translateY(-1px);
      }
      
      .button-outline {
        background: transparent;
        color: ${designTokens.colors.primary};
        border: 2px solid ${designTokens.colors.primary};
      }
      
      .button-outline:hover {
        background: ${designTokens.colors.primary}10;
      }
    `

    return {
      id: 'pricing',
      name: 'Pricing Section',
      type: 'organism',
      html: pricingHTML,
      css: pricingCSS
    }
  }

  private static async generateInteractiveComponent(elementId: string, requirements: ProjectRequirements, designTokens: DesignTokens): Promise<ComponentDefinition | null> {
    // Simple implementation for interactive components
    switch (elementId) {
      case 'contact_form':
        return this.generateContactComponent(requirements, designTokens)
      default:
        return null
    }
  }
}