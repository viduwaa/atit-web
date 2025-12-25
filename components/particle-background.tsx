"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000 * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 2000
      positions[i + 1] = (Math.random() - 0.5) * 2000
      positions[i + 2] = (Math.random() - 0.5) * 2000
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.0001
      ref.current.rotation.y += 0.0002
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={2} sizeAttenuation={true} depthWrite={false} />
    </Points>
  )
}

function CircuitLines() {
  const lineRef = useRef<THREE.LineSegments>(null)

  const lines = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions: number[] = []

    // Create grid-like circuit lines
    for (let x = -1000; x <= 1000; x += 200) {
      for (let y = -1000; y <= 1000; y += 200) {
        const z = 0
        positions.push(x, y, z)
        positions.push(x + 200, y, z)
        positions.push(x, y, z)
        positions.push(x, y + 200, z)
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3))
    return geometry
  }, [])

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.z += 0.00005
    }
  })

  return (
    <lineSegments ref={lineRef} geometry={lines}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.15} linewidth={1} />
    </lineSegments>
  )
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 500], fov: 75 }} style={{ background: "#000000", pointerEvents: "none" }}>
        <ParticleField />
        <CircuitLines />
      </Canvas>
    </div>
  )
}
