import { useEffect, useRef, useState } from 'react'
import PrismaticBurst from './PrismaticBurst.jsx'

function AmbientBackground({ opacity = 0.35 }) {
  const wrapperRef = useRef(null)
  const [active, setActive] = useState(false)

  // only render/run the WebGL effect while this section is actually
  // near the viewport — this is the fix for the earlier lag/crash issue
  useEffect(() => {
    const el = wrapperRef.current
    if (!el || !('IntersectionObserver' in window)) {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '50% 0px 50% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} style={{ position: 'absolute', inset: 0, opacity, pointerEvents: 'none' }}>
      {active && (
        <PrismaticBurst
          animationType="rotate3d"
          intensity={1.1}
          speed={0.35}
          distort={0.6}
          rayCount={0}
          mixBlendMode="lighten"
          colors={['#4FE3C1', '#9B6BFF', '#0A0C14']}
          paused={!active}
        />
      )}
    </div>
  )
}

export default AmbientBackground