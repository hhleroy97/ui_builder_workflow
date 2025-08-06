"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MultiStepForm } from "@/components/organisms/multi-step-form"
import { useFormStore } from "@/lib/form-store"
import { TemplateService } from "@/lib/template-service"
import { ProjectTypeStep } from "./steps/project-type"
import { IndustryPurposeStep } from "./steps/industry-purpose" 
import { DesignPreferencesStep } from "./steps/design-preferences"
import { ContentFeaturesStep } from "./steps/content-features"
import { TechnicalSpecsStep } from "./steps/technical-specs"
import { ReviewGenerateStep } from "./steps/review-generate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GeneratorPage() {
  const currentStep = useFormStore((state) => state.currentStep)
  const formData = useFormStore((state) => state.formData)
  const resetForm = useFormStore((state) => state.resetForm)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleComplete = async () => {
    try {
      setGenerating(true)
      setError(null)

      // Generate the template
      const template = await TemplateService.generateTemplate(formData)
      
      // Navigate to results page with template data
      const templateParam = encodeURIComponent(JSON.stringify(template))
      router.push(`/results?template=${templateParam}`)

    } catch (err) {
      console.error('Template generation failed:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate template')
    } finally {
      setGenerating(false)
    }
  }

  const handleRetry = () => {
    setError(null)
    handleComplete()
  }

  const handleStartOver = () => {
    resetForm()
    setError(null)
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <ProjectTypeStep />
      case 1:
        return <IndustryPurposeStep />
      case 2:
        return <DesignPreferencesStep />
      case 3:
        return <ContentFeaturesStep />
      case 4:
        return <TechnicalSpecsStep />
      case 5:
        return <ReviewGenerateStep />
      default:
        return <ProjectTypeStep />
    }
  }

  // Show generating state
  if (generating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Generating Your Template</h2>
              <p className="text-muted-foreground mb-4">
                Creating a professional template based on your specifications...
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Analyzing your requirements</p>
                <p>✓ Generating design system</p>
                <p>✓ Creating components</p>
                <p className="text-primary font-medium">🔄 Building template...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <CardTitle>Generation Failed</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{error}</p>
            <div className="flex gap-2">
              <Button onClick={handleRetry} className="flex-1">
                Try Again
              </Button>
              <Button onClick={handleStartOver} variant="outline" className="flex-1">
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <MultiStepForm onComplete={handleComplete}>
      {renderCurrentStep()}
    </MultiStepForm>
  )
}