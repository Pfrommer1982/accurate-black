type FormSubmitResponse = {
  success?: string | boolean
  message?: string
}

type FormSubmitPayload = {
  subject: string
  replyTo: string
  fields: Record<string, string>
}

const isTruthySuccess = (value: FormSubmitResponse['success']): boolean =>
  value === true || value === 'true'

export const submitViaFormSubmit = async (
  inbox: string,
  payload: FormSubmitPayload,
): Promise<void> => {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload.fields,
        name: payload.fields.name || payload.fields.contact_name || payload.replyTo,
        email: payload.replyTo,
        _subject: payload.subject,
        _replyto: payload.replyTo,
        _template: 'table',
        _captcha: false,
      }),
    },
  )

  const raw = await response.text()
  let data: FormSubmitResponse = {}
  try {
    data = raw ? JSON.parse(raw) as FormSubmitResponse : {}
  } catch {
    throw new Error('Could not send the message right now.')
  }

  const message = String(data.message || '')

  if (/activat|confirm your email|check your email/i.test(message)) {
    throw new Error(
      'Activate once first: check inbox/spam at the contact address for a FormSubmit email, click Activate Form, then send again.',
    )
  }

  if (!response.ok || !isTruthySuccess(data.success)) {
    throw new Error(message || 'Could not send the message right now.')
  }
}

export const buildMailtoFallback = (
  inbox: string,
  subject: string,
  lines: string[],
): string => {
  const body = lines.filter(Boolean).join('\n')
  return `mailto:${encodeURIComponent(inbox)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
