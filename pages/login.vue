<script setup lang="ts">
import useLogin from '~/composables/useLogin'

const email = ref('')
const password = ref('')
const sending = ref(false)
const { login, error } = useLogin()
const router = useRouter()

const handleSubmit = async () => {
  sending.value = true
  try {
    await login(email.value, password.value)
    if (!error.value) {
      await router.push('/admin/releasesform')
    }
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <AdminShell
    title="Login"
    index="00"
    lede="Sign in to manage releases, broadcasts and catalogue records."
    :show-nav="false"
  >
    <section class="admin-panel" aria-labelledby="login-title">
      <div class="admin-panel__head">
        <p class="admin-panel__label">Access</p>
        <h2 id="login-title" class="admin-panel__title">Admin session</h2>
        <p class="admin-panel__copy">
          Use the Accurate Black Firebase account. Pages behind this gate are not indexed.
        </p>
      </div>

      <form class="admin-grid admin-grid--single" @submit.prevent="handleSubmit">
        <div class="admin-field">
          <label for="login-email">Email</label>
          <input
            id="login-email"
            v-model="email"
            type="email"
            autocomplete="username"
            required
          >
        </div>

        <div class="admin-field">
          <label for="login-password">Password</label>
          <input
            id="login-password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
          >
        </div>

        <div class="admin-actions">
          <button
            class="admin-btn"
            type="submit"
            :disabled="sending"
            v-scramble.hover
          >
            {{ sending ? 'Signing in…' : 'Log in' }}
          </button>
        </div>

        <p v-if="error" class="admin-feedback admin-feedback--error" role="alert">
          {{ error }}
        </p>
      </form>
    </section>
  </AdminShell>
</template>
