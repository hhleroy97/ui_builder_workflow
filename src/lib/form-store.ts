import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { ProjectRequirements } from '@/types'

interface FormStep {
  id: string
  title: string
  description: string
  completed: boolean
}

interface FormState {
  // Form navigation
  currentStep: number
  steps: FormStep[]
  isComplete: boolean
  
  // Form data
  formData: Partial<ProjectRequirements>
  
  // Actions
  setCurrentStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  completeStep: (stepId: string) => void
  updateFormData: (data: Partial<ProjectRequirements>) => void
  resetForm: () => void
  
  // Progress calculation
  getProgress: () => number
  canNavigateToStep: (step: number) => boolean
}

const initialSteps: FormStep[] = [
  {
    id: 'project-type',
    title: 'Project Type',
    description: 'Tell us what kind of website you\'re building',
    completed: false
  },
  {
    id: 'industry-purpose',
    title: 'Industry & Purpose',
    description: 'Help us understand your business and goals',
    completed: false
  },
  {
    id: 'design-preferences',
    title: 'Design Style',
    description: 'Choose your visual direction and preferences',
    completed: false
  },
  {
    id: 'content-features',
    title: 'Content & Features',
    description: 'Select the sections and functionality you need',
    completed: false
  },
  {
    id: 'technical-specs',
    title: 'Technical Requirements',
    description: 'Set your device priorities and accessibility needs',
    completed: false
  },
  {
    id: 'review-generate',
    title: 'Review & Generate',
    description: 'Review your choices and generate your template',
    completed: false
  }
]

const initialFormData: Partial<ProjectRequirements> = {
  colorPreferences: {
    type: 'ai-suggested'
  },
  requiredSections: [],
  interactiveElements: [],
  specialFeatures: []
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      steps: initialSteps,
      isComplete: false,
      formData: initialFormData,

      setCurrentStep: (step: number) => {
        const { canNavigateToStep } = get()
        if (canNavigateToStep(step)) {
          set({ currentStep: step })
        }
      },

      nextStep: () => {
        const { currentStep, steps } = get()
        if (currentStep < steps.length - 1) {
          set({ currentStep: currentStep + 1 })
        }
      },

      previousStep: () => {
        const { currentStep } = get()
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 })
        }
      },

      completeStep: (stepId: string) => {
        set((state) => ({
          steps: state.steps.map((step) =>
            step.id === stepId ? { ...step, completed: true } : step
          )
        }))
      },

      updateFormData: (data: Partial<ProjectRequirements>) => {
        set((state) => ({
          formData: { ...state.formData, ...data }
        }))
      },

      resetForm: () => {
        set({
          currentStep: 0,
          steps: initialSteps.map(step => ({ ...step, completed: false })),
          isComplete: false,
          formData: initialFormData
        })
      },

      getProgress: () => {
        const { steps } = get()
        const completedSteps = steps.filter(step => step.completed).length
        return (completedSteps / steps.length) * 100
      },

      canNavigateToStep: (step: number) => {
        const { steps, currentStep } = get()
        
        // Always allow going to previous steps or current step
        if (step <= currentStep) return true
        
        // For next steps, check if previous steps are completed
        if (step === 0) return true
        
        // Can only go to the next step if current step is completed
        // or if we're going to the immediately next step
        if (step === currentStep + 1) return true
        
        // Otherwise, check if all previous steps are completed
        for (let i = 0; i < step; i++) {
          if (!steps[i].completed) return false
        }
        
        return true
      }
    }),
    {
      name: 'ui-builder-form-storage',
      partialize: (state) => ({
        formData: state.formData,
        steps: state.steps,
        currentStep: state.currentStep
      }),
      // Skip hydration to prevent SSR/client mismatch
      skipHydration: true,
      // Use createJSONStorage for better hydration handling
      storage: createJSONStorage(() => 
        typeof window !== 'undefined' ? localStorage : {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {}
        }
      ),
    }
  )
)