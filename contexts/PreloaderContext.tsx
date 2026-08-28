'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PreloaderContextType {
  isLoaded: boolean
  setIsLoaded: (v: boolean) => void
}

const PreloaderContext = createContext<PreloaderContextType>({
  isLoaded: false,
  setIsLoaded: () => {},
})

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <PreloaderContext.Provider value={{ isLoaded, setIsLoaded }}>
      {children}
    </PreloaderContext.Provider>
  )
}

export function usePreloader() {
  return useContext(PreloaderContext)
}
