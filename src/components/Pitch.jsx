import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CurvedLoop from './effects/CurvedLoop.jsx'
import CursorGrid from './effects/CursorGrid.jsx'
import BlochSphere from './effects/BlochSphere.jsx'
import './Pitch.css'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    kicker: 'The problem',
    title: 'Critical infrastructure runs on data too complex to watch by hand',
    body: 'Industries, financial institutions, healthcare systems, smart grids, and IoT environments generate massive volumes of high-dimensional operational and network data — making abnormal, previously unseen patterns increasingly hard for conventional techniques to catch.',
  },
  {
    kicker: 'The solution',
    title: 'A hybrid quantum-classical detection engine',
    body: 'Classical preprocessing feeds Quantum Feature Encoding, Parameterized Quantum Circuits, and a Quantum Convolutional Neural Network. Quantum measurements pass to classical layers that generate anomaly classifications and risk scores.',
  },
  {
    kicker: 'The platform',
    title: 'Anomaly detection, delivered as a service',
    body: 'Upload a historical dataset for one-off analysis, or connect existing infrastructure via API for continuous monitoring — risk assessment, alerts, and visualization, all through one dashboard.',
  },
  {
    kicker: 'The mission',
    title: 'Proving hybrid quantum ML belongs in critical infrastructure',
    body: 'EntangleNET exists to experimentally test hybrid quantum machine learning against real anomaly-detection demands, and to deliver a practical architecture for running it as a service.',
  },
]

const RADIUS = 320

function Pitch() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const positionCards = (progress) => {
        const baseAngle = progress * Math.PI * 2
        cardRefs.current.forEach((el, i) => {
          if (!el) return
          const angle = baseAngle + (i / cards.length) * Math.PI * 2 - Math.PI / 2
          const x = Math.cos(angle) * RADIUS
          const y = Math.sin(angle) * RADIUS * 0.55
          const front = Math.cos(angle - Math.PI / 2)
          const scale = 0.7 + Math.max(0, front) * 0.35
          const opacity = 0.25 + Math.max(0, front) * 0.75

          gsap.set(el, {
            x,
            y,
            scale,
            opacity,
            zIndex: Math.round(front * 100),
          })
        })
      }

      positionCards(0)

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: 1,
        pin: true,
        onUpdate: (self) => positionCards(self.progress),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="pitch" ref={sectionRef}>
      <div className="pitch-bg">
        <CursorGrid
          cellSize={64}
          color="#4FE3C1"
          radius={160}
          falloff="smooth"
          holdTime={350}
          fadeDuration={900}
          lineWidth={1}
          maxOpacity={0.5}
          fillOpacity={0.04}
          gridOpacity={0.03}
          cellRadius={4}
          clickPulse={true}
          pulseSpeed={500}
        />
      </div>

      <div className="pitch-orbit">
        <div className="pitch-center-object">
          <BlochSphere />
        </div>

        {cards.map((card, i) => (
          <div
            className="pitch-card glass-panel"
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <span className="pitch-kicker">{card.kicker}</span>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </div>
        ))}
      </div>
      <div className="pitch-bg-text">
  <CurvedLoop
    marqueeText="ABOUT US ✦ SOLUTIONS ✦ VISION ✦ MISSION ✦"
    speed={0.6}
    curveAmount={300}
    interactive={false}
  />
</div>
    </section>
  )
}

export default Pitch