import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Sphere, ContactShadows } from '@react-three/drei'
import { useTheme } from '../context/ThemeContext.jsx'

const SKIN = '#f2c6a0'
const DARK = '#171320'
const SHIRT = '#7c5cff'

function lerp(a, b, t) {
  return a + (b - a) * t
}

function Person() {
  const headRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('pointermove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  useFrame(() => {
    if (!headRef.current) return
    const targetY = mouse.current.x * 0.75
    const targetX = mouse.current.y * 0.45
    headRef.current.rotation.y = lerp(headRef.current.rotation.y, targetY, 0.1)
    headRef.current.rotation.x = lerp(headRef.current.rotation.x, targetX, 0.1)
  })

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.6}>
      <group position={[0, -0.35, 0]} scale={1.15}>
        {/* torso */}
        <mesh position={[0, -0.15, 0]} castShadow>
          <capsuleGeometry args={[0.55, 0.7, 8, 24]} />
          <meshStandardMaterial color={SHIRT} roughness={0.45} metalness={0.25} />
        </mesh>
        {/* arms */}
        <mesh position={[-0.66, -0.1, 0]} rotation={[0, 0, 0.32]} castShadow>
          <capsuleGeometry args={[0.15, 0.62, 8, 20]} />
          <meshStandardMaterial color={SHIRT} roughness={0.45} metalness={0.25} />
        </mesh>
        <mesh position={[0.66, -0.1, 0]} rotation={[0, 0, -0.32]} castShadow>
          <capsuleGeometry args={[0.15, 0.62, 8, 20]} />
          <meshStandardMaterial color={SHIRT} roughness={0.45} metalness={0.25} />
        </mesh>
        {/* neck */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.16, 0.18, 0.28, 20]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>

        {/* head group — follows the cursor */}
        <group ref={headRef} position={[0, 1.0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.6, 48, 48]} />
            <meshStandardMaterial color={SKIN} roughness={0.55} />
          </mesh>
          {/* hair */}
          <mesh position={[0, 0.16, -0.04]} scale={[1.03, 0.9, 1.02]}>
            <sphereGeometry args={[0.6, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
            <meshStandardMaterial color={DARK} roughness={0.7} />
          </mesh>
          {/* eyes */}
          <mesh position={[-0.2, 0.02, 0.53]}>
            <sphereGeometry args={[0.06, 24, 24]} />
            <meshStandardMaterial color={DARK} roughness={0.3} />
          </mesh>
          <mesh position={[0.2, 0.02, 0.53]}>
            <sphereGeometry args={[0.06, 24, 24]} />
            <meshStandardMaterial color={DARK} roughness={0.3} />
          </mesh>
          {/* glasses */}
          <mesh position={[-0.2, 0.02, 0.55]}>
            <torusGeometry args={[0.12, 0.02, 16, 32]} />
            <meshStandardMaterial color={DARK} roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[0.2, 0.02, 0.55]}>
            <torusGeometry args={[0.12, 0.02, 16, 32]} />
            <meshStandardMaterial color={DARK} roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.02, 0.56]}>
            <boxGeometry args={[0.16, 0.02, 0.02]} />
            <meshStandardMaterial color={DARK} roughness={0.3} metalness={0.5} />
          </mesh>
        </group>
      </group>
    </Float>
  )
}

function Orbs() {
  const positions = [
    [2.4, 1.4, -1],
    [-2.6, -0.6, -0.5],
    [2.1, -1.6, 0.4],
    [-2.1, 1.7, -0.8],
  ]
  const colors = ['#a78bfa', '#ff9d6c', '#22d3ee', '#7c5cff']
  return positions.map((p, i) => (
    <Float key={i} speed={1 + i * 0.3} floatIntensity={2} rotationIntensity={1}>
      <Sphere args={[0.14 + (i % 3) * 0.05, 32, 32]} position={p}>
        <meshStandardMaterial
          color={colors[i]}
          emissive={colors[i]}
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.4}
        />
      </Sphere>
    </Float>
  ))
}

export default function Scene3D() {
  const { theme } = useTheme()
  return (
    <Canvas
      camera={{ position: [0, 0.4, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={theme === 'dark' ? 0.5 : 0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[-5, -3, 2]} intensity={2} color="#ff9d6c" />
        <pointLight position={[5, 3, -2]} intensity={2} color="#7c5cff" />
        <Person />
        <Orbs />
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={theme === 'dark' ? 0.4 : 0.25}
          scale={10}
          blur={2.6}
          far={4}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
