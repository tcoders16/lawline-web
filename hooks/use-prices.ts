'use client'

import { useState, useEffect } from 'react'

export type PriceData = {
  solo: string
  team: string
  firm: string
  dmg: string
  trialDays: { solo: number; team: number; firm: number }
  amounts: Record<string, number>
}

export function usePrices() {
  const [data,    setData]    = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/prices')
      .then(r => r.json())
      .then(json => {
        if (json.ok) setData(json.data)
        else setError(json.error ?? 'Failed to load prices')
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}
