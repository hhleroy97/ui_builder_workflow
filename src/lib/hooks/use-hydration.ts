import { useEffect, useState } from 'react'

/**
 * Custom hook to handle hydration safely
 * Returns false during server-side rendering and initial hydration,
 * then true after the component has hydrated on the client
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
}