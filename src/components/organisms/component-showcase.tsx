"use client"

import { useState } from "react"
import { GeneratedTemplate } from "@/types"
import { ComponentPreview } from "./component-preview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Layout, 
  Search, 
  Filter, 
  Grid, 
  List,
  Download,
  Eye
} from "lucide-react"

interface ComponentShowcaseProps {
  template: GeneratedTemplate
  className?: string
}

export function ComponentShowcase({ template, className }: ComponentShowcaseProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter components
  const filteredComponents = template.components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || component.type === selectedType
    return matchesSearch && matchesType
  })

  // Get unique component types for filter
  const componentTypes = Array.from(new Set(template.components.map(c => c.type)))

  const downloadAllComponents = () => {
    template.components.forEach(component => {
      const completeHTML = generateCompleteHTML(component)
      const blob = new Blob([completeHTML], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${component.name.toLowerCase().replace(/\s+/g, '-')}-component.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
  }

  const generateCompleteHTML = (component: any) => {
    const designTokens = template.designTokens
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${component.name}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${designTokens.typography.fontPairings.heading.replace(/ /g, '+')}:300,400,500,600,700&family=${designTokens.typography.fontPairings.body.replace(/ /g, '+')}:300,400,500,600,700&display=swap" rel="stylesheet">
    <style>
        ${component.css}
        
        :root {
          --color-primary: ${designTokens.colors.primary};
          --color-secondary: ${designTokens.colors.secondary};
          --color-accent: ${designTokens.colors.accent};
          --color-neutral: ${designTokens.colors.neutral};
          --font-heading: ${designTokens.typography.fontPairings.heading};
          --font-body: ${designTokens.typography.fontPairings.body};
        }
        
        body {
          margin: 0;
          font-family: ${designTokens.typography.fontPairings.body}, sans-serif;
        }
    </style>
</head>
<body>
    ${component.html}
</body>
</html>`
  }

  const previewAllComponents = () => {
    const allComponentsHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name} - All Components</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${template.designTokens.typography.fontPairings.heading.replace(/ /g, '+')}:300,400,500,600,700&family=${template.designTokens.typography.fontPairings.body.replace(/ /g, '+')}:300,400,500,600,700&display=swap" rel="stylesheet">
    <style>
        ${template.css}
        
        .component-separator {
          margin: 4rem 0;
          border-top: 2px dashed #e5e7eb;
          position: relative;
        }
        
        .component-label {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 0.5rem 1rem;
          color: ${template.designTokens.colors.primary};
          font-weight: 600;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
        }
        
        body {
          margin: 0;
          font-family: ${template.designTokens.typography.fontPairings.body}, sans-serif;
        }
    </style>
</head>
<body>
    <div style="padding: 2rem; max-width: 1200px; margin: 0 auto;">
        <header style="text-align: center; margin-bottom: 3rem;">
            <h1 style="color: ${template.designTokens.colors.primary}; margin-bottom: 1rem;">${template.name}</h1>
            <p style="color: #666;">Component Showcase - All Generated Components</p>
        </header>
        
        ${template.components.map((component, index) => `
            ${index > 0 ? `<div class="component-separator"><span class="component-label">${component.name}</span></div>` : ''}
            ${component.html}
        `).join('')}
    </div>
</body>
</html>`

    const blob = new Blob([allComponentsHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'width=1400,height=900,scrollbars=yes,resizable=yes')
    setTimeout(() => URL.revokeObjectURL(url), 100)
  }

  return (
    <div className={className}>
      <Card className="border-0 shadow-lg mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5" />
                Component Showcase
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Explore, customize, and download individual components
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={previewAllComponents}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Preview All
              </Button>
              <Button
                onClick={downloadAllComponents}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download All
              </Button>
            </div>
          </div>
          
          {/* Filters and Search */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {componentTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Component Stats */}
        <CardContent className="pt-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {filteredComponents.length} of {template.components.length} components
              </Badge>
              {componentTypes.map(type => {
                const count = filteredComponents.filter(c => c.type === type).length
                return count > 0 ? (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {count} {type}
                  </Badge>
                ) : null
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Components Grid/List */}
      {filteredComponents.length === 0 ? (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-12 text-center">
            <Layout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No components found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? "grid gap-6 lg:grid-cols-1 xl:grid-cols-2" 
            : "space-y-4"
        }>
          {filteredComponents.map((component) => (
            <ComponentPreview
              key={component.id}
              component={component}
              designTokens={template.designTokens}
              className={viewMode === 'list' ? 'w-full' : ''}
            />
          ))}
        </div>
      )}
    </div>
  )
}