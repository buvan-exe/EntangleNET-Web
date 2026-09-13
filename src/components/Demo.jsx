import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Qubit from './effects/Qubit.jsx'
import './Demo.css'

gsap.registerPlugin(ScrollTrigger)

const stages = ['Data', 'Quantum encoding', 'QCNN', 'Risk score']

function Demo() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const particleRef = useRef(null)
  const nodeRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })

      tl.to(particleRef.current, {
        left: '100%',
        duration: 3.2,
        ease: 'power1.inOut',
      }, 0)

      nodeRefs.current.forEach((el, i) => {
        tl.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
        }, (i / (stages.length - 1)) * 3.2 - 0.15)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="demo" ref={sectionRef}>
      <div className="demo-heading">
        <span className="features-kicker">Demo</span>
        <h2>How a record moves through the pipeline</h2>
      </div>

      <div className="demo-track" ref={trackRef}>
        <div className="demo-line" />
        <div className="demo-particle" ref={particleRef}>
          <Qubit size={40} />
        </div>

        {stages.map((label, i) => (
          <div
            className="demo-node glass-panel"
            key={i}
            ref={(el) => (nodeRefs.current[i] = el)}
            style={{ left: `${(i / (stages.length - 1)) * 100}%` }}
          >
            <span className="demo-node-dot" />
            <span className="demo-node-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Demo