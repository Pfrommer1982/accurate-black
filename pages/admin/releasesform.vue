<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirebaseClientApp } from '~/utils/firebaseClient'

export default {
  data() {
    return {
      ACB: '',
      artist: '',
      releaseName: '',
      soundcloudUrl: '',
      imageUrl: '',
      artistImageUrl: '',
      tracks: [{ trackName: '' }],
      socialLinks: [''],
      digDisLink: '',
      bio: '',
      description: '',
      releaseTrailer: '',
      submitting: false,
      formError: '',
      formSuccess: '',
    }
  },
  methods: {
    async submitForm() {
      this.formError = ''
      this.formSuccess = ''
      if (!confirm('Submit this release to Firestore?')) return

      this.submitting = true
      try {
        await this.uploadImagesToStorage()
        await this.addUserToFirestore()
        this.formSuccess = 'Release saved.'
        this.clearForm()
      } catch (error) {
        console.error('Fout bij het verzenden van het formulier:', error)
        this.formError = 'Submit failed. Check files, Firebase access, and required fields.'
      } finally {
        this.submitting = false
      }
    },

    addSocialLink() {
      if (this.socialLinks.length < 6) this.socialLinks.push('')
    },
    removeSocialLink() {
      if (this.socialLinks.length > 1) this.socialLinks.pop()
    },

    addTrack() {
      this.tracks.push({ trackName: '' })
    },
    removeTrack() {
      if (this.tracks.length > 1) this.tracks.pop()
    },

    async uploadImagesToStorage() {
      try {
        const storage = getStorage(getFirebaseClientApp())

        if (this.artistImage) {
          const artistImagePath = `artists/${Date.now()}_${this.artistImage.name}`
          const artistImageRef = storageRef(storage, artistImagePath)
          await uploadBytes(artistImageRef, this.artistImage)
          this.artistImageUrl = await getDownloadURL(artistImageRef)
        }

        if (this.image) {
          const releaseImagePath = `releases/${Date.now()}_${this.image.name}`
          const releaseImageRef = storageRef(storage, releaseImagePath)
          await uploadBytes(releaseImageRef, this.image)
          this.imageUrl = await getDownloadURL(releaseImageRef)
        }
      } catch (error) {
        console.error('Error uploading images to storage: ', error)
        throw error
      }
    },

    async addUserToFirestore() {
      try {
        const db = getFirestore(getFirebaseClientApp())
        const docRef = await addDoc(collection(db, 'users'), {
          ACB: this.ACB,
          artist: this.artist,
          releaseName: this.releaseName,
          soundcloudUrl: this.soundcloudUrl,
          imageUrl: this.imageUrl,
          artistImageUrl: this.artistImageUrl,
          tracks: this.tracks,
          socialLinks: this.socialLinks,
          digDisLink: this.digDisLink,
          bio: this.bio,
          description: this.description,
          releaseTrailer: this.releaseTrailer,
        })
        console.log('Document written with ID: ', docRef.id)
      } catch (error) {
        console.error('Error adding document: ', error)
        throw error
      }
    },

    clearForm() {
      this.ACB = ''
      this.artist = ''
      this.releaseName = ''
      this.soundcloudUrl = ''
      this.imageUrl = ''
      this.artistImageUrl = ''
      this.tracks = [{ trackName: '' }]
      this.socialLinks = ['']
      this.digDisLink = ''
      this.bio = ''
      this.description = ''
      this.releaseTrailer = ''
      this.image = undefined
      this.artistImage = undefined

      if (this.$refs.artistImageInput) this.$refs.artistImageInput.value = ''
      if (this.$refs.imageInput) this.$refs.imageInput.value = ''
    },

    handleImageUpload(event) {
      this.image = event.target.files[0]
    },

    handleArtistImageUpload(event) {
      this.artistImage = event.target.files[0]
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
    title="Release"
    index="01"
    lede="Add a catalogue release with artwork, tracks, embed and store links. Required fields are marked."
  >
    <form class="admin-form" @submit.prevent="submitForm">
        <section class="admin-panel" aria-labelledby="release-identity-title">
          <div class="admin-panel__head">
            <p class="admin-panel__label">01 / Identity</p>
            <h2 id="release-identity-title" class="admin-panel__title">Catalogue & artist</h2>
            <p class="admin-panel__copy">
              Core release identity. Artist greyscale portrait is used on artist pages.
            </p>
          </div>

          <div class="admin-grid">
            <div class="admin-field">
              <label for="ACB">ACB number *</label>
              <input id="ACB" v-model="ACB" type="text" placeholder="ACB000" required>
            </div>

            <div class="admin-field">
              <label for="artist">Artist *</label>
              <input id="artist" v-model="artist" type="text" placeholder="Artist name" required>
            </div>

            <div class="admin-field">
              <label for="releaseName">Release name *</label>
              <input id="releaseName" v-model="releaseName" type="text" placeholder="Release title" required>
            </div>

            <div class="admin-field">
              <label for="artistImage">Artist image (greyscale) *</label>
              <input
                id="artistImage"
                ref="artistImageInput"
                type="file"
                accept="image/*"
                required
                @change="handleArtistImageUpload"
              >
            </div>

            <div class="admin-field admin-field--full">
              <p class="admin-field__label">Social links</p>
              <div class="admin-stack">
                <input
                  v-for="(_link, index) in socialLinks"
                  :key="`social-${index}`"
                  v-model="socialLinks[index]"
                  type="url"
                  placeholder="https://…"
                >
              </div>
              <div class="admin-actions" style="margin-top: .75rem;">
                <button
                  v-if="socialLinks.length < 6"
                  type="button"
                  class="admin-btn admin-btn--ghost"
                  v-scramble.hover
                  @click="addSocialLink"
                >
                  Add social
                </button>
                <button
                  v-if="socialLinks.length > 1"
                  type="button"
                  class="admin-btn admin-btn--ghost"
                  v-scramble.hover
                  @click="removeSocialLink"
                >
                  Remove last
                </button>
              </div>
            </div>
          </div>
        </section>

        <section class="admin-panel" aria-labelledby="release-media-title">
          <div class="admin-panel__head">
            <p class="admin-panel__label">02 / Media</p>
            <h2 id="release-media-title" class="admin-panel__title">Tracks & embeds</h2>
            <p class="admin-panel__copy">
              Tracklist, Spotify dark compact embed, Dig Dis smartlink and artwork.
            </p>
          </div>

          <div class="admin-grid">
            <div class="admin-field admin-field--full">
              <p class="admin-field__label">Track names *</p>
              <div class="admin-stack">
                <input
                  v-for="(track, index) in tracks"
                  :key="`track-${index}`"
                  v-model="track.trackName"
                  type="text"
                  :placeholder="`Track ${index + 1}`"
                  required
                >
              </div>
              <div class="admin-actions" style="margin-top: .75rem;">
                <button
                  type="button"
                  class="admin-btn admin-btn--ghost"
                  v-scramble.hover
                  @click="addTrack"
                >
                  Add track
                </button>
                <button
                  v-if="tracks.length > 1"
                  type="button"
                  class="admin-btn admin-btn--ghost"
                  v-scramble.hover
                  @click="removeTrack"
                >
                  Remove last
                </button>
              </div>
            </div>

            <div class="admin-field admin-field--full">
              <label for="description">Release description</label>
              <textarea
                id="description"
                v-model="description"
                placeholder="Short release text"
              />
            </div>

            <div class="admin-field admin-field--full">
              <label for="soundcloudUrl">Spotify embed (dark grey compact) *</label>
              <textarea
                id="soundcloudUrl"
                v-model="soundcloudUrl"
                placeholder="<iframe …></iframe>"
                required
              />
              <p class="admin-field__hint">
                Paste the full Spotify iframe embed code.
              </p>
            </div>

            <div class="admin-field">
              <label for="releaseTrailer">Trailer video link</label>
              <input
                id="releaseTrailer"
                v-model="releaseTrailer"
                type="url"
                placeholder="https://…"
              >
            </div>

            <div class="admin-field">
              <label for="digDisLink">Dig Dis / smartlink</label>
              <input
                id="digDisLink"
                v-model="digDisLink"
                type="url"
                placeholder="https://…"
              >
            </div>

            <div class="admin-field admin-field--full">
              <label for="image">Release artwork *</label>
              <input
                id="image"
                ref="imageInput"
                type="file"
                accept="image/*"
                required
                @change="handleImageUpload"
              >
            </div>
          </div>
        </section>

        <section class="admin-panel" aria-labelledby="release-actions-title">
          <div class="admin-panel__head">
            <p class="admin-panel__label">03 / Publish</p>
            <h2 id="release-actions-title" class="admin-panel__title">Save release</h2>
            <p class="admin-panel__copy">
              Uploads images to Firebase Storage, then writes the catalogue document.
            </p>
          </div>

          <div class="admin-actions">
            <button
              type="submit"
              class="admin-btn"
              :disabled="submitting"
              v-scramble.hover
            >
              {{ submitting ? 'Saving…' : 'Submit release' }}
            </button>
            <button
              type="button"
              class="admin-btn admin-btn--ghost"
              :disabled="submitting"
              v-scramble.hover
              @click="clearForm"
            >
              Clear form
            </button>
          </div>

          <p
            v-if="formSuccess"
            class="admin-feedback admin-feedback--success"
            role="status"
          >
            {{ formSuccess }}
          </p>
          <p
            v-if="formError"
            class="admin-feedback admin-feedback--error"
            role="alert"
          >
            {{ formError }}
          </p>
        </section>
    </form>
  </AdminShell>
</template>

<style scoped>
.admin-form {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
}
</style>
