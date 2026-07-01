import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, className = '', glare = true }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, o: 0 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * -14
    const ry = (px - 0.5) * 14
    setTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`)
    setGlarePos({ x: px * 100, y: py * 100, o: 0.28 })
  }

  const reset = () => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)')
    setGlarePos((g) => ({ ...g, o: 0 }))
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform }}
      className={`tilt-card relative transition-transform duration-200 ease-out ${className}`}
    >
      <div className="tilt-card__inner relative h-full">{children}</div>
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200"
          style={{
            opacity: glarePos.o,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8), transparent 45%)`,
          }}
        />
      )}
    </motion.div>
  )
}
