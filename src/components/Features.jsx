import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Features.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: 'Quantum kernel estimation',
    body: 'Records are encoded into quantum feature space, where anomalies stay separable even as dimensionality climbs into the hundreds.',
  },
  {
    title: 'Two ways to integrate',
    body: 'Connect the API to a live database for continuous monitoring, or upload a dataset once for a single report — no infrastructure change required.',
  },
  {
    title: 'Explainable risk scores',
    body: 'Every flagged record comes with a score and the features that drove it, so your team knows what to check first.',
  },
  {
    title: 'Hybrid by design',
    body: 'Quantum Feature Encoding, Parameterized Quantum Circuits, and a QCNN work alongside classical preprocessing and classification layers.',
  },
]

function Features() {
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 30 })
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="features">
      <div className="features-heading">
        <span className="features-kicker">Features</span>
        <h2>What EntangleNET actually does</h2>
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div
            className="feature-card glass-panel"
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features