'use client'

import { useState, useEffect } from 'react'

export type PriceData = {
  macos:     string                 // Stripe price ID for the macOS plan
  trialDays: { macos: number }
  amounts:   Record<string, number> // unit_amount in cents, keyed by price ID
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
