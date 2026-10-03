// Scores how well a query matches some text. -1 means no match, higher is better.
// Every word in the query has to appear in the text; matches at the start of a word score highest.
export function score(query, text) {
  const q = query.trim().toLowerCase()
  if (!q) return 0
  const t = text.toLowerCase()
  if (t === q) return 100
  if (t.startsWith(q)) return 80

  const words = q.split(/\s+/)
  let total = 0
  for (const word of words) {
    const index = t.indexOf(word)
    if (index === -1) return -1
    const atWordStart = index === 0 || t[index - 1] === ' ' || t[index - 1] === '-'
    total += atWordStart ? 60 : 40
  }
  return total / words.length
}
