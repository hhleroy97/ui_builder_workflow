"use client"

import { useState, useEffect } from "react"
import { DesignTokens } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Palette,
  Copy,
  CheckCircle,
  RotateCcw,
  Shuffle,
  Download
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ColorPaletteEditorProps {
  designTokens: DesignTokens
  onColorsChange?: (colors: Record<string, string>) => void
  className?: string
}

interface ColorState {
  [key: string]: string
}

export function ColorPaletteEditor({ 
  designTokens, 
  onColorsChange,
  className 
}: ColorPaletteEditorProps) {
  const [colors, setColors] = useState<ColorState>({})
  const [originalColors, setOriginalColors] = useState<ColorState>({})
  const [copied, setCopied] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Initialize colors from design tokens
  useEffect(() => {
    const flatColors: ColorState = {}
    
    // Flatten the colors object
    Object.entries(designTokens.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        flatColors[key] = value
      } else if (typeof value === 'object') {
        // Handle semantic colors
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (typeof subValue === 'string') {
            flatColors[`${key}-${subKey}`] = subValue
          }
        })
      }
    })
    
    setColors(flatColors)
    setOriginalColors(flatColors)
  }, [designTokens])

  const handleColorChange = (colorKey: string, newColor: string) => {
    const updatedColors = { ...colors, [colorKey]: newColor }
    setColors(updatedColors)
    onColorsChange?.(updatedColors)
  }

  const resetColors = () => {
    setColors(originalColors)
    onColorsChange?.(originalColors)
  }

  const generateRandomColors = () => {
    const newColors = { ...colors }
    
    // Generate harmonious color palette
    const hue = Math.floor(Math.random() * 360)
    const primaryColor = `hsl(${hue}, 70%, 50%)`
    const secondaryColor = `hsl(${(hue + 120) % 360}, 65%, 55%)`
    const accentColor = `hsl(${(hue + 180) % 360}, 75%, 45%)`
    
    newColors.primary = primaryColor
    newColors.secondary = secondaryColor
    newColors.accent = accentColor
    newColors.neutral = `hsl(${hue}, 10%, 60%)`
    
    // Update semantic colors
    if (newColors['semantic-success']) newColors['semantic-success'] = 'hsl(142, 71%, 45%)'
    if (newColors['semantic-warning']) newColors['semantic-warning'] = 'hsl(38, 92%, 50%)'
    if (newColors['semantic-error']) newColors['semantic-error'] = 'hsl(0, 84%, 60%)'
    if (newColors['semantic-info']) newColors['semantic-info'] = 'hsl(217, 91%, 60%)'
    
    setColors(newColors)
    onColorsChange?.(newColors)
  }

  const copyColorPalette = async () => {
    try {
      const colorCSS = Object.entries(colors)
        .map(([key, value]) => `--color-${key}: ${value};`)
        .join('\n  ')
      
      const cssVariables = `:root {\n  ${colorCSS}\n}`
      
      await navigator.clipboard.writeText(cssVariables)
      setCopied('palette')
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const copyIndividualColor = async (colorKey: string, color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopied(colorKey)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadPalette = () => {
    const colorData = {
      palette: colors,
      css: Object.entries(colors)
        .map(([key, value]) => `--color-${key}: ${value};`)
        .join('\n  '),
      json: JSON.stringify(colors, null, 2)
    }
    
    const blob = new Blob([JSON.stringify(colorData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'color-palette.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const hasChanges = JSON.stringify(colors) !== JSON.stringify(originalColors)

  return (
    <Card className={cn("border-0 shadow-lg", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Palette Editor
          </CardTitle>
          
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="text-xs">
                Modified
              </Badge>
            )}
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs"
            >
              {isEditing ? 'View Only' : 'Edit Colors'}
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={generateRandomColors}
              className="text-xs"
            >
              <Shuffle className="h-3 w-3 mr-1" />
              Random
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={resetColors}
              disabled={!hasChanges}
              className="text-xs"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Color Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(colors).map(([colorKey, colorValue]) => (
            <div key={colorKey} className="space-y-2">
              <div className="relative group">
                <div 
                  className="w-full h-20 rounded-lg border-4 border-white shadow-lg cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: colorValue }}
                  onClick={() => copyIndividualColor(colorKey, colorValue)}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied === colorKey ? (
                      <CheckCircle className="h-5 w-5 text-white drop-shadow-lg" />
                    ) : (
                      <Copy className="h-5 w-5 text-white drop-shadow-lg" />
                    )}
                  </div>
                </div>
                
                <div className="text-center">
                  <Label className="text-sm font-medium capitalize">
                    {colorKey.replace('-', ' ')}
                  </Label>
                  <p className="text-xs text-muted-foreground font-mono">
                    {colorValue}
                  </p>
                </div>
                
                {isEditing && (
                  <Input
                    type="color"
                    value={colorValue}
                    onChange={(e) => handleColorChange(colorKey, e.target.value)}
                    className="w-full h-8 mt-2 cursor-pointer"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Color Input Section */}
        {isEditing && (
          <div className="border-t pt-6">
            <h4 className="font-medium mb-3">Manual Color Input</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(colors).slice(0, 4).map(([colorKey, colorValue]) => (
                <div key={colorKey} className="flex items-center gap-2">
                  <Label className="text-sm min-w-20 capitalize">
                    {colorKey}:
                  </Label>
                  <Input
                    type="text"
                    value={colorValue}
                    onChange={(e) => handleColorChange(colorKey, e.target.value)}
                    className="font-mono text-xs"
                    placeholder="#000000 or hsl(0,0%,0%)"
                  />
                  <div 
                    className="w-8 h-8 rounded border-2 border-white shadow-sm flex-shrink-0"
                    style={{ backgroundColor: colorValue }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-6 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={copyColorPalette}
            className="flex items-center gap-2"
          >
            {copied === 'palette' ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied === 'palette' ? 'Copied CSS!' : 'Copy CSS Variables'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={downloadPalette}
            className="flex items-center gap-2"
          >
            <Download className="h-3 w-3" />
            Download Palette
          </Button>

          {hasChanges && (
            <Button
              size="sm"
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-3 w-3" />
              Apply Changes
            </Button>
          )}
        </div>
        
        {/* Color Harmony Info */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <h5 className="text-sm font-medium mb-2">Tips:</h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Click any color to copy its value to clipboard</li>
            <li>• Use the Random button to generate harmonious color schemes</li>
            <li>• Colors support hex (#000000), HSL, and RGB formats</li>
            <li>• Changes apply in real-time to all components</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}