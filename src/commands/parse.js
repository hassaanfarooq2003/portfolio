// Splits a command line into words, keeping "quoted phrases" together.
export function tokenize(input) {
  const tokens = []
  const pattern = /"([^"]*)"|'([^']*)'|(\S+)/g
  let match = pattern.exec(input)
  while (match !== null) {
    tokens.push(match[1] ?? match[2] ?? match[3])
    match = pattern.exec(input)
  }
  return tokens
}
