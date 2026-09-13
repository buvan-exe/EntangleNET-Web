import { useEffect, useRef } from 'react'
import AmbientBackground from './effects/AmbientBackground.jsx'
import Qubit from './effects/Qubit.jsx'
import StrokeText from './effects/StrokeText.jsx'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const heroRef = useRef(null)
  const titleWrapRef = useRef(null)
  const subRef = useRef(null)
  const imageRef = useRef(null)
  const particleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ---- ENTRANCE ----
      // the title's own draw-in/fill animation runs automatically on mount
      // (handled internally by StrokeText). We just time the subtitle to
      // appear once that's mostly finished.
      gsap.set(subRef.current, { opacity: 0, y: 20 })
      gsap.to(subRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 2.2,
        ease: 'power2.out',
      })

      // ---- SCROLL-DRIVEN EXIT + QUBIT TRAVEL ----
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        },
      })

      tl.to(titleWrapRef.current, { opacity: 0, y: -30, duration: 1 }, 0)
        .to(subRef.current, { opacity: 0, y: -20, duration: 1 }, 0)
        .to(imageRef.current, { filter: 'blur(0px)', scale: 1.08, duration: 1 }, 0)

        .fromTo(
          particleRef.current,
          { y: 0, scale: 0.6 },
          { y: 550, scale: 1.3, duration: 1, ease: 'power1.in' },
          0.35
        )
        .fromTo(particleRef.current, { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.35)
        .to(particleRef.current, { opacity: 0, duration: 0.15 }, 1.2)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <AmbientBackground />

      <img
        ref={imageRef}
        src="/images/quantum-computer.png"
        alt=""
        className="hero-bg-image"
      />
      <div className="hero-overlay" />

      <div className="particle" ref={particleRef}>
        <Qubit size={60} />
      </div>

      <div className="hero-content">
        {/* hidden defs block providing the teal→violet gradient StrokeText fills with */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="hero-title-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="55%" stopColor="#E7E9F2" />
                <stop offset="100%" stopColor="#B8C0D4" />
            </linearGradient>
          </defs>
        </svg>

        <div className="hero-title-wrap" ref={titleWrapRef}>
          <StrokeText
                text="EntangleNET"
                strokeColor="#4FE3C1"
                fillColor="url(#hero-title-gradient)"
                strokeWidth={1.6}
                drawDuration={1.6}
                fillDelay={0.15}
                stagger={0.05}
                fontSize={110}
                fontWeight={700}
                letterSpacing={-3}
                trigger="mount"
                fillMode="wipe"
/>
        </div>
      </div>
    </section>
  )
}

export default Hero