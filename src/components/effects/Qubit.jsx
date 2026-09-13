import './Qubit.css'

function Qubit({ size = 60, className = '' }) {
  return (
    <svg
      className={`qubit-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ overflow: 'visible' }}
    >
      <ellipse className="qubit-orbit qubit-orbit-1" cx="50" cy="50" rx="42" ry="16" />
      <ellipse className="qubit-orbit qubit-orbit-2" cx="50" cy="50" rx="42" ry="16" />
      <ellipse className="qubit-orbit qubit-orbit-3" cx="50" cy="50" rx="42" ry="16" />
      <circle cx="50" cy="50" r="7" fill="#ffffff" />
    </svg>
  )
}

export default Qubit