import { useEffect, useState } from 'react'

export default function CountUp({ target, isPercentage = false, shouldStart, delay = 0 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) {
      setCount(0)
      return
    }

    const startTime = performance.now()
    const duration = 2000 // 2 seconds
    const end = parseFloat(target)
    const start = 0
    const easing = t => 1 - Math.pow(1 - t, 3)

    const timeout = setTimeout(() => {
      const step = now => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = easing(progress)
        const current = start + (end - start) * eased
        setCount(current)

        if (progress < 1) requestAnimationFrame(step)
      }

      requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [shouldStart, target, delay])

  const formatted = isPercentage ? `${(count * 100).toFixed(1)}%` : Math.round(count).toLocaleString()

  return <span>{formatted}</span>
}
