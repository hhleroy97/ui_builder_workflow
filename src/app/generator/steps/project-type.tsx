"use client"

import { useEffect } from "react"
import { useFormStore } from "@/lib/form-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Globe, 
  User, 
  ShoppingCart, 
  BarChart3, 
  BookOpen, 
  Building 
} from "lucide-react"
import { cn } from "@/lib/utils"

const projectTypes = [
  {
    id: 'landing',
    title: 'Landing Page',
    description: 'Single page focused on conversion and lead generation',
    icon: Globe,
    examples: ['Product launches', 'Service promotions', 'Event pages'],
    color: 'text-blue-600 bg-blue-50'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website', 
    description: 'Showcase work, skills, and professional experience',
    icon: User,
    examples: ['Personal branding', 'Creative showcases', 'Professional profiles'],
    color: 'text-purple-600 bg-purple-50'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Store',
    description: 'Online store with product catalogs and shopping features',
    icon: ShoppingCart,
    examples: ['Online shops', 'Product catalogs', 'Marketplace sites'],
    color: 'text-green-600 bg-green-50'
  },
  {
    id: 'saas',
    title: 'SaaS Dashboard',
    description: 'Software application interface with data visualization',
    icon: BarChart3,
    examples: ['Admin panels', 'Analytics dashboards', 'Management tools'],
    color: 'text-orange-600 bg-orange-50'
  },
  {
    id: 'blog',
    title: 'Blog/Content Site',
    description: 'Content-focused site with articles and publications',
    icon: BookOpen,
    examples: ['Personal blogs', 'News sites', 'Documentation'],
    color: 'text-indigo-600 bg-indigo-50'
  },
  {
    id: 'corporate',
    title: 'Corporate Website',
    description: 'Professional business site with company information',
    icon: Building,
    examples: ['Company sites', 'Professional services', 'About pages'],
    color: 'text-gray-600 bg-gray-50'
  }
]

export function ProjectTypeStep() {
  const { formData, updateFormData, completeStep } = useFormStore()

  const handleSelect = (projectType: string) => {
    updateFormData({ 
      projectType: projectType as any
    })
    completeStep('project-type')
  }

  useEffect(() => {
    if (formData.projectType) {
      completeStep('project-type')
    }
  }, [formData.projectType, completeStep])

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">What type of website are you building?</h2>
        <p className="text-muted-foreground">
          Choose the option that best matches your project goals
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypes.map((type) => {
          const Icon = type.icon
          const isSelected = formData.projectType === type.id
          
          return (
            <Card 
              key={type.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md border-2",
                isSelected 
                  ? "border-primary bg-primary/5 shadow-md" 
                  : "border-border hover:border-primary/50"
              )}
              onClick={() => handleSelect(type.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", type.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-sm mb-4">
                  {type.description}
                </CardDescription>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground mb-2">
                    Perfect for:
                  </p>
                  {type.examples.map((example, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      • {example}
                    </p>
                  ))}
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

      {formData.projectType && (
        <div className="mt-8 p-4 bg-primary/10 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium">
              Great choice! This will help us recommend the best design patterns and features for your{' '}
              {projectTypes.find(t => t.id === formData.projectType)?.title.toLowerCase()}.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}