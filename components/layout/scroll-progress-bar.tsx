'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  const spring = useSpring(0, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
      setProgress(pct)
      spring.set(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [spring])

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 200,
        height: '2px',
        background: 'linear-gradient(to right, #B8963E, #D4AE58)',
        scaleX: spring,
        transformOrigin: '0 0',
        pointerEvents: 'none',
      }}
    />
  )
}
