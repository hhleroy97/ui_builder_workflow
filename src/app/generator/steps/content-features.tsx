"use client"

import { useEffect } from "react"
import { useFormStore } from "@/lib/form-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { 
  Layout, 
  Users, 
  Mail, 
  Star, 
  ShoppingCart, 
  Calendar,
  FileText,
  Play,
  MessageSquare,
  Search,
  BarChart3,
  Camera,
  MapPin,
  Globe,
  Zap
} from "lucide-react"

const sectionOptions = [
  { id: 'hero', label: 'Hero/Banner Section', description: 'Eye-catching main banner with headline', icon: Layout, required: true },
  { id: 'about', label: 'About Section', description: 'Information about you or your company', icon: Users },
  { id: 'services', label: 'Services/Features', description: 'What you offer or product features', icon: Zap },
  { id: 'portfolio', label: 'Portfolio/Gallery', description: 'Showcase your work or products', icon: Camera },
  { id: 'testimonials', label: 'Testimonials', description: 'Customer reviews and social proof', icon: Star },
  { id: 'team', label: 'Team Section', description: 'Meet the team behind your business', icon: Users },
  { id: 'pricing', label: 'Pricing Tables', description: 'Service packages or product pricing', icon: ShoppingCart },
  { id: 'blog', label: 'Blog/News', description: 'Latest articles or company updates', icon: FileText },
  { id: 'contact', label: 'Contact Information', description: 'How to get in touch', icon: Mail, required: true },
  { id: 'location', label: 'Location/Map', description: 'Physical address and map integration', icon: MapPin },
  { id: 'faq', label: 'FAQ Section', description: 'Frequently asked questions', icon: MessageSquare },
  { id: 'newsletter', label: 'Newsletter Signup', description: 'Email subscription form', icon: Mail }
]

const interactiveElements = [
  { id: 'contact_form', label: 'Contact Form', description: 'Let visitors send you messages', icon: Mail },
  { id: 'search', label: 'Search Bar', description: 'Help users find content quickly', icon: Search },
  { id: 'newsletter', label: 'Email Signup', description: 'Build your email list', icon: Mail },
  { id: 'social_links', label: 'Social Media Links', description: 'Connect to your social profiles', icon: Globe },
  { id: 'testimonial_carousel', label: 'Testimonial Carousel', description: 'Rotating customer reviews', icon: Star },
  { id: 'image_gallery', label: 'Image Gallery', description: 'Lightbox photo gallery', icon: Camera },
  { id: 'video_embed', label: 'Video Embed', description: 'Embedded videos or media', icon: Play },
  { id: 'calendar', label: 'Booking/Calendar', description: 'Appointment scheduling', icon: Calendar },
  { id: 'live_chat', label: 'Live Chat Widget', description: 'Real-time customer support', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics Integration', description: 'Track visitor behavior', icon: BarChart3 }
]

const specialFeatures = [
  { id: 'animations', label: 'Subtle Animations', description: 'Smooth hover effects and transitions' },
  { id: 'parallax', label: 'Parallax Scrolling', description: 'Layered scrolling effects' },
  { id: 'sticky_nav', label: 'Sticky Navigation', description: 'Navigation that follows scroll' },
  { id: 'dark_mode', label: 'Dark Mode Toggle', description: 'Light and dark theme options' },
  { id: 'loading_animations', label: 'Loading Animations', description: 'Smooth loading states' },
  { id: 'scroll_progress', label: 'Scroll Progress Bar', description: 'Show reading progress' },
  { id: 'back_to_top', label: 'Back to Top Button', description: 'Quick scroll to top' },
  { id: 'cookie_banner', label: 'Cookie Consent Banner', description: 'GDPR compliance banner' }
]

export function ContentFeaturesStep() {
  const { formData, updateFormData, completeStep } = useFormStore()

  const handleSectionToggle = (sectionId: string, checked: boolean) => {
    const currentSections = formData.requiredSections || []
    const updatedSections = checked 
      ? [...currentSections, sectionId]
      : currentSections.filter(id => id !== sectionId)
    
    updateFormData({ requiredSections: updatedSections })
  }

  const handleInteractiveToggle = (elementId: string, checked: boolean) => {
    const currentElements = formData.interactiveElements || []
    const updatedElements = checked 
      ? [...currentElements, elementId]
      : currentElements.filter(id => id !== elementId)
    
    updateFormData({ interactiveElements: updatedElements })
  }

  const handleFeatureToggle = (featureId: string, checked: boolean) => {
    const currentFeatures = formData.specialFeatures || []
    const updatedFeatures = checked 
      ? [...currentFeatures, featureId]
      : currentFeatures.filter(id => id !== featureId)
    
    updateFormData({ specialFeatures: updatedFeatures })
  }

  // Auto-complete step when at least hero and contact are selected
  useEffect(() => {
    const requiredSections = formData.requiredSections || []
    const hasRequiredSections = requiredSections.includes('hero') && requiredSections.includes('contact')
    
    if (hasRequiredSections && requiredSections.length >= 2) {
      completeStep('content-features')
    }
  }, [formData.requiredSections, completeStep])

  const requiredSections = formData.requiredSections || []
  const selectedInteractive = formData.interactiveElements || []
  const selectedFeatures = formData.specialFeatures || []

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">What content do you need?</h2>
        <p className="text-muted-foreground">
          Select the sections and features that match your goals
        </p>
      </div>

      {/* Required Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layout className="h-5 w-5" />
            Page Sections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectionOptions.map((section) => {
              const Icon = section.icon
              const isChecked = requiredSections.includes(section.id)
              const isRequired = section.required

              return (
                <div 
                  key={section.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50"
                >
                  <Checkbox
                    id={section.id}
                    checked={isChecked || isRequired}
                    disabled={isRequired}
                    onCheckedChange={(checked) => 
                      handleSectionToggle(section.id, !!checked)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <Label 
                        htmlFor={section.id}
                        className="font-medium cursor-pointer flex items-center gap-2"
                      >
                        {section.label}
                        {isRequired && (
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Elements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Interactive Elements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interactiveElements.map((element) => {
              const Icon = element.icon
              const isChecked = selectedInteractive.includes(element.id)

              return (
                <div 
                  key={element.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50"
                >
                  <Checkbox
                    id={element.id}
                    checked={isChecked}
                    onCheckedChange={(checked) => 
                      handleInteractiveToggle(element.id, !!checked)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <Label 
                        htmlFor={element.id}
                        className="font-medium cursor-pointer"
                      >
                        {element.label}
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {element.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Special Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5" />
            Special Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialFeatures.map((feature) => {
              const isChecked = selectedFeatures.includes(feature.id)

              return (
                <div 
                  key={feature.id}
                  className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50"
                >
                  <Checkbox
                    id={feature.id}
                    checked={isChecked}
                    onCheckedChange={(checked) => 
                      handleFeatureToggle(feature.id, !!checked)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor={feature.id}
                      className="font-medium cursor-pointer block"
                    >
                      {feature.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      {requiredSections.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Layout className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Content plan ready!</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• <span className="text-foreground font-medium">{requiredSections.length}</span> page sections selected</p>
                  <p>• <span className="text-foreground font-medium">{selectedInteractive.length}</span> interactive elements</p>
                  <p>• <span className="text-foreground font-medium">{selectedFeatures.length}</span> special features</p>
                </div>
                <p className="text-xs text-primary font-medium mt-2">
                  ✓ Your template will include all selected components
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}