"use client"

import { useEffect } from "react"
import { useFormStore } from "@/lib/form-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { 
  Smartphone, 
  Monitor, 
  Tablet, 
  Accessibility, 
  Zap, 
  Shield,
  Eye,
  Users
} from "lucide-react"
import { cn } from "@/lib/utils"

const devicePriorities = [
  {
    id: 'mobile-first',
    title: 'Mobile First',
    description: 'Optimized for phones, then adapted for larger screens',
    icon: Smartphone,
    stats: '60% of web traffic is mobile',
    color: 'text-green-600 bg-green-50'
  },
  {
    id: 'desktop-first',
    title: 'Desktop First', 
    description: 'Designed for computers, then adapted for mobile',
    icon: Monitor,
    stats: 'Better for complex interfaces',
    color: 'text-blue-600 bg-blue-50'
  },
  {
    id: 'equal',
    title: 'Equal Priority',
    description: 'Balanced approach for all device types',
    icon: Tablet,
    stats: 'Best for diverse audiences',
    color: 'text-purple-600 bg-purple-50'
  }
]

const accessibilityLevels = [
  {
    id: 'basic',
    title: 'Basic Accessibility',
    description: 'Essential accessibility features',
    features: ['Proper heading structure', 'Alt text for images', 'Keyboard navigation'],
    color: 'text-yellow-600 bg-yellow-50'
  },
  {
    id: 'enhanced', 
    title: 'Enhanced Accessibility',
    description: 'WCAG AA compliance (recommended)',
    features: ['Color contrast standards', 'Screen reader optimization', 'Focus indicators', 'Skip links'],
    color: 'text-blue-600 bg-blue-50'
  },
  {
    id: 'full',
    title: 'Full Accessibility',
    description: 'WCAG AAA compliance (highest standard)',
    features: ['Maximum contrast ratios', 'Multiple navigation methods', 'Enhanced readability', 'Comprehensive testing'],
    color: 'text-green-600 bg-green-50'
  }
]

export function TechnicalSpecsStep() {
  const { formData, updateFormData, completeStep } = useFormStore()

  const handleDevicePrioritySelect = (priority: string) => {
    updateFormData({ 
      devicePriority: priority as any
    })
  }

  const handleAccessibilitySelect = (level: string) => {
    updateFormData({
      accessibilityLevel: level as any
    })
  }

  // Auto-complete step when required fields are selected
  useEffect(() => {
    if (formData.devicePriority && formData.accessibilityLevel) {
      completeStep('technical-specs')
    }
  }, [formData.devicePriority, formData.accessibilityLevel, completeStep])

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">Technical requirements</h2>
        <p className="text-muted-foreground">
          Set your priorities for devices and accessibility
        </p>
      </div>

      {/* Device Priority */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Device Priority
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {devicePriorities.map((priority) => {
              const Icon = priority.icon
              const isSelected = formData.devicePriority === priority.id
              
              return (
                <Card 
                  key={priority.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-md" 
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => handleDevicePrioritySelect(priority.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2 rounded-lg", priority.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{priority.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      {priority.description}
                    </p>
                    
                    <div className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                      {priority.stats}
                    </div>

                    {isSelected && (
                      <div className="mt-4 flex items-center justify-center">
                        <Button size="sm" className="w-full">
                          Selected ✓
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Accessibility Level */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accessibilityLevels.map((level) => {
              const isSelected = formData.accessibilityLevel === level.id
              
              return (
                <Card 
                  key={level.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-md" 
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => handleAccessibilitySelect(level.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-2 rounded-lg flex-shrink-0", level.color)}>
                        <Eye className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{level.title}</h4>
                          {level.id === 'enhanced' && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              Recommended
                            </span>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {level.description}
                        </p>
                        
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground mb-1">
                            Includes:
                          </p>
                          {level.features.map((feature, index) => (
                            <p key={index} className="text-xs text-muted-foreground">
                              • {feature}
                            </p>
                          ))}
                        </div>

                        {isSelected && (
                          <div className="mt-3">
                            <Button size="sm" className="w-full">
                              Selected ✓
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance & Features Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Performance & Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Zap className="h-5 w-5 text-orange-600 mt-1" />
              <div>
                <h5 className="font-medium text-sm">Fast Loading</h5>
                <p className="text-xs text-muted-foreground">
                  Optimized images and code for speed
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <h5 className="font-medium text-sm">SEO Ready</h5>
                <p className="text-xs text-muted-foreground">
                  Semantic HTML and meta tags included
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 mt-1" />
              <div>
                <h5 className="font-medium text-sm">User Tested</h5>
                <p className="text-xs text-muted-foreground">
                  Patterns proven to work well
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {formData.devicePriority && formData.accessibilityLevel && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Technical specs confirmed!</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Device focus: <span className="text-foreground font-medium">
                    {devicePriorities.find(d => d.id === formData.devicePriority)?.title}
                  </span></li>
                  <li>• Accessibility: <span className="text-foreground font-medium">
                    {accessibilityLevels.find(a => a.id === formData.accessibilityLevel)?.title}
                  </span></li>
                  <li>• Performance: <span className="text-foreground font-medium">Optimized for speed</span></li>
                </ul>
                <p className="text-xs text-primary font-medium mt-2">
                  ✓ Your template will meet modern web standards
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}