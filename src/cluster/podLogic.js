const ALPHABET = 'bcdfghjklmnpqrstvwxz2456789'

const randomSuffix = (length) =>
  Array.from({ length }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('')

export const makePodName = (skillId) => `${skillId}-${randomSuffix(5)}`

export const createPods = (skills) =>
  skills.map((skill) => ({
    id: skill.id,
    name: makePodName(skill.id),
    status: 'Running',
    restarts: 0,
  }))

export function pickVictims(pods, min = 2, max = 4) {
  const running = pods.filter((p) => p.status === 'Running')
  const count = Math.min(running.length, min + Math.floor(Math.random() * (max - min + 1)))
  const shuffled = [...running].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
