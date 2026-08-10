import {
  getContactInbox,
  isHoneypotTriggered,
  requireText,
} from '../../utils/contactMail'

const ALLOWED_EVENT_TYPES = new Set([
  'Club night',
  'Festival',
  'Private event',
  'Radio / broadcast',
  'Other',
])

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)

  if (isHoneypotTriggered(body)) {
    return { ok: true, skipped: true }
  }

  const contactName = requireText(body.contact_name, 120, 'Name')
  const contactEmail = requireText(body.contact_email, 200, 'Email')
  const venue = requireText(body.venue, 160, 'Venue')
  const eventDate = requireText(body.event_date, 40, 'Event date')
  const location = requireText(body.location, 160, 'Location')
  const dj = requireText(body.dj, 120, 'DJ')
  const eventType = requireText(body.event_type, 80, 'Event type')
  const message = requireText(body.message, 2000, 'Details')

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    throw createError({ statusCode: 400, statusMessage: 'A valid email is required' })
  }

  if (!ALLOWED_EVENT_TYPES.has(eventType)) {
    throw createError({ statusCode: 400, statusMessage: 'Choose a valid event type' })
  }

  const inbox = getContactInbox()

  return {
    ok: true,
    inbox,
    subject: `Accurate Black booking: ${dj} / ${eventDate}`,
    replyTo: contactEmail,
    fields: {
      form_type: 'booking',
      contact_name: contactName,
      contact_email: contactEmail,
      venue,
      event_date: eventDate,
      location,
      dj,
      event_type: eventType,
      message,
    },
  }
})
