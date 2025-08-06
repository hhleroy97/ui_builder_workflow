"use client"

import { MultiStepForm } from "@/components/organisms/multi-step-form"
import { useFormStore } from "@/lib/form-store"
import { ProjectTypeStep } from "./steps/project-type"
import { IndustryPurposeStep } from "./steps/industry-purpose" 
import { DesignPreferencesStep } from "./steps/design-preferences"
import { ContentFeaturesStep } from "./steps/content-features"
import { TechnicalSpecsStep } from "./steps/technical-specs"
import { ReviewGenerateStep } from "./steps/review-generate"

export default function GeneratorPage() {
  const currentStep = useFormStore((state) => state.currentStep)

  const handleComplete = () => {
    // Handle form completion - generate template
    console.log('Form completed - generating template...')
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

  return (
    <MultiStepForm onComplete={handleComplete}>
      {renderCurrentStep()}
    </MultiStepForm>
  )
}