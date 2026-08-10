<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getFirebaseClientApp } from '~/utils/firebaseClient'

export default {
  data() {
    return {
      embeddedLink: '',
      uploadDate: '',
      sessionLink: '',
      sessionDate: '',
      showSuccessMessage: false,
      showSessionSuccessMessage: false,
      techtonicError: '',
      sessionError: '',
      submittingTechtonic: false,
      submittingSession: false,
    }
  },
  methods: {
    async submitForm() {
      this.techtonicError = ''
      this.submittingTechtonic = true
      try {
        if (!this.embeddedLink || !this.uploadDate) {
          this.techtonicError = 'Embedded link and date are required.'
          return
        }

        const firestore = getFirestore(getFirebaseClientApp())

        await addDoc(collection(firestore, 'radioshow'), {
          embeddedLink: this.embeddedLink,
          uploadDate: this.uploadDate,
        })

        this.embeddedLink = ''
        this.uploadDate = ''
        this.showSuccessMessage = true

        setTimeout(() => {
          this.showSuccessMessage = false
        }, 3000)
      } catch (error) {
        console.error('Error uploading radioshow:', error)
        this.techtonicError = 'Upload failed. Check Firebase access and try again.'
      } finally {
        this.submittingTechtonic = false
      }
    },
    async submitAccurateSessionForm() {
      this.sessionError = ''
      this.submittingSession = true
      try {
        if (!this.sessionLink || !this.sessionDate) {
          this.sessionError = 'Session link and date are required.'
          return
        }

        const firestore = getFirestore(getFirebaseClientApp())

        await addDoc(collection(firestore, 'accurate-sessions'), {
          sessionLink: this.sessionLink,
          sessionDate: this.sessionDate,
        })

        this.sessionLink = ''
        this.sessionDate = ''
        this.showSessionSuccessMessage = true

        setTimeout(() => {
          this.showSessionSuccessMessage = false
        }, 3000)
      } catch (error) {
        console.error('Error uploading accurate session:', error)
        this.sessionError = 'Upload failed. Check Firebase access and try again.'
      } finally {
        this.submittingSession = false
      }
    },
  },
}
</script>

<script setup>
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <AdminShell
    title="Broadcast"
    index="02"
    lede="Add Techtonic / In Progress Radio embeds and Accurate Sessions. Keep the public archive sorted by date."
  >
    <section class="admin-panel" aria-labelledby="techtonic-title">
      <div class="admin-panel__head">
        <p class="admin-panel__label">01 / Techtonic</p>
        <h2 id="techtonic-title" class="admin-panel__title">Upload radioshow</h2>
        <p class="admin-panel__copy">
          Paste the full SoundCloud or Mixcloud embed URL and the show date.
          Public pages expect roughly 15 shows, newest first.
        </p>
      </div>

      <form class="admin-grid" @submit.prevent="submitForm">
        <div class="admin-field admin-field--full">
          <label for="embeddedLink">Embedded link</label>
          <input
            id="embeddedLink"
            v-model="embeddedLink"
            class="admin-input"
            type="url"
            placeholder="https://…"
            required
          >
        </div>

        <div class="admin-field">
          <label for="uploadDate">Show date</label>
          <input
            id="uploadDate"
            v-model="uploadDate"
            type="date"
            required
          >
        </div>

        <div class="admin-actions admin-field--full">
          <button
            class="admin-btn"
            type="submit"
            :disabled="submittingTechtonic"
            v-scramble.hover
          >
            {{ submittingTechtonic ? 'Uploading…' : 'Upload show' }}
          </button>
        </div>

        <p
          v-if="showSuccessMessage"
          class="admin-feedback admin-feedback--success admin-field--full"
          role="status"
        >
          Radioshow uploaded.
        </p>
        <p
          v-if="techtonicError"
          class="admin-feedback admin-feedback--error admin-field--full"
          role="alert"
        >
          {{ techtonicError }}
        </p>
      </form>
    </section>

    <section class="admin-panel" aria-labelledby="sessions-title">
      <div class="admin-panel__head">
        <p class="admin-panel__label">02 / Accurate Sessions</p>
        <h2 id="sessions-title" class="admin-panel__title">Upload session</h2>
        <p class="admin-panel__copy">
          Add an Accurate Session embed with its recording date.
        </p>
      </div>

      <form class="admin-grid" @submit.prevent="submitAccurateSessionForm">
        <div class="admin-field admin-field--full">
          <label for="sessionLink">Session link</label>
          <input
            id="sessionLink"
            v-model="sessionLink"
            type="url"
            placeholder="https://…"
            required
          >
        </div>

        <div class="admin-field">
          <label for="sessionDate">Session date</label>
          <input
            id="sessionDate"
            v-model="sessionDate"
            type="date"
            required
          >
        </div>

        <div class="admin-actions admin-field--full">
          <button
            class="admin-btn"
            type="submit"
            :disabled="submittingSession"
            v-scramble.hover
          >
            {{ submittingSession ? 'Uploading…' : 'Upload session' }}
          </button>
        </div>

        <p
          v-if="showSessionSuccessMessage"
          class="admin-feedback admin-feedback--success admin-field--full"
          role="status"
        >
          Accurate session uploaded.
        </p>
        <p
          v-if="sessionError"
          class="admin-feedback admin-feedback--error admin-field--full"
          role="alert"
        >
          {{ sessionError }}
        </p>
      </form>
    </section>
  </AdminShell>
</template>
