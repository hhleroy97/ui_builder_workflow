"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { GeneratedTemplate } from "@/types"
import { TemplateService } from "@/lib/template-service"
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
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function ResultsPage() {
  const [template, setTemplate] = useState<GeneratedTemplate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const templateData = searchParams.get('template')
    
    if (templateData) {
      try {
        const parsedTemplate = JSON.parse(decodeURIComponent(templateData))
        setTemplate(parsedTemplate)
        setLoading(false)
      } catch (err) {
        setError('Failed to load template data')
        setLoading(false)
      }
    } else {
      setError('No template data found')
      setLoading(false)
    }
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
            </div>
          </CardContent>
        </Card>

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

        {/* Components List */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generated Components
            </CardTitle>
            <CardDescription>
              All components included in your template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {template.components.map((component) => (
                <div
                  key={component.id}
                  className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
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
            <div className="grid md:grid-cols-3 gap-4">
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
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-2">2. Customize Content</h4>
                <p className="text-sm text-muted-foreground">
                  Replace placeholder text and images with your content
                </p>
              </div>

              <div className="text-center p-4 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <ExternalLink className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium mb-2">3. Deploy & Share</h4>
                <p className="text-sm text-muted-foreground">
                  Upload to your hosting provider or sell on template marketplaces
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