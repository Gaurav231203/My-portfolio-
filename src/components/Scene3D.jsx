import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Environment,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Icosahedron,
  Torus,
  Sphere,
  ContactShadows,
} from '@react-three/drei'
import { useTheme } from '../context/ThemeContext.jsx'

function KnotBlob() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.25
    ref.current.rotation.x += delta * 0.08
  })
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.4}>
      <Icosahedron ref={ref} args={[1.35, 6]}>
        <MeshDistortMaterial
          color="#7c5cff"
          emissive="#3b1e8f"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
          distort={0.38}
          speed={1.8}
        />
      </Icosahedron>
    </Float>
  )
}

function GlassRing() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.4
  })
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Torus ref={ref} args={[2.1, 0.09, 32, 128]} rotation={[Math.PI / 2.4, 0, 0]}>
        <MeshTransmissionMaterial
          thickness={0.6}
          roughness={0.1}
          transmission={1}
          ior={1.4}
          chromaticAberration={0.06}
          color="#ff9d6c"
        />
      </Torus>
    </Float>
  )
}

function Orbs() {
  const positions = [
    [2.4, 1.2, -1],
    [-2.6, -0.8, -0.5],
    [1.8, -1.6, 0.4],
    [-1.9, 1.7, -0.8],
  ]
  const colors = ['#a78bfa', '#ff9d6c', '#22d3ee', '#7c5cff']
  return positions.map((p, i) => (
    <Float key={i} speed={1 + i * 0.3} floatIntensity={2} rotationIntensity={1}>
      <Sphere args={[0.16 + (i % 3) * 0.05, 32, 32]} position={p}>
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
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={theme === 'dark' ? 0.4 : 0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -3, 2]} intensity={2} color="#ff9d6c" />
        <pointLight position={[5, 3, -2]} intensity={2} color="#7c5cff" />
        <KnotBlob />
        <GlassRing />
        <Orbs />
        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={theme === 'dark' ? 0.35 : 0.2}
          scale={10}
          blur={2.6}
          far={4}
        />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
