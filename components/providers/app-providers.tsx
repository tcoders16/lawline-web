'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { ComingSoonModal }   from '@/components/ui/coming-soon-modal'
import { AiAssistantPanel } from '@/components/ui/ai-assistant-panel'

type AppContextValue = {
  openComingSoon:       (tier?: string) => void
  announcementVisible:  boolean
  dismissAnnouncement:  () => void
}

const AppContext = createContext<AppContextValue>({
  openComingSoon:      () => {},
  announcementVisible: true,
  dismissAnnouncement: () => {},
})

export function useApp() {
  return useContext(AppContext)
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [tier, setTier] = useState<string | undefined>(undefined)
  const [announcementVisible, setAnnouncementVisible] = useState(true)

  const openComingSoon = useCallback((t?: string) => {
    setTier(t)
    setOpen(true)
  }, [])

  const dismissAnnouncement = useCallback(() => {
    setAnnouncementVisible(false)
  }, [])

  return (
    <AppContext.Provider value={{ openComingSoon, announcementVisible, dismissAnnouncement }}>
      {children}
      {/* Global overlays */}
      <ComingSoonModal
        open={open}
        tier={tier}
        onClose={() => setOpen(false)}
      />
      <AiAssistantPanel />
    </AppContext.Provider>
  )
}
