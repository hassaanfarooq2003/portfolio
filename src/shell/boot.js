const BOOT_KEY = 'portfolio:booted'

export function hasBooted() {
  try {
    return sessionStorage.getItem(BOOT_KEY) === '1'
  } catch {
    return false
  }
}

export function markBooted() {
  try {
    sessionStorage.setItem(BOOT_KEY, '1')
  } catch {
    // ignore: the boot screen may simply play again on the next load
  }
}

export function resetBoot() {
  try {
    sessionStorage.removeItem(BOOT_KEY)
  } catch {
    // ignore
  }
}
