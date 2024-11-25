import { create } from "zustand"
import { persist } from "zustand/middleware"
import React, { useEffect } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme: Theme) => {
        set({ theme })
        const root = window.document.documentElement
        root.classList.remove("light", "dark")

        if (theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
          root.classList.add(systemTheme)
          return
        }

        root.classList.add(theme)
      }
    }),
    {
      name: "divvy-theme",
      partialize: (state) => ({ theme: state.theme })
    }
  )
)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)

  useEffect(() => {
    setTheme(theme)
  }, [setTheme, theme])

  return <>{children}</>
}

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)
  return { theme, setTheme } as const
}

export default useThemeStore