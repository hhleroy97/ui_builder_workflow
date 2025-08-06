"use client"

import { useState, useRef, useEffect } from "react"
import { ComponentDefinition, DesignTokens } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ColorPaletteEditor } from "@/components/organisms/color-palette-editor"
import { 
  Eye, 
  Code, 
  Settings, 
  Maximize2, 
  Minimize2,
  Copy,
  CheckCircle,
  Palette,
  Type,
  Layout,
  Edit3,
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  Download,
  Play
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
  component: ComponentDefinition
  designTokens: DesignTokens
  className?: string
}

export function ComponentPreview({ 
  component, 
  designTokens, 
  className 
}: ComponentPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("preview")
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isEditing, setIsEditing] = useState(false)
  const [editableHtml, setEditableHtml] = useState(component.html)
  const [editableCss, setEditableCss] = useState(component.css)
  const [currentDesignTokens, setCurrentDesignTokens] = useState(designTokens)
  const [iframeKey, setIframeKey] = useState(0)
  const previewRef = useRef<HTMLIFrameElement>(null)

  const handleCopyCode = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const resetComponent = () => {
    setEditableHtml(component.html)
    setEditableCss(component.css)
    setCurrentDesignTokens(designTokens)
    setIsEditing(false)
    setIframeKey(prev => prev + 1)
  }

  const handleColorsChange = (newColors: Record<string, string>) => {
    const updatedTokens = {
      ...currentDesignTokens,
      colors: {
        ...currentDesignTokens.colors,
        ...newColors,
        semantic: {
          success: newColors['semantic-success'] || currentDesignTokens.colors.semantic?.success || '#10b981',
          warning: newColors['semantic-warning'] || currentDesignTokens.colors.semantic?.warning || '#f59e0b', 
          error: newColors['semantic-error'] || currentDesignTokens.colors.semantic?.error || '#ef4444',
          info: newColors['semantic-info'] || currentDesignTokens.colors.semantic?.info || '#3b82f6'
        }
      }
    }
    setCurrentDesignTokens(updatedTokens)
    setIframeKey(prev => prev + 1)
  }

  const generateInlineStyles = (useEditable = false) => {
    const cssToUse = useEditable ? editableCss : component.css
    const tokensToUse = currentDesignTokens
    
    return `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: ${tokensToUse.typography.fontPairings.body}, sans-serif;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        ${cssToUse}
        
        /* Design Token CSS Variables */
        :root {
          --color-primary: ${tokensToUse.colors.primary};
          --color-secondary: ${tokensToUse.colors.secondary};
          --color-accent: ${tokensToUse.colors.accent};
          --color-neutral: ${tokensToUse.colors.neutral};
          --color-success: ${tokensToUse.colors.semantic?.success || '#10b981'};
          --color-warning: ${tokensToUse.colors.semantic?.warning || '#f59e0b'};
          --color-error: ${tokensToUse.colors.semantic?.error || '#ef4444'};
          --color-info: ${tokensToUse.colors.semantic?.info || '#3b82f6'};
          --font-heading: ${tokensToUse.typography.fontPairings.heading};
          --font-body: ${tokensToUse.typography.fontPairings.body};
        }
      </style>
    `
  }

  const previewSizes = {
    desktop: 'w-full min-h-[400px]',
    tablet: 'w-[768px] min-h-[400px]',
    mobile: 'w-[375px] min-h-[400px]'
  }

  const createIframeContent = (useEditable = false) => {
    const htmlToUse = useEditable ? editableHtml : component.html
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Component Preview</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=${designTokens.typography.fontPairings.heading.replace(/ /g, '+')}:300,400,500,600,700&family=${designTokens.typography.fontPairings.body.replace(/ /g, '+')}:300,400,500,600,700&display=swap" rel="stylesheet">
          ${generateInlineStyles(useEditable)}
      </head>
      <body>
          ${htmlToUse}
      </body>
      </html>
    `
  }

  useEffect(() => {
    setIframeKey(prev => prev + 1)
  }, [editableHtml, editableCss])

  const getCompleteHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component.name}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${designTokens.typography.fontPairings.heading.replace(/ /g, '+')}:300,400,500,600,700&family=${designTokens.typography.fontPairings.body.replace(/ /g, '+')}:300,400,500,600,700&display=swap" rel="stylesheet">
    ${generateInlineStyles()}
</head>
<body>
    ${component.html}
</body>
</html>`
  }

  const previewComponent = () => {
    const completeHTML = getCompleteHTML()
    const blob = new Blob([completeHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  const downloadComponent = () => {
    const completeHTML = getCompleteHTML()
    const blob = new Blob([completeHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${component.name.toLowerCase().replace(/\s+/g, '-')}-component.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className={cn("border-0 shadow-lg overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Layout className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{component.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {component.type}
                </Badge>
                {component.variants && (
                  <Badge variant="secondary" className="text-xs">
                    {component.variants.length} variants
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Responsive Preview Controls */}
            {isExpanded && (
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  size="sm"
                  variant={previewMode === 'desktop' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('desktop')}
                  className="h-7 w-7 p-0"
                >
                  <Monitor className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'tablet' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('tablet')}
                  className="h-7 w-7 p-0"
                >
                  <Tablet className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant={previewMode === 'mobile' ? 'default' : 'ghost'}
                  onClick={() => setPreviewMode('mobile')}
                  className="h-7 w-7 p-0"
                >
                  <Smartphone className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            <Button
              size="sm"
              variant={isEditing ? 'default' : 'outline'}
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1"
            >
              <Edit3 className="h-3 w-3" />
              {isEditing ? 'Exit' : 'Edit'}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={resetComponent}
              className="h-7 w-7 p-0"
              title="Reset component"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={previewComponent}
              className="flex items-center gap-1"
            >
              <Eye className="h-3 w-3" />
              Preview
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="h-3 w-3" />
                  Collapse
                </>
              ) : (
                <>
                  <Maximize2 className="h-3 w-3" />
                  Expand
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Interactive Preview */}
        <div className="mb-4">
          <div className="border rounded-lg bg-gray-50 overflow-hidden">
            <div className="flex justify-center p-4 overflow-x-auto">
              <div 
                className={cn(
                  "bg-white rounded border transition-all duration-300 shadow-sm",
                  previewSizes[previewMode]
                )}
              >
                <iframe
                  key={iframeKey}
                  ref={previewRef}
                  srcDoc={createIframeContent(true)}
                  className="w-full h-full min-h-[300px] border-0"
                  title={`${component.name} Preview`}
                  style={{ colorScheme: 'normal' }}
                />
              </div>
            </div>
            {/* Preview Controls */}
            <div className="border-t bg-white px-4 py-2 flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>
                  {previewMode === 'desktop' ? 'Desktop View' : 
                   previewMode === 'tablet' ? `Tablet (768px)` : 
                   'Mobile (375px)'}
                </span>
                {isEditing && (
                  <Badge variant="outline" className="text-xs">
                    Live Editing
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={downloadComponent}
                  className="h-6 text-xs flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Editor */}
        {isEditing && (
          <div className="mb-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  HTML Content
                </Label>
                <textarea
                  value={editableHtml}
                  onChange={(e) => setEditableHtml(e.target.value)}
                  className="w-full h-32 p-3 border rounded-lg font-mono text-xs resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Edit HTML content..."
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  CSS Styles
                </Label>
                <textarea
                  value={editableCss}
                  onChange={(e) => setEditableCss(e.target.value)}
                  className="w-full h-32 p-3 border rounded-lg font-mono text-xs resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Edit CSS styles..."
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t">
              <Button
                size="sm"
                onClick={resetComponent}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-3 w-3" />
                Reset to Original
              </Button>
              <Button
                size="sm"
                onClick={() => handleCopyCode(createIframeContent(true), 'edited-html')}
                variant="outline"
                className="flex items-center gap-2"
              >
                {copied === 'edited-html' ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {copied === 'edited-html' ? 'Copied!' : 'Copy Edited Version'}
              </Button>
            </div>
          </div>
        )}

        {/* Expanded Details */}
        {isExpanded && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="preview" className="text-xs">
                <Eye className="h-3 w-3 mr-1" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="html" className="text-xs">
                <Code className="h-3 w-3 mr-1" />
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="text-xs">
                <Palette className="h-3 w-3 mr-1" />
                CSS
              </TabsTrigger>
              <TabsTrigger value="tokens" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Tokens
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="mt-4">
              <div className="space-y-4">
                {/* Full Preview */}
                <div className="border rounded-lg bg-white p-6">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: `${generateInlineStyles()}${component.html}` 
                    }}
                    className="component-preview"
                  />
                </div>
                
                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    onClick={previewComponent}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Open in New Window
                  </Button>
                  <Button
                    onClick={downloadComponent}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    Download Component
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="html" className="mt-4">
              <div className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto max-h-96 overflow-y-auto">
                    <code>{editableHtml}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 flex items-center gap-1"
                    onClick={() => handleCopyCode(editableHtml, 'html')}
                  >
                    {copied === 'html' ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                
                {editableHtml !== component.html && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Edit3 className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">Modified Version</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      This HTML has been edited from the original. Use the reset button to restore the original version.
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyCode(component.html, 'original-html')}
                        className="text-xs"
                      >
                        {copied === 'original-html' ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Copied Original!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy Original
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={resetComponent}
                        className="text-xs"
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Reset to Original
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="css" className="mt-4">
              <div className="relative">
                <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto max-h-96 overflow-y-auto">
                  <code>{component.css}</code>
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 flex items-center gap-1"
                  onClick={() => handleCopyCode(component.css, 'css')}
                >
                  {copied === 'css' ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="tokens" className="mt-4">
              <div className="space-y-4">
                {/* Colors */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    Colors Used
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(designTokens.colors).map(([key, color]) => {
                      if (typeof color === 'string') {
                        return (
                          <div key={key} className="flex items-center gap-2 p-2 border rounded">
                            <div 
                              className="w-6 h-6 rounded border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                            <div className="text-xs">
                              <div className="font-medium capitalize">{key}</div>
                              <div className="text-muted-foreground">{color}</div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Typography
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Heading Font:</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {designTokens.typography.fontPairings.heading}
                      </code>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">Body Font:</span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {designTokens.typography.fontPairings.body}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Component Variants */}
                {component.variants && component.variants.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Available Variants
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {component.variants.map((variant, index) => (
                        <div key={index} className="p-2 border rounded">
                          <div className="font-medium text-sm">{variant.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {Object.entries(variant.properties).map(([key, value]) => (
                              <span key={key}>{key}: {value} </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Copy Design Tokens */}
                <div className="pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center gap-2"
                    onClick={() => handleCopyCode(JSON.stringify({
                      colors: designTokens.colors,
                      typography: designTokens.typography,
                      spacing: designTokens.spacing,
                      borderRadius: designTokens.borderRadius,
                      shadows: designTokens.shadows
                    }, null, 2), 'tokens')}
                  >
                    {copied === 'tokens' ? (
                      <>
                        <CheckCircle className="h-3 w-3" />
                        Design Tokens Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        Copy All Design Tokens
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>

      <style jsx global>{`
        .component-preview {
          font-family: ${designTokens.typography.fontPairings.body}, sans-serif;
        }
        
        .component-preview h1,
        .component-preview h2,
        .component-preview h3,
        .component-preview h4,
        .component-preview h5,
        .component-preview h6 {
          font-family: ${designTokens.typography.fontPairings.heading}, serif;
        }
      `}</style>
    </Card>
  )
}