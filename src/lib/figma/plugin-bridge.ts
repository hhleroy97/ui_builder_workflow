/**
 * Figma Plugin Bridge
 * 
 * This service handles communication with a Figma plugin for creating components
 * Since Figma's REST API is read-only, we need a plugin to create components programmatically
 */

import { GeneratedTemplate, ComponentDefinition, DesignTokens } from '@/types'

export interface FigmaComponent {
  id: string
  name: string
  type: 'frame' | 'component'
  width: number
  height: number
  children: FigmaNode[]
  fills?: FigmaFill[]
  strokes?: FigmaStroke[]
  effects?: FigmaEffect[]
}

export interface FigmaNode {
  type: 'text' | 'rectangle' | 'ellipse' | 'frame'
  name: string
  x: number
  y: number
  width: number
  height: number
  fills?: FigmaFill[]
  strokes?: FigmaStroke[]
  constraints?: FigmaConstraints
  characters?: string // For text nodes
  fontSize?: number
  fontFamily?: string
  fontWeight?: number
}

export interface FigmaFill {
  type: 'solid' | 'gradient'
  color: {
    r: number
    g: number
    b: number
    a?: number
  }
}

export interface FigmaStroke {
  type: 'solid'
  color: {
    r: number
    g: number
    b: number
    a?: number
  }
  strokeWidth: number
}

export interface FigmaEffect {
  type: 'drop_shadow' | 'inner_shadow' | 'blur'
  color?: {
    r: number
    g: number
    b: number
    a: number
  }
  offset?: {
    x: number
    y: number
  }
  radius: number
  spread?: number
}

export interface FigmaConstraints {
  horizontal: 'left' | 'right' | 'center' | 'left_right' | 'scale'
  vertical: 'top' | 'bottom' | 'center' | 'top_bottom' | 'scale'
}

export interface FigmaPluginMessage {
  type: 'CREATE_COMPONENTS' | 'CREATE_STYLES' | 'EXPORT_COMPLETE' | 'ERROR'
  payload: any
}

export class FigmaPluginBridge {
  private static instance: FigmaPluginBridge | null = null
  private messageHandlers: Map<string, (data: any) => void> = new Map()
  private isPluginReady = false

  static getInstance(): FigmaPluginBridge {
    if (!this.instance) {
      this.instance = new FigmaPluginBridge()
    }
    return this.instance
  }

  private constructor() {
    // Listen for messages from the Figma plugin
    if (typeof window !== 'undefined') {
      window.addEventListener('message', this.handleMessage.bind(this))
    }
  }

  private handleMessage(event: MessageEvent) {
    if (event.origin !== 'https://www.figma.com') return

    const message: FigmaPluginMessage = event.data
    
    switch (message.type) {
      case 'EXPORT_COMPLETE':
        this.isPluginReady = true
        this.notifyHandlers('export_complete', message.payload)
        break
      case 'ERROR':
        this.notifyHandlers('error', message.payload)
        break
    }
  }

  private notifyHandlers(event: string, data: any) {
    const handler = this.messageHandlers.get(event)
    if (handler) {
      handler(data)
    }
  }

  /**
   * Register event handlers for plugin communication
   */
  on(event: string, handler: (data: any) => void) {
    this.messageHandlers.set(event, handler)
  }

  /**
   * Generate Figma plugin code for component creation
   */
  generatePluginCode(template: GeneratedTemplate): string {
    return `
// Figma Plugin Code for ${template.name}
// This code should be run inside a Figma plugin

(function() {
  const designTokens = ${JSON.stringify(template.designTokens, null, 2)};
  const components = ${JSON.stringify(template.components, null, 2)};

  // Helper function to convert hex to RGB
  function hexToRgb(hex) {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : null;
  }

  // Create color styles from design tokens
  function createColorStyles() {
    Object.entries(designTokens.colors).forEach(([name, color]) => {
      if (typeof color === 'string') {
        const rgb = hexToRgb(color);
        if (rgb) {
          const paintStyle = figma.createPaintStyle();
          paintStyle.name = name;
          paintStyle.paints = [{
            type: 'SOLID',
            color: rgb
          }];
        }
      }
    });
  }

  // Create text styles from typography tokens
  function createTextStyles() {
    const typography = designTokens.typography;
    
    // Create heading styles
    const headingStyle = figma.createTextStyle();
    headingStyle.name = 'Heading';
    headingStyle.fontName = { family: typography.fontPairings.heading, style: 'Regular' };
    headingStyle.fontSize = typography.scale.h1;
    
    // Create body styles
    const bodyStyle = figma.createTextStyle();
    bodyStyle.name = 'Body';
    bodyStyle.fontName = { family: typography.fontPairings.body, style: 'Regular' };
    bodyStyle.fontSize = typography.scale.body;
  }

  // Create components from HTML/CSS
  function createComponents() {
    components.forEach(component => {
      const frame = figma.createFrame();
      frame.name = component.name;
      frame.resize(400, 300); // Default size
      
      // Set background color
      const primaryColor = hexToRgb(designTokens.colors.primary);
      if (primaryColor) {
        frame.fills = [{
          type: 'SOLID',
          color: primaryColor
        }];
      }

      // Create component from frame
      const figmaComponent = figma.createComponent();
      figmaComponent.name = component.name;
      figmaComponent.appendChild(frame);
      
      // Position components in a grid
      const index = components.indexOf(component);
      figmaComponent.x = (index % 3) * 450;
      figmaComponent.y = Math.floor(index / 3) * 350;
    });
  }

  // Main execution
  try {
    createColorStyles();
    createTextStyles();
    createComponents();
    
    figma.closePlugin('Template components created successfully!');
  } catch (error) {
    figma.closePlugin('Error creating components: ' + error.message);
  }
})();
    `.trim()
  }

  /**
   * Convert template to Figma-compatible format
   */
  convertTemplateToFigma(template: GeneratedTemplate): {
    components: FigmaComponent[]
    styles: any
    pluginCode: string
  } {
    const figmaComponents: FigmaComponent[] = template.components.map((component, index) => {
      return {
        id: component.id,
        name: component.name,
        type: 'component',
        width: 400,
        height: 300,
        children: this.parseHTMLToFigmaNodes(component.html),
        fills: [{
          type: 'solid',
          color: this.hexToRgb(template.designTokens.colors.primary || '#3b82f6')
        }]
      }
    })

    const styles = {
      colors: this.convertColorsToFigmaStyles(template.designTokens.colors),
      typography: this.convertTypographyToFigmaStyles(template.designTokens.typography)
    }

    return {
      components: figmaComponents,
      styles,
      pluginCode: this.generatePluginCode(template)
    }
  }

  private parseHTMLToFigmaNodes(html: string): FigmaNode[] {
    // Simplified HTML to Figma node conversion
    // In a real implementation, you'd parse the HTML and create appropriate Figma nodes
    const nodes: FigmaNode[] = []

    // Create a basic text node for content
    nodes.push({
      type: 'text',
      name: 'Content',
      x: 20,
      y: 20,
      width: 360,
      height: 40,
      characters: 'Generated Component',
      fontSize: 16,
      fontFamily: 'Inter',
      fontWeight: 400
    })

    // Create a background rectangle
    nodes.push({
      type: 'rectangle',
      name: 'Background',
      x: 0,
      y: 0,
      width: 400,
      height: 300,
      fills: [{
        type: 'solid',
        color: { r: 1, g: 1, b: 1, a: 1 }
      }]
    })

    return nodes
  }

  private convertColorsToFigmaStyles(colors: any) {
    const figmaColors: any = {}
    
    Object.entries(colors).forEach(([name, color]) => {
      if (typeof color === 'string') {
        figmaColors[name] = {
          name: name,
          color: this.hexToRgb(color),
          type: 'SOLID'
        }
      }
    })

    return figmaColors
  }

  private convertTypographyToFigmaStyles(typography: any) {
    return {
      heading: {
        name: 'Heading',
        fontFamily: typography.fontPairings?.heading || 'Inter',
        fontSize: typography.scale?.h1 || 32,
        fontWeight: 600
      },
      body: {
        name: 'Body',
        fontFamily: typography.fontPairings?.body || 'Inter',
        fontSize: typography.scale?.body || 16,
        fontWeight: 400
      }
    }
  }

  private hexToRgb(hex: string): { r: number, g: number, b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 }
  }

  /**
   * Check if Figma plugin is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && this.isPluginReady
  }

  /**
   * Export template to Figma
   */
  async exportToFigma(template: GeneratedTemplate): Promise<{
    success: boolean
    pluginCode?: string
    downloadUrl?: string
    error?: string
  }> {
    try {
      const figmaData = this.convertTemplateToFigma(template)
      
      // Generate downloadable plugin file
      const pluginManifest = {
        name: `${template.name} Template Importer`,
        id: `template-${template.id}`,
        api: "1.0.0",
        main: "code.js",
        ui: "ui.html"
      }

      const pluginPackage = {
        manifest: pluginManifest,
        code: figmaData.pluginCode,
        ui: this.generatePluginUI(template)
      }

      return {
        success: true,
        pluginCode: figmaData.pluginCode,
        downloadUrl: this.createDownloadablePlugin(pluginPackage)
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to export to Figma'
      }
    }
  }

  private generatePluginUI(template: GeneratedTemplate): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${template.name} Importer</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .button {
            background: #0066CC;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            width: 100%;
            font-size: 14px;
        }
        .button:hover {
            background: #0056B3;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>${template.name}</h2>
        <p>Click to import template components into Figma</p>
    </div>
    <button class="button" onclick="importTemplate()">
        Import Components
    </button>
    
    <script>
        function importTemplate() {
            parent.postMessage({
                pluginMessage: { type: 'IMPORT_TEMPLATE' }
            }, '*');
        }
    </script>
</body>
</html>
    `.trim()
  }

  private createDownloadablePlugin(pluginPackage: any): string {
    // In a real implementation, you'd create a downloadable ZIP file
    // For now, return a data URL with the plugin code
    const pluginData = {
      'manifest.json': JSON.stringify(pluginPackage.manifest, null, 2),
      'code.js': pluginPackage.code,
      'ui.html': pluginPackage.ui
    }

    const blob = new Blob([JSON.stringify(pluginData, null, 2)], { 
      type: 'application/json' 
    })
    
    return URL.createObjectURL(blob)
  }
}

export default FigmaPluginBridge