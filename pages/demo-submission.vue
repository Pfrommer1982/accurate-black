<script setup lang="ts">
usePageSeo(
  'Demo Submission',
  'Submit a demo to Accurate Black. Links only (SoundCloud, Bandcamp or private stream). Every demo gets a listen.',
  undefined,
  { path: '/demo-submission' },
)

type FormState = {
  user_name: string
  user_artistName: string
  user_email: string
  user_linkToDemo: string
  message: string
  website: string
}

type FeedbackKind = 'success' | 'error'

const formEl = ref<HTMLFormElement | null>(null)
const submitBtn = ref<HTMLButtonElement | null>(null)
const dialogCloseBtn = ref<HTMLButtonElement | null>(null)
const masthead = ref<HTMLElement | null>(null)
const desk = ref<HTMLElement | null>(null)

const { isReady: mastheadReady, isVisible: mastheadVisible } = useOnceInView(masthead)
const { isReady: deskReady, isVisible: deskVisible } = useOnceInView(desk)

const runtimeConfig = useRuntimeConfig()
const demoInbox = computed(() => String(runtimeConfig.public.contactInbox || 'info.accurateblack@gmail.com'))

const formData = reactive<FormState>({
  user_name: '',
  user_artistName: '',
  user_email: '',
  user_linkToDemo: '',
  message: '',
  website: '',
})


const sending = ref(false)
const linkError = ref('')
const feedback = ref<{ kind: FeedbackKind; message: string; mailto?: string } | null>(null)

const criteria = [
  { index: '01', label: 'Deep / dark electronic music' },
  { index: '02', label: 'Original writing, not trend-chasing' },
  { index: '03', label: 'Links only (SoundCloud, Bandcamp, private stream)' },
  { index: '04', label: 'Every demo gets a listen' },
  { index: '05', label: 'We reply when we can, not on a fixed schedule' },
  { index: '06', label: 'Signed artists get mastering, artwork and distribution' },
] as const

const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

const trimForm = (): FormState => ({
  user_name: formData.user_name.trim(),
  user_artistName: formData.user_artistName.trim(),
  user_email: formData.user_email.trim(),
  user_linkToDemo: formData.user_linkToDemo.trim(),
  message: formData.message.trim(),
  website: formData.website.trim(),
})

const clearForm = () => {
  formData.user_name = ''
  formData.user_artistName = ''
  formData.user_email = ''
  formData.user_linkToDemo = ''
  formData.message = ''
  formData.website = ''
  linkError.value = ''
}

const openFeedback = (kind: FeedbackKind, message: string, mailto?: string) => {
  feedback.value = { kind, message, mailto }
  nextTick(() => dialogCloseBtn.value?.focus())
}

const closeFeedback = () => {
  feedback.value = null
  nextTick(() => submitBtn.value?.focus())
}

const onDialogKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && feedback.value) {
    event.preventDefault()
    closeFeedback()
  }
}

const sendEmail = async () => {
  if (sending.value) return

  const payload = trimForm()
  Object.assign(formData, payload)
  linkError.value = ''

  if (!isHttpUrl(payload.user_linkToDemo)) {
    linkError.value = 'Use a full http:// or https:// music link.'
    return
  }

  sending.value = true

  try {
    const validated = await $fetch<{
      ok: boolean
      skipped?: boolean
      inbox?: string
      subject?: string
      replyTo?: string
      fields?: Record<string, string>
    }>('/api/contact/demo', {
      method: 'POST',
      body: {
        name: payload.user_name,
        artistName: payload.user_artistName,
        email: payload.user_email,
        demoLink: payload.user_linkToDemo,
        message: payload.message,
        website: payload.website,
      },
    })

    if (!validated.skipped && validated.inbox && validated.subject && validated.replyTo && validated.fields) {
      const { submitViaFormSubmit } = await import('~/utils/formSubmitClient')
      await submitViaFormSubmit(validated.inbox, {
        subject: validated.subject,
        replyTo: validated.replyTo,
        fields: validated.fields,
      })
    }

    clearForm()
    openFeedback('success', 'Thanks for your demo, we reply as soon as possible.')
  } catch (error: unknown) {
    console.error('Demo submission failed', error)
    const statusMessage = error instanceof Error
      ? error.message
      : typeof error === 'object' && error && 'data' in error
        ? String((error as { data?: { statusMessage?: string } }).data?.statusMessage || '')
        : ''
    const { buildMailtoFallback } = await import('~/utils/formSubmitClient')
    const mailto = buildMailtoFallback(
      demoInbox.value,
      `Accurate Black demo: ${payload.user_artistName}`,
      [
        `Name: ${payload.user_name}`,
        `Artist: ${payload.user_artistName}`,
        `Email: ${payload.user_email}`,
        `Demo: ${payload.user_linkToDemo}`,
        '',
        payload.message,
      ],
    )
    openFeedback(
      'error',
      statusMessage || `Could not send. Try again later or email ${demoInbox.value}.`,
      mailto,
    )
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', onDialogKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onDialogKeydown)
})
</script>

<template>
  <article class="demo-intake">
    <header
      ref="masthead"
      class="demo-intake__masthead"
      :class="{
        'demo-intake__masthead--ready': mastheadReady,
        'demo-intake__masthead--visible': mastheadVisible,
      }"
    >
      <div class="demo-intake__utility">
        <p>07 / DEMO FORM</p>
        <p>STATUS / OPEN</p>
        <p>PRIVATE REVIEW</p>
      </div>

      <h1 class="demo-intake__title">DEMO SUBMISSION</h1>

      <div class="demo-intake__context">
        <p class="demo-intake__kicker">ACCURATE BLACK / OPEN FOR DEMOS</p>
        <p class="demo-intake__description">
          Send a link to your track. We listen to every demo and keep submissions private.
        </p>
        <a
          class="demo-intake__external"
          :href="`mailto:${demoInbox}`"
        >
          {{ demoInbox }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>

    <section
      ref="desk"
      class="demo-intake__desk"
      :class="{
        'demo-intake__desk--ready': deskReady,
        'demo-intake__desk--visible': deskVisible,
      }"
      aria-labelledby="demo-criteria-title"
    >
      <aside class="demo-intake__criteria" aria-labelledby="demo-criteria-title">
        <p class="demo-intake__rail-label">01 / CRITERIA</p>
        <h2 id="demo-criteria-title">What we listen for</h2>
        <p class="demo-intake__rail-copy">
          Deep. Dark. Authentic. Profound. Links only, no file uploads.
        </p>
        <ol class="demo-intake__points">
          <li v-for="item in criteria" :key="item.index">
            <span class="demo-intake__point-index">{{ item.index }}</span>
            <span>{{ item.label }}</span>
          </li>
        </ol>
      </aside>

      <div class="demo-intake__form-plane">
        <p class="demo-intake__rail-label">02 / FORM</p>
        <form
          ref="formEl"
          class="demo-intake__form"
          @submit.prevent="sendEmail"
        >
          <div class="demo-intake__field">
            <label for="demo-name">Name</label>
            <input
              id="demo-name"
              v-model="formData.user_name"
              name="user_name"
              type="text"
              autocomplete="name"
              required
              maxlength="120"
            >
          </div>

          <div class="demo-intake__field">
            <label for="demo-artist">Artist name</label>
            <input
              id="demo-artist"
              v-model="formData.user_artistName"
              name="user_artistName"
              type="text"
              autocomplete="organization"
              required
              maxlength="120"
            >
          </div>

          <div class="demo-intake__field">
            <label for="demo-email">Email</label>
            <input
              id="demo-email"
              v-model="formData.user_email"
              name="user_email"
              type="email"
              autocomplete="email"
              inputmode="email"
              required
              maxlength="200"
            >
          </div>

          <div class="demo-intake__field">
            <label for="demo-link">Link to demo</label>
            <input
              id="demo-link"
              v-model="formData.user_linkToDemo"
              name="user_linkToDemo"
              type="url"
              inputmode="url"
              autocomplete="url"
              required
              placeholder="https://"
              :aria-invalid="linkError ? 'true' : undefined"
              :aria-describedby="linkError ? 'demo-link-error demo-link-help' : 'demo-link-help'"
            >
            <p id="demo-link-help" class="demo-intake__help">
              Music links only: SoundCloud, Bandcamp, or a private stream.
            </p>
            <p
              v-if="linkError"
              id="demo-link-error"
              class="demo-intake__field-error"
              role="alert"
            >
              {{ linkError }}
            </p>
          </div>

          <div class="demo-intake__field">
            <label for="demo-message">About / message</label>
            <textarea
              id="demo-message"
              v-model="formData.message"
              name="message"
              required
              rows="5"
              maxlength="2000"
            />
          </div>

          <div class="demo-intake__honeypot" aria-hidden="true">
            <label for="demo-website">Website</label>
            <input
              id="demo-website"
              v-model="formData.website"
              name="website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            >
          </div>

          <div class="demo-intake__actions">
            <button
              ref="submitBtn"
              type="submit"
              class="demo-intake__submit"
              :disabled="sending"
              v-scramble.hover
            >
              <span>{{ sending ? 'SENDING…' : 'SUBMIT DEMO' }}</span>
            </button>
            <p class="demo-intake__pending" :aria-live="sending ? 'polite' : undefined">
              <span v-if="sending">Sending...</span>
              <span v-else>Private review. No public queue.</span>
            </p>
          </div>
        </form>
      </div>
    </section>

    <div
      v-if="feedback"
      class="demo-intake__dialog-root"
      role="presentation"
    >
      <div
        class="demo-intake__dialog-backdrop"
        @click="closeFeedback"
      />
      <div
        class="demo-intake__dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="feedback.kind === 'success' ? 'demo-feedback-title' : undefined"
        :aria-describedby="'demo-feedback-body'"
        :data-kind="feedback.kind"
      >
        <button
          ref="dialogCloseBtn"
          type="button"
          class="demo-intake__dialog-close"
          aria-label="Close confirmation"
          @click="closeFeedback"
        >
          Close
        </button>
        <p class="demo-intake__dialog-meta">
          {{ feedback.kind === 'success' ? '03 / RECEIVED' : '03 / FAILED' }}
        </p>
        <div
          v-if="feedback.kind === 'success'"
          class="demo-intake__check"
          aria-hidden="true"
        >
          <svg viewBox="0 0 64 64" class="demo-intake__check-svg">
            <circle
              class="demo-intake__check-ring"
              cx="32"
              cy="32"
              r="28"
              fill="none"
            />
            <path
              class="demo-intake__check-mark"
              d="M20 33.5 L28.5 42 L45 24"
              fill="none"
            />
          </svg>
        </div>
        <h2
          v-if="feedback.kind === 'success'"
          id="demo-feedback-title"
          class="demo-intake__dialog-title"
        >
          Demo received
        </h2>
        <p
          id="demo-feedback-body"
          class="demo-intake__dialog-body"
          :role="feedback.kind === 'error' ? 'alert' : 'status'"
        >
          {{ feedback.message }}
        </p>
        <a
          v-if="feedback.kind === 'error' && feedback.mailto"
          class="demo-intake__dialog-mail"
          :href="feedback.mailto"
        >
          Open in email app instead
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.demo-intake {
  min-height: 100vh;
  padding-top: var(--header-height);
  overflow-x: clip;
  background: var(--color-void);
  color: var(--color-paper);
}

.demo-intake__masthead {
  position: relative;
  padding: 1.25rem var(--page-margin) clamp(3.5rem, 7vw, 7rem);
  border-block: 1px solid var(--color-hairline);
}

.demo-intake__utility {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: .75rem 1rem;
  margin-bottom: clamp(3rem, 7vw, 8rem);
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .625rem;
  line-height: 1.3;
  letter-spacing: .08em;
}

.demo-intake__utility p {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}

.demo-intake__utility p:nth-child(2) {
  text-align: center;
  color: var(--color-paper);
}

.demo-intake__utility p:last-child {
  text-align: right;
}

.demo-intake__title {
  max-width: 100%;
  margin: 0;
  color: var(--color-paper);
  font-size: clamp(2.35rem, 6.2vw + 0.6rem, 7rem);
  font-weight: var(--archive-title-weight);
  line-height: .9;
  letter-spacing: -.05em;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.demo-intake__context {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 32rem) auto;
  gap: 1.5rem 2rem;
  align-items: end;
  margin-top: clamp(2.5rem, 5vw, 6rem);
}

.demo-intake__context p {
  margin: 0;
  min-width: 0;
}

.demo-intake__kicker,
.demo-intake__external {
  font-family: var(--font-mono);
  font-size: .6875rem;
  line-height: 1.35;
  letter-spacing: .07em;
}

.demo-intake__kicker {
  color: var(--color-paper);
}

.demo-intake__description {
  color: var(--color-ash);
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.demo-intake__external {
  min-height: 2.75rem;
  padding-top: .75rem;
  color: var(--color-paper);
  text-decoration: underline;
  text-decoration-color: var(--color-hairline);
  text-underline-offset: .4rem;
  white-space: nowrap;
  transition: text-decoration-color var(--duration-fast) var(--ease-standard);
}

.demo-intake__external:hover {
  text-decoration-color: var(--color-paper);
}

.demo-intake__external:focus-visible,
.demo-intake__submit:focus-visible,
.demo-intake__dialog-close:focus-visible,
.demo-intake__field input:focus-visible,
.demo-intake__field textarea:focus-visible {
  outline: 2px solid var(--color-paper);
  outline-offset: .35rem;
}

.demo-intake__utility,
.demo-intake__title,
.demo-intake__context {
  clip-path: inset(0);
  transition: clip-path 950ms var(--ease-reveal);
}

.demo-intake__title { transition-delay: 100ms; }
.demo-intake__context { transition-delay: 200ms; }

.demo-intake__masthead--ready:not(.demo-intake__masthead--visible) .demo-intake__utility,
.demo-intake__masthead--ready:not(.demo-intake__masthead--visible) .demo-intake__title {
  clip-path: inset(0 100% 0 0);
}

.demo-intake__masthead--ready:not(.demo-intake__masthead--visible) .demo-intake__context {
  clip-path: inset(100% 0 0);
}

.demo-intake__desk {
  display: grid;
  grid-template-columns: minmax(14rem, 2fr) minmax(0, 5fr);
  border-bottom: 1px solid var(--color-hairline);
}

.demo-intake__criteria,
.demo-intake__form-plane {
  min-width: 0;
  padding: clamp(1.75rem, 3.5vw, 3.25rem) var(--page-margin);
}

.demo-intake__criteria {
  border-right: 1px solid var(--color-hairline);
  background: var(--color-carbon);
}

.demo-intake__rail-label {
  margin: 0 0 1.5rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
}

.demo-intake__criteria h2 {
  margin: 0 0 1rem;
  max-width: 12ch;
  font-size: clamp(1.5rem, 2.4vw + 0.4rem, 2.5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -.04em;
}

.demo-intake__rail-copy {
  margin: 0 0 2rem;
  max-width: 28ch;
  color: var(--color-ash);
  font-size: .9375rem;
  line-height: 1.5;
}

.demo-intake__points {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--color-hairline);
}

.demo-intake__points li {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: .75rem;
  align-items: baseline;
  padding: .9rem 0;
  border-bottom: 1px solid var(--color-hairline);
  color: var(--color-paper);
  font-size: .875rem;
  line-height: 1.4;
}

.demo-intake__point-index {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
}

.demo-intake__form {
  position: relative;
  display: grid;
  gap: 1.75rem;
  max-width: 40rem;
}

.demo-intake__field {
  display: grid;
  gap: .55rem;
}

.demo-intake__field label {
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.demo-intake__field input,
.demo-intake__field textarea {
  width: 100%;
  margin: 0;
  padding: .85rem 0 .75rem;
  border: 0;
  border-bottom: 1px solid var(--color-hairline);
  border-radius: 0;
  background: transparent;
  color: var(--color-paper);
  font: inherit;
  font-size: 1rem;
  line-height: 1.4;
  appearance: none;
  transition: border-color var(--duration-fast) var(--ease-standard);
}

.demo-intake__field input::placeholder,
.demo-intake__field textarea::placeholder {
  color: var(--color-muted);
}

.demo-intake__field input:hover,
.demo-intake__field textarea:hover {
  border-bottom-color: var(--color-muted);
}

.demo-intake__field textarea {
  min-height: 8rem;
  resize: vertical;
}

.demo-intake__help {
  margin: 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .06em;
  line-height: 1.45;
}

.demo-intake__field-error {
  margin: 0;
  color: var(--color-error);
  font-family: var(--font-mono);
  font-size: .6875rem;
  letter-spacing: .04em;
}

.demo-intake__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.75rem;
  align-items: center;
  padding-top: .5rem;
}

.demo-intake__submit {
  min-height: 2.75rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: .75rem;
  letter-spacing: .1em;
  text-decoration: underline;
  text-decoration-color: var(--color-hairline);
  text-underline-offset: .45rem;
  cursor: pointer;
  transition:
    color var(--duration-fast) var(--ease-standard),
    text-decoration-color var(--duration-fast) var(--ease-standard),
    opacity var(--duration-fast) var(--ease-standard);
}

.demo-intake__submit:hover:not(:disabled) {
  text-decoration-color: var(--color-paper);
}

.demo-intake__submit:disabled {
  opacity: .45;
  cursor: wait;
}

.demo-intake__pending {
  margin: 0;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .07em;
}

.demo-intake__honeypot {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.demo-intake__criteria,
.demo-intake__form-plane {
  clip-path: inset(0);
  transition: clip-path 1000ms var(--ease-reveal);
}

.demo-intake__form-plane { transition-delay: 120ms; }

.demo-intake__desk--ready:not(.demo-intake__desk--visible) .demo-intake__criteria {
  clip-path: inset(0 0 100% 0);
}

.demo-intake__desk--ready:not(.demo-intake__desk--visible) .demo-intake__form-plane {
  clip-path: inset(0 0 100% 0);
}

.demo-intake__dialog-root {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: var(--page-margin);
}

.demo-intake__dialog-backdrop {
  position: absolute;
  inset: 0;
  background: rgb(8 8 8 / 72%);
}

.demo-intake__dialog {
  position: relative;
  z-index: 1;
  width: min(100%, 28rem);
  padding: 2rem 1.75rem 1.75rem;
  border: 1px solid var(--color-hairline);
  background: var(--color-carbon);
  color: var(--color-paper);
}

.demo-intake__dialog[data-kind='error'] {
  border-color: color-mix(in srgb, var(--color-error) 45%, var(--color-hairline));
}

.demo-intake__dialog-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  min-height: 2.5rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
  text-transform: uppercase;
  text-decoration: underline;
  text-decoration-color: var(--color-hairline);
  text-underline-offset: .35rem;
  cursor: pointer;
}

.demo-intake__dialog-close:hover {
  color: var(--color-paper);
  text-decoration-color: var(--color-paper);
}

.demo-intake__dialog-meta {
  margin: 0 0 1.25rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
}

.demo-intake__check {
  display: grid;
  place-items: center;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0 0 1.25rem;
}

.demo-intake__check-svg {
  width: 100%;
  height: 100%;
}

.demo-intake__check-ring,
.demo-intake__check-mark {
  stroke: #3dcf7a;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.demo-intake__check-ring {
  stroke-dasharray: 176;
  stroke-dashoffset: 176;
  animation: demo-check-ring 700ms var(--ease-reveal) forwards;
}

.demo-intake__check-mark {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: demo-check-mark 450ms var(--ease-reveal) 280ms forwards;
}

@keyframes demo-check-ring {
  to { stroke-dashoffset: 0; }
}

@keyframes demo-check-mark {
  to { stroke-dashoffset: 0; }
}

.demo-intake__dialog-title {
  margin: 0 0 .75rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -.04em;
}

.demo-intake__dialog-body {
  margin: 0;
  max-width: 32ch;
  color: var(--color-ash);
  font-size: 1rem;
  line-height: 1.45;
}

.demo-intake__dialog-mail {
  margin-top: 1.25rem;
  color: var(--color-paper);
  font-size: .75rem;
  letter-spacing: .08em;
  text-decoration: underline;
  text-transform: uppercase;
}

.demo-intake__dialog[data-kind='error'] .demo-intake__dialog-body {
  color: var(--color-error);
}

@media (width < 960px) {
  .demo-intake__utility {
    grid-template-columns: 1fr auto;
  }

  .demo-intake__utility p:nth-child(2) {
    text-align: right;
  }

  .demo-intake__utility p:last-child {
    grid-column: 1 / -1;
    text-align: left;
  }

  .demo-intake__context {
    grid-template-columns: minmax(0, 1fr);
  }

  .demo-intake__external {
    justify-self: start;
    white-space: normal;
  }

  .demo-intake__desk {
    grid-template-columns: minmax(0, 1fr);
  }

  .demo-intake__criteria {
    border-right: 0;
    border-bottom: 1px solid var(--color-hairline);
  }
}

@media (width < 600px) {
  .demo-intake__masthead {
    padding-block: 1rem 3.25rem;
  }

  .demo-intake__utility {
    margin-bottom: 2.5rem;
    gap: .55rem 1rem;
  }

  .demo-intake__title {
    font-size: clamp(2.1rem, 10.5vw, 3.1rem);
    line-height: .92;
    letter-spacing: -.04em;
  }

  .demo-intake__context {
    gap: 1.1rem;
    margin-top: 2.25rem;
  }

  .demo-intake__criteria,
  .demo-intake__form-plane {
    padding-block: 1.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .demo-intake__utility,
  .demo-intake__title,
  .demo-intake__context,
  .demo-intake__criteria,
  .demo-intake__form-plane {
    clip-path: none !important;
    transition: none;
  }

  .demo-intake__external,
  .demo-intake__submit,
  .demo-intake__field input,
  .demo-intake__field textarea {
    transition: none;
  }

  .demo-intake__check-ring,
  .demo-intake__check-mark {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
