import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, className = '', glare = true }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState('')
  const [hovered, setHovered] = useState(false)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, o: 0 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * -10
    const ry = (px - 0.5) * 10
    setTransform(`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.015)`)
    setGlarePos({ x: px * 100, y: py * 100, o: 0.22 })
  }

  const enter = () => setHovered(true)

  const reset = () => {
    setHovered(false)
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)')
    setGlarePos((g) => ({ ...g, o: 0 }))
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={enter}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ transform, zIndex: hovered ? 10 : 1 }}
      className={`tilt-card relative isolate transition-transform duration-200 ease-out ${className}`}
    >
      <div className="tilt-card__inner relative h-full">{children}</div>
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit] transition-opacity duration-200"
          style={{
            opacity: glarePos.o,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.7), transparent 45%)`,
          }}
        />
      )}
    </motion.div>
  )
}
