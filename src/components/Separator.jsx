import ScrollVelocity from './effects/ScrollVelocity.jsx'
import './Separator.css'

function Separator() {
  return (
    <section className="separator">
      <ScrollVelocity
        texts={['ANOMALIES DETECTED', 'QUANTUM ADVANTAGE']}
        velocity={60}
        className="separator-text"
        numCopies={6}
      />
    </section>
  )
}

export default Separator