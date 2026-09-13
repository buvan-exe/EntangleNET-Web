import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero.jsx'
import Problem from './components/Problem.jsx'
import Pitch from './components/Pitch.jsx'
import Abstract from './components/Abstract.jsx'
import Features from './components/Features.jsx'
import Demo from './components/Demo.jsx'
import MoltenMetal from './components/effects/MoltenMetal.jsx'
import Separator from './components/Separator.jsx'
import Contact from './components/Contact.jsx'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const handleLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', handleLoad)
    const settleTimeout = setTimeout(() => ScrollTrigger.refresh(), 500)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
      window.removeEventListener('load', handleLoad)
      clearTimeout(settleTimeout)
    }
  }, [])

  return (
    <div>
      <Hero />
      <Problem />
      <Pitch />
      <Abstract />

      <div className="features-demo-wrap">
        <div className="features-demo-bg">
          <MoltenMetal
            color1="#4FE3C1"
            color2="#9B6BFF"
            color3="#0A0C14"
            speed={0.2}
            scale={4.5}
            glow={1.2}
            brightness={1.1}
            colorMode="frost"
            grain={true}
            grainIntensity={0.03}
            opacity={0.5}
            mouseInteraction={true}
            mouseStrength={0.2}
          />
        </div>
        <Features />
        <Demo />
        <Separator />
        <Contact />
      </div>
    </div>
  )
}

export default App