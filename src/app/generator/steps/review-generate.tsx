"use client"

import { useFormStore } from "@/lib/form-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  User, 
  ShoppingCart, 
  BarChart3, 
  BookOpen, 
  Building,
  Palette,
  Type,
  Layout,
  Zap,
  Smartphone,
  Monitor,
  Tablet,
  Accessibility,
  CheckCircle,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const projectTypeIcons = {
  landing: Globe,
  portfolio: User,
  ecommerce: ShoppingCart,
  saas: BarChart3,
  blog: BookOpen,
  corporate: Building
}

const deviceIcons = {
  'mobile-first': Smartphone,
  'desktop-first': Monitor,
  'equal': Tablet
}

export function ReviewGenerateStep() {
  const { formData, completeStep } = useFormStore()

  const handleGenerate = () => {
    completeStep('review-generate')
    // This would trigger the actual template generation
    console.log('Generating template with data:', formData)
  }

  const ProjectIcon = projectTypeIcons[formData.projectType as keyof typeof projectTypeIcons] || Globe
  const DeviceIcon = deviceIcons[formData.devicePriority as keyof typeof deviceIcons] || Smartphone

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">Review your template specifications</h2>
        <p className="text-muted-foreground">
          Everything looks good? Let's generate your professional template!
        </p>
      </div>

      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ProjectIcon className="h-5 w-5" />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Project Type</Label>
              <p className="font-medium capitalize">{formData.projectType?.replace(/([A-Z])/g, ' $1')}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Industry</Label>
              <p className="font-medium capitalize">{formData.industry}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Primary Purpose</Label>
              <p className="font-medium">{formData.purpose}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Target Audience</Label>
              <p className="font-medium">{formData.targetAudience}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Design Specifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Style Direction</Label>
              <p className="font-medium capitalize">{formData.styleDirection}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Color Approach</Label>
              <p className="font-medium">
                {formData.colorPreferences?.type === 'ai-suggested' && 'AI Suggested'}
                {formData.colorPreferences?.type === 'brand' && 'Custom Brand Colors'}
                {formData.colorPreferences?.type === 'mood' && 'Mood Based'}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Typography Style</Label>
              <p className="font-medium capitalize">{formData.typographyStyle}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content & Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Content & Features
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-muted-foreground mb-2 block">
              Page Sections ({formData.requiredSections?.length || 0} selected)
            </Label>
            <div className="flex flex-wrap gap-2">
              {formData.requiredSections?.map((section) => (
                <Badge key={section} variant="secondary" className="capitalize">
                  {section.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>

          {formData.interactiveElements && formData.interactiveElements.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Interactive Elements ({formData.interactiveElements.length})
              </Label>
              <div className="flex flex-wrap gap-2">
                {formData.interactiveElements.map((element) => (
                  <Badge key={element} variant="outline" className="capitalize">
                    {element.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {formData.specialFeatures && formData.specialFeatures.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-muted-foreground mb-2 block">
                Special Features ({formData.specialFeatures.length})
              </Label>
              <div className="flex flex-wrap gap-2">
                {formData.specialFeatures.map((feature) => (
                  <Badge key={feature} variant="outline" className="bg-primary/5 text-primary border-primary/20">
                    {feature.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Technical Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DeviceIcon className="h-5 w-5" />
            Technical Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Device Priority</Label>
              <p className="font-medium capitalize">{formData.devicePriority?.replace('-', ' ')}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Accessibility Level</Label>
              <p className="font-medium capitalize">{formData.accessibilityLevel}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Preview */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            What You'll Get
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-sm">Professional Template</h5>
                <p className="text-xs text-muted-foreground">
                  Complete HTML/CSS template with your specifications
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-sm">Figma Design File</h5>
                <p className="text-xs text-muted-foreground">
                  Organized components and design system
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-sm">Component Library</h5>
                <p className="text-xs text-muted-foreground">
                  Reusable components with variants
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-sm">Design Tokens</h5>
                <p className="text-xs text-muted-foreground">
                  Colors, typography, and spacing system
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-sm">Documentation</h5>
                <p className="text-xs text-muted-foreground">
                  Usage guidelines and implementation notes
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-sm">Export Ready</h5>
                <p className="text-xs text-muted-foreground">
                  Optimized for Figma Community or client delivery
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generation Button */}
      <div className="text-center pt-4">
        <Button 
          size="lg" 
          onClick={handleGenerate}
          className="px-12 py-3 text-lg font-semibold flex items-center gap-2"
        >
          <Sparkles className="h-5 w-5" />
          Generate My Template
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          This may take 30-60 seconds to generate your custom template
        </p>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("text-sm font-medium", className)}>{children}</div>
}