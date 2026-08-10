<script setup lang="ts">
import { aboutFaqSchema } from '~/utils/siteSeo'
import { withImageKitTransform } from '~/utils/imagekitUrl'

usePageSeo(
  'About Accurate Black',
  'Accurate Black is an independent electronic music label. Deep. Dark. Authentic. Profound. Meet Robbi Altidore and send DJ booking requests.',
  undefined,
  { path: '/about' },
)

useHead({
  script: [{
    key: 'about-faq-jsonld',
    type: 'application/ld+json',
    innerHTML: JSON.stringify(aboutFaqSchema()),
  }],
})

type BookingForm = {
  contact_name: string
  contact_email: string
  venue: string
  event_date: string
  location: string
  dj: string
  event_type: string
  message: string
  website: string
}

type FeedbackKind = 'success' | 'error'

const runtimeConfig = useRuntimeConfig()
const inbox = computed(() => String(runtimeConfig.public.contactInbox || 'info.accurateblack@gmail.com'))

const bookableDjs = [
  {
    id: 'robbi-altidore',
    name: 'Robbi Altidore',
    legalName: 'Robin Plompen',
    roles: ['Owner', 'Producer', 'DJ', 'Radio'],
    image: withImageKitTransform(
      'https://ik.imagekit.io/pweehbu88/icons/Robbi%20Altidore.webp?updatedAt=1738326085511',
      { width: 900, quality: 74 },
    ),
    note: 'Techtonic / In Progress Radio',
  },
] as const

const eventTypes = [
  'Club night',
  'Festival',
  'Private event',
  'Radio / broadcast',
  'Other',
] as const

const masthead = ref<HTMLElement | null>(null)
const thesis = ref<HTMLElement | null>(null)
const profile = ref<HTMLElement | null>(null)
const booking = ref<HTMLElement | null>(null)
const submitBtn = ref<HTMLButtonElement | null>(null)
const dialogCloseBtn = ref<HTMLButtonElement | null>(null)

const { isReady: mastheadReady, isVisible: mastheadVisible } = useOnceInView(masthead)
const { isReady: thesisReady, isVisible: thesisVisible } = useOnceInView(thesis)
const { isReady: profileReady, isVisible: profileVisible } = useOnceInView(profile)
const { isReady: bookingReady, isVisible: bookingVisible } = useOnceInView(booking)

const formData = reactive<BookingForm>({
  contact_name: '',
  contact_email: '',
  venue: '',
  event_date: '',
  location: '',
  dj: bookableDjs[0]?.id ?? '',
  event_type: 'Club night',
  message: '',
  website: '',
})

const sending = ref(false)
const feedback = ref<{ kind: FeedbackKind, message: string, mailto?: string } | null>(null)

const selectedDj = computed(() => bookableDjs.find(dj => dj.id === formData.dj) ?? bookableDjs[0])

const trimForm = (): BookingForm => ({
  contact_name: formData.contact_name.trim(),
  contact_email: formData.contact_email.trim(),
  venue: formData.venue.trim(),
  event_date: formData.event_date.trim(),
  location: formData.location.trim(),
  dj: formData.dj.trim(),
  event_type: formData.event_type.trim(),
  message: formData.message.trim(),
  website: formData.website.trim(),
})

const clearForm = () => {
  formData.contact_name = ''
  formData.contact_email = ''
  formData.venue = ''
  formData.event_date = ''
  formData.location = ''
  formData.dj = bookableDjs[0]?.id ?? ''
  formData.event_type = 'Club night'
  formData.message = ''
  formData.website = ''
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

const sendBooking = async () => {
  if (sending.value) return

  const payload = trimForm()
  Object.assign(formData, payload)
  sending.value = true

  try {
    const validated = await $fetch<{
      ok: boolean
      skipped?: boolean
      inbox?: string
      subject?: string
      replyTo?: string
      fields?: Record<string, string>
    }>('/api/contact/booking', {
      method: 'POST',
      body: {
        ...payload,
        dj: selectedDj.value?.name ?? payload.dj,
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
    openFeedback('success', 'Thanks for your booking request, we reply as soon as possible.')
  } catch (error: unknown) {
    console.error('Booking request failed', error)
    const statusMessage = error instanceof Error
      ? error.message
      : typeof error === 'object' && error && 'data' in error
        ? String((error as { data?: { statusMessage?: string } }).data?.statusMessage || '')
        : ''
    const { buildMailtoFallback } = await import('~/utils/formSubmitClient')
    const mailto = buildMailtoFallback(
      inbox.value,
      `Accurate Black booking: ${selectedDj.value?.name ?? payload.dj} / ${payload.event_date}`,
      [
        `Name: ${payload.contact_name}`,
        `Email: ${payload.contact_email}`,
        `Venue: ${payload.venue}`,
        `Date: ${payload.event_date}`,
        `Location: ${payload.location}`,
        `DJ: ${selectedDj.value?.name ?? payload.dj}`,
        `Type: ${payload.event_type}`,
        '',
        payload.message,
      ],
    )
    openFeedback(
      'error',
      statusMessage || `Could not send. Try again later or email ${inbox.value}.`,
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
  <article class="about-page">
    <header
      ref="masthead"
      class="about-page__masthead"
      :class="{
        'about-page__masthead--ready': mastheadReady,
        'about-page__masthead--visible': mastheadVisible,
      }"
    >
      <div class="about-page__utility">
        <p>07 / ABOUT</p>
        <p>LABEL / PEOPLE</p>
        <p>BOOKINGS OPEN</p>
      </div>

      <h1 class="about-page__title">ABOUT US</h1>

      <div class="about-page__context">
        <p class="about-page__kicker">WE ARE ACCURATE BLACK</p>
        <p class="about-page__description">
          We delve into the depths of electronic music. This is where the beats are felt, not just heard.
        </p>
        <a
          class="about-page__external"
          :href="`mailto:${inbox}`"
        >
          {{ inbox }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>

    <section
      ref="thesis"
      class="about-page__thesis"
      :class="{
        'about-page__thesis--ready': thesisReady,
        'about-page__thesis--visible': thesisVisible,
      }"
      aria-labelledby="about-thesis-title"
    >
      <p class="about-page__rail-label">01 / POSITION</p>
      <h2 id="about-thesis-title" class="sr-only">Label position</h2>
      <ul class="about-page__keywords" aria-label="Label keywords">
        <li>Deep.</li>
        <li>Dark.</li>
        <li>Authentic.</li>
        <li>Profound.</li>
      </ul>
      <p class="about-page__thesis-copy">
        Independent electronic music. Selected with conviction. Released without compromise.
      </p>
    </section>

    <section
      ref="profile"
      class="about-page__profile"
      :class="{
        'about-page__profile--ready': profileReady,
        'about-page__profile--visible': profileVisible,
      }"
      aria-labelledby="about-profile-title"
    >
      <div class="about-page__profile-copy">
        <p class="about-page__rail-label">02 / PEOPLE</p>
        <h2 id="about-profile-title">
          <span class="about-page__legal-name">Robin Plompen</span>
          <span class="about-page__artist-name">Robbi Altidore</span>
        </h2>
        <ul class="about-page__roles">
          <li v-for="role in bookableDjs[0].roles" :key="role">{{ role }}</li>
        </ul>
        <p class="about-page__profile-note">{{ bookableDjs[0].note }}</p>
        <a class="about-page__external" :href="`mailto:${inbox}`">{{ inbox }}</a>
      </div>

      <figure class="about-page__portrait">
        <img
          :src="bookableDjs[0].image"
          alt="Robin Plompen, Robbi Altidore"
          width="1000"
          height="1000"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          class="about-page__portrait-image"
        >
      </figure>
    </section>

    <section
      id="bookings"
      ref="booking"
      class="about-page__booking"
      :class="{
        'about-page__booking--ready': bookingReady,
        'about-page__booking--visible': bookingVisible,
      }"
      aria-labelledby="about-booking-title"
    >
      <aside class="about-page__booking-rail">
        <p class="about-page__rail-label">03 / BOOKINGS</p>
        <h2 id="about-booking-title">Book a DJ</h2>
        <p class="about-page__booking-copy">
          Request Robbi Altidore for club nights, festivals, private events or radio. Tell us the date, city and format.
        </p>

        <ul class="about-page__dj-list" aria-label="Bookable DJs">
          <li
            v-for="dj in bookableDjs"
            :key="dj.id"
            :class="{ 'about-page__dj-list-item--active': formData.dj === dj.id }"
          >
            <button
              type="button"
              class="about-page__dj-select"
              :aria-pressed="formData.dj === dj.id"
              @click="formData.dj = dj.id"
            >
              <span class="about-page__dj-index">DJ</span>
              <span>
                <strong>{{ dj.name }}</strong>
                <small>{{ dj.note }}</small>
              </span>
            </button>
          </li>
        </ul>
      </aside>

      <div class="about-page__booking-form-plane">
        <p class="about-page__rail-label">04 / REQUEST</p>
        <form class="about-page__form" @submit.prevent="sendBooking">
          <div class="about-page__field">
            <label for="booking-name">Your name</label>
            <input
              id="booking-name"
              v-model="formData.contact_name"
              name="contact_name"
              type="text"
              autocomplete="name"
              required
              maxlength="120"
            >
          </div>

          <div class="about-page__field">
            <label for="booking-email">Email</label>
            <input
              id="booking-email"
              v-model="formData.contact_email"
              name="contact_email"
              type="email"
              autocomplete="email"
              inputmode="email"
              required
              maxlength="200"
            >
          </div>

          <div class="about-page__field-row">
            <div class="about-page__field">
              <label for="booking-venue">Venue / promoter</label>
              <input
                id="booking-venue"
                v-model="formData.venue"
                name="venue"
                type="text"
                autocomplete="organization"
                required
                maxlength="160"
              >
            </div>

            <div class="about-page__field">
              <label for="booking-date">Event date</label>
              <input
                id="booking-date"
                v-model="formData.event_date"
                name="event_date"
                type="date"
                required
              >
            </div>
          </div>

          <div class="about-page__field-row">
            <div class="about-page__field">
              <label for="booking-location">City / location</label>
              <input
                id="booking-location"
                v-model="formData.location"
                name="location"
                type="text"
                autocomplete="address-level2"
                required
                maxlength="160"
              >
            </div>

            <div class="about-page__field">
              <label for="booking-type">Event type</label>
              <select
                id="booking-type"
                v-model="formData.event_type"
                name="event_type"
                required
              >
                <option
                  v-for="type in eventTypes"
                  :key="type"
                  :value="type"
                >
                  {{ type }}
                </option>
              </select>
            </div>
          </div>

          <div class="about-page__field">
            <label for="booking-dj">DJ</label>
            <select
              id="booking-dj"
              v-model="formData.dj"
              name="dj"
              required
            >
              <option
                v-for="dj in bookableDjs"
                :key="dj.id"
                :value="dj.id"
              >
                {{ dj.name }}
              </option>
            </select>
          </div>

          <div class="about-page__field">
            <label for="booking-message">Details</label>
            <textarea
              id="booking-message"
              v-model="formData.message"
              name="message"
              required
              rows="5"
              maxlength="2000"
              placeholder="Slot time, fee range, tech rider needs, links"
            />
          </div>

          <div class="about-page__honeypot" aria-hidden="true">
            <label for="booking-website">Website</label>
            <input
              id="booking-website"
              v-model="formData.website"
              name="website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            >
          </div>

          <div class="about-page__actions">
            <button
              ref="submitBtn"
              type="submit"
              class="about-page__submit"
              v-scramble.hover
              :disabled="sending"
            >
              <span>{{ sending ? 'SENDING...' : 'SEND BOOKING REQUEST' }}</span>
            </button>
            <p class="about-page__pending" :aria-live="sending ? 'polite' : undefined">
              <span v-if="sending">Sending...</span>
              <span v-else>Replies go to {{ inbox }}</span>
            </p>
          </div>
        </form>
      </div>
    </section>

    <div
      v-if="feedback"
      class="about-page__dialog-root"
      role="presentation"
    >
      <div
        class="about-page__dialog-backdrop"
        @click="closeFeedback"
      />
      <div
        class="about-page__dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="feedback.kind === 'success' ? 'booking-feedback-title' : undefined"
        aria-describedby="booking-feedback-body"
        :data-kind="feedback.kind"
      >
        <button
          ref="dialogCloseBtn"
          type="button"
          class="about-page__dialog-close"
          aria-label="Close confirmation"
          @click="closeFeedback"
        >
          Close
        </button>
        <p class="about-page__dialog-meta">
          {{ feedback.kind === 'success' ? '05 / RECEIVED' : '05 / FAILED' }}
        </p>
        <div
          v-if="feedback.kind === 'success'"
          class="about-page__check"
          aria-hidden="true"
        >
          <svg viewBox="0 0 64 64" class="about-page__check-svg">
            <circle
              class="about-page__check-ring"
              cx="32"
              cy="32"
              r="28"
              fill="none"
            />
            <path
              class="about-page__check-mark"
              d="M20 33.5 L28.5 42 L45 24"
              fill="none"
            />
          </svg>
        </div>
        <h2
          v-if="feedback.kind === 'success'"
          id="booking-feedback-title"
          class="about-page__dialog-title"
        >
          Booking request received
        </h2>
        <p
          id="booking-feedback-body"
          class="about-page__dialog-body"
          :role="feedback.kind === 'error' ? 'alert' : 'status'"
        >
          {{ feedback.message }}
        </p>
        <a
          v-if="feedback.kind === 'error' && feedback.mailto"
          class="about-page__dialog-mail"
          :href="feedback.mailto"
        >
          Open in email app instead
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  padding-top: var(--header-height);
  overflow-x: clip;
  background: var(--color-void);
  color: var(--color-paper);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.about-page__masthead {
  padding: 1.25rem var(--page-margin) clamp(3.5rem, 7vw, 7rem);
  border-block: 1px solid var(--color-hairline);
}

.about-page__utility {
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

.about-page__utility p { margin: 0; min-width: 0; overflow-wrap: anywhere; }
.about-page__utility p:nth-child(2) { text-align: center; color: var(--color-paper); }
.about-page__utility p:last-child { text-align: right; }

.about-page__title {
  max-width: 100%;
  margin: 0;
  font-size: clamp(2.35rem, 6.2vw + 0.6rem, 7rem);
  font-weight: var(--archive-title-weight);
  line-height: .9;
  letter-spacing: -.05em;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.about-page__context {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 32rem) auto;
  gap: 1.5rem 2rem;
  align-items: end;
  margin-top: clamp(2.5rem, 5vw, 6rem);
}

.about-page__context p { margin: 0; min-width: 0; }

.about-page__kicker,
.about-page__external,
.about-page__rail-label,
.about-page__roles,
.about-page__profile-note,
.about-page__pending,
.about-page__dialog-meta,
.about-page__dialog-close,
.about-page__dj-index {
  font-family: var(--font-mono);
  letter-spacing: .07em;
}

.about-page__kicker {
  color: var(--color-paper);
  font-size: .6875rem;
  line-height: 1.35;
}

.about-page__description,
.about-page__thesis-copy,
.about-page__booking-copy {
  color: var(--color-ash);
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.about-page__external {
  min-height: 2.75rem;
  padding-top: .75rem;
  color: var(--color-paper);
  font-size: .6875rem;
  line-height: 1.35;
  text-decoration: underline;
  text-decoration-color: var(--color-hairline);
  text-underline-offset: .4rem;
  transition: text-decoration-color var(--duration-fast) var(--ease-standard);
}

.about-page__external:hover { text-decoration-color: var(--color-paper); }

.about-page__external:focus-visible,
.about-page__submit:focus-visible,
.about-page__dialog-close:focus-visible,
.about-page__dj-select:focus-visible,
.about-page__field input:focus-visible,
.about-page__field textarea:focus-visible,
.about-page__field select:focus-visible {
  outline: 2px solid var(--color-paper);
  outline-offset: .35rem;
}

.about-page__rail-label {
  margin: 0 0 1.5rem;
  color: var(--color-muted);
  font-size: .625rem;
  letter-spacing: .08em;
}

.about-page__thesis {
  padding: clamp(3rem, 6vw, 6rem) var(--page-margin);
  border-bottom: 1px solid var(--color-hairline);
  background: var(--color-carbon);
}

.about-page__keywords {
  display: flex;
  flex-wrap: wrap;
  gap: .75rem 1.25rem;
  margin: 0 0 1.75rem;
  padding: 0;
  list-style: none;
}

.about-page__keywords li {
  font-size: clamp(1.5rem, 3.5vw, 3rem);
  font-weight: 200;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.about-page__thesis-copy {
  max-width: 36rem;
  margin: 0;
}

.about-page__profile {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  border-bottom: 1px solid var(--color-hairline);
}

.about-page__profile-copy,
.about-page__portrait {
  min-width: 0;
  padding: clamp(2rem, 4vw, 4rem) var(--page-margin);
}

.about-page__profile-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid var(--color-hairline);
}

.about-page__profile h2 {
  display: grid;
  gap: .5rem;
  margin: 0 0 1.75rem;
}

.about-page__legal-name {
  font-size: clamp(1.75rem, 3vw, 2.75rem);
  font-weight: 400;
  letter-spacing: -.04em;
  line-height: 1;
  text-transform: uppercase;
}

.about-page__artist-name {
  color: var(--color-ash);
  font-size: clamp(1rem, 1.6vw, 1.35rem);
  font-style: italic;
  font-weight: 200;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.about-page__roles {
  display: grid;
  gap: .45rem;
  margin: 0 0 1.5rem;
  padding: 0;
  list-style: none;
  color: var(--color-paper);
  font-size: .75rem;
  text-transform: uppercase;
}

.about-page__profile-note {
  margin: 0 0 1.5rem;
  color: var(--color-muted);
  font-size: .625rem;
}

.about-page__portrait {
  display: grid;
  place-items: center;
  background: var(--color-void);
}

.about-page__portrait-image {
  display: block;
  width: min(100%, 28rem);
  height: auto;
  max-height: 34rem;
  object-fit: contain;
  filter: grayscale(1) contrast(1.15);
}

.about-page__booking {
  display: grid;
  grid-template-columns: minmax(14rem, 2fr) minmax(0, 5fr);
  border-bottom: 1px solid var(--color-hairline);
}

.about-page__booking-rail,
.about-page__booking-form-plane {
  min-width: 0;
  padding: clamp(1.75rem, 3.5vw, 3.25rem) var(--page-margin);
}

.about-page__booking-rail {
  border-right: 1px solid var(--color-hairline);
  background: var(--color-carbon);
}

.about-page__booking-rail h2 {
  margin: 0 0 1rem;
  font-size: clamp(1.5rem, 2.4vw + 0.4rem, 2.5rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -.04em;
}

.about-page__booking-copy {
  max-width: 28ch;
  margin: 0 0 2rem;
  font-size: .9375rem;
}

.about-page__dj-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--color-hairline);
}

.about-page__dj-select {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr);
  gap: .75rem;
  align-items: start;
  width: 100%;
  padding: 1rem 0;
  border: 0;
  border-bottom: 1px solid var(--color-hairline);
  background: transparent;
  color: var(--color-paper);
  text-align: left;
  cursor: pointer;
}

.about-page__dj-select strong {
  display: block;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -.02em;
}

.about-page__dj-select small {
  display: block;
  margin-top: .35rem;
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .06em;
}

.about-page__dj-index {
  color: var(--color-muted);
  font-size: .625rem;
}

.about-page__dj-list-item--active .about-page__dj-select {
  color: var(--color-paper);
}

.about-page__dj-list-item--active .about-page__dj-index {
  color: var(--color-paper);
}

.about-page__form {
  position: relative;
  display: grid;
  gap: 1.5rem;
  max-width: 42rem;
}

.about-page__field-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.about-page__field {
  display: grid;
  gap: .55rem;
}

.about-page__field label {
  color: var(--color-ash);
  font-family: var(--font-mono);
  font-size: .625rem;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.about-page__field input,
.about-page__field textarea,
.about-page__field select {
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

.about-page__field select {
  padding-right: 1.5rem;
  background-image: linear-gradient(45deg, transparent 50%, var(--color-ash) 50%), linear-gradient(135deg, var(--color-ash) 50%, transparent 50%);
  background-position: calc(100% - 12px) calc(50% + 2px), calc(100% - 6px) calc(50% + 2px);
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
}

.about-page__field input::placeholder,
.about-page__field textarea::placeholder {
  color: var(--color-muted);
}

.about-page__field input:hover,
.about-page__field textarea:hover,
.about-page__field select:hover {
  border-bottom-color: var(--color-muted);
}

.about-page__field textarea {
  min-height: 8rem;
  resize: vertical;
}

.about-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.75rem;
  align-items: center;
  padding-top: .5rem;
}

.about-page__submit {
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

.about-page__submit:hover:not(:disabled) { text-decoration-color: var(--color-paper); }
.about-page__submit:disabled { opacity: .45; cursor: wait; }

.about-page__pending {
  margin: 0;
  color: var(--color-muted);
  font-size: .625rem;
}

.about-page__honeypot {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.about-page__utility,
.about-page__title,
.about-page__context,
.about-page__thesis,
.about-page__profile-copy,
.about-page__portrait,
.about-page__booking-rail,
.about-page__booking-form-plane {
  clip-path: inset(0);
  transition: clip-path 950ms var(--ease-reveal);
}

.about-page__title { transition-delay: 100ms; }
.about-page__context { transition-delay: 200ms; }
.about-page__portrait { transition-delay: 100ms; }
.about-page__booking-form-plane { transition-delay: 120ms; }

.about-page__masthead--ready:not(.about-page__masthead--visible) .about-page__utility,
.about-page__masthead--ready:not(.about-page__masthead--visible) .about-page__title {
  clip-path: inset(0 100% 0 0);
}

.about-page__masthead--ready:not(.about-page__masthead--visible) .about-page__context,
.about-page__thesis--ready:not(.about-page__thesis--visible),
.about-page__profile--ready:not(.about-page__profile--visible) .about-page__profile-copy,
.about-page__booking--ready:not(.about-page__booking--visible) .about-page__booking-rail,
.about-page__booking--ready:not(.about-page__booking--visible) .about-page__booking-form-plane {
  clip-path: inset(100% 0 0);
}

.about-page__profile--ready:not(.about-page__profile--visible) .about-page__portrait {
  clip-path: inset(0 0 0 100%);
}

.about-page__dialog-root {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  padding: var(--page-margin);
}

.about-page__dialog-backdrop {
  position: absolute;
  inset: 0;
  background: rgb(8 8 8 / 72%);
}

.about-page__dialog {
  position: relative;
  z-index: 1;
  width: min(100%, 28rem);
  padding: 2rem 1.75rem 1.75rem;
  border: 1px solid var(--color-hairline);
  background: var(--color-carbon);
}

.about-page__dialog[data-kind='error'] {
  border-color: color-mix(in srgb, var(--color-error) 45%, var(--color-hairline));
}

.about-page__dialog-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  min-height: 2.5rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-ash);
  font-size: .625rem;
  text-transform: uppercase;
  text-decoration: underline;
  text-decoration-color: var(--color-hairline);
  text-underline-offset: .35rem;
  cursor: pointer;
}

.about-page__dialog-close:hover {
  color: var(--color-paper);
  text-decoration-color: var(--color-paper);
}

.about-page__dialog-meta {
  margin: 0 0 1.25rem;
  color: var(--color-muted);
  font-size: .625rem;
  letter-spacing: .08em;
}

.about-page__check {
  display: grid;
  place-items: center;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0 0 1.25rem;
}

.about-page__check-svg {
  width: 100%;
  height: 100%;
}

.about-page__check-ring,
.about-page__check-mark {
  stroke: #3dcf7a;
  stroke-width: 3.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.about-page__check-ring {
  stroke-dasharray: 176;
  stroke-dashoffset: 176;
  animation: about-check-ring 700ms var(--ease-reveal) forwards;
}

.about-page__check-mark {
  stroke-dasharray: 40;
  stroke-dashoffset: 40;
  animation: about-check-mark 450ms var(--ease-reveal) 280ms forwards;
}

@keyframes about-check-ring {
  to { stroke-dashoffset: 0; }
}

@keyframes about-check-mark {
  to { stroke-dashoffset: 0; }
}

.about-page__dialog-title {
  margin: 0 0 .75rem;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -.04em;
}

.about-page__dialog-body {
  margin: 0;
  max-width: 32ch;
  color: var(--color-ash);
  font-size: 1rem;
  line-height: 1.45;
}

.about-page__dialog-mail {
  margin-top: 1.25rem;
  color: var(--color-paper);
  font-size: .75rem;
  letter-spacing: .08em;
  text-decoration: underline;
  text-transform: uppercase;
}

.about-page__dialog[data-kind='error'] .about-page__dialog-body {
  color: var(--color-error);
}

@media (width < 960px) {
  .about-page__utility { grid-template-columns: 1fr auto; }
  .about-page__utility p:nth-child(2) { text-align: right; }
  .about-page__utility p:last-child { grid-column: 1 / -1; text-align: left; }
  .about-page__context { grid-template-columns: minmax(0, 1fr); }
  .about-page__external { justify-self: start; }
  .about-page__profile,
  .about-page__booking { grid-template-columns: minmax(0, 1fr); }
  .about-page__profile-copy,
  .about-page__booking-rail {
    border-right: 0;
    border-bottom: 1px solid var(--color-hairline);
  }
}

@media (width < 700px) {
  .about-page__field-row { grid-template-columns: 1fr; }
  .about-page__keywords { gap: .5rem .85rem; }
  .about-page__masthead { padding-block: 1rem 3.25rem; }
  .about-page__utility { margin-bottom: 2.5rem; }
  .about-page__title {
    font-size: clamp(2.1rem, 10.5vw, 3.1rem);
    line-height: .92;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-page__utility,
  .about-page__title,
  .about-page__context,
  .about-page__thesis,
  .about-page__profile-copy,
  .about-page__portrait,
  .about-page__booking-rail,
  .about-page__booking-form-plane {
    clip-path: none !important;
    transition: none;
  }

  .about-page__external,
  .about-page__submit,
  .about-page__field input,
  .about-page__field textarea,
  .about-page__field select {
    transition: none;
  }

  .about-page__check-ring,
  .about-page__check-mark {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
