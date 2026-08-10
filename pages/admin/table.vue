<script setup lang="ts">
import { getFirestore, collection, getDocs, updateDoc, deleteDoc, query, orderBy, doc } from 'firebase/firestore'
import { getFirebaseClientApp } from '~/utils/firebaseClient'

type ReleaseTrack = { trackName?: string }
type ReleaseRecord = {
  id: string
  ACB?: string
  artist?: string
  bio?: string
  releaseName?: string
  tracks?: ReleaseTrack[]
  releaseTrailer?: string
  description?: string
  digDisLink?: string
  socialLinks?: string[]
  artistImageUrl?: string
  imageUrl?: string
  soundcloudUrl?: string
  [key: string]: unknown
}

definePageMeta({ middleware: 'auth' })

const users = ref<ReleaseRecord[]>([])
const openId = ref<string | null>(null)
const editedUser = ref<ReleaseRecord>({} as ReleaseRecord)
const searchQuery = ref('')
const loading = ref(true)
const statusMessage = ref('')
const statusKind = ref<'success' | 'error'>('success')
const savingId = ref<string | null>(null)

const fetchUsers = async () => {
  loading.value = true
  try {
    const db = getFirestore(getFirebaseClientApp())
    const usersCollection = collection(db, 'users')
    const q = query(usersCollection, orderBy('ACB'))
    const querySnapshot = await getDocs(q)
    const fetchedUsers: ReleaseRecord[] = []
    querySnapshot.forEach((snapshot) => {
      fetchedUsers.push({ ...snapshot.data(), id: snapshot.id } as ReleaseRecord)
    })
    users.value = fetchedUsers
  } catch (error) {
    console.error('Error getting users: ', error)
    statusKind.value = 'error'
    statusMessage.value = 'Could not load releases.'
  } finally {
    loading.value = false
  }
}

const sortedUsers = computed(() => {
  const queryText = searchQuery.value.trim().toLowerCase()
  const filtered = users.value.filter((user) => {
    if (!queryText) return true
    const artist = String(user.artist || '').toLowerCase()
    const acb = String(user.ACB || '').toLowerCase()
    const releaseName = String(user.releaseName || '').toLowerCase()
    return artist.includes(queryText) || acb.includes(queryText) || releaseName.includes(queryText)
  })

  return [...filtered].sort((a, b) => {
    if (a.ACB === 'ACB001') return 1
    return String(b.ACB || '').localeCompare(String(a.ACB || ''))
  })
})

const isOpen = (id: string) => openId.value === id

const toggleRow = (user: ReleaseRecord) => {
  if (openId.value === user.id) {
    openId.value = null
    editedUser.value = {} as ReleaseRecord
    return
  }
  openId.value = user.id
  editedUser.value = {
    ...user,
    tracks: Array.isArray(user.tracks) ? user.tracks.map(track => ({ ...track })) : [],
    socialLinks: Array.isArray(user.socialLinks) ? [...user.socialLinks] : [''],
  }
}

const addSocialLink = () => {
  if (!Array.isArray(editedUser.value.socialLinks)) {
    editedUser.value.socialLinks = ['']
    return
  }
  editedUser.value.socialLinks.push('')
}

const removeSocialLink = () => {
  if (!Array.isArray(editedUser.value.socialLinks)) return
  if (editedUser.value.socialLinks.length > 1) editedUser.value.socialLinks.pop()
}

const updateUser = async (user: ReleaseRecord) => {
  savingId.value = user.id
  statusMessage.value = ''
  try {
    const db = getFirestore(getFirebaseClientApp())
    const userDocRef = doc(db, 'users', user.id)
    const { id: _id, ...payload } = editedUser.value
    await updateDoc(userDocRef, payload)

    const index = users.value.findIndex(item => item.id === user.id)
    if (index >= 0) {
      users.value[index] = { ...editedUser.value, id: user.id }
    }

    openId.value = null
    statusKind.value = 'success'
    statusMessage.value = 'Release updated.'
  } catch (error) {
    console.error('Error updating user: ', error)
    statusKind.value = 'error'
    statusMessage.value = 'Update failed.'
  } finally {
    savingId.value = null
  }
}

const deleteUser = async (user: ReleaseRecord) => {
  if (!confirm(`Delete ${user.ACB || 'this release'} permanently?`)) return

  savingId.value = user.id
  statusMessage.value = ''
  try {
    const db = getFirestore(getFirebaseClientApp())
    const userDocRef = doc(db, 'users', user.id)
    await deleteDoc(userDocRef)
    users.value = users.value.filter(item => item.id !== user.id)
    if (openId.value === user.id) openId.value = null
    statusKind.value = 'success'
    statusMessage.value = 'Release deleted.'
  } catch (error) {
    console.error('Error removing user: ', error)
    statusKind.value = 'error'
    statusMessage.value = 'Delete failed.'
  } finally {
    savingId.value = null
  }
}

onMounted(fetchUsers)
</script>

<template>
  <AdminShell
    title="Overview"
    index="03"
    lede="Search, open, update or delete catalogue releases. Changes write straight to Firestore."
  >
    <section class="admin-panel" aria-labelledby="overview-title">
      <div class="admin-panel__head">
        <p class="admin-panel__label">Catalogue</p>
        <h2 id="overview-title" class="admin-panel__title">Releases</h2>
        <p class="admin-panel__copy">
          Open a row to edit fields. Artwork URLs can be updated if Storage paths change.
        </p>
      </div>

      <div class="admin-toolbar">
        <div class="admin-search">
          <label for="release-search">Filter</label>
          <input
            id="release-search"
            v-model="searchQuery"
            class="admin-input"
            type="search"
            placeholder="Artist, ACB or release…"
          >
        </div>
        <p class="admin-note">
          {{ loading ? 'Loading…' : `${sortedUsers.length} release${sortedUsers.length === 1 ? '' : 's'}` }}
        </p>
      </div>

      <p
        v-if="statusMessage"
        class="admin-feedback"
        :class="statusKind === 'success' ? 'admin-feedback--success' : 'admin-feedback--error'"
        role="status"
      >
        {{ statusMessage }}
      </p>

      <div v-if="!loading && sortedUsers.length === 0" class="admin-note">
        No releases match this filter.
      </div>

      <div class="admin-list" aria-live="polite">
        <article
          v-for="user in sortedUsers"
          :key="user.id"
          class="admin-list__item"
          :class="{ 'admin-list__item--open': isOpen(user.id) }"
        >
          <button
            type="button"
            class="admin-list__header"
            :aria-expanded="isOpen(user.id)"
            @click="toggleRow(user)"
          >
            <div class="admin-list__meta">
              <p class="admin-list__code">{{ user.ACB || '—' }}</p>
              <p class="admin-list__name">
                {{ user.artist || 'Unknown artist' }}
                <template v-if="user.releaseName"> — {{ user.releaseName }}</template>
              </p>
            </div>
            <span class="admin-btn admin-btn--ghost" style="pointer-events: none;">
              {{ isOpen(user.id) ? 'Close' : 'Open' }}
            </span>
          </button>

          <div v-if="isOpen(user.id)" class="admin-list__body">
            <div class="admin-list__sections">
              <div class="admin-stack">
                <p class="admin-panel__label">Identity</p>
                <div class="admin-field">
                  <label>ACB</label>
                  <input v-model="editedUser.ACB" type="text">
                </div>
                <div class="admin-field">
                  <label>Artist</label>
                  <input v-model="editedUser.artist" type="text">
                </div>
                <div class="admin-field">
                  <label>Bio</label>
                  <textarea v-model="editedUser.bio" />
                </div>
              </div>

              <div class="admin-stack">
                <p class="admin-panel__label">Release</p>
                <div class="admin-field">
                  <label>Release name</label>
                  <input v-model="editedUser.releaseName" type="text">
                </div>
                <div class="admin-field">
                  <label>Tracks</label>
                  <div class="admin-stack">
                    <input
                      v-for="(track, trackIndex) in editedUser.tracks || []"
                      :key="`track-${trackIndex}`"
                      v-model="track.trackName"
                      type="text"
                      :placeholder="`Track ${trackIndex + 1}`"
                    >
                  </div>
                </div>
                <div class="admin-field">
                  <label>Trailer link</label>
                  <input v-model="editedUser.releaseTrailer" type="url">
                </div>
                <div class="admin-field">
                  <label>Description</label>
                  <textarea v-model="editedUser.description" />
                </div>
              </div>

              <div class="admin-stack">
                <p class="admin-panel__label">Links</p>
                <div class="admin-field">
                  <label>Dig Dis / smartlink</label>
                  <input v-model="editedUser.digDisLink" type="url">
                </div>
                <div class="admin-field">
                  <label>Spotify embed</label>
                  <textarea v-model="editedUser.soundcloudUrl" />
                </div>
                <div class="admin-field">
                  <label>Social links</label>
                  <div class="admin-stack">
                    <input
                      v-for="(_link, linkIndex) in editedUser.socialLinks || []"
                      :key="`social-${linkIndex}`"
                      v-model="editedUser.socialLinks![linkIndex]"
                      type="url"
                    >
                  </div>
                  <div class="admin-actions" style="margin-top: .75rem;">
                    <button
                      type="button"
                      class="admin-btn admin-btn--ghost"
                      v-scramble.hover
                      @click="addSocialLink"
                    >
                      Add social
                    </button>
                    <button
                      v-if="(editedUser.socialLinks?.length || 0) > 1"
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

              <div class="admin-stack">
                <p class="admin-panel__label">Images</p>
                <div class="admin-field">
                  <label>Artist image URL</label>
                  <input v-model="editedUser.artistImageUrl" type="url">
                  <NuxtImg
                    v-if="editedUser.artistImageUrl"
                    :src="editedUser.artistImageUrl"
                    class="admin-thumb"
                    alt=""
                  />
                </div>
                <div class="admin-field">
                  <label>Release image URL</label>
                  <input v-model="editedUser.imageUrl" type="url">
                  <NuxtImg
                    v-if="editedUser.imageUrl"
                    :src="editedUser.imageUrl"
                    class="admin-thumb"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div class="admin-actions">
              <button
                type="button"
                class="admin-btn"
                :disabled="savingId === user.id"
                v-scramble.hover
                @click="updateUser(user)"
              >
                {{ savingId === user.id ? 'Saving…' : 'Update' }}
              </button>
              <button
                type="button"
                class="admin-btn admin-btn--danger"
                :disabled="savingId === user.id"
                v-scramble.hover
                @click="deleteUser(user)"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </AdminShell>
</template>
