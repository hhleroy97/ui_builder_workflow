/**
 * Figma Export Service
 * 
 * High-level service for exporting templates to Figma
 * Handles the workflow from generated template to Figma-ready components
 */

import { GeneratedTemplate } from '@/types'
import { FigmaPluginBridge } from './plugin-bridge'

export interface FigmaExportResult {
  success: boolean
  pluginDownloadUrl?: string
  pluginCode?: string
  instructions?: string
  error?: string
}

export interface FigmaExportOptions {
  includeStyles: boolean
  includeComponents: boolean
  createComponentSet: boolean
  organizationMode: 'single-page' | 'multiple-pages' | 'library'
}

export class FigmaExportService {
  private static bridge = FigmaPluginBridge.getInstance()

  /**
   * Export template to Figma plugin format
   */
  static async exportTemplate(
    template: GeneratedTemplate, 
    options: Partial<FigmaExportOptions> = {}
  ): Promise<FigmaExportResult> {
    try {
      const exportOptions: FigmaExportOptions = {
        includeStyles: true,
        includeComponents: true,
        createComponentSet: true,
        organizationMode: 'single-page',
        ...options
      }

      // Convert template to Figma format
      const result = await this.bridge.exportToFigma(template)

      if (!result.success) {
        return {
          success: false,
          error: result.error
        }
      }

      // Generate comprehensive instructions
      const instructions = this.generateInstructions(template, exportOptions)

      return {
        success: true,
        pluginDownloadUrl: result.downloadUrl,
        pluginCode: result.pluginCode,
        instructions
      }

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Export failed'
      }
    }
  }

  /**
   * Generate step-by-step instructions for using the Figma plugin
   */
  private static generateInstructions(
    template: GeneratedTemplate, 
    options: FigmaExportOptions
  ): string {
    const componentCount = template.components.length
    const colorCount = Object.keys(template.designTokens.colors).length

    return `
# ${template.name} - Figma Import Instructions

## Overview
Your template has been converted into a Figma plugin that will create:
- ${componentCount} components based on your generated template
- ${colorCount} color styles from your design system
- Typography styles for consistent text formatting
- Component variants where applicable

## Step 1: Download Plugin
1. Click the "Download Plugin" button to get your custom Figma plugin
2. Extract the downloaded files to a folder on your computer

## Step 2: Install Plugin in Figma
1. Open Figma and go to any file or create a new file
2. Go to Menu → Plugins → Development → Import plugin from manifest
3. Select the manifest.json file from your extracted plugin folder
4. The plugin will appear in your Plugins menu

## Step 3: Run the Plugin
1. Go to Menu → Plugins → Development → ${template.name} Template Importer
2. Click "Import Components" in the plugin interface
3. Wait for the import to complete

## What Gets Created

### Components (${componentCount} total)
${template.components.map(comp => `- **${comp.name}**: ${comp.type} component`).join('\n')}

### Design System
- **Colors**: ${Object.keys(template.designTokens.colors).join(', ')}
- **Typography**: Heading (${template.designTokens.typography.fontPairings.heading}), Body (${template.designTokens.typography.fontPairings.body})
- **Spacing**: Consistent spacing scale based on your preferences

## Tips for Success
- Run the plugin in a new Figma file to avoid conflicts
- After import, you can duplicate components to create variations
- Use the created color and text styles for consistency
- Components can be published to your team library for reuse

## Selling Your Template
Your imported components are ready for:
- Publishing to Figma Community as a free resource
- Selling on template marketplaces like Gumroad, Creative Market
- Using in client projects with proper licensing
- Creating design system documentation

## Next Steps
1. Customize the imported components with your actual content
2. Add component descriptions and usage guidelines
3. Create cover art for marketplace listings
4. Set up proper versioning if publishing to team libraries

## Troubleshooting
- **Import fails**: Make sure you're using the latest version of Figma
- **Missing fonts**: Install required fonts: ${template.designTokens.typography.fontPairings.heading}, ${template.designTokens.typography.fontPairings.body}
- **Colors look different**: Check your display color profile settings
- **Need help**: Contact support with your template ID: ${template.id}

Generated on ${new Date().toLocaleDateString()} with UI Builder Workflow
`.trim()
  }

  /**
   * Create a simplified export for basic users
   */
  static async createSimpleExport(template: GeneratedTemplate): Promise<{
    figmaUrl: string
    instructions: string
  }> {
    // Create a shareable link with template data
    const templateData = encodeURIComponent(JSON.stringify({
      name: template.name,
      components: template.components.map(c => ({
        name: c.name,
        type: c.type,
        html: c.html.substring(0, 500) // Truncate for URL limits
      })),
      colors: template.designTokens.colors,
      fonts: template.designTokens.typography.fontPairings
    }))

    const figmaUrl = `https://www.figma.com/community/plugin/967113620179755781/Import-HTML-CSS?template=${templateData}`

    const instructions = `
# Quick Figma Export

## Option 1: Use HTML to Figma Plugin
1. Copy this link: ${figmaUrl}
2. Open the link in Figma
3. Run the plugin to import your HTML/CSS

## Option 2: Manual Import
1. Copy the HTML from your results page
2. Use a Figma HTML import plugin like "HTML to Figma" or "Figma to HTML"
3. Paste your code and convert

## Your Design Tokens
**Colors:** ${Object.entries(template.designTokens.colors).map(([name, color]) => `${name}: ${color}`).join(', ')}
**Fonts:** ${template.designTokens.typography.fontPairings.heading} (headings), ${template.designTokens.typography.fontPairings.body} (body)
    `.trim()

    return {
      figmaUrl,
      instructions
    }
  }

  /**
   * Generate Figma Community template description
   */
  static generateCommunityDescription(template: GeneratedTemplate): string {
    const componentTypes = Array.from(new Set(template.components.map(c => c.type)))
    
    return `
🎨 ${template.name}

A professional website template with ${template.components.length} components, designed with modern UI/UX principles.

## What's Included
- ${template.components.length} production-ready components
- Complete design system with colors and typography
- ${componentTypes.join(', ')} component types
- Mobile-responsive layouts
- Accessibility-compliant design

## Components
${template.components.map(c => `• ${c.name}`).join('\n')}

## Design System
${Object.keys(template.designTokens.colors).length} carefully chosen colors with optimal contrast ratios
Typography system with ${template.designTokens.typography.fontPairings.heading} and ${template.designTokens.typography.fontPairings.body}

Perfect for creating professional websites, landing pages, and digital experiences.

#website #template #uikit #designsystem #components
    `.trim()
  }

  /**
   * Validate template for Figma export
   */
  static validateTemplate(template: GeneratedTemplate): {
    isValid: boolean
    warnings: string[]
    errors: string[]
  } {
    const warnings: string[] = []
    const errors: string[] = []

    // Check required fields
    if (!template.name || template.name.trim().length === 0) {
      errors.push('Template name is required')
    }

    if (!template.components || template.components.length === 0) {
      errors.push('Template must have at least one component')
    }

    // Check component validity
    template.components.forEach((component, index) => {
      if (!component.name || component.name.trim().length === 0) {
        errors.push(`Component ${index + 1} is missing a name`)
      }
      
      if (!component.html || component.html.trim().length === 0) {
        warnings.push(`Component "${component.name}" has no HTML content`)
      }
    })

    // Check design tokens
    if (!template.designTokens.colors || Object.keys(template.designTokens.colors).length === 0) {
      warnings.push('No color tokens found - components may lack styling')
    }

    if (!template.designTokens.typography?.fontPairings) {
      warnings.push('No typography settings found - text may use default fonts')
    }

    // Check for common issues
    const totalHtmlLength = template.components.reduce((total, comp) => total + comp.html.length, 0)
    if (totalHtmlLength > 50000) {
      warnings.push('Template is very large - consider splitting into multiple files')
    }

    return {
      isValid: errors.length === 0,
      warnings,
      errors
    }
  }
}

export default FigmaExportService