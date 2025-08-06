import { ProjectRequirements, GeneratedTemplate } from '@/types'

export class TemplateService {
  /**
   * Generate a template by calling the API
   */
  static async generateTemplate(requirements: Partial<ProjectRequirements>): Promise<GeneratedTemplate> {
    const response = await fetch('/api/generate-template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requirements),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to generate template')
    }

    const data = await response.json()
    return data.template
  }

  /**
   * Download template as HTML file
   */
  static downloadHTMLFile(template: GeneratedTemplate): void {
    const blob = new Blob([template.html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  /**
   * Download template CSS as separate file
   */
  static downloadCSSFile(template: GeneratedTemplate): void {
    const blob = new Blob([template.css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-styles.css`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  /**
   * Copy template HTML to clipboard
   */
  static async copyToClipboard(content: string): Promise<void> {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content)
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = content
      textArea.style.position = 'absolute'
      textArea.style.left = '-999999px'
      
      document.body.prepend(textArea)
      textArea.select()
      
      try {
        document.execCommand('copy')
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        throw new Error('Failed to copy to clipboard')
      } finally {
        textArea.remove()
      }
    }
  }

  /**
   * Preview template in new window
   */
  static previewTemplate(template: GeneratedTemplate): void {
    console.log('Attempting to preview template:', template.name)
    console.log('Template HTML length:', template.html?.length)
    console.log('Template HTML preview:', template.html?.substring(0, 500))
    
    // Check if popup blockers are preventing the window
    const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')
    
    if (newWindow) {
      try {
        // Ensure the HTML is complete and well-formed
        let htmlContent = template.html
        
        // Add components to the body if it's empty
        if (htmlContent.includes('<body>') && htmlContent.includes('</body>')) {
          const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
          if (bodyMatch && bodyMatch[1].trim() === '') {
            // Body is empty, add the components
            const componentsHtml = template.components
              .filter(comp => comp.html && comp.html.trim() !== '')
              .map(comp => comp.html)
              .join('\n\n')
            
            if (componentsHtml) {
              htmlContent = htmlContent.replace(
                /<body[^>]*>[\s\S]*?<\/body>/i,
                `<body>\n${componentsHtml}\n</body>`
              )
            } else {
              // Fallback content
              htmlContent = htmlContent.replace(
                /<body[^>]*>[\s\S]*?<\/body>/i,
                `<body>
                  <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
                    <h1 style="color: #333; margin-bottom: 1rem;">${template.name}</h1>
                    <p style="color: #666; margin-bottom: 2rem;">${template.description}</p>
                    <div style="background: #f5f5f5; padding: 2rem; border-radius: 8px; max-width: 600px; margin: 0 auto;">
                      <h2>Template Components Generated:</h2>
                      <ul style="text-align: left; margin-top: 1rem;">
                        ${template.components.map(comp => `<li>${comp.name} (${comp.type})</li>`).join('')}
                      </ul>
                    </div>
                  </div>
                </body>`
              )
            }
          }
        }
        
        console.log('Writing HTML to new window...')
        newWindow.document.write(htmlContent)
        newWindow.document.close()
        console.log('Preview window opened successfully')
        
      } catch (error) {
        console.error('Error writing to preview window:', error)
        newWindow.close()
        alert('Error opening preview. Please check the console for details.')
      }
    } else {
      console.error('Failed to open preview window - likely blocked by popup blocker')
      alert('Please allow popups to preview the template, or check if popup blockers are enabled')
    }
  }

  /**
   * Generate design tokens as JSON
   */
  static generateDesignTokensJSON(template: GeneratedTemplate): string {
    return JSON.stringify(template.designTokens, null, 2)
  }

  /**
   * Download design tokens as JSON file
   */
  static downloadDesignTokens(template: GeneratedTemplate): void {
    const json = this.generateDesignTokensJSON(template)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}-design-tokens.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}