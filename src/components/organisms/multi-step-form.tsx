"use client"

import { ReactNode, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressBar } from "@/components/molecules/progress-bar"
import { StepIndicator } from "@/components/molecules/step-indicator"
import { useFormStore } from "@/lib/form-store"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface MultiStepFormProps {
  children: ReactNode
  onComplete?: () => void
  className?: string
}

export function MultiStepForm({ children, onComplete, className }: MultiStepFormProps) {
  const {
    currentStep,
    steps,
    nextStep,
    previousStep,
    setCurrentStep,
    getProgress,
    canNavigateToStep
  } = useFormStore()

  // Use local state for progress to prevent hydration mismatch
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Update progress client-side only
    setProgress(getProgress())
  }, [getProgress, steps])

  const currentStepData = steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete()
    } else {
      nextStep()
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (canNavigateToStep(stepIndex)) {
      setCurrentStep(stepIndex)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Your Template
            </h1>
            <p className="text-muted-foreground">
              Follow our guided process to generate your perfect website template
            </p>
          </div>

          <ProgressBar 
            value={progress} 
            showPercentage 
            className="max-w-md mx-auto"
          />

          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            className="max-w-4xl mx-auto"
          />
        </div>

        {/* Main Form Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">
              {currentStepData?.title}
            </CardTitle>
            <CardDescription className="text-base">
              {currentStepData?.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Form Content */}
            <div className="min-h-[400px]">
              {children}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={isFirstStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </span>
                
                <Button
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  {isLastStep ? (
                    "Generate Template"
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? Each step builds on the previous one to create your perfect template.
            You can always go back to make changes.
          </p>
        </div>
      </div>
    </div>
  )
}