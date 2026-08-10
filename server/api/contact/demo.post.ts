import {
  clampText,
  getContactInbox,
  isHoneypotTriggered,
  requireText,
} from '../../utils/contactMail'

const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)

  if (isHoneypotTriggered(body)) {
    return { ok: true, skipped: true }
  }

  const name = requireText(body.name ?? body.user_name, 120, 'Name')
  const artistName = requireText(body.artistName ?? body.user_artistName, 120, 'Artist name')
  const email = requireText(body.email ?? body.user_email, 200, 'Email')
  const demoLink = requireText(body.demoLink ?? body.user_linkToDemo, 500, 'Demo link')
  const message = clampText(body.message, 2000)

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid email is required' })
  }

  if (!isHttpUrl(demoLink)) {
    throw createError({ statusCode: 400, statusMessage: 'Use a full http:// or https:// music link' })
  }

  const inbox = getContactInbox()

  return {
    ok: true,
    inbox,
    subject: `Accurate Black demo: ${artistName}`,
    replyTo: email,
    fields: {
      form_type: 'demo',
      name,
      artist_name: artistName,
      email,
      demo_link: demoLink,
      message: message || '(no message)',
    },
  }
})
