"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useFormStore } from "@/lib/form-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Laptop, 
  Heart, 
  DollarSign, 
  Palette, 
  GraduationCap,
  Building,
  Utensils,
  Home,
  Users,
  Zap
} from "lucide-react"

const industries = [
  { id: 'tech', label: 'Technology & Software', icon: Laptop },
  { id: 'healthcare', label: 'Healthcare & Medical', icon: Heart },
  { id: 'finance', label: 'Finance & Banking', icon: DollarSign },
  { id: 'creative', label: 'Creative & Design', icon: Palette },
  { id: 'education', label: 'Education & Training', icon: GraduationCap },
  { id: 'corporate', label: 'Corporate & Business', icon: Building },
  { id: 'food', label: 'Food & Restaurants', icon: Utensils },
  { id: 'real_estate', label: 'Real Estate & Property', icon: Home },
  { id: 'nonprofit', label: 'Nonprofit & Community', icon: Users },
  { id: 'other', label: 'Other Industry', icon: Zap }
]

const purposes = [
  'Generate leads and conversions',
  'Build brand awareness',
  'Sell products or services',
  'Share information and content',
  'Collect user data',
  'Provide customer support',
  'Showcase portfolio/work',
  'Build community',
  'Educate and inform',
  'Drive event attendance'
]

const audiences = [
  'General consumers (B2C)',
  'Business professionals (B2B)', 
  'Young adults (18-30)',
  'Middle-aged professionals (30-50)',
  'Seniors (50+)',
  'Students and educators',
  'Entrepreneurs and startups',
  'Enterprise decision makers',
  'Creative professionals',
  'Technical/Developer audience'
]

const schema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  purpose: z.string().min(1, "Please select a primary purpose"),
  targetAudience: z.string().min(1, "Please select your target audience"),
  businessName: z.string().optional(),
  additionalContext: z.string().optional()
})

type FormData = z.infer<typeof schema>

export function IndustryPurposeStep() {
  const { formData, updateFormData, completeStep } = useFormStore()
  
  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      industry: formData.industry || "",
      purpose: formData.purpose || "",
      targetAudience: formData.targetAudience || "",
      businessName: "",
      additionalContext: ""
    },
    mode: "onChange"
  })

  const watchedValues = watch()

  useEffect(() => {
    if (isValid && watchedValues.industry && watchedValues.purpose && watchedValues.targetAudience) {
      updateFormData({
        industry: watchedValues.industry,
        purpose: watchedValues.purpose,
        targetAudience: watchedValues.targetAudience
      })
      completeStep('industry-purpose')
    }
  }, [watchedValues, isValid, updateFormData, completeStep])

  const getIndustryIcon = (industryId: string) => {
    const industry = industries.find(i => i.id === industryId)
    return industry?.icon || Zap
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">Tell us about your business</h2>
        <p className="text-muted-foreground">
          This helps us choose the right colors, fonts, and layout for your industry
        </p>
      </div>

      <div className="grid gap-6">
        {/* Industry Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5" />
              What industry are you in?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={watchedValues.industry}
              onValueChange={(value) => setValue('industry', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => {
                  const Icon = industry.icon
                  return (
                    <SelectItem key={industry.id} value={industry.id}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {industry.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-sm text-destructive mt-2">{errors.industry.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Purpose Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5" />
              What's the primary purpose of your website?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={watchedValues.purpose}
              onValueChange={(value) => setValue('purpose', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your main goal" />
              </SelectTrigger>
              <SelectContent>
                {purposes.map((purpose) => (
                  <SelectItem key={purpose} value={purpose}>
                    {purpose}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.purpose && (
              <p className="text-sm text-destructive mt-2">{errors.purpose.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Who is your target audience?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={watchedValues.targetAudience}
              onValueChange={(value) => setValue('targetAudience', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your target audience" />
              </SelectTrigger>
              <SelectContent>
                {audiences.map((audience) => (
                  <SelectItem key={audience} value={audience}>
                    {audience}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.targetAudience && (
              <p className="text-sm text-destructive mt-2">{errors.targetAudience.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Optional Business Name */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Business Name (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="businessName">Company or Project Name</Label>
              <Input
                id="businessName"
                {...register('businessName')}
                placeholder="e.g., Acme Corporation, My Startup"
              />
              <p className="text-xs text-muted-foreground">
                This will help us personalize your template content
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Preview */}
      {watchedValues.industry && watchedValues.purpose && watchedValues.targetAudience && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                {(() => {
                  const Icon = getIndustryIcon(watchedValues.industry)
                  return <Icon className="h-5 w-5 text-primary" />
                })()}
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Perfect! Here's what we understand:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Industry: <span className="text-foreground font-medium">
                    {industries.find(i => i.id === watchedValues.industry)?.label}
                  </span></li>
                  <li>• Goal: <span className="text-foreground font-medium">{watchedValues.purpose}</span></li>
                  <li>• Audience: <span className="text-foreground font-medium">{watchedValues.targetAudience}</span></li>
                </ul>
                <p className="text-xs text-primary font-medium mt-2">
                  ✓ We'll use this to recommend industry-appropriate colors and design patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}