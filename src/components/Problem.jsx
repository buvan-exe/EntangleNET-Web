import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PrismaticBurst from './effects/PrismaticBurst.jsx'
import './Problem.css'

gsap.registerPlugin(ScrollTrigger)

const checkpoints = [
  {
    side: 'left',
    title: 'The curse of dimensionality',
    description: 'Past a few dozen features, distance and density stop meaning much — everything starts looking equally far from everything else.',
    heightPct: 12,
  },
  {
    side: 'right',
    title: "Manual review doesn't scale",
    description: 'No team can eyeball millions of rows across hundreds of columns looking for what doesn\u2019t belong.',
    heightPct: 38,
  },
  {
    side: 'left',
    title: 'Anomalies are rare and subtle',
    description: 'Fixed thresholds and simple rules miss the anomalies that matter most — the ones that don\u2019t look like the last one.',
    heightPct: 64,
  },
  {
    side: 'right',
    title: 'By the time you notice, it\u2019s too late',
    description: 'Batch reports and end-of-day reviews mean the damage is already done before anyone sees it.',
    heightPct: 90,
  },
]

function Problem() {
  const sectionRef = useRef(null)
  const particleCoreRef = useRef(null)
  const particleGlowRef = useRef(null)
  const checkpointRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=350%',
          scrub: 1,
          pin: true,
        },
      })

      tl.fromTo(
        particleCoreRef.current,
        { top: '0%' },
        { top: '100%', duration: 1, ease: 'none' },
        0
      ).fromTo(
        particleGlowRef.current,
        { top: '0%' },
        { top: '100%', duration: 1, ease: 'none' },
        0
      )

      checkpoints.forEach((cp, i) => {
        tl.to(
          checkpointRefs.current[i],
          { opacity: 1, x: 0, duration: 0.15 },
          cp.heightPct / 100
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="problem" ref={sectionRef}>
      {/* ambient background burst, full-bleed, low intensity */}
      <div className="problem-bg">
        <PrismaticBurst
          animationType="rotate3d"
          intensity={1.1}
          speed={0.35}
          distort={0.6}
          rayCount={0}
          mixBlendMode="lighten"
          colors={['#4FE3C1', '#9B6BFF', '#0A0C14']}
        />
      </div>
      <div className="problem-overlay" />

      <div className="problem-heading">
        <span className="problem-kicker">The problem</span>
        <h2>High-dimensional data hides what matters most</h2>
      </div>

      <div className="timeline">
        <div className="timeline-line" />

        <div className="timeline-particle-glow" ref={particleGlowRef} />
        <div className="timeline-particle-core" ref={particleCoreRef} />

        {checkpoints.map((cp, i) => (
          <div
            key={i}
            className={`checkpoint checkpoint-${cp.side}`}
            style={{ top: `${cp.heightPct}%` }}
            ref={(el) => (checkpointRefs.current[i] = el)}
          >
            <div className="checkpoint-dot" />
            <div className="checkpoint-text glass-panel">
              <h3>{cp.title}</h3>
              <p>{cp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Problem