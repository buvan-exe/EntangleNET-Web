import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function GlassOrb() {
  const groupRef = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y += delta * 0.1
    groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.12
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.4, 128, 128]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          transmission={1}
          roughness={0.08}
          thickness={1.8}
          ior={1.3}
          chromaticAberration={0.4}
          anisotropy={0.3}
          distortion={0.6}
          distortionScale={0.4}
          temporalDistortion={0.15}
          color="#c9b8ff"
          attenuationColor="#4FE3C1"
          attenuationDistance={1.2}
        />
      </mesh>

      <Sparkles count={100} scale={4} size={2} speed={0.25} color="#9B6BFF" />
      <Sparkles count={60} scale={2.8} size={1.2} speed={0.15} color="#4FE3C1" />
    </group>
  )
}

function BlochSphere() {
  const wrapperRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '50% 0px 50% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%' }}>
      {active && (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[4, 3, 4]} intensity={1.2} color="#4FE3C1" />
          <pointLight position={[-4, -2, -3]} intensity={1} color="#9B6BFF" />
          <Environment preset="night" />
          <GlassOrb />
          <EffectComposer>
            <Bloom intensity={0.6} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  )
}

export default BlochSphere