"use client"

import { useEffect, useState } from "react"
import { useFormStore } from "@/lib/form-store"
import { ColorTheoryEngine } from "@/lib/color-theory"
import { TypographyEngine } from "@/lib/design-system/typography"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Sparkles, 
  Palette, 
  Type, 
  Eye,
  Wand2,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"

const styleDirections = [
  {
    id: 'modern',
    title: 'Modern',
    description: 'Clean lines, plenty of white space, contemporary feel',
    preview: 'bg-gradient-to-br from-slate-100 to-white border border-slate-200'
  },
  {
    id: 'minimal',
    title: 'Minimal', 
    description: 'Simple, focused, less is more approach',
    preview: 'bg-white border border-gray-100'
  },
  {
    id: 'bold',
    title: 'Bold',
    description: 'Strong colors, impactful typography, confident design',
    preview: 'bg-gradient-to-br from-blue-600 to-purple-600'
  },
  {
    id: 'classic',
    title: 'Classic',
    description: 'Timeless, professional, traditional elements',
    preview: 'bg-gradient-to-br from-slate-800 to-slate-600'
  },
  {
    id: 'playful',
    title: 'Playful',
    description: 'Fun, energetic, creative and approachable',
    preview: 'bg-gradient-to-br from-orange-300 to-pink-400'
  }
]

const typographyStyles = [
  { id: 'professional', label: 'Professional & Clean' },
  { id: 'creative', label: 'Creative & Artistic' },
  { id: 'technical', label: 'Technical & Precise' },
  { id: 'friendly', label: 'Friendly & Approachable' }
]

export function DesignPreferencesStep() {
  const { formData, updateFormData, completeStep } = useFormStore()
  const [customColor, setCustomColor] = useState('#3b82f6')
  const [generatedPalette, setGeneratedPalette] = useState<any>(null)
  const [fontPairing, setFontPairing] = useState<any>(null)

  // Generate AI color palette based on selections
  useEffect(() => {
    if (formData.industry && formData.styleDirection) {
      const palette = ColorTheoryEngine.generateIndustryPalette(
        formData.industry,
        formData.colorPreferences?.values?.[0],
        formData.styleDirection
      )
      const accessiblePalette = ColorTheoryEngine.ensureAccessibility(palette)
      setGeneratedPalette(accessiblePalette)
    }
  }, [formData.industry, formData.styleDirection, formData.colorPreferences])

  // Generate typography pairing
  useEffect(() => {
    if (formData.typographyStyle && formData.industry) {
      const pairing = TypographyEngine.selectFontPairing(
        formData.typographyStyle,
        formData.industry
      )
      setFontPairing(pairing)
    }
  }, [formData.typographyStyle, formData.industry])

  const handleStyleSelect = (styleId: string) => {
    updateFormData({ 
      styleDirection: styleId as any
    })
  }

  const handleColorTypeChange = (type: 'brand' | 'mood' | 'ai-suggested') => {
    updateFormData({
      colorPreferences: {
        type,
        values: type === 'brand' ? [customColor] : undefined
      }
    })
  }

  const handleTypographySelect = (style: string) => {
    updateFormData({
      typographyStyle: style as any
    })
  }

  const generateNewPalette = () => {
    if (formData.industry && formData.styleDirection) {
      // Generate with slight variation
      const palette = ColorTheoryEngine.generateIndustryPalette(
        formData.industry,
        undefined, // Let it auto-generate
        formData.styleDirection
      )
      const accessiblePalette = ColorTheoryEngine.ensureAccessibility(palette)
      setGeneratedPalette(accessiblePalette)
    }
  }

  // Auto-complete step when required fields are filled
  useEffect(() => {
    if (formData.styleDirection && formData.colorPreferences?.type && formData.typographyStyle) {
      completeStep('design-preferences')
    }
  }, [formData.styleDirection, formData.colorPreferences, formData.typographyStyle, completeStep])

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">Choose your design direction</h2>
        <p className="text-muted-foreground">
          Select the visual style that best represents your brand
        </p>
      </div>

      {/* Style Direction */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visual Style
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {styleDirections.map((style) => (
              <div
                key={style.id}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  formData.styleDirection === style.id && "ring-2 ring-primary ring-offset-2"
                )}
                onClick={() => handleStyleSelect(style.id)}
              >
                <Card className="h-full hover:shadow-md">
                  <div className={cn("h-16 rounded-t-lg", style.preview)} />
                  <CardContent className="p-3">
                    <h4 className="font-medium text-sm mb-1">{style.title}</h4>
                    <p className="text-xs text-muted-foreground">{style.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant={formData.colorPreferences?.type === 'ai-suggested' ? 'default' : 'outline'}
              className="flex-col h-auto p-4"
              onClick={() => handleColorTypeChange('ai-suggested')}
            >
              <Wand2 className="h-5 w-5 mb-2" />
              <span className="font-medium">AI Suggested</span>
              <span className="text-xs opacity-70">Let AI choose based on your industry</span>
            </Button>

            <Button
              variant={formData.colorPreferences?.type === 'brand' ? 'default' : 'outline'}
              className="flex-col h-auto p-4"
              onClick={() => handleColorTypeChange('brand')}
            >
              <Palette className="h-5 w-5 mb-2" />
              <span className="font-medium">Brand Colors</span>
              <span className="text-xs opacity-70">I have specific brand colors</span>
            </Button>

            <Button
              variant={formData.colorPreferences?.type === 'mood' ? 'default' : 'outline'}
              className="flex-col h-auto p-4"
              onClick={() => handleColorTypeChange('mood')}
            >
              <Sparkles className="h-5 w-5 mb-2" />
              <span className="font-medium">Mood Based</span>
              <span className="text-xs opacity-70">Choose by feeling or mood</span>
            </Button>
          </div>

          {formData.colorPreferences?.type === 'brand' && (
            <div className="space-y-3">
              <Label htmlFor="brand-color">Primary Brand Color</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="brand-color"
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-16 h-10 p-1 border"
                />
                <Input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  placeholder="#3b82f6"
                  className="font-mono"
                />
              </div>
            </div>
          )}

          {/* Generated Palette Preview */}
          {generatedPalette && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Generated Color Palette</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateNewPalette}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-3 w-3" />
                  Regenerate
                </Button>
              </div>
              <div className="flex gap-2">
                {Object.entries(generatedPalette).map(([key, color]) => {
                  if (typeof color === 'string') {
                    return (
                      <div key={key} className="flex-1">
                        <div 
                          className="h-12 rounded-lg border"
                          style={{ backgroundColor: color }}
                        />
                        <p className="text-xs text-center mt-1 capitalize">{key}</p>
                        <p className="text-xs text-center text-muted-foreground">{color}</p>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Typography Style */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Type className="h-5 w-5" />
            Typography Style
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={formData.typographyStyle || ''}
            onValueChange={handleTypographySelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose typography style" />
            </SelectTrigger>
            <SelectContent>
              {typographyStyles.map((style) => (
                <SelectItem key={style.id} value={style.id}>
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Font Pairing Preview */}
          {fontPairing && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium mb-2 block">Recommended Font Pairing</Label>
              <div className="space-y-2">
                <div style={{ fontFamily: fontPairing.heading.family }}>
                  <p className="text-2xl font-semibold">Heading: {fontPairing.heading.family}</p>
                </div>
                <div style={{ fontFamily: fontPairing.body.family }}>
                  <p className="text-base">Body text: {fontPairing.body.family}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{fontPairing.description}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      {formData.styleDirection && formData.colorPreferences?.type && formData.typographyStyle && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Design direction locked in!</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Style: <span className="text-foreground font-medium">
                    {styleDirections.find(s => s.id === formData.styleDirection)?.title}
                  </span></li>
                  <li>• Colors: <span className="text-foreground font-medium">
                    {formData.colorPreferences.type === 'ai-suggested' ? 'AI suggested' : 
                     formData.colorPreferences.type === 'brand' ? 'Custom brand colors' : 'Mood based'}
                  </span></li>
                  <li>• Typography: <span className="text-foreground font-medium">
                    {typographyStyles.find(t => t.id === formData.typographyStyle)?.label}
                  </span></li>
                </ul>
                <p className="text-xs text-primary font-medium mt-2">
                  ✓ Your design system is taking shape beautifully
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}