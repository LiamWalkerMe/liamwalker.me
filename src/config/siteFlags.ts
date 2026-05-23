export const siteFlags = {
  miracosta: false,
  website: false,
} as const

export type SiteFlagKey = keyof typeof siteFlags

function getDevUnderConstructionOverride(flag: SiteFlagKey) {
  const envKey = `VITE_FORCE_UNDER_CONSTRUCTION_${flag.toUpperCase()}`
  const overrideValue = import.meta.env[envKey]

  if (overrideValue === 'true') {
    return true
  }

  if (overrideValue === 'false') {
    return false
  }

  return undefined
}

export function isPageUnderConstruction(flag: SiteFlagKey) {
  if (import.meta.env.DEV) {
    return getDevUnderConstructionOverride(flag) ?? false
  }

  return siteFlags[flag]
}
