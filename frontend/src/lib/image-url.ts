const ABSOLUTE_OR_SPECIAL_URL = /^(https?:)?\/\//i
const DATA_OR_BROWSER_URL = /^(data|blob):/i

export function imageUrl(value: string | null | undefined): string {
  const src = value?.trim() || ''
  if (!src) return ''

  if (
    ABSOLUTE_OR_SPECIAL_URL.test(src) ||
    DATA_OR_BROWSER_URL.test(src) ||
    src.startsWith('/')
  ) {
    return src
  }

  if (src.startsWith('assets/')) {
    return `/${src}`
  }

  return `/assets/${src.replace(/^\.?\//, '')}`
}

export function normalizeImageFields<T extends Record<string, any>>(
  item: T,
  fields: string[],
): T {
  return fields.reduce<T>(
    (next, field) => {
      const value = next[field]
      if (typeof value === 'string') {
        return { ...next, [field]: imageUrl(value) }
      }
      if (Array.isArray(value)) {
        return { ...next, [field]: value.map((v) => typeof v === 'string' ? imageUrl(v) : v) }
      }
      return next
    },
    item,
  )
}

export function normalizeImageCollection<T extends Record<string, any>>(
  items: T[],
  fields: string[],
): T[] {
  return items.map((item) => normalizeImageFields(item, fields))
}
