export const getContactInbox = (): string => {
  const config = useRuntimeConfig()
  const inbox = String(config.contactInbox || '').trim()
  if (!inbox || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inbox)) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Contact inbox is not configured',
    })
  }
  return inbox
}

export const clampText = (value: unknown, max: number): string => {
  return String(value ?? '').trim().slice(0, max)
}

export const requireText = (value: unknown, max: number, label: string): string => {
  const text = clampText(value, max)
  if (!text) {
    throw createError({
      statusCode: 400,
      statusMessage: `${label} is required`,
    })
  }
  return text
}

export const isHoneypotTriggered = (body: Record<string, unknown>): boolean => {
  return Boolean(clampText(body.website ?? body.company_url ?? body.fax, 200))
}
