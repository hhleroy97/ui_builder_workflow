import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  completed: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (stepIndex: number) => void
  className?: string
}

export function StepIndicator({ 
  steps, 
  currentStep, 
  onStepClick,
  className 
}: StepIndicatorProps) {
  return (
    <nav className={cn("flex items-center justify-center", className)}>
      <ol className="flex items-center space-x-2 sm:space-x-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = step.completed
          const isClickable = onStepClick && index <= currentStep

          return (
            <li key={step.id} className="flex items-center">
              <button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  {
                    "bg-primary text-primary-foreground": isActive || isCompleted,
                    "border-2 border-muted text-muted-foreground bg-background": 
                      !isActive && !isCompleted,
                    "cursor-pointer hover:bg-muted": isClickable,
                    "cursor-default": !isClickable
                  }
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>

              <span
                className={cn(
                  "ml-2 hidden sm:block text-sm font-medium",
                  {
                    "text-primary": isActive,
                    "text-foreground": isCompleted,
                    "text-muted-foreground": !isActive && !isCompleted
                  }
                )}
              >
                {step.title}
              </span>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "ml-2 sm:ml-4 h-0.5 w-8 sm:w-12 transition-colors",
                    {
                      "bg-primary": index < currentStep || step.completed,
                      "bg-muted": index >= currentStep && !step.completed
                    }
                  )}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}