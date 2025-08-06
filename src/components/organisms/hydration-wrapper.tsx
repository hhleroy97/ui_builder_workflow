"use client"

import { ReactNode } from "react"
import { useHydration } from "@/lib/hooks/use-hydration"
import { Loader2 } from "lucide-react"

interface HydrationWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

export function HydrationWrapper({ children, fallback }: HydrationWrapperProps) {
  const isHydrated = useHydration()

  if (!isHydrated) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      )
    )
  }

  return <>{children}</>
}