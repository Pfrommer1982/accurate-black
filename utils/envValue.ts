/** Strip whitespace and wrapping quotes from env values (common Vercel paste mistake). */
export const cleanEnvValue = (value: unknown): string => {
  let text = String(value ?? '').trim()
  if (
    (text.startsWith('"') && text.endsWith('"'))
    || (text.startsWith("'") && text.endsWith("'"))
  ) {
    text = text.slice(1, -1).trim()
  }
  return text
}
