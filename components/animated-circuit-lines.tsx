"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points } from "@react-three/drei"
import { useRef, useMemo } from "react"
import * as THREE from "three"

function AnimatedCircuitLines() {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments[]>([])
  const dotsRef = useRef<THREE.Points>(null)

  // Create multiple circuit line networks with different colors and opacities
  const { mainGeometry, dotsGeometry } = useMemo(() => {
    const main = new THREE.BufferGeometry()
    const positions: number[] = []

    // Create organic curved circuit paths with varying complexity
    const pathCount = 12
    const pointsPerPath = 40

    for (let p = 0; p < pathCount; p++) {
      const startX = (Math.random() - 0.5) * 2000
      const startY = (Math.random() - 0.5) * 2000
      const startZ = (Math.random() - 0.5) * 1000

      let currentX = startX
      let currentY = startY
      let currentZ = startZ

      for (let i = 0; i < pointsPerPath; i++) {
        positions.push(currentX, currentY, currentZ)

        // Create smooth bezier-like curves
        const angle = Math.random() * Math.PI * 2
        const distance = 60 + Math.random() * 40
        const zVariation = (Math.random() - 0.5) * 100

        currentX += Math.cos(angle) * distance
        currentY += Math.sin(angle) * distance
        currentZ += zVariation

        // Connect back to create a flowing path
        if (i < pointsPerPath - 1) {
          const nextIndex = positions.length / 3
          positions.push(currentX, currentY, currentZ)
        }
      }
    }

    main.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3))

    // Create connection dots at intervals
    const dotsPositions = new Float32Array(positions)
    const dots = new THREE.BufferGeometry()
    dots.setAttribute("position", new THREE.BufferAttribute(dotsPositions, 3))

    return { mainGeometry: main, dotsGeometry: dots }
  }, [])

  // Animation loop for rotating and pulsing effects
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.00015
      groupRef.current.rotation.y += 0.0002
      groupRef.current.rotation.z += 0.00005
    }

    // Animate line drawing effect
    linesRef.current.forEach((line, index) => {
      const material = line.material as THREE.LineBasicMaterial
      const intensity = Math.sin(state.clock.elapsedTime + index * 0.5) * 0.3 + 0.4
      material.opacity = intensity
    })

    // Pulse the dots
    if (dotsRef.current) {
      const material = dotsRef.current.material as THREE.PointsMaterial
      const scale = Math.sin(state.clock.elapsedTime * 2) * 1.5 + 2.5
      material.size = scale
      const opacity = Math.sin(state.clock.elapsedTime * 1.5) * 0.3 + 0.6
      material.opacity = opacity
    }
  })

  return (
    <group ref={groupRef}>
      {/* Primary circuit lines with white gradient */}
      <lineSegments
        ref={(el) => {
          if (el) linesRef.current[0] = el
        }}
        geometry={mainGeometry}
      >
        <lineBasicMaterial color="#ffffff" transparent opacity={0.6} linewidth={2} toneMapped={false} />
      </lineSegments>

      {/* Secondary dimmer lines for depth */}
      <lineSegments geometry={mainGeometry} position={[20, 20, 20]}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.2} linewidth={1} toneMapped={false} />
      </lineSegments>

      <Points ref={dotsRef} geometry={dotsGeometry} frustumCulled={false}>
        <pointsMaterial
          attach="material"
          color="#ffffff"
          size={4}
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          toneMapped={false}
        />
      </Points>
    </group>
  )
}

export function AnimatedCircuitBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 1200], fov: 60 }}
        style={{
          background: "linear-gradient(135deg, #000000 0%, #0a0a0a 100%)",
          pointerEvents: "none",
        }}
      >
        <AnimatedCircuitLines />

        {/* Ambient light for subtle depth */}
        <ambientLight intensity={0.3} />
      </Canvas>
    </div>
  )
}
