"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ClientOnly } from "@/components/client-only"
import { ComponentPreview } from "@/components/organisms/component-preview"
import { GeneratedTemplate } from "@/types"
import { TemplateService } from "@/lib/template-service"
import { FigmaExportService } from "@/lib/figma/figma-export-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  Eye, 
  Copy, 
  Code, 
  Palette, 
  FileText,
  ExternalLink,
  Loader2,
  CheckCircle,
  AlertCircle,
  Figma,
  Package
} from "lucide-react"
import { cn } from "@/lib/utils"

function ResultsPageContent() {
  const [template, setTemplate] = useState<GeneratedTemplate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [figmaExporting, setFigmaExporting] = useState(false)
  const [figmaExportResult, setFigmaExportResult] = useState<any>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const templateData = searchParams.get('template')
    const templateId = searchParams.get('id')
    
    console.log('Results page - templateData exists:', !!templateData)
    console.log('Results page - templateId exists:', !!templateId)
    console.log('Results page - templateData length:', templateData?.length)
    
    if (templateData) {
      // Try URL parameter first
      try {
        console.log('Results page - Attempting to parse template data from URL...')
        const parsedTemplate = JSON.parse(decodeURIComponent(templateData))
        console.log('Results page - Template parsed successfully from URL:', parsedTemplate.name)
        setTemplate(parsedTemplate)
        setLoading(false)
        return
      } catch (err) {
        console.error('Results page - URL parse error:', err)
        console.error('Results page - Template data preview:', templateData.substring(0, 200))
      }
    }
    
    if (templateId) {
      // Try sessionStorage if we have an ID
      try {
        console.log('Results page - Attempting to load from sessionStorage...')
        const storedTemplate = sessionStorage.getItem('generated-template')
        if (storedTemplate) {
          const parsedTemplate = JSON.parse(storedTemplate)
          console.log('Results page - Template parsed successfully from sessionStorage:', parsedTemplate.name)
          setTemplate(parsedTemplate)
          setLoading(false)
          return
        } else {
          console.error('Results page - No template found in sessionStorage')
        }
      } catch (err) {
        console.error('Results page - SessionStorage parse error:', err)
      }
    }
    
    // If we get here, nothing worked
    console.error('Results page - No template data found in URL or sessionStorage')
    setError('No template data found')
    setLoading(false)
  }, [searchParams])

  const handleCopy = async (content: string, type: string) => {
    try {
      await TemplateService.copyToClipboard(content)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownloadHTML = () => {
    if (template) {
      TemplateService.downloadHTMLFile(template)
    }
  }

  const handleDownloadCSS = () => {
    if (template) {
      TemplateService.downloadCSSFile(template)
    }
  }

  const handleDownloadTokens = () => {
    if (template) {
      TemplateService.downloadDesignTokens(template)
    }
  }

  const handlePreview = () => {
    if (template) {
      TemplateService.previewTemplate(template)
    }
  }

  const handleStartOver = () => {
    router.push('/generator')
  }

  const handleExportToFigma = async () => {
    if (!template) return
    
    try {
      setFigmaExporting(true)
      const result = await FigmaExportService.exportTemplate(template)
      setFigmaExportResult(result)
      
      if (result.success && result.pluginDownloadUrl) {
        // Create download link for plugin
        const link = document.createElement('a')
        link.href = result.pluginDownloadUrl
        link.download = `${template.name}-figma-plugin.json`
        link.click()
      }
    } catch (error) {
      console.error('Figma export failed:', error)
      setFigmaExportResult({
        success: false,
        error: 'Failed to export to Figma'
      })
    } finally {
      setFigmaExporting(false)
    }
  }

  const handleQuickFigmaExport = async () => {
    if (!template) return
    
    try {
      const simpleExport = await FigmaExportService.createSimpleExport(template)
      
      // Copy instructions to clipboard
      await navigator.clipboard.writeText(simpleExport.instructions)
      
      // Open Figma plugin in new tab
      window.open(simpleExport.figmaUrl, '_blank')
      
      setCopied('figma-instructions')
      setTimeout(() => setCopied(null), 3000)
    } catch (error) {
      console.error('Quick Figma export failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Generating Your Template</h2>
          <p className="text-muted-foreground">This may take a moment...</p>
        </div>
      </div>
    )
  }

  if (error || !template) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle>Something went wrong</CardTitle>
            </div>
            <CardDescription>
              {error || 'Template data not found'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleStartOver} className="w-full">
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-foreground">Template Generated!</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            Your professional website template is ready
          </p>
          <Badge variant="outline" className="text-sm">
            {template.name}
          </Badge>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Preview & Download
            </CardTitle>
            <CardDescription>
              Preview your template or download the files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handlePreview} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Preview Template
              </Button>
              
              <Button onClick={handleDownloadHTML} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download HTML
              </Button>
              
              <Button onClick={handleDownloadCSS} variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download CSS
              </Button>
              
              <Button onClick={handleDownloadTokens} variant="outline" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Design Tokens
              </Button>
              
              <Button 
                onClick={handleExportToFigma} 
                variant="outline" 
                className="flex items-center gap-2"
                disabled={figmaExporting}
              >
                {figmaExporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Figma className="h-4 w-4" />
                )}
                {figmaExporting ? 'Exporting...' : 'Export to Figma'}
              </Button>
              
              <Button onClick={handleQuickFigmaExport} variant="outline" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Quick Figma Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Figma Export Results */}
        {figmaExportResult && (
          <Card className="mb-8 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Figma className="h-5 w-5" />
                Figma Export
              </CardTitle>
              <CardDescription>
                {figmaExportResult.success 
                  ? "Your template is ready for Figma!" 
                  : "There was an issue with the export"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {figmaExportResult.success ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Plugin created successfully!</span>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Next Steps:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Download the plugin file (should start automatically)</li>
                      <li>Open Figma and go to Menu → Plugins → Development</li>
                      <li>Click "Import plugin from manifest"</li>
                      <li>Select the downloaded manifest.json file</li>
                      <li>Run the plugin to import your components</li>
                    </ol>
                  </div>
                  
                  {figmaExportResult.instructions && (
                    <details className="bg-muted/30 p-4 rounded-lg">
                      <summary className="font-medium cursor-pointer mb-2">
                        View Detailed Instructions
                      </summary>
                      <div className="text-sm text-muted-foreground whitespace-pre-line">
                        {figmaExportResult.instructions}
                      </div>
                    </details>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Export failed</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {figmaExportResult.error || 'An unexpected error occurred during export.'}
                  </p>
                  <Button 
                    onClick={() => setFigmaExportResult(null)} 
                    variant="outline" 
                    size="sm"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Success message for quick export */}
        {copied === 'figma-instructions' && (
          <Card className="mb-8 border-0 shadow-lg bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Instructions copied to clipboard!</span>
              </div>
              <p className="text-sm text-green-600 mt-2">
                A Figma plugin tab should have opened. Follow the copied instructions to import your template.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Template Code */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                HTML Template
              </CardTitle>
              <CardDescription>
                Complete HTML structure with embedded styles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto max-h-96 overflow-y-auto">
                  <code>{template.html.substring(0, 1000)}...</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 flex items-center gap-1"
                  onClick={() => handleCopy(template.html, 'html')}
                >
                  {copied === 'html' ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied === 'html' ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Design Tokens */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Design System
              </CardTitle>
              <CardDescription>
                Colors, typography, and design tokens
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Color Palette */}
              <div>
                <h4 className="font-medium mb-2">Color Palette</h4>
                <div className="flex gap-2">
                  {Object.entries(template.designTokens.colors).map(([key, color]) => {
                    if (typeof color === 'string') {
                      return (
                        <div key={key} className="text-center">
                          <div 
                            className="w-12 h-12 rounded-lg border-2 border-white shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <p className="text-xs mt-1 capitalize">{key}</p>
                          <p className="text-xs text-muted-foreground">{color}</p>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </div>

              {/* Typography */}
              <div>
                <h4 className="font-medium mb-2">Typography</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Heading: </span>
                    <span className="font-medium">{template.designTokens.typography.fontPairings.heading}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Body: </span>
                    <span className="font-medium">{template.designTokens.typography.fontPairings.body}</span>
                  </div>
                </div>
              </div>

              {/* Copy Design Tokens */}
              <Button
                variant="outline"
                size="sm"
                className="w-full flex items-center gap-2"
                onClick={() => handleCopy(JSON.stringify(template.designTokens, null, 2), 'tokens')}
              >
                {copied === 'tokens' ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {copied === 'tokens' ? 'Copied!' : 'Copy Design Tokens'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Component Previews */}
        <div className="mb-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Interactive Component Previews</h2>
            <p className="text-muted-foreground mb-6">
              Preview, edit, and customize each generated component
            </p>
          </div>
          
          {template.components.map((component) => (
            <div key={component.id} id={`component-${component.id}`}>
              <ComponentPreview
                component={component}
                designTokens={template.designTokens}
                className="mb-6"
              />
            </div>
          ))}
        </div>

        {/* Components Summary */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Components Summary
            </CardTitle>
            <CardDescription>
              Overview of all generated components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {template.components.map((component) => (
                <div
                  key={component.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    const element = document.getElementById(`component-${component.id}`)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-sm">{component.name}</h5>
                    <Badge variant="outline" className="text-xs">
                      {component.type}
                    </Badge>
                  </div>
                  {component.variants && (
                    <p className="text-xs text-muted-foreground">
                      {component.variants.length} variant{component.variants.length > 1 ? 's' : ''}
                    </p>
                  )}
                  <p className="text-xs text-primary mt-1">
                    Click to view component →
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              How to use your generated template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-2">1. Download Files</h4>
                <p className="text-sm text-muted-foreground">
                  Download HTML, CSS, and design tokens to get started
                </p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Figma className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-2">2. Export to Figma</h4>
                <p className="text-sm text-muted-foreground">
                  Create a Figma plugin to import components and design system
                </p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-2">3. Customize Content</h4>
                <p className="text-sm text-muted-foreground">
                  Replace placeholder text and images with your content
                </p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ExternalLink className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-2">4. Deploy & Share</h4>
                <p className="text-sm text-muted-foreground">
                  Sell on Figma Community or template marketplaces
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button onClick={handleStartOver} variant="outline">
                Create Another Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <ClientOnly 
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading results...</p>
          </div>
        </div>
      }
    >
      <ResultsPageContent />
    </ClientOnly>
  )
}