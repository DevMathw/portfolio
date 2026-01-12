'use client'

import { useRef } from 'react'

const Magnetic = ({ children }) => {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  }

  const reset = () => {
    ref.current.style.transform = 'translate(0,0)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="inline-block transition-transform duration-150"
    >
      {children}
    </div>
  )
}

export default Magnetic
