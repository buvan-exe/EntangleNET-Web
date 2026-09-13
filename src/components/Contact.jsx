import LogoLoop from './effects/LogoLoop.jsx'
import GradualBlur from './effects/GradualBlur.jsx'
import './Contact.css'

const iconWrapStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  color: '#4FE3C1',
}

const IconGithub = (
  <span style={iconWrapStyle}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
    </svg>
  </span>
)

const IconLinkedin = (
  <span style={iconWrapStyle}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/>
    </svg>
  </span>
)

const IconMail = (
  <span style={iconWrapStyle}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 6 10 7L22 6" />
    </svg>
  </span>
)

const contactLogos = [
  { node: IconGithub, href: 'https://github.com/buvan-exe', ariaLabel: 'GitHub' },
  { node: IconLinkedin, href: 'https://www.linkedin.com/in/buvan-r-99987537b', ariaLabel: 'LinkedIn' },
  { node: IconMail, href: 'mailto:buvansurya1235@gmail.com', ariaLabel: 'Email' },
]

function Contact() {
  return (
    <section className="contact">
      <div className="contact-inner">
        <span className="contact-kicker">Get in touch</span>
        <h2>Let's talk about anomalies you can't afford to miss</h2>
        <p>Reach out for a demo, a research collaboration, or just to talk quantum ML.</p>
      </div>

      <div className="contact-loop">
        <LogoLoop
  logos={contactLogos}
  speed={50}
  logoHeight={28}
  gap={120}
  fadeOut={false}
  scaleOnHover
  ariaLabel="Contact links"
/>
      </div>

      <footer className="contact-footer">
        <p>copyrights © 2026 EntangleNET — BUVAN | NIVEDITH | JAI DHARSHAN</p>
      </footer>
    </section>
  )
}

export default Contact