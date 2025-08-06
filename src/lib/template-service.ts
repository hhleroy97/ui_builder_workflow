import { ProjectRequirements, GeneratedTemplate } from '@/types'

export class TemplateService {
  /**
   * Generate a template by calling the API
   */
  static async generateTemplate(requirements: ProjectRequirements): Promise<GeneratedTemplate> {
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
    const newWindow = window.open('', '_blank')
    if (newWindow) {
      newWindow.document.write(template.html)
      newWindow.document.close()
    } else {
      alert('Please allow popups to preview the template')
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