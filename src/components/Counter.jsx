import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setCount((prev) => prev - 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <div className="counter-card">
      <div className="counter-display">{count}</div>
      <div className="btn-group">
        <button className="btn btn-dec" onClick={handleDecrement}>
          -1
        </button>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-inc" onClick={handleIncrement}>
          +1
        </button>
      </div>
    </div>
  )
}
