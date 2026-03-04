'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function PricingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene setup
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 4.5

    // Gold particle geometry — 200 points on a sphere
    const COUNT    = 200
    const positions = new Float32Array(COUNT * 3)
    const phi = Math.PI * (Math.sqrt(5) - 1) // golden angle

    for (let i = 0; i < COUNT; i++) {
      const y   = 1 - (i / (COUNT - 1)) * 2
      const r   = Math.sqrt(1 - y * y)
      const th  = phi * i
      positions[i * 3]     = Math.cos(th) * r * 2.2
      positions[i * 3 + 1] = y * 2.2
      positions[i * 3 + 2] = Math.sin(th) * r * 2.2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      color: 0xC9A84C,     // champagne gold
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
      depthWrite: false,
    })

    const particles = new THREE.Points(geo, mat)
    scene.add(particles)

    // Add a few larger accent particles
    const accentGeo = new THREE.BufferGeometry()
    const accentPos = new Float32Array(30 * 3)
    for (let i = 0; i < 30; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi2  = Math.acos(2 * Math.random() - 1)
      accentPos[i * 3]     = 2.5 * Math.sin(phi2) * Math.cos(theta)
      accentPos[i * 3 + 1] = 2.5 * Math.sin(phi2) * Math.sin(theta)
      accentPos[i * 3 + 2] = 2.5 * Math.cos(phi2)
    }
    accentGeo.setAttribute('position', new THREE.BufferAttribute(accentPos, 3))
    const accentMat = new THREE.PointsMaterial({
      color: 0xD4AE58,
      size: 0.08,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      depthWrite: false,
    })
    scene.add(new THREE.Points(accentGeo, accentMat))

    // Resize handler
    const handleResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Animation loop
    let animId: number
    let t = 0
    const animate = () => {
      animId = requestAnimationFrame(animate)
      t += 0.0004
      particles.rotation.y = t
      particles.rotation.x = t * 0.3
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      geo.dispose()
      mat.dispose()
      accentGeo.dispose()
      accentMat.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.35,
        pointerEvents: 'none',
      }}
    />
  )
}
