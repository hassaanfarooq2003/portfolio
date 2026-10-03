import { useEffect, useState } from 'react'

// Returns the index of the section currently crossing the reading line (35% down the viewport).
export default function useActiveSection(ids) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.35
      let index = 0
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) index = i
      })
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        index = ids.length - 1
      }
      setActive(index)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
